import React from 'react';
import './Skills.css';

const ROW_1 = ["Python", "SQL", "Power BI", "Pandas", "NumPy", "Jupyter", "T-SQL", "AWS Fundamentals"];
const ROW_2 = ["React", "TypeScript", "Data Modeling", "Statistical Analysis", "ETL Pipelines", "Git & GitHub", "DAX", "CTEs & Window Functions"];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="skills section-padding">
      <div className="section-header">
        <h2 className="section-title">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500" style={{ backgroundImage: 'linear-gradient(90deg, #c084fc 0%, #00f0ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            Core
          </span> Skills
        </h2>
        <div className="section-line"></div>
      </div>

      <div className="skills__marquee-wrapper">
        <div className="skills__marquee">
          <div className="skills__track track-left">
            {[...ROW_1, ...ROW_1].map((skill, i) => (
              <div key={`r1-${i}`} className="skill-badge glass-card">{skill}</div>
            ))}
          </div>
        </div>
        
        <div className="skills__marquee mt-4">
          <div className="skills__track track-right">
            {[...ROW_2, ...ROW_2].map((skill, i) => (
              <div key={`r2-${i}`} className="skill-badge glass-card">{skill}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
