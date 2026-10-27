import React from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Overview', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Security', to: '/security' },
  { label: 'Creative', to: '/creative' },
  { label: 'Videos', to: '/videos' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

const EXTERNAL_CHANNELS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gururaj-seethur' },
  { label: 'GitHub', href: 'https://github.com/gururajseethur' },
  { label: 'TryHackMe', href: 'https://tryhackme.com/p/Gururajseethur' },
  { label: 'YouTube', href: 'https://www.youtube.com/@gururaj-seethur' },
  { label: 'Email', href: 'mailto:gururajseethur@gmail.com' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border bg-void/90 py-16 px-6 md:px-12 z-10">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 mb-12">
          {/* Brand & Working Thesis (6 cols) */}
          <div className="space-y-4 md:col-span-6">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded border border-border bg-surface font-display text-xs font-bold text-cyan">
                GS
              </div>
              <span className="font-display text-lg font-bold text-text-primary">
                Gururaj Seethuru
              </span>
            </div>

            <p className="font-sans text-xs md:text-sm text-text-muted leading-relaxed max-w-md">
              Cybersecurity engineering, local-first sovereign AI systems, and narrative filmmaking.
              Building the plumbing for verifiable digital intelligence.
            </p>

            <blockquote className="rounded-lg border-l-2 border-cyan bg-surface/40 p-3 font-mono text-[11px] text-text-secondary leading-relaxed max-w-md">
              "Every team that handles sensitive data will want to run its own LLM stack with its own telemetry. Most of what I ship is some piece of that plumbing."
            </blockquote>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-wider text-cyan mb-4">
              SYSTEM NAVIGATION
            </div>
            <ul className="space-y-2 font-mono text-xs">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-text-muted hover:text-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Signals (3 cols) */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-wider text-cyan mb-4">
              EXTERNAL SIGNALS
            </div>
            <ul className="space-y-2 font-mono text-xs">
              {EXTERNAL_CHANNELS.map((ch) => (
                <li key={ch.label}>
                  <a
                    href={ch.href}
                    target={ch.href.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>{ch.label}</span>
                    <span className="text-text-faint">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-subtle pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-text-muted">
          <div>
            © {new Date().getFullYear()} GURURAJ SEETHURU. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span>BENGALURU // ASIA-SOUTH1</span>
            <button
              onClick={scrollToTop}
              className="hover:text-cyan transition-colors flex items-center gap-1"
            >
              <span>RETURN TO APEX</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
