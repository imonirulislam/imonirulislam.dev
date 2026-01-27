# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-01-27

### Added

- **HUD Overlay**: Implemented a comprehensive "Heads-Up Display" with real-time scroll progress (top and vertical side bars).
- **Interactive Identity**: Added a persistent "Terminal Handshake" module in the HUD with persistent `GUEST_ID` (localStorage), session uptime, and visit counters.
- **Biometric Preloader**: Transformed the entry sequence into a "Biometric Authorization" scanner with interactive "Hold to Authorize" logic.
- **Real-time Telemetry**: Added authentic network latency (RTT) measurement integrated into the HUD diagnostics.
- **Easter Eggs**: Introduced terminal commands via Command Palette: `/matrix` (interactive code rain) and `/neofetch` (system summary).
- **Core Interactivity**: Implemented "Magnetic Pull" interactions for all primary action buttons and social icons.
- **Custom Cursor**: Added a technical crosshair cursor with real-time coordinate tracking and context-aware feedback.
- **Global CRT Effect**: Applied a global scanline and screen flicker effect to enhance the "System Console" aesthetic.

### Changed

- **Tech Stack**: Refactored the technology section into a "Bento Grid" modular layout.
- **HUD Integration**: Optimized HUD positioning to integrate seamlessly with the site navigation and navbar.
- **Navigation**: Enhanced the Command Palette (Cmd+K) with categorized system actions and site-wide navigation.

### Removed

- **Legacy Logging**: Decommissioned the old `ActivityLog` component in favor of the integrated HUD diagnostics.

## [1.3.0] - 2026-01-20

### Changed

- **Refactor**: Major refactoring of `Projects` and `Experience` sections to improve modularity.
- **Components**: Extracted `ProjectItem`, `ProjectPlaceholder`, and `ExperienceItem` into dedicated components.
- **Data**: Moved hardcoded data to `src/data/projects.ts` and `src/data/experience.ts`.
- **Types**: Extracted interfaces to `src/types/project.ts` and `src/types/experience.ts`.
- **Logic**: Centralized home page logic in `src/hooks/use-home-logic.ts`.
- **Enums**: Introduced `ProjectCategory` enum for stricter type safety in project filtering.
- **Refactor**: Separated Tech Stack data and components.

## [1.2.0] - 2026-01-16

### Added

- **Experience**: Added new professional experience role with detailed logs and achievements.
- **Projects**: Added new projects to the portfolio with comprehensive details.
- **Projects**: Implemented "Load More" functionality with a limit of 6 items per view to improve performance.
- **UI**: Added a "Resume" button to the Hero section with a creative hover effect.

### Changed

- **UI**: Relocated project "Source" and "Demo" buttons to the modal header on desktop for better accessibility.
- **UI**: Increased modal width (`md:max-w-4xl`) for Projects and Experience on desktop screens.
- **Icons**: Replaced deprecated Lucide icons with `simple-icons` and `react-icons` (branding consistency).
- **UI**: Polished "Load More" button with a theme-aware glow effect.

## [1.1.0] - 2026-01-14

### Added

- **Tech Stack**: Added a distinct "Frontend" category including React, Next.js, Tailwind CSS, and Shadcn UI.
- **Tech Stack**: Added "Data Warehouses" category featuring Apache Druid.
- **Experience**: Added detailed logs and verified descriptions for "APSIS", "UniSearch", "Nenorex Technologies", and "CAPM Company Ltd".

### Changed

- **Tech Stack Layout**: Refactored the grid layout to a responsive flex-wrap design to ensure centered alignment and better scalability (no more orphan items).
- **Tech Stack**: Updated "Databases" to include MySQL and NoSql; removed RabbitMQ/ClickHouse.
- **Tech Stack**: Renamed "Linux Kernel" to "Linux Shell" in Infrastructure.
- **Experience**: Renamed "Creative Web Agency" to "Nenorex Technologies".
- **Experience**: Renamed "Home Lab" to "CAPM Company Ltd".

## [1.0.0]

- Initial release.
