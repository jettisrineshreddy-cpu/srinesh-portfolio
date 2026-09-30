export interface Certification {
  id: string;
  name: string;
  code: string;
  issuer: string;
  status: "Completed" | "In Progress";
  verificationUrl: string;
  credentialId?: string;
  description: string;
}

export const certificationsData: Certification[] = [
  {
    id: "pl-300",
    name: "Microsoft Power BI Data Analyst",
    code: "PL-300",
    issuer: "Microsoft",
    status: "Completed",
    verificationUrl: "https://drive.google.com/file/d/1Ki-owFPZ1cJZ0d13sFugA8yH2ou_1Hmv/view?usp=drive_link",
    credentialId: "PL-300 (View Certificate)",
    description:
      "Validates expertise in transforming data, modeling data, visualizing and analyzing data, and deploying and maintaining assets in Power BI.",
  },
  {
    id: "dp-600",
    name: "Microsoft Fabric Analytics Engineer",
    code: "DP-600",
    issuer: "Microsoft",
    status: "Completed",
    verificationUrl: "https://drive.google.com/file/d/1NLqLFEFta_aUfG1CVqdWQyYUWyrCkwVT/view",
    credentialId: "DP-600 (View Certificate)",
    description:
      "Validates capabilities in designing, creating, and deploying enterprise-scale data analytics solutions using Microsoft Fabric and Power BI.",
  },
];
