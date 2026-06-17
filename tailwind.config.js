/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#0D0D11',
        'deep-void': '#16161D',
        'stellar-purple': '#6C5DD3',
        'plasma-cyan': '#00F0FF',
        'aurora-indigo': '#403075',
        'gold-metallic': '#D4AF37',
        'gold-bright': '#FFD700',
        'muted-silver': '#8E8E9F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
