/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          50: '#f7f9f5',
          100: '#eef3ea',
          200: '#dde7d5',
          300: '#c8d5b9',
          400: '#b3c39d',
          500: '#9ca985',  // Main navbar green
          600: '#7d8a6a',
          700: '#5e6950',
          800: '#3f4835',
          900: '#20241b',
        },
        // Secondary/Accent Colors
        accent: {
          yellow: '#F4C430',      // Main CTA button
          'yellow-dark': '#E5B420',
          'yellow-light': '#FFE5B4',
        },
        // Background Colors
        background: {
          cream: '#FEFAE0',       // Main background
          'light-green': '#E8F4E8',
          'light-pink': '#F4D4D4',
          'light-gray': '#D5D5D5',
        },
        // Sentiment Colors
        sentiment: {
          positive: '#8FB88F',
          negative: '#C88F8F',
          neutral: '#C8D5B9',
        },
        // Utility Colors
        teal: {
          dark: '#4A7C7C',
          DEFAULT: '#5A9C9C',
        },
        brown: {
          light: '#E8DCC8',
          DEFAULT: '#D4C4B0',
          dark: '#A89B8C',
          darker: '#8B7F74',
        },
        orange: {
          light: '#FFD494',
          DEFAULT: '#FF9853',
          dark: '#FF8C42',
        },
        red: {
          DEFAULT: '#C8453F',
          dark: '#A63832',
        },
        green: {
          plant: '#6B8E6B',
          DEFAULT: '#7FA87F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'strong': '0 10px 40px rgba(0, 0, 0, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to bottom right, #A89B8C, #8B7F74)',
        'gradient-feedback': 'linear-gradient(to right, #E8C4A4, #D4B5A0)',
        'gradient-register': 'linear-gradient(to bottom right, #FFE5B4, #FFD494, #FFC474)',
        'gradient-login': 'linear-gradient(to bottom right, #E8DCC8, #D4C4B0)',
        'gradient-phone': 'linear-gradient(to bottom, #C8453F, #A63832)',
      },
    },
  },
  plugins: [],
}