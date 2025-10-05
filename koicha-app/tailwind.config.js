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
    },
  },
  plugins: [],
};
