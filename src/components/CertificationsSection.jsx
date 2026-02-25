import React from 'react';
import ScrollReveal from './ScrollReveal';

const licenses = [
  {
    title: 'Pre Security (New) Certificate',
    issuer: 'TryHackMe',
    issued: 'Jan 2026',
    icon: '🔐',
  },
  {
    title: 'Ethical Hacking & Cyber Security Workshop',
    issuer: 'Technobytes Technologies × IISc Bengaluru',
    issued: 'Sep 2025',
    icon: '🧠',
  },
  {
    title: 'Cybersecurity Skills Certification',
    issuer: 'Elevate Labs × MSME (Govt. of India)',
    issued: 'Nov 2025',
    icon: '🛡️',
  },
  {
    title: 'Offensive Cyber Security Internship',
    issuer: 'inLighnX Global Pvt. Ltd.',
    issued: 'Apr 2025',
    icon: '⚔️',
  },
  {
    title: 'Drone Forensics Internship',
    issuer: 'Aeroworks Drone Technologies × Forensic Experts',
    issued: 'Apr 2025',
    icon: '🚁',
  },
  {
    title: 'Introduction to Security Principles in Cloud Computing',
    issuer: 'Google Cloud',
    issued: 'Mar 2025',
    icon: '☁️',
  },
  {
    title: 'Execution, Persistence, Privilege Escalation and Evasion',
    issuer: 'Infosec',
    issued: 'Mar 2025',
    icon: '⚡',
  },
  {
    title: 'Network Foundations and Addressing',
    issuer: 'Packt',
    issued: 'Nov 2024',
    icon: '🌐',
  },
  {
    title: 'Certified Ethical Hacker (CEH)',
    issuer: 'EC-Council',
    issued: 'Sep 2024 · Expires Sep 2027',
    icon: '🎯',
  },
];

const skillClusters = [
  {
    title: 'Industry Knowledge',
    tone: 'accent',
    skills: [
      'Information Security',
      'Cybersecurity Awareness',
      'Vulnerability Assessment',
      'Threat Analysis',
      'Incident Response',
      'Digital Forensics',
      'Security Audit',
      'OWASP Top 10',
    ],
  },
  {
    title: 'Tools & Technologies',
    tone: 'danger',
    skills: [
      'Nmap',
      'Metasploit',
      'Burp Suite',
      'Wireshark',
      'Linux Security',
      'Network Switches',
      'TCP/IP Suite',
      'Adobe Premiere Pro',
      'After Effects',
      'DaVinci Resolve',
      'Adobe Audition',
      'Python',
    ],
  },
  {
    title: 'Interpersonal Skills',
    tone: 'success',
    skills: [
      'Communication',
      'Problem Solving',
      'Storytelling',
      'Video Production',
      'Marketing',
      'Social Media Marketing',
      'Journalism',
      'Brand Communication',
    ],
  },
  {
    title: 'Languages',
    tone: 'neutral',
    skills: [
      'Kannada',
      'English',
      'Python (Programming Language)',
      'C (Programming Language)',
      'HTML',
      'Front-End Development',
      'Networking Essentials',
      'Windows / Linux',
    ],
  },
];

const THM_USERNAME = 'Gururajseethur';
const THM_BADGE_URL = `https://tryhackme-badges.s3.amazonaws.com/${THM_USERNAME}.png`;
const THM_PROFILE_URL = `https://tryhackme.com/p/${THM_USERNAME}`;
const CERTS_PROFILE_URL = 'https://www.linkedin.com/in/gururaj-seethur/details/certifications/';

function getToneClasses(tone) {
  switch (tone) {
    case 'accent':
      return {
        heading: 'text-accent',
        indicator: 'bg-accent/20 border-accent/35 text-accent',
        chip: 'border-accent/20 text-fg bg-accent/[0.03] hover:border-accent/40',
      };
    case 'danger':
      return {
        heading: 'text-danger',
        indicator: 'bg-danger/15 border-danger/30 text-danger',
        chip: 'border-danger/20 text-fg bg-danger/[0.03] hover:border-danger/35',
      };
    case 'success':
      return {
        heading: 'text-success',
        indicator: 'bg-success/15 border-success/30 text-success',
        chip: 'border-success/20 text-fg bg-success/[0.03] hover:border-success/35',
      };
    default:
      return {
        heading: 'text-fg',
        indicator: 'bg-surface border-edge text-fg-secondary',
        chip: 'border-edge-strong text-fg bg-surface hover:border-accent/30',
      };
  }
}

export default function CertificationsSection() {
  return (
    <section id="certifications" className="px-5 md:px-8 py-20">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <div className="section-label">Certifications</div>
          <div className="accent-line mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-3 tracking-tight">
            Licenses, Certifications & Skills
          </h2>
          <p className="text-sm text-fg-secondary mb-12 max-w-lg">
            Verified credentials from CEH, cloud security, network foundations, offensive labs, and real-world cyber workshops.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {licenses.map((cert, i) => (
            <ScrollReveal key={cert.title} delay={i * 60}>
              <a
                href={CERTS_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="solid-card p-6 block group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/[0.08] border border-accent/[0.15] flex items-center justify-center text-lg">
                    {cert.icon}
                  </div>
                  <span className="font-mono text-[0.6rem] text-accent uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                </div>
                <h3 className="text-sm text-fg-secondary font-medium leading-snug group-hover:text-fg transition-colors">
                  {cert.title}
                </h3>
                <p className="font-mono text-[11px] text-fg-muted mt-3">Issued {cert.issued}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={220}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {skillClusters.map((cluster, i) => (
              <div key={cluster.title} className="solid-card p-6">
                {(() => {
                  const tone = getToneClasses(cluster.tone);
                  return (
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-base font-bold ${tone.heading}`}>{cluster.title}</h3>
                  <span className={`font-mono text-[10px] px-2 py-1 rounded border uppercase tracking-widest ${tone.indicator}`}>
                    {cluster.skills.length} skills
                  </span>
                </div>
                  );
                })()}
                <div className="flex flex-wrap gap-2">
                  {cluster.skills.map((skill) => {
                    const tone = getToneClasses(cluster.tone);
                    return (
                      <span
                        key={`${cluster.title}-${skill}`}
                        className={`font-mono text-[11px] px-2.5 py-1 rounded border transition-colors ${tone.chip}`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="solid-card p-8 text-center">
              <a
                href={THM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block group"
              >
                <img
                  src={THM_BADGE_URL}
                  alt={`TryHackMe badge for ${THM_USERNAME}`}
                  className="h-10 md:h-12 mx-auto mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <p className="font-mono text-sm text-accent group-hover:underline">
                  View TryHackMe Profile →
                </p>
              </a>
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-mono text-xs text-accent font-medium">
                  CEH Certified ✓
                </span>
              </div>
            </div>

            <div className="solid-card p-8">
              <div className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-4">Credential Quick View</div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-fg-secondary">Security Credentials</span>
                  <span className="text-fg font-medium">9</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fg-secondary">Core Domains</span>
                  <span className="text-fg font-medium">OffSec · Network · DFIR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fg-secondary">Flagship Cert</span>
                  <span className="text-fg font-medium">CEH</span>
                </div>
                <a
                  href={CERTS_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-3 text-accent hover:underline font-mono text-xs"
                >
                  Open full licenses page →
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
