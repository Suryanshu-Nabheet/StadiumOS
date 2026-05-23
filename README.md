# StadiumOS

**GDG Hackathon** — integrated, real-time stadium operations platform for safer cricket match days.

> **Status:** Boilerplate only. This repo is set up for development; the product is not built yet.

## Problem

### The threat

Massive crowds at cricket matches create dangerous bottlenecks, severe security vulnerabilities, and logistical chaos during highly congested pre- and post-match movement.

### The gap

Current stadium operations rely on fragmented, manual systems. Security and volunteers cannot adapt instantly to rapid crowd surges, unpredictable weather, or emerging threats.

### The need

Organizers need an integrated, real-time command platform to unify ticketing, dynamically route crowd flow, and automate emergency responses—for a safe and seamless fan experience.

## What we are building

StadiumOS is a **unified command layer** for stadium operations—not another point tool. The hackathon target is a platform that helps organizers:

| Area | Direction |
| ---- | --------- |
| **Operations dashboard** | Single view of crowd density, gates, and incidents |
| **Ticketing integration** | Align entry flow with live attendance and capacity |
| **Crowd routing** | Dynamic guidance when surges or bottlenecks appear |
| **Emergency playbooks** | Faster, coordinated response when threats escalate |

Exact scope and MVP features will be defined and implemented during the hackathon.

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI | [React](https://react.dev/) 19 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 4 |
| Language | TypeScript |
| Package manager | [pnpm](https://pnpm.io/) 10 |

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/installation) 10+

Enable Corepack once (bundled with Node):

```bash
corepack enable
```

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| ------- | ----------- |
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm lint` | ESLint |

## Project structure

```
stadiumos/
├── app/
│   ├── layout.tsx      # Root layout, metadata, favicon
│   ├── page.tsx        # Home (placeholder — replace during hackathon)
│   └── globals.css     # Global styles & theme tokens
├── public/
│   └── favicon.svg     # StadiumOS favicon
├── package.json
└── pnpm-lock.yaml
```

## Brand assets

- **Favicon:** `public/favicon.svg` (wired in `app/layout.tsx`)

Add logos, banners, and partner assets under `public/` as the team produces them.

## License

MIT — see [LICENSE](LICENSE).
