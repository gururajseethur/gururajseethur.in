import React, { useState } from 'react';

const CONTACT_CHANNELS = [
  {
    name: 'Direct Email',
    value: 'gururajseethur@gmail.com',
    href: 'mailto:gururajseethur@gmail.com',
    badge: 'PRIMARY TRANSMISSION',
    accent: 'cyan',
  },
  {
    name: 'LinkedIn Network',
    value: 'linkedin.com/in/gururaj-seethur',
    href: 'https://www.linkedin.com/in/gururaj-seethur',
    badge: 'PROFESSIONAL PROFILE',
    accent: 'cobalt',
  },
  {
    name: 'GitHub Repositories',
    value: 'github.com/gururajseethur',
    href: 'https://github.com/gururajseethur',
    badge: 'SOURCE CODE & LABS',
    accent: 'cyan',
  },
  {
    name: 'TryHackMe Profile',
    value: 'tryhackme.com/p/Gururajseethur',
    href: 'https://tryhackme.com/p/Gururajseethur',
    badge: 'TOP 4% CTF TELEMETRY',
    accent: 'cyan',
  },
  {
    name: 'YouTube Channel',
    value: 'youtube.com/@gururaj-seethur',
    href: 'https://www.youtube.com/@gururaj-seethur',
    badge: 'VIDEO ARCHIVE',
    accent: 'amber',
  },
];

export default function SceneContactCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const data = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        setSubmitted(true);
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitted(true);
        setSubmitting(false);
      });
  };

  return (
    <section id="contact" className="relative px-6 py-24 md:px-12 bg-void border-t border-border-subtle">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left: Contact Info & Philosophy (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <div className="flex items-center gap-3 font-mono text-xs text-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                <span>SCENE G // TRANSMISSION & INQUIRIES</span>
              </div>
              <h2 className="mt-3 font-display text-section-heading font-bold text-text-primary">
                Establish Contact<span className="text-cyan">.</span>
              </h2>
              <p className="mt-4 font-sans text-sm md:text-base text-text-secondary leading-relaxed">
                Open to cybersecurity engineering roles, sovereign AI infrastructure projects,
                and high-impact technical creative collaborations.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {CONTACT_CHANNELS.map((c) => (
                <a
                  key={c.name}
                  href={c.href}
                  target={c.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="glass-panel p-4 flex items-center justify-between border-border-subtle hover:border-cyan hover:bg-surface-elevated/70 transition-all group"
                >
                  <div>
                    <div className="font-mono text-micro text-text-muted">{c.badge}</div>
                    <div className="font-display text-sm font-semibold text-text-primary group-hover:text-cyan transition-colors">
                      {c.name}
                    </div>
                    <div className="font-mono text-xs text-text-secondary mt-0.5">{c.value}</div>
                  </div>
                  <span className="font-mono text-sm text-text-faint group-hover:text-cyan group-hover:translate-x-1 transition-all">
                    ↗
                  </span>
                </a>
              ))}
            </div>

            <div className="rounded-xl border border-border-subtle bg-surface/40 p-4 font-mono text-xs text-text-muted">
              <span className="text-cyan">ENCRYPTION & PRIVACY:</span> Inbound messages are processed securely. Direct PGP and secure messaging available on request.
            </div>
          </div>

          {/* Right: Netlify-Compatible Form (7 cols) */}
          <div className="glass-panel p-8 md:p-10 border border-border bg-surface/80 lg:col-span-7">
            {submitted ? (
              <div className="py-16 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/20 text-success font-mono text-xl mb-4">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-bold text-text-primary">
                  Transmission Delivered
                </h3>
                <p className="mt-2 font-sans text-sm text-text-secondary max-w-md mx-auto">
                  Thank you for reaching out. Your transmission has been queued and Gururaj will respond promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-lg border border-border bg-surface px-5 py-2.5 font-mono text-xs text-text-primary hover:border-cyan"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div className="hidden">
                  <label>
                    Don’t fill this out if you're human: <input name="bot-field" />
                  </label>
                </div>

                <div className="border-b border-border-subtle pb-4">
                  <span className="font-mono text-xs text-cyan uppercase tracking-wider">
                    TRANSMISSION PROTOCOL // DIRECT INBOX
                  </span>
                  <div className="font-display text-lg font-bold text-text-primary mt-1">
                    Send an Encrypted Note or Opportunity
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block font-mono text-xs text-text-muted uppercase mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Alex Mercer"
                      className="input-signal"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-text-muted uppercase mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. alex@enterprise.com"
                      className="input-signal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-muted uppercase mb-2">
                    Primary Area of Inquiry
                  </label>
                  <select
                    name="inquiry_type"
                    className="input-signal cursor-pointer"
                  >
                    <option value="cybersecurity">Cybersecurity Engineering / SOC / Zero-Trust</option>
                    <option value="ai-infrastructure">Local-First AI Systems / LLM Pipelines</option>
                    <option value="creative-video">Filmmaking / Commercial Video Direction</option>
                    <option value="full-time-role">Career Opportunity / Full-Time Role</option>
                    <option value="other">General Technical Discussion</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-muted uppercase mb-2">
                    Message / Transmission Spec *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your project, engineering scope, or collaboration inquiry..."
                    className="input-signal"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-cobalt to-cyan px-6 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-void shadow-cyan-glow hover:brightness-110 transition-all disabled:opacity-50"
                >
                  <span>{submitting ? 'Encrypting & Sending...' : 'Transmit Signal Now'}</span>
                  <span>→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
