# StadiumOS AI — Documentation

Enterprise AI stadium operations platform for GDG Hackathon and production demos.

**Developer:** Suryanshu Nabheet · **Event:** GDG Hackathon

## Quick links

| Document | Description |
| -------- | ----------- |
| **[Presentation (judges)](./PRESENTATION.md)** | **Full pitch script, demo flow, Q&A** |
| [Getting Started](./getting-started.md) | Install, setup, first run |
| [Architecture](./architecture.md) | System design and data flow |
| [API Reference](./api.md) | HTTP routes and server actions |
| [Environment](./environment.md) | Variables and configuration |
| [Scripts](./scripts.md) | Shell automation reference |
| [Simulation Engine](./simulation.md) | Mock telemetry and live updates |
| [Development](./development.md) | Coding standards and workflows |
| [Deployment](./deployment.md) | Docker, Vercel, Google Cloud Run |

## One-command start

```bash
chmod +x scripts/*.sh
./scripts/setup.sh
./scripts/dev.sh
```

Open **http://localhost:3000** → **Launch Command Center**.

## Application routes

| Route | Module |
| ----- | ------ |
| `/` | Landing page |
| `/dashboard` | Command Center |
| `/crowd-flow` | AI Crowd Flow Engine |
| `/emergency` | Emergency Response Agents |
| `/twin` | Digital Twin Stadium |
| `/analytics` | Analytics Engine |
| `/assistant` | AI Command Assistant |

## Credits

- **Suryanshu Nabheet** — project developer (GDG Hackathon)
- Co-brand: StadiumOS AI × Google Developer Groups

## Support

- Root README: [../README.md](../README.md)
- License: [../LICENSE](../LICENSE)
