import React, { useState } from 'react';
import { Landmark, AlertTriangle, TrendingUp, RotateCcw, Clock } from 'lucide-react';
import useLoan from '../hooks/useLoan';
import {
  LOAN_TERMS, LOAN_MIN, dayRate, formatPercent, coins, totalPercent, interestCharge, termDays,
} from '../lib/loanRules';

const dateText = (value) => new Date(value).toLocaleString('ru-RU', {
  day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
});

export default function LoanPanel({ theme, discordUser, userBalance, onUpdateBalance, onChanged }) {
  const { offer, pending, busy, take, repay } = useLoan({
    discordUser,
    guestBalance: userBalance,
    onGuestBalance: onUpdateBalance,
  });
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('week');
  const [payAmount, setPayAmount] = useState('');
  const [message, setMessage] = useState(null);
  const isDark = theme === 'dark';

  const card = `p-5 sm:p-6 ${isDark ? 'bg-[#0a1122] text-white' : 'bg-white text-slate-900'} rounded-md shadow-lg w-full`;
  const field = `w-full p-2 border rounded outline-none transition-colors ${
    isDark
      ? 'bg-[#15203b] text-white border-slate-700 focus:bg-[#1a294d] placeholder-slate-500'
      : 'bg-slate-50 text-slate-900 border-slate-300 focus:bg-white'
  }`;
  const muted = isDark ? 'text-slate-400' : 'text-slate-500';

  const loan = offer.loan;
  const wanted = Math.floor(Number(amount)) || 0;
  const cap = offer.canBorrow;
  const previewFirstCharge = interestCharge(wanted || cap, term, 1);

  const handleTake = async () => {
    setMessage(null);
    try {
      const r = await take(wanted, term);
      if (typeof r.balance === 'number') onUpdateBalance(r.balance);
      setMessage({ type: 'success', text: 'Кредит выдан. Первое списание — через сутки.' });
      setAmount('');
      onChanged?.();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleRepay = async (value) => {
    setMessage(null);
    try {
      const r = await repay(value);
      if (typeof r.balance === 'number') onUpdateBalance(r.balance);
      setMessage({
        type: 'success',
        text: r.closed
          ? 'Кредит полностью погашен — теперь можно брать новый.'
          : `Осталось погасить ${coins(r.loan?.remaining ?? 0)} 🪙`,
      });
      setPayAmount('');
      onChanged?.();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const quickSet = (value) => setAmount(String(Math.max(0, Math.floor(value))));

  return (
    <div className={card}>
      <div className="flex items-center gap-2 mb-1">
        <Landmark className="w-5 h-5 text-amber-400" />
        <h2 className="text-lg sm:text-xl font-orbitron font-black">Кредит под процент</h2>
      </div>
      <p className={`text-xs font-rajdhani mb-4 ${muted}`}>
        Баланс может уйти в минус: проценты списываются каждый день прямо с него.
      </p>

      {loan ? (
        <div className="space-y-4">
          <div className={`flex items-center justify-between gap-2 text-xs font-rajdhani font-bold uppercase tracking-wider ${
            loan.overdue ? 'text-rose-400' : muted
          }`}>
            <span>{loan.overdue ? 'Просрочено' : `День ${Math.min(loan.day + 1, loan.termDays)} из ${loan.termDays}`}</span>
            <span>{loan.term === 'month' ? 'Месяц' : 'Неделя'}</span>
          </div>

          <div className={`h-1.5 w-full ${isDark ? 'bg-[#15203b]' : 'bg-slate-100'}`}>
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-600"
              style={{ width: `${Math.min(100, Math.round((loan.repaid / loan.principal) * 100))}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className={`text-[10px] font-rajdhani uppercase tracking-wider ${muted}`}>Осталось погасить</p>
              <p className="font-orbitron font-black text-lg text-amber-400">{coins(loan.remaining)} 🪙</p>
            </div>
            <div>
              <p className={`text-[10px] font-rajdhani uppercase tracking-wider ${muted}`}>Уже уплачено %</p>
              <p className="font-orbitron font-black text-lg">{coins(loan.interestPaid)} 🪙</p>
            </div>
          </div>

          <div className={`p-3 space-y-1.5 text-xs font-rajdhani ${isDark ? 'bg-[#0f1a30]' : 'bg-slate-50'}`}>
            <p className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              Сегодняшняя ставка: <b>{formatPercent(loan.dayRate)}</b> = {coins(interestCharge(loan.remaining, loan.term, loan.day + 1))} 🪙
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              Следующее списание: <b>{dateText(loan.nextChargeAt)}</b>
            </p>
            <p className={muted}>Срок возврата: {dateText(loan.dueAt)}</p>
            {loan.overdue && (
              <p className="text-rose-400 font-bold">
                Срок прошёл — ставка продолжает расти каждый день, новый кредит недоступен.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className={`block text-[11px] font-orbitron font-bold uppercase tracking-wider ${muted}`}>
              Погасить (с баланса: {coins(Math.max(userBalance, 0))} 🪙)
            </label>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="Сумма погашения"
              className={field}
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleRepay(Math.floor(Number(payAmount)) || 0)}
                disabled={busy}
                className="flex-1 py-2 font-orbitron font-black text-[11px] uppercase tracking-widest text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all disabled:opacity-50"
              >
                Погасить
              </button>
              <button
                onClick={() => handleRepay(Math.min(loan.remaining, Math.max(userBalance, 0)))}
                disabled={busy}
                className={`flex-1 py-2 font-orbitron font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all disabled:opacity-50 ${
                  isDark ? 'bg-[#162343] text-slate-200 hover:bg-[#1b2b52]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Всё, что есть
              </button>
            </div>
            {userBalance <= 0 && (
              <p className="text-[11px] font-rajdhani text-rose-400">
                Баланс в минусе — погашать нечем. Монеты придут с зарплатой или победами в Upgrader.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className={`block mb-1 text-[11px] font-orbitron font-bold uppercase tracking-wider ${muted}`}>
              Сколько берёшь (доступно {coins(cap)} 🪙)
            </label>
            <input
              type="number"
              min={LOAN_MIN}
              step="1"
              placeholder={`от ${coins(LOAN_MIN)}`}
              className={field}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="flex gap-1.5 mt-2">
              {[0.25, 0.5, 1].map((k) => (
                <button
                  key={k}
                  onClick={() => quickSet(cap * k)}
                  disabled={pending || cap < LOAN_MIN}
                  className={`flex-1 py-1.5 text-[10px] font-orbitron font-black uppercase tracking-wider active:scale-95 transition-all disabled:opacity-40 ${
                    isDark ? 'bg-[#162343] text-slate-200 hover:bg-[#1b2b52]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {k === 1 ? 'МАКС' : `${k * 100}%`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className={`mb-1.5 text-[11px] font-orbitron font-bold uppercase tracking-wider ${muted}`}>Срок</p>
            <div className="grid grid-cols-2 gap-2">
              {LOAN_TERMS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTerm(t.id)}
                  className={`p-2.5 text-left transition-all active:scale-95 ${
                    term === t.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                      : isDark ? 'bg-[#162343] text-slate-300 hover:bg-[#1b2b52]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span className="block font-orbitron font-black text-xs uppercase tracking-wider">{t.label}</span>
                  <span className={`block text-[10px] font-rajdhani mt-0.5 ${term === t.id ? 'text-white/85' : muted}`}>
                    {t.id === 'month'
                      ? '0,5% каждый день'
                      : `${formatPercent(dayRate('week', 1))} → ${formatPercent(dayRate('week', termDays('week')))}`}
                  </span>
                </button>
              ))}
            </div>
            <p className={`mt-2 text-[11px] font-rajdhani ${muted}`}>
              {term === 'month'
                ? `0,5% каждый день, всего ≈ ${formatPercent(totalPercent('month'))} за 30 дней. После срока ставка начнёт расти с 1%.`
                : `Ставка растёт на 1% каждый день: ${formatPercent(dayRate('week', 1))} в первый день, ${formatPercent(dayRate('week', 7))} на седьмой. Всего ≈ ${formatPercent(totalPercent('week'))}. Просрочка — рост до 15% в день.`}
            </p>
          </div>

          {wanted > 0 && (
            <div className={`p-3 text-xs font-rajdhani ${isDark ? 'bg-[#0f1a30]' : 'bg-slate-50'}`}>
              <p>Первое списание через сутки: <b>{coins(previewFirstCharge)} 🪙</b></p>
              <p className={muted}>
                За весь срок набежит ≈ {coins(Math.round((wanted * totalPercent(term)) / 100))} 🪙 — возвращай быстрее, ставка растёт.
              </p>
            </div>
          )}

          <div className={`flex gap-2 p-3 text-[11px] font-rajdhani leading-relaxed ${
            isDark ? 'bg-rose-950/40 text-rose-200' : 'bg-rose-50 text-rose-700'
          }`}>
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>
              После взятия кредита баланс <b>может уйти в минус</b> — проценты списываются каждый день с него.
              Пока кредит не погашен целиком, второй не выдать. Проценты уходят роли-получателю.
            </p>
          </div>

          <button
            onClick={handleTake}
            disabled={busy}
            className="w-full py-2.5 font-orbitron font-black text-[11px] uppercase tracking-widest text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-lg active:scale-95 transition-all disabled:opacity-50"
          >
            {busy ? 'Выдаю...' : 'Взять кредит'}
          </button>
          {cap < LOAN_MIN && !pending && (
            <p className={`text-[11px] font-rajdhani ${muted}`}>
              Нужен баланс хотя бы {coins(LOAN_MIN)} 🪙 — с нулём кредит не выдают.
            </p>
          )}
        </div>
      )}

      {message && (
        <div className={`mt-3 text-center text-sm font-rajdhani ${message.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
          {message.text}
        </div>
      )}

      <p className={`mt-4 text-[10px] font-rajdhani flex items-center gap-1.5 ${muted}`}>
        <RotateCcw className="w-3 h-3" />
        Досрочное погашение останавливает проценты — тело долга закрыто, кредит погашен.
      </p>
    </div>
  );
}
