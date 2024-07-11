import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        Primary: '#1f2023',
        Green: '#1BBF72',
        GrayScale: "#BFC6CC",
        borderGray: "#2c2e34",
        darkGray: "#18191b",
        borderGreen: "#1BBF72",
        yellowDark: "#F5BE00",
        GrayBlue: "#283140" ,
        dark : "#18191B"
      },
      screens: {
        'S-280': '280px',
        'S-340': '340px',
        'S-366': '366px',
        'S-400': '400px',
        'S-500': '500px',
        'S-600': '600px',
        'S-900': '900px',
        'S-1060': '1060px',
        'S-1260': '1260px',
        'S-1360': '1360px',
        'S-1460': '1460px',
        'S-1560': '1560px',
      },
    },
  },
  plugins: [],
};
export default config;
