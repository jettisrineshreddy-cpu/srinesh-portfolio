export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  description: string;
  technologies: string[];
}

export const experienceData: Experience[] = [
  {
    id: 'infosys-springboard',
    role: 'AI & Data Learning Program Participant',
    organization: 'Infosys Springboard',
    period: '2024',
    type: 'Learning Program',
    description:
      'Participated in structured learning covering AI fundamentals, data analysis, and software development concepts through the Infosys Springboard platform.',
    technologies: ['Python', 'Data Analysis', 'AI Fundamentals'],
  },
];
