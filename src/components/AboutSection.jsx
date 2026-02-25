import React, { useEffect, useMemo, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import useTryHackMeStats from '../hooks/useTryHackMeStats';

const creativeSkills = [
  'Video Editing',
  'Colour Grading',
  'Audio Editing',
  'Motion Graphics',
  'Storytelling',
  'Brand Filmmaking',
  'Content Strategy',
];

const securitySkills = [
  'Linux Fundamentals',
  'Network Security',
  'TCP/IP Suite',
  'Vulnerability Assessment',
  'Ethical Hacking',
  'Penetration Testing',
  'Information Security',
  'Cybersecurity Awareness',
];

export default function AboutSection() {
  const { roomCount, loading, error, fetchedAt, source } = useTryHackMeStats();
  const roomLabel = Number.isFinite(roomCount) ? `${roomCount}` : '70';
  const [nowTs, setNowTs] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNowTs(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const syncedAgoLabel = useMemo(() => {
    if (!fetchedAt) return 'Last synced: pending';
    const synced = new Date(fetchedAt).getTime();
    if (!Number.isFinite(synced)) return 'Last synced: pending';
    const diffSec = Math.max(0, Math.floor((nowTs - synced) / 1000));
    if (diffSec < 60) return `Last synced ${diffSec}s ago`;
    const mins = Math.floor(diffSec / 60);
    const secs = diffSec % 60;
    return `Last synced ${mins}m ${secs}s ago`;
  }, [fetchedAt, nowTs]);

  return (
    <section id="about" className="px-5 md:px-8 py-20">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <div className="section-label">About</div>
          <div className="accent-line mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-4 tracking-tight">
            Most people choose between creativity and technology.
            <span className="text-accent"> I didn't.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* Bio */}
            <div className="space-y-5">
              <p className="text-sm text-fg-secondary leading-relaxed">
                With <span className="text-danger font-medium">4+ years of professional video editing</span> and{' '}
                <span className="text-fg font-medium">5 years of total experience</span>,
                I've built a career at the intersection of cinema and cybersecurity — two worlds
                that share more than people think: pattern recognition, creative problem-solving,
                and an obsession with detail.
              </p>
              <p className="text-sm text-fg-secondary leading-relaxed">
                Currently serving as <span className="text-fg font-medium">Assistant Manager,
                Branding &amp; Communications</span> at CreditAccess Grameen Limited, where I lead
                video production for India's leading microfinance brand. Simultaneously pursuing a{' '}
                <span className="text-accent font-medium">Master-Diploma in Cyber Security &amp;
                Ethical Hacking</span> from Boston Institute of Analytics.
              </p>
              <p className="text-sm text-fg-secondary leading-relaxed">
                On the security side, I'm deep into network security — managing network switches,
                mastering the Internet Protocol Suite, and chasing flags on TryHackMe.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { value: '5', label: 'Years Experience' },
                  { value: '200+', label: 'Videos Delivered' },
                  {
                    value: roomLabel,
                    label: 'TryHackMe Rooms',
                    live: true,
                    state: loading ? 'SYNCING' : (error ? 'CACHED' : 'LIVE'),
                  },
                  { value: 'CEH', label: 'Certified' },
                ].map((stat) => (
                  <div key={stat.label} className="solid-card px-4 py-3 text-center">
                    <div className="text-lg font-bold text-accent">{stat.value}</div>
                    <div className="font-mono text-[10px] text-fg-muted uppercase tracking-wider">{stat.label}</div>
                    {stat.live && (
                      <>
                        <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-accent/25 bg-accent/[0.05]">
                          <span className="status-dot" style={{ width: 5, height: 5 }} />
                          <span className="font-mono text-[9px] text-accent uppercase tracking-widest">{stat.state}</span>
                        </div>
                        <div className="thm-sync-ticker mt-1 font-mono text-[9px] text-fg-muted uppercase tracking-widest">
                          {syncedAgoLabel} · {source === 'cache' ? 'cache' : 'live'}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Code Block */}
            <div className="flex items-start">
              <div className="solid-card p-6 w-full">
                <div className="font-mono text-xs text-fg-muted mb-3">// gururaj.config</div>
                <pre className="font-mono text-xs text-fg-secondary leading-relaxed whitespace-pre-wrap">
{`const gururaj = {
  location: "Bengaluru, India",
  roles: [
    "Filmmaker",
    "Storyteller",
    "Video Editor",
    "Penetration Tester",
    "Ethical Hacker"
  ],
  experience: "5 years",
  currentFocus: [
    "Brand Communications",
    "Vulnerability Assessment",
    "Ethical Hacking"
  ],
  education: "Master-Diploma in
    Cyber Security (in progress)",
  available: true
};`}
                </pre>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Two-Column Skills Grid */}
        <ScrollReveal delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
            {/* Creative Stack */}
            <div className="solid-card p-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🎬</span>
                <h3 className="text-lg font-bold text-fg">Creative Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {creativeSkills.map((skill) => (
                  <span key={skill} className="skill-tag-creative">{skill}</span>
                ))}
              </div>
            </div>

            {/* Security Stack */}
            <div className="solid-card p-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🔓</span>
                <h3 className="text-lg font-bold text-fg">Security Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {securitySkills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
