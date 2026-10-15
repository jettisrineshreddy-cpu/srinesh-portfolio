import React from 'react';
import './Skills.css';

const SKILL_GROUPS = [
  {
    num: '01',
    category: 'DATA',
    desc: 'Analytics, visualization & querying',
    skills: ['SQL · T-SQL', 'Power BI', 'Excel · DAX', 'Pandas', 'EDA', 'Data Modeling', 'KPI Analysis', 'Statistical Analysis'],
  },
  {
    num: '02',
    category: 'ENGINEERING',
    desc: 'Pipelines, infrastructure & APIs',
    skills: ['SQL Server', 'ETL / ELT', 'REST APIs', 'AWS — S3, Glue, Redshift', 'Git & GitHub', 'CI/CD', 'PostgreSQL'],
  },
  {
    num: '03',
    category: 'AI',
    desc: 'Machine intelligence & scientific computing',
    skills: ['Machine Learning', 'Deep Learning', 'PINNs', 'Bayesian Methods', 'NumPy · SciPy', 'Jupyter', 'Matplotlib · Seaborn'],
  },
  {
    num: '04',
    category: 'DEVELOPMENT',
    desc: 'Code, tooling & interactive systems',
    skills: ['Python', 'React · TypeScript', 'Three.js', 'GSAP', 'Vite', 'MATLAB', 'GitHub Actions'],
  },
];

export const Skills: React.FC = () => {
  const [activeGroup, setActiveGroup] = React.useState<string | null>(null);

  return (
    <section id="skills" className="skills section-padding">
      <div className="content-wrapper">
        <div className="section-header">
          <h2 className="section-title">EXPERTISE</h2>
          <div className="section-line"></div>
        </div>

        <div className="skills__grid">
          {SKILL_GROUPS.map((group) => {
            const isDimmed = activeGroup !== null && activeGroup !== group.num;
            return (
              <div
                key={group.num}
                className={`skill-col ${isDimmed ? 'skill-col--dimmed' : ''}`}
                onMouseEnter={() => setActiveGroup(group.num)}
                onMouseLeave={() => setActiveGroup(null)}
              >
                <div className="skill-col__header">
                  <span className="skill-col__num">{group.num}</span>
                  <div className="skill-col__category">{group.category}</div>
                </div>
                <p className="skill-col__desc">{group.desc}</p>
                <ul className="skill-col__items">
                  {group.skills.map((skill) => (
                    <li key={skill} className="skill-col__item">{skill}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
