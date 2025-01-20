/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      keyframes: {
        loadingDots: {
          '0%, 20%': { content: "'\.'" },
          '40%': { content: "'\..'" },
          '60%': { content: "'\...'" },
          '80%, 100%': { content: "''" },
        },
        coolStuff: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        wavingHand: {
          '0%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(20deg)' },
          '40%': { transform: 'rotate(-10deg)' },
          '60%': { transform: 'rotate(10deg)' },
          '80%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scrolling: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100px)' },
        },
      },
      animation: {
        loadingDots: 'loadingDots 1s infinite steps(4)',
        coolStuff: 'coolStuff 2s infinite',
        wavingHand: 'wavingHand 1.5s infinite ease-in-out',
        blink: 'blink 1s infinite',
        floating: 'floating 5s ease-in-out infinite',
        scrolling: 'scrolling 3s linear infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
