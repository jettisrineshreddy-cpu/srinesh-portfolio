export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  description: string;
  technologies: string[];
  projects?: string[];
  link?: string;
}

export const experienceData: Experience[] = [
  {
    id: 'decodelabs',
    role: 'Data Analytics Intern',
    organization: 'Decodelabs',
    period: '2026 — Present',
    type: 'Internship',
    description:
      'Hands-on Data Analytics internship involving assigned projects, mentor-led sessions, and practical analytics work. Focused on data cleaning, preparation, and structuring e-commerce datasets.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Excel'],
    projects: ['Project 1 — Data Cleaning & Preparation (E-commerce dataset)'],
  },
  {
    id: 'shadowfox',
    role: 'Data Analyst Intern',
    organization: 'ShadowFox',
    period: 'August 1, 2026 – August 31, 2026',
    type: 'Virtual Internship',
    description:
      'A one-month Data Analyst virtual internship focused on practical data analytics projects and industry-oriented learning.',
    technologies: ['Data Analytics', 'Data Analysis', 'Industry Projects'],
  },
  {
    id: 'personifwy-1stop',
    role: 'Data Science Intern',
    organization: 'Personifwy / 1Stop',
    period: '2 Months · Completed',
    type: 'Internship',
    description:
      'Two-month internship completing practical machine learning and analytical tasks including hate speech detection, spam SMS classification, and credit exploratory data analysis.',
    technologies: ['Python', 'Data Preprocessing', 'EDA', 'Machine Learning Fundamentals'],
    projects: ['Hate Speech Detection', 'Spam SMS Classification', 'Credit EDA'],
  },
  {
    id: 'infosys-springboard',
    role: 'AI & Data Learning Program Participant',
    organization: 'Infosys Springboard',
    period: '2024',
    type: 'Learning Program',
    description:
      'Participated in structured learning covering AI fundamentals, data analysis, and software development concepts. Developed Hospital Operations & Patient Analytics Dashboard (MedTrack_DV) modeling hospital management system data.',
    technologies: ['Power BI', 'ETL / Data Preparation', 'Python', 'Data Modeling'],
    projects: ['MedTrack_DV — Hospital Operations & Patient Analytics Dashboard'],
  },
];
