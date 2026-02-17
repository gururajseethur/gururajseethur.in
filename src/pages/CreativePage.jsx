import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const creativeWork = [
  {
    title: 'Professional Video Editing',
    description:
      'Years of client-facing video production — storytelling through cuts, pacing, color grading, and sound design. Corporate, creative, and technical content across multiple industries.',
    type: 'Primary Craft',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    gradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
    icon: '🎬',
  },
  {
    title: 'Motion Design',
    description:
      'Title sequences, lower thirds, animated graphics, and transitions. Clean motion design that serves the narrative — functional, not decorative.',
    type: 'Motion',
    tools: ['After Effects', 'Premiere Pro', 'Photoshop'],
    gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    icon: '✨',
  },
  {
    title: 'Branding & Communication Systems',
    description:
      'Visual identity development, typography standards, and structured communication design. The same systematic thinking that applies to infrastructure — applied to brand.',
    type: 'Branding',
    tools: ['Figma', 'Illustrator', 'Design Tokens'],
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    icon: '🎯',
  },
];

export default function CreativePage() {
  return (
    <div className="px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="accent-line mb-6" />
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Creative Work
          </h1>
          <p className="font-sans text-lg text-white/35 mb-16 max-w-lg leading-relaxed">
            Video production is where I started. The creative discipline carries over into everything I architect.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {creativeWork.map((work, i) => (
            <ScrollReveal key={work.title} delay={i * 100}>
              <div className={`glass-card p-7 h-full bg-gradient-to-br ${work.gradient} group`}>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl">{work.icon}</span>
                  <span className="font-sans text-xs text-white/30 uppercase tracking-widest font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    {work.type}
                  </span>
                </div>

                <h2 className="font-sans text-lg md:text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                  {work.title}
                </h2>

                <p className="font-sans text-sm text-white/35 leading-relaxed mb-6">
                  {work.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {work.tools.map((t) => (
                    <span key={t} className="skill-tag">{t}</span>
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
