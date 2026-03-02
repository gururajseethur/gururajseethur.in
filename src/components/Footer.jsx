import React from 'react';
import { Link } from 'react-router-dom';

const NAV = [
  { label: 'About',    to: '/#about'   },
  { label: 'Projects', to: '/projects' },
  { label: 'Security', to: '/security' },
  { label: 'Creative', to: '/creative' },
  { label: 'Contact',  to: '/contact'  },
];

const SOCIALS = [
  { icon: 'LI', label: 'LinkedIn',  href: 'https://linkedin.com/in/gururajseethur' },
  { icon: 'GH', label: 'GitHub',    href: 'https://github.com/gururajseethur' },
  { icon: 'TH', label: 'THM',       href: 'https://tryhackme.com/p/Gururajseethur' },
  { icon: '✉',  label: 'Email',     href: 'mailto:gururajseethur@gmail.com' },
];

export default function Footer() {
  return (
    <footer style={{
      background: '#0E0E12',
      borderTop: '1px solid #1C1C24',
      padding: '48px max(48px, 5vw)',
    }}>
      <div className="max-w-content mx-auto">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40, alignItems: 'start' }}>

          {/* Left: Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: '#FFFFFF' }}>
              Gururaj.
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#555', marginTop: 8, lineHeight: 1.6 }}>
              Filmmaker · Ethical Hacker · Bengaluru
            </div>
          </div>

          {/* Center: Nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            {NAV.map(n => (
              <Link
                key={n.label}
                to={n.to}
                style={{
                  fontFamily: 'var(--font-sans)', fontSize: 14, color: '#555',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = '#FFFFFF'}
                onMouseLeave={e => e.target.style.color = '#555'}
              >
                {n.label}
              </Link>
            ))}
          </div>

          {/* Right: Socials */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  border: '1px solid #1C1C24',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#555', textDecoration: 'none', fontSize: 13,
                  fontFamily: 'var(--font-mono)', fontWeight: 500,
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor='#FFFFFF'; el.style.color='#FFFFFF'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor='#1C1C24'; el.style.color='#555'; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #0E0E12', marginTop: 48, paddingTop: 24, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#333', margin: 0 }}>
            © 2025 Gururaj Seethur. Designed &amp; Built by Gururaj.
          </p>
        </div>
      </div>
    </footer>
  );
}
