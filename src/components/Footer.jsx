import React from 'react';
import { Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-sky-200 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-sky-100">
          
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center font-orbitron font-black text-white text-xs">
                F
              </div>
              <span className="font-orbitron font-bold text-slate-900 text-base">FAZENN // 2026</span>
            </div>
            <p className="text-xs font-rajdhani text-slate-600 leading-relaxed font-medium">
              Официальный портал предвыборной кампании на пост Лидера группы ЛГ. Дата выборов: 15/10/2026.
            </p>
            <div className="text-[11px] font-mono text-sky-700 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
              <span>АБСОЛЮТНО ВСЕ ПРОЗРАЧНО</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="font-orbitron font-bold text-slate-900 text-xs uppercase tracking-wider">
              ПОЗИЦИЯ КАНДИДАТА
            </h4>
            <ul className="text-xs font-rajdhani text-slate-600 space-y-1.5 font-medium">
              <li>• Ни один канал не будет удалён или очищен</li>
              <li>• Снятие несправедливого статуса сепаратиста 15 числа</li>
              <li>• Автоматические выплаты зарплат каждые 24 часа</li>
              <li>• Создание каналов ДУО и ТРИО под запрос участников</li>
              <li>• Прозрачный Upgrader монет группы</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-orbitron font-bold text-slate-900 text-xs uppercase tracking-wider">
              ЧЕСТНОСТЬ & ИИ
            </h4>
            <p className="text-xs font-rajdhani text-slate-600 leading-relaxed font-medium">
              «Я заявляю, что текст программы написан мной лично без использования ИИ (кроме постера). Я открыт к любой конструктивной критике!»
            </p>
            <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-[10px] font-mono text-sky-800 font-bold">
              BUILD: VERCEL_READY // GITHUB_DEPLOY // LIGHT_HI_TECH_v2.0
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-rajdhani text-slate-500 gap-4 font-semibold">
          <div>
            © 2026 FAZENN. Предвыборная программа. Все права защищены сообществом ЛГ.
          </div>
          <div className="font-mono text-[11px] text-sky-700 font-bold">
            ВЫБОР ЗА УЧАСТНИКАМИ • 15.10.2026
          </div>
        </div>
      </div>
    </footer>
  );
}
