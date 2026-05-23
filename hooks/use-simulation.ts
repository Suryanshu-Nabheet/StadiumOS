"use client";

import { useEffect } from "react";
import { ensureSimulationLoop } from "@/store/stadium-store";

export function useSimulation() {
  useEffect(() => {
    ensureSimulationLoop();
  }, []);
}
