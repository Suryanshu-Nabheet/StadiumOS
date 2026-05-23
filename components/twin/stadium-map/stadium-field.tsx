import { MAP, mapColors } from "@/lib/stadium-map-layout";

const STRIPE_COUNT = 24;

export function StadiumField({ clipId = "fieldClip" }: { clipId?: string }) {
  const { center, fieldRadius, circle30Yard, pitch } = MAP;
  const stripes = Array.from({ length: STRIPE_COUNT }, (_, i) => {
    const x = center.x - fieldRadius + (i * (fieldRadius * 2)) / STRIPE_COUNT;
    const w = (fieldRadius * 2) / STRIPE_COUNT + 1;
    return (
      <rect
        key={i}
        x={x}
        y={center.y - fieldRadius}
        width={w}
        height={fieldRadius * 2}
        fill={i % 2 === 0 ? mapColors.grassDark : mapColors.grassLight}
      />
    );
  });

  const px = center.x - pitch.w / 2;
  const py = center.y - pitch.h / 2;
  const creaseInset = 8;

  return (
    <g aria-label="Cricket field">
      <defs>
        <clipPath id={clipId}>
          <circle cx={center.x} cy={center.y} r={fieldRadius} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>{stripes}</g>

      <circle
        cx={center.x}
        cy={center.y}
        r={fieldRadius}
        fill="none"
        stroke={mapColors.line}
        strokeWidth={2}
        opacity={0.9}
      />
      <circle
        cx={center.x}
        cy={center.y}
        r={circle30Yard}
        fill="none"
        stroke={mapColors.line}
        strokeWidth={1.5}
        opacity={0.65}
      />

      <rect
        x={px}
        y={py}
        width={pitch.w}
        height={pitch.h}
        rx={2}
        fill={mapColors.pitch}
        stroke={mapColors.pitchLine}
        strokeWidth={1}
      />
      <line
        x1={center.x}
        y1={py + creaseInset}
        x2={center.x}
        y2={py + pitch.h - creaseInset}
        stroke={mapColors.line}
        strokeWidth={1.2}
        opacity={0.85}
      />
      {[py + creaseInset, py + pitch.h - creaseInset].map((y, i) => (
        <g key={i}>
          <line
            x1={center.x - 6}
            y1={y}
            x2={center.x + 6}
            y2={y}
            stroke={mapColors.line}
            strokeWidth={1}
          />
          <line
            x1={center.x - 1}
            y1={y - 5}
            x2={center.x - 1}
            y2={y + 2}
            stroke={mapColors.wicket}
            strokeWidth={1.2}
          />
          <line
            x1={center.x + 1}
            y1={y - 5}
            x2={center.x + 1}
            y2={y + 2}
            stroke={mapColors.wicket}
            strokeWidth={1.2}
          />
        </g>
      ))}
    </g>
  );
}
