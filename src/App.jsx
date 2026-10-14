import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Upgrader from './components/Upgrader';
import DiscordAuthModal from './components/DiscordAuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('main');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [discordUser, setDiscordUser] = useState(null);
  const [userBalance, setUserBalance] = useState(100000); // 100,000 LC for testing!
  const [theme, setTheme] = useState('light');

  // Load saved session, theme or boost balance
  useEffect(() => {
    try {
      // 1. Check if redirected from Discord OAuth callback
      const params = new URLSearchParams(window.location.search);
      if (params.get('auth_success') === 'true' && params.get('user')) {
        try {
          const userObj = JSON.parse(decodeURIComponent(params.get('user')));
          setDiscordUser(userObj);
          localStorage.setItem('fazenn_discord_user', JSON.stringify(userObj));
          // Clean URL params without refreshing
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (authErr) {
          console.warn("Failed to parse Discord OAuth user", authErr);
        }
      } else {
        const savedUser = localStorage.getItem('fazenn_discord_user');
        if (savedUser) setDiscordUser(JSON.parse(savedUser));
      }

      const savedBalance = localStorage.getItem('fazenn_balance');
      const savedTheme = localStorage.getItem('fazenn_theme');
      
      // If user had a lower balance, boost to at least 100,000 LC for testing
      const parsedBalance = savedBalance ? parseInt(savedBalance, 10) : 100000;
      const boostedBalance = Math.max(100000, parsedBalance || 100000);
      setUserBalance(boostedBalance);
      localStorage.setItem('fazenn_balance', boostedBalance.toString());

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
      try {
        localStorage.setItem('fazenn_balance', safeVal.toString());
      } catch (e) {
        console.warn("Storage save failed", e);
      }
      return safeVal;
    });
  };

  const handleAddCoins = (amount = 25000) => {
    handleUpdateBalance((prev) => prev + amount);
  };

  const handleLogin = (user) => {
    setDiscordUser(user);
    const balance = user.balance && user.balance > 10000 ? user.balance : 100000;
    setUserBalance(balance);
    try {
      localStorage.setItem('fazenn_discord_user', JSON.stringify(user));
      localStorage.setItem('fazenn_balance', balance.toString());
    } catch (e) {
      console.warn("Storage save failed", e);
    }
  };

  const handleLogout = () => {
    setDiscordUser(null);
    setUserBalance(100000);
    try {
      localStorage.removeItem('fazenn_discord_user');
      localStorage.setItem('fazenn_balance', '100000');
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
