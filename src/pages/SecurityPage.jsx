import React, { useState, useEffect, useCallback } from 'react';
import useTryHackMeStats from '../hooks/useTryHackMeStats';
import useScrollReveal from '../hooks/useScrollReveal';

const BOOT_LINES = [
  '[    0.000] Initializing security module...',
  '[    0.183] Loading kernel: 5.15.0-kali3-amd64',
  '[    0.441] Starting network interfaces...',
  '[    0.892] Mounting encrypted volumes...',
  '[    1.204] Loading TryHackMe profile: Gururajseethur',
  '[    1.587] Verifying CEH certification... OK',
  '[    1.891] 54+ rooms completed. Scanning active...',
  '[    2.203] ',
  '[    2.203] ██████████████████████ 100%',
  '[    2.501] ACCESS GRANTED',
  '[    2.501] ',
  '[    2.800] Welcome back, Gururaj.',
];

function BootOverlay({ onDone }) {
  const [lines, setLines] = useState([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines(prev => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(iv);
        setTimeout(() => {
          setFading(true);
          setTimeout(onDone, 500);
        }, 600);
      }
    }, 150);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#020204',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.5s ease',
      pointerEvents: fading ? 'none' : 'all',
    }}>
      <div style={{ maxWidth: 600, width: '100%', padding: '0 32px' }}>
        {lines.map((line, i) => (
          <div key={i} style={{
            fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 1.8,
            color: line.includes('ACCESS GRANTED') || line.includes('Welcome') ? '#FFFFFF'
              : line.includes('100%') ? '#FF3B3B' : '#00D9FF',
            animation: 'boot-line 0.3s ease both',
          }}>
            {line || '\u00A0'}
          </div>
        ))}
        {!fading && lines.length < BOOT_LINES.length && (
          <span style={{
            display: 'inline-block', width: 8, height: 14,
            background: '#00D9FF', verticalAlign: 'text-bottom',
            animation: 'blink 1s step-start infinite',
          }} />
        )}
      </div>
    </div>
  );
}

const SKILLS_PHASES = [
  {
    num: '01', name: 'Reconnaissance',
    tags: ['Nmap','Shodan','TheHarvester','OSINT','Maltego'],
  },
  {
    num: '02', name: 'Exploitation',
    tags: ['Metasploit','Burp Suite','SQLMap','XSS','OWASP Top10'],
  },
  {
    num: '03', name: 'Post-Exploitation',
    tags: ['Privilege Escalation','Mimikatz','BloodHound','Persistence'],
  },
  {
    num: '04', name: 'Scripting & Tooling',
    tags: ['Python','Bash','PowerShell','Docker','Git'],
  },
];

const CTF_ROOMS = [
  { name: 'Jr Penetration Tester', type: 'Path',   diff: 'Medium' },
  { name: 'Pre-Security',          type: 'Path',   diff: 'Easy'   },
  { name: 'OWASP Top 10',          type: 'Room',   diff: 'Easy'   },
  { name: 'Nmap',                  type: 'Room',   diff: 'Easy'   },
  { name: 'Metasploit',            type: 'Room',   diff: 'Medium' },
  { name: 'Burp Suite: Basics',    type: 'Module', diff: 'Easy'   },
  { name: 'Linux PrivEsc',         type: 'Room',   diff: 'Medium' },
  { name: 'Win PrivEsc',           type: 'Room',   diff: 'Hard'   },
  { name: 'Active Directory Basics', type: 'Room', diff: 'Medium' },
  { name: 'Intro to Web Hacking',  type: 'Module', diff: 'Easy'   },
];

const TYPE_STYLES = {
  Path:   { bg: 'rgba(0,217,255,0.1)',   border: '#00D9FF', color: '#00D9FF' },
  Room:   { bg: 'rgba(255,59,59,0.1)',   border: '#FF3B3B', color: '#FF3B3B' },
  Module: { bg: 'rgba(34,197,94,0.1)',   border: '#22C55E', color: '#22C55E' },
};

const DIFF_COLORS = { Easy: '#22C55E', Medium: '#FFB800', Hard: '#FF3B3B' };



function SkillTag({ label }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 12,
        border: `1px solid ${hov ? '#00D9FF' : '#1C1C24'}`,
        color: hov ? '#00D9FF' : '#888',
        background: hov ? 'rgba(0,217,255,0.05)' : 'transparent',
        boxShadow: hov ? '0 0 8px rgba(0,217,255,0.2)' : 'none',
        padding: '4px 10px', borderRadius: 4,
        transition: 'all 0.15s ease',
        display: 'inline-block',
      }}
    >
      {label}
    </span>
  );
}

