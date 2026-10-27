import React, { useState } from 'react';
import { useContent } from '../hooks/useContent';
import useSEO from '../hooks/useSEO';

export default function VideosPage() {
  useSEO({
    title: 'Video Archive & Walkthroughs',
    description:
      'Curated video portfolio: technical walkthroughs, commercial client edits, brand films, and motion graphics by Gururaj Seethuru.',
  });

  const videos = useContent('videos');
  const [activeEmbed, setActiveEmbed] = useState(null);

  return (
    <div className="relative min-h-screen px-6 py-16 md:px-12">
      <div className="max-w-content mx-auto">
        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 font-mono text-xs text-amber">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            <span>ARCHIVE // MOTION & TECHNICAL VIDEO VAULT</span>
          </div>
          <h1 className="mt-3 font-display text-hero-heading font-bold text-text-primary">
            Video Archive<span className="text-amber">.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-base md:text-lg text-text-secondary leading-relaxed">
            Technical walkthroughs, commercial agency cuts, stakeholder brand films, and security explainers.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://www.youtube.com/@gururaj-seethur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-amber px-5 py-2.5 font-mono text-xs font-semibold uppercase text-void shadow-amber-glow hover:brightness-110 transition-all"
            >
              <span>Visit YouTube Channel</span>
              <span>↗</span>
            </a>
            <a
              href="mailto:gururajseethur@gmail.com?subject=Private%20Video%20Portfolio%20Access%20Request"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 font-mono text-xs text-text-primary hover:border-cyan hover:text-cyan transition-colors"
            >
              <span>Request Private Client Reels</span>
              <span>✉</span>
            </a>
          </div>
        </div>

        {/* ── VIDEO ITEMS LIST ────────────────────────────────────────── */}
        <div className="space-y-8">
          {(videos || []).map((video, idx) => {
            const { attributes } = video;
            const isEmbedOpen = activeEmbed === video.slug;
            const hasEmbed = !!attributes.youtube_embed_link;
            const isPrivate = attributes.access_type === 'private';

            return (
              <div
                key={video.slug || idx}
                className="glass-panel p-6 md:p-8 border-border hover:border-amber/40 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left Metadata (7 cols) */}
                  <div className="space-y-4 lg:max-w-2xl">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                      <span className="text-amber font-semibold">
                        VID // 0{idx + 1}
                      </span>
                      <span className="text-border">·</span>
                      <span className="text-text-muted uppercase">
                        {attributes.client_or_project || 'Commercial Work'}
                      </span>
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] uppercase font-semibold ${
                          isPrivate
                            ? 'bg-amber/15 text-amber border border-amber/30'
                            : 'bg-success/15 text-success border border-success/30'
                        }`}
                      >
                        {attributes.access_type || 'public'}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                      {attributes.title}
                    </h2>

                    <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">
                      {attributes.description}
                    </p>

                    {attributes.role && (
                      <div className="font-mono text-xs text-text-muted">
                        <span className="text-amber">ROLE:</span> {attributes.role}
                      </div>
                    )}

                    {attributes.outcome && (
                      <div className="rounded-lg border border-border-subtle bg-void/60 p-3.5 font-sans text-xs text-text-muted">
                        <span className="text-text-primary font-semibold">Outcome: </span>
                        {attributes.outcome}
                      </div>
                    )}

                    {attributes.private_preview_note && (
                      <div className="font-mono text-xs text-amber/90 italic">
                        Notice: {attributes.private_preview_note}
                      </div>
                    )}

                    {/* Tools */}
                    {attributes.tools_used && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {attributes.tools_used.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-surface-elevated px-2 py-0.5 font-mono text-micro text-text-secondary border border-border-subtle"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Action / Player Toggle (5 cols) */}
                  <div className="lg:w-80 shrink-0 flex flex-col gap-3">
                    {hasEmbed ? (
                      <button
                        onClick={() => setActiveEmbed(isEmbedOpen ? null : video.slug)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-void shadow-amber-glow hover:brightness-110 transition-all"
                      >
                        <span>{isEmbedOpen ? 'Close Player' : 'Play Video Reel'}</span>
                        <span>{isEmbedOpen ? '▲' : '▶'}</span>
                      </button>
                    ) : (
                      <a
                        href={attributes.proof_link || 'https://www.linkedin.com/in/gururaj-seethur'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-amber/40 bg-amber/10 px-5 py-3 font-mono text-xs font-semibold uppercase text-amber hover:bg-amber/20 transition-all"
                      >
                        <span>Verify Credentials</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Optional Expandable Embed Player */}
                {isEmbedOpen && hasEmbed && (
                  <div className="mt-6 pt-6 border-t border-border-subtle">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-amber/30 bg-void">
                      <iframe
                        className="h-full w-full"
                        src={attributes.youtube_embed_link}
                        title={attributes.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
