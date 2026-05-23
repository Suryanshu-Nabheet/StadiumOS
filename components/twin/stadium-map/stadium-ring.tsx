import type { ReactNode } from "react";
import {
  floodlights,
  pavilions,
  standSectors,
  stands,
} from "@/config/stadium";
import { MAP, mapColors, polar, standArcPath } from "@/lib/stadium-map-layout";
import { zoneColors } from "@/lib/status";
import type { ZoneMetrics, ZoneStatus } from "@/types/stadium";

interface StadiumRingProps {
  standMetrics: ZoneMetrics[];
}

function StandRows({ startDeg, endDeg }: { startDeg: number; endDeg: number }) {
  const rows = 5;
  const lines: ReactNode[] = [];
  for (let i = 1; i <= rows; i++) {
    const t = i / (rows + 1);
    const deg = startDeg + (endDeg - startDeg) * t;
    const inner = polar(MAP.center.x, MAP.center.y, MAP.innerRing + 8, deg);
    const outer = polar(MAP.center.x, MAP.center.y, MAP.outerRing - 10, deg);
    lines.push(
      <line
        key={i}
        x1={inner.x}
        y1={inner.y}
        x2={outer.x}
        y2={outer.y}
        stroke={mapColors.standRow}
        strokeWidth={0.8}
        opacity={0.55}
      />,
    );
  }
  return <g>{lines}</g>;
}

function Pavilion({ x, y, angle }: { x: number; y: number; angle: number }) {
  const w = 36;
  const h = 22;
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle})`}>
      <polygon
        points={`${-w / 2},${-h / 2} 0,${-h / 2 - 10} ${w / 2},${-h / 2}`}
        fill={mapColors.pavilionRoof}
      />
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx={2}
        fill={mapColors.pavilion}
        stroke={mapColors.pavilionRoof}
        strokeWidth={1}
      />
      {[ -10, 0, 10 ].map((dx) => (
        <rect
          key={dx}
          x={dx - 3}
          y={-4}
          width={6}
          height={4}
          rx={0.5}
          fill={mapColors.standRow}
          opacity={0.9}
        />
      ))}
    </g>
  );
}

function Floodlight({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle + 180})`}>
      <line x1={0} y1={0} x2={0} y2={18} stroke={mapColors.floodlight} strokeWidth={2} />
      <rect
        x={-10}
        y={-8}
        width={20}
        height={10}
        rx={1}
        fill={mapColors.floodlight}
        stroke={mapColors.floodlightGlow}
        strokeWidth={1}
      />
      <ellipse cx={0} cy={-12} rx={14} ry={6} fill={mapColors.floodlightGlow} opacity={0.35} />
    </g>
  );
}

export function StadiumRing({ standMetrics }: StadiumRingProps) {
  const { center, innerRing, outerRing } = MAP;

  return (
    <g aria-label="Stadium infrastructure ring">
      <circle
        cx={center.x}
        cy={center.y}
        r={outerRing}
        fill={mapColors.ring}
        stroke={mapColors.ringLight}
        strokeWidth={2}
      />
      <circle cx={center.x} cy={center.y} r={innerRing} fill={mapColors.ring} />

      {stands.map((stand) => {
        const sector = standSectors[stand.id];
        const metrics = standMetrics.find((s) => s.id === stand.id);
        const status = (metrics?.status ?? "normal") as ZoneStatus;
        const tint = zoneColors[status];
        const density = metrics?.density ?? 0;
        if (!sector) return null;

        return (
          <g key={stand.id}>
            <path
              d={standArcPath(sector.start, sector.end, innerRing + 4, outerRing - 6)}
              fill={mapColors.stand}
              stroke={tint}
              strokeWidth={2}
              fillOpacity={0.55 + density / 250}
            />
            <StandRows startDeg={sector.start} endDeg={sector.end} />
          </g>
        );
      })}

      {pavilions.map((p) => (
        <Pavilion key={p.id} x={p.x} y={p.y} angle={p.angle} />
      ))}

      {floodlights.map((f, i) => (
        <Floodlight key={i} x={f.x} y={f.y} angle={f.angle} />
      ))}
    </g>
  );
}
