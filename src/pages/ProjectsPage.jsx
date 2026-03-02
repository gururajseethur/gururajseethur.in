import React, { useRef, useState, useEffect, useCallback } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const TERMINAL_LINES = [
  { text: 'root@kali:~# nmap -sV 192.168.1.0/24', color: '#FF3B3B', prompt: true },
  { text: '', color: '#00D9FF', prompt: false },
  { text: 'Starting Nmap 7.94...', color: '#888', prompt: false },
  { text: '', color: '#00D9FF', prompt: false },
  { text: 'PORT     STATE  SERVICE   VERSION', color: '#00D9FF', prompt: false },
  { text: '22/tcp   open   ssh       OpenSSH 8.2', color: '#00D9FF', prompt: false },
  { text: '80/tcp   open   http      Apache 2.4.41', color: '#00D9FF', prompt: false },
  { text: '443/tcp  open   https     nginx 1.18', color: '#00D9FF', prompt: false },
  { text: '3306/tcp open   mysql     MySQL 5.7', color: '#FF8080', prompt: false },
  { text: '', color: '#00D9FF', prompt: false },
  { text: '[+] OS: Linux 4.15 - 5.6', color: '#00D9FF', prompt: false },
  { text: '[+] 4 open ports found', color: '#00D9FF', prompt: false },
  { text: '', color: '#00D9FF', prompt: false },
  { text: 'root@kali:~# _', color: '#FF3B3B', prompt: true },
];

