# Agent Guide: imonirulislam.dev

## Project Overview

**Name**: imonirulislam.dev
**Description**: A personal portfolio engineered with a server console / system HUD aesthetic. The design philosophy centers on a "hackerman" or advanced interface vibe, utilizing dark modes, monospaced fonts where appropriate, and terminal-like visuals.
**Version**: 1.3.0

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode enabled)
- **Styling**:
  - [Tailwind CSS 4](https://tailwindcss.com/)
  - [Shadcn UI](https://ui.shadcn.com/) (Component library)
  - [Framer Motion](https://www.framer.com/motion/) (Animations)
- **Runtime**: Node.js >=22.17.0
- **Package Manager**: [Bun](https://bun.sh/) (Lockfile: `bun.lockb`)

## Key Directories

- `src/app`: App Router pages and layouts.
- `src/components`: Reusable UI components.
  - `ui`: Shadcn UI primitives.
- `src/data`: Static data files (projects, experience, tech-stack).
- `src/types`: TypeScript definitions and enums.
- `src/hooks`: Custom React hooks.
- `public`: Static assets.

## Development Workflow

### Commands

- **Start Development Server**: `bun dev` (or `bun run dev`)
- **Build for Production**: `bun run build`
- **Lint Code**: `bun run lint`
- **Format Code**: `bun run format`
- **Type Check**: `bun run type-check`

### Conventions

- **Component Structure**: Functional components with named exports.
- **Styling**: Use Tailwind utility classes. Avoid custom CSS files unless necessary (use `index.css` for global styles).
- **Icons**: `lucide-react`, `react-icons`, `simple-icons`.
- **Theme**: Supports light/dark mode via `next-themes` and `theme-provider.tsx`.
- **Design System**: See `DESIGN.md` for detailed style guidelines.

## Specialized Instructions

- **Aesthetic**: Maintain the high-tech, HUD, console-like look and feel.
- **New Components**: When adding new UI elements, ensure they match the existing design language (Shadcn + custom "HUD" tweaks).
- **Images**: Use `generate_image` tool for placeholders or assets if needed, ensuring they fit the theme.
