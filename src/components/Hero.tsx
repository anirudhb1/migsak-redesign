"use client";

import React, { useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";
import ExecutionPathway from "./ExecutionPathway";
import { useReducedMotion } from "@/lib/hooks";

export default function Hero() {
  const prefersReduced = useReducedMotion();

  // 1. Rotating word line (real services only)
  const rotatingWords = ["Websites", "Mobile apps", "Automation", "Integrations"];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [isRotatingPaused, setIsRotatingPaused] = useState(false);

  useEffect(() => {
    if (prefersReduced || isRotatingPaused) return;
    const interval = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [prefersReduced, isRotatingPaused, rotatingWords.length]);

  // 2. Scroll cue dismissal & floating parallax
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Headline words for staggered entrance
  const headlineWords = ["Web", "and", "mobile", "apps,"];

  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-14 md:pb-28">
      {/* 1. Animated Aurora Background Blobs with Warm Coral/Amber Accent */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        {/* Blob 1: Violet/Indigo */}
        <div className="absolute top-1/4 left-1/4 h-[420px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/18 blur-[110px] animate-aurora-1" />
        {/* Blob 2: Indigo */}
        <div className="absolute top-1/3 right-1/4 h-[380px] w-[480px] rounded-full bg-indigo-600/15 blur-[120px] animate-aurora-2" />
        {/* Blob 3: Warm Coral/Amber Highlight */}
        <div className="absolute top-1/2 left-1/2 h-[340px] w-[420px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[130px] animate-aurora-3" />
      </div>

      {/* Background Grid Pattern & Subtle Noise */}
      <div className="pointer-events-none absolute inset-0 bg-grid-mask bg-noise -z-10 opacity-70" aria-hidden="true" />

      {/* Floating Parallax Accents (Desktop only) */}
      {!prefersReduced && (
        <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block" aria-hidden="true">
          <div
            className="absolute top-28 left-[10%] h-3 w-3 rounded-full bg-violet-400/40 shadow-[0_0_12px_#a78bfa] transition-transform duration-75 ease-out"
            style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0)` }}
          />
          <div
            className="absolute top-44 right-[12%] h-2.5 w-2.5 rounded-full bg-amber-400/50 shadow-[0_0_10px_#fb923c] transition-transform duration-75 ease-out"
            style={{ transform: `translate3d(0, ${scrollY * -0.06}px, 0)` }}
          />
          <div
            className="absolute bottom-32 left-[15%] h-2 w-2 rounded-full bg-indigo-400/30 transition-transform duration-75 ease-out"
            style={{ transform: `translate3d(0, ${scrollY * 0.05}px, 0)` }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Headline, Staggered Word Reveal, Rotating Word, CTAs */}
          <div className="lg:col-span-7 max-w-2xl">
            {/* Pill badge with thin line on each side */}
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet-400/50" aria-hidden="true" />
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-950/40 px-3.5 py-1 text-xs font-mono font-medium tracking-wide text-violet-300 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_#a78bfa] animate-ping" />
                Software Studio · Bengaluru, India
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-violet-400/50" aria-hidden="true" />
            </div>

            {/* Headline with Staggered Word Reveal and Moving Gradient Shimmer */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              <span className="inline-flex flex-wrap gap-x-2.5 text-white">
                {headlineWords.map((word, idx) => (
                  <span
                    key={word}
                    className="inline-block"
                    style={
                      !prefersReduced
                        ? {
                            animation: `hero-fade-rise 500ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 60 + 50}ms both`,
                          }
                        : {}
                    }
                  >
                    {word}
                  </span>
                ))}
              </span>{" "}
              <span className="block mt-1 animate-text-shimmer font-black">
                connected to the way your business runs.
              </span>
            </h1>

            {/* Rotating Word Line using Real Services Only */}
            <div
              className="mt-4 flex items-center gap-2 text-sm sm:text-base font-mono text-violet-300"
              onMouseEnter={() => setIsRotatingPaused(true)}
              onMouseLeave={() => setIsRotatingPaused(false)}
              onFocus={() => setIsRotatingPaused(true)}
              onBlur={() => setIsRotatingPaused(false)}
              tabIndex={0}
              aria-label={`Engineering services: ${rotatingWords[currentWordIdx]}`}
            >
              <span className="text-[#7E8BA8]">Engineering:</span>
              <span className="relative inline-flex h-7 items-center overflow-hidden font-semibold text-white px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10">
                <span
                  key={currentWordIdx}
                  className="inline-block transition-all duration-300 transform translate-y-0 opacity-100"
                  style={
                    !prefersReduced
                      ? {
                          animation: "hero-fade-rise 300ms cubic-bezier(0.22, 1, 0.36, 1) both",
                        }
                      : {}
                  }
                >
                  {rotatingWords[currentWordIdx]}
                </span>
              </span>
            </div>

            {/* Subhead with Plain Jargon Explanation */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#A8B3CF]">
              We design and build websites, mobile apps, and the backend behind them, then connect them to payments, WhatsApp, customer or lead tracking (CRM), and enterprise resource planning (ERP). One team from first screen to production.
            </p>

            {/* Truthful Budget Inclusivity Fact */}
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-xl border border-violet-500/20 bg-[#0d132b]/80 px-4 py-2 text-sm font-medium text-violet-200 backdrop-blur-md">
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Any budget. We can start with a single feature and grow from there.</span>
            </div>

            {/* CTAs: Magnetic Primary with Glow Ring & Sweep + Secondary */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton maxOffset={6}>
                <a
                  href="#enquiry"
                  className="btn-primary animate-pulse-ring group inline-flex h-12 items-center justify-center gap-2 rounded-xl px-7 text-sm font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c1d]"
                >
                  {/* Periodic Shine Sweep */}
                  <span
                    className="pointer-events-none absolute inset-0 -z-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-btn-shine"
                    aria-hidden="true"
                  />
                  <span className="relative z-10">Start a project</span>
                  <svg
                    className="relative z-10 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </MagneticButton>

              <a
                href="#work"
                className="btn-secondary inline-flex h-12 items-center justify-center rounded-xl px-6 text-sm font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c1d]"
              >
                See our work
              </a>
            </div>

            <p className="mt-4 text-xs text-[#7E8BA8]">
              Direct email:{" "}
              <a
                href="mailto:contact@migsak.com"
                className="text-violet-300 underline underline-offset-2 hover:text-white transition-colors"
              >
                contact@migsak.com
              </a>
              {" "}· A reply to every message within one working day.
            </p>
          </div>

          {/* Right Column: Enhanced Execution Pathway Card */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <ExecutionPathway />
          </div>
        </div>
      </div>

      {/* 6. Subtle Scroll Cue at Bottom of Hero */}
      {scrollY < 40 && (
        <div
          className="mt-12 flex justify-center animate-bounce-subtle pointer-events-none transition-opacity duration-300"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-1.5 text-[#7E8BA8]">
            <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
            <div className="h-7 w-4 rounded-full border border-white/20 p-1 flex justify-center">
              <span className="h-1.5 w-1 rounded-full bg-violet-400 animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
