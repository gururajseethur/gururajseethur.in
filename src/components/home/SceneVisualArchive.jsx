import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CREATIVE_DISCIPLINES = [
  {
    id: 'editorial',
    title: 'Precision Video Editing',
    badge: 'PRIMARY CRAFT',
    description:
      'High-velocity client editing across commercial, documentary, and brand formats. 200+ delivered videos for 15+ agency clients with a zero-missed-deadline track record.',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    metric: '200+ Delivered Cuts',
  },
  {
    id: 'corporate',
    title: 'Brand Films & Annual Media',
    badge: 'LEADERSHIP CRAFT',
    description:
      'Serving as sole video lead at CreditAccess Grameen Limited. End-to-end production of corporate brand films, stakeholder interviews, and annual report campaigns.',
    tools: ['Sony Cinema FX', 'Premiere Pro', 'After Effects'],
    metric: 'EOTQ Award (2025)',
  },
  {
    id: 'motion',
    title: 'Motion Design & Kinetic Systems',
    badge: 'MOTION CRAFT',
    description:
      'Title sequences, lower thirds, animated data graphics, and kinetic typography. Motion that clarifies complex narratives without decorative bloat.',
    tools: ['After Effects', 'Photoshop', 'Illustrator', 'Figma'],
    metric: 'Reusable MOGRT Kits',
  },
  {
    id: 'sound-color',
    title: 'Color Grading & Audio Finishing',
    badge: 'FINISHING SUITE',
    description:
      'Dual-node DaVinci Resolve color grading, dialogue cleanup, loudness compliance, and dynamic range mastering across multi-track audio recordings.',
    tools: ['DaVinci Resolve', 'Adobe Audition', 'iZotope RX'],
    metric: 'Broadcast Mastered',
  },
];

export default function SceneVisualArchive() {
  const [isPlayingShowreel, setIsPlayingShowreel] = useState(false);

  return (
    <section id="visual-archive" className="relative px-6 py-24 md:px-12 bg-navy/40 border-t border-border-subtle">
      <div className="max-w-content mx-auto">
        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-amber">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              <span>SCENE D // VISUAL ARCHIVE & SHOWREEL</span>
            </div>
            <h2 className="mt-3 font-display text-section-heading font-bold text-text-primary">
              Cinematic & Visual Storytelling<span className="text-amber">.</span>
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-text-secondary leading-relaxed">
              Crafted visuals and compelling narrative pacing. How four years in commercial post-production,
              agency video leadership, and brand storytelling shape technical clarity.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start">
            <a
              href="https://www.youtube.com/@gururaj-seethur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-amber/40 bg-amber/10 px-5 py-3 font-mono text-xs font-semibold text-amber hover:bg-amber/20 hover:border-amber transition-all"
            >
              <span>YouTube Channel</span>
              <span>↗</span>
            </a>
            <Link
              to="/creative"
              className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-white transition-colors"
            >
              <span>Full Creative Suite</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* ── EMBEDDED SHOWREEL SCREEN ───────────────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl border border-amber/30 bg-void/90 shadow-2xl mb-14">
          <div className="flex items-center justify-between border-b border-border-subtle px-6 py-3.5 bg-surface/80">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28CA41]" />
              <span className="ml-3 font-mono text-xs text-text-muted">
                SHOWREEL_PLAYHEAD // MASTER_4K_PRORES
              </span>
            </div>
            <span className="font-mono text-xs text-amber font-medium">
              4:3 & 16:9 EDITORIAL ARCHIVE
            </span>
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
                {/* Background Poster Visual */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-surface/40 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,182,92,0.12)_0%,transparent_70%)] pointer-events-none" />

                <div className="relative z-10 max-w-lg">
                  <div className="font-mono text-xs uppercase tracking-widest text-amber mb-3">
                    SELECTED COMMERCIAL CUTS & NARRATIVE WORKS
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                    Director & Lead Video Editor Showreel
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-text-secondary leading-relaxed mb-6">
                    Commercial campaign cuts, corporate brand documentaries, technical walkthroughs, and dynamic motion graphics.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={() => setIsPlayingShowreel(true)}
                      className="group inline-flex items-center gap-3 rounded-full bg-amber px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-void shadow-amber-glow hover:brightness-110 transition-all"
                    >
                      <span className="text-sm">▶</span>
                      <span>Play Embed Showreel</span>
                    </button>
                    <a
                      href="https://www.youtube.com/@gururaj-seethur"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 font-mono text-xs text-text-primary hover:border-amber hover:text-amber transition-all"
                    >
                      <span>Open on YouTube</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── 4 CRAFT DISCIPLINE CARDS ─────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CREATIVE_DISCIPLINES.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-6 border-border/60 hover:border-amber/40 hover:bg-surface-elevated/70 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-micro text-amber">
                  <span>{item.badge}</span>
                  <span className="text-text-muted">✓ VERIFIED</span>
                </div>
                <h4 className="mt-3 font-display text-lg font-bold text-text-primary">
                  {item.title}
                </h4>
                <p className="mt-2.5 font-sans text-xs text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 border-t border-border-subtle pt-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-text-faint">RECORD</span>
                  <span className="font-semibold text-text-primary">{item.metric}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {item.tools.map((t) => (
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
    </section>
  );
}
