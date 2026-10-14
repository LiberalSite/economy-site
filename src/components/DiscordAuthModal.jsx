import React from 'react';
import { X, LogOut } from 'lucide-react';
import { CoinIcon } from './Upgrader';

export default function DiscordAuthModal({ isOpen, onClose, user, onLogin, onLogout, onSetBalance, theme = 'light' }) {
  if (!isOpen) return null;

  const isDark = theme === 'dark';

  const handleRealDiscordLogin = () => {
    window.location.href = "/api/auth/discord";
  };

  const handleDemoLogin = () => {
    onLogin({
      id: "782910384729102847",
      username: "Fazenn_Supporter#2026",
      avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
      role: "@[act+10] - Превосходный Актив",
      balance: 100000
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className={`relative w-full max-w-sm p-6 shadow-2xl transition-all duration-200 ${
        isDark ? 'bg-[#0d1527] text-white' : 'bg-white text-slate-900'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 transition-colors ${
            isDark 
              ? 'bg-[#15203b] text-slate-400 hover:text-white' 
              : 'bg-slate-100 text-slate-600 hover:text-slate-950'
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title: Войти через Discord */}
        <div className="text-center mb-6">
          <h3 className="font-orbitron font-black text-base uppercase tracking-wider">
            Войти через Discord
          </h3>
        </div>

        {user ? (
          /* When logged in: Minimal user card + Logout button */
          <div className="space-y-4">
            <div className={`p-3.5 flex items-center gap-3 shadow-inner ${
              isDark ? 'bg-[#15203b]' : 'bg-sky-50'
            }`}>
              <img
                src={user.avatar}
                alt={user.username}
                className="w-10 h-10 shadow-sm"
              />
              <div className="truncate flex-1">
                <div className="font-orbitron font-black text-xs truncate">
                  {user.username}
                </div>
                <div className="text-[10px] font-mono text-sky-500 font-bold flex items-center gap-1">
                  <span>{user.balance?.toLocaleString()}</span>
                  <CoinIcon className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-orbitron text-xs font-black uppercase transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Выйти</span>
            </button>
          </div>
        ) : (
          /* When not logged in: Minimal view with only Discord button ("Войти" + Discord logo) */
          <div className="space-y-4">
            
            {/* Discord button: chamfer cut corners, "Войти" and Discord logo */}
            <button
              onClick={handleRealDiscordLogin}
              className="discord-chamfer-btn w-full py-3 px-6 bg-[#5865F2] hover:bg-[#4752C4] text-white font-orbitron font-black text-sm flex items-center justify-center gap-3 shadow-md transition-all active:scale-95"
            >
              {/* Discord SVG Logo */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              <span>Войти</span>
            </button>


          </div>
        )}

      </div>
    </div>
  );
}
