import { LucideIcon } from "lucide-react";

export interface TechItem {
  name: string;
  version: string;
}

export interface TechCategory {
  title: string;
  icon: LucideIcon;
  items: TechItem[];
}
