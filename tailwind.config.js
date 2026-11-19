/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Ink + paper + signal lime. `primary` is the readable forest green used
           for text/icons on light surfaces; `accent`/`lime` is the signal colour
           used as a fill (with ink text) or as text on dark surfaces. */
        brand: {
          primary: '#15633A',
          secondary: '#1F8A4C',
          accent: '#C5F04A',
          lime: '#C5F04A',
          dark: '#0C1310',
          light: '#F4F1E8',
          ink: '#2A302C',
        },
        /* Warm, faintly green-tinted neutrals replace Tailwind's cool slate so
           every existing slate-* class picks up the new palette. */
        slate: {
          50: '#F7F6F1',
          100: '#EEECE4',
          200: '#DEDBD0',
          300: '#C3C0B3',
          400: '#97958A',
          500: '#6E6D64',
          600: '#52524B',
          700: '#3C3D38',
          800: '#252824',
          900: '#161A17',
          950: '#0C1310',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(15, 23, 42, 0.12)',
        glow: '0 12px 32px -12px rgba(21, 99, 58, 0.45)',
        card: '0 4px 24px -6px rgba(15, 23, 42, 0.08)',
      },
      backgroundImage: {
        'gradient-brand':
          'linear-gradient(135deg, #15633A 0%, #1F8A4C 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-24px) rotate(2deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'ping-soft': {
          '0%': { transform: 'scale(1)', opacity: '0.9' },
          '75%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        ripple: {
          to: { transform: 'scale(4)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
        'ping-soft': 'ping-soft 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        marquee: 'marquee 30s linear infinite',
        ripple: 'ripple 0.6s linear forwards',
      },
    },
  },
  plugins: [],
};
