import React, { useEffect, useState } from 'react';

export default function Leaderboard({ theme }) {
  const [users, setUsers] = useState([]);
  const isDark = theme === 'dark';

  useEffect(() => {
    fetch('/api/economy/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.leaderboard)) {
          setUsers(data.leaderboard);
        }
      })
      .catch((e) => console.warn('Failed to load leaderboard', e));
  }, []);

  return (
    <div className={`p-4 ${isDark ? 'bg-[#0a1122] text-white' : 'bg-white'} rounded-md shadow-lg max-w-3xl mx-auto`}>
      <h2 className="text-xl font-orbitron font-black mb-4">Лидерборд</h2>
      <ul className="space-y-2">
        {users.map((u) => (
          <li key={u.id} className="flex items-center gap-3 p-2 bg-slate-100/30 rounded">
            <img src={u.avatar} alt={u.username} className="w-8 h-8 rounded-full" />
            <span className="flex-1 font-orbitron truncate">{u.username}</span>
            <span className="font-orbitron font-black">{u.balance?.toLocaleString()} <span className="text-sm">💰</span></span>
          </li>
        ))}
        {users.length === 0 && <li className="text-gray-500">Нет данных</li>}
      </ul>
    </div>
  );
}
