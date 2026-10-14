import React from 'react';
import HeroHologram from './3d/HeroHologram';

export default function HeroSection({ theme = 'dark' }) {
  return (
    <section className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
      {/* Pure Minimalist 3D Cybernetic Core, zero text, zero borders */}
      <HeroHologram theme={theme} />
    </section>
  );
}
