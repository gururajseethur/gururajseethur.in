import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="section-container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Hello! I'm Gururaj, a software developer who enjoys creating things
              that live on the internet. My interest in web development started
              back when I first discovered how websites worked — which led me
              down a rabbit hole of learning everything I could about building
              for the web.
            </p>
            <p>
              Fast forward to today, I've had the privilege of working on a
              variety of projects spanning different domains. My main focus these
              days is building accessible, inclusive products and digital
              experiences.
            </p>
            <p>Here are a few technologies I've been working with recently:</p>
            <ul className="tech-list">
              <li>JavaScript (ES6+)</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Python</li>
              <li>Docker</li>
              <li>Kubernetes</li>
            </ul>
          </div>
          <div className="about-image">
            <div className="image-wrapper">
              <div className="image-placeholder">
                <span>GS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
