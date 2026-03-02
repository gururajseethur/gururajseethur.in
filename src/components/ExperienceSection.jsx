import React, { useRef, useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const EXPERIENCES = [
  {
    num: '01', year: '2025',
    company: 'CreditAccess Grameen Limited',
    role: 'Assistant Manager, Branding & Communications',
    type: 'creative',
    location: 'Bengaluru, India',
    period: 'Sep 2024 – Present',
    current: true,
    bullets: [
      'Sole video lead — end-to-end corporate & campaign content across all formats.',
      'Own internal + external comms: social, digital, events, annual reports.',
    ],
  },
  {
    num: '02', year: '2023',
    company: 'BrandStory Digital',
    role: 'Video Editor',
    type: 'creative',
    location: 'Bengaluru, India',
    period: 'May 2023 – Sep 2024',
    current: false,
    bullets: [
      '200+ videos delivered for 15+ clients — zero missed deadlines.',
      'Full post: assembly, colour grading, audio mix, motion graphics.',
    ],
  },
  {
    num: '03', year: '2023',
    company: '404 DM',
    role: 'Video Editor',
    type: 'creative',
    location: 'Remote',
    period: 'Feb 2023 – May 2023',
    current: false,
    bullets: [
      'Brand & services marketing videos — brief to final cut.',
    ],
  },
  {
    num: '04', year: '2022',
    company: 'upGrad Campus',
    role: 'Video Editor',
    type: 'creative',
    location: 'Mumbai, India (Remote)',
    period: 'Aug 2022 – Dec 2022',
    current: false,
    bullets: [
      'Course content & marketing videos; built reusable motion templates at scale.',
    ],
  },
  {
    num: '05', year: '2021',
    company: 'Dhiyo.ai',
    role: 'Intern',
    type: 'creative',
    location: 'Bengaluru, India',
    period: 'Mar 2021 – May 2022',
    current: false,
    bullets: [
      'Content production, social assets & product marketing support.',
    ],
  },
];

function ExperienceEntry({ exp, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(entry.target); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const accentColor = exp.type === 'security' ? '#00D9FF' : '#FF3B3B';

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '32px 0 32px 32px',
        borderBottom: '1px solid #0E0E12',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(40px)',
        background: hovered ? '#0E0E12' : 'transparent',
        borderLeft: `2px solid ${hovered ? accentColor : 'transparent'}`,
        transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, background 0.2s ease, border-left-color 0.2s ease`,
      }}
    >
      {/* Ghost entry number */}
      <div style={{
        position: 'absolute', left: -48, top: 32,
        fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 80,
        color: '#0A0A0E', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        zIndex: 0,
      }}>
        {exp.num}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, color: '#FFFFFF', margin: 0 }}>
              {exp.company}
            </h3>
            {exp.current && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                background: 'rgba(0,217,255,0.08)',
                border: '1px solid #00D9FF', color: '#00D9FF',
                padding: '2px 8px', borderRadius: 4,
              }}>
                CURRENT
              </span>
            )}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#555' }}>
            {exp.period}
          </span>
        </div>

        {/* Role */}
        <p style={{ fontSize: 16, color: accentColor, margin: '6px 0 4px', fontWeight: 500 }}>
          {exp.role}
        </p>

        {/* Location */}
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#444', marginBottom: 12 }}>
          {exp.location}
        </p>

        {/* Bullets */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {exp.bullets.slice(0, 2).map((b, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: accentColor, opacity: 0.5, fontSize: 10, marginTop: 5, flexShrink: 0 }}>▶</span>
              <span style={{ fontSize: 16, color: '#888', lineHeight: 1.8 }}>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useScrollReveal();
  const [activeYear, setActiveYear] = useState('2025');
  const entryRefs = useRef([]);

  useEffect(() => {
    const observers = EXPERIENCES.map((exp, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveYear(exp.year); },
        { threshold: 0.5 }
      );
      if (entryRefs.current[i]) obs.observe(entryRefs.current[i]);
      return obs;
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ padding: '120px max(48px, 5vw)' }}
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
            // 02 EXPERIENCE
          </div>
          <h2 data-reveal data-delay="100" style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(36px,5vw,56px)', color: '#FFFFFF',
            letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0,
          }}>
            The Story So Far.
          </h2>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '35fr 65fr', gap: 40, alignItems: 'start' }}>

          {/* Left: sticky year */}
          <div style={{ position: 'sticky', top: '30vh' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {/* Filled year */}
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 120, lineHeight: 1,
                color: '#0E0E12',
                userSelect: 'none',
                transition: 'color 0.3s ease',
              }}>
                {activeYear}
              </div>
              {/* Outlined overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 120, lineHeight: 1,
                WebkitTextStroke: '1px #1C1C24',
                color: 'transparent',
                userSelect: 'none',
              }}>
                {activeYear}
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ width: 2, height: 200, background: '#1C1C24', marginTop: 16, borderRadius: 1, overflow: 'hidden' }}>
              <div style={{
                width: '100%',
                height: `${((5 - EXPERIENCES.findIndex(e => e.year === activeYear)) / 5) * 100}%`,
                background: 'linear-gradient(to bottom, #00D9FF, #FF3B3B)',
                transition: 'height 0.4s ease',
              }} />
            </div>
          </div>

          {/* Right: entries */}
          <div style={{ paddingTop: 4 }}>
            {EXPERIENCES.map((exp, i) => (
              <div key={exp.company} ref={el => entryRefs.current[i] = el}>
                <ExperienceEntry exp={exp} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
