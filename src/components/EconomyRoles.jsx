import React, { useState } from 'react';
import { ROLES_DATA } from '../data/rolesData';
import { Coins, Clock, ShieldCheck, ArrowRight, Calculator } from 'lucide-react';

export default function EconomyRoles() {
  const [selectedRole, setSelectedRole] = useState(ROLES_DATA[3]);

  const dailySalary = selectedRole.salary;
  const weeklySalary = dailySalary * 7;
  const monthlySalary = dailySalary * 30;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border-2 border-sky-400 text-sky-800 text-xs font-orbitron font-black mb-4 shadow-sm">
          <Coins className="w-4 h-4" /> // СИСТЕМА ЭКОНОМИКИ ЛГ 2026 //
        </div>
        <h2 className="text-3xl md:text-4xl font-orbitron font-black text-slate-900 tracking-wider uppercase">
          11 УРОВНЕЙ АКТИВА & <span className="text-sky-600">АВТО-ЗАРПЛАТЫ</span>
        </h2>
        <p className="text-sm md:text-base font-rajdhani text-slate-700 mt-3 leading-relaxed font-bold">
          В отличие от действующей пассивной власти, Fazenn внедряет прозрачную систему вознаграждений.
          Специальный Discord-бот начисляет зарплату каждые 24 часа автоматически в зависимости от роли активности!
        </p>
      </div>

      {/* Interactive Salary Calculator Card - Sharp Squares */}
      <div className="glass-panel p-6 md:p-8 mb-12 border-2 border-sky-400 hud-corner bg-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b-2 border-sky-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-sky-100 border-2 border-sky-400 text-sky-700 shadow-sm">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-orbitron font-black text-lg text-slate-900 uppercase">
                [КАЛЬКУЛЯТОР ДОХОДА УЧАСТНИКА]
              </h3>
              <p className="text-xs font-rajdhani text-slate-600 font-bold">
                Выберите вашу текущую роль для расчёта выплат от бота Fazenn
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-rajdhani text-slate-700 font-black uppercase">Интервал:</span>
            <span className="px-4 py-2 bg-sky-50 border-2 border-sky-400 text-sky-800 font-mono text-xs flex items-center gap-2 font-black shadow-sm">
              <Clock className="w-3.5 h-3.5 text-sky-600" /> КАЖДЫЕ 24 ЧАСА
            </span>
          </div>
        </div>

        {/* Calculation display - Strict Rectangles */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-sky-50 border-2 border-sky-200">
            <span className="text-xs font-rajdhani text-slate-500 font-black block mb-1 uppercase">[ВЫБРАННАЯ РОЛЬ]</span>
            <span className="font-orbitron font-black text-sky-800 text-base">{selectedRole.roleTag}</span>
            <span className="text-xs text-slate-700 block font-rajdhani mt-0.5 font-bold">{selectedRole.title}</span>
          </div>

          <div className="p-4 bg-sky-50 border-2 border-sky-200">
            <span className="text-xs font-rajdhani text-slate-500 font-black block mb-1 uppercase">[ВЫПЛАТА В ДЕНЬ / 24Ч]</span>
            <span className="font-orbitron font-black text-slate-950 text-2xl">
              {dailySalary.toLocaleString()} <span className="text-sky-600 text-sm font-black">LC</span>
            </span>
          </div>

          <div className="p-4 bg-sky-50 border-2 border-sky-200">
            <span className="text-xs font-rajdhani text-slate-500 font-black block mb-1 uppercase">[ДОХОД ЗА НЕДЕЛЮ]</span>
            <span className="font-orbitron font-black text-sky-700 text-2xl">
              {weeklySalary.toLocaleString()} <span className="text-sky-600 text-sm font-black">LC</span>
            </span>
          </div>

          <div className="p-4 bg-sky-50 border-2 border-sky-200">
            <span className="text-xs font-rajdhani text-slate-500 font-black block mb-1 uppercase">[ДОХОД ЗА МЕСЯЦ]</span>
            <span className="font-orbitron font-black text-teal-700 text-2xl">
              {monthlySalary.toLocaleString()} <span className="text-teal-700 text-sm font-black">LC</span>
            </span>
          </div>
        </div>
      </div>

      {/* Grid of all 11 Roles */}
      <h3 className="font-orbitron text-lg font-black text-slate-900 mb-6 flex items-center gap-2 uppercase">
        <ShieldCheck className="w-5 h-5 text-sky-600" />
        [ТАРИФНАЯ СЕТКА ВСЕХ 11 РОЛЕЙ АКТИВНОСТИ]
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ROLES_DATA.map((role) => {
          const isSelected = selectedRole.id === role.id;
          return (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role)}
              className={`p-5 cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'glass-panel-active border-sky-600 transform -translate-y-1'
                  : 'glass-panel border-sky-300 hover:border-sky-500'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="font-orbitron font-black text-base text-sky-800">
                  {role.roleTag}
                </span>
                <span
                  className="text-[10px] font-mono px-2.5 py-0.5 font-black uppercase border border-sky-400 bg-sky-100 text-sky-900"
                >
                  [{role.badge}]
                </span>
              </div>

              <div className="text-sm font-rajdhani font-black text-slate-900 mb-2 uppercase">
                {role.title}
              </div>

              <div className="flex items-baseline gap-1 my-3">
                <span className="text-2xl font-orbitron font-black text-slate-950">
                  {role.salary.toLocaleString()}
                </span>
                <span className="text-xs font-black text-sky-600 uppercase font-mono">LC / 24ч</span>
              </div>

              <p className="text-xs font-rajdhani text-slate-700 line-clamp-2 font-bold">
                {role.perks}
              </p>

              <div className="mt-4 pt-3 border-t border-sky-200 flex justify-between items-center text-xs font-rajdhani font-black text-sky-700 uppercase">
                <span>{isSelected ? "// ВЫБРАНО //" : "[ВЫБРАТЬ]"}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
