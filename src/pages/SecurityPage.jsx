import React, { useState } from 'react';
import useTryHackMeStats from '../hooks/useTryHackMeStats';
import useSEO from '../hooks/useSEO';

const SKILLS_PHASES = [
  {
    num: '01',
    name: 'Reconnaissance & OSINT',
    tags: ['Nmap 7.95', 'Wireshark / tshark', 'Shodan', 'OpenVAS', 'Passive DNS', 'Vulnerability Baseline'],
  },
  {
    num: '02',
    name: 'Defensive Perimeter & Segmentation',
    tags: ['iptables / nftables', 'Suricata 8.0 IDS', 'Fail2Ban', 'pfSense', 'VLAN Micro-segmentation', 'FreeRADIUS 802.1X'],
  },
  {
    num: '03',
    name: 'Identity & Zero-Trust Gateways',
    tags: ['Keycloak OIDC', 'RS256 JWKS Enforcement', 'MISP Feeds', 'TheHive', 'OpenCTI', 'Tenant Isolation'],
  },
  {
    num: '04',
    name: 'Automation & SOAR Engineering',
    tags: ['FastAPI', 'PostgreSQL (45 Tables)', 'n8n Clusters', 'HMAC Webhooks', 'Docker Compose', 'Grafana SOC'],
  },
];

const LAB_EVIDENCE = [
  {
    control: 'Network DoS Mitigation',
    mechanism: 'iptables / nftables kernel rules',
    result: '1,935 / 2,000 SYN-flood packets dropped (96.75% mitigation rate under continuous stress test).',
    status: 'EMPIRICAL LAB PROOF',
  },
  {
    control: 'Automated Brute-Force Defense',
    mechanism: 'Fail2Ban sshd jail + iptables REJECT',
    result: 'Automated hostile IP isolation within 3 authentication failures; dynamic jail table persistence.',
    status: 'VERIFIED DEPLOYMENT',
  },
  {
    control: 'Network Intrusion Detection (NIDS)',
    mechanism: 'Suricata 8.0 with 50,400 ET Open rules',
    result: '44 named threat alerts recorded across database lateral movement and port scan attempts.',
    status: 'VALIDATED SIGNATURES',
  },
  {
    control: 'Endpoint Anti-Malware Defense',
    mechanism: 'ClamAV 1.4.4 daemon + freshclam',
    result: 'Instant detection and quarantine of EICAR test artifacts and malicious payload binaries.',
    status: 'ACTIVE PROTECTION',
  },
  {
    control: 'System Hardening & Audit',
    mechanism: 'Lynis 3.1 enterprise compliance scan',
    result: 'Security hardening score elevated from baseline 54 to 81 through kernel sysctl lockdown.',
    status: 'HARDENING SCORE: 81/100',
  },
];

const CTF_ROOMS = [
  { name: 'Jr Penetration Tester', type: 'Path', diff: 'Medium', points: 'Completed' },
  { name: 'Pre-Security', type: 'Path', diff: 'Easy', points: 'Completed' },
  { name: 'OWASP Top 10', type: 'Room', diff: 'Easy', points: 'Completed' },
  { name: 'Nmap', type: 'Room', diff: 'Easy', points: 'Completed' },
  { name: 'Metasploit', type: 'Room', diff: 'Medium', points: 'Completed' },
  { name: 'Burp Suite: Basics', type: 'Module', diff: 'Easy', points: 'Completed' },
  { name: 'Linux PrivEsc', type: 'Room', diff: 'Medium', points: 'Completed' },
  { name: 'Windows PrivEsc', type: 'Room', diff: 'Hard', points: 'Completed' },
  { name: 'Active Directory Basics', type: 'Room', diff: 'Medium', points: 'Completed' },
  { name: 'Intro to Web Hacking', type: 'Module', diff: 'Easy', points: 'Completed' },
];

