/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        /* ── Signal Engine Palette ── */
        void: '#05070C',
        navy: '#0A1020',
        surface: {
          DEFAULT: '#10192B',
          elevated: '#162238',
          subtle: 'rgba(16, 25, 43, 0.75)',
        },

        /* ── System Intelligence: Cobalt & Cyan ── */
        cobalt: {
          DEFAULT: '#5276FF',
          dim: '#3857D8',
          glow: 'rgba(82, 118, 255, 0.25)',
        },
        cyan: {
          DEFAULT: '#59E1FF',
          dim: '#18B7DB',
          glow: 'rgba(89, 225, 255, 0.25)',
        },

        /* ── Storytelling & Transitions: Warm Signal Amber ── */
        amber: {
          DEFAULT: '#FFB65C',
          dim: '#E59934',
          glow: 'rgba(255, 182, 92, 0.25)',
        },

        /* ── Text Hierarchy ── */
        text: {
          primary: '#F2F5FF',
          secondary: '#A1ABC2',
          muted: '#6B7794',
          faint: '#404B65',
        },

        /* ── Technical Borders & Lines ── */
        border: {
          DEFAULT: 'rgba(82, 118, 255, 0.18)',
          subtle: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(89, 225, 255, 0.35)',
        },

        /* ── Compatibility tokens ── */
        base: '#05070C',
        fg: {
          DEFAULT: '#F2F5FF',
          secondary: '#A1ABC2',
          muted: '#6B7794',
          faint: '#404B65',
        },
        edge: {
          DEFAULT: 'rgba(82, 118, 255, 0.18)',
          subtle: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(89, 225, 255, 0.35)',
        },
        accent: {
          DEFAULT: '#59E1FF',
          dim: '#5276FF',
        },
        danger: '#FF5C5C',
        success: '#5CFF9D',
      },
      maxWidth: {
        content: '1280px',
      },
      fontSize: {
        micro: ['0.6875rem', { lineHeight: '1rem' }],
        body: ['16px', { lineHeight: '1.75' }],
        'card-title': ['20px', { lineHeight: '1.3' }],
        'section-heading': ['clamp(36px, 5vw, 56px)', { lineHeight: '1.1' }],
        'hero-heading': ['clamp(52px, 8vw, 92px)', { lineHeight: '1.04' }],
      },
      boxShadow: {
        'glass-panel': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'cobalt-glow': '0 0 25px rgba(82, 118, 255, 0.2)',
        'cyan-glow': '0 0 25px rgba(89, 225, 255, 0.25)',
        'amber-glow': '0 0 25px rgba(255, 182, 92, 0.25)',
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
