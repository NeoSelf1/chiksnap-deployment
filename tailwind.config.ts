/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#F7F7F9',
          100: '#E7EBEF',
          200: '#DAE0E7',
          300: '#C1CBD8',
          400: '#A1ACBD',
          500: '#7B8696',
          600: '#5D6470',
          700: '#3B414C',
          800: '#1F2127',
          900: '#232830',
        },
        black: '#000000',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
