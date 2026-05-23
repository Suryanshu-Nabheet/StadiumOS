/** Circular Motera schematic — shared layout math & palette (reference twin). */

export const MAP = {
  viewBox: 800,
  center: { x: 400, y: 400 },
  fieldRadius: 218,
  circle30Yard: 145,
  innerRing: 252,
  outerRing: 372,
  pitch: { w: 44, h: 112 },
} as const;

export const mapColors = {
  grassDark: "#4B7946",
  grassLight: "#6A9B5E",
  pitch: "#D2B48C",
  pitchLine: "#F5F5DC",
  ring: "#4A606E",
  ringLight: "#5C7382",
  stand: "#B8BFC6",
  standRow: "#E2E8F0",
  pavilion: "#8B5A46",
  pavilionRoof: "#6D4C3D",
  floodlight: "#94A3B8",
  floodlightGlow: "#CBD5E1",
  line: "#FFFFFF",
  wicket: "#DC2626",
  skyRoute: "#38BDF8",
} as const;

/** Degrees clockwise from north (12 o'clock). */
export function polar(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number,
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: Math.round(cx + r * Math.cos(rad)),
    y: Math.round(cy + r * Math.sin(rad)),
  };
}

export function polarToGrid(
  x: number,
  y: number,
  cols = 16,
  rows = 12,
): { col: number; row: number } {
  const { center, fieldRadius } = MAP;
  const col = Math.round(((x - center.x) / fieldRadius + 1) * 0.5 * (cols - 1));
  const row = Math.round(((y - center.y) / fieldRadius + 1) * 0.5 * (rows - 1));
  return {
    col: Math.max(0, Math.min(cols - 1, col + cols / 2)),
    row: Math.max(0, Math.min(rows - 1, row + rows / 2)),
  };
}

/** SVG arc path for a stand sector (degrees from north). */
export function standArcPath(
  startDeg: number,
  endDeg: number,
  innerR: number,
  outerR: number,
): string {
  const { center } = MAP;
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const x1 = center.x + innerR * Math.cos(toRad(startDeg));
  const y1 = center.y + innerR * Math.sin(toRad(startDeg));
  const x2 = center.x + outerR * Math.cos(toRad(startDeg));
  const y2 = center.y + outerR * Math.sin(toRad(startDeg));
  let span = endDeg - startDeg;
  if (span <= 0) span += 360;
  const large = span > 180 ? 1 : 0;
  const endNorm = startDeg + span;
  const x3 = center.x + outerR * Math.cos(toRad(endNorm));
  const y3 = center.y + outerR * Math.sin(toRad(endNorm));
  const x4 = center.x + innerR * Math.cos(toRad(endNorm));
  const y4 = center.y + innerR * Math.sin(toRad(endNorm));
  return [
    `M ${x1} ${y1}`,
    `L ${x2} ${y2}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${x3} ${y3}`,
    `L ${x4} ${y4}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${x1} ${y1}`,
    "Z",
  ].join(" ");
}
