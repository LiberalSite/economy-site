import { useCallback, useEffect, useRef, useState } from 'react';
import {
  LOAN_MIN, LOAN_DAY_RATE, DAY_MS, dailyPayment, loanSchedule, maxLoanAmount,
} from '../lib/loanRules';

const GUEST_KEY = 'fazenn_guest_loan';
// A guest has no Discord roles, so the panel would be empty and untestable. Guests get a labelled
// demo salary instead; a real account uses its own activity role salary from the database.
export const GUEST_SALARY = 100;

function loadGuest() {
  try {
    const raw = JSON.parse(localStorage.getItem(GUEST_KEY));
    if (!raw || !raw.principal || !raw.startedAt) return null;
    const payment = Math.max(Number(raw.dailyPayment) || 0, 1);
    return {
      principal: Number(raw.principal),
      repaid: Number(raw.repaid) || 0,
      interestPaid: Number(raw.interestPaid) || 0,
      dailyPayment: payment,
      termDays: Number(raw.termDays) || 1,
      startedAt: Number(raw.startedAt),
      daysCharged: Number(raw.daysCharged) || 0,
    };
  } catch {
    return null;
  }
}

// Coins the borrower must leave on the balance while a guest loan is open (the server applies the
// same rule to real accounts inside every spend function).
export const guestLoanReserve = () => loadGuest()?.dailyPayment ?? 0;

function saveGuest(state) {
  try {
    if (state) localStorage.setItem(GUEST_KEY, JSON.stringify(state));
    else localStorage.removeItem(GUEST_KEY);
  } catch {
    /* private mode: the loan lives in memory only */
  }
}

// Whole days that have passed since the loan was taken
const targetDay = (loan, now) => Math.min(
  Math.floor((now - loan.startedAt) / DAY_MS),
  loan.daysCharged + 400
);

// One annuity day: interest first, everything left of the payment goes to the debt.
// Same integer math as public.accrue_loans, so the guest demo cannot drift from the real thing.
function chargeDay(loan) {
  const owed = Math.max(loan.principal - loan.repaid, 0);
  if (owed <= 0) return { loan: null, pay: 0, interest: 0, closed: true };
  const interest = Math.floor((owed * LOAN_DAY_RATE) / 100);
  const pay = Math.min(loan.dailyPayment, owed + interest);
  const repaid = loan.repaid + (pay - interest);
  const closed = repaid >= loan.principal;
  const next = closed ? null : {
    ...loan,
    repaid,
    interestPaid: loan.interestPaid + interest,
    daysCharged: loan.daysCharged + 1,
  };
  return { loan: next, pay, interest, closed };
}

function guestLoanView(loan, now) {
  if (!loan) return null;
  const stillOwed = Math.max(loan.principal - loan.repaid, 0);
  const plan = loanSchedule(stillOwed, loan.dailyPayment);
  const remainingDue = plan?.total ?? 0;
  const termDays = loan.daysCharged + (plan?.days ?? 0);
  return {
    id: 'guest',
    principal: loan.principal,
    repaid: loan.repaid,
    interestPaid: loan.interestPaid,
    dailyPayment: loan.dailyPayment,
    totalDue: loan.repaid + loan.interestPaid + remainingDue,
    termDays,
    day: loan.daysCharged,
    daysLeft: Math.max(termDays - loan.daysCharged, 0),
    startedAt: loan.startedAt,
    dueAt: loan.startedAt + termDays * DAY_MS,
    nextChargeAt: loan.startedAt + (loan.daysCharged + 1) * DAY_MS,
    remaining: stillOwed,
    remainingDue,
    salaryPercent: Math.round((loan.dailyPayment * 100 / GUEST_SALARY) * 10) / 10,
    overdue: false,
    demo: true,
  };
}

const guestOffer = (loan, balance) => ({
  balance,
  salaryDaily: GUEST_SALARY,
  activityRole: 'демо',
  dayRate: LOAN_DAY_RATE,
  minAmount: LOAN_MIN,
  maxDailyPayment: GUEST_SALARY,
  maxAmount: loan ? 0 : maxLoanAmount(GUEST_SALARY),
  canBorrow: !loan,
  reserve: loan ? loan.dailyPayment : 0,
  demo: true,
  loan: guestLoanView(loan, Date.now()),
});

const serverOffer = (data) => ({
  balance: Number(data.balance),
  salaryDaily: Number(data.salaryDaily),
  activityRole: data.activityRole || null,
  dayRate: Number(data.dayRate),
  minAmount: Number(data.minAmount),
  maxDailyPayment: Number(data.maxDailyPayment),
  maxAmount: Number(data.maxAmount),
  canBorrow: Boolean(data.canBorrow),
  reserve: Number(data.reserve),
  demo: false,
  loan: data.loan || null,
});

