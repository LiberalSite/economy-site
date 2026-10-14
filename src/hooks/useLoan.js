import { useCallback, useEffect, useRef, useState } from 'react';
import { LOAN_MIN, DAY_MS, dayRate, interestCharge, termDays } from '../lib/loanRules';

const GUEST_KEY = 'fazenn_guest_loan';

function loadGuest() {
  try {
    const raw = JSON.parse(localStorage.getItem(GUEST_KEY));
    if (!raw || !raw.principal || !raw.startedAt) return null;
    return {
      principal: Number(raw.principal),
      repaid: Number(raw.repaid) || 0,
      interestPaid: Number(raw.interestPaid) || 0,
      term: raw.term === 'month' ? 'month' : 'week',
      startedAt: Number(raw.startedAt),
      daysCharged: Number(raw.daysCharged) || 0,
    };
  } catch {
    return null;
  }
}

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

function guestLoanView(loan, now) {
  if (!loan) return null;
  const dueAt = loan.startedAt + termDays(loan.term) * DAY_MS;
  return {
    id: 'guest',
    principal: loan.principal,
    repaid: loan.repaid,
    interestPaid: loan.interestPaid,
    term: loan.term,
    termDays: termDays(loan.term),
    day: loan.daysCharged,
    startedAt: loan.startedAt,
    dueAt,
    overdue: dueAt < now,
    remaining: Math.max(loan.principal - loan.repaid, 0),
    dayRate: dayRate(loan.term, loan.daysCharged + 1),
    nextChargeAt: loan.startedAt + (loan.daysCharged + 1) * DAY_MS,
  };
}

const guestOffer = (loan, balance, now) => ({
  balance,
  canBorrow: balance >= LOAN_MIN && !loan ? Math.max(balance * 2, 0) : 0,
  maxBorrow: Math.max(balance * 2, 0),
  minAmount: LOAN_MIN,
  loan: guestLoanView(loan, now),
});

const serverOffer = (data) => ({
  balance: Number(data.balance),
  canBorrow: Number(data.canBorrow),
  maxBorrow: Number(data.maxBorrow),
  minAmount: Number(data.minAmount),
  loan: data.loan || null,
});

// Interest is charged per whole day straight from the balance, which is what can push it negative.
export default function useLoan({ discordUser, guestBalance, onGuestBalance }) {
  const [server, setServer] = useState(null);
  const [guestLoan, setGuestLoan] = useState(() => (discordUser ? null : loadGuest()));
  const [now, setNow] = useState(() => Date.now());
  const [busy, setBusy] = useState(false);
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

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  // Guest interest is applied once per day boundary, on the clock, without any user action
  useEffect(() => {
    if (discordUser || !guestLoan) return;
    const target = targetDay(guestLoan, now);
    if (target <= guestLoan.daysCharged) return;
    const key = `${guestLoan.startedAt}:${target}`;
    if (chargedTo.current === key) return;
    chargedTo.current = key;

    let charged = 0;
    for (let day = guestLoan.daysCharged + 1; day <= target; day++) {
      const owed = Math.max(guestLoan.principal - guestLoan.repaid, 0);
      if (owed > 0) charged += interestCharge(owed, guestLoan.term, day);
    }
    const next = { ...guestLoan, daysCharged: target, interestPaid: guestLoan.interestPaid + charged };
    saveGuest(next);
    setGuestLoan(next);
    if (charged > 0) onGuestBalance((prev) => prev - charged);
  }, [discordUser, guestLoan, now, onGuestBalance]);

  const pending = Boolean(discordUser) && !server;
  const offer = pending
    ? { balance: guestBalance, canBorrow: 0, maxBorrow: Math.max(guestBalance * 2, 0), minAmount: LOAN_MIN, loan: null }
    : discordUser
      ? serverOffer(server)
      : guestOffer(guestLoan, guestBalance, now);

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

  const take = useCallback(async (amount, term) => {
    const sum = Math.floor(Number(amount));
    setBusy(true);
    try {
      if (discordUser) {
        const data = await request('/api/loan/take', { amount: sum, term });
        return { success: true, balance: Number(data.balance) };
      }
      const ts = Date.now();
      if (guestLoan) throw new Error('У тебя уже есть открытый кредит — сначала погаси его');
      if (guestBalance < LOAN_MIN) throw new Error('Для кредита нужно хотя бы 100 монет на балансе');
      if (!Number.isFinite(sum) || sum < LOAN_MIN) throw new Error('Минимальная сумма кредита — 100 монет');
      if (sum > guestBalance * 2) throw new Error('Больше двух текущих балансов взять нельзя');
      const next = { principal: sum, repaid: 0, interestPaid: 0, term: term === 'month' ? 'month' : 'week', startedAt: ts, daysCharged: 0 };
      saveGuest(next);
      chargedTo.current = null;
      setGuestLoan(next);
      setNow(ts);
      onGuestBalance((prev) => prev + sum);
      return { success: true };
    } finally {
      setBusy(false);
    }
  }, [discordUser, guestLoan, guestBalance, onGuestBalance, request]);

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
      const pay = Math.min(sum, Math.max(guestLoan.principal - guestLoan.repaid, 0), Math.max(guestBalance, 0));
      if (pay < 1) throw new Error('Недостаточно монет на балансе');
      const repaid = guestLoan.repaid + pay;
      const closed = repaid >= guestLoan.principal;
      const next = closed ? null : { ...guestLoan, repaid };
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
