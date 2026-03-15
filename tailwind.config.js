/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: '#FF5C1A',
        orange2: '#FF8C42',
        yellow: '#FFCF40',
        dark: '#111111',
        dark2: '#1C1C1C',
        cream: '#FFF9F0',
        light: '#FFF3E5',
        gray: '#777',
        white: '#FFFFFF',
        green: '#1B8C5A',
      },
      fontFamily: {
        syne:      ["var(--font-syne)", "sans-serif"],
        fraunces:  ["var(--font-fraunces)", "serif"],
        jakarta:   ["var(--font-jakarta)", "sans-serif"],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'pulse': 'pulse 1.5s infinite',
        'float-y': 'floatY 3s ease-in-out infinite',
        'marquee': 'marquee 22s linear infinite',
        'drop-down': 'dropDown 0.6s ease both',
      },
      keyframes: {
        fadeUp: {
          'from': { transform: 'translateY(28px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' },
        },
        dropDown: {
          'from': { transform: 'translateY(-80px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

