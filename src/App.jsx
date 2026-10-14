import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Upgrader from './components/Upgrader';
import DiscordAuthModal from './components/DiscordAuthModal';
import Leaderboard from './components/Leaderboard';
import PayForm from './components/PayForm';

export default function App() {
  const [activeTab, setActiveTab] = useState('main');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [discordUser, setDiscordUser] = useState(null);
  const [userBalance, setUserBalance] = useState(1000);
  const [theme, setTheme] = useState('light');

  // Load saved session, theme and fetch real balance
  useEffect(() => {
    try {
      let activeUser = null;

      // 1. Check if redirected from Discord OAuth callback
      const params = new URLSearchParams(window.location.search);
      if (params.get('auth_success') === 'true' && params.get('user')) {
        try {
          activeUser = JSON.parse(decodeURIComponent(params.get('user')));
          setDiscordUser(activeUser);
          localStorage.setItem('fazenn_discord_user', JSON.stringify(activeUser));
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (authErr) {
          console.warn("Failed to parse Discord OAuth user", authErr);
        }
      } else {
        const savedUser = localStorage.getItem('fazenn_discord_user');
        if (savedUser) {
          activeUser = JSON.parse(savedUser);
          setDiscordUser(activeUser);
        }
      }

      // 2. If user is logged in, fetch their REAL balance from database / bot
      if (activeUser?.id) {
        fetch(`/api/economy/balance?userId=${activeUser.id}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && typeof data.balance === 'number') {
              setUserBalance(data.balance);
            }
          })
          .catch(err => console.warn("Failed to fetch initial balance:", err));
      } else {
        // Guest mode demo balance
        const guestBal = localStorage.getItem('fazenn_guest_balance');
        setUserBalance(guestBal ? parseInt(guestBal, 10) : 5000);
      }

      // 3. Theme setup
      const savedTheme = localStorage.getItem('fazenn_theme');
      if (savedTheme) {
        setTheme(savedTheme);
        document.body.className = savedTheme === 'dark' ? 'dark-theme' : 'light-theme';
      } else {
        document.body.className = 'light-theme';
      }
    } catch (e) {
      console.warn("Storage access failed", e);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.body.className = nextTheme === 'dark' ? 'dark-theme' : 'light-theme';
    try {
      localStorage.setItem('fazenn_theme', nextTheme);
    } catch (e) {}
  };

  const handleUpdateBalance = (newBalance) => {
    setUserBalance((prev) => {
      const updated = typeof newBalance === 'function' ? newBalance(prev) : newBalance;
      const safeVal = Math.max(0, Math.round(updated));

      if (discordUser?.id) {
        // Sync real balance to database/bot
        fetch('/api/economy/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: discordUser.id,
            username: discordUser.username,
            newBalance: safeVal
          })
        }).catch(e => console.warn("Failed to sync balance with server:", e));
      } else {
        try {
          localStorage.setItem('fazenn_guest_balance', safeVal.toString());
        } catch (e) {}
      }

      return safeVal;
    });
  };

  const handleAddCoins = (amount = 25000) => {
    // Only available for guests/demo mode
    if (!discordUser) {
      handleUpdateBalance((prev) => prev + amount);
    }
  };

  const handleLogin = (user) => {
    setDiscordUser(user);
    try {
      localStorage.setItem('fazenn_discord_user', JSON.stringify(user));
    } catch (e) {}

    // Load user's real balance from database
    fetch(`/api/economy/balance?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && typeof data.balance === 'number') {
          setUserBalance(data.balance);
        } else {
          setUserBalance(0);
        }
      })
      .catch(() => setUserBalance(0));
  };

  const handleLogout = () => {
    setDiscordUser(null);
    setUserBalance(5000);
    try {
      localStorage.removeItem('fazenn_discord_user');
      localStorage.setItem('fazenn_guest_balance', '5000');
    } catch (e) {
      console.warn("Storage clear failed", e);
    }
  };

  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col select-none transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#060b17] text-slate-100' : 'bg-[#f0f6fc] text-slate-900'
    }`}>
      
      {/* Clean Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={discordUser}
        onOpenAuthModal={() => !isSpinning && setIsAuthModalOpen(true)}
        userBalance={userBalance}
        onAddCoins={() => handleAddCoins(25000)}
        theme={theme}
        onToggleTheme={toggleTheme}
        isSpinning={isSpinning}
      />

      {/* Main Screen: Planet or Centered Upgrader */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'main' ? (
          <HeroSection theme={theme} />
        ) : activeTab === 'leaderboard' ? (
          <Leaderboard theme={theme} />
        ) : activeTab === 'pay' ? (
          <PayForm theme={theme} onClose={() => setActiveTab('main')} />
        ) : (
          <Upgrader
            userBalance={userBalance}
            onUpdateBalance={handleUpdateBalance}
            discordUser={discordUser}
            onOpenDiscordModal={() => !isSpinning && setIsAuthModalOpen(true)}
            theme={theme}
            isSpinning={isSpinning}
            setIsSpinning={setIsSpinning}
          />
        )}
      </main>

      {/* Discord Auth Modal with Theme Support */}
      <DiscordAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={discordUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onSetBalance={(amt) => handleUpdateBalance(amt)}
        theme={theme}
      />
    </div>
  );
}
