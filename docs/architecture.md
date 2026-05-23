# Architecture

## Overview

StadiumOS AI is a **Next.js full-stack application** with a clear separation between UI, client state, domain services, and a dedicated **server layer**.

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (Client)                      │
│  React UI · Framer Motion · Recharts · Zustand store        │
│  TanStack Query · Simulation tick (3.5s)                    │
└───────────────────────────┬─────────────────────────────────┘
                            │ fetch / Server Actions
┌───────────────────────────▼─────────────────────────────────┐
│                    Next.js App Router                        │
│  app/(platform)/*  ·  app/api/*  ·  server/actions/*        │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      Server Layer (`/server`)                  │
│  config/env · services · lib/errors · lib/response          │
└───────────────────────────┬─────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
   agents/            services/           config/
 (Gemini AI)      (simulation-engine)    (stadium, site)
```

## Directory map

| Path | Responsibility |
| ---- | -------------- |
| `app/` | Routes, layouts, API handlers |
| `server/` | Server-only business logic, env, API helpers |
| `agents/` | AI operator assistant (Gemini + fallback) |
| `services/` | Simulation engine and mock data generators |
| `store/` | Zustand client state for live telemetry |
| `components/` | UI modules (dashboard, twin, analytics, etc.) |
| `hooks/` | React hooks (`useStadium`, `useSimulation`) |
| `types/` | Shared TypeScript contracts |
| `config/` | Static stadium and site configuration |
| `scripts/` | DevOps shell automation |

## Data flow

### Live simulation (client)

1. `SimulationBoot` mounts on platform layout
2. `ensureSimulationLoop()` starts a 3.5s interval
3. `tickSimulation()` mutates gates, heatmap, incidents, agents
4. Components subscribe via `useStadiumStore` / `useStadium`

### API bootstrap (optional)

`GET /api/simulation` returns initial snapshot for TanStack Query or external consumers.

### AI assistant

1. User sends message from `/assistant`
2. `POST /api/assistant` → `runAssistantQuery()` in server service
3. Context includes live `snapshot` + `emergencies` from client
4. Gemini API if `GEMINI_API_KEY` set; else local rule-based fallback

## Module boundaries

- **UI components** must not import `@google/generative-ai` directly
- **API routes** are thin — delegate to `server/services`
- **Server Actions** (`server/actions/*`) wrap services for RSC/forms
- **Client store** owns real-time tick; server owns stateless requests

## Tech choices

| Concern | Choice |
| ------- | ------ |
| Framework | Next.js 16 App Router + Turbopack |
| Styling | Tailwind CSS 4, sky-blue / white design tokens (`config/theme.ts`) |
| State | Zustand (live), TanStack Query (optional fetch) |
| Charts | Recharts |
| AI | Google Generative AI (Gemini 2.0 Flash) |
| Deploy | Standalone output, Docker, Cloud Run |

See [Simulation Engine](./simulation.md) for telemetry details.
