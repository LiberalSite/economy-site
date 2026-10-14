import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Bot, 
  Coins, 
  Gamepad2, 
  History, 
  Eye, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

export default function ProgramSection() {
  const points = [
    {
      icon: <History className="w-6 h-6 text-sky-700" />,
      title: "СОХРАНЕНИЕ ИСТОРИИ & НОВЫЙ ДИЗАЙН",
      tag: "[ПРИОРИТЕТ #1]",
      desc: "Ни один существующий канал не будет удалён или очищен! История сообщества неприкосновенна. В первые дни будет предложен свежий, современный и удобный дизайн структуры каналов.",
    },
    {
      icon: <Bot className="w-6 h-6 text-blue-700" />,
      title: "БОТ ВРЕМЕННЫХ ВОЙСОВ (ДУО / ТРИО)",
      tag: "[ИННОВАЦИЯ]",
      desc: "Участники смогут в 1 клик создавать динамические голосовые комнаты на двоих (ДУО) или троих (ТРИО) под свои катки без спама бесконечными пустыми каналами.",
    },
    {
      icon: <Coins className="w-6 h-6 text-sky-700" />,
      title: "ЭКОНОМИКА & АВТО-ЗАРПЛАТЫ",
      tag: "[СИСТЕМА 24Ч]",
      desc: "Автоматический бот распределения выплат каждые 24 часа по 11 уровням актива. Чем выше ваш вклад в актив группы, тем больше монет вы получаете на баланс.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-700" />,
      title: "UPGRADER МОНЕТ & КРЕДИТНАЯ СИСТЕМА",
      tag: "[ГЕЙМИФИКАЦИЯ]",
      desc: "Запуск официального сайта Upgrader, где вместо скинов используются монеты группы. Введение понятной и справедливой системы кредитов и обновлённых ролей за донат.",
    },
    {
      icon: <Gamepad2 className="w-6 h-6 text-blue-700" />,
      title: "ЗАПРОСЫ РОЛЕЙ ЗА ИГРЫ & ПОИСК ПАТИ",
      tag: "[ГЕЙМИНГ]",
      desc: "Создание отдельного канала «Запросы-по-ролям-за-игры». Активный поиск новых адекватных людей для совместных игр и ежедневный контроль онлайна.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal-700" />,
      title: "СНЯТИЕ СТАТУСА СЕПАРАТИСТА & БЕЗОПАСНОСТЬ",
      tag: "[СПРАВЕДЛИВОСТЬ]",
      desc: "15 числа официально снимается ограничение на участие в выборах. Статус сепаратиста был выдан некомпетентным министром безопасности. Fazenn — не угроза, а гарант развития группы.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16" id="program">
      {/* Section Head */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border-2 border-sky-400 text-sky-800 text-xs font-orbitron font-black mb-4 shadow-sm">
          <Layers className="w-4 h-4" /> // ПЛАНЫ НА БУДУЩЕЕ //
        </div>
        <h2 className="text-3xl md:text-5xl font-orbitron font-black text-slate-900 tracking-wider uppercase">
          ПРЕДВЫБОРНАЯ <span className="text-sky-600">ПРОГРАММА</span>
        </h2>
        <p className="text-slate-700 font-rajdhani text-base md:text-lg mt-4 leading-relaxed font-bold">
          «Принадлежность — это выбор стороны. Независимость — это свобода суждения.»
          <br className="hidden md:inline" /> Без популизма и пустых обещаний: чёткие технические реформы сообщества ЛГ.
        </p>
      </div>

      {/* Grid of Key Features - Strict Squares */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {points.map((p, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 border-2 border-sky-300 hover:border-sky-600 transition-all duration-200 group hover:-translate-y-1 hud-corner"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-sky-50 border-2 border-sky-400 group-hover:border-sky-600 group-hover:bg-white transition-all shadow-sm">
                {p.icon}
              </div>
              <span className="text-[11px] font-mono px-3 py-1 bg-sky-100 text-sky-900 border border-sky-300 font-black">
                {p.tag}
              </span>
            </div>

            <h3 className="font-orbitron font-black text-base text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
              {p.title}
            </h3>

            <p className="font-rajdhani text-sm text-slate-700 leading-relaxed font-semibold">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Manifesto Callout Banner - Square */}
      <div className="glass-panel-active p-8 md:p-10 border-2 border-sky-500 shadow-neon-md relative overflow-hidden bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-sky-700 font-orbitron text-xs font-black tracking-widest">
              <Eye className="w-4 h-4" /> // АБСОЛЮТНАЯ ПРОЗРАЧНОСТЬ //
            </div>
            <h3 className="text-2xl md:text-3xl font-orbitron font-black text-slate-900 uppercase">
              «ЛИДЕР ВНЕ ПОЛИТИКИ, НО МНЕНИЕ ЛИДЕРА ДОЛЖНА ЗНАТЬ ГРУППА»
            </h3>
            <p className="font-rajdhani text-slate-700 text-base leading-relaxed font-bold">
              Лидер без партии — лучшее решение для ЛГ. Fazenn не скрывает своё лицо и имя, не отсиживается молча и не пытается завоевать власть дешёвыми мемами в новостях. Каждый шаг будет открыт для сообщества!
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-3">
            <div className="px-8 py-5 bg-sky-50 border-2 border-sky-500 text-center font-orbitron shadow-sm">
              <span className="text-xs text-slate-600 block mb-1 font-bold">[ДЕНЬ ГОЛОСОВАНИЯ]</span>
              <span className="text-3xl font-black text-sky-700">15/10/2026</span>
            </div>
            <div className="text-center text-xs font-mono text-sky-800 font-black">
              // ВЫБОР ЗА КАЖДЫМ УЧАСТНИКОМ //
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
