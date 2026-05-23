# StadiumOS AI

**Enterprise AI-powered stadium crowd intelligence and emergency response platform** for IPL, World Cup, and large-scale cricket events.

Built for **GDG Hackathon** by **Suryanshu Nabheet** — deployed on **Google Cloud Run** (europe-west1).

## Live demo

| | |
|---|---|
| **Production** | **[https://stadiumos-1060302697447.europe-west1.run.app/](https://stadiumos-1060302697447.europe-west1.run.app/)** |
| **Health** | [https://stadiumos-1060302697447.europe-west1.run.app/api/health](https://stadiumos-1060302697447.europe-west1.run.app/api/health) |

### Try it now

| Module | Live URL |
|--------|----------|
| Landing | [stadiumos-1060302697447.europe-west1.run.app](https://stadiumos-1060302697447.europe-west1.run.app/) |
| Command Center | [/dashboard](https://stadiumos-1060302697447.europe-west1.run.app/dashboard) |
| Crowd Flow | [/crowd-flow](https://stadiumos-1060302697447.europe-west1.run.app/crowd-flow) |
| Emergency | [/emergency](https://stadiumos-1060302697447.europe-west1.run.app/emergency) |
| Digital Twin | [/twin](https://stadiumos-1060302697447.europe-west1.run.app/twin) |
| Analytics | [/analytics](https://stadiumos-1060302697447.europe-west1.run.app/analytics) |
| AI Assistant | [/assistant](https://stadiumos-1060302697447.europe-west1.run.app/assistant) |

Brand assets: `public/favicon.svg` · `public/gdg.svg`

## Quick start (local)

```bash
chmod +x scripts/*.sh
./scripts/setup.sh
./scripts/dev.sh
```

Open [http://localhost:3000](http://localhost:3000) → **Launch Command Center**.

Full documentation: **[docs/README.md](./docs/README.md)**

## Problem statement

**The threat** — Massive crowds at cricket matches create dangerous bottlenecks, severe security vulnerabilities, and logistical chaos during highly congested pre- and post-match movements.

**The gap** — Current stadium operations rely on fragmented, manual systems, leaving security and volunteers unable to adapt instantly to rapid crowd surges, unpredictable weather shifts, or emerging threats.

**The need** — Organizers urgently need an integrated, real-time command platform to unify ticketing, dynamically route crowd flow, and automate emergency responses for a safe and seamless fan experience.

## Solution (StadiumOS AI)

| Capability | What it does |
|------------|----------------|
| **Command center** | Live occupancy, KPIs, stadium map, emergencies, traffic |
| **Crowd flow** | Gate pressure, heatmap, AI reroute suggestions |
| **Emergency** | Incidents, dispatch teams, incident reports, evacuation impact |
| **Digital twin** | 132k-seat Motera schematic with live density |
| **Analytics** | Trends, throughput, evac readiness, AI confidence |
| **Assistant** | Gemini copilot on the same live data — no hallucinated dumps on simple chat |

**Live:** [stadiumos-1060302697447.europe-west1.run.app](https://stadiumos-1060302697447.europe-west1.run.app/) · **MIT License** · **GDG Hackathon** · **Suryanshu Nabheet**

## Platform modules

| Module | Route | Production |
|--------|-------|------------|
| Command Center | `/dashboard` | [Open](https://stadiumos-1060302697447.europe-west1.run.app/dashboard) |
| Crowd Flow AI | `/crowd-flow` | [Open](https://stadiumos-1060302697447.europe-west1.run.app/crowd-flow) |
| Emergency Agents | `/emergency` | [Open](https://stadiumos-1060302697447.europe-west1.run.app/emergency) |
| Digital Twin | `/twin` | [Open](https://stadiumos-1060302697447.europe-west1.run.app/twin) |
| Analytics | `/analytics` | [Open](https://stadiumos-1060302697447.europe-west1.run.app/analytics) |
| AI Assistant | `/assistant` | [Open](https://stadiumos-1060302697447.europe-west1.run.app/assistant) |

## Tech stack

Next.js 16 · TypeScript · Tailwind 4 · Zustand · TanStack Query · Recharts · Framer Motion · Gemini AI · Docker · Cloud Run

## Scripts

| Command | Description |
|---------|-------------|
| `./scripts/setup.sh` | Install deps, env, verify |
| `./scripts/dev.sh` | Development server |
| `./scripts/verify.sh` | Lint + typecheck + build |
| `./scripts/build.sh` | Production build |
| `./scripts/docker.sh up` | Docker Compose |

See [docs/scripts.md](./docs/scripts.md) for all scripts.

## Project structure

```
stadiumos/
├── app/              # Routes, API, UI pages
├── server/           # Server layer (services, actions, env)
├── agents/           # AI assistant logic
├── services/         # Simulation engine
├── components/       # React UI
├── docs/             # Full documentation
├── scripts/          # Setup & DevOps automation
├── Dockerfile        # Cloud Run / Cloud Build (repo root)
└── docker/           # Duplicate Dockerfile for local reference
```

## API health check

**Production:**

```bash
curl https://stadiumos-1060302697447.europe-west1.run.app/api/health
```

**Local:**

```bash
curl http://localhost:3000/api/health
```

## Documentation

| Doc | Topic |
|-----|-------|
| [Getting Started](./docs/getting-started.md) | Install & run |
| [Architecture](./docs/architecture.md) | System design |
| [API](./docs/api.md) | HTTP & Server Actions |
| [Environment](./docs/environment.md) | Env variables |
| [Deployment](./docs/deployment.md) | Vercel, Docker, Cloud Run |
| [Development](./docs/development.md) | Contributor guide |

## Author

**Suryanshu Nabheet** — developer, [GDG Hackathon](https://developers.google.com/community/gdg)

## License

MIT — see [LICENSE](LICENSE). Copyright © Suryanshu Nabheet.
