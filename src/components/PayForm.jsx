import React, { useEffect, useState } from 'react';

export default function PayForm({ theme, user, onOpenAuthModal, onBalanceChange, onPaid }) {
  const [users, setUsers] = useState([]);
  const [targetId, setTargetId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const isDark = theme === 'dark';

  const loadUsers = () =>
    fetch('/api/economy/leaderboard')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.users)) setUsers(data.users);
      })
      .catch(e => console.warn('Failed to load users', e));

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setMessage(null);
    try {
      const res = await fetch('/api/economy/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetId, amount: Number(amount) })
      });
      const data = await res.json();
      if (data.success) {
        onBalanceChange(data.senderBalance);
        setMessage({ type: 'success', text: 'Перевод выполнен' });
        setAmount('');
        loadUsers();
        onPaid?.();
      } else {
        setMessage({ type: 'error', text: data.error || 'Ошибка перевода' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Сетевая ошибка' });
    } finally {
      setIsSending(false);
    }
  };

  if (!user) {
    return (
      <div className={`p-6 ${isDark ? 'bg-[#0a1122] text-white' : 'bg-white'} rounded-md shadow-lg w-full text-center space-y-4`}>
        <h2 className="text-xl font-orbitron font-black">Перевести деньги</h2>
        <p className="text-sm opacity-70">Переводы доступны только после входа через Discord.</p>
        <button
          onClick={onOpenAuthModal}
          className="w-full py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-orbitron font-black"
        >
          Войти через Discord
        </button>
      </div>
    );
  }

  const recipients = users.filter(u => u.id !== user.id);

  return (
    <div className={`p-6 ${isDark ? 'bg-[#0a1122] text-white' : 'bg-white'} rounded-md shadow-lg w-full`}>
      <h2 className="text-xl font-orbitron font-black mb-4">Перевести деньги</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className={`w-full p-2 border rounded outline-none transition-colors ${
            isDark
              ? 'bg-[#15203b] text-white border-slate-700 focus:bg-[#1a294d]'
              : 'bg-slate-50 text-slate-900 border-slate-300 focus:bg-white'
          }`}
          value={targetId}
          onChange={e => setTargetId(e.target.value)}
          required
        >
          <option value="" disabled>Выберите получателя</option>
          {recipients.map(u => (
            <option key={u.id} value={u.id}>
              {u.username} ({u.balance?.toLocaleString('ru-RU')})
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          step="1"
          placeholder="Сумма"
          className={`w-full p-2 border rounded outline-none transition-colors ${
            isDark
              ? 'bg-[#15203b] text-white border-slate-700 focus:bg-[#1a294d] placeholder-slate-500'
              : 'bg-slate-50 text-slate-900 border-slate-300 focus:bg-white'
          }`}
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isSending}
          className="w-full py-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-orbitron font-black"
        >
          {isSending ? 'Отправка...' : 'Перевести'}
        </button>
        {message && (
          <div className={`mt-2 text-center ${message.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}
