import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

const CREATIVE_PILLARS = [
  {
    index: '01',
    title: 'Commercial Video Editing',
    category: 'PRIMARY EDITORIAL CRAFT',
    description:
      'Pacing, narrative assembly, rhythmic cuts, and continuity. Delivered 200+ commercial videos across 15+ corporate and agency clients with a 100% on-time record.',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro'],
    highlight: '200+ Commercial Cuts Delivered',
  },
  {
    index: '02',
    title: 'Corporate Brand Filmmaking',
    category: 'COMMUNICATIONS LEADERSHIP',
    description:
      'Directing and producing annual reports, executive interviews, CSR impact documentaries, and corporate brand films at CreditAccess Grameen Limited.',
    tools: ['Sony Cinema FX Line', 'Premiere Pro', 'Figma'],
    highlight: 'Employee of the Quarter 2025',
  },
  {
    index: '03',
    title: 'Motion Design & Kinetic Systems',
    category: 'AFTER EFFECTS & KINETIC TYPOGRAPHY',
    description:
      'Custom title sequences, animated lower thirds, broadcast graphic packages, and product UI simulations that clarify complex narratives.',
    tools: ['After Effects', 'Photoshop', 'Illustrator', 'MOGRTs'],
    highlight: 'Reusable Motion Frameworks',
  },
  {
    index: '04',
    title: 'Color Grading & Finishing',
    category: 'DAVINCI RESOLVE SUITE',
    description:
      'Precision color science, node-based color grading, skin tone isolation, and LUT development designed to establish distinct atmospheric moods.',
    tools: ['DaVinci Resolve Studio', 'Scopes', 'ACES Color Pipeline'],
    highlight: 'Broadcast Rec.709 & HDR Ready',
  },
  {
    index: '05',
    title: 'Audio Design & Dialogue Restoration',
    category: 'ACOUSTIC ENGINEERING',
    description:
      'Dialogue isolation, multi-track mixing, noise suppression, ambient sound design, and master loudness compliance (-14 to -23 LUFS).',
    tools: ['Adobe Audition', 'iZotope RX', 'Premiere Pro'],
    highlight: 'EBU R128 Loudness Compliance',
  },
  {
    index: '06',
    title: 'Technical Video & Explainer Media',
    category: 'CREATIVE TECHNOLOGY',
    description:
      'High-impact architectural walkthroughs, cybersecurity product explainers, and live lab demonstration videos bridging technical accuracy with watchability.',
    tools: ['OBS Studio', 'After Effects', 'Premiere Pro'],
    highlight: 'Bridging Tech & Storytelling',
  },
];

const CLIENT_EXPERIENCE = [
  {
    client: 'CreditAccess Grameen Limited',
    period: '2024 – Present',
    role: 'Assistant Manager, Branding & Communications',
    impact:
      'Sole video lead directing corporate brand documentaries, digital marketing campaigns, and annual reports. Recognized as Employee of the Quarter (Apr–Jun 2025).',
  },
  {
    client: 'BrandStory Digital',
    period: '2023 – 2024',
    role: 'Video Editor & Motion Designer',
    impact:
      'Delivered 200+ videos across 15+ major corporate clients spanning tech, fintech, real estate, and healthcare with zero missed deadlines.',
  },
  {
    client: '404 DM & upGrad Campus',
    period: '2022 – 2023',
    role: 'Video Editor',
    impact:
      'Produced digital marketing ad campaigns, technical course lectures, and educational motion asset templates at scale.',
  },
];

