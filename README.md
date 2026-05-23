# StadiumOS AI

**Enterprise AI-powered stadium crowd intelligence and emergency response platform** for IPL, World Cup, and large-scale cricket events.

Built for **GDG Hackathon** by **Suryanshu Nabheet** — Google Cloud deployment ready.

Brand assets: `public/favicon.svg` · `public/gdg.svg`

## Quick start

```bash
chmod +x scripts/*.sh
./scripts/setup.sh
./scripts/dev.sh
```

Open [http://localhost:3000](http://localhost:3000) → **Launch Command Center**.

Full documentation: **[docs/README.md](./docs/README.md)**

## Problem

| | |
|---|---|
| **Threat** | Massive crowds create dangerous bottlenecks, security vulnerabilities, and logistical chaos. |
| **Gap** | Fragmented manual systems — teams cannot adapt to surges, weather, or threats in real time. |
| **Need** | Integrated command platform: ticketing, crowd routing, automated emergency response. |

## Platform modules

| Module | Route |
|--------|-------|
| Command Center | `/dashboard` |
| Crowd Flow AI | `/crowd-flow` |
| Emergency Agents | `/emergency` |
| Digital Twin | `/twin` |
| Analytics | `/analytics` |
| AI Assistant | `/assistant` |

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
