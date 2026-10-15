import React, { useEffect, useState } from 'react';
import { CoinIcon } from './Upgrader';

// Switching to the Upgrader tab and back remounts this card, so the list lives outside the
// component: the first fetch fills the cache and a remount paints it instantly.
const CACHE_MS = 60_000;
let cache = { users: [], at: 0, key: null };

export default function Leaderboard({ theme, refreshKey }) {
  const [users, setUsers] = useState(cache.users);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(cache.users.length === 0);
  const isDark = theme === 'dark';

  useEffect(() => {
    // refreshKey means something just changed the economy (a transfer, a loan) — always reload
    if (cache.key === refreshKey && Date.now() - cache.at < CACHE_MS) {
      setUsers(cache.users);
      return;
    }
    fetch('/api/economy/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.users)) {
          setUsers(data.users);
          cache = { users: data.users, at: Date.now(), key: refreshKey };
        } else setError(data.error || 'Не удалось загрузить лидерборд');
      })
      .catch(() => setError('Сетевая ошибка'))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  return (
    <div className={`p-4 ${isDark ? 'bg-[#0a1122] text-white' : 'bg-white'} rounded-md shadow-lg w-full`}>
      <h2 className="text-xl font-orbitron font-black mb-4">Лидерборд</h2>
      <ul className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
        {users.map((u, i) => (
          <li key={u.id} className={`flex items-center gap-3 p-2 rounded ${isDark ? 'bg-[#121c35]' : 'bg-slate-100/60'}`}>
            <span className="w-6 text-right font-mono font-bold text-sky-500">{i + 1}</span>
            <img
              src={u.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'}
              alt={u.username}
              className="w-8 h-8 rounded-full"
            />
            <span className="flex-1 font-orbitron truncate">{u.username}</span>
            <span className="font-orbitron font-black flex items-center gap-1.5">
              <span>{u.balance?.toLocaleString('ru-RU')}</span>
              <CoinIcon className="w-4 h-4" />
            </span>
          </li>
        ))}
        {users.length === 0 && <li className="text-gray-500">{error || (loading ? 'Загружаем...' : 'Нет данных')}</li>}
      </ul>
    </div>
  );
}