// The DB takes the daily payment itself; nothing here needs a timer to be honest.
export default function useLoan({ discordUser, guestBalance, onGuestBalance }) {
  const [server, setServer] = useState(null);
  const [guestLoan, setGuestLoan] = useState(() => (discordUser ? null : loadGuest()));
  const [busy, setBusy] = useState(false);
  const [tick, setTick] = useState(0);
  const chargedTo = useRef(null);

  const refresh = useCallback(async () => {
    if (!discordUser) return;
    try {
      const res = await fetch('/api/loan');
      const data = await res.json();
      if (data.success) setServer(data);
    } catch {
      /* keep the previous numbers */
    }
  }, [discordUser]);

  useEffect(() => {
    setServer(null);
    setGuestLoan(discordUser ? null : loadGuest());
    refresh();
  }, [refresh]);

  // Guest payments happen on the day boundary, without the user pressing anything
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (discordUser || !guestLoan) return;
    const target = targetDay(guestLoan, Date.now());
    if (target <= guestLoan.daysCharged) return;
    const key = `${guestLoan.startedAt}:${target}`;
    if (chargedTo.current === key) return;
    chargedTo.current = key;

    let state = guestLoan;
    let spent = 0;
    for (let day = guestLoan.daysCharged + 1; day <= target && state; day++) {
      const r = chargeDay(state);
      spent += r.pay;
      state = r.loan;
    }
    saveGuest(state);
    setGuestLoan(state);
    if (spent > 0) onGuestBalance((prev) => prev - spent);
  }, [discordUser, guestLoan, onGuestBalance, tick]);

  const pending = Boolean(discordUser) && !server;
  const offer = pending
    ? {
      balance: guestBalance, salaryDaily: 0, activityRole: null, dayRate: LOAN_DAY_RATE,
      minAmount: LOAN_MIN, maxDailyPayment: 0, maxAmount: 0, canBorrow: false, reserve: 0, loan: null,
    }
    : discordUser
      ? serverOffer(server)
      : guestOffer(guestLoan, guestBalance);

  const request = useCallback(async (path, body) => {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Ошибка кредита');
    setServer(data);
    return data;
  }, []);

  const take = useCallback(async (amount, percent) => {
    const sum = Math.floor(Number(amount));
    const share = Math.floor(Number(percent));
    setBusy(true);
    try {
      if (discordUser) {
        const data = await request('/api/loan/take', { amount: sum, percent: share });
        return { success: true, balance: Number(data.balance), loan: data.loan };
      }
      if (guestLoan) throw new Error('У тебя уже есть открытый кредит — сначала погаси его');
      if (!Number.isFinite(sum) || sum < LOAN_MIN) throw new Error(`Минимальная сумма кредита — ${LOAN_MIN} монет`);
      const payment = dailyPayment(GUEST_SALARY, share);
      if (payment < 1) throw new Error('Дневной платёж получился нулевым — подними процент зарплаты');
      if (sum > maxLoanAmount(payment)) throw new Error('Такую сумму выбранный платёж не выплатит — подними процент или уменьши сумму');
      const plan = loanSchedule(sum, payment);
      const next = {
        principal: sum, repaid: 0, interestPaid: 0, dailyPayment: payment,
        termDays: plan.days, startedAt: Date.now(), daysCharged: 0,
      };
      saveGuest(next);
      chargedTo.current = null;
      setGuestLoan(next);
      onGuestBalance((prev) => prev + sum);
      return { success: true };
    } finally {
      setBusy(false);
    }
  }, [discordUser, guestLoan, onGuestBalance, request]);

  const repay = useCallback(async (amount) => {
    const sum = Math.floor(Number(amount));
    setBusy(true);
    try {
      if (discordUser) {
        const data = await request('/api/loan/repay', { amount: sum });
        return { success: true, closed: !data.loan, loan: data.loan || null, balance: Number(data.balance) };
      }
      if (!guestLoan) throw new Error('Открытого кредита нет');
      if (!Number.isFinite(sum) || sum < 1) throw new Error('Некорректная сумма');
      const remaining = Math.max(guestLoan.principal - guestLoan.repaid, 0);
      const pay = Math.min(sum, remaining, Math.max(guestBalance, 0));
      if (pay < 1) throw new Error('Недостаточно монет на балансе');
      const repaid = guestLoan.repaid + pay;
      const closed = repaid >= guestLoan.principal;
      const next = closed
        ? null
        : {
          ...guestLoan,
          repaid,
          termDays: guestLoan.daysCharged + (loanSchedule(guestLoan.principal - repaid, guestLoan.dailyPayment)?.days ?? 0),
        };
      saveGuest(next);
      setGuestLoan(next);
      onGuestBalance((prev) => prev - pay);
      return { success: true, closed, paid: pay, loan: guestLoanView(next, Date.now()) };
    } finally {
      setBusy(false);
    }
  }, [discordUser, guestLoan, guestBalance, onGuestBalance, request]);

  return { offer, pending, busy, take, repay, refresh };
}
