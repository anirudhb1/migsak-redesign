"use client";

import React, { useRef, useState, useCallback } from "react";
import { useCanHover, useReducedMotion } from "@/lib/hooks";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTiltDeg?: number;
  featured?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  maxTiltDeg = 5,
  featured = false,
  ...rest
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canHover = useCanHover();
  const prefersReduced = useReducedMotion();

  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canHover || prefersReduced || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = -((y - centerY) / centerY) * maxTiltDeg;
      const rotY = ((x - centerX) / centerX) * maxTiltDeg;

      setTilt({ rotX, rotY });
      setSpotlight({ x, y, active: true });
    },
    [canHover, prefersReduced, maxTiltDeg]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotX: 0, rotY: 0 });
    setSpotlight((prev) => ({ ...prev, active: false }));
  }, []);

  const transformStyle =
    canHover && !prefersReduced
      ? {
          transform: `perspective(1000px) rotateX(${tilt.rotX.toFixed(2)}deg) rotateY(${tilt.rotY.toFixed(2)}deg)`,
          transition: spotlight.active ? "transform 0.08s ease-out" : "transform 0.4s ease-out",
        }
      : {};

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      className={`relative group rounded-2xl ${
        featured ? "animated-gradient-border" : "glass-card"
      } ${className}`}
      {...rest}
    >
      {/* Cursor-Following Spotlight Glow (Desktop only) */}
      {canHover && !prefersReduced && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: spotlight.active
              ? `radial-gradient(circle 320px at ${spotlight.x}px ${spotlight.y}px, rgba(167, 139, 250, 0.16), transparent 75%)`
              : "none",
          }}
          aria-hidden="true"
        />
      )}

      {/* Moving Glare Highlight (Desktop only) */}
      {canHover && !prefersReduced && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 overflow-hidden"
          style={{
            background: spotlight.active
              ? `linear-gradient(${
                  125 + tilt.rotY * 4
                }deg, rgba(255, 255, 255, 0.06) 0%, transparent 55%)`
              : "none",
          }}
          aria-hidden="true"
        />
      )}

      {/* Card Content */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
