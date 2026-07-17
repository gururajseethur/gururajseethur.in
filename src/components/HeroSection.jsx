import React, { lazy, useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';

const BinaryStarSystem = lazy(() => import('./three/BinaryStarSystem'));

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;

const MARQUEE_ITEMS = [
  { text: 'FILMMAKER',           color: '#FF3B3B' },
  { text: '·',                   color: '#1C1C24' },
  { text: 'VIDEO EDITOR',        color: '#50505A' },
  { text: '·',                   color: '#1C1C24' },
  { text: 'ETHICAL HACKER',      color: '#00D9FF' },
  { text: '·',                   color: '#1C1C24' },
  { text: 'PENETRATION TESTER',  color: '#50505A' },
  { text: '·',                   color: '#1C1C24' },
  { text: 'CEH CERTIFIED',        color: '#FF3B3B' },
  { text: '·',                   color: '#1C1C24' },
  { text: '54+ THM ROOMS',        color: '#50505A' },
  { text: '·',                   color: '#1C1C24' },
  { text: 'STORYTELLER',         color: '#00D9FF' },
  { text: '·',                   color: '#1C1C24' },
  { text: 'BRAND COMMUNICATIONS', color: '#50505A' },
  { text: '·',                   color: '#1C1C24' },
];

const STATS = [
  { num: '4+',   label: 'Years Experience' },
  { num: '54+',  label: 'THM Rooms'        },
  { num: 'CEH',  label: 'In Progress'      },
  { num: '🏆',   label: 'EOTQ Apr–Jun 25'  },
];

function StarfieldFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        className="animate-spin"
        style={{
          width: 36,
          height: 36,
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.12)',
          borderTopColor: 'rgba(0,217,255,0.75)',
          boxShadow: '0 0 28px rgba(0,217,255,0.18)',
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  const delay = (ms) => ({ animationDelay: `${ms}ms`, animationFillMode: 'both' });

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          background: IS_MOBILE
            ? 'radial-gradient(ellipse at 70% 20%, rgba(255,59,59,0.15) 0%, transparent 50%), radial-gradient(ellipse at 30% 80%, rgba(0,217,255,0.1) 0%, transparent 50%), #070709'
            : '#070709',
        }}
      >
        {/* 3D Canvas */}
        {!IS_MOBILE && (
          <Suspense fallback={<StarfieldFallback />}>
            <BinaryStarSystem />
          </Suspense>
        )}

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(7,7,9,0.7) 100%)',
          pointerEvents: 'none',
        }} />


        {/* ── Bottom-left hero text ── */}
        <div style={{
          position: 'absolute',
          bottom: '12%',
          left: 'max(48px, 5vw)',
          zIndex: 10,
          maxWidth: 680,
        }}>
          {/* Eyebrow */}
          <p
            className={entered ? 'hero-enter' : ''}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              marginBottom: 24, ...delay(200),
            }}
          >
            // BENGALURU, INDIA
          </p>

          {/* Headline */}
          <h1
            className={entered ? 'hero-enter' : ''}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(52px, 12vw, 140px)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              margin: 0,
              ...delay(300),
            }}
          >
            <span style={{ color: '#FF3B3B' }}>Film</span>
            <span style={{ color: '#FFFFFF' }}>maker.</span>
            <br />
            <span style={{ color: '#FFFFFF' }}>Ethical</span>
            <br />
            <span style={{ color: '#00D9FF' }}>Hacker.</span>
          </h1>

          {/* Split descriptor */}
          <div
            className={entered ? 'hero-enter' : ''}
            style={{
              display: 'flex', alignItems: 'center', marginTop: 28,
              ...delay(450),
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#FF3B3B' }}>
              🎬 Video Editor · Filmmaker · Storyteller
            </span>
            <div style={{ width: 1, height: 16, background: '#1C1C24', margin: '0 20px' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#00D9FF' }}>
              🔐 CEH · Pentester · 54+ THM Rooms
            </span>
          </div>

          {/* CTAs */}
          <div
            className={entered ? 'hero-enter' : ''}
            style={{ display: 'flex', gap: 12, marginTop: 40, ...delay(550) }}
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: '#FFFFFF', color: '#070709',
                fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14,
                padding: '12px 32px', borderRadius: 6, border: 'none',
                transition: 'transform 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='scale(0.97)'; e.currentTarget.style.background='#E0E0E0'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.background='#FFFFFF'; }}
            >
              Explore Work
            </button>
            <Link
              to="/contact"
              style={{
                border: '1px solid rgba(255,255,255,0.3)', color: '#FFFFFF',
                fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 14,
                padding: '12px 32px', borderRadius: 6, textDecoration: 'none',
                transition: 'background 0.2s',
                display: 'inline-flex', alignItems: 'center',
              }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              Get In Touch
            </Link>
          </div>

          {/* Stats */}
          <div
            className={entered ? 'hero-enter' : ''}
            style={{
              display: 'flex', gap: 32, marginTop: 48, alignItems: 'center',
              ...delay(650),
            }}
          >
            {STATS.map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div style={{ width: 1, height: 32, background: '#1C1C24' }} />}
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px,4vw,40px)', color: '#FFFFFF', lineHeight: 1 }}>
                    {s.num}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>
                    {s.label}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          className={entered ? 'hero-enter' : ''}
          style={{
            position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
            zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            ...delay(800),
          }}
        >
          {/* SVG mouse */}
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
            <rect x="1" y="1" width="18" height="28" rx="9" stroke="#333" strokeWidth="1.5" />
            <rect className="scroll-mouse-dot" x="9" y="6" width="2" height="6" rx="1" fill="#555" />
          </svg>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#333', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            SCROLL TO EXPLORE
          </span>
        </div>
      </section>

      {/* ── MARQUEE STRIP ─────────────────────────────────────── */}
      <div style={{
        background: '#0E0E12',
        borderTop: '1px solid #1C1C24',
        borderBottom: '1px solid #1C1C24',
        padding: '14px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: item.color,
                marginRight: 24,
              }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
