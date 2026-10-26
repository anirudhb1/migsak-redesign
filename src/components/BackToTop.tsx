"use client";

import React, { useEffect, useState } from "react";
import { useScrollProgress, useReducedMotion } from "@/lib/hooks";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const progress = useScrollProgress();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 450);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - progress * circumference;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#090e24]/85 text-white shadow-xl backdrop-blur-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90 pointer-events-none"
      } hover:border-violet-400/40 hover:bg-[#0f1738] active:scale-95`}
    >
      {/* SVG Progress Ring */}
      <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r={radius}
          className="text-white/10"
          strokeWidth="2.5"
          stroke="currentColor"
          fill="none"
        />
        <circle
          cx="20"
          cy="20"
          r={radius}
          className="text-violet-400"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>
      {/* Arrow Icon */}
      <svg className="w-4 h-4 text-violet-200 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
