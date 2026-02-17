import React from 'react';

/**
 * Projects Section — Featured systems.
 * Clean grid. Data-oriented. No hover animations.
 */

const projects = [
  {
    id: '0xP01',
    name: 'MONITORING_STACK',
    description: 'Prometheus + Grafana + Promtail observability pipeline. Full metrics, logs, and alerting infrastructure.',
    tech: ['Prometheus', 'Grafana', 'Docker', 'Promtail'],
    status: 'DEPLOYED',
    link: '#',
  },
  {
    id: '0xP02',
    name: 'AI_WORKFLOW_ENGINE',
    description: 'N8N automation workflows integrated with Ollama LLM inference. Agent-based task orchestration.',
    tech: ['N8N', 'Ollama', 'Python', 'Docker'],
    status: 'ACTIVE',
    link: '#',
  },
  {
    id: '0xP03',
    name: 'COMMAND_CORE',
    description: 'This interface. 3D particle morphing engine, governed camera path, deterministic clock system.',
    tech: ['React', 'Three.js', 'GSAP', 'GLSL'],
    status: 'LIVE',
    link: '#',
  },
  {
    id: '0xP04',
    name: 'SECURITY_LAB',
    description: 'Isolated penetration testing environment. Vulnerable VMs, network enumeration tools, privilege escalation chains.',
    tech: ['Kali Linux', 'Metasploit', 'Nmap', 'Burp Suite'],
    status: 'TRAINING',
    link: '#',
  },
];

export default function ProjectsSection() {
  return (
    <section className="section-block" id="section-projects">
      <div className="max-w-3xl mx-auto w-full">
        <div className="hud-text text-core-cyan mb-2 tracking-[0.15em]">
          // DEPLOYED_SYSTEMS
        </div>
        <div className="hud-text text-core-muted mb-8 text-[0.55rem]">
          ACTIVE DEPLOYMENTS AND RESEARCH PROJECTS
        </div>

        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-core-border p-6 hover:border-core-muted transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="font-mono text-[0.65rem] text-core-muted mr-3">
                    [{project.id}]
                  </span>
                  <span className="font-mono text-sm text-core-bright font-medium">
                    {project.name}
                  </span>
                </div>
                <span className={`font-mono text-[0.65rem] ${
                  project.status === 'DEPLOYED' || project.status === 'LIVE'
                    ? 'text-core-green'
                    : project.status === 'ACTIVE'
                    ? 'text-core-cyan'
                    : 'text-core-muted'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="font-mono text-xs text-core-text leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.6rem] px-2 py-0.5 border border-core-border text-core-muted"
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
