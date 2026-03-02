import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const CREATIVE_WORK = [
  {
    title: 'Professional Video Editing',
    type: 'Primary Craft',
    description: 'Client-facing production — storytelling through cuts, pacing, colour grading, and sound design. 200+ videos delivered.',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    icon: '🎬',
  },
  {
    title: 'Motion Design',
    type: 'Motion',
    description: 'Title sequences, lower thirds, animated graphics. Clean motion that serves the narrative.',
    tools: ['After Effects', 'Premiere Pro', 'Photoshop'],
    icon: '✨',
  },
  {
    title: 'Branding & Comm Systems',
    type: 'Branding',
    description: 'Visual identity, typography standards, structured communication design. Systematic thinking applied to brand.',
    tools: ['Figma', 'Illustrator', 'Design Tokens'],
    icon: '🎯',
  },
  {
    title: 'Audio Engineering',
    type: 'Audio',
    description: 'Dialogue cleanup, mixing, foley integration. Great visuals with bad audio still feels broken.',
    tools: ['Audition', 'Premiere Pro', 'DaVinci Resolve'],
    icon: '🎧',
  },
  {
    title: 'Corporate Storytelling',
    type: 'Filmmaking',
    description: 'Annual reports, brand films, internal communications — turning dry briefs into watchable content.',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'Figma'],
    icon: '📽️',
  },
  {
    title: 'Social & Digital Content',
    type: 'Digital',
    description: 'Short-form video, reels, campaign cut-downs. Optimised for engagement without killing the craft.',
    tools: ['Premiere Pro', 'After Effects', 'CapCut'],
    icon: '📱',
  },
];

function CreativeCard({ item, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-reveal
      data-delay={`${(index % 3) * 100}`}
      style={{
        background: '#0E0E12',
        border: `1px solid ${hov ? '#FF3B3B' : '#1C1C24'}`,
        borderRadius: 16, padding: 32,
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
        boxShadow: hov ? '0 0 24px rgba(255,59,59,0.1)' : 'none',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}
    >
      <div style={{ fontSize: 28 }}>{item.icon}</div>
      <div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#FF3B3B', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          {item.type}
        </span>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 20, color: '#FFFFFF', margin: '8px 0 0' }}>
          {item.title}
        </h3>
      </div>
      <p style={{ fontSize: 15, color: '#666', lineHeight: 1.7, margin: 0, flex: 1 }}>
        {item.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {item.tools.map(t => (
          <span key={t} style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            border: `1px solid ${hov ? 'rgba(255,59,59,0.4)' : '#1C1C24'}`,
            color: hov ? '#FF3B3B' : '#50505A',
            padding: '3px 8px', borderRadius: 4,
            transition: 'all 0.15s ease',
            boxShadow: hov ? '0 0 8px rgba(255,59,59,0.15)' : 'none',
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CreativePage() {
  const sectionRef = useScrollReveal();

  return (
    <div
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '120px max(48px, 5vw)',
        background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255,59,59,0.04) 0%, transparent 60%)',
      }}
    >
      <div className="max-w-content mx-auto">

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div data-reveal style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555',
            border: '1px solid #1C1C24', padding: '4px 12px', borderRadius: 99,
            marginBottom: 24,
          }}>
            // CREATIVE
          </div>
          <h1 data-reveal data-delay="100" style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(40px,6vw,64px)', color: '#FFFFFF',
            letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px',
          }}>
            Creative Work.
          </h1>
          <p data-reveal data-delay="200" style={{ fontSize: 16, color: '#666', maxWidth: 480, lineHeight: 1.6 }}>
            Filmmaker since 2021. Every frame is a decision. Every cut is a choice.
          </p>
        </div>

        {/* Film strip decoration */}
        <div data-reveal className="film-strip" style={{ marginBottom: 48, borderRadius: 4 }} />

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {CREATIVE_WORK.map((item, i) => <CreativeCard key={item.title} item={item} index={i} />)}
        </div>

        {/* Award callout */}
        <div data-reveal style={{
          marginTop: 64, padding: '32px 40px',
          background: 'rgba(255,59,59,0.04)',
          border: '1px solid rgba(255,59,59,0.15)',
          borderRadius: 16, textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#FF3B3B', margin: 0 }}>
            🏆 Employee of the Quarter · Apr–Jun 2025 · CreditAccess Grameen
          </p>
          <p style={{ fontSize: 15, color: '#666', marginTop: 8 }}>
            Recognised for creative excellence and end-to-end video production ownership.
          </p>
        </div>
      </div>
    </div>
  );
}
