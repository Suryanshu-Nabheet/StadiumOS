"use client";

import {
  gates,
  stands,
  emergencyExits,
  medicalZones,
  securityCheckpoints,
  parkingZones,
} from "@/config/stadium";
import { MAP, mapColors } from "@/lib/stadium-map-layout";
import { zoneColors } from "@/lib/status";
import type { EmergencyIncident } from "@/types/emergency";
import type { RouteSuggestion, StadiumSnapshot, ZoneStatus } from "@/types/stadium";

interface StadiumOverlaysProps {
  snapshot: StadiumSnapshot;
  emergencies: EmergencyIncident[];
  showIncidents: boolean;
  showRoutes: boolean;
  showHeatmap: boolean;
  fieldClipId?: string;
}

function gateById(id?: string) {
  return gates.find((g) => g.id === id);
}

export function StadiumOverlays({
  snapshot,
  emergencies,
  showIncidents,
  showRoutes,
  showHeatmap,
  fieldClipId,
}: StadiumOverlaysProps) {
  const { center, fieldRadius } = MAP;

  return (
    <g aria-label="Live telemetry overlays">
      {showHeatmap && (
        <g clipPath={fieldClipId ? `url(#${fieldClipId})` : undefined} opacity={0.55}>
          {snapshot.heatmap.map((cell) => {
            const angle = (cell.x / 16) * 360;
            const dist = (cell.y / 12) * fieldRadius * 0.92;
            const rad = ((angle - 90) * Math.PI) / 180;
            const x = center.x + dist * Math.cos(rad);
            const y = center.y + dist * Math.sin(rad);
            const hue =
              cell.intensity > 0.75
                ? "239,68,68"
                : cell.intensity > 0.5
                  ? "249,115,22"
                  : "56,189,248";
            return (
              <circle
                key={`${cell.x}-${cell.y}`}
                cx={x}
                cy={y}
                r={fieldRadius / 14}
                fill={`rgba(${hue},${0.15 + cell.intensity * 0.5})`}
              />
            );
          })}
        </g>
      )}

      {stands.map((stand) => {
        const m = snapshot.stands.find((s) => s.id === stand.id);
        const labelPos = { x: stand.x, y: stand.y };
        return (
          <g key={`label-${stand.id}`}>
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#F8FAFC"
              fontSize={9}
              fontWeight={600}
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
            >
              {m ? `${m.density.toFixed(0)}%` : ""}
            </text>
          </g>
        );
      })}

      {gates.map((gate) => {
        const m = snapshot.gates.find((g) => g.id === gate.id);
        const status = (m?.status ?? "normal") as ZoneStatus;
        const color = zoneColors[status];
        const critical = status === "critical";
        return (
          <g key={gate.id}>
            {critical && (
              <circle
                cx={gate.x}
                cy={gate.y}
                r={14}
                fill={color}
                opacity={0.25}
                className="animate-pulse"
              />
            )}
            <circle
              cx={gate.x}
              cy={gate.y}
              r={9}
              fill={color}
              stroke="#fff"
              strokeWidth={2}
            />
            <text
              x={gate.x}
              y={gate.y + 20}
              textAnchor="middle"
              fill="#334155"
              fontSize={7}
              fontWeight={600}
            >
              {gate.id}
            </text>
          </g>
        );
      })}

      {parkingZones.map((p) => (
        <g key={p.id}>
          <rect
            x={p.x - 9}
            y={p.y - 9}
            width={18}
            height={18}
            rx={3}
            fill="#FEF3C7"
            stroke="#D97706"
            strokeWidth={1}
          />
          <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize={8} fill="#92400E" fontWeight={700}>
            P
          </text>
        </g>
      ))}

      {emergencyExits.map((e) => (
        <polygon
          key={e.id}
          points={`${e.x},${e.y - 8} ${e.x + 8},${e.y + 6} ${e.x - 8},${e.y + 6}`}
          fill="#22C55E"
          stroke="#15803D"
          strokeWidth={1}
        />
      ))}

      {medicalZones.map((m) => (
        <g key={m.id}>
          <circle cx={m.x} cy={m.y} r={10} fill="#FCE7F3" stroke="#DB2777" strokeWidth={1.5} />
          <text x={m.x} y={m.y + 3.5} textAnchor="middle" fontSize={10} fill="#9D174D" fontWeight={700}>
            +
          </text>
        </g>
      ))}

      {securityCheckpoints.map((s) => (
        <rect
          key={s.id}
          x={s.x - 6}
          y={s.y - 6}
          width={12}
          height={12}
          rx={2}
          fill="#2563EB"
          stroke="#fff"
          strokeWidth={1}
        />
      ))}

      {showRoutes &&
        snapshot.routes.map((route: RouteSuggestion) => {
          const from = gateById(route.fromGateId);
          const to = gateById(route.toGateId);
          if (!from || !to) return null;
          const mx = (from.x + to.x) / 2;
          const my = (from.y + to.y) / 2 - 30;
          return (
            <g key={route.id}>
              <path
                d={`M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`}
                fill="none"
                stroke={mapColors.skyRoute}
                strokeWidth={3}
                strokeDasharray="10 6"
                opacity={0.9}
              />
              <circle cx={to.x} cy={to.y} r={5} fill={mapColors.skyRoute} stroke="#fff" strokeWidth={1.5} />
            </g>
          );
        })}

      {showIncidents &&
        emergencies
          .filter((inc) => inc.status !== "resolved")
          .map((inc) => (
              <g key={inc.id}>
                <circle
                  cx={inc.coordinates.x}
                  cy={inc.coordinates.y}
                  r={16}
                  fill="#EF4444"
                  fillOpacity={0.28}
                  stroke="#EF4444"
                  strokeWidth={2}
                  className="animate-pulse"
                />
                <circle cx={inc.coordinates.x} cy={inc.coordinates.y} r={5} fill="#B91C1C" />
              </g>
          ))}
    </g>
  );
}
