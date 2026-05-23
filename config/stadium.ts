import { MAP, polar } from "@/lib/stadium-map-layout";
import type { GateZone, StandZone, StadiumPoint } from "@/types/stadium";

const { center: C } = MAP;

export const STADIUM_CENTER = C;

export const gates: GateZone[] = [
  { id: "G1", name: "Gate 1 — North Plaza", ...polar(C.x, C.y, 372, 0), capacity: 14_500 },
  { id: "G2", name: "Gate 2 — NE Club", ...polar(C.x, C.y, 372, 45), capacity: 11_200 },
  { id: "G3", name: "Gate 3 — East Upper", ...polar(C.x, C.y, 372, 90), capacity: 12_800 },
  { id: "G4", name: "Gate 4 — SE Family", ...polar(C.x, C.y, 372, 135), capacity: 10_400 },
  { id: "G5", name: "Gate 5 — South Bowl", ...polar(C.x, C.y, 372, 180), capacity: 16_200 },
  { id: "G6", name: "Gate 6 — SW General", ...polar(C.x, C.y, 372, 225), capacity: 9_800 },
  { id: "G7", name: "Gate 7 — West Lower", ...polar(C.x, C.y, 372, 270), capacity: 11_600 },
  { id: "G8", name: "Gate 8 — NW Media", ...polar(C.x, C.y, 372, 315), capacity: 8_900 },
];

export const stands: StandZone[] = [
  { id: "S1", name: "Adani End (North)", ...polar(C.x, C.y, 298, 0), seats: 33_000 },
  { id: "S2", name: "East Pavilion", ...polar(C.x, C.y, 298, 90), seats: 36_500 },
  { id: "S3", name: "Reliance End (South)", ...polar(C.x, C.y, 298, 180), seats: 34_500 },
  { id: "S4", name: "West Gallery", ...polar(C.x, C.y, 298, 270), seats: 28_000 },
];

/** Stand arc sectors (degrees from north) for SVG rendering. */
export const standSectors: Record<
  string,
  { start: number; end: number }
> = {
  S1: { start: 315, end: 45 },
  S2: { start: 45, end: 135 },
  S3: { start: 135, end: 225 },
  S4: { start: 225, end: 315 },
};

export const pavilions = [
  { id: "PV1", name: "Media Pavilion", ...polar(C.x, C.y, 340, 350), angle: 350 },
  { id: "PV2", name: "VIP Pavilion", ...polar(C.x, C.y, 340, 200), angle: 200 },
];

export const floodlights = [
  { ...polar(C.x, C.y, 388, 45), angle: 45 },
  { ...polar(C.x, C.y, 388, 135), angle: 135 },
  { ...polar(C.x, C.y, 388, 225), angle: 225 },
  { ...polar(C.x, C.y, 388, 315), angle: 315 },
];

export const emergencyExits: StadiumPoint[] = [
  { id: "E1", name: "Exit NE-1", ...polar(C.x, C.y, 330, 55), type: "exit" },
  { id: "E2", name: "Exit SE-1", ...polar(C.x, C.y, 330, 125), type: "exit" },
  { id: "E3", name: "Exit SW-1", ...polar(C.x, C.y, 330, 235), type: "exit" },
  { id: "E4", name: "Exit NW-1", ...polar(C.x, C.y, 330, 305), type: "exit" },
  { id: "E5", name: "Exit N-2 (Plaza)", ...polar(C.x, C.y, 318, 0), type: "exit" },
];

export const medicalZones: StadiumPoint[] = [
  { id: "M1", name: "First Aid — East L1", ...polar(C.x, C.y, 268, 75), type: "medical" },
  { id: "M2", name: "First Aid — West L1", ...polar(C.x, C.y, 268, 285), type: "medical" },
  { id: "M3", name: "Trauma Bay — South", ...polar(C.x, C.y, 255, 175), type: "medical" },
  { id: "M4", name: "Ambulance Staging", ...polar(C.x, C.y, 348, 185), type: "medical" },
];

export const securityCheckpoints: StadiumPoint[] = [
  { id: "SC1", name: "Screening — North", ...polar(C.x, C.y, 355, 0), type: "security" },
  { id: "SC2", name: "Screening — East", ...polar(C.x, C.y, 355, 90), type: "security" },
  { id: "SC3", name: "Screening — South", ...polar(C.x, C.y, 355, 180), type: "security" },
  { id: "SC4", name: "Screening — West", ...polar(C.x, C.y, 355, 270), type: "security" },
];

export const parkingZones: StadiumPoint[] = [
  { id: "P1", name: "P1 — Sardar Patel Ring (N)", ...polar(C.x, C.y, 395, 0), type: "parking" },
  { id: "P2", name: "P2 — Motera Metro Shuttle", ...polar(C.x, C.y, 395, 90), type: "parking" },
  { id: "P3", name: "P3 — South Service Rd", ...polar(C.x, C.y, 395, 180), type: "parking" },
  { id: "P4", name: "P4 — VIP Plaza", ...polar(C.x, C.y, 395, 270), type: "parking" },
];
