import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const CONTACT_ITEMS = [
  { icon: '✉', label: 'Email',      value: 'gururajseethur@gmail.com',               href: 'mailto:gururajseethur@gmail.com' },
  { icon: '📞', label: 'Phone',      value: '+91 8762714344',                           href: 'tel:+918762714344' },
  { icon: '💼', label: 'LinkedIn',   value: 'linkedin.com/in/gururajseethur',          href: 'https://linkedin.com/in/gururajseethur' },
  { icon: '🔐', label: 'TryHackMe',  value: 'tryhackme.com/p/Gururajseethur',          href: 'https://tryhackme.com/p/Gururajseethur' },
];

function InputField({ label, name, type = 'text', placeholder, required }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="input-underline"
      />
    </div>
  );
}

export default function ContactPage() {
  const sectionRef = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true));
  };

  return (
    <div ref={sectionRef} style={{ minHeight: '100vh', padding: '120px max(48px, 5vw)' }}>
      <div className="max-w-content mx-auto">

        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <div data-reveal style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555',
            border: '1px solid #1C1C24', padding: '4px 12px', borderRadius: 99,
            marginBottom: 24,
          }}>
            // CONTACT
          </div>
          <h1 data-reveal data-delay="100" style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(36px,5vw,52px)', color: '#FFFFFF',
            letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 12px',
          }}>
            Let&apos;s Work Together.
          </h1>
          <p data-reveal data-delay="200" style={{ fontSize: 16, color: '#888', lineHeight: 1.6 }}>
            Brand film or security assessment — let&apos;s talk.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '55fr 45fr', gap: 80, alignItems: 'start' }}>

          {/* Left: Form */}
          <div data-reveal data-delay="100">
            {submitted ? (
              <div style={{
                padding: '48px', textAlign: 'center',
                background: 'rgba(34,197,94,0.05)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: 16,
              }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>✓</div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: '#FFFFFF' }}>
                  Message sent.
                </p>
                <p style={{ color: '#666', marginTop: 8 }}>I'll get back to you shortly.</p>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
              >
                <input type="hidden" name="form-name" value="contact" />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                  <InputField label="Name" name="name" placeholder="Your name" required />
                  <InputField label="Email" name="email" type="email" placeholder="your@email.com" required />
                </div>

                <InputField label="Subject" name="subject" placeholder="What's this about?" required />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    required
                    className="input-underline"
                    style={{ minHeight: 140 }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: '#FFFFFF', color: '#070709',
                    fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16,
                    padding: 16, borderRadius: 8, border: 'none', width: '100%',
                    transition: 'background 0.2s ease, transform 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background='#E0E0E0'; e.currentTarget.style.transform='translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#FFFFFF'; e.currentTarget.style.transform='translateY(0)'; }}
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>

          {/* Right: Info */}
          <div data-reveal data-delay="200">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {CONTACT_ITEMS.map((item, i) => (
                <div key={item.label}>
                  {i > 0 && <div style={{ height: 1, background: '#0E0E12' }} />}
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '20px 0', textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      color: '#888',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color='#FFFFFF'}
                    onMouseLeave={e => e.currentTarget.style.color='#888'}
                  >
                    <span style={{ fontSize: 16, color: '#00D9FF', width: 20, textAlign: 'center' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>{item.value}</div>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div style={{
              marginTop: 32, padding: '20px 24px',
              background: 'rgba(34,197,94,0.05)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', background: '#22C55E',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 16, color: '#22C55E' }}>
                  Currently Available
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#555', lineHeight: 1.6, margin: 0 }}>
                Open to brand films, security assessments, and freelance collaborations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
