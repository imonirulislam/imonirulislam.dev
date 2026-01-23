import { Project, ProjectCategory } from "@/types/project";

export const projects: Project[] = [
  {
    title: "imonirulislam.dev",
    description:
      "Modern personal portfolio website showcasing projects and experience.",
    longDescription:
      "A high-performance personal portfolio built with Next.js and Tailwind CSS. Features include a dynamic blog system, interactive project showcase, and a highly responsive design with dark mode support. Designed to be a central hub for my professional identity.",
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    category: ProjectCategory.Web,
    specs: ["Responsive Design", "Dark Mode", "SEO Optimized"],
    logs: [
      "Built with Next.js 14 for server-side rendering and static generation.",
      "Implemented a custom design system using Tailwind CSS.",
      "Integrated a dynamic content management system for easy updates.",
    ],
    github: "https://github.com/imonirulislam/imonirulislam.dev",
    demo: "https://imonirulislam.dev",
    images: [],
  },
  {
    title: "Kodama",
    description:
      "A comprehensive project management application similar to Jira.",
    longDescription:
      "A full-featured project management tool inspired by Jira. Built with Next.js 14, it utilizes Appwrite for backend services and Shadcn UI for a polished, accessible interface. Features include kanban boards, task tracking, sprints, and team collaboration tools.",
    tech: ["Next.js", "Tailwind CSS", "Shadcn UI", "Appwrite"],
    category: ProjectCategory.Web,
    specs: ["Kanban Boards", "Real-time Updates", "Team Collaboration"],
    logs: [
      "Implemented drag-and-drop kanban boards using dnd-kit.",
      "Integrated Appwrite for secure authentication and real-time database capabilities.",
      "Designed a responsive UI with Shadcn and Tailwind CSS.",
    ],
    github: "#",
    demo: "#",
    images: [],
  },
  {
    title: "Slacken",
    description: "Real-time team communication platform inspired by Slack.",
    longDescription:
      "A real-time chat application inspired by Slack, leveraging Convex for a reactive backend and LiveKit for high-quality audio/video calls. Includes channel management, direct messaging, rich media support, and workspace organization.",
    tech: ["Next.js", "Shadcn UI", "Tailwind CSS", "Convex", "LiveKit"],
    category: ProjectCategory.Web,
    specs: ["Real-time Chat", "Audio/Video Calls", "Channel Management"],
    logs: [
      "Utilized Convex for ultra-fast, reactive data syncing.",
      "Integrated LiveKit for low-latency audio and video conferencing.",
      "Implemented a rich text editor for messaging.",
    ],
    github: "#",
    demo: "#",
    images: [],
  },
];

export const projectCategories: string[] = [
  "All",
  ...Object.values(ProjectCategory),
];
