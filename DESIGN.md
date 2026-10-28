# Design System & Guidelines

## 1. Core Philosophy

**"Neo-Brutalist Terminal"**
Flat, loud and honest. Every surface is a solid block with a hard ink outline and an offset shadow, so hierarchy comes from contrast and stacking rather than blur, gradients or transparency. The terminal personality (monospaced metadata, `SNAKE_CASE` labels, command palette, easter eggs) stays as the voice.

- **Visuals**: Solid fills, 2px ink borders, square corners, hard offset shadows, pops of saturated color.
- **Motion**: Short and physical. Elements lift or press into their shadow; nothing fades through glass.

### Rules

- No `backdrop-blur`, no gradients, no glow `shadow-[0_0_…]`.
- No opacity modifiers on structural colors (`border-border/50`, `bg-secondary/10`). Use the solid token.
- Text on a `pop-*` fill is always `text-black`, in both themes.

## 2. Component Library

- **Library**: [shadcn/ui](https://ui.shadcn.com/) (New York variant), restyled in `src/components/ui/`.
- **Radius**: `--radius: 0px`. Every `rounded-*` step resolves to it; `rounded-full` is reserved for status dots.
- **Button**: `default` is yellow with border and shadow, `secondary` is cyan, `outline` is card-colored. All use `brutal-press`.
- **Card / Dialog / Dropdown**: `border-2` with `shadow-brutal` (dialogs use `shadow-brutal-lg`).

## 3. Typography

Powered by `next/font`.

- **Sans**: `Space Grotesk` for headings, body text and interactive elements. Headings are bold and tight (`tracking-tight`).
- **Mono**: `Space Mono` for metadata, tags, code snippets and system status labels.

## 4. Color System (OKLCH)

Defined in `src/app/globals.css`. Light mode is the default.

| Token                     | Light         | Dark           | Use                                        |
| ------------------------- | ------------- | -------------- | ------------------------------------------ |
| `background`              | cream         | near-black     | Page                                       |
| `card` / `secondary`      | white         | charcoal       | Surfaces                                   |
| `border` / `shadow-color` | ink           | cream / yellow | Outlines and offset shadows                |
| `primary`                 | electric blue | light blue     | Text accents and links (must read as text) |
| `muted-foreground`        | dark gray     | light gray     | Secondary text                             |

**Pop fills** (`bg-pop-yellow`, `bg-pop-pink`, `bg-pop-cyan`, `bg-pop-lime`) are for blocks only, never for text on the page background.

- Yellow: primary actions, highlights, footer.
- Pink: active states, emphasis, progress.
- Cyan: tags and chips.
- Lime: status and "OK" indicators.

To force ink colors inside a pop-filled region in dark mode, override the tokens locally, as the footer does: `[--foreground:oklch(0.15_0_0)]`.

## 5. Shadows & Interaction Utilities

| Utility                                                   | Effect                                                               |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| `shadow-brutal-sm` / `shadow-brutal` / `shadow-brutal-lg` | 2 / 4 / 8px hard offset shadow in `--shadow-color`                   |
| `brutal-press`                                            | On hover, translates into the shadow and removes it (buttons, links) |
| `brutal-lift`                                             | On hover, lifts up-left and grows the shadow (cards)                 |

Don't put `brutal-press` / `brutal-lift` on an element that Framer Motion or `Magnetic` also transforms; wrap it instead.

## 6. Visual Patterns

- **Dot grid**: `.grid-pattern`, a 32px radial dot grid in the border color, used at low opacity behind the page.
- **Stickers**: Small rotated blocks (`-rotate-1` / `rotate-1`) with a pop fill for emphasis, as on the hero keywords and the 404 card.

## 7. HUD & Identity

- **Guest badge**: Top-right on desktop, bottom-right on mobile (clear of the navbar). Expands on hover to show session telemetry and real RTT, measured every 5 seconds.
- **Scroll progress**: A thick pink top bar and a bordered side rail with a percentage chip.
- **Preloader**: Full-screen yellow with a `boot.sh` window and a segmented progress bar.

## 8. Iconography

- **Primary**: `lucide-react` (navigation, UI actions).
- **Brand/Social**: `simple-icons` (GitHub, LinkedIn, tech logos).
- **Rules**:
  - Icons are generally `w-4 h-4` or `w-5 h-5`.
  - Icon buttons sit in a bordered square with `shadow-brutal-sm`.
