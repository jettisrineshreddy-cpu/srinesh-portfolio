import React from 'react';
import { skillsData } from '../../data/skills';
import './Skills.css';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="skills section-padding">
      <div className="section-header">
        <h2 className="section-title">Technical Capabilities</h2>
        <div className="section-line"></div>
      </div>

      <div className="skills__grid">
        {skillsData.map((group) => (
          <div key={group.id} className="skill-group">
            <h3 className="skill-group__title">{group.category}</h3>
            <p className="skill-group__desc">{group.description}</p>
            <div className="skill-group__items">
              {group.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span className="skill-item__dot"></span>
                  <span className="skill-item__name">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
