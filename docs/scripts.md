# Scripts Reference

All scripts live in `/scripts` and use shared helpers from `scripts/lib/common.sh`.

Make executable once:

```bash
chmod +x scripts/*.sh
```

## Scripts

| Script | Purpose |
| ------ | ------- |
| `./scripts/setup.sh` | First-time setup: install deps, create `.env.local`, verify |
| `./scripts/dev.sh` | Start development server (Turbopack) |
| `./scripts/build.sh` | Production build |
| `./scripts/start.sh` | Run production server (after build) |
| `./scripts/verify.sh` | Full QA: format, lint, typecheck, build |
| `./scripts/clean.sh` | Remove `.next` and caches |
| `./scripts/clean.sh --all` | Also remove `node_modules` |
| `./scripts/docker.sh build` | Build Docker image |
| `./scripts/docker.sh up` | Docker Compose up |
| `./scripts/docker.sh down` | Stop containers |

## pnpm equivalents

| Script | npm/pnpm |
| ------ | -------- |
| setup | `pnpm install` + copy env |
| dev | `pnpm dev` |
| build | `pnpm build` |
| start | `pnpm start` |
| verify | `pnpm format:check && pnpm lint && pnpm typecheck && pnpm build` |
| docker | `pnpm docker:up` |

## Typical workflows

### Hackathon demo prep

```bash
./scripts/setup.sh
./scripts/verify.sh
./scripts/dev.sh
```

### Fresh clone on new machine

```bash
git clone <repo>
cd stadiumos
./scripts/setup.sh
./scripts/dev.sh
```

### Production Docker

```bash
./scripts/docker.sh build
./scripts/docker.sh up
```

### Reset environment

```bash
./scripts/clean.sh --all
./scripts/setup.sh
```

## Requirements enforced

- Node.js **20+**
- **pnpm 10.12.1** (via Corepack if missing)
- Repo root detection automatic from script location
