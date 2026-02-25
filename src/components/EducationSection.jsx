import React from 'react';
import ScrollReveal from './ScrollReveal';

const education = [
  {
    institution: 'Boston Institute of Analytics',
    degree: 'Master-Diploma, Cyber Security & Ethical Hacking',
    period: 'Oct 2025 – Mar 2026',
    inProgress: true,
    icon: '🎓',
    description: 'Advanced training in penetration testing, network security, threat analysis, and ethical hacking methodologies.',
  },
  {
    institution: 'Jetking Noida Learning Center',
    degree: 'BCA, Computer Applications',
    period: 'Jun 2021 – Aug 2024',
    inProgress: false,
    icon: '💻',
    description: 'Foundation in computer science, programming, database management, and networking fundamentals.',
  },
  {
    institution: 'YHills eLearning',
    degree: 'Cyber Security & Computer Forensics',
    period: 'Jan 2023 – Feb 2023',
    inProgress: false,
    icon: '🔍',
    description: 'Intensive program covering digital forensics, incident response, and cybersecurity fundamentals.',
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="px-5 md:px-8 py-20">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <div className="section-label">Education</div>
          <div className="accent-line mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-3 tracking-tight">
            Education
          </h2>
          <p className="text-sm text-fg-secondary mb-12 max-w-lg">
            Formal learning meets hands-on practice — always building, always breaking, always learning.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <ScrollReveal key={edu.institution} delay={i * 80}>
              <div className={`solid-card p-7 h-full ${
                edu.inProgress ? 'border-accent/20' : ''
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{edu.icon}</span>
                  {edu.inProgress && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="font-mono text-[0.6rem] text-accent font-medium">IN PROGRESS</span>
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-fg mb-1">
                  {edu.institution}
                </h3>
                <p className="font-mono text-sm text-accent mb-1">{edu.degree}</p>
                <p className="font-mono text-xs text-fg-muted mb-4">{edu.period}</p>
                <p className="text-xs text-fg-secondary leading-relaxed">
                  {edu.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
