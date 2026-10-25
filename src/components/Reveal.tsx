"use client";

import React, { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  as?: React.ElementType;
}

export default function Reveal({
  children,
  className = "",
  delayMs = 0,
  durationMs = 500,
  as: Component = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion: do not animate if user opted out
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      return;
    }

    // Progressive enhancement:
    // Only apply the initial hidden state on the client once JS is confirmed active.
    // This ensures content is 100% visible if JavaScript fails to load or run.
    el.style.opacity = "0";
    el.style.transform = "translate3d(0, 16px, 0)";
    el.style.transitionProperty = "opacity, transform";
    el.style.transitionDuration = `${durationMs}ms`;
    el.style.transitionTimingFunction = "cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transitionDelay = `${delayMs}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translate3d(0, 0, 0)";
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
  }, [delayMs, durationMs]);

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