function TerminalPanel() {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [typing, setTyping] = useState('');
  const phaseRef = useRef('typing'); // typing | pause | clearing

  useEffect(() => {
    let timeout;

    const tick = () => {
      if (phaseRef.current === 'clearing') {
        setDisplayedLines([]);
        setCurrentLine(0);
        setCurrentChar(0);
        setTyping('');
        phaseRef.current = 'typing';
        timeout = setTimeout(tick, 300);
        return;
      }

      if (currentLine >= TERMINAL_LINES.length) {
        phaseRef.current = 'clearing';
        timeout = setTimeout(tick, 3000);
        return;
      }

      const line = TERMINAL_LINES[currentLine];
      if (currentChar <= line.text.length) {
        setTyping(line.text.slice(0, currentChar));
        setCurrentChar(c => c + 1);
        timeout = setTimeout(tick, 30);
      } else {
        setDisplayedLines(prev => [...prev, { ...line, text: line.text }]);
        setTyping('');
        setCurrentChar(0);
        setCurrentLine(l => l + 1);
        timeout = setTimeout(tick, line.text === '' ? 50 : 80);
      }
    };

    timeout = setTimeout(tick, 300);
    return () => clearTimeout(timeout);
  }, [currentLine, currentChar]);

  return (
    <div style={{
      background: '#070709',
      borderLeft: '1px solid #1C1C24',
      padding: '32px',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      lineHeight: 1.8,
      height: '100%',
      overflow: 'hidden',
    }}>
      {/* Traffic light */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41' }} />
      </div>

      {displayedLines.map((l, i) => (
        <div key={i} style={{ color: l.color, whiteSpace: 'pre' }}>{l.text}</div>
      ))}

      {currentLine < TERMINAL_LINES.length && (
        <div style={{ color: TERMINAL_LINES[currentLine]?.color || '#00D9FF', whiteSpace: 'pre' }}>
          {typing}
          <span style={{
            display: 'inline-block', width: 8, height: 14,
            background: '#00D9FF', verticalAlign: 'text-bottom',
            animation: 'blink 1s step-start infinite',
          }} />
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const moving = useRef(false);

  const onMove = useCallback((e) => {
    if (!cardRef.current) return;
    moving.current = true;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    cardRef.current.style.transform =
      `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg) translateZ(8px)`;
    cardRef.current.style.transition = 'transform 0.1s ease, border-color 0.2s ease';
    cardRef.current.style.borderColor = '#2A2A34';
  }, []);

  const onLeave = useCallback(() => {
    if (!cardRef.current) return;
    moving.current = false;
    cardRef.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)';
    cardRef.current.style.transition = 'transform 0.4s ease, border-color 0.2s ease';
    cardRef.current.style.borderColor = '#1C1C24';
  }, []);

  const statusColors = {
    Active:   '#00D9FF',
    Deployed: '#22C55E',
    Archived: '#50505A',
  };
  const gradientColors = {
    Active:   'rgba(0,217,255,0.06)',
    Deployed: 'rgba(34,197,94,0.06)',
    Archived: 'transparent',
  };
  const sc = statusColors[project.status] || '#50505A';
  const gc = gradientColors[project.status] || 'transparent';

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-reveal
      data-delay={`${index * 100}`}
      style={{
        minHeight: 260, padding: 28,
        background: '#0E0E12',
        border: '1px solid #1C1C24', borderRadius: 16,
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}
    >
      {/* Corner gradient */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 120, height: 120,
        background: `radial-gradient(circle at top right, ${gc} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {project.category}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: sc, border: `1px solid ${sc}44`,
          padding: '2px 8px', borderRadius: 99,
        }}>
          {project.status}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 20,
        color: '#FFFFFF', margin: 0, lineHeight: 1.3, position: 'relative', zIndex: 1,
      }}>
        {project.name}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: 15, color: '#666', lineHeight: 1.7,
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        margin: 0, flex: 1, position: 'relative', zIndex: 1,
      }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        {project.tags.slice(0, 4).map(t => (
          <span key={t} style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            border: '1px solid #1C1C24', color: '#50505A',
            padding: '3px 8px', borderRadius: 4,
          }}>{t}</span>
        ))}
        {project.tags.length > 4 && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: '#50505A', padding: '3px 8px',
          }}>+{project.tags.length - 4}</span>
        )}
      </div>

      {/* Bottom row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <a
          href={project.github || '#'}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#555', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = '#00D9FF'}
          onMouseLeave={e => e.target.style.color = '#555'}
        >
          {project.github ? 'GitHub →' : '—'}
        </a>
        <span style={{ color: '#1C1C24', fontSize: 18 }}>↗</span>
      </div>
    </div>
  );
}

const FEATURED = {
  category: 'HOME LAB / SECURITY',
  status: 'Active',
  name: 'HexaMine Private Cloud',
  description: 'Self-hosted Proxmox homelab with full cybersecurity stack — IDS, SIEM, CTF infra, and isolated pentest ranges. Production-grade monitoring on commodity hardware.',
  tags: ['Proxmox', 'pfSense', 'Wazuh', 'Kali Linux'],
};

const PROJECTS = [
  {
    category: 'SECURITY',
    status: 'Active',
    name: 'OSCP Prep Tracker',
    description: 'Structured roadmap tracker built in Notion + Python to monitor HTB/THM progress toward OSCP certification.',
    tags: ['Python', 'TryHackMe', 'HackTheBox'],
  },
  {
    category: 'CREATIVE / TOOLING',
    status: 'Deployed',
    name: 'Automated Video Pipeline',
    description: 'FFmpeg + shell scripts + custom LUT packages for batch colour-grading and delivery of corporate video content.',
    tags: ['FFmpeg', 'Shell', 'DaVinci Resolve'],
  },
  {
    category: 'SECURITY',
    status: 'Active',
    name: 'CTF Write-ups Repository',
    description: 'Documented solutions to 54+ TryHackMe rooms, covering web exploitation, privilege escalation, and forensics.',
    tags: ['Markdown', 'Linux', 'Web Exploitation'],
  },
  {
    category: 'WEB / PORTFOLIO',
    status: 'Deployed',
    name: 'gururajseethur.in',
    description: 'This portfolio — React + Vite + Three.js. Full creative + security showcase with 3D visuals.',
    tags: ['React', 'Three.js', 'Vite', 'Tailwind'],
  },
];

export default function ProjectsPage() {
  const sectionRef = useScrollReveal();

  return (
    <div ref={sectionRef} style={{ minHeight: '100vh', padding: '120px max(48px, 5vw)' }}>
      <div className="max-w-content mx-auto">

        {/* Header */}
        <div style={{ marginBottom: 80 }}>
          <div data-reveal style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555',
            border: '1px solid #1C1C24', padding: '4px 12px', borderRadius: 99,
            marginBottom: 24,
          }}>
            // PROJECTS
          </div>
          <h1 data-reveal data-delay="100" style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(40px,6vw,64px)', color: '#FFFFFF',
            letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0,
          }}>
            Things I&apos;ve Built.
          </h1>
        </div>

        {/* Featured */}
        <div
          data-reveal
          style={{
            background: '#0E0E12',
            border: '1px solid #1C1C24', borderRadius: 20,
            overflow: 'hidden', marginBottom: 24,
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            minHeight: 320,
          }}
        >
          {/* Left info */}
          <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                FEATURED · {FEATURED.category}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, color: '#00D9FF',
                border: '1px solid rgba(0,217,255,0.3)', padding: '2px 8px', borderRadius: 99,
              }}>
                {FEATURED.status}
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 36, color: '#FFFFFF', margin: 0, lineHeight: 1.2 }}>
              {FEATURED.name}
            </h2>
            <p style={{ fontSize: 16, color: '#888', lineHeight: 1.7, margin: 0 }}>
              {FEATURED.description}
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {FEATURED.tags.map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: '#00D9FF', border: '1px solid rgba(0,217,255,0.2)',
                  padding: '3px 10px', borderRadius: 4,
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right terminal */}
          <TerminalPanel />
        </div>

        {/* Project Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
          className="projects-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
