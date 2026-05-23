# API Reference

Base URL (local): `http://localhost:3000`

## Health

### `GET /api/health`

Service health and feature flags.

**Response `200`**

```json
{
  "status": "ok",
  "service": "stadiumos-ai",
  "timestamp": "2026-05-23T12:00:00.000Z",
  "environment": "development",
  "features": {
    "gemini": true,
    "simulation": true
  }
}
```

---

## Simulation

### `GET /api/simulation`

Returns bootstrap stadium telemetry (snapshot + emergencies).

**Response `200`**

```json
{
  "snapshot": { "occupancy": 114840, "gates": [], "heatmap": [], "..." : "..." },
  "emergencies": [{ "id": "inc-001", "type": "heat_exhaustion", "..." : "..." }]
}
```

---

## AI Assistant

### `POST /api/assistant`

Operator copilot query with optional live context.

**Request body**

```json
{
  "message": "Which gate is overloaded?",
  "context": {
    "snapshot": { },
    "emergencies": [ ]
  }
}
```

`context` is optional — server bootstraps mock data if omitted.

**Response `200`**

```json
{
  "text": "**Gate overload analysis**\\n\\n• Most critical: ...",
  "source": "gemini"
}
```

`source` is `"gemini"` or `"local"`.

**Errors**

| Status | Body | Cause |
| ------ | ---- | ----- |
| 400 | `{ "error": "Message is required", "code": "MESSAGE_REQUIRED" }` | Empty message |
| 400 | `{ "error": "Message too long...", "code": "MESSAGE_TOO_LONG" }` | > 4000 chars |
| 500 | `{ "error": "..." }` | Unexpected failure |

---

## Server Actions

Import from `@/server` or specific action files:

| Action | File | Description |
| ------ | ---- | ----------- |
| `askAssistantAction` | `server/actions/assistant.ts` | Typed assistant query |
| `getSimulationBootstrapAction` | `server/actions/simulation.ts` | Bootstrap telemetry |
| `tickSimulationAction` | `server/actions/simulation.ts` | Advance one simulation tick |

Example (client component):

```tsx
import { askAssistantAction } from "@/server/actions/assistant";

const result = await askAssistantAction({ message: "Predict congestion" });
if (result.ok) console.log(result.data.text);
```

---

## Public imports

```ts
import {
  getServerEnv,
  isGeminiConfigured,
  runAssistantQuery,
  getSimulationBootstrap,
  jsonOk,
  jsonError,
} from "@/server";
```
