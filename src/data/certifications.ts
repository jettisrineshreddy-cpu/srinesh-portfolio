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
    verificationUrl: "[ADD CREDENTIAL URL / ID]",
    credentialId: "[ADD CREDENTIAL ID]",
    description:
      "Validates expertise in transforming data, modeling data, visualizing and analyzing data, and deploying and maintaining assets in Power BI.",
  },
  {
    id: "dp-600",
    name: "Microsoft Fabric Analytics Engineer",
    code: "DP-600",
    issuer: "Microsoft",
    status: "Completed",
    verificationUrl: "[ADD CREDENTIAL URL / ID]",
    credentialId: "[ADD CREDENTIAL ID]",
    description:
      "Validates capabilities in designing, creating, and deploying enterprise-scale data analytics solutions using Microsoft Fabric and Power BI.",
  },
];
