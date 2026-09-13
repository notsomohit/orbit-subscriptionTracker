/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brutal: {
          bg: '#F7F5F0',
          card: '#FFFFFF',
          yellow: '#F5D90A',
          yellowHover: '#E5C900',
          black: '#111111',
          border: '#111111',
          muted: '#666666',
          gray: '#EFECE6',
          grayDark: '#E0DDD5',
          green: '#22C55E',
          greenBg: '#DCFCE7',
          red: '#EF4444',
          redBg: '#FEE2E2',
          blue: '#3B82F6',
          blueBg: '#DBEAFE',
          purple: '#A855F7',
          purpleBg: '#F3E8FF',
        },
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px #111111',
        'brutal': '4px 4px 0px #111111',
        'brutal-lg': '6px 6px 0px #111111',
        'brutal-xl': '8px 8px 0px #111111',
        'brutal-yellow': '4px 4px 0px #F5D90A',
        'brutal-active': '0px 0px 0px #111111',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}
