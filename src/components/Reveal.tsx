"use client";

import React, { useEffect, useRef } from "react";

export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "fade";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  variant?: RevealVariant;
  as?: React.ElementType;
}

export default function Reveal({
  children,
  className = "",
  delayMs = 0,
  durationMs = 500,
  variant = "up",
  as: Component = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion: stay visible immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      return;
    }

    // Determine initial transform based on variant
    let initialTransform = "translate3d(0, 18px, 0)";
    if (variant === "down") initialTransform = "translate3d(0, -18px, 0)";
    if (variant === "left") initialTransform = "translate3d(-24px, 0, 0)";
    if (variant === "right") initialTransform = "translate3d(24px, 0, 0)";
    if (variant === "scale") initialTransform = "scale(0.95)";
    if (variant === "fade") initialTransform = "translate3d(0, 0, 0)";

    // Progressive enhancement: only hide once client JS is initialized
    el.style.opacity = "0";
    el.style.transform = initialTransform;
    el.style.transitionProperty = "opacity, transform";
    el.style.transitionDuration = `${durationMs}ms`;
    el.style.transitionTimingFunction = "cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transitionDelay = `${delayMs}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translate3d(0, 0, 0) scale(1)";
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [delayMs, durationMs, variant]);

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
