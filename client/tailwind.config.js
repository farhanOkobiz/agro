/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        robo: ["Roboto", "sans-serif"], // Corrected fallback font family
      },
      colors: {
        primary: "#178843",
        secondary: "#F4A51D",
        text: "#292929",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};

// "Roboto", sans-serif 178843