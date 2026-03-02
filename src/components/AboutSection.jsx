import React, { useRef, useEffect, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const CREATIVE_TAGS = ['Video Editing','Colour Grading','Motion Graphics','Storytelling','Brand Filmmaking','Audio Design'];
const SECURITY_TAGS = ['Penetration Testing','Nmap','Metasploit','Burp Suite','Linux','Docker','Python','CTF'];

function AvatarOrb() {
  const mountRef = useRef(null);

  useEffect(() => {
    let frameId;
    const canvas = mountRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width  = 360;
    const H = canvas.height = 200;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0E0E12';
      ctx.fillRect(0, 0, W, H);

      // Two orbiting dots + glow
      const cx = W / 2, cy = H / 2;
      const orbit = 60;

      // Red dot
      const rx = cx + Math.cos(t * 0.8) * orbit;
      const ry = cy + Math.sin(t * 0.8) * (orbit * 0.4);
      const rg1 = ctx.createRadialGradient(rx, ry, 0, rx, ry, 40);
      rg1.addColorStop(0, 'rgba(255,59,59,0.5)');
      rg1.addColorStop(1, 'rgba(255,59,59,0)');
      ctx.beginPath(); ctx.arc(rx, ry, 40, 0, Math.PI * 2);
      ctx.fillStyle = rg1; ctx.fill();
      ctx.beginPath(); ctx.arc(rx, ry, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FF3B3B'; ctx.fill();

      // Cyan dot
      const bx = cx + Math.cos(t * 0.8 + Math.PI) * orbit;
      const by = cy + Math.sin(t * 0.8 + Math.PI) * (orbit * 0.4);
      const rg2 = ctx.createRadialGradient(bx, by, 0, bx, by, 40);
      rg2.addColorStop(0, 'rgba(0,217,255,0.4)');
      rg2.addColorStop(1, 'rgba(0,217,255,0)');
      ctx.beginPath(); ctx.arc(bx, by, 40, 0, Math.PI * 2);
      ctx.fillStyle = rg2; ctx.fill();
      ctx.beginPath(); ctx.arc(bx, by, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#00D9FF'; ctx.fill();

      // Center glow
      const rg3 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
      rg3.addColorStop(0, 'rgba(255,255,255,0.15)');
      rg3.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fillStyle = rg3; ctx.fill();

      t += 0.02;
      frameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return <canvas ref={mountRef} style={{ width: '100%', height: '200px', display: 'block' }} />;
}

function SkillTag({ label, type }) {
  const [hovered, setHovered] = useState(false);
  const color = type === 'creative' ? '#FF3B3B' : '#00D9FF';
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 11,
        border: `1px solid ${hovered ? color : '#1C1C24'}`,
        color: hovered ? color : '#50505A',
        padding: '4px 10px', borderRadius: 4,
        transition: 'all 0.15s ease',
        display: 'inline-block',
      }}
    >
      {label}
    </span>
  );
}

function AvatarCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    setTilt({ x: y * 6, y: x * -10 });
  };

  return (
    <div style={{ position: 'relative', width: 360, height: 420, margin: '0 auto' }}>
      {/* Glow layers */}
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,59,59,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -60, left: -60, width: 250, height: 250,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,217,255,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Card */}
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(135deg, #0E0E12, #12121A)',
          border: '1px solid #1C1C24',
          borderRadius: 24,
          overflow: 'hidden',
          position: 'relative',
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 ? 'transform 0.3s ease' : 'transform 0.1s ease',
        }}
      >
        {/* Top: orbit animation */}
        <AvatarOrb />

        {/* Bottom: identity */}
        <div style={{
          padding: '24px', textAlign: 'center',
          borderTop: '1px solid #1C1C24',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 96, lineHeight: 1,
            background: 'linear-gradient(135deg, #FF3B3B, #00D9FF)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            GS
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 16, color: '#FFFFFF', marginTop: 8 }}>
            Gururaj Seethur
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#50505A', marginTop: 4 }}>
            Filmmaker · Ethical Hacker
          </div>
          <div style={{
            display: 'inline-block', marginTop: 12,
            fontFamily: 'var(--font-mono)', fontSize: 11, color: '#444',
            border: '1px solid #1C1C24', padding: '4px 12px', borderRadius: 99,
          }}>
            📍 Bengaluru, India
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ padding: '120px max(48px, 5vw)', position: 'relative' }}
    >
      <div className="max-w-content mx-auto">
        <div style={{ display: 'grid', gridTemplateColumns: '55fr 45fr', gap: 80, alignItems: 'start' }}>

          {/* ── Left column ── */}
          <div>
            {/* Section pill */}
            <div
              data-reveal
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555',
                border: '1px solid #1C1C24', padding: '4px 12px', borderRadius: 99,
                marginBottom: 40,
              }}
            >
              // 01 ABOUT
            </div>

            {/* Declaration */}
            <div data-reveal data-delay="100" style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,52px)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                <span style={{ fontWeight: 700, color: '#FFFFFF' }}>I craft stories</span><br />
                <span style={{ fontWeight: 300, color: '#888' }}>with cameras,</span><br />
                <span style={{ fontWeight: 700, color: '#FFFFFF' }}>and exploit systems</span><br />
                <span style={{ fontWeight: 300, color: '#888' }}>with terminals.</span>
              </div>
            </div>

            {/* Bio */}
            <div data-reveal data-delay="200">
              <p style={{ fontSize: 17, color: '#888', lineHeight: 1.7, marginBottom: 4 }}>
                Currently: Assistant Manager, CreditAccess Grameen.
              </p>
              <p style={{ fontSize: 17, color: '#888', lineHeight: 1.7 }}>
                Simultaneously: Master-Diploma in Ethical Hacking, Boston.
              </p>

              {/* Award badge */}
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, color: '#FF3B3B',
                marginTop: 24,
              }}>
                🏆 Employee of the Quarter · Apr–Jun 2025 · CreditAccess
              </p>
            </div>

            {/* Skills */}
            <div data-reveal data-delay="300" style={{ marginTop: 36 }}>
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#FF3B3B', letterSpacing: '0.15em', marginRight: 12 }}>
                  CREATIVE
                </span>
                <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {CREATIVE_TAGS.map(t => <SkillTag key={t} label={t} type="creative" />)}
                </div>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#00D9FF', letterSpacing: '0.15em', marginRight: 12 }}>
                  SECURITY
                </span>
                <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {SECURITY_TAGS.map(t => <SkillTag key={t} label={t} type="security" />)}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column: Avatar ── */}
          <div data-reveal data-delay="200">
            <AvatarCard />
          </div>
        </div>
      </div>
    </section>
  );
}
