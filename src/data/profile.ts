export interface Profile {
  name: string;
  degree: string;
  university: string;
  campus: string;
  duration: string;
  status: string;
  careerDirection: string;
  primaryIdentity: string;
  tagline: string;
  supportingStatement: string;
  positioning: string[];
  links: {
    github: string;
    linkedin: string;
    email: string;
    resume: string;
  };
  cloudLearning: {
    title: string;
    technologies: string[];
    note: string;
  };
  research: {
    title: string;
    areas: string[];
    note: string;
  };
  careerInterests: string[];
}

export const profileData: Profile = {
  name: "J. Srinesh",
  degree: "Bachelor of Technology (B.Tech) — Artificial Intelligence",
  university: "Amrita Vishwa Vidyapeetham",
  campus: "Amaravati Campus",
  duration: "2024 – 2028",
  status: "3rd-year B.Tech Artificial Intelligence student",
  careerDirection:
    "Building career around Data Analytics, AI, data engineering, and practical software/data projects.",
  primaryIdentity:
    "B.Tech Artificial Intelligence Student | Data Analytics | AI | Data Engineering",
  tagline: "Data Analytics • AI • Data Engineering",
  supportingStatement:
    "Turning raw data into meaningful insights, interactive dashboards, and practical intelligent solutions.",
  positioning: [
    "Data Analytics & Exploratory Insights",
    "SQL & Database Querying",
    "Python & Modern Analytics Ecosystem",
    "Microsoft Power BI & Dashboard Development",
    "Data Engineering & Cloud Fundamentals",
    "Artificial Intelligence & Scientific Computing",
  ],
  links: {
    github: "https://github.com/jettisrineshreddy-cpu",
    linkedin: "https://www.linkedin.com/in/jetti-srinesh-reddy-42a396377/",
    email: "jettisrineshreddy@gmail.com",
    resume: "https://drive.google.com/file/d/1jH7TF_XeC1R84BDPVapOfsxQLuffF-o8/view?usp=drive_link",
  },
  cloudLearning: {
    title: "Cloud & Data Engineering Learning",
    technologies: [
      "AWS Fundamentals",
      "IAM",
      "S3",
      "RDS",
      "Athena",
      "Glue",
      "Redshift",
      "QuickSight",
      "Lambda",
      "Elastic Beanstalk",
      "Data Pipelines",
      "ETL / ELT Concepts",
    ],
    note: "Currently building active hands-on knowledge in cloud infrastructure, ETL/ELT pipelines, and data warehousing.",
  },
  research: {
    title: "Research & Scientific Computing",
    areas: [
      "Physics-Informed Neural Networks (PINNs)",
      "Bayesian PINNs",
      "Singularly Perturbed Boundary Value Problems",
      "Semi-analytic PINN methods",
      "Numerical methods",
      "AI-based scientific computing",
    ],
    note: "Exploratory research and scientific computing applying AI to boundary value problems and neural differential equations.",
  },
  careerInterests: [
    "Data Analyst",
    "Business/Data Analytics",
    "Analytics Engineering",
    "Data Engineering",
    "AI / ML Engineering",
    "Generative AI",
    "AI-powered data products",
  ],
};
