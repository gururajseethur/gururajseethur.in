import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formBody = new URLSearchParams({
      'form-name': 'contact',
      ...formData,
    }).toString();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody,
    })
      .then(() => {
        setSubmitted(true);
        setLoading(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch(() => {
        setLoading(false);
        alert('Something went wrong. Please email me directly.');
      });
  };

  return (
    <section id="contact" className="px-5 md:px-8 py-20">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <div className="section-label">Contact</div>
          <div className="accent-line mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-3 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-sm text-fg-secondary mb-12 max-w-lg">
            Open to new opportunities, freelance projects, and interesting collaborations.
            Whether it's a brand film or a security assessment — let's talk.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Form */}
          <ScrollReveal delay={100} className="lg:col-span-3">
            {submitted ? (
              <div className="solid-card p-10 text-center">
                <span className="text-4xl mb-4 block">✅</span>
                <h3 className="text-xl font-bold text-fg mb-2">Message Sent!</h3>
                <p className="text-sm text-fg-secondary">
                  I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-mono text-sm text-accent hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-2 block">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-2 block">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="form-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-2 block">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-2 block">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell me about your project or opportunity..."
                    className="form-input resize-none"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message →'
                  )}
                </button>
              </form>
            )}
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={200} className="lg:col-span-2">
            <div>
              {/* Email */}
              <a
                href="mailto:gururajseethur@gmail.com"
                className="flex items-center gap-4 group py-3 border-b border-edge-subtle"
              >
                <svg className="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="font-mono text-[10px] text-fg-muted uppercase tracking-wider">Email</div>
                  <div className="text-sm text-fg group-hover:text-accent transition-colors">gururajseethur@gmail.com</div>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+918762714344"
                className="flex items-center gap-4 group py-3 border-b border-edge-subtle"
              >
                <svg className="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <div className="font-mono text-[10px] text-fg-muted uppercase tracking-wider">Phone</div>
                  <div className="text-sm text-fg group-hover:text-accent transition-colors">+91 8762714344</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/gururaj-seethur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group py-3 border-b border-edge-subtle"
              >
                <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <div>
                  <div className="font-mono text-[10px] text-fg-muted uppercase tracking-wider">LinkedIn</div>
                  <div className="text-sm text-fg group-hover:text-accent transition-colors">in/gururaj-seethur</div>
                </div>
              </a>

              {/* TryHackMe */}
              <a
                href="https://tryhackme.com/p/Gururajseethur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group py-3"
              >
                <svg className="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <div className="font-mono text-[10px] text-fg-muted uppercase tracking-wider">TryHackMe</div>
                  <div className="text-sm text-fg group-hover:text-accent transition-colors">Gururajseethur</div>
                </div>
              </a>

              {/* Status */}
              <div className="mt-6 p-5 rounded-xl border border-success/20 bg-success/[0.05]">
                <div className="flex items-center gap-3">
                  <span className="status-dot" />
                  <div>
                    <div className="text-sm text-success font-medium">Currently Available</div>
                    <div className="text-xs text-fg-muted">Response time: ~24 hours</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
