import React, { useState } from 'react';
import useTryHackMeStats from '../../hooks/useTryHackMeStats';

const CAREER_TIMELINE = [
  {
    period: 'Sep 2024 – Present',
    role: 'Assistant Manager, Branding & Communications',
    company: 'CreditAccess Grameen Limited',
    location: 'Bengaluru, India',
    badge: 'LEADERSHIP & CAMPAIGNS',
    bullets: [
      'Sole video production lead directing and editing end-to-end corporate, brand, and social campaigns.',
      'Awarded Employee of the Quarter (Apr–Jun 2025) for exceptional production cadence and narrative leadership.',
      'Directing visual communications across stakeholder briefings, annual reports, and digital impact media.',
    ],
  },
  {
    period: 'May 2023 – Sep 2024',
    role: 'Video Editor & Motion Designer',
    company: 'BrandStory Digital',
    location: 'Bengaluru, India',
    badge: 'AGENCY POST-PRODUCTION',
    bullets: [
      'Delivered 200+ commercial video edits across 15+ corporate clients with a 100% on-time delivery record.',
      'Managed end-to-end post-production pipelines: assembly, multi-camera sync, DaVinci Resolve color passes, and motion graphics.',
    ],
  },
  {
    period: 'Feb 2023 – May 2023',
    role: 'Video Editor',
    company: '404 DM',
    location: 'Remote',
    badge: 'MARKETING VIDEO',
    bullets: [
      'Engineered brand, service, and digital advertising video campaigns from brief to delivery.',
    ],
  },
  {
    period: 'Aug 2022 – Dec 2022',
    role: 'Video Editor',
    company: 'upGrad Campus',
    location: 'Mumbai (Remote)',
    badge: 'EDTECH VIDEO PRODUCTION',
    bullets: [
      'Crafted technical course lectures, marketing explainers, and reusable motion graphics asset kits.',
    ],
  },
  {
    period: '2019 – 2022',
    role: 'Bachelor of Arts — Journalism & Mass Communication',
    company: 'Manipal Academy of Higher Education (MAHE)',
    location: 'Manipal, India',
    badge: 'ACADEMIC FOUNDATION',
    bullets: [
      'Formal academic foundation in investigative research, media ethics, documentary production, and narrative structures.',
    ],
  },
];

const TERMINAL_COMMANDS = {
  nmap: {
    command: 'nmap -sV -sC -Pn 10.10.110.42',
    output: [
      'Starting Nmap 7.95 ( https://nmap.org ) at 2026-10-24 14:22 IST',
      'Nmap scan report for target.internal (10.10.110.42)',
      'Host is up (0.012s latency).',
      'PORT     STATE SERVICE  VERSION',
      '22/tcp   open  ssh      OpenSSH 8.9p1 Ubuntu (Ubuntu Linux; protocol 2.0)',
      '80/tcp   open  http     nginx 1.24.0 (Ubuntu)',
      '443/tcp  open  ssl/http nginx 1.24.0 (TLS 1.3 / HSTS enforced)',
      '8080/tcp open  http-api FastAPI Control Plane (JWT RS256 Auth)',
      'Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel',
      'Nmap done: 1 IP address scanned in 4.18 seconds',
    ],
  },
  suricata: {
    command: 'suricata -T -c /etc/suricata/suricata.yaml -v',
    output: [
      '[i] Suricata 8.0.0-dev initializing signature engine...',
      '[i] Loading 50,400 Emerging Threats (ET Open) rulesets: OK',
      '[i] Enabling thread count: 4 (AF_PACKET workers)',
      '[i] Zero-copy packet ring buffer mounted on eth0',
      '[i] Configuration provided was successfully validated. Engine ready.',
    ],
  },
  fail2ban: {
    command: 'fail2ban-client status sshd',
    output: [
      'Status for the jail: sshd',
      '|- Filter',
      '|  |- Currently failed: 2',
      '|  `- Total failed:     34',
      '`- Actions',
      '   |- Currently banned: 4',
      '   |- Total banned:     19',
      '   `- Banned IP list:   198.51.100.24 203.0.113.88 192.0.2.14 198.51.100.112',
    ],
  },
};

