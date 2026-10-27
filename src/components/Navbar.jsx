import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Overview', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Security', to: '/security' },
  { label: 'Creative', to: '/creative' },
  { label: 'Videos', to: '/videos' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-void/90 backdrop-blur-xl border-b border-border shadow-2xl py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-content mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Call Sign */}
        <Link to="/" className="group flex items-center gap-3 text-decoration-none">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface/70 group-hover:border-cyan group-hover:shadow-cyan-glow transition-all">
            <span className="font-display font-bold text-xs text-cyan">GS</span>
            <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-text-primary group-hover:text-cyan transition-colors">
              GURURAJ SEETHURU
            </span>
            <span className="font-mono text-[10px] text-text-muted tracking-wider uppercase">
              SIGNAL ENGINE // v2.6
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-surface/60 border border-border-subtle rounded-full px-4 py-1.5 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan/15 text-cyan border border-cyan/40 shadow-cyan-glow font-medium'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Status Indicator & Fast Action */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-micro text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-ping" />
            <span>ALL SYSTEMS NOMINAL</span>
          </div>
          <Link
            to="/contact"
            className="rounded-lg border border-cyan/40 bg-cyan/10 px-4 py-2 font-mono text-xs font-semibold text-cyan hover:bg-cyan hover:text-void transition-all shadow-cyan-glow"
          >
            TRANSMIT →
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-primary focus:outline-none"
        >
          <span className="font-mono text-sm">{mobileOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-void/95 backdrop-blur-2xl px-6 py-6 transition-all">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg font-mono text-sm tracking-wider transition-all ${
                    isActive
                      ? 'bg-cyan/15 text-cyan border border-cyan/40 font-semibold'
                      : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-border-subtle mt-2">
              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan py-3 font-mono text-xs font-bold text-void uppercase"
              >
                <span>Transmit Signal</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
