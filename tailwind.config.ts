import type { Config } from "tailwindcss";

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
          blue: "#5088FF",
          darkGray: "#494949",
        },
        text: {
          darkGray: "#818181",
          gray: "#ABABAB",
        },
        border: "#ABABAB",
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
    plugins: [],
  },
};
export default config;
