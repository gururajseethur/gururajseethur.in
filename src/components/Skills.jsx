import React from 'react';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaLinux,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiKubernetes,
  SiTerraform,
} from 'react-icons/si';
import './Skills.css';

const skills = [
  { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178c6' },
  { name: 'React', icon: <FaReact />, color: '#61dafb' },
  { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
  { name: 'Python', icon: <FaPython />, color: '#3776ab' },
  { name: 'Docker', icon: <FaDocker />, color: '#2496ed' },
  { name: 'Kubernetes', icon: <SiKubernetes />, color: '#326ce5' },
  { name: 'Terraform', icon: <SiTerraform />, color: '#844fba' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169e1' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
  { name: 'Git', icon: <FaGitAlt />, color: '#f05032' },
  { name: 'Linux', icon: <FaLinux />, color: '#fcc624' },
];

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <div className="section-container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-icon" style={{ color: skill.color }}>
                {skill.icon}
              </div>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
