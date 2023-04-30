import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,js}"],
  theme: {
    colors: {
      purple: "hsl(259, 100%, 65%)",
      "light-red": "hsl(0, 100%, 67%)",
      white: "hsl(0, 0%, 100%)",
      "off-white": "hsl(0, 0%, 100%)",
      "light-grey": "hsl(0, 0%, 86%)",
      "smokey-grey": "hsl(0, 1%, 44%)",
      "off-black": "hsl(0, 0%, 8%)",
    },
    fontFamily: {
      sans: ["Poppins", ...defaultTheme.fontFamily.sans],
    },
    fontWeight: {
      normal: "400",
      bold: "700",
      "extra-bold": "800",
    },
    extend: {
      fontSize: {
        "3xl": ["2rem", "2.25"],
      },
    },
  },
  plugins: [],
};
