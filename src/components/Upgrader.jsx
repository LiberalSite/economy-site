import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';
import AnimatedCounter from './AnimatedCounter';
import { 
  ChevronsUp, 
  ChevronsDown,
  Sparkles, 
  RefreshCw,
  Wallet,
  Trophy,
  Zap
} from 'lucide-react';

/**
 * High-tech metallic gold/amber coin icon that replaces all 'LC' text
 */
export function CoinIcon({ className = "w-4 h-4", glow = true }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      className={`inline-block shrink-0 align-middle ${className} ${glow ? 'drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]' : ''}`}
    >
      <circle cx="12" cy="12" r="10" fill="url(#coinGrad)" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="7.5" stroke="#fef08a" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.8" />
      <path d="M12 7v10M9.5 9.5h5a1.5 1.5 0 0 1 0 3h-5a1.5 1.5 0 0 0 0 3h5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="coinGrad" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbbf24" />
          <stop offset="0.5" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Upgrader({ 
  userBalance, 
  onUpdateBalance, 
  discordUser, 
  theme,
  isSpinning = false,
  setIsSpinning = () => {}
}) {
  const [betAmount, setBetAmount] = useState(100);
  const [multiplier, setMultiplier] = useState(2.0);
  const [winChance, setWinChance] = useState(48.00);
  const [lastWonAmount, setLastWonAmount] = useState(0); // Freezes the won sum
  const [lastLostAmount, setLastLostAmount] = useState(0); // Freezes the lost sum
  const [needleAngle, setNeedleAngle] = useState(180); // Starts pointing straight DOWN (180 deg) into the blue zone
  const [result, setResult] = useState(null); // 'win' | 'loss' | null

  // REAL ONLY: Left side = Real Wins, Right side = Real Losses
  const [realWins, setRealWins] = useState([]);
  const [realLosses, setRealLosses] = useState([]);

  // Presets: x1.5, x2, x3, x5, 25%, 50%, 75%, 90%
  const presetOptions = [
    { label: "x1.5", value: 1.5, chance: 64.00 },
    { label: "x2", value: 2.0, chance: 48.00 },
    { label: "x3", value: 3.0, chance: 32.00 },
    { label: "x5", value: 5.0, chance: 19.20 },
    { label: "25%", value: 3.84, chance: 25.00 },
    { label: "50%", value: 1.92, chance: 50.00 },
    { label: "75%", value: 1.28, chance: 75.00 },
    { label: "90%", value: 1.07, chance: 90.00 },
  ];

  const handleSelectPreset = (opt) => {
    if (isSpinning) return;
    setMultiplier(opt.value);
    setWinChance(opt.chance);
    playSound('click');
  };

  const handleChanceInput = (val) => {
    if (isSpinning) return;
    if (val === '') {
      setWinChance('');
      return;
    }
    let num = parseFloat(val);
    if (isNaN(num)) return;
    if (num > 90) num = 90;
    if (num < 1) num = 1;
    setWinChance(num);
    const newMult = Number((96 / Math.max(1, num)).toFixed(2));
    setMultiplier(newMult);
  };

  // Quick Bet Adjustment Handlers
  const handleBetAdd = (val) => {
    if (isSpinning) return;
    setBetAmount((prev) => Math.min(userBalance, prev + val));
    playSound('click');
  };

  const handleBetHalf = () => {
    if (isSpinning) return;
    setBetAmount((prev) => Math.max(10, Math.floor(prev / 2)));
    playSound('click');
  };

  const handleBetDouble = () => {
    if (isSpinning) return;
    setBetAmount((prev) => Math.min(userBalance, prev * 2));
    playSound('click');
  };

  const handleBetMin = () => {
    if (isSpinning) return;
    setBetAmount(10);
    playSound('click');
  };

  const handleBetMax = () => {
    if (isSpinning) return;
    setBetAmount(userBalance);
    playSound('click');
  };

  const potentialWin = Math.floor(betAmount * multiplier);
  const netProfit = Math.max(0, potentialWin - betAmount);

  // Big threshold check (10,000+ coins)
  const isBigPotential = potentialWin >= 10000;
  const isBigBet = betAmount >= 10000;
  const isBigWin = lastWonAmount >= 10000;
  const isBigLoss = lastLostAmount >= 10000;

  // Wheel Geometry Parameters:
  // Hierarchy: needleRadius (84) < dottedRadius (108) < outerRadius (135)
  const cx = 175;
  const cy = 175;
  const needleRadius = 84;  // Inner circle: needle rotates here (smaller than dotted circle)
  const dottedRadius = 108; // Middle circle: evenly spaced dots (bigger than needle, smaller than percentage ring)
  const outerRadius = 135;  // Outer circle: percentage sector lives here
  const circumference = 2 * Math.PI * outerRadius; // ~848.23

  // Symmetrical Win Sector at the Bottom (180 deg):
  const parsedChance = Math.min(90, Math.max(1, parseFloat(winChance) || 1));
  const winAngle = (parsedChance / 100) * 360;
  const dashLength = (parsedChance / 100) * circumference;

  // Color dynamics:
  // When spinning: Electric Sky Blue
  // When stopped on WIN: Vibrant Emerald Green (#10b981)
  // When stopped on LOSS: Vivid Crimson Red (#ef4444)
  // When idle: Classic Blue (#0284c7)
  let drumColor = "#0284c7";
  let needleColor = "#0284c7";
  let needleStroke = "#0369a1";

  if (isSpinning) {
    drumColor = "#38bdf8";
    needleColor = "#38bdf8";
    needleStroke = "#0284c7";
  } else if (result === 'win') {
    drumColor = isBigWin ? "#fbbf24" : "#10b981"; // GREEN on win (or gold if 10k+)
    needleColor = isBigWin ? "#fbbf24" : "#10b981";
    needleStroke = isBigWin ? "#d97706" : "#059669";
  } else if (result === 'loss') {
    drumColor = "#ef4444"; // RED on loss!
    needleColor = "#ef4444";
    needleStroke = "#b91c1c";
  }

  // SPIN FUNCTION: Slower, realistic physics (slow start -> acceleration -> gradual deceleration)
  const spinDurationMs = 5200; // 5.2s for slow start & smooth deceleration

  const spin = () => {
    if (isSpinning) return;
    if (betAmount <= 0) return;
    if (betAmount > userBalance) {
      alert("Недостаточно монет на балансе!");
      return;
    }

    // Freeze current round parameters
    const currentBet = betAmount;
    const currentMult = multiplier;
    const currentWin = Math.floor(currentBet * currentMult);

    setIsSpinning(true);
    setResult(null);

    // Realistic mechanical drum sound (5.2s physics curve)
    playSound('spin', spinDurationMs);

    // 8 to 9 full rotations with slow start and deceleration
    const randomStop = Math.random() * 360;
    const extraSpins = (8 + Math.floor(Math.random() * 2)) * 360;
    const finalAngle = needleAngle + extraSpins + randomStop;

    setNeedleAngle(finalAngle);

    // Check if the normalized angle is strictly on the win sector
    const normalized = (finalAngle % 360);
    const minAngle = 180 - winAngle / 2;
    const maxAngle = 180 + winAngle / 2;
    const isWin = normalized >= minAngle && normalized <= maxAngle;

    setTimeout(() => {
      setIsSpinning(false);
      const username = discordUser ? discordUser.username : "Вы";

      if (isWin) {
        setResult('win');
        setLastWonAmount(currentWin);
        const roundProfit = currentWin - currentBet;
        onUpdateBalance((prev) => prev + roundProfit);
        playSound('win');

        if (currentWin >= 10000) {
          confetti({
            particleCount: 160,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#fbbf24', '#f59e0b', '#d97706', '#fef08a', '#ffffff']
          });
          setTimeout(() => {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.55 },
              colors: ['#38bdf8', '#0284c7', '#fbbf24']
            });
          }, 250);
        } else {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
            colors: ['#10b981', '#34d399', '#0ea5e9', '#ffffff']
          });
        }

        setRealWins(prev => [
          {
            id: Date.now(),
            user: username,
            bet: currentBet,
            mult: currentMult,
            amount: currentWin,
            time: "Только что"
          },
          ...prev.slice(0, 14)
        ]);
      } else {
        setResult('loss');
        setLastLostAmount(currentBet);
        playSound('loss');
        onUpdateBalance((prev) => prev - currentBet);

        setRealLosses(prev => [
          {
            id: Date.now(),
            user: username,
            bet: currentBet,
            mult: currentMult,
            time: "Только что"
          },
          ...prev.slice(0, 14)
        ]);
      }
    }, spinDurationMs);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`relative w-full h-[calc(100vh-80px)] flex items-center justify-between overflow-hidden ${
      isDark ? 'bg-[#060b17] text-white' : 'bg-[#f0f6fc] text-slate-900'
    } select-none`}>
      
      {/* 1. LEFT COLUMN: REAL WINS ONLY */}
      <aside className={`w-64 shrink-0 h-full p-4 flex flex-col justify-between ${
        isDark ? 'bg-[#0a1122]' : 'bg-white'
      } shadow-sm z-20`}>
        <div>
          <div className="pb-3 mb-2 flex items-center justify-between border-b border-sky-500/10">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
              <span className="text-xs font-orbitron font-black text-sky-400 uppercase tracking-wider">
                ВЫИГРЫШИ (REAL)
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-sky-500/70">
              {realWins.length}
            </span>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-160px)] space-y-2 pr-1">
            {realWins.length === 0 ? (
              <div className="text-[11px] font-rajdhani text-slate-400 italic py-6 text-center flex flex-col items-center gap-1">
                <Trophy className="w-5 h-5 text-slate-500 opacity-40 mb-1" />
                <span>Пока нет выигрышей</span>
              </div>
            ) : (
              realWins.map((item) => {
                const isBigItem = item.amount >= 10000;
                return (
                  <div
                    key={item.id}
                    className={`p-2.5 shadow-sm flex items-center justify-between transition-all duration-200 hover:translate-x-1 animate-item-entry ${
                      isBigItem
                        ? isDark
                          ? 'bg-gradient-to-r from-amber-950/70 via-[#182338] to-amber-900/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                          : 'bg-gradient-to-r from-amber-50 to-yellow-100 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                        : isDark
                          ? 'bg-[#121c35] hover:bg-[#162343]'
                          : 'bg-sky-50/80 hover:bg-sky-100/80'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-orbitron font-black truncate max-w-[100px]">{item.user}</div>
                      <div className="text-[10px] font-rajdhani text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span>{item.time}</span>
                        <span>•</span>
                        <span className="text-sky-400 font-mono font-bold">x{item.mult.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-orbitron font-black ${
                        isBigItem
                          ? 'bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]'
                          : 'text-emerald-400'
                      }`}>
                        +{item.amount.toLocaleString()}
                      </span>
                      <CoinIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </aside>

      {/* 2. EXACT CENTER: DRUM & CLEAN STAKE / WIN PANELS */}
      <div className="flex-1 h-full flex flex-col items-center justify-center p-4">
        
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* ======================================================== */}
          {/* LEFT BLOCK: STAKE CARD (COIN ICON INSTEAD OF LC)        */}
          {/* ======================================================== */}
          <div className={`lg:col-span-4 shadow-sm flex flex-col justify-between h-[390px] transition-all duration-300 ${
            isDark ? 'bg-[#0d1527]' : 'bg-white'
          } ${isBigBet ? 'shadow-[0_0_20px_rgba(245,158,11,0.15)]' : ''}`}>
            
            {/* Top Accent Strip */}
            <div className={`h-1 w-full transition-all duration-300 ${
              isBigBet 
                ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500' 
                : 'bg-gradient-to-r from-sky-500 to-blue-600'
            }`} />

            <div className="p-5 flex-1 flex flex-col justify-between">
              
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-500/10">
                  <div className="flex items-center gap-1.5">
                    <Wallet className={`w-4 h-4 ${isBigBet ? 'text-amber-400' : 'text-sky-400'}`} />
                    <span className="text-xs font-orbitron font-black uppercase tracking-wider">
                      СТАВКА
                    </span>
                  </div>
                  <div className="text-[11px] font-rajdhani font-bold text-slate-400 flex items-center gap-1.5">
                    <span>Баланс:</span>
                    <AnimatedCounter value={userBalance} className="text-sky-400 font-black font-orbitron" />
                    <CoinIcon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Main Hero Amount Display */}
                <div className="my-5 text-center">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    СУММА ДЛЯ АПГРЕЙДА
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <span className={`font-orbitron font-black text-3xl tracking-tight transition-all ${
                      isBigBet
                        ? 'bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                        : isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {betAmount.toLocaleString()}
                    </span>
                    <CoinIcon className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Input Field & Steppers */}
              <div className="space-y-3">
                <div className="relative flex items-center">
                  <input
                    type="number"
                    min="1"
                    max={userBalance}
                    value={betAmount}
                    onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 0))}
                    disabled={isSpinning}
                    className={`w-full pl-4 pr-10 py-2 font-orbitron font-black text-sm outline-none transition-all ${
                      isDark 
                        ? 'bg-[#15203b] text-white focus:bg-[#1a294d]' 
                        : 'bg-sky-50 text-slate-900 focus:bg-sky-100'
                    } ${isBigBet ? 'ring-1 ring-amber-400/50' : 'focus:ring-1 focus:ring-sky-500'}`}
                  />
                  <div className="absolute right-3 pointer-events-none">
                    <CoinIcon className="w-4 h-4" />
                  </div>
                </div>

                {/* Quick Buttons: Row 1 (+Amounts) & Row 2 (Multipliers/Bounds) */}
                <div className="space-y-1.5">
                  <div className="grid grid-cols-4 gap-1">
                    {[10, 50, 100, 500].map(val => (
                      <button
                        key={val}
                        disabled={isSpinning}
                        onClick={() => handleBetAdd(val)}
                        className={`py-1.5 text-xs font-orbitron font-black shadow-sm transition-all active:scale-95 ${
                          isDark ? 'bg-[#15203b] hover:bg-[#1f3058] text-sky-400' : 'bg-sky-50 hover:bg-sky-100 text-sky-700'
                        }`}
                      >
                        +{val}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-1">
                    <button
                      disabled={isSpinning}
                      onClick={handleBetHalf}
                      className={`py-1.5 text-xs font-orbitron font-black shadow-sm transition-all active:scale-95 ${
                        isDark ? 'bg-[#15203b] hover:bg-[#1f3058] text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      1/2
                    </button>
                    <button
                      disabled={isSpinning}
                      onClick={handleBetDouble}
                      className={`py-1.5 text-xs font-orbitron font-black shadow-sm transition-all active:scale-95 ${
                        isDark ? 'bg-[#15203b] hover:bg-[#1f3058] text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      2X
                    </button>
                    <button
                      disabled={isSpinning}
                      onClick={handleBetMin}
                      className={`py-1.5 text-xs font-orbitron font-black shadow-sm transition-all active:scale-95 ${
                        isDark ? 'bg-[#15203b] hover:bg-[#1f3058] text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      MIN
                    </button>
                    <button
                      disabled={isSpinning}
                      onClick={handleBetMax}
                      className={`py-1.5 text-xs font-orbitron font-black shadow-sm transition-all active:scale-95 ${
                        isBigBet 
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white' 
                          : 'bg-sky-600 hover:bg-sky-700 text-white'
                      }`}
                    >
                      MAX
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* CENTER BLOCK: DRUM WHEEL (TRUE CIRCLE SHOCKWAVE, GREEN/RED) */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            
            {/* Drum Stage */}
            <div className="relative w-[310px] h-[310px] flex items-center justify-center select-none">
              
              {/* SVG DRUM WHEEL */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 350 350">
                
                {/* 1. Middle Circle: 48 evenly distributed dots (radius 108: strictly between needle 84 and outer 135) */}
                {Array.from({ length: 48 }).map((_, i) => {
                  const angle = (i * 360) / 48;
                  const rad = (angle * Math.PI) / 180;
                  const x = cx + dottedRadius * Math.sin(rad);
                  const y = cy - dottedRadius * Math.cos(rad);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={1.75}
                      className={isDark ? "fill-slate-600" : "fill-slate-300"}
                    />
                  );
                })}

                {/* 2. Outer Circle Background Track (r = 135) */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={outerRadius}
                  className={isDark ? "stroke-slate-800" : "stroke-slate-200"}
                  strokeWidth="20"
                  fill="transparent"
                />

                {/* 3. Dynamic Sector: Smooth color transition without blinking or filter flicker */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={outerRadius}
                  stroke={drumColor}
                  strokeWidth="20"
                  strokeDasharray={`${dashLength} ${circumference}`}
                  strokeDashoffset="0"
                  transform={`rotate(${90 - winAngle / 2} ${cx} ${cy})`}
                  strokeLinecap="butt"
                  fill="none"
                  style={{
                    filter: `drop-shadow(0 0 12px ${drumColor})`,
                    transition: 'stroke 0.6s ease, filter 0.6s ease',
                  }}
                />
              </svg>

              {/* ARROW INSIDE THE DRUM ON A SMALLER CIRCLE (RADIUS 84px) */}
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                style={{
                  transform: `rotate(${needleAngle}deg)`,
                  transformOrigin: '50% 50%',
                  transitionProperty: 'transform',
                  transitionDuration: isSpinning ? `${spinDurationMs}ms` : '0ms',
                  /* Smooth S-curve: slow start -> rapid spin acceleration -> long gradual deceleration */
                  transitionTimingFunction: 'cubic-bezier(0.5, 0.0, 0.15, 1)',
                }}
              >
                {/* Needle located INSIDE on smaller circle (translateY -84px) */}
                <div 
                  className="absolute"
                  style={{
                    transform: `translateY(-${needleRadius}px)`,
                  }}
                >
                  {/* Faceit sharp chevron arrow head: smooth color morphing */}
                  <svg 
                    width="22" 
                    height="20" 
                    viewBox="0 0 20 18" 
                    style={{
                      filter: `drop-shadow(0 0 10px ${needleColor})`,
                      transition: 'filter 0.6s ease',
                    }}
                  >
                    <polygon 
                      points="10,0 20,16 10,11 0,16" 
                      fill={needleColor}
                      stroke={needleStroke}
                      strokeWidth="1.2"
                      style={{
                        transition: 'fill 0.6s ease, stroke 0.6s ease',
                      }}
                    />
                  </svg>
                </div>
              </div>

              {/* 100% TRANSPARENT CENTER (ZERO CLUTTER TEXT, PURE NUMBERS + COIN ICON) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10">
                {result === 'win' ? (
                  /* WIN DISPLAY: CHEVRONS UP + WON AMOUNT (NO EXTRA TEXT) */
                  <div className="flex flex-col items-center justify-center animate-item-entry">
                    <ChevronsUp className={`w-14 h-14 ${
                      isBigWin ? 'text-amber-400 drop-shadow-[0_0_20px_#fbbf24]' : 'text-emerald-400 drop-shadow-[0_0_16px_#10b981]'
                    } animate-bounce`} />
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`font-orbitron font-black text-2xl ${
                        isBigWin
                          ? 'bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]'
                          : 'text-emerald-400'
                      }`}>
                        +{lastWonAmount.toLocaleString()}
                      </span>
                      <CoinIcon className="w-5 h-5" />
                    </div>
                  </div>
                ) : result === 'loss' ? (
                  /* LOSS DISPLAY: CHEVRONS DOWN + LOST AMOUNT (NO EXTRA TEXT) */
                  <div className="flex flex-col items-center justify-center animate-item-entry">
                    <ChevronsDown className="w-14 h-14 text-rose-500 drop-shadow-[0_0_16px_#ef4444] animate-bounce" />
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`font-orbitron font-black text-2xl ${
                        isBigLoss
                          ? 'bg-gradient-to-r from-rose-400 via-red-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(244,63,94,0.9)]'
                          : 'text-rose-500'
                      }`}>
                        -{lastLostAmount.toLocaleString()}
                      </span>
                      <CoinIcon className="w-5 h-5" />
                    </div>
                  </div>
                ) : isSpinning ? (
                  /* SPINNING RADAR FEEDBACK */
                  <div className="flex flex-col items-center justify-center">
                    <RefreshCw className="w-10 h-10 text-sky-400 animate-spin mb-1 drop-shadow-[0_0_12px_#38bdf8]" />
                    <span className="font-orbitron font-black text-xs text-sky-400 uppercase tracking-widest">
                      SPINNING...
                    </span>
                  </div>
                ) : (
                  /* NORMAL IDLE: 2 UP ARROWS & CHANCE PERCENT */
                  <>
                    <ChevronsUp className="w-9 h-9 text-sky-500 animate-pulse mb-0.5" />
                    <span className="font-orbitron font-black text-3xl text-sky-500">
                      {winChance}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                      ШАНС
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* IMPROVE BUTTON (NO RUSSIAN 'АПГРЕЙДИТЬ') */}
            <button
              onClick={spin}
              disabled={isSpinning || betAmount <= 0 || betAmount > userBalance}
              className={`w-full max-w-[280px] mt-4 py-3.5 font-orbitron font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 btn-shimmer-sweep ${
                isSpinning
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-80'
                  : isBigPotential
                    ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                    : 'bg-gradient-to-r from-sky-500 via-sky-600 to-blue-700 hover:from-sky-400 hover:to-blue-600 text-white shadow-[0_0_16px_rgba(2,132,199,0.35)]'
              }`}
            >
              {isSpinning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>SPINNING...</span>
                </>
              ) : isBigPotential ? (
                <>
                  <Zap className="w-4 h-4 text-slate-950" />
                  <span>MEGA IMPROVE</span>
                </>
              ) : (
                <>
                  <ChevronsUp className="w-4 h-4" />
                  <span>IMPROVE</span>
                </>
              )}
            </button>
          </div>

          {/* ======================================================== */}
          {/* RIGHT BLOCK: WIN CARD (COIN ICON INSTEAD OF LC)         */}
          {/* ======================================================== */}
          <div className={`lg:col-span-4 shadow-sm flex flex-col justify-between h-[390px] transition-all duration-300 ${
            isDark ? 'bg-[#0d1527]' : 'bg-white'
          } ${isBigPotential ? 'shadow-[0_0_25px_rgba(245,158,11,0.2)]' : ''}`}>
            
            {/* Top Accent Strip */}
            <div className={`h-1 w-full transition-all duration-300 ${
              isBigPotential 
                ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-500'
            }`} />

            <div className="p-5 flex-1 flex flex-col justify-between">
              
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-500/10">
                  <div className="flex items-center gap-1.5">
                    <Trophy className={`w-4 h-4 ${isBigPotential ? 'text-amber-400' : 'text-emerald-400'}`} />
                    <span className="text-xs font-orbitron font-black uppercase tracking-wider">
                      ВЫИГРЫШ
                    </span>
                  </div>
                  <div className={`text-[11px] font-mono font-black px-2 py-0.5 ${
                    isBigPotential 
                      ? 'bg-amber-500/20 text-amber-300' 
                      : 'bg-emerald-500/15 text-emerald-400'
                  }`}>
                    x{multiplier.toFixed(2)}
                  </div>
                </div>

                {/* Main Hero Amount Display */}
                <div className="my-4 text-center">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    ВОЗМОЖНЫЙ ВЫИГРЫШ
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <span className={`font-orbitron font-black text-3xl tracking-tight transition-all ${
                      isBigPotential
                        ? 'bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(251,191,36,0.85)]'
                        : 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]'
                    }`}>
                      +{potentialWin.toLocaleString()}
                    </span>
                    <CoinIcon className="w-6 h-6" />
                  </div>

                  {/* Profit breakdown pill */}
                  <div className="mt-1 flex items-center justify-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      ПРИБЫЛЬ:
                    </span>
                    <span className={`text-[11px] font-orbitron font-black ${
                      isBigPotential ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      +{netProfit.toLocaleString()}
                    </span>
                    <CoinIcon className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Manual Percentage Input & Presets */}
              <div className="space-y-2.5">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-orbitron font-black text-slate-400 uppercase">
                    <span>Шанс победы:</span>
                    <span className="text-sky-400">МАКС: 90%</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="90"
                      step="0.1"
                      value={winChance}
                      onChange={(e) => handleChanceInput(e.target.value)}
                      disabled={isSpinning}
                      className={`w-full px-4 py-2 font-orbitron font-black text-sm outline-none transition-all ${
                        isDark 
                          ? 'bg-[#15203b] text-white focus:bg-[#1a294d]' 
                          : 'bg-sky-50 text-slate-900 focus:bg-sky-100'
                      } ${isBigPotential ? 'ring-1 ring-amber-400/50' : 'focus:ring-1 focus:ring-sky-500'}`}
                    />
                    <span className="absolute right-3.5 top-2 text-xs font-mono font-black text-sky-400">%</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1">
                  {presetOptions.map((opt) => {
                    const isSelected = Math.abs(parseFloat(winChance) - opt.chance) < 0.5;
                    return (
                      <button
                        key={opt.label}
                        disabled={isSpinning}
                        onClick={() => handleSelectPreset(opt)}
                        className={`py-1.5 text-xs font-orbitron font-black shadow-sm transition-all active:scale-95 ${
                          isSelected
                            ? isBigPotential
                              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                              : 'bg-sky-600 text-white shadow-md'
                            : isDark
                              ? 'bg-[#15203b] hover:bg-[#1f3058] text-slate-200'
                              : 'bg-sky-50 text-slate-800 hover:bg-sky-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 3. RIGHT COLUMN: REAL LOSSES ONLY */}
      <aside className={`w-64 shrink-0 h-full p-4 flex flex-col justify-between ${
        isDark ? 'bg-[#0a1122]' : 'bg-white'
      } shadow-sm z-20`}>
        <div>
          <div className="pb-3 mb-2 flex items-center justify-between border-b border-rose-500/10">
            <div className="flex items-center gap-1.5">
              <ChevronsDown className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-orbitron font-black text-rose-500 uppercase tracking-wider">
                ПРОИГРЫШИ (REAL)
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-rose-500/70">
              {realLosses.length}
            </span>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-160px)] space-y-2 pr-1">
            {realLosses.length === 0 ? (
              <div className="text-[11px] font-rajdhani text-slate-400 italic py-6 text-center flex flex-col items-center gap-1">
                <ChevronsDown className="w-5 h-5 text-slate-500 opacity-40 mb-1" />
                <span>Пока нет проигрышей</span>
              </div>
            ) : (
              realLosses.map((item) => {
                const isBigLossItem = item.bet >= 10000;
                return (
                  <div
                    key={item.id}
                    className={`p-2.5 shadow-sm flex items-center justify-between transition-all duration-200 hover:translate-x-1 animate-item-entry ${
                      isBigLossItem
                        ? isDark
                          ? 'bg-gradient-to-r from-rose-950/80 via-[#1e111a] to-red-900/50 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                          : 'bg-gradient-to-r from-rose-100 to-red-100 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
                        : isDark
                          ? 'bg-[#121c35] hover:bg-[#162343]'
                          : 'bg-rose-50/80 hover:bg-rose-100/80'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-orbitron font-black truncate max-w-[100px]">{item.user}</div>
                      <div className="text-[10px] font-rajdhani text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span>{item.time}</span>
                        <span>•</span>
                        <span className="text-slate-400 font-mono font-bold">x{item.mult.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-orbitron font-black ${
                        isBigLossItem
                          ? 'bg-gradient-to-r from-rose-400 via-red-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]'
                          : 'text-rose-500'
                      }`}>
                        -{item.bet.toLocaleString()}
                      </span>
                      <CoinIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </aside>

    </div>
  );
}
