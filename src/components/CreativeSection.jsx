import React from 'react';

/**
 * CREATIVE WORK — Professional video/branding work.
 * Structured panel style. No flashy effects. No heavy animation.
 */

const creativeWork = [
  {
    id: '0xC01',
    title: 'Brand Identity Systems',
    description:
      'End-to-end visual identity design including logo systems, typography standards, and color architecture. Delivered as structured design tokens for developer handoff.',
    type: 'BRANDING',
    tools: ['Figma', 'Illustrator', 'Design Tokens'],
  },
  {
    id: '0xC02',
    title: 'Motion Design & Video Production',
    description:
      'Cinematic video content for product launches and technical demonstrations. Focus on clean transitions, data-driven visuals, and narrative structure.',
    type: 'VIDEO',
    tools: ['After Effects', 'Premiere Pro', 'DaVinci Resolve'],
  },
  {
    id: '0xC03',
    title: 'Technical Documentation Design',
    description:
      'Structured documentation systems with clear information hierarchy, code examples, and visual diagrams. Built for developer consumption.',
    type: 'DOCUMENTATION',
    tools: ['Markdown', 'Docusaurus', 'Mermaid.js'],
  },
  {
    id: '0xC04',
    title: '3D & Interactive Experiences',
    description:
      'WebGL-based interactive interfaces and data visualizations. Command Core itself is an example — particle systems, governed camera paths, deterministic rendering.',
    type: 'INTERACTIVE',
    tools: ['Three.js', 'React Three Fiber', 'GLSL', 'GSAP'],
  },
];

export default function CreativeSection() {
  return (
    <section className="section-block" id="section-creative">
      <div className="section-panel max-w-3xl mx-auto w-full px-4">
        <div className="hud-text text-core-cyan mb-2 tracking-[0.15em]">
          // CREATIVE_WORK
        </div>
        <h2 className="font-mono text-2xl md:text-[1.75rem] font-semibold text-core-bright mb-2 tracking-tight">
          Creative Output
        </h2>
        <div className="hud-text text-core-muted mb-10 text-[0.55rem]">
          PROFESSIONAL VIDEO, BRANDING, AND INTERACTIVE WORK
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creativeWork.map((work) => (
            <div
              key={work.id}
              className="border border-core-border p-5 hover:border-core-muted transition-colors duration-150"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[0.6rem] text-core-muted">
                  [{work.id}]
                </span>
                <span className="font-mono text-[0.55rem] text-core-cyan tracking-wider">
                  {work.type}
                </span>
              </div>

              <h3 className="font-mono text-sm text-core-bright font-medium mb-2">
                {work.title}
              </h3>

              <p className="font-sans text-xs text-core-text leading-relaxed mb-4">
                {work.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {work.tools.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.55rem] px-1.5 py-0.5 border border-core-border text-core-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
