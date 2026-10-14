/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#f3f8fe",
          card: "#ffffff",
          cardHover: "#f0f9ff",
          border: "#bae6fd",
          borderGlow: "#0284c7",
          blue: "#0284c7",
          cyan: "#0ea5e9",
          lightBlue: "#e0f2fe",
          neon: "#0284c7",
          dark: "#0f172a",
        }
      },
      boxShadow: {
        'neon-sm': '0 4px 15px rgba(2, 132, 199, 0.15)',
        'neon-md': '0 8px 25px rgba(2, 132, 199, 0.22)',
        'neon-lg': '0 12px 40px rgba(2, 132, 199, 0.3)',
        'neon-inset': 'inset 0 0 15px rgba(2, 132, 199, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glowPulse: {
          '0%': { opacity: '0.6', filter: 'drop-shadow(0 0 6px rgba(2, 132, 199, 0.3))' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 16px rgba(2, 132, 199, 0.6))' },
        }
      }
    },
  },
  plugins: [],
}
