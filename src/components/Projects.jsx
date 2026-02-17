import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    title: 'Project One',
    description:
      'A full-stack web application built with React and Node.js. Features include user authentication, real-time updates, and a modern responsive UI.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    github: 'https://github.com/',
    live: '#',
  },
  {
    title: 'Project Two',
    description:
      'An infrastructure automation platform using Terraform and Docker. Streamlines deployment workflows and provides monitoring dashboards.',
    tech: ['Python', 'Docker', 'Terraform', 'Grafana'],
    github: 'https://github.com/',
    live: '#',
  },
  {
    title: 'Project Three',
    description:
      'A machine learning pipeline for data processing and analysis. Includes data visualization and automated model training capabilities.',
    tech: ['Python', 'TensorFlow', 'PostgreSQL', 'FastAPI'],
    github: 'https://github.com/',
    live: '#',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="section-container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-top">
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub />
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <ul className="project-tech">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
