import type { GateZone, StandZone, StadiumPoint } from "@/types/stadium";

export const STADIUM_CENTER = { x: 400, y: 320 };

export const gates: GateZone[] = [
  { id: "G1", name: "Gate A — North", x: 400, y: 80, capacity: 12000 },
  { id: "G2", name: "Gate B — NE", x: 620, y: 140, capacity: 10000 },
  { id: "G3", name: "Gate C — East", x: 720, y: 320, capacity: 11000 },
  { id: "G4", name: "Gate D — SE", x: 620, y: 500, capacity: 9500 },
  { id: "G5", name: "Gate E — South", x: 400, y: 560, capacity: 13000 },
  { id: "G6", name: "Gate F — SW", x: 180, y: 500, capacity: 9000 },
  { id: "G7", name: "Gate G — West", x: 80, y: 320, capacity: 10500 },
  { id: "G8", name: "Gate H — NW", x: 180, y: 140, capacity: 8800 },
];

export const stands: StandZone[] = [
  { id: "S1", name: "North Stand", x: 400, y: 180, seats: 28000 },
  { id: "S2", name: "East Pavilion", x: 580, y: 320, seats: 32000 },
  { id: "S3", name: "South Stand", x: 400, y: 460, seats: 30000 },
  { id: "S4", name: "West Stand", x: 220, y: 320, seats: 26000 },
];

export const emergencyExits: StadiumPoint[] = [
  { id: "E1", name: "Exit NE-1", x: 650, y: 200, type: "exit" },
  { id: "E2", name: "Exit SE-1", x: 650, y: 440, type: "exit" },
  { id: "E3", name: "Exit SW-1", x: 150, y: 440, type: "exit" },
  { id: "E4", name: "Exit NW-1", x: 150, y: 200, type: "exit" },
];

export const medicalZones: StadiumPoint[] = [
  { id: "M1", name: "Medical Bay 1", x: 520, y: 250, type: "medical" },
  { id: "M2", name: "Medical Bay 2", x: 280, y: 250, type: "medical" },
  { id: "M3", name: "Trauma Unit", x: 400, y: 400, type: "medical" },
];

export const securityCheckpoints: StadiumPoint[] = [
  { id: "SC1", name: "Security CP-1", x: 500, y: 120, type: "security" },
  { id: "SC2", name: "Security CP-2", x: 300, y: 120, type: "security" },
  { id: "SC3", name: "Security CP-3", x: 500, y: 520, type: "security" },
  { id: "SC4", name: "Security CP-4", x: 300, y: 520, type: "security" },
];

export const parkingZones: StadiumPoint[] = [
  { id: "P1", name: "Parking North", x: 400, y: 30, type: "parking" },
  { id: "P2", name: "Parking East", x: 750, y: 320, type: "parking" },
  { id: "P3", name: "Parking South", x: 400, y: 610, type: "parking" },
  { id: "P4", name: "Parking West", x: 50, y: 320, type: "parking" },
];
