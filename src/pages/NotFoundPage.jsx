import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  const [typed, setTyped] = useState('');
  const fullText = `$ curl -I gururajseethur.in${typeof window !== 'undefined' ? encodeURI(window.location.pathname) : '/???'}
HTTP/1.1 404 Not Found
X-Powered-By: curiosity
X-Suggestion: try /`;

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setTyped(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(iv);
    }, 18);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{
      minHeight: '100vh', background: '#070709',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 max(32px, 5vw)',
    }}>
      <div style={{ maxWidth: 480, textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(80px, 15vw, 140px)',
          background: 'linear-gradient(135deg, #FF3B3B 0%, #00D9FF 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', lineHeight: 1, marginBottom: 16,
          letterSpacing: '-0.04em',
        }}>
          404
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: '#FFFFFF', marginBottom: 8 }}>
          Page Not Found
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#50505A', marginBottom: 32, lineHeight: 1.7 }}>
          Unlike a CTF flag, this one&apos;s not hidden — it&apos;s just not here.
        </p>

        <div style={{
          background: '#0E0E12', border: '1px solid #1C1C24', borderRadius: 8,
          padding: '20px 24px', marginBottom: 32, textAlign: 'left',
        }}>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#B0B0C0', margin: 0, lineHeight: 1.8, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {typed}<span style={{ animation: 'blink 1s step-end infinite', opacity: 1 }}>▊</span>
          </pre>
        </div>

        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
            textDecoration: 'none', padding: '11px 28px', borderRadius: 6,
            background: '#FF3B3B', color: '#FFFFFF', display: 'inline-block',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          ← BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
