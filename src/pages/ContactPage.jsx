import React, { useState } from 'react';
import useSEO from '../hooks/useSEO';

const DIRECT_SIGNALS = [
  {
    protocol: 'EMAIL',
    value: 'gururajseethur@gmail.com',
    href: 'mailto:gururajseethur@gmail.com',
    detail: 'Direct inquiries, job opportunities, and technical collaborations.',
  },
  {
    protocol: 'PHONE',
    value: '+91 8762714344',
    href: 'tel:+918762714344',
    detail: 'Urgent security communications & leadership coordination.',
  },
  {
    protocol: 'LINKEDIN',
    value: 'linkedin.com/in/gururaj-seethur',
    href: 'https://www.linkedin.com/in/gururaj-seethur',
    detail: 'Professional network, verified experience, and recommendations.',
  },
  {
    protocol: 'TRYHACKME',
    value: 'tryhackme.com/p/Gururajseethur',
    href: 'https://tryhackme.com/p/Gururajseethur',
    detail: 'CTF challenge history, badge verification, and lab ranking.',
  },
];

export default function ContactPage() {
  useSEO({
    title: 'Contact & Signal Transmission',
    description:
      'Establish direct communication with Gururaj Seethuru for cybersecurity, AI systems, and technical video collaborations.',
  });

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
    <div className="relative min-h-screen px-6 py-16 md:px-12">
      <div className="max-w-content mx-auto">
        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 font-mono text-xs text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            <span>TRANSMISSION // INITIATE COMMS</span>
          </div>
          <h1 className="mt-3 font-display text-hero-heading font-bold text-text-primary">
            Transmission Hub<span className="text-cyan">.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-base md:text-lg text-text-secondary leading-relaxed">
            Direct communication channels for cybersecurity engineering roles, sovereign AI infrastructure design,
            and high-impact creative video collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* ── DIRECT SIGNALS MATRIX (5 COLS) ─────────────────────────── */}
          <div className="space-y-4 lg:col-span-5">
            <div className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">
              AUTHENTICATED SIGNAL PATHS
            </div>

            {DIRECT_SIGNALS.map((s) => (
              <a
                key={s.protocol}
                href={s.href}
                target={s.href.startsWith('mailto:') || s.href.startsWith('tel:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="glass-panel p-5 flex flex-col justify-between border-border-subtle hover:border-cyan hover:bg-surface-elevated/70 transition-all group block"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-cyan font-semibold">{s.protocol}</span>
                  <span className="text-text-faint group-hover:text-cyan group-hover:translate-x-1 transition-all">
                    ↗
                  </span>
                </div>
                <div className="mt-2 font-display text-base font-bold text-text-primary group-hover:text-white transition-colors">
                  {s.value}
                </div>
                <div className="mt-1 font-sans text-xs text-text-muted">
                  {s.detail}
                </div>
              </a>
            ))}

            <div className="rounded-xl border border-border-subtle bg-surface/50 p-5 font-mono text-xs text-text-muted mt-6">
              <span className="text-cyan font-semibold">SECURITY NOTICE:</span> All communications handled with confidentiality. PGP encryption keys and signed verification hashes available upon request.
            </div>
          </div>

          {/* ── NETLIFY FORM (7 COLS) ──────────────────────────────────── */}
          <div className="glass-panel p-8 md:p-10 border border-border bg-surface/80 lg:col-span-7 shadow-glass-panel">
            {submitted ? (
              <div className="py-16 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/20 text-success font-mono text-xl mb-4">
                  ✓
                </div>
                <h2 className="font-display text-2xl font-bold text-text-primary">
                  Signal Queued for Delivery
                </h2>
                <p className="mt-3 font-sans text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                  Thank you for your transmission. Your message has been routed to Gururaj and will receive a response shortly.
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
                    SECURE INQUIRY FORM
                  </span>
                  <div className="font-display text-lg font-bold text-text-primary mt-1">
                    Send a Message or Project Specification
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
                      placeholder="e.g. alex@company.com"
                      className="input-signal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-muted uppercase mb-2">
                    Subject / Area of Interest
                  </label>
                  <select
                    name="inquiry_type"
                    className="input-signal cursor-pointer"
                  >
                    <option value="cybersecurity">Cybersecurity Engineering / SOC / Pentesting</option>
                    <option value="ai-infrastructure">Local AI / Sovereign LLM Infrastructure</option>
                    <option value="creative-video">Filmmaking / Commercial Video Direction</option>
                    <option value="career-offer">Full-Time Career Opportunity</option>
                    <option value="general">General Technical Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-muted uppercase mb-2">
                    Transmission Content *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Provide details on your project timeline, technical requirements, or opportunity..."
                    className="input-signal"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-cobalt to-cyan px-6 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-void shadow-cyan-glow hover:brightness-110 transition-all disabled:opacity-50"
                >
                  <span>{submitting ? 'Transmitting...' : 'Dispatch Message →'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
