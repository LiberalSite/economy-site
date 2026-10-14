import React from 'react';
import { LogIn, ChevronsUp, Globe, Moon, Sun, Plus } from 'lucide-react';

import AnimatedCounter from './AnimatedCounter';
import { CoinIcon } from './Upgrader';

export default function Navbar({ activeTab, setActiveTab, user, onOpenAuthModal, userBalance, onAddCoins, theme, onToggleTheme, isSpinning = false }) {
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl shadow-sm transition-colors ${
      isDark ? 'bg-[#060b17]/95 text-white' : 'bg-white/95 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => !isSpinning && setActiveTab('main')}
          className={`flex items-center gap-3 select-none ${isSpinning ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center font-orbitron font-black text-white text-lg shadow-sm">
            F
          </div>
          <span className="font-orbitron font-black text-2xl tracking-wider">
            FAZENN
          </span>
        </div>

        {/* Navigation Switcher: [ГЛАВНАЯ] & [UPGRADER] - Locked during spin */}
        <nav className={`flex items-center gap-2 p-1.5 shadow-inner ${
          isDark ? 'bg-[#0f172a]' : 'bg-sky-50'
        }`}>
          <button
            onClick={() => !isSpinning && setActiveTab('main')}
            disabled={isSpinning}
            title={isSpinning ? "Дождитесь окончания прокрута" : "Главная"}
            className={`px-6 py-2.5 text-xs font-orbitron font-black transition-all flex items-center gap-2 ${
              activeTab === 'main'
                ? 'bg-sky-600 text-white shadow-sm'
                : isSpinning
                  ? 'opacity-40 cursor-not-allowed text-slate-500'
                  : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
                    : 'text-slate-700 hover:text-sky-600 hover:bg-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>ГЛАВНАЯ</span>
          </button>

          <button
            onClick={() => setActiveTab('upgrader')}
            className={`px-6 py-2.5 text-xs font-orbitron font-black transition-all flex items-center gap-2 ${
              activeTab === 'upgrader'
                ? 'bg-sky-600 text-white shadow-sm'
                : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
                  : 'text-slate-700 hover:text-sky-600 hover:bg-white'
            }`}
          >
            <ChevronsUp className="w-4 h-4" />
            <span>UPGRADER</span>
          </button>
        </nav>

        {/* Right side: Balance with instant +25,000 top up, Dark Theme Toggle, Discord Button */}
        <div className="flex items-center gap-3">
          
          {/* Balance Display with smooth animation and CoinIcon */}
          <div className={`flex items-center gap-1.5 px-4 py-2 font-orbitron text-xs font-black shadow-sm ${
            isDark ? 'bg-[#0f172a] text-slate-100' : 'bg-sky-50 text-slate-800'
          }`}>
            <span>БАЛАНС:</span>
            <AnimatedCounter 
              value={userBalance} 
              className="text-sky-500 text-sm font-black" 
            />
            <CoinIcon className="w-4 h-4 ml-0.5" />
            <button
              onClick={onAddCoins}
              className="ml-2 px-2 py-0.5 bg-sky-600 hover:bg-sky-700 text-white font-mono text-[10px] font-black shadow-sm transition-transform active:scale-90 flex items-center gap-1"
              title="Добавить +25,000 для тестов"
            >
              <Plus className="w-3 h-3" />
              <span>25K</span>
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2.5 shadow-sm transition-colors ${
              isDark 
                ? 'bg-[#0f172a] text-amber-400 hover:bg-[#1e293b]' 
                : 'bg-sky-50 text-slate-700 hover:bg-sky-100 hover:text-slate-900'
            }`}
            title={isDark ? "Включить светлую тему" : "Включить темную тему"}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Discord Button on Navbar: Chamfer corners, Discord Logo + "Войти" */}
          {user ? (
            <button
              onClick={onOpenAuthModal}
              className={`flex items-center gap-2.5 px-4 py-2 shadow-sm hover:shadow-md transition-all ${
                isDark ? 'bg-[#0f172a]' : 'bg-white'
              }`}
            >
              <img
                src={user.avatar}
                alt={user.username}
                className="w-8 h-8 shadow-sm"
              />
              <span className="font-orbitron font-black text-xs truncate max-w-[120px]">
                {user.username}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="discord-chamfer-btn flex items-center gap-2.5 px-5 py-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-orbitron font-black text-xs transition-all shadow-md active:scale-95"
            >
              {/* Discord SVG Logo */}
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              <span>Войти</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
