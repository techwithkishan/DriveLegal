/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060a14',
          900: '#0A0F1E',
          800: '#141B30',
          700: '#1E294B',
          600: '#2A3B6F',
        },
        electric: {
          DEFAULT: 'rgb(var(--color-electric) / <alpha-value>)',
          glow: 'rgb(var(--color-electric-glow) / <alpha-value>)',
          dark: 'rgb(var(--color-electric-dark) / <alpha-value>)',
        },
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'logo-fade': 'logo-fade 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'logo-fade': {
          '0%': { transform: 'scale(0.9) translateY(20px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
