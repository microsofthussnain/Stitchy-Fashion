import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        stitchy: {
          cream: "#f8f5ef",
          dark: "#101214",
          gold: "#c7a45d",
        },
      },
    },
  },

  plugins: [],
};

export default config;