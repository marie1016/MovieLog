import type { Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          darkGray: "#494949",
          gray400: "#ECECEC",
        },
        text: {
          gray500: "#909090",
        },
        gray600: "#818181",
        gray: "#ABABAB",
        blue: "#5088FF",
        danger: "#FF4646",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
        },
        borderRadius: {
          sm: "8px",
        },
      },
      fontFamily: {
        jetBrainsMono: ["var(--font-jetBrainsMono)"],
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(0%)" },
          "25%": { transform: "translateY(-25%)" },
          "50%": { transform: "translateY(-50%)" },
          "75%": { transform: "translateY(-75%)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        "slide-up": "slideUp 10s steps(5) infinite",
      },
    },
    plugins: [lineClamp],
  },
};
export default config;
