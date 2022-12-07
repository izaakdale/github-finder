/** @type {import('tailwindcss').Config} */
module.exports = {
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //       "primary": "#064e3b",
  //       "secondary": "#0f766e",    
  //       "accent": "#ecfccb",
  //       "neutral": "#191D24",
  //       "base-100": "#2A303C",
  //       "info": "#d1d5db",
  //       "success": "#166534",
  //       "warning": "#ea580c",
  //       "error": "#991b1b",
  //       },
  //     },
  //   ],
  // },
  plugins: [require("daisyui")],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
}
