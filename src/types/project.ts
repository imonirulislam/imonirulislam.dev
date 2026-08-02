export enum ProjectCategory {
  Cloud = "Cloud",
  Data = "Data",
  Backend = "Backend",
  DevOps = "DevOps",
  Legacy = "Legacy",
  Infrastructure = "Infrastructure",
  Web = "Web",
}

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: ProjectCategory;
  specs: string[];
  logs?: string[];
  github: string;
  demo: string;
  docs?: string;
  images: string[];
}
