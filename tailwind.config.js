/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'dark-bg': '#121212',
        'dark-card': '#1e1e1e',
        'dark-border': '#2a2a2a',
        'dark-text': '#e5e5e5',
        'dark-primary': '#3b82f6',
        'dark-secondary': '#2a2a2a',
      },
    },
  },
  plugins: [],
} 