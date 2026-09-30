export interface SkillGroup {
  id: string;
  category: string;
  description: string;
  skills: string[];
}

export const skillsData: SkillGroup[] = [
  {
    id: "data-analytics",
    category: "Data Analytics",
    description: "Deriving actionable insights and modeling operational data",
    skills: [
      "Exploratory Data Analysis (EDA)",
      "Data Cleaning & Wrangling",
      "Statistical Analysis",
      "Data Modeling",
      "KPI & Metrics Analysis",
    ],
  },
  {
    id: "programming",
    category: "Programming",
    description: "Core programming languages for data, AI, and systems",
    skills: ["Python", "SQL", "Basic JavaScript / Web Technologies"],
  },
  {
    id: "python-ecosystem",
    category: "Python Ecosystem",
    description: "Libraries and environments for data analysis and computation",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebooks"],
  },
  {
    id: "database-sql",
    category: "Database & SQL",
    description: "Relational database querying and advanced analytical transformations",
    skills: [
      "SQL Server",
      "T-SQL",
      "Complex Joins",
      "Subqueries",
      "Common Table Expressions (CTEs)",
      "Window Functions",
      "Ranking Functions",
      "LAG / LEAD Functions",
      "Analytical Queries",
    ],
  },
  {
    id: "bi-visualization",
    category: "BI & Visualization",
    description: "Executive dashboards, reporting, and data storytelling",
    skills: [
      "Microsoft Power BI",
      "Power Query",
      "DAX (Data Analysis Expressions)",
      "Microsoft Excel",
      "Interactive Dashboard Development",
    ],
  },
  {
    id: "engineering-cloud",
    category: "Engineering & Cloud",
    description: "Version control, APIs, DevOps, and cloud learning",
    skills: [
      "Git & GitHub",
      "REST APIs",
      "AWS Fundamentals (IAM, S3, RDS, Athena, Glue, Redshift, QuickSight, Lambda, Elastic Beanstalk)",
      "CI/CD Fundamentals",
      "React / Web Development",
    ],
  },
];
