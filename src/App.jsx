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

  const loadGuestBalance = () => {
    try {
      const guestBal = localStorage.getItem('fazenn_guest_balance');
      setUserBalance(guestBal ? parseInt(guestBal, 10) : 5000);
    } catch (e) {
      setUserBalance(5000);
    }
  };

  // Session from the server-side cookie, then theme
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authError = params.get('auth_error');
    if (params.has('auth_success') || authError) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    if (authError) {
      alert('Не удалось войти через Discord. Попробуйте ещё раз.');
    }

    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setDiscordUser(data.user);
          setUserBalance(data.balance ?? 0);
        } else {
          loadGuestBalance();
        }
      })
      .catch(() => loadGuestBalance());

    try {
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
    if (isSpinning) return;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.body.className = nextTheme === 'dark' ? 'dark-theme' : 'light-theme';
    try {
      localStorage.setItem('fazenn_theme', nextTheme);
    } catch (e) {}
  };

  // Logged-in balances are authoritative on the server; only guest (demo) balances live in localStorage
  const handleUpdateBalance = (newBalance) => {
    setUserBalance((prev) => {
      const updated = typeof newBalance === 'function' ? newBalance(prev) : newBalance;
      const safeVal = Math.max(0, Math.round(updated));
      if (!discordUser) {
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

  const handleLogout = () => {
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    setDiscordUser(null);
    setUserBalance(5000);
    try {
      localStorage.setItem('fazenn_guest_balance', '5000');
    } catch (e) {}
  };

  const [isSpinning, setIsSpinning] = useState(false);
  const [leaderboardKey, setLeaderboardKey] = useState(0);

  // Switching tabs unmounts the drum and cuts the spin animation short
  const changeTab = (tab) => {
    if (!isSpinning) setActiveTab(tab);
  };

  const scrollToSection = (id) => {
    if (isSpinning) return;
    setActiveTab('main');
    // wait for the main page to render if we came from another tab
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <div className={`min-h-screen flex flex-col select-none transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#060b17] text-slate-100' : 'bg-[#f0f6fc] text-slate-900'
    }`}>
      
      {/* Clean Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={changeTab}
        onScrollTo={scrollToSection}
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
          <>
            <HeroSection theme={theme} onScrollDown={() => scrollToSection('leaderboard')} />
            <section className="w-full max-w-6xl mx-auto px-4 py-16 grid gap-6 lg:grid-cols-[3fr_2fr] items-start">
              <div id="leaderboard" className="scroll-mt-24">
                <Leaderboard theme={theme} refreshKey={leaderboardKey} />
              </div>
              <div id="pay" className="scroll-mt-24">
                <PayForm
                  theme={theme}
                  user={discordUser}
                  onOpenAuthModal={() => setIsAuthModalOpen(true)}
                  onBalanceChange={setUserBalance}
                  onPaid={() => setLeaderboardKey((k) => k + 1)}
                />
              </div>
            </section>
          </>
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
        balance={userBalance}
        onLogout={handleLogout}
        theme={theme}
      />
    </div>
  );
}
