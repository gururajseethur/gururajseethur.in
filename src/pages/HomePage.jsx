import React, { useEffect, useCallback } from 'react';
import SceneIgnition from '../components/home/SceneIgnition';
import SceneSignalMap from '../components/home/SceneSignalMap';
import SceneFeaturedProjects from '../components/home/SceneFeaturedProjects';
import SceneVisualArchive from '../components/home/SceneVisualArchive';
import SceneTelemetryJourney from '../components/home/SceneTelemetryJourney';
import SceneContactCTA from '../components/home/SceneContactCTA';
import useSEO from '../hooks/useSEO';
import { useSignalEngine } from '../context/SignalEngineContext';

export default function HomePage() {
  useSEO({
    title: 'Home',
    description:
      'Gururaj Seethuru — Cybersecurity engineer, local-first AI systems architect, and commercial filmmaker based in Bengaluru.',
  });

  const { setSceneState } = useSignalEngine();

  // Scroll spy to synchronize 3D camera state with active section
  useEffect(() => {
    const sectionIds = [
      { id: 'ignition', state: 'arrival' },
      { id: 'signal-map', state: 'ai-lab' },
      { id: 'projects', state: 'security' },
      { id: 'visual-archive', state: 'creative' },
      { id: 'telemetry', state: 'journey' },
      { id: 'contact', state: 'contact' },
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45) {
            setSceneState(sectionIds[i].state);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setSceneState]);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative">
      {/* Scene A: Ignition */}
      <SceneIgnition onExplore={scrollToSection} />

      {/* Scene B: The Signal Map */}
      <SceneSignalMap />

      {/* Scene C: Featured Projects Case Studies */}
      <SceneFeaturedProjects />

      {/* Scene D: Visual Archive & Showreel */}
      <SceneVisualArchive />

      {/* Scene E & F: Telemetry, Certifications & Career Journey */}
      <SceneTelemetryJourney />

      {/* Scene G: Transmission & Contact */}
      <SceneContactCTA />
    </div>
  );
}
