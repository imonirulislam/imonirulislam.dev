# [root@imonirul] ~ $ system_manifest.md

## 🟢 SYSTEM_STATUS: ONLINE

> **"Code is poetry written in the language of logic."**

A high-performance personal portfolio engineered with a **server console / system HUD** aesthetic. Built to demonstrate technical proficiency through a deeply immersive, "manifest-style" visual language.

---

## ⚡ INITIALIZATION_PROTOCOL

### 1. Clone Repository

```bash
git clone https://github.com/imonirulislam/imonirulislam.dev.git
cd imonirulislam.dev
```

### 2. Install Dependencies

```bash
npm install
# System requires Node.js v22.17.0 (LTS)
```

### 3. Initiate Boot Sequence

```bash
npm run dev
# Server listening on http://localhost:3000
```

---

## 🧬 ARCHITECTURE

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + `clsx` / `tailwind-merge`
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **UI Primitives**: [Shadcn UI](https://ui.shadcn.com/) (Radix)
- **Quality Control**: ESLint 9 (Flat Config) + Prettier
- **Automation**: [Prek](https://prek.j178.dev/) (Git Hooks)

---

## 🛠️ AUTOMATION

This project uses `prek` to enforce code quality before every commit.

### Pre-commit Hooks

The following checks run automatically when you commit:

1.  **Format**: Runs `bun run format:fix` to auto-fix code style issues.
2.  **Lint**: Runs `bun run lint` to check for errors.
3.  **Type Check**: Runs `bun run type-check` to ensure type safety.

### Manual Commands

```bash
# Run hooks manually on all files
bunx prek run --all-files

# Update hook configuration
bunx prek install
```

## 🚀 DEPLOYMENT

````bash
### Cloudflare Pages
This project is optimized for Cloudflare Pages (Static Export).

```bash
# 1. Build the project (outputs to /out)
bun run pages:build

# 2. Preview locally with Wrangler
bunx wrangler pages dev out

# 3. Deploy to Cloudflare
bunx wrangler pages deploy out --project-name imonirulislam-dev
````

```

---

_© 2026 Monirul Islam. All systems nominal._
```
