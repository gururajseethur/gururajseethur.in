import React, { useState, useEffect, useCallback } from 'react';
import { useMasterClock } from '../context/ClockContext';

const NAV_ITEMS = [
  { id: 'section-systems', label: 'SYSTEMS' },
  { id: 'section-security', label: 'SECURITY' },
  { id: 'section-creative', label: 'CREATIVE' },
  { id: 'section-audit', label: 'AUDIT' },
  { id: 'section-contact', label: 'CONTACT' },
];

/**
 * HUD Overlay — system status + command console navigation.
 * Fixed. Monospace. 1px border buttons. No glow. No gradient.
 */
export default function HUD({ scrollProgress = 0 }) {
  const { override, toggleOverride } = useMasterClock();
  const [activeSection, setActiveSection] = useState('');

  // Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Use GSAP scrollTo if available, otherwise native
    if (window.gsap && window.gsap.plugins && window.ScrollToPlugin) {
      window.gsap.to(window, { scrollTo: { y: el, offsetY: 0 }, duration: 0.8, ease: 'power2.out' });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none select-none">
      {/* Top bar */}
      <div className="flex justify-between items-start px-5 py-4 md:px-8">
        {/* Left — System ID */}
        <div className="hud-text">
          <span className="text-core-cyan">COMMAND</span>
          <span className="text-core-muted">_</span>
          <span className="text-core-bright">CORE</span>
          <div className="text-core-muted mt-1 text-[0.55rem]">
            v1.0.0 // operator::gururaj
          </div>
        </div>

        {/* Right — Navigation Console + Override */}
        <div className="flex items-start gap-6">
          {/* Nav links — command console style */}
          <nav className="hidden md:flex items-center gap-1 pointer-events-auto">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                data-interactive
                className={`font-mono text-[0.6rem] tracking-[0.08em] px-3 py-1.5
                  border transition-colors duration-150
                  ${activeSection === id
                    ? 'border-core-cyan text-core-cyan'
                    : 'border-core-border text-core-muted hover:border-core-text hover:text-core-text'
                  }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Override control */}
          <div className="hud-text text-right">
            <div className="flex items-center gap-2 justify-end">
              <span className={override ? 'text-core-green' : 'text-core-muted'}>
                {override ? '◉ OVERRIDE' : '○ NORMAL'}
              </span>
            </div>
            <button
              onClick={toggleOverride}
              data-interactive
              className="pointer-events-auto mt-1.5 px-2 py-0.5 border border-core-border text-[0.55rem] 
                         text-core-muted hover:text-core-cyan hover:border-core-cyan transition-colors"
            >
              [{override ? 'RELEASE' : 'OVERRIDE'}]
            </button>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="fixed bottom-0 left-0 w-full px-5 py-3 md:px-8 flex justify-between">
        <div className="hud-text text-core-muted text-[0.55rem]">
          CLOCK: {override ? 'FROZEN' : 'ACTIVE'} // VECTOR_FIELD: DIVERGENCE_FREE
        </div>
        <div className="hud-text text-core-muted text-[0.55rem]">
          SCROLL: {(scrollProgress * 100).toFixed(0)}% // C²_CONTINUOUS
        </div>
      </div>
    </div>
  );
}
