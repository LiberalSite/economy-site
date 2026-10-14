import React from 'react';
import { ChevronsDown } from 'lucide-react';
import HeroHologram from './3d/HeroHologram';

export default function HeroSection({ theme = 'dark', onScrollDown }) {
  return (
    <section className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
      {/* Pure Minimalist 3D Cybernetic Core, zero text, zero borders */}
      <HeroHologram theme={theme} />

      <button
        onClick={onScrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-sky-500 hover:text-sky-400 font-orbitron font-black text-[10px] tracking-widest uppercase transition-colors"
      >
        <span>Лидерборд и переводы</span>
        <ChevronsDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  );
}
