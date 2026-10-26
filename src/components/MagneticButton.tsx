"use client";

import React, { useRef, useState, useCallback } from "react";
import { useCanHover, useReducedMotion } from "@/lib/hooks";

interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxOffset?: number;
}

export default function MagneticButton({
  children,
  className = "",
  maxOffset = 5,
  ...rest
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canHover = useCanHover();
  const prefersReduced = useReducedMotion();

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canHover || prefersReduced || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      setOffset({
        x: deltaX * maxOffset,
        y: deltaY * maxOffset,
      });
      setIsHovered(true);
    },
    [canHover, prefersReduced, maxOffset]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const transformStyle =
    canHover && !prefersReduced
      ? {
          transform: `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)`,
          transition: isHovered ? "transform 0.12s ease-out" : "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }
      : {};

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      className={`inline-block ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
