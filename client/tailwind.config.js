/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundSize:{
        '1000%': '1000%'
      },
      boxShadow: {
        deep: "5px 5px 11px -3px rgba(3, 11, 17, 0.7), -3px -3px 0px -2px rgba(111, 156, 191, 0.7)",
        light: "3px 3px 8px -3px rgba(3, 11, 17, 0.7), -3px -2px 5px -3px rgba(111, 156, 191, 0.7)",
      },
      animation:{
        apear: 'apear .3s linear',
        apearOpacity: 'apearOpacity .3s linear',
        gradient: 'gradient 2s linear infinite alternate'
        
      },
      keyframes:{
        gradient: {
          '0%': {backgroundPosition: '0% 0%'},
          '100%': {backgroundPosition: '100% 0%'}
        },
        apear: {
          '0%': {transform: 'translate(0%, 0%)'},
          '100%': {transform: 'translate(100%, 0%)'}
        },
        apearOpacity: {
          '0%': {opacity: '.7'},
          '100%': {opacity: '1'}
        }
      }
    },
  },
  plugins: [],
}
