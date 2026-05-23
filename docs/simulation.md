# Simulation Engine

StadiumOS AI uses a **mock real-time telemetry engine** for hackathon demos. Data is realistic but simulated — not connected to live stadium sensors.

## How it works

| Layer | File | Role |
| ----- | ---- | ---- |
| Mock data | `services/mock-data.ts` | Initial gates, KPIs, incidents, heatmap |
| Engine | `services/simulation-engine.ts` | `tickSimulation()` mutations |
| Server | `server/services/simulation.service.ts` | API/action wrapper |
| Client | `store/stadium-store.ts` | Zustand + 3.5s interval |

## Tick cycle

Every **3.5 seconds** (client-side):

1. Gate/stand density shifts ± random delta
2. Heatmap cells pulse
3. Occupancy and crowd stress update
4. AI agent feed refreshes
5. ~12% chance of new emergency incident
6. Incidents may advance `detected` → `dispatching` → `responding`

Start/stop via store:

```ts
useStadiumStore.getState().startSimulation();
useStadiumStore.getState().stopSimulation();
```

## Bootstrap via API

```bash
curl http://localhost:3000/api/simulation | jq '.snapshot.occupancy'
```

## Stadium model

Configured in `config/stadium.ts`:

- 8 gates (A–H)
- 4 stands
- 4 emergency exits
- 3 medical bays
- 4 security checkpoints
- 4 parking zones

Digital twin renders these in `components/twin/stadium-map.tsx`.

## Extending to real data

Replace `tickSimulation()` with:

1. WebSocket subscriber → `useStadiumStore.getState().hydrate()`
2. Or TanStack Query polling `GET /api/simulation` from real backend
3. Keep `types/stadium.ts` contracts stable

Server layer (`server/services/simulation.service.ts`) becomes the integration point.
