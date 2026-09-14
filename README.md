# Pokédex — Gen 1

![Status](https://img.shields.io/badge/Status-Stable-22c55e?style=flat-square)
![Made with Next.js](https://img.shields.io/badge/Next.js-powered-black?style=flat-square)
![License MIT](https://img.shields.io/badge/License-MIT-brightgreen?style=flat-square)

A complete Gen 1 Pokédex for *Pokémon Red, Blue, and Yellow* (US).
Hosted at **https://pokedex.thedeadbeat.club**

## Features

- Browse all 151 Gen 1 Pokémon with sprites from Red/Blue and Yellow.
- Filter by type (all 15 Gen 1 types) and version availability.
- Full level-up learnset for Red/Blue and Yellow separately where they differ (e.g. Pikachu).
- TM/HM compatibility list with Yellow-only move annotations.
- Move details: power, accuracy, PP, effect %, and description for every move — sourced from Serebii's Gen 1 Attackdex.
- Base stats (HP / Attack / Defense / Special / Speed) with visual stat bars.
- Full evolution chain display with method (level, stone, trade) — click any stage to navigate.
- Version availability and encounter locations for Red, Blue, and Yellow.
- Deep-linkable Pokémon URLs (`/pokemon/[id]`) for sharing or bookmarking.
- Keyboard shortcut: `/` to focus search, `Esc` to dismiss mobile detail view.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **MUI v6** for UI components, **Tailwind CSS** for layout utilities
- **Zustand** for client-side filter state
- **react-window v2** for virtualized Pokémon list

## Data

All Pokémon data (learnsets, TM/HM moves, stats, locations, evolution chains) is hand-curated in `src/data/pokemon.ts` and `src/data/moves.ts`, cross-referenced against [Serebii.net](https://www.serebii.net/pokedex/). Sprites are loaded from Serebii's sprite CDN.

## Getting Started

### Development

1. Ensure `docker`, `docker compose`, and `make` are installed.
2. Launch the development stack:
   ```bash
   make dev
   ```
3. Navigate to [http://localhost:3000](http://localhost:3000).

### Deployment

To build the production image and boot the server:

```bash
make prod-build
```

Then visit [http://localhost:3000](http://localhost:3000).

## Configuration

Adjust `.env` (copied from `.env.dist`) to override defaults.

| Name             | Purpose                |
| ---------------- | ---------------------- |
| `CONTAINER_NAME` | Docker container name  |
| `PORT`           | Port server listens to |

## Helpful Commands

- `make stop` — halt running containers.
- `make logs` — tail application logs for quick debugging.

## Legal

- **Trademarks** — *Pokémon*, *Red*, *Blue*, *Yellow*, and all Pokémon names are trademarks of Nintendo / Creatures Inc. / GAME FREAK inc. This project is independent, non-commercial, and not endorsed by the rights holders.
- **Copyright** — All original code in this repository is released under the MIT License (see `LICENSE`). Sprite images are property of Nintendo / GAME FREAK and are referenced via Serebii.net for fan/reference use.
- **Data attribution** — Move and Pokémon data cross-referenced from [Serebii.net](https://www.serebii.net). Please support Serebii for their incredible long-running resource.
