/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        /* ── Backgrounds ── */
        base: '#0A0A0A',
        surface: '#0F0F0F',

        /* ── Foreground / text — NEVER below #555 on dark bg ── */
        fg: {
          DEFAULT: '#FAFAFA',
          secondary: '#999999',
          muted: '#666666',
          faint: '#555555',
        },

        /* ── Edges / borders ── */
        edge: {
          DEFAULT: '#1E1E1E',
          subtle: '#1A1A1A',
          strong: '#333333',
        },

        /* ── Functional accents ── */
        accent: {
          DEFAULT: '#00D9FF',
          dim: '#00A8CC',
        },
        danger: '#FF4444',
        success: '#22C55E',
      },
      maxWidth: {
        content: '1100px',
      },
      fontSize: {
        micro: ['0.6875rem', { lineHeight: '1rem' }],
        body: ['17px', { lineHeight: '1.8' }],
        'card-title': ['22px', { lineHeight: '1.3' }],
        'section-heading': ['clamp(40px, 5vw, 56px)', { lineHeight: '1.1' }],
        'hero-heading': ['clamp(64px, 9vw, 96px)', { lineHeight: '1.05' }],
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
