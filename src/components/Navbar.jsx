import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/security', label: 'Security' },
  { to: '/creative', label: 'Creative' },
  { to: '/blog', label: 'Blog' },
  { to: '/videos', label: 'Videos' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030014]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <NavLink to="/" className="group" data-interactive>
            <span className="font-sans text-xl font-bold gradient-text">G</span>
            <span className="font-sans text-xl font-bold text-white/90">ururaj</span>
            <span className="gradient-text text-xl font-bold">.</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                data-interactive
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-sans text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            data-interactive
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-white/70 transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-white/70 transition-all duration-300 ${
                mobileOpen ? 'opacity-0 scale-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-white/70 transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          mobileOpen ? 'max-h-80 border-t border-white/5' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-5 py-4 gap-1 bg-[#030014]/95 backdrop-blur-xl">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMobileOpen(false)}
              data-interactive
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg font-sans text-sm transition-colors duration-200 ${
                  isActive ? 'text-white bg-white/10' : 'text-white/50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
