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
    },
    plugins: [lineClamp],
  },
};
export default config;
