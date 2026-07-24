![Agentic Premier League Finals — Google Cloud · GDG Patna](public/Banner.svg)

# StadiumOS AI

Enterprise AI-powered stadium crowd intelligence and emergency response for IPL, World Cup, and Motera-class venues.

Built for **Agentic Premier League Finals** · **Google Cloud** · **GDG Patna** · **Suryanshu Nabheet**

---

## Key Features

- **Command Center:** Live occupancy, operational KPIs, stadium map overlays, active emergencies, and traffic pressure in a single operator console.
- **Crowd Flow Intelligence:** Gate-level pressure, density heatmaps, and AI-assisted reroute suggestions to relieve bottlenecks before they escalate.
- **Emergency Response Agents:** Incident intake, team dispatch, structured incident reports, and evacuation-impact estimates tied to live stadium state.
- **Digital Twin:** Interactive schematic of a 132k-seat Motera-class venue with live density visualization for situational awareness.
- **Operations Analytics:** Throughput trends, evacuation readiness, and AI confidence signals for post-action review and briefing.
- **Gemini Copilot:** Context-aware assistant grounded in the same live simulation snapshot — no hallucinated dumps on simple chat; local fallback when no API key is configured.
- **Real-Time Simulation Engine:** Client-side tick loop (~3.5s) driving gates, heatmap, incidents, and agents so demos stay alive without a backend WebSocket farm.

---

## Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                        │
│  React UI · Framer Motion · Recharts · Zustand store        │
│  TanStack Query · Simulation tick (~3.5s)                   │
└───────────────────────────┬─────────────────────────────────┘
                            │ fetch / Server Actions
┌───────────────────────────▼─────────────────────────────────┐
│                   Next.js App Router                        │
│  app/(platform)/*  ·  app/api/*  ·  server/actions/*        │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                   Server Layer (`/server`)                  │
│  config/env · services · lib/errors · lib/response          │
└───────────────────────────┬─────────────────────────────────┘
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
     agents/           services/           config/
   (Gemini AI)    (simulation-engine)   (stadium, site)
```

| Layer | Responsibility |
| ----- | -------------- |
| `app/` | Routes, layouts, thin API handlers |
| `server/` | Server-only business logic, env validation, response helpers |
| `agents/` | Operator assistant (Gemini + deterministic fallback) |
| `services/` | Simulation engine and domain generators |
| `store/` | Zustand client state for live telemetry |
| `components/` | UI modules (dashboard, twin, analytics, landing) |
| `config/` | Static stadium and site configuration |

---

## Platform Modules

| Module | Route | Purpose |
| ------ | ----- | ------- |
| Landing | `/` | Product entry and launch into the command console |
| Command Center | `/dashboard` | Live occupancy, KPIs, map, emergencies, traffic |
| Crowd Flow AI | `/crowd-flow` | Gate pressure, heatmap, AI reroute suggestions |
| Emergency Agents | `/emergency` | Incidents, dispatch, reports, evacuation impact |
| Digital Twin | `/twin` | Motera-class schematic with live density |
| Analytics | `/analytics` | Trends, throughput, readiness, AI confidence |
| AI Assistant | `/assistant` | Gemini copilot on live stadium context |

---

## Tech Stack

| Concern | Choice |
| ------- | ------ |
| Framework | Next.js 16 (App Router) + Turbopack |
| Language | TypeScript (strict) |
| UI | React 19 · Tailwind CSS 4 · Radix / Base UI · Lucide |
| State | Zustand (live telemetry) · TanStack Query (optional fetch) |
| Motion & charts | Framer Motion · Recharts |
| AI | Google Generative AI (Gemini) via `@google/generative-ai` |
| Packaging | pnpm · Docker (standalone Next.js output) |
| Target runtime | Node 20 · Cloud Run–ready `Dockerfile` at repo root |

---

## Project Structure

```text
StadiumOS/
├── app/                 # Next.js routes, layouts, API handlers
├── server/              # Server layer (env, services, actions)
├── agents/              # Gemini operator assistant + fallback
├── services/            # Simulation engine
├── store/               # Zustand live telemetry store
├── components/          # Platform & landing UI
├── config/              # Stadium & site configuration
├── hooks/               # useStadium, useSimulation, …
├── types/               # Shared TypeScript contracts
├── public/              # APL Banner.svg, GDG-Patna-Banner, gdg.svg, assets
├── docs/                # Architecture, API, deployment guides
├── scripts/             # Setup, verify, Docker automation
├── Dockerfile           # Production image (repo root)
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18.x or later; v20 recommended)
- pnpm (v10.x or later)
- Optional: Google AI Studio key for Gemini-powered assistant

---

### Local Installation

1. **Clone the repository:**
   ```bash
   cd StadiumOS
   ```

2. **Install & bootstrap:**
   ```bash
   chmod +x scripts/*.sh
   ./scripts/setup.sh
   ```
   Or manually:
   ```bash
   pnpm install
   cp .env.example .env.local
   ```

3. **Configure environment variables** in `.env.local`:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   GEMINI_API_KEY=          # optional — assistant uses local fallback if empty
   SIMULATION_TICK_MS=3500
   ```

4. **Launch the development server:**
   ```bash
   ./scripts/dev.sh
   # or
   pnpm dev
   ```

5. **Open the app:**
   - Landing: [http://localhost:3000](http://localhost:3000)
   - Command Center: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

6. **Health check:**
   ```bash
   curl http://localhost:3000/api/health
   ```

---

### Optional: Gemini Assistant

1. Create an API key in [Google AI Studio](https://aistudio.google.com/apikey).
2. Set `GEMINI_API_KEY` in `.env.local`.
3. Restart the dev server. Without a key, the assistant still answers using local, context-seeded fallback logic.

---

## Scripts

| Command | Description |
| ------- | ----------- |
| `./scripts/setup.sh` | Install dependencies, env scaffold, verify |
| `./scripts/dev.sh` | Development server (Turbopack) |
| `./scripts/verify.sh` | Lint + typecheck + production build |
| `./scripts/build.sh` | Production build |
| `./scripts/docker.sh up` | Local Docker Compose |

---

## Development Guidelines

- **TypeScript Strict Mode:** No implicit `any`. Shared contracts live in `types/`.
- **Layer Boundaries:** UI must not import `@google/generative-ai` directly; API routes stay thin and delegate to `server/services`.
- **Surgical Edits:** Change only what the task requires; preserve existing design tokens and motion language.
- **Simulation Integrity:** Keep the tick-driven live store coherent — components subscribe; they do not invent parallel fake state.
- **Secrets:** Never commit `.env.local` or API keys.

---

## Documentation

| Doc | Topic |
| --- | ----- |
| [Presentation](./docs/PRESENTATION.md) | Project overview & demo narrative |
| [Getting Started](./docs/getting-started.md) | Install & run |
| [Architecture](./docs/architecture.md) | System design |
| [API](./docs/api.md) | HTTP & Server Actions |
| [Environment](./docs/environment.md) | Environment variables |
| [Deployment](./docs/deployment.md) | Docker & Cloud Run notes |
| [Development](./docs/development.md) | Contributor guide |

---

## License

This project is licensed under the terms of the MIT License. See [LICENSE](LICENSE) for full details.

Copyright © Suryanshu Nabheet.
