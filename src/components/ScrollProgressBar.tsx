"use client";

import React from "react";
import { useScrollProgress, useReducedMotion } from "@/lib/hooks";

export default function ScrollProgressBar() {
  const progress = useScrollProgress();
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full w-full bg-gradient-to-r from-violet-500 via-indigo-400 to-amber-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
        style={{
          transform: `scaleX(${progress})`,
          transformOrigin: "left",
          transition: "transform 0.05s linear",
        }}
      />
    </div>
  );
}
