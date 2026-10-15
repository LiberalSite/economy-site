// Mirrors public.loan_day_rate / public.loan_schedule / public.take_loan in supabase-schema.sql.
// A loan is repaid by annuity: the DB takes the same daily payment every day, and that payment is
// a share of the daily activity salary — the borrower picks the share, the whole salary is the max.
export const LOAN_MIN = 100;
export const LOAN_DAY_RATE = 1; // % of the debt still owed, charged every day, paid to the earnings role
export const PAYMENT_PERCENT_MIN = 10;
export const PAYMENT_PERCENT_MAX = 100;
export const DAY_MS = 24 * 60 * 60 * 1000;

// floor(salary * percent / 100) — the same integer math as the database
export function dailyPayment(salaryDaily, percent) {
  if (!salaryDaily || salaryDaily < 1 || !percent || percent < 1) return 0;
  return Math.floor((salaryDaily * percent) / 100);
}

// The payment must cover the first day's interest with at least one coin left for the debt itself,
// otherwise the loan would never shrink — that is the only real ceiling on the sum.
export function maxLoanAmount(payment) {
  return Math.max(payment * Math.floor(100 / LOAN_DAY_RATE) - 1, 0);
}

export function loanSchedule(amount, payment) {
  if (!Number.isFinite(amount) || amount < 1 || !Number.isFinite(payment) || payment < 1) return null;
  let owed = amount;
  let days = 0;
  let total = 0;
  while (owed > 0 && days < 400) {
    const interest = Math.floor((owed * LOAN_DAY_RATE) / 100);
    const pay = Math.min(payment, owed + interest);
    owed = Math.max(owed - (pay - interest), 0);
    total += pay;
    days++;
  }
  return { days, total, interest: total - amount };
}

export function formatPercent(value) {
  return `${Number(value).toLocaleString('ru-RU', { maximumFractionDigits: 1 })}%`;
}

export const coins = (value) => Math.round(Number(value) || 0).toLocaleString('ru-RU');
