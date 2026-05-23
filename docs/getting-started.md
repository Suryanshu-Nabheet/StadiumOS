# Getting Started

## Prerequisites

| Tool | Version |
| ---- | ------- |
| Node.js | 20+ |
| pnpm | 10+ (via Corepack) |
| Git | any recent |

Optional:

- **Docker** — containerized runs
- **Gemini API key** — live AI assistant (local fallback works without it)

## Setup (recommended)

From the repository root:

```bash
chmod +x scripts/*.sh
./scripts/setup.sh
```

This will:

1. Verify Node.js 20+
2. Enable pnpm via Corepack
3. Install dependencies
4. Create `.env.local` from `.env.example`
5. Run typecheck and lint

## Manual setup

```bash
corepack enable
pnpm install
cp .env.example .env.local
pnpm dev
```

## Environment

Edit `.env.local`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
GEMINI_API_KEY=your_key_here   # optional
```

See [Environment](./environment.md) for all variables.

## Run development

```bash
./scripts/dev.sh
# or
pnpm dev
```

| URL | Purpose |
| --- | ------- |
| http://localhost:3000 | Landing |
| http://localhost:3000/dashboard | Command Center |
| http://localhost:3000/api/health | Health check |

## Production build

```bash
./scripts/build.sh
./scripts/start.sh
```

## Verify before demo

```bash
./scripts/verify.sh
```

Runs Prettier, ESLint, TypeScript, and production build.

## Next steps

- Read [Architecture](./architecture.md)
- Configure [Gemini](./environment.md#gemini_api_key)
- Deploy with [Deployment](./deployment.md)