export default function SceneTelemetryJourney() {
  const { roomCount, loading, error, source } = useTryHackMeStats();
  const [selectedCmd, setSelectedCmd] = useState('nmap');

  return (
    <section id="telemetry" className="relative px-6 py-24 md:px-12 bg-void">
      <div className="max-w-content mx-auto">
        {/* ── SECTION HEADER ─────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 font-mono text-xs text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            <span>SCENE E // VERIFIED CREDENTIALS & TRAJECTORY</span>
          </div>
          <h2 className="mt-3 font-display text-section-heading font-bold text-text-primary">
            Telemetry & Experience<span className="text-cyan">.</span>
          </h2>
          <p className="mt-3 max-w-xl font-sans text-text-secondary leading-relaxed">
            Live lab metrics, certified ethical hacking accreditations, and professional career progression.
          </p>
        </div>

        {/* ── 3-COLUMN METRICS STATS BAR ──────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          {/* CEH Certified */}
          <div className="glass-panel p-6 border-cobalt/40 bg-surface/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono text-micro text-cobalt">
                <span>CERTIFICATION</span>
                <span className="text-success">✓ ACTIVE</span>
              </div>
              <div className="mt-3 font-display text-2xl font-bold text-text-primary">
                CEH
              </div>
              <div className="mt-1 font-mono text-xs text-cyan">
                Certified Ethical Hacker
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle font-mono text-[11px] text-text-muted">
              EC-Council Standard Defense
            </div>
          </div>

          {/* Master-Diploma BIA */}
          <div className="glass-panel p-6 border-cyan/40 bg-surface/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono text-micro text-cyan">
                <span>DIPLOMA</span>
                <span className="text-success">✓ COMPLETED</span>
              </div>
              <div className="mt-3 font-display text-2xl font-bold text-text-primary">
                Master-Diploma
              </div>
              <div className="mt-1 font-mono text-xs text-text-secondary">
                Cyber Security & Ethical Hacking
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle font-mono text-[11px] text-text-muted">
              Boston Institute of Analytics / Spinnaker
            </div>
          </div>

          {/* TryHackMe Live Telemetry */}
          <div className="glass-panel p-6 border-cyan/40 bg-surface/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono text-micro text-cyan">
                <span>TRYHACKME TELEMETRY</span>
                <span className="animate-pulse text-cyan">● LIVE</span>
              </div>
              <div className="mt-3 font-display text-2xl font-bold text-text-primary">
                {loading ? '70+' : `${roomCount}+`}
              </div>
              <div className="mt-1 font-mono text-xs text-cyan">
                Completed Rooms · Top 4%
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle font-mono text-[11px] text-text-muted">
              {source === 'netlify-function' ? 'Netlify Cached Query' : 'Direct Verified Profile'}
            </div>
          </div>

          {/* Employee of the Quarter Award */}
          <div className="glass-panel p-6 border-amber/40 bg-surface/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono text-micro text-amber">
                <span>LEADERSHIP AWARD</span>
                <span className="text-amber">🏆 WON</span>
              </div>
              <div className="mt-3 font-display text-2xl font-bold text-text-primary">
                EOTQ 2025
              </div>
              <div className="mt-1 font-mono text-xs text-amber">
                CreditAccess Grameen Limited
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle font-mono text-[11px] text-text-muted">
              Employee of the Quarter (Apr–Jun 2025)
            </div>
          </div>
        </div>

        {/* ── 2-COLUMN SPLIT: CAREER TIMELINE & INTERACTIVE TERMINAL ─── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left: Professional Timeline (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            <h3 className="font-display text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <span className="text-cyan">01 //</span> CAREER TRAJECTORY & LEADERSHIP
            </h3>

            <div className="relative border-l border-border pl-6 space-y-8">
              {CAREER_TIMELINE.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-void bg-cobalt transition-colors group-hover:bg-cyan" />

                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="text-cyan font-semibold">{item.period}</span>
                    <span className="text-border">·</span>
                    <span className="text-text-muted">{item.location}</span>
                    <span className="rounded bg-surface px-2 py-0.5 text-[10px] text-text-muted border border-border-subtle">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="mt-1.5 font-display text-lg font-bold text-text-primary">
                    {item.role}
                  </h4>
                  <div className="font-sans text-sm font-medium text-text-secondary">
                    {item.company}
                  </div>

                  <ul className="mt-3 space-y-1.5 font-sans text-xs md:text-sm text-text-muted leading-relaxed">
                    {item.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Terminal Simulator (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <h3 className="font-display text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <span className="text-cyan">02 //</span> LIVE LABORATORY PROBES
            </h3>

            <div className="glass-panel overflow-hidden border border-border flex-1 flex flex-col shadow-2xl">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-border-subtle bg-surface px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
                  <span className="ml-2 font-mono text-xs text-text-muted">
                    secops@lab-workstation:~
                  </span>
                </div>

                <div className="flex gap-1.5 font-mono text-[10px]">
                  {Object.keys(TERMINAL_COMMANDS).map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => setSelectedCmd(cmd)}
                      className={`px-2 py-1 rounded transition-colors ${
                        selectedCmd === cmd
                          ? 'bg-cyan/20 text-cyan border border-cyan/40'
                          : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Content Screen */}
              <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto flex-1 bg-void/90 text-text-secondary">
                <div className="flex items-center gap-2 text-cyan mb-3">
                  <span className="text-cobalt">gururaj@lab:~$</span>
                  <span>{TERMINAL_COMMANDS[selectedCmd].command}</span>
                </div>

                <div className="space-y-1 text-text-muted">
                  {TERMINAL_COMMANDS[selectedCmd].output.map((line, idx) => (
                    <div
                      key={idx}
                      className={
                        line.includes('open') || line.includes('OK') || line.includes('validated')
                          ? 'text-cyan'
                          : line.includes('banned') || line.includes('Total failed')
                          ? 'text-amber'
                          : ''
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 text-cyan">
                  <span className="text-cobalt">gururaj@lab:~$</span>
                  <span className="inline-block h-3.5 w-2 bg-cyan animate-pulse" />
                </div>
              </div>

              <div className="border-t border-border-subtle bg-surface/50 px-4 py-2.5 font-mono text-[11px] text-text-faint flex justify-between">
                <span>BUFFER: 44.1 KB/s</span>
                <span>AUDIT LOG: PASS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
