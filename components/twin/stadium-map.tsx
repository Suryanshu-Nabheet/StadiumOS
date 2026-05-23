"use client";

import {
  gates,
  stands,
  emergencyExits,
  medicalZones,
  securityCheckpoints,
} from "@/config/stadium";
import { useStadium } from "@/hooks/use-stadium";
import type { ZoneStatus } from "@/types/stadium";

const statusColors: Record<ZoneStatus, string> = {
  normal: "#0ea5e9",
  elevated: "#38bdf8",
  congested: "#f59e0b",
  critical: "#ef4444",
};

interface StadiumMapProps {
  showIncidents?: boolean;
  showRoutes?: boolean;
  className?: string;
}

export function StadiumMap({
  showIncidents = true,
  showRoutes = false,
  className,
}: StadiumMapProps) {
  const { snapshot, emergencies } = useStadium();

  return (
    <svg
      viewBox="0 0 800 640"
      className={className}
      role="img"
      aria-label="Stadium digital twin map"
    >
      <defs>
        <radialGradient id="pitchGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="640" fill="#f8fafc" rx="12" />
      <rect
        x="40"
        y="40"
        width="720"
        height="560"
        rx="120"
        fill="url(#pitchGlow)"
        stroke="#e2e8f0"
        strokeWidth="2"
      />
      <ellipse
        cx="400"
        cy="320"
        rx="80"
        ry="100"
        fill="none"
        stroke="#bae6fd"
        strokeWidth="2"
      />
      <rect
        x="360"
        y="280"
        width="80"
        height="80"
        rx="4"
        fill="#e0f2fe"
        stroke="#7dd3fc"
        strokeWidth="1"
      />

      {stands.map((stand) => {
        const metrics = snapshot.stands.find((s) => s.id === stand.id);
        const color = statusColors[metrics?.status ?? "normal"];
        return (
          <g key={stand.id}>
            <circle
              cx={stand.x}
              cy={stand.y}
              r={55}
              fill={color}
              fillOpacity={0.15}
              stroke={color}
              strokeWidth={2}
            />
            <text
              x={stand.x}
              y={stand.y + 70}
              textAnchor="middle"
              fill="#64748b"
              fontSize="10"
            >
              {stand.name}
            </text>
          </g>
        );
      })}

      {gates.map((gate) => {
        const metrics = snapshot.gates.find((g) => g.id === gate.id);
        const color = statusColors[metrics?.status ?? "normal"];
        return (
          <g key={gate.id}>
            <rect
              x={gate.x - 24}
              y={gate.y - 12}
              width={48}
              height={24}
              rx={6}
              fill={color}
              fillOpacity={0.25}
              stroke={color}
              strokeWidth={2}
            />
            <text
              x={gate.x}
              y={gate.y + 28}
              textAnchor="middle"
              fill="#475569"
              fontSize="9"
            >
              {gate.name.split("—")[0]}
            </text>
          </g>
        );
      })}

      {emergencyExits.map((e) => (
        <polygon
          key={e.id}
          points={`${e.x},${e.y - 10} ${e.x + 10},${e.y + 8} ${e.x - 10},${e.y + 8}`}
          fill="#10b981"
          fillOpacity={0.8}
        />
      ))}

      {medicalZones.map((m) => (
        <g key={m.id}>
          <rect
            x={m.x - 14}
            y={m.y - 14}
            width={28}
            height={28}
            rx={4}
            fill="#fce7f3"
            stroke="#ec4899"
            strokeWidth={1}
          />
          <text x={m.x} y={m.y + 4} textAnchor="middle" fill="#be185d" fontSize="10">
            +
          </text>
        </g>
      ))}

      {securityCheckpoints.map((s) => (
        <circle
          key={s.id}
          cx={s.x}
          cy={s.y}
          r={8}
          fill="#2563eb"
          fillOpacity={0.7}
        />
      ))}

      {showIncidents &&
        emergencies.map((inc) => (
          <g key={inc.id}>
            <circle
              cx={inc.coordinates.x}
              cy={inc.coordinates.y}
              r={12}
              fill="#ef4444"
              fillOpacity={0.35}
              stroke="#ef4444"
              strokeWidth={2}
            />
          </g>
        ))}

      {showRoutes &&
        snapshot.routes.map((_, i) => (
          <line
            key={i}
            x1={200 + i * 100}
            y1={320}
            x2={500 + i * 50}
            y2={280}
            stroke="#0ea5e9"
            strokeWidth={2}
            strokeDasharray="6 4"
            opacity={0.8}
          />
        ))}
    </svg>
  );
}
