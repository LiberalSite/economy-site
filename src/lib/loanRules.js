// Mirrors public.loan_day_rate / public.loan_term_days in supabase-schema.sql.
// Week: the rate climbs 1 p.p. per day (day 1 = 1%, day 7 = 7%, overdue keeps climbing), capped at 15%.
// Month: 0.5% a day inside the term, and once overdue the same climbing ladder starts from 1%.
export const LOAN_MIN = 100;
export const DAY_RATE_CAP = 15;
export const DAY_MS = 24 * 60 * 60 * 1000;

export const LOAN_TERMS = [
  { id: 'week', days: 7, label: 'Неделя', note: 'ставка растёт каждый день' },
  { id: 'month', days: 30, label: 'Месяц', note: '0,5% в день, дешевле' },
];

export function termDays(term) {
  return term === 'month' ? 30 : 7;
}

export function dayRate(term, day) {
  if (term === 'month') return day <= 30 ? 0.5 : Math.min(day - 30, DAY_RATE_CAP);
  return Math.min(day, DAY_RATE_CAP);
}

// FLOOR(owed * rate / 100) — same rounding as the database
export function interestCharge(owed, term, day) {
  return Math.floor((owed * dayRate(term, day)) / 100);
}

export function totalPercent(term) {
  const days = termDays(term);
  let sum = 0;
  for (let d = 1; d <= days; d++) sum += dayRate(term, d);
  return Math.round(sum * 100) / 100;
}

export function formatPercent(value) {
  return `${Number(value).toLocaleString('ru-RU', { maximumFractionDigits: 1 })}%`;
}

export const coins = (value) => Math.round(Number(value) || 0).toLocaleString('ru-RU');