export default function CreativePage() {
  useSEO({
    title: 'Filmmaking & Creative Direction',
    description:
      'Four years of professional video editing, corporate brand filmmaking, motion graphics, and narrative media direction by Gururaj Seethuru.',
  });

  const [isPlayingShowreel, setIsPlayingShowreel] = useState(false);

  return (
    <div className="relative min-h-screen px-6 py-16 md:px-12">
      <div className="max-w-content mx-auto">
        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 font-mono text-xs text-amber">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            <span>CREATIVE DISCIPLINE // NARRATIVE & FILMMAKING</span>
          </div>
          <h1 className="mt-3 font-display text-hero-heading font-bold text-text-primary">
            Filmmaking & Motion<span className="text-amber">.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-base md:text-lg text-text-secondary leading-relaxed">
            Translating complex ideas into cinematic, high-retention visual narratives.
            Four years of commercial editing, corporate communications leadership, and precision motion design.
          </p>
        </div>

        {/* ── EMBEDDED SHOWREEL SCREEN ───────────────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl border border-amber/30 bg-void/90 shadow-2xl mb-16">
          <div className="flex items-center justify-between border-b border-border-subtle px-6 py-3.5 bg-surface/80">
            <div className="flex items-center gap-2.5 font-mono text-xs text-text-muted">
              <span className="h-2.5 w-2.5 rounded-full bg-amber" />
              <span>SHOWREEL DISPLAY // 4K BROADCAST REEL</span>
            </div>
            <a
              href="https://www.youtube.com/@gururaj-seethur"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-amber hover:underline"
            >
              YouTube Channel ↗
            </a>
          </div>

          <div className="relative aspect-video w-full bg-void flex items-center justify-center">
            {isPlayingShowreel ? (
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed?listType=user_uploads&list=gururaj-seethur&autoplay=1"
                title="Gururaj Seethuru Creative Video Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative flex flex-col items-center justify-center text-center p-8 z-10 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-surface/40 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,182,92,0.15)_0%,transparent_70%)] pointer-events-none" />

                <div className="relative z-10 max-w-lg">
                  <div className="font-mono text-xs uppercase tracking-widest text-amber mb-3">
                    SELECTED COMMERCIAL & EDITORIAL WORKS
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                    Cinematic Filmmaker & Motion Designer Reel
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-text-secondary leading-relaxed mb-6">
                    Watch the collection of commercial cuts, stakeholder documentaries, motion graphics sequences, and technical explainers.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={() => setIsPlayingShowreel(true)}
                      className="inline-flex items-center gap-3 rounded-full bg-amber px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-void shadow-amber-glow hover:brightness-110 transition-all"
                    >
                      <span className="text-sm">▶</span>
                      <span>Play Embed Reel</span>
                    </button>
                    <Link
                      to="/videos"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 font-mono text-xs text-text-primary hover:border-amber hover:text-amber transition-all"
                    >
                      <span>Explore Video Vault</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── 6 CREATIVE CRAFT PILLARS ─────────────────────────────────── */}
        <div className="mb-16">
          <div className="font-mono text-xs uppercase tracking-wider text-amber mb-2">
            SPECIALIZED CRAFT SUITES
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-8">
            Post-Production & Narrative Disciplines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CREATIVE_PILLARS.map((p) => (
              <div
                key={p.index}
                className="glass-panel p-6 border-border hover:border-amber/40 hover:bg-surface-elevated/70 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-micro text-amber">
                    <span>SUITE // {p.index}</span>
                    <span className="text-text-muted">{p.category}</span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-bold text-text-primary">
                    {p.title}
                  </h3>

                  <p className="mt-3 font-sans text-xs md:text-sm text-text-secondary leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle">
                  <div className="font-mono text-[11px] font-semibold text-amber">
                    {p.highlight}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-void/80 px-2 py-0.5 font-mono text-[10px] text-text-secondary border border-border-subtle"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CLIENT EXPERIENCE & IMPACT ─────────────────────────────── */}
        <div className="glass-panel p-8 md:p-10 border-border">
          <div className="font-mono text-micro uppercase tracking-wider text-amber mb-2">
            COMMERCIAL TRACK RECORD
          </div>
          <h3 className="font-display text-2xl font-bold text-text-primary mb-8">
            Agency & Corporate Production History
          </h3>

          <div className="space-y-6 divide-y divide-border-subtle">
            {CLIENT_EXPERIENCE.map((c, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-6' : ''}>
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <span className="font-display font-bold text-lg text-text-primary">
                    {c.client}
                  </span>
                  <span className="text-amber">{c.period}</span>
                </div>
                <div className="font-mono text-xs text-text-muted mt-0.5">
                  {c.role}
                </div>
                <p className="mt-2.5 font-sans text-xs md:text-sm text-text-secondary leading-relaxed">
                  {c.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
