module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        green: {
          500: "var(--koicha-green-500)",
          700: "var(--koicha-green-700)",
        },
        rust: {
          500: "var(--koicha-rust-500)",
          700: "var(--koicha-rust-700)",
        },
      },
      fontFamily: {
        fontFamily: {
          sans: ["var(--font-sans)"],
          mono: ["var(--font-mono)"],
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(1rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
