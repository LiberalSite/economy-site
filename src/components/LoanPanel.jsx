import React, { useState } from 'react';
import { Landmark, AlertTriangle, RotateCcw, Clock, X, Wallet } from 'lucide-react';
import useLoan from '../hooks/useLoan';
import {
  LOAN_MIN, PAYMENT_PERCENT_MIN, PAYMENT_PERCENT_MAX, DAY_MS,
  coins, formatPercent, dailyPayment, maxLoanAmount, loanSchedule,
} from '../lib/loanRules';

const dateText = (value) => new Date(value).toLocaleString('ru-RU', {
  day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
});

const dayWord = (n) => (n === 1 ? 'день' : n < 5 ? 'дня' : 'дней');

export default function LoanPanel({ theme, discordUser, userBalance, onUpdateBalance, onChanged }) {
  const { offer, pending, busy, take, repay } = useLoan({
    discordUser,
    guestBalance: userBalance,
    onGuestBalance: onUpdateBalance,
  });
  const [modal, setModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [amount, setAmount] = useState('');
  const [percent, setPercent] = useState(50);
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
  const chip = `py-1.5 text-[10px] font-orbitron font-black uppercase tracking-wider active:scale-95 transition-all ${
    isDark ? 'bg-[#162343] text-slate-200 hover:bg-[#1b2b52]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
  }`;

  const loan = offer.loan;
  const salary = offer.salaryDaily;
  const wanted = Math.floor(Number(amount)) || 0;
  const payment = dailyPayment(salary, percent);
  const cap = maxLoanAmount(payment);
  const plan = wanted > 0 && payment > 0 ? loanSchedule(wanted, payment) : null;
  const charge = offer.dayRate ?? 2;

  const openModal = () => {
    setMessage(null);
    if (pending) return;
    if (!offer.canBorrow) {
      setMessage({
        type: 'error',
        text: salary < 1
          ? 'Кредит дают за роль активности: без неё нет дневной зарплаты, из которой платят.'
          : 'Открытый кредит уже есть — сначала погаси его.',
      });
      return;
    }
    setConfirmed(false);
    setModal(true);
  };

  const close = () => {
    setModal(false);
    setConfirmed(false);
  };

  const handleTake = async () => {
    setMessage(null);
    try {
      const r = await take(wanted, percent);
      if (typeof r.balance === 'number') onUpdateBalance(r.balance);
      close();
      setAmount('');
      setMessage({ type: 'success', text: 'Кредит выдан. Первый платёж спишут через сутки.' });
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
          : `Осталось ${coins(r.loan?.remainingDue ?? 0)} 🪙 — платёж стал короче на несколько дней.`,
      });
      setPayAmount('');
      onChanged?.();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className={card}>
      <div className="flex items-center gap-2 mb-1">
        <Landmark className="w-5 h-5 text-amber-400" />
        <h2 className="text-lg sm:text-xl font-orbitron font-black">Кредит под зарплату</h2>
        {offer.demo && <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 ${isDark ? 'bg-[#162343] text-slate-300' : 'bg-slate-100 text-slate-500'}`}>ДЕМО</span>}
      </div>
      <p className={`text-xs font-rajdhani mb-4 ${muted}`}>
        Каждый день с баланса автоматически списывают одну и ту же сумму — часть твоей дневной зарплаты по роли активности.
      </p>

      {loan ? (
        <div className="space-y-4">
          <div className={`flex items-center justify-between gap-2 text-xs font-rajdhani font-bold uppercase tracking-wider ${muted}`}>
            <span>День {Math.min(loan.day + 1, loan.termDays)} из {loan.termDays}</span>
            <span>{formatPercent(loan.salaryPercent)} зарплаты</span>
          </div>

          <div className={`h-1.5 w-full ${isDark ? 'bg-[#15203b]' : 'bg-slate-100'}`}>
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-600"
              style={{ width: `${Math.min(100, Math.round((loan.repaid / loan.principal) * 100))}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className={`text-[10px] font-rajdhani uppercase tracking-wider ${muted}`}>Платёж в день</p>
              <p className="font-orbitron font-black text-lg text-amber-400">{coins(loan.dailyPayment)} 🪙</p>
            </div>
            <div>
              <p className={`text-[10px] font-rajdhani uppercase tracking-wider ${muted}`}>Осталось заплатить</p>
              <p className="font-orbitron font-black text-lg">{coins(loan.remainingDue)} 🪙</p>
            </div>
          </div>

          <div className={`p-3 space-y-1.5 text-xs font-rajdhani ${isDark ? 'bg-[#0f1a30]' : 'bg-slate-50'}`}>
            <p className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              Следующее списание: <b>{dateText(loan.nextChargeAt)}</b>
            </p>
            <p className={muted}>Конец срока: {dateText(loan.dueAt)}</p>
            <p className={muted}>
              Взято {coins(loan.principal)} 🪙, уже ушло на погашение {coins(loan.repaid + loan.interestPaid)} 🪙.
            </p>
            <p className={`flex items-center gap-2 ${muted}`}>
              <Wallet className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              Пока кредит открыт, на балансе всегда должно оставаться {coins(loan.dailyPayment)} 🪙 — этот запас нельзя ставить или переводить.
            </p>
          </div>

          <div className="space-y-2">
            <label className={`block text-[11px] font-orbitron font-bold uppercase tracking-wider ${muted}`}>
              Погасить досрочно (с баланса: {coins(Math.max(userBalance, 0))} 🪙)
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
                Нечем гасить — монеты придут с зарплатой или победами в Upgrader.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`grid grid-cols-2 gap-3 text-sm ${pending ? 'opacity-60' : ''}`}>
            <div>
              <p className={`text-[10px] font-rajdhani uppercase tracking-wider ${muted}`}>Твоя зарплата</p>
              <p className="font-orbitron font-black text-lg">{coins(salary)} 🪙<span className={`text-[10px] font-rajdhani ${muted}`}> /день</span></p>
              <p className={`text-[10px] font-rajdhani ${muted}`}>{offer.activityRole || 'роли активностей нет'}</p>
            </div>
            <div>
              <p className={`text-[10px] font-rajdhani uppercase tracking-wider ${muted}`}>Максимум в кредит</p>
              <p className="font-orbitron font-black text-lg text-amber-400">{coins(offer.maxAmount)} 🪙</p>
              <p className={`text-[10px] font-rajdhani ${muted}`}>при платеже {formatPercent(PAYMENT_PERCENT_MAX)} зарплаты</p>
            </div>
          </div>

          <p className={`text-[11px] font-rajdhani leading-relaxed ${muted}`}>
            Процент {formatPercent(charge)} в день от остающегося долга. Сколько платить и когда закроешь — считается само,
            когда выберешь сумму и часть зарплаты.
          </p>

          <button
            onClick={openModal}
            disabled={busy || pending}
            className="w-full py-2.5 font-orbitron font-black text-[11px] uppercase tracking-widest text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-lg active:scale-95 transition-all disabled:opacity-50"
          >
            {pending ? 'Загружаю...' : 'Взять кредит'}
          </button>
        </div>
      )}

      {message && (
        <div className={`mt-3 text-center text-sm font-rajdhani ${message.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
          {message.text}
        </div>
      )}

      <p className={`mt-4 text-[10px] font-rajdhani flex items-center gap-1.5 ${muted}`}>
        <RotateCcw className="w-3 h-3" />
        Досрочное погашение уменьшает долг — проценты остаются только на то, что ещё не возвращено.
      </p>

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4 py-6 overflow-y-auto"
          onClick={close}
        >
          <div
            className={`w-full max-w-[400px] p-5 shadow-2xl my-auto ${isDark ? 'bg-[#0d1527] text-white' : 'bg-white text-slate-900'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-400" />
                <span className="font-orbitron font-black text-sm uppercase tracking-widest">
                  {confirmed ? 'Подтверди кредит' : 'Новый кредит'}
                </span>
              </div>
              <button onClick={close} className="p-1 -mt-1 -mr-1 opacity-60 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            {!confirmed ? (
              <div className="mt-4 space-y-4">
                <div>
                  <label className={`block mb-1 text-[11px] font-orbitron font-bold uppercase tracking-wider ${muted}`}>
                    Сколько берёшь (максимум {coins(cap)} 🪙)
                  </label>
                  <input
                    type="number"
                    min={LOAN_MIN}
                    step="1"
                    placeholder={`от ${coins(LOAN_MIN)}`}
                    className={field}
                    value={amount}
                    onChange={(e) => {
                      const raw = e.target.value;
                      // The field never holds a sum the chosen payment could not repay, so the button
                      // below always offers exactly what is written here.
                      setAmount(raw === '' ? '' : String(Math.min(Math.floor(Number(raw)) || 0, cap)));
                      setConfirmed(false);
                    }}
                  />
                  <div className="grid grid-cols-3 gap-1.5 mt-2">
                    {[0.25, 0.5, 1].map((k) => (
                      <button key={k} onClick={() => { setAmount(String(Math.floor(cap * k))); setConfirmed(false); }} className={chip}>
                        {k === 1 ? 'МАКС' : `${k * 100}%`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block mb-1 text-[11px] font-orbitron font-bold uppercase tracking-wider ${muted}`}>
                    Часть дневной зарплаты на кредит: <span className="text-amber-400">{percent}%</span>
                  </label>
                  <input
                    type="range"
                    min={PAYMENT_PERCENT_MIN}
                    max={PAYMENT_PERCENT_MAX}
                    step="5"
                    value={percent}
                    onChange={(e) => {
                      const p = Number(e.target.value);
                      const newCap = maxLoanAmount(dailyPayment(salary, p));
                      setPercent(p);
                      setAmount((prev) => (Math.floor(Number(prev)) > newCap ? String(newCap) : prev));
                      setConfirmed(false);
                    }}
                    className="w-full accent-amber-500"
                  />
                  <p className={`text-[11px] font-rajdhani ${muted}`}>
                    Платёж в день: <b className="text-white">{coins(payment)} 🪙</b> из {coins(salary)} 🪙 зарплаты.
                    Больше всей зарплаты взять нельзя.
                  </p>
                </div>

                {plan && (
                  <div className={`p-3 text-xs font-rajdhani space-y-1 ${isDark ? 'bg-[#0f1a30]' : 'bg-slate-50'}`}>
                    <p>Вернёшь всего: <b>{coins(wanted + plan.interest)} 🪙</b></p>
                    <p>Переплата: <b className="text-amber-400">{coins(plan.interest)} 🪙</b> за {plan.days} {dayWord(plan.days)}</p>
                    <p className={muted}>Проценты уходят роли, которая собирает проигрыши и комиссии.</p>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (!plan || wanted < LOAN_MIN) {
                      setMessage({ type: 'error', text: `Минимальная сумма кредита — ${coins(LOAN_MIN)} 🪙` });
                      return;
                    }
                    setMessage(null);
                    setConfirmed(true);
                  }}
                  className="w-full py-2.5 font-orbitron font-black text-[11px] uppercase tracking-widest text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-lg active:scale-95 transition-all"
                >
                  Взять {coins(wanted)} 🪙
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className={`flex gap-3 p-3 text-[11px] font-rajdhani leading-relaxed ${
                  isDark ? 'bg-rose-950/40 text-rose-200' : 'bg-rose-50 text-rose-700'
                }`}>
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>
                    Каждый день ровно {coins(payment)} 🪙 будут списываться с баланса, пока долг не закроется.
                    На балансе всегда должно оставаться не меньше одного платежа — эти монеты нельзя поставить или перевести.
                    Второй кредит дадут только после полного погашения.
                  </p>
                </div>

                <div className={`p-3 space-y-1.5 text-xs font-rajdhani ${isDark ? 'bg-[#0f1a30]' : 'bg-slate-50'}`}>
                  <p className="flex justify-between gap-2"><span className={muted}>Сумма</span><b>{coins(wanted)} 🪙</b></p>
                  <p className="flex justify-between gap-2"><span className={muted}>Платёж в день</span><b>{coins(payment)} 🪙 ({percent}% зарплаты)</b></p>
                  <p className="flex justify-between gap-2"><span className={muted}>Срок</span><b>{plan.days} {dayWord(plan.days)}</b></p>
                  <p className="flex justify-between gap-2"><span className={muted}>Вернёшь всего</span><b className="text-amber-400">{coins(wanted + plan.interest)} 🪙</b></p>
                  <p className="flex justify-between gap-2"><span className={muted}>Переплата</span><b>{coins(plan.interest)} 🪙</b></p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTake}
                    disabled={busy}
                    className="flex-1 py-2.5 font-orbitron font-black text-[11px] uppercase tracking-widest text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg active:scale-95 transition-all disabled:opacity-50"
                  >
                    {busy ? 'Выдаю...' : 'Подтвердить'}
                  </button>
                  <button
                    onClick={() => setConfirmed(false)}
                    className={`flex-1 py-2.5 font-orbitron font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all ${
                      isDark ? 'bg-[#162343] text-slate-300 hover:bg-[#1b2b52]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Назад
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
