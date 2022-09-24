/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#550123'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
