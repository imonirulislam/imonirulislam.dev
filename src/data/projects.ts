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
    images: ["/projects/imonirulislam_dev_home.png"],
  },
  {
    title: "Kodama",
    description:
      "Real-time project management with kanban boards, backlogs, sprints, and reports.",
    longDescription:
      "A team project-management app built on Next.js and Convex. Workspaces and projects hold richly typed issues — epics, stories, tasks, bugs, and sub-tasks with a real hierarchy and sequential per-project keys — planned across a drag-and-drop kanban board, backlog, sprints, calendar, and Gantt timeline. Collaboration runs on a tiptap editor with threaded comments, emoji reactions, mentions, and attachments, backed by an in-app notification bell and issue watching. Because Convex drives the backend, every board, list, and feed updates live.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Convex", "Shadcn UI"],
    category: ProjectCategory.Web,
    specs: [
      "Kanban, Backlog & Sprints",
      "Epic → Story → Sub-task Hierarchy",
      "Burndown, Velocity & Flow Reports",
      "Threaded Comments with Mentions",
    ],
    logs: [
      "Migrated the backend from Appwrite/Hono to Convex, making every board, list, and feed reactive by default.",
      "Built the agile suite: swimlane kanban, backlog planning, a sprint lifecycle, calendar, and Gantt timeline.",
      "Added a notification bell with issue watching that fans comment, reaction, and mention alerts out to watchers.",
    ],
    github: "https://github.com/imonirulislam/kodama",
    demo: "https://kodama.imonirulislam.dev",
    images: [],
  },
  {
    title: "Sangria",
    description:
      "Real-time team chat with video huddles, an integrations platform, and native desktop and mobile apps.",
    longDescription:
      "A multi-workspace team chat platform built on Next.js and Convex, shipped from one codebase to the browser, an installable PWA, a macOS/Windows/Linux desktop app (Electron), and iOS and Android (Capacitor). Messaging spans public and private channels, direct and group messages, threaded replies, reactions, polls, pins, saved items, drafts, scheduled sends, link previews, slash commands, and full-text search. Huddles add LiveKit audio and video with screen sharing, hand raising, and a detachable popout window. An integrations layer lets external tools post as bots through per-channel incoming webhooks or a bearer-token message API with interactive message components, while admins get roles and permissions, custom emoji, user groups, and audit logs. Notifications run through a deduplicated delivery pipeline with deep links straight to the message, per-channel preferences, and quiet hours.",
    tech: [
      "Next.js",
      "TypeScript",
      "Convex",
      "LiveKit",
      "Electron",
      "Capacitor",
    ],
    category: ProjectCategory.Web,
    specs: [
      "Channels, DMs, Threads & Polls",
      "Huddles with Screen Sharing",
      "Desktop Apps: macOS, Windows & Linux",
      "Mobile Apps: iOS & Android, plus PWA",
      "Webhooks, Bot API & Message Components",
      "Deep-Linked Push with Quiet Hours",
    ],
    logs: [
      "Built on Convex for reactive, real-time sync — index-backed paginated queries and a chunked outbox for notification fan-out.",
      "Integrated LiveKit huddles with screen sharing, popout windows, hand raising, and active-speaker detection.",
      "Shipped a single codebase to web, PWA, Electron (macOS/Windows/Linux), and Capacitor (iOS/Android).",
      "Built an integrations platform: bot apps, per-channel incoming webhooks, a bearer-token message API, and interactive message components.",
      "Wrote the documentation as a Next.js + Fumadocs MDX site with a Help Center, developer guides, and local Orama search.",
    ],
    github: "#",
    demo: "https://sangria.imonirulislam.dev",
    docs: "https://sangria-docs.imonirulislam.dev",
    images: [],
  },
  {
    title: "plumbline",
    description:
      "A Go CLI that audits repositories against a policy — the same standard, every repo, across git hosts.",
    longDescription:
      "Point plumbline at a GitHub, GitLab, or Gitea owner and it reports, per repository, whether the default branch is what you expect, whether it is protected, whether CI exists, and whether dependency automation is set up. The policy is configurable via JSON or YAML, and the git host is a pluggable connector behind a ports-and-adapters core. Read-only by default; the opt-in fix commands close drift — dry-run first, then applying settings changes or opening a PR/MR.",
    tech: ["Go", "CLI", "GitHub", "GitLab", "Gitea"],
    category: ProjectCategory.DevOps,
    specs: [
      "Configurable JSON/YAML Policy",
      "Pluggable Host Connectors",
      "Opt-in Remediation (dry-run first)",
      "CI Gates & Slack Notifications",
    ],
    logs: [
      "Designed around ports & adapters: checks run on a normalized model, each connector adapts its host's API.",
      "Added remediation that fixes branch protection and default branches, and opens PRs for dependency automation.",
      "Ships as a single binary via goreleaser, with concurrent repo inspection and table, JSON, Markdown, and CSV reports.",
    ],
    github: "https://github.com/imonirulislam/plumbline",
    demo: "#",
    images: [],
  },
];

export const projectCategories: string[] = [
  "All",
  ...Object.values(ProjectCategory),
];
