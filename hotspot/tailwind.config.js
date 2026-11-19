/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      /* "Nairobi sunset": deep violet night, coral sun, sunshine yellow, warm cream */
      colors: {
        night: { DEFAULT: '#1E0B3A', 800: '#2A1150', 700: '#3A1A6B', 600: '#4E2A8A' },
        coral: { DEFAULT: '#FF5A3C', 600: '#E8452A', 100: '#FFE3DC' },
        sun: { DEFAULT: '#FFC83D', 100: '#FFF1C7' },
        cream: '#FFF7EE',
        mpesa: '#3FA535',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['Outfit', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        progress: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        'ping-soft': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '75%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        'ping-soft': 'ping-soft 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
};
