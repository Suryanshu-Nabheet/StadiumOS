# Deployment

## Pre-deploy checklist

```bash
./scripts/verify.sh
```

Ensure `.env` variables are set in target environment (see [Environment](./environment.md)).

---

## Vercel (fastest)

1. Push repo to GitHub
2. Import project in Vercel
3. Framework preset: **Next.js**
4. Build command: `pnpm build`
5. Install command: `pnpm install`
6. Environment variables:
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_APP_URL` → production URL

---

## Docker

### Local

```bash
./scripts/docker.sh up
# or
pnpm docker:up
```

App: http://localhost:3000

### Build only

```bash
./scripts/docker.sh build
docker run -p 3000:3000 -e GEMINI_API_KEY=xxx stadiumos-ai
```

Dockerfile: **`/Dockerfile`** at repository root (required for Cloud Build / Cloud Run GitHub deploy).

`docker/Dockerfile` is a copy for local scripts; **GCP must see `Dockerfile` in the repo root.**

---

## Google Cloud Run

### GitHub → Cloud Run (Cloud Build)

The default build runs:

```text
docker build -f Dockerfile .
```

Ensure **`Dockerfile`**, **`.dockerignore`**, and **`.gcloudignore`** exist at the **root** of `main` (not only under `docker/`).

### 1. Build and push image (manual)

```bash
export PROJECT_ID=your-gcp-project
export REGION=europe-west1

gcloud auth configure-docker ${REGION}-docker.pkg.dev

docker build -f Dockerfile -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/stadiumos/stadiumos:latest .
docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/stadiumos/stadiumos:latest
```

### 2. Deploy

```bash
gcloud run deploy stadiumos-ai \
  --image ${REGION}-docker.pkg.dev/${PROJECT_ID}/stadiumos/stadiumos-ai:latest \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars "NEXT_PUBLIC_APP_URL=https://YOUR_SERVICE_URL,GEMINI_API_KEY=YOUR_KEY"
```

### 3. Verify

**Live deployment (GDG / Cloud Run):**

```bash
curl https://stadiumos-1060302697447.europe-west1.run.app/api/health
```

Generic:

```bash
curl https://YOUR_SERVICE_URL/api/health
```

---

## Production notes

- `next.config.ts` uses `output: "standalone"` for Docker
- Health endpoint: `/api/health` for load balancers
- Simulation runs client-side — no server WebSocket required for demo
- Store Gemini key in **Secret Manager** for Cloud Run production

---

## Rollback

Cloud Run:

```bash
gcloud run services update-traffic stadiumos-ai --to-revisions PREVIOUS=100
```

Vercel: redeploy previous deployment from dashboard.
