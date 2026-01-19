# Design System & Guidelines

## 1. Core Philosophy

**"System HUD / Console"**
The design aesthetic mimics a futuristic, high-tech system interface. It prioritizes clarity, technical precision, and a "hackerman" vibe.

- **Visuals**: Sharp borders, heavy use of monospaced fonts for metadata, and semi-transparent backdrops.
- **Motion**: Subtle, smooth transitions (via Framer Motion) to feel like a responsive application rather than a static page.

## 2. Component Library

- **Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Style Variant**: **New York** (Condensed spacings, smaller text sizes, sharp borders).
- **Base Radius**: `0.5rem` (Rounded-md).

## 3. Typography

Powered by `next/font` (Geist family).

- **Sans**: `Geist Sans` - Used for headings, body text, and interactive elements.
- **Mono**: `Geist Mono` - Used strictly for metadata, tags, code snippets, and "system status" indicators.

## 4. Color System (OKLCH)

We utilize the **OKLCH** color space for perceptual uniformity.

- **Primary**: Brand accent (Adjustable via CSS variables).
- **Background**: `oklch(1 0 0)` (Light) / `oklch(0.145 0 0)` (Dark).
- **Muted**: used for secondary text and backgrounds to reduce visual noise.

## 5. Visual Patterns

- **Grid Pattern**: A customized 40x40px linear gradient grid used in backgrounds to give a "blueprint" feel.

```css
.grid-pattern {
  background-size: 40px 40px;
  /* ... */
}
```

- **Dot Pattern**: A radial gradient array used for texture in denser sections.
- **Glassmorphism**: Heavy use of `backdrop-blur-sm` combined with `bg-secondary/10` to create layered depth.

## 6. Iconography

- **Primary**: `lucide-react` (Navigation, UI actions).
- **Brand/Social**: `simple-icons` (GitHub, LinkedIn, Tech logos).
- **Rules**:
  - Icons should generally be `w-4 h-4` or `w-5 h-5`.
  - Strokewidth is standard unless emphasized.
