import React, { useState } from 'react';
import { Check, X, AlertTriangle, Shield, UserX, UserCheck, Flame } from 'lucide-react';

export default function ComparisonSection() {
  const [activeTab, setActiveTab] = useState('fazenn');

  const candidates = [
    {
      id: 'fazenn',
      name: 'FAZENN',
      status: 'Кандидат от сообщества',
      badge: 'НАСТОЯЩИЙ АКТИВ',
      isHero: true,
      features: [
        { label: 'Чёткий технический план (боты, войсы, экономика)', val: true },
        { label: 'Открытость: не скрывает лицо и имя', val: true },
        { label: 'Сохранение истории: 0 удалённых каналов', val: true },
        { label: 'Независимость: лидер вне партийных интриг', val: true },
        { label: 'Готовый работающий функционал (Upgrader, сетка зарплат)', val: true },
        { label: 'Ежедневный личный контроль актива', val: true },
      ],
      quote: '«Мои идеи понятны и реалистичны. Принадлежность — это выбор стороны, а независимость — свобода суждения.»'
    },
    {
      id: 'blessyou',
      name: '@bless you',
      status: 'Кандидат-ответчик',
      badge: 'СЛОВА БЕЗ ДЕЛ',
      isHero: false,
      features: [
        { label: 'Чёткий технический план (боты, войсы, экономика)', val: false },
        { label: 'Открытость: не скрывает лицо и имя', val: false },
        { label: 'Сохранение истории: 0 удалённых каналов', val: null },
        { label: 'Независимость: лидер вне партийных интриг', val: false },
        { label: 'Готовый работающий функционал (Upgrader, сетка зарплат)', val: false },
        { label: 'Ежедневный личный контроль актива', val: false },
      ],
      quote: 'Пишет только «Я уже подготовил свой план», но в реальности не показывает ничего, кроме ответов на посты Fazenn.'
    },
    {
      id: 'timofey',
      name: '«Свободные Демократы» / @Timofey_WT',
      status: 'Действующая монополия',
      badge: '7 МЕСТ БЕЗДЕЙСТВИЯ',
      isHero: false,
      features: [
        { label: 'Чёткий технический план (боты, войсы, экономика)', val: false },
        { label: 'Открытость: не скрывает лицо и имя', val: false },
        { label: 'Сохранение истории: 0 удалённых каналов', val: null },
        { label: 'Независимость: лидер вне партийных интриг', val: false },
        { label: 'Готовый работающий функционал (Upgrader, сетка зарплат)', val: false },
        { label: 'Ежедневный личный контроль актива', val: false },
      ],
      quote: 'Узурпация 7 мест в одних руках при полном попутном застое группы. Не такие уж они и демократы!'
    },
    {
      id: 'others',
      name: 'Андрей & Ян',
      status: 'Пассивные оппоненты',
      badge: 'МЕМЫ И ИГНОР',
      isHero: false,
      features: [
        { label: 'Чёткий технический план (боты, войсы, экономика)', val: false },
        { label: 'Открытость: не скрывает лицо и имя', val: false },
        { label: 'Сохранение истории: 0 удалённых каналов', val: false },
        { label: 'Независимость: лидер вне партийных интриг', val: false },
        { label: 'Готовый работающий функционал (Upgrader, сетка зарплат)', val: false },
        { label: 'Ежедневный личный контроль актива', val: false },
      ],
      quote: 'Андрей не разобрался в своих полномочиях и скрывает имя, а Ян игнорирует проблемы и продвигается мемами.'
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16" id="comparison">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border-2 border-sky-400 text-sky-800 text-xs font-orbitron font-black mb-4 shadow-sm">
          <Flame className="w-4 h-4 text-sky-600" /> // ФАКТЫ ПРОТИВ ПУСТЫХ СЛОВ //
        </div>
        <h2 className="text-3xl md:text-5xl font-orbitron font-black text-slate-900 tracking-wider uppercase">
          ПОЧЕМУ <span className="text-sky-600">FAZENN</span>?
        </h2>
        <p className="text-slate-700 font-rajdhani text-base md:text-lg mt-3 font-bold">
          Сравнение кандидатов: факты, ответственность и реальный актив группы.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {candidates.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveTab(c.id)}
            className={`px-5 py-2.5 font-orbitron text-xs font-black uppercase transition-all border-2 ${
              activeTab === c.id
                ? 'bg-sky-600 text-white border-sky-700 shadow-neon-sm'
                : 'bg-white text-slate-800 border-sky-300 hover:border-sky-500'
            }`}
          >
            [{c.name}]
          </button>
        ))}
      </div>

      {/* Cards comparison grid - Strict Square */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {candidates.map((c) => {
          const isSelected = activeTab === c.id;
          return (
            <div
              key={c.id}
              className={`p-6 transition-all duration-200 flex flex-col justify-between border-2 ${
                c.isHero
                  ? 'glass-panel-active border-sky-600 shadow-neon-md bg-white ring-2 ring-sky-400'
                  : 'glass-panel border-sky-300 bg-white hover:border-sky-400'
              } ${isSelected ? 'ring-2 ring-sky-600' : ''}`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] font-mono px-3 py-1 font-black uppercase border ${
                    c.isHero 
                      ? 'bg-sky-100 text-sky-900 border-sky-400' 
                      : 'bg-rose-50 text-rose-800 border-rose-300'
                  }`}>
                    [{c.badge}]
                  </span>
                  {c.isHero ? (
                    <UserCheck className="w-5 h-5 text-sky-600" />
                  ) : (
                    <UserX className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <h3 className={`font-orbitron font-black text-xl mb-1 uppercase ${c.isHero ? 'text-sky-700' : 'text-slate-900'}`}>
                  {c.name}
                </h3>
                <span className="text-xs font-rajdhani text-slate-500 block mb-4 font-bold uppercase">
                  // {c.status} //
                </span>

                <div className="space-y-3 mb-6">
                  {c.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs">
                      {f.val === true ? (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : f.val === false ? (
                        <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      )}
                      <span className={f.val === true ? 'text-slate-900 font-bold' : 'text-slate-600 font-medium'}>
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t-2 border-sky-200 text-xs font-rajdhani italic text-slate-700 bg-sky-50 p-3 font-bold border-l-4 border-sky-500">
                {c.quote}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
