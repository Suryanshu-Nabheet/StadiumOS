"use client";

import { useStadiumStore } from "@/store/stadium-store";

export function useStadium() {
  const snapshot = useStadiumStore((s) => s.snapshot);
  const emergencies = useStadiumStore((s) => s.emergencies);
  const timeline = useStadiumStore((s) => s.timeline);
  return { snapshot, emergencies, timeline };
}
