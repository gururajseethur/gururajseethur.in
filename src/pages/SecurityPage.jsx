import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import useTryHackMeStats from '../hooks/useTryHackMeStats';

/* ── Three phases of attack ── */
const phases = [
  {
    number: 1,
    name: 'Recon',
    tools: ['Nmap', 'Gobuster', 'Nikto', 'Wireshark'],
  },
  {
    number: 2,
    name: 'Exploitation',
    tools: ['Metasploit', 'Burp Suite', 'Hydra', 'John the Ripper'],
  },
  {
    number: 3,
    name: 'Post-Exploitation',
    tools: ['Privilege Escalation', 'Docker escape', 'Persistence techniques', 'Python automation'],
  },
];

const labHighlights = [
  { name: 'Mr Robot', type: 'CTF' },
  { name: 'RootMe', type: 'CTF' },
  { name: 'Boiler CTF', type: 'CTF' },
  { name: 'Vulnversity', type: 'Web' },
  { name: 'Basic Pentesting', type: 'Lab' },
  { name: 'Kenobi', type: 'Lab' },
  { name: 'Blue', type: 'Lab' },
  { name: 'Ice', type: 'Lab' },
];

/* ── Terminal-style tags that appear one-by-one ── */
function TerminalTags({ tools }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div ref={ref} className="flex flex-wrap gap-2">
      {tools.map((tool, i) => (
        <span
          key={tool}
          className={`terminal-tag ${isVisible ? 'visible' : ''} text-xs px-3.5 py-1.5 rounded-full bg-accent/[0.08] border border-accent/[0.15] text-accent font-mono`}
          style={{ transitionDelay: isVisible ? `${i * 50}ms` : '0ms' }}
        >
          {tool}
        </span>
      ))}
    </div>
  );
}

/* ── CTF rows ── */
function CTFTable({ labs }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {labs.map((lab, i) => (
        <div
          key={lab.name}
          className={`ctf-row flex items-center justify-between p-3 rounded-lg bg-surface border border-edge-subtle`}
          style={{
            animationDelay: isVisible ? `${i * 100}ms` : '0ms',
            animationPlayState: isVisible ? 'running' : 'paused',
          }}
        >
          <span className="font-mono text-sm text-fg-secondary">{lab.name}</span>
          <span className="font-mono text-micro text-fg-muted uppercase tracking-wider">{lab.type}</span>
        </div>
      ))}
    </div>
  );
}

export default function SecurityPage() {
  const { roomCount } = useTryHackMeStats();
  const roomLabel = Number.isFinite(roomCount) ? `${roomCount}` : '70';

  return (
    <div className="page-panel px-5 md:px-8 pt-24 md:pt-28 py-16 md:py-24">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <div className="section-label">Security</div>
          <div className="accent-line mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-fg mb-3 tracking-tight">
            Security &amp; Skills
          </h1>
          <p className="text-sm text-fg-secondary mb-12 max-w-lg leading-relaxed">
            {roomLabel} TryHackMe rooms. Real labs. Real tools. Tracked progression — not gamified badges.
          </p>
        </ScrollReveal>

        {/* ── TryHackMe Badge Embed ── */}
        <ScrollReveal delay={80}>
          <div className="flex justify-center mb-16">
            <div className="solid-card p-6 text-center border-accent/20">
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-4 font-semibold">
                TryHackMe Profile
              </p>
              <iframe
                src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=3003430"
                style={{ border: 'none', width: '100%', maxWidth: '480px', height: '120px' }}
                title="TryHackMe Badge"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* ── Three Phases of Attack ── */}
        <div className="space-y-4 mb-16">
          {phases.map((phase) => (
            <ScrollReveal key={phase.number} delay={phase.number * 80}>
              <div className="solid-card p-7 md:p-9">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold bg-accent/[0.08] border border-accent/[0.15] text-accent">
                    {phase.number}
                  </div>
                  <div>
                    <span className="font-mono text-micro uppercase tracking-widest text-fg-muted">Phase {phase.number}</span>
                    <h2 className="text-xl md:text-2xl font-semibold text-fg">{phase.name}</h2>
                  </div>
                </div>
                <TerminalTags tools={phase.tools} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ── CTF & Lab Highlights ── */}
        <ScrollReveal delay={360}>
          <div className="solid-card p-7 md:p-9">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🏴</span>
              <h2 className="text-xl md:text-2xl font-semibold text-fg">CTF &amp; Lab Highlights</h2>
              <span className="font-mono text-xs text-fg-muted ml-auto">{roomLabel} rooms total</span>
            </div>
            <CTFTable labs={labHighlights} />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
