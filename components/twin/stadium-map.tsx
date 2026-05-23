"use client";

import { gates, stands, emergencyExits, medicalZones, securityCheckpoints } from "@/config/stadium";
import { useStadium } from "@/hooks/use-stadium";
import { motion } from "framer-motion";
import type { ZoneStatus } from "@/types/stadium";

const statusColors: Record<ZoneStatus, string> = {
  normal: "#22d3ee",
  elevated: "#fbbf24",
  congested: "#f97316",
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
  const allZones = [...snapshot.gates, ...snapshot.stands];

  return (
    <svg
      viewBox="0 0 800 640"
      className={className}
      role="img"
      aria-label="Stadium digital twin map"
    >
      <defs>
        <radialGradient id="pitchGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="800" height="640" fill="#050508" rx="16" />
      <rect x="40" y="40" width="720" height="560" rx="120" fill="url(#pitchGlow)" stroke="#ffffff15" strokeWidth="2" />
      <ellipse cx="400" cy="320" rx="80" ry="100" fill="none" stroke="#22d3ee30" strokeWidth="2" />
      <rect x="360" y="280" width="80" height="80" rx="4" fill="#22d3ee08" stroke="#22d3ee40" />

      {stands.map((stand) => {
        const metrics = snapshot.stands.find((s) => s.id === stand.id);
        const color = statusColors[metrics?.status ?? "normal"];
        return (
          <g key={stand.id}>
            <motion.circle
              cx={stand.x}
              cy={stand.y}
              r={55}
              fill={color}
              fillOpacity={0.12}
              stroke={color}
              strokeWidth={2}
              animate={{ fillOpacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <text x={stand.x} y={stand.y + 70} textAnchor="middle" fill="#a1a1aa" fontSize="10">
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
              fillOpacity={0.35}
              stroke={color}
              filter="url(#glow)"
            />
            <text x={gate.x} y={gate.y + 28} textAnchor="middle" fill="#e4e4e7" fontSize="9">
              {gate.name.split("—")[0]}
            </text>
          </g>
        );
      })}

      {emergencyExits.map((e) => (
        <g key={e.id}>
          <polygon
            points={`${e.x},${e.y - 10} ${e.x + 10},${e.y + 8} ${e.x - 10},${e.y + 8}`}
            fill="#10b981"
            fillOpacity={0.6}
          />
        </g>
      ))}

      {medicalZones.map((m) => (
        <g key={m.id}>
          <rect x={m.x - 14} y={m.y - 14} width={28} height={28} rx={4} fill="#ec4899" fillOpacity={0.4} stroke="#ec4899" />
          <text x={m.x} y={m.y + 4} textAnchor="middle" fill="white" fontSize="8">
            +
          </text>
        </g>
      ))}

      {securityCheckpoints.map((s) => (
        <circle key={s.id} cx={s.x} cy={s.y} r={8} fill="#8b5cf6" fillOpacity={0.7} />
      ))}

      {showIncidents &&
        emergencies.map((inc) => (
          <motion.g
            key={inc.id}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <circle cx={inc.coordinates.x} cy={inc.coordinates.y} r={14} fill="#ef4444" fillOpacity={0.5} stroke="#ef4444" strokeWidth={2} />
          </motion.g>
        ))}

      {showRoutes &&
        snapshot.routes.map((route, i) => (
          <line
            key={route.id}
            x1={200 + i * 100}
            y1={320}
            x2={500 + i * 50}
            y2={280}
            stroke="#22d3ee"
            strokeWidth={2}
            strokeDasharray="8 4"
            opacity={0.7}
          />
        ))}

      {allZones
        .filter((z) => z.status === "critical" || z.status === "congested")
        .slice(0, 3)
        .map((z, i) => {
          const gate = gates.find((g) => g.id === z.id);
          const stand = stands.find((s) => s.id === z.id);
          const point = gate ?? stand;
          if (!point) return null;
          return (
            <text
              key={z.id}
              x={point.x}
              y={point.y - 20 - i * 8}
              textAnchor="middle"
              fill="#ef4444"
              fontSize="9"
            >
              {z.density.toFixed(0)}%
            </text>
          );
        })}
    </svg>
  );
}
