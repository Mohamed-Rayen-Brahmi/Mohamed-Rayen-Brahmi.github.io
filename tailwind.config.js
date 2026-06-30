/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050506',
          900: '#0a0a0c',
          800: '#101013',
          700: '#16161a',
          600: '#1d1d22',
          500: '#26262c',
          400: '#3a3a42',
          300: '#56565f',
          200: '#8a8a95',
          100: '#c4c4cc',
        },
        steel: {
          50: '#f4f6f8',
          100: '#e2e8ee',
          200: '#c4d0db',
          300: '#9fb1c2',
          400: '#6f8aa3',
          500: '#4d6b87',
          600: '#3a526b',
          700: '#2e4156',
          800: '#273648',
          900: '#1a2632',
        },
        ember: {
          50: '#fff8ed',
          100: '#ffecd1',
          200: '#ffd59a',
          300: '#ffb45c',
          400: '#ff8e2b',
          500: '#f56f0e',
          600: '#d4540a',
          700: '#a83c0a',
          800: '#7c2d0c',
          900: '#4a1a06',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(255, 142, 43, 0.25)',
        'glow-lg': '0 0 40px rgba(255, 142, 43, 0.35)',
        'glow-steel': '0 0 20px rgba(111, 138, 163, 0.3)',
        'glow-steel-lg': '0 0 40px rgba(111, 138, 163, 0.4)',
        inner: 'inset 0 1px 0 0 rgba(255,255,255,0.05)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, -20px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        flicker: 'flicker 3s ease-in-out infinite',
        drift: 'drift 20s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
