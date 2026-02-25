import React from 'react';
import ScrollReveal from './ScrollReveal';

const experiences = [
  {
    company: 'CreditAccess Grameen Limited',
    domain: 'Microfinance · NBFC-MFI',
    role: 'Assistant Manager, Branding & Communications',
    start: '2024-09',
    end: null,
    location: 'Bengaluru',
    current: true,
    bullets: [
      'Sole video lead — scripting, shooting, editing, and delivery for all corporate and campaign content',
      'Built and run the internal + external comms pipeline: social, digital, corporate events, annual report videos',
      'Manage vendor relationships and cross-functional briefs across marketing, HR, and CSR teams',
    ],
    highlight: { label: 'Employee of the Quarter', detail: 'Apr–Jun 2025' },
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
  },
  {
    company: 'BrandStory Digital',
    domain: 'Digital Marketing Agency',
    role: 'Video Editor',
    start: '2023-05',
    end: '2024-09',
    location: 'Bengaluru',
    current: false,
    bullets: [
      '200+ videos delivered across corporate, product, and social campaigns for 15+ clients',
      'Full post-production ownership: assembly, colour grading, audio mix, and motion graphics',
      'Ran concurrent briefs with avg. 48-hour turnaround — zero missed deadlines',
    ],
    tools: ['Premiere Pro', 'After Effects', 'Photoshop'],
  },
  {
    company: '404 DM',
    domain: 'Digital Marketing Agency',
    role: 'Video Editor',
    start: '2023-02',
    end: '2023-05',
    location: 'Bengaluru',
    current: false,
    bullets: [
      'Brand and services marketing videos — brief to final cut',
      'Worked directly with creative directors on campaign concepts',
    ],
  },
  {
    company: 'upGrad Campus',
    domain: 'EdTech',
    role: 'Video Editor',
    start: '2022-08',
    end: '2022-12',
    location: 'Bengaluru',
    current: false,
    bullets: [
      'Edited course content and marketing videos at scale',
      'Created repeatable templates that standardised video output across the brand',
    ],
  },
  {
    company: 'Dhiyo.ai',
    domain: 'AI · HR Tech',
    role: 'Intern',
    start: '2021-03',
    end: '2022-05',
    location: 'Bengaluru',
    current: false,
    bullets: [
      'First professional role — content production, social assets, product marketing support',
    ],
  },
];

/* ── Date utilities ── */
function formatTenure(start, end) {
  const s = new Date(start + '-01');
  const e = end ? new Date(end + '-01') : new Date();
  let months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (months < 1) months = 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y > 0 && m > 0) return `${y} yr ${m} mo`;
  if (y > 0) return `${y} yr${y > 1 ? 's' : ''}`;
  return `${m} mo`;
}

function formatPeriod(start, end) {
  const fmt = (d) => {
    const [y, mo] = d.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(mo, 10) - 1]} ${y}`;
  };
  return `${fmt(start)} – ${end ? fmt(end) : 'Present'}`;
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="px-5 md:px-8 py-20">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <div className="section-label">Experience</div>
          <div className="accent-line mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-4 tracking-tight">
            Work History
          </h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-12">
            {[
              { value: '5', label: 'companies' },
              { value: '5', label: 'years' },
              { value: '3', label: 'domains' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-accent">{stat.value}</span>
                <span className="font-mono text-xs text-fg-muted">{stat.label}</span>
              </div>
            ))}
            <span className="font-mono text-xs text-fg-muted hidden sm:inline">·</span>
            <span className="font-mono text-xs text-fg-muted hidden sm:inline">Intern → Asst. Manager</span>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — left on mobile, center on desktop */}
          <div className="timeline-line" />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.company + exp.start} delay={i * 80}>
                <div className={`relative pl-12 md:pl-0 ${
                  i % 2 === 0 ? 'md:pr-[calc(50%+40px)]' : 'md:pl-[calc(50%+40px)]'
                }`}>
                  {/* Timeline dot */}
                  <div className={`absolute left-[16px] top-7 w-2.5 h-2.5 rounded-full border-2 border-base md:left-1/2 md:-translate-x-1/2 z-10 transition-colors ${
                    exp.current
                      ? 'bg-accent shadow-[0_0_8px_rgba(0,217,255,0.5)]'
                      : 'bg-fg-muted'
                  }`} />

                  {/* Card */}
                  <div className={`solid-card p-6 md:p-7 max-w-[520px] ${
                    i % 2 === 0 ? 'md:ml-auto' : ''
                  } ${
                    exp.current ? 'border-accent/20' : ''
                  }`}>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-fg leading-snug">
                          {exp.company}
                        </h3>
                        <p className="font-mono text-[11px] text-fg-muted mt-0.5">{exp.domain}</p>
                      </div>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-accent/30 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          <span className="font-mono text-[0.6rem] text-accent leading-none">CURRENT</span>
                        </span>
                      )}
                    </div>

                    {/* Role */}
                    <p className="text-sm text-accent font-medium mb-3">{exp.role}</p>

                    {/* Period · Tenure · Location */}
                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-mono text-xs text-fg-muted mb-4">
                      <span>{formatPeriod(exp.start, exp.end)}</span>
                      <span className="text-edge">·</span>
                      <span>{formatTenure(exp.start, exp.end)}</span>
                      <span className="text-edge">·</span>
                      <span>{exp.location}</span>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex items-start gap-2.5">
                          <span className="text-accent/40 mt-[3px] text-xs shrink-0 select-none">▹</span>
                          <span className="text-sm text-fg-secondary leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Award callout */}
                    {exp.highlight && (
                      <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-base border border-accent/15 mt-4">
                        <span className="text-sm select-none">🏆</span>
                        <div>
                          <span className="text-sm text-fg font-medium">{exp.highlight.label}</span>
                          <span className="text-fg-muted text-xs ml-2">{exp.highlight.detail}</span>
                        </div>
                      </div>
                    )}

                    {/* Tools */}
                    {exp.tools && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {exp.tools.map(t => (
                          <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded border border-edge text-fg-muted">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
