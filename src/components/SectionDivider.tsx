"use client";

import React from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";

export default function SectionDivider({ className = "" }: { className?: string }) {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const prefersReduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={`relative mx-auto max-w-5xl px-4 py-8 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-violet-500/35 to-transparent transition-transform duration-700 ease-out"
        style={{
          transform: prefersReduced || isInView ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "center",
        }}
      />
    </div>
  );
}
