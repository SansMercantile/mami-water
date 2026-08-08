export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        water: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      animation: {
        'water-flow': 'water-flow 3s ease-in-out infinite',
        'water-pulse': 'water-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'water-flow': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
        'water-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
      },
      backgroundImage: {
        'water-gradient': 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #0ea5e9 100%)',
        'water-pattern': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(3, 105, 161, 0.1) 10px, rgba(3, 105, 161, 0.1) 20px)',
      },
    },
  },
  plugins: [],
}
