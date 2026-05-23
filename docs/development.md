# Development Guide

## Commands

```bash
pnpm dev          # Turbopack dev server
pnpm build        # Production build
pnpm lint         # ESLint
pnpm lint:fix     # Auto-fix lint
pnpm format       # Prettier write
pnpm format:check # Prettier check
pnpm typecheck    # tsc --noEmit
```

Or use `./scripts/*.sh` wrappers — see [Scripts](./scripts.md).

## Adding a new platform module

1. Create page: `app/(platform)/your-module/page.tsx`
2. Add nav item: `config/site.ts` → `navItems`
3. Add icon mapping: `components/layout/platform-sidebar.tsx`
4. Build components under `components/your-module/`
5. Document route in `docs/README.md`

## Server vs client

| Use | Location |
| --- | -------- |
| Secrets, Gemini, validation | `server/` |
| Live ticks, animations | `store/`, client components |
| Shared types | `types/` |
| Pure data transforms | `services/` |

Mark client files with `"use client"`.

## API route pattern

```ts
// app/api/example/route.ts
import { jsonOk, jsonError } from "@/server/lib/response";
import { myService } from "@/server/services/my.service";

export async function GET() {
  try {
    return jsonOk(myService());
  } catch (e) {
    return jsonError(e);
  }
}
```

## Styling

- Global tokens: `app/globals.css` (`:root` and `@theme`)
- Use `GlassCard`, `Badge`, `Button` from `components/ui/`
- Brand colors: cyan `#22d3ee`, blue `#2563eb`, purple accents

## Pre-commit checklist

```bash
./scripts/verify.sh
```

## Debugging

| Issue | Check |
| ----- | ----- |
| AI not using Gemini | `/api/health` → `features.gemini` |
| Charts empty on SSR | Parent needs `min-h-[200px]` |
| Simulation not updating | Platform layout includes `SimulationBoot` |
| Build workspace warning | `turbopack.root` in `next.config.ts` |
