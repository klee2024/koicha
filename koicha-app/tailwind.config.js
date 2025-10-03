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
      fontFamily: {},
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        ".bold-underline": {
          fontWeight: theme("fontWeight.semibold"),
          textDecorationLine: "underline",
          textDecorationColor: theme("colors.rust.500"),
          textDecorationThickness: "2px",
          textUnderlineOffset: "4px",
        },
      });
    },
  ],
};
