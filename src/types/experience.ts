import { LucideIcon } from "lucide-react";

export interface Document {
  name: string;
  url: string;
}

export interface Role {
  title: string;
  period: string;
  description: string;
  longDescription: string;
  tags: string[];
  icon: LucideIcon;
  logs: string[];
  documents?: Document[];
}

export interface CompanyExperience {
  company: string;
  totalPeriod: string;
  isExtended?: boolean; // For "Show More" functionality
  roles: Role[];
}