export default function SecurityPage() {
  useSEO({
    title: 'Cybersecurity Engineering & Labs',
    description:
      'Certified Ethical Hacker (CEH) security lab, verified empirical defense-in-depth evidence, zero-trust threat gateways, and TryHackMe telemetry.',
  });

  const { roomCount, loading } = useTryHackMeStats();
  const [selectedPhase, setSelectedPhase] = useState(0);

  return (
    <div className="relative min-h-screen px-6 py-16 md:px-12">
      <div className="max-w-content mx-auto">
        {/* ── TOP HEADER ──────────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 font-mono text-xs text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            <span>OPERATIONS // CYBERSECURITY ARCHITECTURE</span>
          </div>
          <h1 className="mt-3 font-display text-hero-heading font-bold text-text-primary">
            Security Systems & Labs<span className="text-cyan">.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-base md:text-lg text-text-secondary leading-relaxed">
            CEH-certified engineering combining offensive penetration testing fundamentals with
            resilient, empirical zero-trust defense architectures.
          </p>
        </div>

        {/* ── TOP TELEMETRY CARDS ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {/* CEH Card */}
          <div className="glass-panel p-6 border-cobalt/40 bg-surface/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono text-micro text-cobalt">
                <span>OFFICIAL CREDENTIAL</span>
                <span className="text-success">✓ CERTIFIED</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-text-primary">
                CEH
              </h3>
              <div className="font-mono text-xs text-cyan mt-1">
                Certified Ethical Hacker
              </div>
              <p className="mt-2.5 font-sans text-xs text-text-muted leading-relaxed">
                EC-Council certification covering network reconnaissance, vulnerability analysis, system penetration, web application attacks, and perimeter defense.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-border-subtle font-mono text-[11px] text-text-muted">
              EC-Council Standard
            </div>
          </div>

          {/* Master-Diploma Card */}
          <div className="glass-panel p-6 border-cyan/40 bg-surface/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono text-micro text-cyan">
                <span>ACADEMIC CAPSTONE</span>
                <span className="text-success">✓ COMPLETED</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-text-primary">
                Master-Diploma
              </h3>
              <div className="font-mono text-xs text-text-secondary mt-1">
                Cyber Security & Ethical Hacking
              </div>
              <p className="mt-2.5 font-sans text-xs text-text-muted leading-relaxed">
                Boston Institute of Analytics / Spinnaker Analytics. Capstone: Zero-trust CTI Gateway (SentinelMesh) and Enterprise Zero-Trust Architecture (Meridian Financial Group).
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-border-subtle font-mono text-[11px] text-text-muted">
              BIA & Spinnaker Analytics
            </div>
          </div>

          {/* TryHackMe Live Telemetry */}
          <div className="glass-panel p-6 border-cyan/40 bg-surface/80 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <div className="flex items-center justify-between font-mono text-micro text-cyan">
                <span>TRYHACKME TELEMETRY</span>
                <span className="animate-pulse text-cyan">● LIVE</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-text-primary">
                {loading ? '70+' : `${roomCount}+`}
              </h3>
              <div className="font-mono text-xs text-cyan mt-1">
                Rooms Completed · Global Top 4%
              </div>
              <p className="mt-2.5 font-sans text-xs text-text-muted leading-relaxed">
                Continuous offensive & defensive hands-on challenges across Linux privilege escalation, Active Directory attack paths, web application exploitation, and network forensics.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-border-subtle flex items-center justify-between font-mono text-[11px]">
              <span className="text-text-muted">User: Gururajseethur</span>
              <a
                href="https://tryhackme.com/p/Gururajseethur"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:underline"
              >
                View Profile ↗
              </a>
            </div>
          </div>
        </div>

        {/* ── EMPIRICAL LAB EVIDENCE TABLE ────────────────────────────── */}
        <div className="glass-panel p-8 md:p-10 border-border mb-16 shadow-glass-panel">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6 mb-8">
            <div>
              <div className="font-mono text-micro uppercase tracking-wider text-cyan">
                VERIFIABLE TECHNICAL FINDINGS
              </div>
              <h3 className="font-display text-2xl font-bold text-text-primary mt-1">
                Empirical Defense-in-Depth Lab Evidence
              </h3>
            </div>
            <span className="font-mono text-xs rounded border border-success/30 bg-success/10 px-3 py-1.5 text-success self-start">
              ALL CONTROLS TESTED & VERIFIED
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead>
                <tr className="border-b border-border-subtle font-mono text-xs text-text-muted uppercase">
                  <th className="pb-3 pr-4">Control Objective</th>
                  <th className="pb-3 px-4">Tool & Mechanism</th>
                  <th className="pb-3 px-4">Empirical Measured Result</th>
                  <th className="pb-3 pl-4 text-right">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {LAB_EVIDENCE.map((item, idx) => (
                  <tr key={idx} className="hover:bg-surface-elevated/40 transition-colors">
                    <td className="py-4 pr-4 font-display font-semibold text-text-primary">
                      {item.control}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-cyan">
                      {item.mechanism}
                    </td>
                    <td className="py-4 px-4 text-text-secondary text-xs md:text-sm">
                      {item.result}
                    </td>
                    <td className="py-4 pl-4 text-right font-mono text-micro text-success">
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 4 PHASES DEFENSIVE CAPABILITY MATRIX ───────────────────── */}
        <div className="mb-16">
          <div className="font-mono text-xs uppercase tracking-wider text-cyan mb-2">
            METHODOLOGY & CAPABILITIES
          </div>
          <h3 className="font-display text-2xl font-bold text-text-primary mb-8">
            Security Lifecycle Phases
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS_PHASES.map((phase, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 border-border/70 hover:border-cyan/50 hover:bg-surface-elevated/70 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xs text-cobalt font-semibold mb-2">
                    PHASE // {phase.num}
                  </div>
                  <h4 className="font-display text-lg font-bold text-text-primary">
                    {phase.name}
                  </h4>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-border-subtle">
                  {phase.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-void/80 px-2 py-0.5 font-mono text-[11px] text-text-secondary border border-border-subtle"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TRYHACKME ROOMS / CTF MATRIX ───────────────────────────── */}
        <div className="glass-panel p-8 md:p-10 border-border">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6">
            <div>
              <div className="font-mono text-micro uppercase tracking-wider text-cyan">
                CHALLENGE LOGS
              </div>
              <h3 className="font-display text-xl font-bold text-text-primary mt-1">
                Completed TryHackMe Challenge Rooms & Paths
              </h3>
            </div>
            <a
              href="https://tryhackme.com/p/Gururajseethur"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-cyan hover:underline"
            >
              Live Profile ↗
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CTF_ROOMS.map((room, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-border-subtle bg-void/60 p-3.5 hover:border-border transition-colors"
              >
                <div>
                  <div className="font-display text-sm font-semibold text-text-primary">
                    {room.name}
                  </div>
                  <div className="font-mono text-[10px] text-text-muted mt-0.5">
                    {room.type} · {room.diff}
                  </div>
                </div>
                <span className="font-mono text-[10px] text-success rounded bg-success/10 px-2 py-0.5 border border-success/20">
                  {room.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
