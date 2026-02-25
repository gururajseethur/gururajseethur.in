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
        surface: '#111111',

        /* ── Foreground / text ── */
        fg: {
          DEFAULT: '#FAFAFA',
          secondary: '#888888',
          muted: '#444444',
          faint: '#333333',
        },

        /* ── Edges / borders ── */
        edge: {
          DEFAULT: '#222222',
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
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
        'fade-in-up': 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
