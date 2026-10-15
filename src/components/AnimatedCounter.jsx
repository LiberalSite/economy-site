import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter: smoothly rolls numbers up or down with glowing Hi-Tech pulse
 */
export default function AnimatedCounter({ value, className = "", prefix = "", suffix = "", format }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('up'); // 'up' | 'down'
  const prevValueRef = useRef(value);

  useEffect(() => {
    const prev = prevValueRef.current;
    if (prev === value) return;

    setDirection(value > prev ? 'up' : 'down');
    setIsAnimating(true);

    const start = displayValue;
    const end = value;
    const duration = 750; // ms
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutExpo for crisp high-tech deceleration
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(start + (end - start) * ease);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
        prevValueRef.current = end;
        setTimeout(() => setIsAnimating(false), 300);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [value]);

  const glowColor = direction === 'up' 
    ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.9)] scale-105' 
    : 'text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.9)] scale-95';

  return (
    <span
      className={`inline-block font-mono tracking-tight transition-all duration-300 transform ${
        isAnimating ? glowColor : ''
      } ${className}`}
    >
      {prefix}{format ? format(displayValue) : displayValue.toLocaleString()}{suffix}
    </span>
  );
}
