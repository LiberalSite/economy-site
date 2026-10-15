import { useCallback, useEffect, useState } from 'react';
import { guestLoanReserve } from './useLoan';
import { quotaDayWindow } from '../lib/quotaDay';

export const SPIN_LIMIT = 3;
const GUEST_KEY = 'fazenn_guest_spins';

function loadGuest() {
  try {
    const raw = JSON.parse(localStorage.getItem(GUEST_KEY));
    if (!raw || !Array.isArray(raw.spins)) return null;
    return { spins: raw.spins, bonusSpins: Number(raw.bonusSpins) || 0, bonusExpiresAt: Number(raw.bonusExpiresAt) || 0 };
  } catch {
    return null;
  }
}

function saveGuest(state) {
  try {
    localStorage.setItem(GUEST_KEY, JSON.stringify(state));
  } catch {
    /* private mode: quota lives in memory only */
  }
}

// Same price list as public.bonus_costs() in Postgres: bigger packs are cheaper per round.
function bonusCosts(balance) {
  const b = Math.max(0, balance);
  return [
    Math.max(1, Math.floor(b * 0.25)),
    Math.max(2, Math.floor(b * 0.45)),
    Math.max(3, Math.floor(b * 0.60)),
  ];
}

function guestView(state, balance, now) {
  const { start, end } = quotaDayWindow(now);
  const fresh = state.spins.filter((t) => t >= start);
  const costs = bonusCosts(balance);
  return {
    limit: SPIN_LIMIT,
    used: fresh.length,
    left: Math.max(0, SPIN_LIMIT - fresh.length),
    nextResetAt: end,
    bonusSpins: state.bonusExpiresAt > now ? state.bonusSpins : 0,
    bonusCosts: costs,
    bonusCost: costs[0],
  };
}

function serverView(data, now) {
  const expires = data.bonusExpiresAt ? Date.parse(data.bonusExpiresAt) : 0;
  const costs = data.bonusCosts && data.bonusCosts.length ? data.bonusCosts : [data.bonusCost, data.bonusCost, data.bonusCost];
  return {
    limit: data.spinLimit,
    used: data.spinsUsed,
    left: data.spinsLeft,
    nextResetAt: Date.parse(data.nextResetAt),
    bonusSpins: expires > now ? data.bonusSpins : 0,
    bonusCosts: costs,
    bonusCost: data.bonusCost,
  };
}

// 3 free rounds per calendar day (00:00 Amsterdam). Logged-in users are counted by Postgres; guests by localStorage.
export default function useSpinQuota({ discordUser, guestBalance, onGuestBalance }) {
  const [server, setServer] = useState(null);
  const [guest, setGuest] = useState(() => loadGuest() || { spins: [], bonusSpins: 0, bonusExpiresAt: 0 });
  const [now, setNow] = useState(() => Date.now());

  const refresh = useCallback(async () => {
    if (!discordUser) return;
    try {
      const res = await fetch('/api/upgrader/quota');
      const data = await res.json();
      if (data.success) setServer(data);
    } catch {
      /* keep the previous numbers */
    }
  }, [discordUser]);

  useEffect(() => {
    setServer(null);
    refresh();
  }, [refresh]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(id);
  }, []);

  // Quota until the server answers, so a logged-in user is never shown a wrong 0/3.
  const pending = Boolean(discordUser) && !server;
  const quota = pending
    ? { limit: SPIN_LIMIT, used: 0, left: SPIN_LIMIT, nextResetAt: quotaDayWindow(now).end, bonusSpins: 0, bonusCosts: [0, 0, 0], bonusCost: 0 }
    : discordUser
      ? serverView(server, now)
      : guestView(guest, guestBalance, now);

  // data = the /api/upgrader/spin response, which already carries fresh quota numbers
  const afterSpin = useCallback((data) => {
    if (data) {
      setServer(data);
      return;
    }
    const ts = Date.now();
    const fresh = guest.spins.filter((t) => t >= quotaDayWindow(ts).start);
    const bonusLive = guest.bonusExpiresAt > ts ? guest.bonusSpins : 0;
    // past 3 rounds in the window the round came out of the purchased bonus
    const usedBonus = fresh.length >= SPIN_LIMIT && bonusLive > 0;
    const next = {
      spins: [...fresh, ts],
      bonusSpins: usedBonus ? bonusLive - 1 : bonusLive,
      bonusExpiresAt: usedBonus && bonusLive === 1 ? 0 : guest.bonusExpiresAt,
    };
    saveGuest(next);
    setGuest(next);
    setNow(ts);
  }, [guest]);

  const buyBonus = useCallback(async (count = 1) => {
    if (discordUser) {
      const res = await fetch('/api/upgrader/buy-spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Не удалось купить спин');
      setServer(data);
      return { ok: true, cost: data.cost, count };
    }
    const ts = Date.now();
    const current = guestView(guest, guestBalance, ts);
    const cost = current.bonusCosts[count - 1];
    // Same reserve the server holds a borrower to: the daily loan payment must stay payable
    const reserve = guestLoanReserve();
    if (guestBalance - reserve < cost) {
      throw new Error(reserve > 0
        ? 'Часть баланса зарезервирована под дневной платёж по кредиту'
        : 'Недостаточно монет на балансе');
    }
    const next = {
      spins: guest.spins.filter((t) => t >= quotaDayWindow(ts).start),
      bonusSpins: current.bonusSpins + count,
      bonusExpiresAt: current.nextResetAt,
    };
    saveGuest(next);
    setGuest(next);
    onGuestBalance((prev) => prev - cost);
    setNow(ts);
    return { ok: true, cost, count };
  }, [discordUser, guest, guestBalance, onGuestBalance]);

  return { quota, pending, refresh, afterSpin, buyBonus };
}
