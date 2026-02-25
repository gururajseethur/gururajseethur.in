import React, { useCallback, useRef, useState, useEffect } from 'react';
import useTryHackMeStats from '../hooks/useTryHackMeStats';

/* ── Rotating typewriter for role titles ── */
const ROLES = ['Filmmaker', 'Storyteller', 'Video Editor', 'Penetration Tester', 'Ethical Hacker'];
const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE_MS = 2000;

function useTypewriter(words) {
  const [display, setDisplay] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplay(current.slice(0, display.length + 1));
        if (display.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), PAUSE_MS);
          return;
        }
      } else {
        setDisplay(current.slice(0, display.length - 1));
        if (display.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, isDeleting ? DELETE_SPEED : TYPE_SPEED);

    return () => clearTimeout(timeout);
  }, [display, isDeleting, wordIndex, words]);

  return display;
}

export default function HeroSection() {
  const heroRef = useRef(null);
  const typedRole = useTypewriter(ROLES);
  const { roomCount } = useTryHackMeStats();
  const roomLabel = Number.isFinite(roomCount) ? `${roomCount}` : '70';

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 max-w-content mx-auto w-full px-5 md:px-8">
        {/* Status badge */}
        <div className="stagger-enter stagger-enter-0 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface border border-edge mb-10">
          <span className="status-dot" />
          <span className="font-mono text-xs text-fg-secondary">Open to opportunities</span>
        </div>

        {/* Headline */}
        <h1 className="stagger-enter stagger-enter-1 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-4 text-fg">
          Security-minded filmmaker{'\u00A0'}
          <br className="hidden sm:block" />
          and ethical hacker.
        </h1>

        {/* Rotating role subtitle */}
        <div className="stagger-enter stagger-enter-2 flex items-center gap-1 mb-8">
          <span className="font-mono text-sm md:text-base text-accent">{typedRole}</span>
          <span className="typewriter-cursor" />
        </div>

        {/* Descriptor */}
        <p className="stagger-enter stagger-enter-3 text-fg-secondary text-base max-w-xl leading-relaxed mb-10">
          Branding &amp; communications lead at CreditAccess Grameen.
          CEH certified. {roomLabel} TryHackMe rooms completed. Building secure systems
          and compelling narratives from Bengaluru.
        </p>

        {/* CTA */}
        <div className="stagger-enter stagger-enter-4 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollTo('experience')}
            className="btn-primary"
          >
            View Work
          </button>
          <a
            href="/Gururaj_Seethur_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume
          </a>
          <button
            onClick={() => scrollTo('contact')}
            className="text-fg-secondary hover:text-fg text-sm font-medium transition-colors"
          >
            Get in touch →
          </button>
        </div>
      </div>
    </section>
  );
}
