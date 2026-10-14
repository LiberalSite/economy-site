import React, { useEffect, useState } from 'react';

export default function PayForm({ theme, onClose }) {
  const [users, setUsers] = useState([]);
  const [targetId, setTargetId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    fetch('/api/economy/leaderboard')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.leaderboard)) {
          setUsers(data.leaderboard);
        }
      })
      .catch(e => console.warn('Failed to load users', e));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      senderId: null, // server will infer from auth (placeholder)
      targetId,
      amount: Number(amount)
    };
    try {
      const res = await fetch('/api/economy/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setMessage({type: 'success', text: 'Перевод выполнен'});
      } else {
        setMessage({type: 'error', text: data.error || 'Ошибка перевода'});
      }
    } catch (err) {
      setMessage({type: 'error', text: 'Сетевая ошибка'});
    }
  };

  return (
    <div className={`p-6 ${isDark ? 'bg-[#0a1122] text-white' : 'bg-white'} rounded-md shadow-lg max-w-md mx-auto`}>
      <h2 className="text-xl font-orbitron font-black mb-4">Перевести деньги</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full p-2 border rounded bg-slate-50"
          value={targetId}
          onChange={e => setTargetId(e.target.value)}
          required
        >
          <option value="" disabled>Выберите получателя</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>
              {u.username} ({u.balance?.toLocaleString()})
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          placeholder="Сумма"
          className="w-full p-2 border rounded bg-slate-50"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white font-orbitron font-black"
        >
          Перевести
        </button>
        {message && (
          <div className={`mt-2 text-center ${message.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {message.text}
          </div>
        )}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 bg-gray-500 hover:bg-gray-600 text-white font-orbitron font-black mt-2"
        >
          Закрыть
        </button>
      </form>
    </div>
  );
}
