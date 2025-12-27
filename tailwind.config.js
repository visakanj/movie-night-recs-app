
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0A0B', // Deep charcoal
          elevated: '#121214',
        },
        surface: {
          DEFAULT: '#1A1A1D', // Card surface
          elevated: '#1F1F23',
        },
        accent: {
          DEFAULT: '#3B82F6', // Restrained blue
          hover: '#2563EB',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA', // Zinc-400
          tertiary: '#71717A',  // Zinc-500
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          highlight: 'rgba(255, 255, 255, 0.12)',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(59, 130, 246, 0.5)',
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
