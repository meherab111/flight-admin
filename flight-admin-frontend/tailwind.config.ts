import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },screens: {
        'xl': {'max': '1300px'},
        'lg': {'max': '1024px'},
        'md': {'max': '768px'},
      },
      fontSize: {
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '32px'],
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '16': '4rem',
      },
    },
  },
  plugins: [
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('daisyui'),
  ],
} satisfies Config;
