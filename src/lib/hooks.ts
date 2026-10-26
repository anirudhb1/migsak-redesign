"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";

/**
 * Custom hook to detect when an element enters the viewport using IntersectionObserver.
 * Pauses animations when off-screen to conserve CPU/battery.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
} = {}) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = false } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(el);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}

/**
 * rAF-throttled scroll progress (0 to 1).
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const current = window.scrollY / totalHeight;
            setProgress(Math.min(1, Math.max(0, current)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

function subscribeMediaQuery(query: string, callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(query);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/**
 * Media query listener for prefers-reduced-motion using useSyncExternalStore.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => subscribeMediaQuery("(prefers-reduced-motion: reduce)", callback),
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

/**
 * Detects whether the primary input device has hover and fine pointer capability (desktop mouse).
 */
export function useCanHover(): boolean {
  return useSyncExternalStore(
    (callback) => subscribeMediaQuery("(hover: hover) and (pointer: fine)", callback),
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    () => false
  );
}
