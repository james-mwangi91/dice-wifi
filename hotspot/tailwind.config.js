/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      /* "Nairobi sunset": deep violet night, coral sun, sunshine yellow, warm cream */
      colors: {
        night: { DEFAULT: '#1E0B3A', 800: '#2A1150', 700: '#3A1A6B', 600: '#4E2A8A' },
        coral: { DEFAULT: '#FF5A3C', 600: '#E8452A', 100: '#FFE3DC' },
        sun: { DEFAULT: '#FFC83D', 100: '#FFF1C7' },
        cream: '#FFF7EE',
        /* Theme-aware tokens (see index.css): flip between light and dark */
        surface: 'rgb(var(--surface) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        soft: 'rgb(var(--soft) / <alpha-value>)',
        mpesa: '#3FA535',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['Outfit', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        progress: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        kenburns: {
          from: { transform: 'scale(1.0) translate3d(0,0,0)' },
          to: { transform: 'scale(1.12) translate3d(-1.5%,-1%,0)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.6)', opacity: '0.7' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        /* Organic shape that slowly breathes — the hero image mask */
        blob: {
          '0%, 100%': { borderRadius: '58% 42% 38% 62% / 52% 44% 56% 48%' },
          '33%': { borderRadius: '44% 56% 52% 48% / 60% 38% 62% 40%' },
          '66%': { borderRadius: '62% 38% 46% 54% / 42% 58% 42% 58%' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'ping-soft': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '75%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        'ping-soft': 'ping-soft 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        kenburns: 'kenburns 9s ease-out forwards',
        ripple: 'ripple 3.6s cubic-bezier(0.2, 0.6, 0.3, 1) infinite',
        float: 'float 5s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        blob: 'blob 14s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
      },
    },
  },
  plugins: [],
};
