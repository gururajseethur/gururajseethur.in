import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const contacts = [
  { type: 'Email', value: 'gururajseethur@gmail.com', href: 'mailto:gururajseethur@gmail.com', icon: '✉️', desc: 'Direct line — preferred channel' },
  { type: 'GitHub', value: 'github.com/gururaj-seethur', href: 'https://github.com/gururaj-seethur', icon: '🔗', desc: 'Intentional projects only', external: true },
  { type: 'LinkedIn', value: 'linkedin.com/in/gururaj-seethur', href: 'https://linkedin.com/in/gururaj-seethur', icon: '💼', desc: 'Professional network', external: true },
];

export default function ContactPage() {
  return (
    <div className="px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="accent-line mb-6" />
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Get in Touch
          </h1>
          <p className="font-sans text-lg text-white/35 mb-16 max-w-lg leading-relaxed">
            Seeking security engineering roles. Also available for freelance
            video production. No fluff — just direct communication.
          </p>
        </ScrollReveal>

        <div className="space-y-4 mb-16">
          {contacts.map((c, i) => (
            <ScrollReveal key={c.type} delay={i * 100}>
              <a
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                data-interactive
                className="glass-card p-6 flex items-center gap-5 group"
              >
                <span className="text-2xl w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {c.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-sans text-xs text-white/25 uppercase tracking-widest font-medium mb-1">
                    {c.type}
                  </div>
                  <div className="font-sans text-base text-white/80 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                    {c.value}
                  </div>
                  <div className="font-sans text-xs text-white/20 mt-1">{c.desc}</div>
                </div>
                <span className="text-white/15 group-hover:text-white/40 group-hover:translate-x-1 transition-all duration-300 text-lg">
                  →
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Status Card */}
        <ScrollReveal delay={300}>
          <div className="glass-card p-8 text-center bg-gradient-to-br from-emerald-500/5 to-cyan-500/5">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="status-dot bg-emerald-400" style={{ color: 'rgb(52, 211, 153)' }} />
              <span className="font-sans text-lg font-semibold text-white">
                Currently Available
              </span>
            </div>
            <p className="font-sans text-sm text-white/35 max-w-sm mx-auto">
              Open to new opportunities, freelance projects, and interesting collaborations.
              Response time: ~24 hours.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
