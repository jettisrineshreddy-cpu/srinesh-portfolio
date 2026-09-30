export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  domain: string;
  featured: boolean; // Flag to give greater visual emphasis to strongest projects
  technologies: string[];
  summary: string;
  datasetOrScope?: string;
  analyticalAreasOrComponents: string[];
  knownKPIs?: string[];
  links: {
    github: string;
    demo?: string;
  };
}

export const projectsData: Project[] = [
  {
    id: "pubg-analytics",
    title: "PUBG Player Performance & Behavioral Analytics",
    subtitle: "Large-Scale Match & Behavioral Data Analytics",
    domain: "Gaming / Data Analytics",
    featured: true,
    technologies: ["SQL Server", "T-SQL", "Power BI", "Python", "Pandas"],
    datasetOrScope: "PUBG dataset containing approximately 4.4 million records",
    summary:
      "End-to-end analytical project processing a 4.4M record gaming dataset. Conducted extensive data exploration, data cleaning, and complex T-SQL queries to uncover behavioral patterns and performance benchmarks, culminating in an interactive Power BI dashboard.",
    analyticalAreasOrComponents: [
      "Kills and Combat Efficiency",
      "Damage Distribution",
      "Walking and Movement Distance",
      "Healing & Boost Item Usage",
      "Player Performance Benchmarks",
      "Match-Level Survival Analysis",
    ],
    links: {
      github: "[ADD PROJECT LINKS]",
    },
  },
  {
    id: "medtrack-dv",
    title: "MedTrack_DV — Hospital Operations & Patient Analytics",
    subtitle: "Healthcare Operations & Resource Optimization",
    domain: "Healthcare Operations Analytics",
    featured: true,
    technologies: [
      "Python",
      "Pandas",
      "Power BI",
      "Excel",
      "Data Cleaning",
      "Data Transformation",
      "Data Modeling",
    ],
    datasetOrScope:
      "Multiple hospital-management-system tables merged and cleaned into an integrated analytical model",
    summary:
      "Comprehensive healthcare analytics project integrating disparate hospital management system tables into an optimized star/analytical schema. Models patient flow, department capacities, and operational efficiency through targeted clinical and administrative KPIs.",
    analyticalAreasOrComponents: [
      "Hospital Overview",
      "Patient Flow Dynamics",
      "Department Analytics",
      "Resource Utilization",
    ],
    knownKPIs: [
      "Total Admissions",
      "Occupancy Rate",
      "Average Length of Stay (ALOS)",
      "Readmission Rate",
      "Bed Utilization Rate",
    ],
    links: {
      github: "https://github.com/jettisrineshreddy-cpu/Hospital-Operations-Patient-Analytics-Dashboard",
    },
  },
  {
    id: "ecommerce-analytics",
    title: "E-Commerce Analytics Pipeline & Dashboard",
    subtitle: "API-Driven Business & Customer Analytics",
    domain: "E-Commerce / Business Analytics",
    featured: true,
    technologies: [
      "APIs",
      "Python",
      "Excel",
      "Power BI",
      "Data Cleaning",
      "Data Analysis",
    ],
    summary:
      "Data pipeline and analytics project that ingests transaction and customer records through REST APIs, cleanses and shapes the data with Python, and visualizes essential business health metrics in Power BI.",
    analyticalAreasOrComponents: [
      "Sales Trends & Velocity",
      "Order Volume & Fulfillment",
      "Product Catalog Performance",
      "Customer Purchasing Patterns",
      "Revenue Trajectories",
      "Business Health KPIs",
    ],
    links: {
      github: "[ADD PROJECT LINKS]",
    },
  },
  {
    id: "hr-analytics",
    title: "HR Analytics Dashboard",
    subtitle: "Workforce Metrics & Organizational Insights",
    domain: "Human Resources / Business Analytics",
    featured: false,
    technologies: ["Power BI", "Excel", "Data Analysis", "Data Visualization"],
    summary:
      "Interactive HR analytics dashboard analyzing employee data to provide leadership with actionable workforce metrics, retention insights, and operational KPIs.",
    analyticalAreasOrComponents: [
      "Workforce Demographics",
      "Departmental Distribution",
      "Attrition / Retention Indicators",
      "Employee Performance Indicators",
    ],
    links: {
      github: "[ADD PROJECT LINKS]",
    },
  },
  {
    id: "python-cicd",
    title: "Python CI/CD Automation Demo",
    subtitle: "Automated Build, Test & Deployment Pipeline",
    domain: "Software Engineering / DevOps",
    featured: false,
    technologies: ["Python", "GitHub", "GitHub Actions", "Render", "CI/CD"],
    summary:
      "Demonstration of practical software engineering practices implementing an automated CI/CD pipeline. Configured GitHub Actions workflows for automated testing and linting, with automated deployment to Render.",
    analyticalAreasOrComponents: [
      "Automated Test Execution",
      "Continuous Integration Workflow",
      "Cloud Deployment Pipeline (Render)",
      "Repository Hygiene & Version Control",
    ],
    links: {
      github: "[ADD PROJECT LINKS]",
    },
  },
  {
    id: "robot-path-tracking",
    title: "Autonomous Mobile Robot Path Tracking",
    subtitle: "Pure Pursuit & Stanley Controller Implementation",
    domain: "Robotics / Control Systems",
    featured: false,
    technologies: ["MATLAB", "Simulink", "Robotics & Control Concepts"],
    summary:
      "Engineering control systems project implementing Pure Pursuit and Stanley steering control algorithms for autonomous mobile robot trajectory tracking, demonstrating technical versatility across AI, control, and robotics.",
    analyticalAreasOrComponents: [
      "Pure Pursuit Controller Implementation",
      "Stanley Controller Tuning",
      "Trajectory & Path Simulation",
      "Cross-Track Error Minimization",
    ],
    links: {
      github: "[ADD PROJECT LINKS]",
    },
  },
];
