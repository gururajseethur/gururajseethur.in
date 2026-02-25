import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import CertificationsSection from '../components/CertificationsSection';
import EducationSection from '../components/EducationSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <div className="relative page-panel">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <CertificationsSection />
      <EducationSection />
      <ContactSection />
    </div>
  );
}
