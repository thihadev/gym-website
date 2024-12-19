/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      blur: {
        '200px': '200px', // Custom blur amount
      },
      colors: {
        caloryCard: "#5A5A5A",
        'blue-custom-1': 'rgb(0, 115, 255)',
        'blue-custom-2': 'rgb(0, 115, 255)',
      },
    },
  },
  plugins: [],
}