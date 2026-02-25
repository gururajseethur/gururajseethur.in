import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home', hash: null },
  { to: '/', label: 'About', hash: 'about' },
  { to: '/projects', label: 'Projects', hash: null },
  { to: '/security', label: 'Security', hash: null },
  { to: '/creative', label: 'Creative', hash: null },
  { to: '/blog', label: 'Blog', hash: null },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((to, hash) => {
    setMobileOpen(false);
    if (hash) {
      if (location.pathname === '/') {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.pathname, navigate]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-base/90 backdrop-blur-xl border-b border-edge'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="group">
            <span className="text-lg font-semibold text-fg tracking-tight">Gururaj</span>
            <span className="text-lg font-semibold text-accent">.</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, hash }) => {
              if (hash) {
                return (
                  <button
                    key={label}
                    onClick={() => handleNavClick(to, hash)}
                    className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 text-fg-secondary hover:text-fg"
                  >
                    {label}
                  </button>
                );
              }
              return (
                <NavLink
                  key={to + label}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-fg'
                        : 'text-fg-secondary hover:text-fg'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Hire Me CTA + Mobile hamburger */}
          <div className="flex items-center gap-4">
            <NavLink
              to="/contact"
              className="hidden md:inline-flex text-xs py-2 px-4 border border-edge-strong rounded-lg text-fg font-semibold hover:bg-white hover:text-base hover:border-white transition-all duration-200"
            >
              Hire Me
            </NavLink>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-[1.5px] bg-fg transition-all duration-300 ${
                  mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-fg transition-all duration-300 ${
                  mobileOpen ? 'opacity-0 scale-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-fg transition-all duration-300 ${
                  mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 border-t border-edge' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-5 py-4 gap-1 bg-base/95 backdrop-blur-xl">
          {NAV_LINKS.map(({ to, label, hash }) => {
            if (hash) {
              return (
                <button
                  key={label}
                  onClick={() => handleNavClick(to, hash)}
                  className="px-4 py-3 rounded-lg text-sm transition-colors duration-200 text-fg-secondary text-left hover:text-fg"
                >
                  {label}
                </button>
              );
            }
            return (
              <NavLink
                key={to + label}
                to={to}
                end={to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm transition-colors duration-200 ${
                    isActive ? 'text-fg' : 'text-fg-secondary'
                  }`
                }
              >
                {label}
              </NavLink>
            );
          })}
          <NavLink
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mx-4 mt-2 btn-primary text-xs py-2 px-4 justify-center border border-edge-strong"
          >
            Hire Me
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
