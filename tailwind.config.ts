import type { Config } from 'tailwindcss';

const { fontFamily } = require('tailwindcss/defaultTheme');

const BACKGROUND_WIDTH = {
  mobile: '375px',
  tablet: '768px',
  pc: '1024px',
};

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layout/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        buttonHover: 'buttonHover 0.3s ease forwards',
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
      keyframes: (props: { theme: any }) => {
        const { theme } = props;
        return {
          buttonHover: {
            '0%': {
              backgroundColor: theme('colors.tp.blue300'),
              boxShadow: theme('boxShadow.none'),
            },
            '100%': {
              backgroundColor: theme('colors.tp.blue400'),
              boxShadow: theme('boxShadow.lg'),
            },
          },
        };
      },
      maxWidth: { ...BACKGROUND_WIDTH },
      minWidth: { ...BACKGROUND_WIDTH },
      width: { ...BACKGROUND_WIDTH },
    },
    fontFamily: {
      pretendard: ['Pretendard', ...fontFamily.sans],
    },
  },
};
