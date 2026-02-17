import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="hero-greeting">Hi, my name is</p>
        <h1 className="hero-name">Gururaj Seethur</h1>
        <h2 className="hero-tagline">I build things for the web.</h2>
        <p className="hero-description">
          I'm a software developer passionate about creating exceptional digital
          experiences. Currently focused on building accessible, human-centered
          products.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-outline">
            Get In Touch
          </a>
        </div>
        <div className="hero-socials">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="mailto:hello@example.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="code-block">
          <div className="code-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <pre>
            <code>
{`const developer = {
  name: "Gururaj",
  skills: ["React", "Node.js",
           "Python", "DevOps"],
  passion: "Building great software",
  available: true
};`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Hero;
