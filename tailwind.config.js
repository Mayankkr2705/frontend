/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        secondary: 'var(--secondary)',
        muted: 'var(--muted)',
        input: 'var(--input)',
        border: 'var(--border)',
        'muted-foreground': 'var(--muted-foreground)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        ring: 'var(--ring)',
        'primary-foreground': 'var(--primary-foreground)',
        'accent-foreground': 'var(--accent-foreground)',
        neon: 'var(--color-neon)',
        destructive: 'var(--destructive)',
      },
      fontFamily: {
        anton: ['var(--font-anton)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        sans: ['var(--font-geist-mono)', 'monospace'], // Geist Mono is used for sans too
      },
      borderRadius: {
        // Force 0px border radius for all variants
        none: '0px',
        sm: '0px',
        DEFAULT: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '0px',
      },
    },
  },
  plugins: [],
};