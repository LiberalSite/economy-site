import React, { useEffect, useState } from 'react';

// Must match public.transfer_coins: fee = FLOOR(pay * 0.15), received = pay - fee
const receiveFromPay = (pay) => pay - Math.floor((pay * 3) / 20);
const payForReceive = (receive) => Math.floor((20 * (receive - 1)) / 17) + 1;

export default function PayForm({ theme, user, onOpenAuthModal, onBalanceChange, onPaid, balance }) {
  const [users, setUsers] = useState([]);
  const [targetId, setTargetId] = useState('');
  const [pay, setPay] = useState('');
  const [receive, setReceive] = useState('');
  const [lastEdited, setLastEdited] = useState('pay');
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

  const toInt = (value) => {
    const n = Math.floor(Number(value));
    return Number.isFinite(n) && n > 0 ? n : 0;
  };

  const payValue = toInt(pay);
  const receiveValue = toInt(receive);
  const fee = payValue ? payValue - receiveFromPay(payValue) : 0;

  const handlePay = (value) => {
    setPay(value);
    setLastEdited('pay');
    const n = toInt(value);
    setReceive(n ? String(receiveFromPay(n)) : '');
  };

  const handleReceive = (value) => {
    setReceive(value);
    setLastEdited('receive');
    const n = toInt(value);
    setPay(n ? String(payForReceive(n)) : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setMessage(null);
    try {
      const body = { targetId };
      // only one field goes to the server — it re-derives the other with the same integer math
      if (lastEdited === 'receive') body.receive = receiveValue;
      else body.amount = payValue;
      const res = await fetch('/api/economy/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        onBalanceChange(data.senderBalance);
        setMessage({
          type: 'success',
          text: `Отправлено ${data.paid.toLocaleString('ru-RU')} 🪙 · получатель получил ${data.received.toLocaleString('ru-RU')} 🪙 (комиссия ${data.fee.toLocaleString('ru-RU')})`
        });
        setPay('');
        setReceive('');
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
  const fieldClass = `w-full p-2 border rounded outline-none transition-colors ${
    isDark
      ? 'bg-[#15203b] text-white border-slate-700 focus:bg-[#1a294d] placeholder-slate-500'
      : 'bg-slate-50 text-slate-900 border-slate-300 focus:bg-white'
  }`;
  const notEnough = balance != null && payValue > balance;

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
        <div>
          <label className={`block mb-1 text-[11px] font-orbitron font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Я заплачу
          </label>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="Сумма списания"
            className={fieldClass}
            value={pay}
            onChange={e => handlePay(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={`block mb-1 text-[11px] font-orbitron font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Он(а) получит
          </label>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="Сумма зачисления"
            className={fieldClass}
            value={receive}
            onChange={e => handleReceive(e.target.value)}
            required
          />
        </div>
        {payValue > 0 && (
          <p className={`text-xs font-rajdhani ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Комиссия 15%: <span className="font-bold text-amber-400">{fee.toLocaleString('ru-RU')} 🪙</span> — уходит участникам роли-получателя
          </p>
        )}
        {notEnough && (
          <p className="text-xs font-rajdhani text-rose-400">
            На балансе не хватает монет: доступно {balance.toLocaleString('ru-RU')} 🪙
          </p>
        )}
        <button
          type="submit"
          disabled={isSending}
          className="w-full py-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-orbitron font-black"
        >
          {isSending ? 'Отправка...' : 'Перевести'}
        </button>
        {message && (
          <div className={`mt-2 text-center text-sm ${message.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}
