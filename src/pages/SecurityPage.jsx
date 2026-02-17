import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const primarySkills = [
  'Linux Systems (Ubuntu Server, Networking, DNS)',
  'Docker & Containerization',
  'Network Fundamentals',
  'Offensive Security Foundations (TryHackMe, CTFs)',
  'AI Deployment (Ollama, Local Inference)',
  'Python Security Scripting',
];

const secondarySkills = [
  'Video Production (Premiere Pro, DaVinci, After Effects)',
  'Branding & Visual Communication',
  'Bash Scripting & Automation',
  'Monitoring (Prometheus, Grafana, Promtail)',
  'Nginx Reverse Proxy & SSL',
  'Technical Writing & Documentation',
];

const tools = [
  { name: 'Nmap', category: 'Recon' },
  { name: 'Metasploit', category: 'Exploitation' },
  { name: 'Gobuster', category: 'Enumeration' },
  { name: 'Burp Suite', category: 'Web App' },
  { name: 'Wireshark', category: 'Analysis' },
  { name: 'Nikto', category: 'Scanning' },
  { name: 'Hydra', category: 'Brute Force' },
  { name: 'John the Ripper', category: 'Cracking' },
  { name: 'Docker', category: 'Infrastructure' },
  { name: 'Python', category: 'Automation' },
  { name: 'Kali Linux', category: 'Platform' },
  { name: 'Ollama', category: 'AI' },
];

const labHighlights = [
  { name: 'Mr Robot', type: 'CTF' },
  { name: 'RootMe', type: 'CTF' },
  { name: 'Boiler CTF', type: 'CTF' },
  { name: 'Vulnversity', type: 'Web' },
  { name: 'Basic Pentesting', type: 'Lab' },
  { name: 'Kenobi', type: 'Lab' },
  { name: 'Blue', type: 'Lab' },
  { name: 'Ice', type: 'Lab' },
];

export default function SecurityPage() {
  return (
    <div className="px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="accent-line mb-6" />
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Security & Skills
          </h1>
          <p className="font-sans text-lg text-white/35 mb-16 max-w-lg leading-relaxed">
            54+ TryHackMe rooms. Real labs. Real tools. Tracked progression — not gamified badges.
          </p>
        </ScrollReveal>

        {/* Primary Skills */}
        <ScrollReveal delay={0}>
          <div className="glass-card p-7 md:p-9 bg-gradient-to-br from-red-500/10 to-orange-500/10 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🔓</span>
              <h2 className="font-sans text-xl md:text-2xl font-semibold text-white">Primary</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {primarySkills.map((skill) => (
                <div key={skill} className="flex items-center gap-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="font-sans text-sm text-white/70">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Secondary Skills */}
        <ScrollReveal delay={120}>
          <div className="glass-card p-7 md:p-9 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🛠️</span>
              <h2 className="font-sans text-xl md:text-2xl font-semibold text-white">Secondary</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {secondarySkills.map((skill) => (
                <div key={skill} className="flex items-center gap-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="font-sans text-sm text-white/70">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Tools */}
        <ScrollReveal delay={240}>
          <div className="glass-card p-7 md:p-9 bg-gradient-to-br from-green-500/10 to-emerald-500/10 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">⚡</span>
              <h2 className="font-sans text-xl md:text-2xl font-semibold text-white">Toolchain</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span key={tool.name} className="skill-tag">
                  {tool.name}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Lab Highlights */}
        <ScrollReveal delay={360}>
          <div className="glass-card p-7 md:p-9 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🏴</span>
              <h2 className="font-sans text-xl md:text-2xl font-semibold text-white">CTF & Lab Highlights</h2>
              <span className="font-sans text-xs text-white/25 ml-auto">54+ rooms total</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {labHighlights.map((lab) => (
                <div key={lab.name} className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-white/5">
                  <span className="font-sans text-sm text-white/70">{lab.name}</span>
                  <span className="font-sans text-[0.65rem] text-white/25 uppercase tracking-wider">{lab.type}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
