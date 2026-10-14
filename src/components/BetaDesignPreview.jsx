import React, { useState } from 'react';
import { 
  Hash, 
  Volume2, 
  Folder, 
  MessageSquare, 
  Gamepad2, 
  Coins, 
  ShieldCheck, 
  Users, 
  Sparkles,
  Send,
  Plus
} from 'lucide-react';

export default function BetaDesignPreview() {
  const [activeChannel, setActiveChannel] = useState('запросы-по-ролям-за-игры');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const categories = [
    {
      name: "📢 ┃ ВАЖНОЕ И НОВОСТИ",
      channels: [
        { name: "новости-сервера", type: "text", unread: false },
        { name: "правила-и-демократия", type: "text", unread: false },
        { name: "выборы-15-октября", type: "text", unread: true },
      ]
    },
    {
      name: "💎 ┃ ЭКОНОМИКА FAZENN",
      channels: [
        { name: "выплаты-актива-24ч", type: "text", unread: true },
        { name: "апгрейдер-монет", type: "text", unread: false },
        { name: "кредитный-отдел", type: "text", unread: false },
      ]
    },
    {
      name: "🎮 ┃ ИГРЫ & РОЛИ",
      channels: [
        { name: "запросы-по-ролям-за-игры", type: "text", unread: true },
        { name: "поиск-пати-тиммейтов", type: "text", unread: false },
      ]
    },
    {
      name: "🔊 ┃ ДИНАМИЧЕСКИЕ ВОЙСЫ",
      channels: [
        { name: "➕ Создать ДУО (2 чел)", type: "voice", isDynamic: true },
        { name: "➕ Создать ТРИО (3 чел)", type: "voice", isDynamic: true },
        { name: "ДУО #1 [Alex + Fazenn]", type: "voice", activeUsers: 2 },
        { name: "ТРИО #4 [Cyber, Neo, Rex]", type: "voice", activeUsers: 3 },
      ]
    },
    {
      name: "🏛️ ┃ АРХИВ (СОХРАНЁННАЯ ИСТОРИЯ)",
      channels: [
        { name: "история-старой-лг", type: "text", unread: false },
        { name: "память-событий", type: "text", unread: false },
      ]
    }
  ];

  const handleSendFeedback = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackText('');
      setFeedbackSent(false);
    }, 3500);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16" id="beta-design">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border-2 border-sky-400 text-sky-800 text-xs font-orbitron font-black mb-4 shadow-sm">
          <Sparkles className="w-4 h-4" /> // БЕТА-ТЕСТ ИНТЕРФЕЙСА //
        </div>
        <h2 className="text-3xl md:text-5xl font-orbitron font-black text-slate-900 tracking-wider uppercase">
          НОВЫЙ ДИЗАЙН <span className="text-sky-600">КАНАЛОВ DISCORD</span>
        </h2>
        <p className="text-slate-700 font-rajdhani text-base md:text-lg mt-3 font-bold">
          «Ни один канал не будет удалён или очищен — история группы сохранена!»
          <br />Протестируйте интерактивный мокап новой эргономики:
        </p>
      </div>

      {/* Discord Interactive Mockup Window: Strict Square Frame */}
      <div className="border-2 border-sky-500 bg-white shadow-neon-lg overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
        
        {/* Left Column: Server Channels Navigation */}
        <div className="md:col-span-5 bg-sky-50 border-r-2 border-sky-300 p-4 flex flex-col justify-between">
          <div>
            {/* Server Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-sky-300">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center font-orbitron font-black text-white text-sm shadow-sm border border-sky-400">
                  LG
                </div>
                <div>
                  <h4 className="font-orbitron font-black text-slate-900 text-sm uppercase">СЕРВЕР ЛГ [2026]</h4>
                  <span className="text-[10px] text-sky-700 font-mono font-black">// ДИЗАЙН FAZENN //</span>
                </div>
              </div>
              <span className="w-3 h-3 bg-emerald-500 animate-pulse" />
            </div>

            {/* Categories & Channel list */}
            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {categories.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[11px] font-rajdhani font-black text-slate-600 tracking-wider uppercase px-2">
                    {cat.name}
                  </div>
                  {cat.channels.map((ch, chIdx) => {
                    const isActive = activeChannel === ch.name;
                    return (
                      <div
                        key={chIdx}
                        onClick={() => setActiveChannel(ch.name)}
                        className={`flex items-center justify-between px-3 py-2 text-xs font-rajdhani cursor-pointer transition-colors border ${
                          isActive
                            ? 'bg-sky-600 text-white font-black border-sky-700 shadow-sm'
                            : 'text-slate-800 hover:bg-white hover:text-sky-700 border-transparent hover:border-sky-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {ch.type === 'voice' ? (
                            <Volume2 className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-sky-600'}`} />
                          ) : (
                            <Hash className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          )}
                          <span className="truncate">{ch.name}</span>
                        </div>

                        {ch.isDynamic && (
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 font-black uppercase ${
                            isActive ? 'bg-sky-800 text-white' : 'bg-sky-200 text-sky-900 border border-sky-400'
                          }`}>
                            АВТО
                          </span>
                        )}
                        {ch.activeUsers && (
                          <span className={`text-[10px] font-mono flex items-center gap-1 font-black ${
                            isActive ? 'text-white' : 'text-emerald-700'
                          }`}>
                            <Users className="w-3 h-3" /> {ch.activeUsers}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t-2 border-sky-300 text-[11px] text-slate-700 font-mono flex items-center justify-between font-black uppercase">
            <span>[АРХИВ: 100% CEL]</span>
            <span className="text-sky-700">[0 УДАЛЕНО]</span>
          </div>
        </div>

        {/* Right Column: Channel View & Beta Feedback */}
        <div className="md:col-span-7 p-6 flex flex-col justify-between bg-white">
          <div>
            {/* Channel Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-sky-200 mb-6">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-sky-600" />
                <span className="font-orbitron font-black text-slate-900 text-sm uppercase">
                  {activeChannel}
                </span>
              </div>
              <span className="text-xs font-mono text-sky-900 bg-sky-100 px-3 py-1 border border-sky-400 font-black">
                [ПРЕДПРОСМОТР]
              </span>
            </div>

            {/* Mock Channel Messages */}
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-sky-50 border-2 border-sky-300">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-orbitron font-black text-sky-800 text-xs uppercase">Fazenn [КАНДИДАТ]</span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">12:00</span>
                  <span className="text-[9px] bg-sky-600 text-white px-2 py-0.5 font-black uppercase font-mono">ОФИЦИАЛЬНО</span>
                </div>
                <p className="text-xs font-rajdhani text-slate-800 leading-relaxed font-bold">
                  «Приветствую каждого участника! В канале <span className="text-sky-700 font-black">#запросы-по-ролям-за-игры</span> вы можете подавать заявки на подтверждение игровых достижений, а временные войсы ДУО и ТРИО позволят играть без ожидания модераторов!»
                </p>
              </div>

              <div className="p-4 bg-slate-50 border-2 border-slate-300">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-orbitron font-black text-slate-900 text-xs uppercase">Discord Bot [ЭКОНОМИКА]</span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">00:00</span>
                  <span className="text-[9px] bg-blue-700 text-white px-2 py-0.5 font-black uppercase font-mono">BOT</span>
                </div>
                <p className="text-xs font-rajdhani text-slate-700 font-semibold">
                  🔔 Ежедневные зарплаты по 11 уровням актива успешно начислены! Баланс обновлен и синхронизирован с веб-порталом.
                </p>
              </div>
            </div>
          </div>

          {/* User Feedback Form */}
          <div className="pt-4 border-t-2 border-sky-200">
            <h5 className="font-orbitron font-black text-xs text-slate-900 mb-2 flex items-center gap-1.5 uppercase">
              <MessageSquare className="w-4 h-4 text-sky-600" />
              [ОСТАВИТЬ ОТЗЫВ НА БЕТА-ТЕСТ ДИЗАЙНА]
            </h5>
            
            {feedbackSent ? (
              <div className="p-3 bg-emerald-100 border-2 border-emerald-500 text-emerald-900 text-xs font-rajdhani flex items-center gap-2 font-black">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                СПАСИБО! ВАШ ОТЗЫВ ПРИНЯТ В ПРЕДВЫБОРНЫЙ ШТАБ FAZENN.
              </div>
            ) : (
              <form onSubmit={handleSendFeedback} className="flex gap-2">
                <input
                  type="text"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Ваш конструктивный отзыв или предложение..."
                  className="flex-1 bg-sky-50 border-2 border-sky-400 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-sky-600 transition-colors font-bold"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-orbitron font-black text-xs transition-all shadow-sm flex items-center gap-1.5 border border-sky-700"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ОТПРАВИТЬ</span>
                </button>
              </form>
            )}

            <p className="text-[10px] text-slate-600 font-rajdhani mt-2 italic font-bold">
              «Я открыт к нормальной критике, все выглядит отлично — жду конструктивных мыслей для развития группы.»
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
