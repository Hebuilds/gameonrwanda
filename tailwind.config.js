/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pitch: '#0a1628',
        'pitch-mid': '#0f1f3d',
        'pitch-light': '#162645',
        amber: '#E8A020',
        'amber-dark': '#C4841A',
        'amber-light': '#F0B535',
        card: '#111d35',
        muted: '#6b7fa3',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}