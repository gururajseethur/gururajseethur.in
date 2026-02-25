import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const creativeWork = [
  {
    title: 'Professional Video Editing',
    description:
      'Years of client-facing video production — storytelling through cuts, pacing, color grading, and sound design. Corporate, creative, and technical content across multiple industries.',
    type: 'Primary Craft',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    icon: '🎬',
  },
  {
    title: 'Motion Design',
    description:
      'Title sequences, lower thirds, animated graphics, and transitions. Clean motion design that serves the narrative — functional, not decorative.',
    type: 'Motion',
    tools: ['After Effects', 'Premiere Pro', 'Photoshop'],
    icon: '✨',
  },
  {
    title: 'Branding & Communication Systems',
    description:
      'Visual identity development, typography standards, and structured communication design. The same systematic thinking that applies to infrastructure — applied to brand.',
    type: 'Branding',
    tools: ['Figma', 'Illustrator', 'Design Tokens'],
    icon: '🎯',
  },
  {
    title: 'Audio Engineering & Sound Design',
    description:
      'Dialogue cleanup, mixing, foley integration, and soundtrack selection. Every project gets a proper audio pass — because great visuals with bad audio still feels broken.',
    type: 'Audio',
    tools: ['Audition', 'Premiere Pro', 'DaVinci Resolve'],
    icon: '🎧',
  },
];

export default function CreativePage() {
  return (
    <div className="page-panel px-5 md:px-8 pt-24 md:pt-28 py-16 md:py-24">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <div className="section-label">Creative</div>
          <div className="accent-line mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-fg mb-3 tracking-tight">
            Creative Work
          </h1>
          <p className="text-sm text-fg-secondary mb-16 max-w-lg leading-relaxed">
            Video production is where I started. The creative discipline carries over into everything I architect.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {creativeWork.map((work, i) => (
            <ScrollReveal key={work.title} delay={i * 100}>
              <div className="solid-card p-7 h-full group">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl">{work.icon}</span>
                  <span className="font-mono text-xs text-fg-muted uppercase tracking-widest font-medium px-3 py-1 rounded-full bg-surface border border-edge">
                    {work.type}
                  </span>
                </div>

                <h2 className="text-lg md:text-xl font-semibold text-fg mb-3 group-hover:text-danger transition-colors duration-300">
                  {work.title}
                </h2>

                <p className="text-sm text-fg-secondary leading-relaxed mb-6">
                  {work.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {work.tools.map((t) => (
                    <span key={t} className="skill-tag-creative">{t}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
