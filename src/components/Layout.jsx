import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Global3DBackground from './Global3DBackground';

const PACKET_TRACKS = [
  { top: '12%', delay: '0s', duration: '13s' },
  { top: '18%', delay: '1.8s', duration: '16s' },
  { top: '26%', delay: '3.2s', duration: '15s' },
  { top: '34%', delay: '0.7s', duration: '14s' },
  { top: '42%', delay: '2.6s', duration: '17s' },
  { top: '50%', delay: '4.1s', duration: '15s' },
  { top: '58%', delay: '1.2s', duration: '14s' },
  { top: '66%', delay: '3.8s', duration: '18s' },
  { top: '74%', delay: '0.4s', duration: '16s' },
  { top: '82%', delay: '2.1s', duration: '15s' },
];

const FOOTER_NAV = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/security', label: 'Security' },
  { to: '/creative', label: 'Creative' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  const location = useLocation();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <Global3DBackground routeKey={location.pathname} />
      <Navbar />

      <div className="packet-stream-layer" aria-hidden="true">
        {PACKET_TRACKS.map((track, index) => (
          <span
            key={`${track.top}-${index}`}
            className="packet-stream"
            style={{
              top: track.top,
              animationDelay: track.delay,
              animationDuration: track.duration,
            }}
          />
        ))}
      </div>

      <main className="relative min-h-screen z-10">
        <div className="site-content-shell">
          <Outlet key={location.pathname} />
        </div>
      </main>

      <footer className="relative z-10 py-16 border-t border-edge">
        <div className="max-w-content mx-auto px-5 md:px-8">
          {/* Top row: brand + nav */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
            <div className="space-y-2">
              <Link to="/" className="inline-block">
                <span className="text-lg font-semibold text-fg tracking-tight">Gururaj</span>
                <span className="text-lg font-semibold text-accent">.</span>
              </Link>
              <p className="text-xs text-fg-muted max-w-[260px] leading-relaxed">
                Filmmaker & Ethical Hacker building at the intersection of creative and security from Bengaluru.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_NAV.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-fg-muted hover:text-fg transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Bottom row: socials + copyright + back-to-top */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-edge-subtle">
            <div className="flex items-center gap-5">
              <a href="https://www.linkedin.com/in/gururaj-seethur" target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://tryhackme.com/p/Gururajseethur" target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </a>
              <a href="mailto:gururajseethur@gmail.com" className="text-fg-muted hover:text-fg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>

            <p className="text-[0.65rem] text-fg-faint">
              © {new Date().getFullYear()} Gururaj Seethur — Filmmaker & Ethical Hacker
            </p>

            <button
              onClick={scrollToTop}
              className="text-fg-muted hover:text-accent transition-colors group"
              aria-label="Back to top"
            >
              <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
