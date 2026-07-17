/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1a1a1a',
          light: '#2a2a2a',
          dark: '#0f0f0f',
        },
        paper: {
          DEFAULT: '#f5f2eb',
          warm: '#ebe6db',
          cool: '#fafafa',
        },
        silver: {
          DEFAULT: '#8a8a8a',
          light: '#b0b0b0',
          dark: '#5a5a5a',
        },
        accent: {
          DEFAULT: '#ff5a00',
          glow: 'rgba(255, 90, 0, 0.15)',
          subtle: 'rgba(255, 90, 0, 0.08)',
        },
      },
      fontFamily: {
        display: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(1rem, 2vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '900' }],
        'display-lg': ['clamp(0.9rem, 1.6vw, 1.7rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '900' }],
        'display-md': ['clamp(1.5rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '900' }],
      },
      spacing: {
        'section': 'clamp(6rem, 15vh, 12rem)',
      },
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
        '3000': '3000ms',
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'grain': 'grain 8s steps(10) infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
