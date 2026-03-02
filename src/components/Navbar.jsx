import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'About',    to: '/',         hash: 'about'   },
  { label: 'Projects', to: '/projects', hash: null       },
  { label: 'Security', to: '/security', hash: null       },
  { label: 'Creative', to: '/creative', hash: null       },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

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
        }, 120);
      }
    }
  }, [location.pathname, navigate]);

  const headerStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    transition: 'background 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease',
    background: scrolled ? 'rgba(7,7,9,0.88)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid #1C1C24' : '1px solid transparent',
  };

  const linkBase = {
    fontFamily: 'var(--font-sans)',
    fontSize: 13,
    fontWeight: 400,
    textDecoration: 'none',
    padding: '6px 2px',
    position: 'relative',
    transition: 'color 0.2s',
  };

  return (
    <header style={headerStyle}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 max(32px, 4vw)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
              Gururaj<span style={{ color: '#FF3B3B' }}>.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hidden md:flex">
            {NAV_LINKS.map(({ label, to, hash }) => {
              if (hash) {
                return (
                  <button
                    key={label}
                    onClick={() => handleNavClick(to, hash)}
                    style={{ ...linkBase, background: 'none', border: 'none', color: '#50505A', cursor: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseLeave={e => e.currentTarget.style.color = '#50505A'}
                  >
                    {label}
                  </button>
                );
              }
              return (
                <NavLink
                  key={label}
                  to={to}
                  style={({ isActive }) => ({ ...linkBase, color: isActive ? '#FFFFFF' : '#50505A' })}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={e => {
                    // only reset if not active
                    if (!e.currentTarget.getAttribute('aria-current')) {
                      e.currentTarget.style.color = '#50505A';
                    }
                  }}
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <span style={{
                          position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50%)',
                          width: 4, height: 4, borderRadius: '50%', background: '#00D9FF',
                          display: 'block',
                        }} />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Hire Me + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link
              to="/contact"
              className="hidden md:inline-flex"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                textDecoration: 'none', letterSpacing: '0.08em',
                padding: '7px 16px', borderRadius: 6,
                border: '1px solid #1C1C24', color: '#FFFFFF',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#FFFFFF'; e.currentTarget.style.background='rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='#1C1C24'; e.currentTarget.style.background='transparent'; }}
            >
              HIRE ME
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'none', padding: 4, display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center', width: 32, height: 32 }}
            >
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 20, height: 1.5, background: '#FFFFFF',
                  transition: 'transform 0.25s, opacity 0.25s',
                  transform: mobileOpen
                    ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                    : i === 1 ? 'scaleX(0)'
                    : 'rotate(-45deg) translate(4.5px, -4.5px)'
                    : 'none',
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div style={{
        overflow: 'hidden',
        maxHeight: mobileOpen ? 400 : 0,
        transition: 'max-height 0.3s ease',
        background: 'rgba(7,7,9,0.96)',
        backdropFilter: 'blur(20px)',
        borderBottom: mobileOpen ? '1px solid #1C1C24' : '1px solid transparent',
      }}>
        <nav style={{ display: 'flex', flexDirection: 'column', padding: '12px max(32px, 4vw) 20px', gap: 4 }}>
          {NAV_LINKS.map(({ label, to, hash }) => {
            if (hash) {
              return (
                <button
                  key={label}
                  onClick={() => handleNavClick(to, hash)}
                  style={{ background: 'none', border: 'none', color: '#B0B0C0', fontFamily: 'var(--font-sans)', fontSize: 15, textAlign: 'left', padding: '10px 0', cursor: 'none' }}
                >
                  {label}
                </button>
              );
            }
            return (
              <NavLink
                key={label}
                to={to}
                style={({ isActive }) => ({ color: isActive ? '#FFFFFF' : '#B0B0C0', fontFamily: 'var(--font-sans)', fontSize: 15, textDecoration: 'none', padding: '10px 0', display: 'block' })}
              >
                {label}
              </NavLink>
            );
          })}
          <Link
            to="/contact"
            style={{
              marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
              textDecoration: 'none', padding: '10px 18px', border: '1px solid #1C1C24',
              borderRadius: 6, color: '#FFFFFF', display: 'inline-block', alignSelf: 'flex-start',
            }}
          >
            HIRE ME
          </Link>
        </nav>
      </div>
    </header>
  );
}
