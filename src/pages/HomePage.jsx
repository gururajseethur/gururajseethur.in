import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

const skills = [
  { label: 'Offensive Security', desc: 'Pentesting foundations, CTF labs, network attacks, privilege escalation — 54+ TryHackMe rooms and counting', color: 'from-red-500/20 to-orange-500/20', icon: '🔓' },
  { label: 'Linux & Server Infrastructure', desc: 'Ubuntu Server administration, networking, DNS, bare-metal deployments', color: 'from-blue-500/20 to-cyan-500/20', icon: '🖥️' },
  { label: 'Docker & Containerization', desc: 'Container orchestration, service isolation, Docker-safe control planes with whitelist enforcement', color: 'from-green-500/20 to-emerald-500/20', icon: '📦' },
  { label: 'Security Automation', desc: 'Python recon tools, Nmap automation, structured output parsing, scripted attack workflows', color: 'from-cyan-500/20 to-teal-500/20', icon: '🐍' },
  { label: 'AI Deployment', desc: 'Ollama local inference, N8N workflow automation, model orchestration — fully self-hosted', color: 'from-purple-500/20 to-pink-500/20', icon: '🤖' },
  { label: 'Video & Visual Communication', desc: 'Professional video production, motion design, branding systems — the creative edge', color: 'from-pink-500/20 to-rose-500/20', icon: '🎬' },
];

const stats = [
  { value: '54+', label: 'TryHackMe Rooms' },
  { value: '5+', label: 'Systems Deployed' },
  { value: 'OSCP', label: 'Trajectory' },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* ─── Hero ─── */}
      <section className="min-h-[calc(100vh-5rem)] flex flex-col justify-center px-5 md:px-8 relative">
        <div className="max-w-5xl mx-auto w-full">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="status-dot bg-emerald-400" style={{ color: 'rgb(52, 211, 153)' }} />
              <span className="font-sans text-sm text-white/60">Available for opportunities</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 tracking-tight">
              <span className="text-white">Hi, I'm </span>
              <br />
              <span className="gradient-text">Gururaj Seethur</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="font-sans text-xl md:text-2xl text-white/50 font-light max-w-2xl mb-4 leading-relaxed">
              Security-Focused Systems Builder & Creative Technologist
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="font-sans text-base md:text-lg text-white/30 max-w-xl leading-relaxed mb-12">
              I deploy servers, architect private AI stacks, build home pentesting labs,
              and automate security workflows. 54+ TryHackMe rooms deep, OSCP trajectory,
              with a creative production background that makes everything I ship look intentional.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex gap-4 flex-wrap">
              <Link to="/projects" data-interactive className="btn-gradient">
                <span>View My Work</span>
              </Link>
              <Link to="/contact" data-interactive className="btn-outline">
                Let's Connect
              </Link>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={500}>
            <div className="flex gap-12 mt-20 flex-wrap">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-sans text-3xl md:text-4xl font-bold gradient-text">{s.value}</div>
                  <div className="font-sans text-sm text-white/30 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/20 text-xs font-sans tracking-widest">SCROLL</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ─── Skills ─── */}
      <section className="px-5 md:px-8 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="accent-line mb-6" />
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-white mb-3">
              What I Do
            </h2>
            <p className="font-sans text-base text-white/30 mb-14 max-w-lg">
              Security first. Infrastructure second. Creative execution always.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 80}>
                <div className={`glass-card p-6 h-full bg-gradient-to-br ${s.color}`}>
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <h3 className="font-sans text-lg font-semibold text-white mb-2">{s.label}</h3>
                  <p className="font-sans text-sm text-white/40 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick Links ─── */}
      <section className="px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { to: '/projects', title: 'Projects', desc: 'Real deployments. Real labs. Real tools. Nothing vague.', emoji: '🚀' },
              { to: '/security', title: 'Security', desc: '54+ CTF rooms, tracked progression, tool proficiency.', emoji: '🔐' },
              { to: '/creative', title: 'Creative', desc: 'Professional video production, motion design, branding.', emoji: '🎬' },
            ].map((item, i) => (
              <ScrollReveal key={item.to} delay={i * 100}>
                <Link
                  to={item.to}
                  data-interactive
                  className="glass-card p-8 block group"
                >
                  <span className="text-3xl mb-4 block">{item.emoji}</span>
                  <h3 className="font-sans text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-white/35 leading-relaxed">{item.desc}</p>
                  <div className="mt-5 font-sans text-sm text-white/20 group-hover:text-white/50 transition-colors flex items-center gap-2">
                    Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