export default function SecurityPage() {
  // Read sessionStorage synchronously during init — avoids the blank-page flicker
  const [booted, setBooted] = useState(() =>
    typeof window !== 'undefined' && !!sessionStorage.getItem('securityBooted')
  );
  const [hoverRow, setHoverRow] = useState(null);
  const { roomCount, loading } = useTryHackMeStats();
  const sectionRef = useScrollReveal();

  const handleDone = useCallback(() => {
    sessionStorage.setItem('securityBooted', '1');
    setBooted(true);
  }, []);

  return (
    <>
      {!booted && <BootOverlay onDone={handleDone} />}

      <div
        ref={sectionRef}
        className="scanlines"
        style={{
          minHeight: '100vh',
          padding: '120px max(48px, 5vw)',
          opacity: booted ? 1 : 0,
          transition: 'opacity 0.4s ease 0.1s',
        }}
      >
        <div className="max-w-content mx-auto">

          {/* Header */}
          <div style={{ marginBottom: 80 }}>
            <div data-reveal style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555',
              border: '1px solid #1C1C24', padding: '4px 12px', borderRadius: 99,
              marginBottom: 24,
            }}>
              // SECURITY
            </div>
            <h1 data-reveal data-delay="100" style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(40px,6vw,64px)', color: '#FFFFFF',
              letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px',
            }}>
              Ethical Hacker<br />
              <span style={{ color: '#00D9FF' }}>in progress.</span>
            </h1>
            <p data-reveal data-delay="200" style={{ fontSize: 16, color: '#666', maxWidth: 480, lineHeight: 1.6 }}>
              Pivoting from filmmaker to penetration tester. OSCP is the target.
            </p>
          </div>

          {/* TryHackMe card */}
          <div data-reveal style={{
            background: 'rgba(0,217,255,0.03)',
            border: '1px solid rgba(0,217,255,0.2)',
            borderRadius: 16, padding: 40, marginBottom: 64,
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center',
          }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#00D9FF', letterSpacing: '0.1em', marginBottom: 8 }}>
                // VERIFIED PROFILE
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: '#FFFFFF', margin: '0 0 8px' }}>
                TryHackMe
              </h2>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#00D9FF', marginBottom: 20 }}>
                54+ rooms · OSCP trajectory · CEH Certified
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { label: `${loading ? '54+' : roomCount} Rooms` },
                  { label: 'CEH ✓' },
                ].map(s => (
                  <span key={s.label} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12,
                    background: 'rgba(0,217,255,0.1)',
                    border: '1px solid #00D9FF', color: '#00D9FF',
                    padding: '4px 14px', borderRadius: 99,
                  }}>
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#50505A', letterSpacing: '0.1em' }}>
                // PROFILE
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: '#FFFFFF' }}>
                @Gururajseethur
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[
                  { label: 'Jr Pen Tester Path', color: '#00D9FF' },
                  { label: 'Pre-Security Path', color: '#00D9FF' },
                  { label: 'CEH ✓', color: '#FF3B3B' },
                ].map(b => (
                  <span key={b.label} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
                    border: `1px solid ${b.color}`, color: b.color,
                    background: `${b.color}18`, padding: '4px 12px', borderRadius: 4,
                  }}>{b.label}</span>
                ))}
              </div>
              <a
                href="https://tryhackme.com/p/Gururajseethur"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em',
                  color: '#00D9FF', textDecoration: 'none',
                  border: '1px solid rgba(0,217,255,0.3)', padding: '8px 18px', borderRadius: 6,
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(0,217,255,0.08)'; e.currentTarget.style.borderColor='#00D9FF'; }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(0,217,255,0.3)'; }}
              >
                VIEW PROFILE →
              </a>
            </div>
          </div>

          {/* Skills phases */}
          <div data-reveal style={{ marginBottom: 64 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, color: '#FFFFFF', marginBottom: 32 }}>
              Attack Phases
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {SKILLS_PHASES.map((phase, i) => (
                <div
                  key={phase.num}
                  data-reveal
                  data-delay={`${i * 100}`}
                  style={{ background: '#0E0E12', border: '1px solid #1C1C24', borderRadius: 12, padding: 24 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
                      background: '#00D9FF', color: '#070709',
                      padding: '2px 8px', borderRadius: 4,
                    }}>
                      {phase.num}
                    </span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 18, color: '#FFFFFF' }}>
                      {phase.name}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {phase.tags.map(t => <SkillTag key={t} label={t} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTF Table */}
          <div data-reveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, color: '#FFFFFF', marginBottom: 24 }}>
              Completed Rooms
            </h2>

            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '20px 1fr 90px 70px',
              gap: '0 16px', padding: '8px 12px', marginBottom: 4,
            }}>
              {['', 'ROOM', 'TYPE', 'DIFF'].map(h => (
                <span key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#00D9FF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>
              ))}
            </div>
            <div style={{ height: 1, background: '#1C1C24', marginBottom: 4 }} />

            {CTF_ROOMS.map((room, i) => {
              const ts = TYPE_STYLES[room.type] || TYPE_STYLES.Room;
              return (
                <div
                  key={room.name}
                  onMouseEnter={() => setHoverRow(i)}
                  onMouseLeave={() => setHoverRow(null)}
                  style={{
                    display: 'grid', gridTemplateColumns: '20px 1fr 90px 70px',
                    gap: '0 16px', padding: '12px 12px',
                    background: hoverRow === i ? 'rgba(0,217,255,0.03)' : 'transparent',
                    borderRadius: 6, transition: 'background 0.2s ease',
                  }}
                >
                  <span style={{ color: '#00D9FF', fontSize: 10, alignSelf: 'center' }}>▶</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 16, color: '#FFFFFF' }}>
                    {room.name}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color,
                    padding: '2px 8px', borderRadius: 4, alignSelf: 'center', display: 'inline-block',
                  }}>
                    {room.type}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: DIFF_COLORS[room.diff], alignSelf: 'center' }}>
                    {room.diff}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
