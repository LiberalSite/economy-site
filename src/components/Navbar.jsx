import React from 'react';
import { LogIn, ChevronsUp, Globe, Moon, Sun, Plus } from 'lucide-react';

import AnimatedCounter from './AnimatedCounter';
import { CoinIcon } from './Upgrader';

export default function Navbar({ activeTab, setActiveTab, onScrollTo, user, onOpenAuthModal, userBalance, onAddCoins, theme, onToggleTheme, isSpinning = false }) {
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl shadow-sm transition-colors ${
      isDark ? 'bg-[#060b17]/95 text-white' : 'bg-white/95 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-2 lg:h-20 lg:gap-y-0 py-2 lg:py-0">
        
        {/* Brand Logo: LG ECONOMY */}
        <div 
          onClick={() => !isSpinning && setActiveTab('main')}
          className={`flex items-center gap-2 lg:gap-3 select-none ${isSpinning ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
        >
          <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center font-orbitron font-black text-white text-xs lg:text-sm shadow-sm">
            LG
          </div>
          <span className="font-orbitron font-black text-base sm:text-2xl tracking-wider">
            ECONOMY
          </span>
        </div>

        {/* Right side: Balance with instant +25,000 top up, Dark Theme Toggle, Discord Button */}
        <div className="flex items-center gap-2 lg:gap-3 ml-auto lg:ml-0 order-2 lg:order-3">
          
          {/* Balance Display with smooth animation and CoinIcon */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 lg:px-4 lg:py-2 font-orbitron text-[10px] lg:text-xs font-black shadow-sm ${
            isDark ? 'bg-[#0f172a] text-slate-100' : 'bg-sky-50 text-slate-800'
          }`}>
            <span className="hidden sm:inline">БАЛАНС:</span>
            <AnimatedCounter 
              value={userBalance} 
              className="text-sky-500 text-xs lg:text-sm font-black" 
            />
            <CoinIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4 ml-0.5" />
            {!user && (
              <button
                onClick={onAddCoins}
                disabled={isSpinning}
                className={`ml-1 lg:ml-2 px-1.5 lg:px-2 py-0.5 bg-sky-600 hover:bg-sky-700 text-white font-mono text-[10px] font-black shadow-sm transition-transform active:scale-90 hidden sm:flex sm:items-center gap-1 ${isSpinning ? 'opacity-40 cursor-not-allowed hover:bg-sky-600' : ''}`}
                title="Добавить +25,000 для тестов"
              >
                <Plus className="w-3 h-3" />
                <span>25K</span>
              </button>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            disabled={isSpinning}
            className={`p-2 lg:p-2.5 shadow-sm transition-colors ${
              isSpinning ? 'opacity-40 cursor-not-allowed' : ''
            } ${
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
              className={`flex items-center gap-2 lg:gap-2.5 px-2 py-1.5 lg:px-4 lg:py-2 shadow-sm hover:shadow-md transition-all ${
                isDark ? 'bg-[#0f172a]' : 'bg-white'
              }`}
            >
              <img
                src={user.avatar}
                alt={user.username}
                className="w-7 h-7 lg:w-8 lg:h-8 shadow-sm"
              />
              <span className="hidden lg:block font-orbitron font-black text-xs truncate max-w-[120px]">
                {user.username}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="discord-chamfer-btn flex items-center gap-2 px-3 py-2 lg:px-5 lg:py-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-orbitron font-black text-[10px] lg:text-xs transition-all shadow-md active:scale-95"
            >
              {/* Discord SVG Logo */}
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              <span className="hidden sm:inline">Войти</span>
            </button>
          )}
        </div>

        {/* Navigation Switcher: full-width row under the brand on phones */}
        <nav className={`order-3 lg:order-2 w-full grid grid-cols-4 gap-1 p-1.5 shadow-inner lg:w-auto lg:flex lg:items-center lg:gap-2 ${
          isDark ? 'bg-[#0f172a]' : 'bg-sky-50'
        }`}>
          <button
            onClick={() => !isSpinning && setActiveTab('main')}
            disabled={isSpinning}
            title={isSpinning ? "Дождитесь окончания прокрута" : "Главная"}
            className={`px-2 py-2 lg:px-6 lg:py-2.5 text-[10px] lg:text-xs font-orbitron font-black transition-all flex items-center justify-center gap-1.5 ${
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
            disabled={isSpinning}
            title={isSpinning ? "Дождитесь окончания прокрута" : "Upgrader"}
            className={`px-2 py-2 lg:px-6 lg:py-2.5 text-[10px] lg:text-xs font-orbitron font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'upgrader'
                ? 'bg-sky-600 text-white shadow-sm'
                : isSpinning
                  ? 'opacity-40 cursor-not-allowed text-slate-500'
                  : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
                    : 'text-slate-700 hover:text-sky-600 hover:bg-white'
            }`}
          >
            <ChevronsUp className="w-4 h-4" />
            <span>UPGRADER</span>
          </button>

          {/* Leaderboard button */}
          <button
            onClick={() => onScrollTo('leaderboard')}
            disabled={isSpinning}
            className={`px-2 py-2 lg:px-6 lg:py-2.5 text-[10px] lg:text-xs font-orbitron font-black transition-all flex items-center justify-center ${
              isSpinning
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
                  : 'text-slate-700 hover:text-sky-600 hover:bg-white'
            }`}
          >
            <span className="hidden lg:inline">LEADERBOARD</span>
            <span className="lg:hidden">ТОП</span>
          </button>

          {/* Pay button */}
          <button
            onClick={() => onScrollTo('pay')}
            disabled={isSpinning}
            className={`px-2 py-2 lg:px-6 lg:py-2.5 text-[10px] lg:text-xs font-orbitron font-black transition-all flex items-center justify-center ${
              isSpinning
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
                  : 'text-slate-700 hover:text-sky-600 hover:bg-white'
            }`}
          >
            <span>PAY</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
