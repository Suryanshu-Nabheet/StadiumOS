# Environment Variables

Copy `.env.example` to `.env.local` for local development.

```bash
cp .env.example .env.local
```

## Variables

| Variable | Required | Default | Description |
| -------- | -------- | ------- | ----------- |
| `NEXT_PUBLIC_APP_URL` | No | `http://localhost:3000` | Public app URL (metadata, links) |
| `GEMINI_API_KEY` | No | — | Google Gemini API key for AI assistant |
| `NODE_ENV` | No | `development` | Node environment |
| `SIMULATION_TICK_MS` | No | `3500` | Server config reference for tick interval (ms) |
| `PORT` | No | `3000` | Production server port |

## Gemini API key

1. Create a key in [Google AI Studio](https://aistudio.google.com/apikey)
2. Add to `.env.local`:

```env
GEMINI_API_KEY=AIza...
```

3. Restart dev server

Without a key, the assistant uses **local fallback** intelligence seeded with live simulation context.

Check configuration:

```bash
curl http://localhost:3000/api/health
# "features": { "gemini": true }
```

## Production

Set variables in your hosting provider:

- **Vercel** — Project Settings → Environment Variables
- **Cloud Run** — `--set-env-vars` or Secret Manager
- **Docker Compose** — `.env` file in project root (see `docker-compose.yml`)

Never commit `.env.local` or secrets to git.

## Server access

Server modules read env via `getServerEnv()`:

```ts
import { getServerEnv, isGeminiConfigured } from "@/server/config/env";
```
