import React from 'react';
import './Skills.css';

const SKILL_GROUPS = [
  {
    num: '01',
    category: 'DATA',
    skills: ['SQL', 'Power BI', 'Excel', 'DAX', 'EDA', 'Data Modeling', 'KPI Analysis', 'Statistical Analysis'],
  },
  {
    num: '02',
    category: 'ENGINEERING',
    skills: ['SQL Server', 'T-SQL', 'ETL / ELT', 'REST APIs', 'AWS (S3, Glue, Redshift)', 'Git & GitHub', 'CI/CD', 'PostgreSQL'],
  },
  {
    num: '03',
    category: 'AI & SCIENCE',
    skills: ['Machine Learning', 'Deep Learning', 'PINNs', 'Bayesian Methods', 'Computer Vision', 'NumPy', 'Jupyter', 'Matplotlib'],
  },
  {
    num: '04',
    category: 'DEVELOPMENT',
    skills: ['Python', 'Pandas', 'React', 'TypeScript', 'Vite', 'Three.js', 'GSAP', 'JavaScript'],
  },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="skills section-padding">
      <div className="content-wrapper">
        <div className="section-header">
          <h2 className="section-title">EXPERTISE</h2>
          <div className="section-line"></div>
        </div>

        <div className="skills__grid">
          {SKILL_GROUPS.map((group) => (
            <div key={group.num} className="skill-col">
              <div className="skill-col__num">{group.num}</div>
              <div className="skill-col__category">{group.category}</div>
              <ul className="skill-col__items">
                {group.skills.map((skill) => (
                  <li key={skill} className="skill-col__item">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
