const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layout/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      mb: '375px',
      tb: '768px',
      pc: '1024px',
    },
    extend: {
      keyframes: {
        showToast: {
          from: { opacity: '0', top: '0' },
          to: { opacity: '1', top: '5rem' },
        },
        closeToast: {
          from: { opacity: '1', top: '5rem' },
          to: { opacity: '0', top: '0' },
        },
      },
      animation: {
        showToast: 'showToast 1.1s ease-in-out',
        closeToast: 'closeToast 1.1s ease-in-out',
      },
      colors: {
        tp: {
          black_900: '#000000',
          black_800: '#171717',
          black_700: '#333236',
          black_600: '#4B4B4B',
          gray_900: '#787486',
          gray_800: '#9FA6B2',
          gray_700: '#D9D9D9',
          gray_600: '#EEEEEE',
          gray_500: '#FAFAFA',
          white: '#FFFFFF',
          violet_900: '#5534DA',
          violet_100: '#F1EFFD',
          red: '#D6173A',
          green: '#7AC555',
          purple: '#760DDE',
          orange: '#FFA500',
          blue: '#76A5EA',
          pink: '#E876EA',
        },
      },
      screens: {
        mb: '375px',
        tb: '768px',
        pc: '1024px',
      },
    },
    fontFamily: {
      pretendard: ['Pretendard', ...fontFamily.sans],
    },
  },
};
