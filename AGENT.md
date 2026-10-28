# Agent Guide: imonirulislam.dev

## Project Overview

**Name**: imonirulislam.dev
**Description**: A personal portfolio with a neo-brutalist terminal aesthetic: flat pop colors, thick ink borders and hard offset shadows, with real-time telemetry and terminal-style navigation. See `DESIGN.md`.
**Version**: 2.0.0

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode enabled)
- **Styling**:
  - [Tailwind CSS 4](https://tailwindcss.com/)
  - [Shadcn UI](https://ui.shadcn.com/) (Component library)
  - [Framer Motion](https://www.framer.com/motion/) (Animations)
- **Runtime**: Node.js >=24.22.1 (LTS, see `.nvmrc`)
- **Package Manager**: [Bun](https://bun.sh/) (Lockfile: `bun.lockb`)

## Key Architecture & Components

- `src/components/global-effects.tsx`: Central client-side wrapper for HUD, matrix effects, and the command palette.
- `src/components/hud-overlay.tsx`: Core "System HUD" implementing scroll tracking, identity management, and real-time RTT telemetry.
- `src/components/preloader.tsx`: Brutalist `boot.sh` boot sequence shown before the page renders.
- `src/components/command-palette.tsx`: Terminal-style navigation and system commands (Cmd+K).
- `src/components/matrix-rain.tsx`: Full-screen digital rain Easter Egg.
- `src/components/arcade/`: `arcade.exe` mini-game hub (Snake, Breakout, 2048, Stack Match), opened by the footer `INSERT_COIN` button, `/arcade` in the palette, an `open-arcade` window event, or the Konami code. Shared score/overlay/controls live in `shared.tsx`.
- `src/components/neofetch.tsx`: Terminal-style system info panel (`/neofetch`).

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
