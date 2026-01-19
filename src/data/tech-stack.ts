import {
  Code2,
  Cpu,
  Cloud,
  Code,
  Database,
  DatabaseBackup,
} from "lucide-react";
import { TechCategory } from "@/types/tech-stack";

export const techCategories: TechCategory[] = [
  {
    title: "Back End",
    icon: Code2,
    items: [
      { name: "Node.js", version: "v20.x" },
      { name: "PHP", version: "v8.x" },
      { name: "TypeScript", version: "v5.x" },
      { name: "Go", version: "v1.2x" },
    ],
  },
  {
    title: "Infrastructure",
    icon: Cpu,
    items: [
      { name: "Docker", version: "Engine" },
      { name: "Kubernetes", version: "K8s" },
      { name: "Terraform", version: "IaC" },
      { name: "Linux", version: "Shell" },
    ],
  },
  {
    title: "Cloud Systems",
    icon: Cloud,
    items: [
      { name: "AWS", version: "Global" },
      { name: "GCP", version: "Compute" },
      { name: "Azure", version: "Cloud" },
      { name: "Cloudflare", version: "Edge" },
    ],
  },
  {
    title: "Frontend",
    icon: Code,
    items: [
      { name: "React", version: "v18" },
      { name: "Next.js", version: "v14" },
      { name: "Tailwind CSS", version: "v3" },
      { name: "Shadcn UI", version: "v2" },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    items: [
      { name: "PostgreSQL", version: "v15" },
      { name: "MySQL", version: "v8" },
      { name: "Redis", version: "Buffer" },
      { name: "NoSql", version: "DB" },
    ],
  },
  {
    title: "Data Warehouses",
    icon: DatabaseBackup,
    items: [{ name: "Apache Druid", version: "v24" }],
  },
];
