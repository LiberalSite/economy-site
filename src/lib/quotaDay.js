// One shared day boundary for the free round quota: everybody's 3 rounds come back at 00:00 in
// Europe/Amsterdam, not 24h after their own first spin. The Render server itself runs in
// Europe/Moscow time, so the zone is pinned here instead of taken from the machine clock.
// Mirrors public.quota_day_start() / public.quota_day_end() in supabase-schema.sql.
const TZ = 'Europe/Amsterdam';
const DAY_MS = 24 * 60 * 60 * 1000;

const dateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
});
const partsFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TZ, hour12: false,
  year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
});

// ms to add to a UTC instant to read Amsterdam's wall clock
function offsetAt(utcMs) {
  const p = Object.fromEntries(partsFormatter.formatToParts(new Date(utcMs)).map((x) => [x.type, x.value]));
  const wall = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour) % 24, Number(p.minute), Number(p.second));
  return wall - utcMs;
}

// Wall-clock date (YYYY-MM-DD) at Amsterdam midnight -> the real UTC instant of that moment.
// Solved twice so a DST switch in between cannot shift the answer.
function instantFromWall(dateText) {
  const [y, m, d] = dateText.split('-').map(Number);
  const wall = Date.UTC(y, m - 1, d);
  const guess = wall - offsetAt(wall);
  return wall - offsetAt(guess);
}

const nextDateText = (dateText) => new Date(Date.parse(`${dateText}T00:00:00Z`) + DAY_MS).toISOString().slice(0, 10);

export function quotaDayWindow(now = Date.now()) {
  const today = dateFormatter.format(new Date(now));
  return { start: instantFromWall(today), end: instantFromWall(nextDateText(today)) };
}
