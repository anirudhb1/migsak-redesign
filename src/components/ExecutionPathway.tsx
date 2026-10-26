"use client";

import React, { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import Marquee from "./Marquee";
import { useInView, useReducedMotion, useCanHover } from "@/lib/hooks";

/**
 * TRICKY PART 1: The Rotating Conic Border (@property)
 * Standard CSS gradients cannot be animated directly because browsers treat them as static images.
 * By registering `@property --border-angle { syntax: '<angle>'; ... }` in CSS, the browser
 * recognizes `--border-angle` as a typed numeric angle. The keyframe engine can then smoothly
 * interpolate it from 0deg to 360deg.
 * We layer two backgrounds: the solid dark card on `padding-box` and the conic gradient on `border-box`,
 * with a transparent 1.5px border allowing the conic gradient to shine through.
 * For older browsers lacking @property support, a clean subtle border acts as an instant fallback.
 */

/**
 * TRICKY PART 2: The Travelling Light Comet on the Connecting Line
 * Instead of calculating pixel coordinates in JavaScript, we use a single native SVG `<line>` with
 * `pathLength="100"` and a dashed stroke: `strokeDasharray="7 93"`.
 * 7% represents the bright glowing head and trail; 93% is the empty gap.
 * Animating `strokeDashoffset` from 100 down to 0 over 6 seconds causes the 7% segment to travel
 * continuously along the line from Step 01 to Step 04.
 * This runs entirely on the compositor thread without layout recalculations.
 * Each circle's pulse ring is synchronized with matching keyframe delays (0s, 2s, 4s, 5.75s).
 */

/**
 * TRICKY PART 3: The Connected Integrations Marquee
 * The marquee uses two opposite-direction infinite CSS scrolling tracks.
 * CSS mask-image creates soft edge fade gradients so chips vanish cleanly at the card borders.
 * A centered radial gradient overlay gives chips a faint, natural luminescence as they pass the middle.
 * The entire row pauses on hover (`:hover`) or keyboard focus (`:focus-within`) for complete accessibility.
 */

interface StepItem {
  step: string;
  title: string;
  short: string;
  detail: string;
  badge: string | null;
}

export default function ExecutionPathway() {
  const prefersReduced = useReducedMotion();
  const canHover = useCanHover();
  const { ref: containerRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  // Tab hidden / document visibility state
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Looping animations pause when off-screen, when the tab is hidden, or when reduced motion is requested
  const shouldAnimateLoops = isInView && isTabVisible && !prefersReduced;

  // 4 Steps definition using grounded real site wording
  const stops: StepItem[] = [
    {
      step: "01",
      title: "Scope",
      short: "Written scope & fixed quote",
      detail:
        "Map users, screens, and integrations. You receive a detailed written scope and a fixed quote sized to your budget.",
      badge: null,
    },
    {
      step: "02",
      title: "Build in phases",
      short: "Bi-weekly testable milestones",
      detail:
        "Short development cycles, each ending in something clickable and interactive that you can test on real devices.",
      badge: "Demo every two weeks",
    },
    {
      step: "03",
      title: "Launch",
      short: "Store submission & hosting",
      detail:
        "Apple App Store and Google Play submission, production hosting setup, error monitoring, and complete operational handover.",
      badge: null,
    },
    {
      step: "04",
      title: "Support",
      short: "Optional monthly plan",
      detail:
        "An optional monthly support plan to handle ongoing maintenance, dependency updates, and feature expansions.",
      badge: null,
    },
  ];

  // User-pinned step (null initially until user clicks, focuses, or navigates via keyboard)
  const [pinnedStepIdx, setPinnedStepIdx] = useState<number | null>(null);
  const [loopStepIdx, setLoopStepIdx] = useState(0);

  // When unpinned, active step follows the travelling dot on the 6s loop (1.5s per step)
  useEffect(() => {
    if (!shouldAnimateLoops || pinnedStepIdx !== null) return;
    const interval = setInterval(() => {
      setLoopStepIdx((prev) => (prev + 1) % stops.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [shouldAnimateLoops, pinnedStepIdx, stops.length]);

  const activeStepIdx = pinnedStepIdx !== null ? pinnedStepIdx : loopStepIdx;
  const stepButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation for tablist steps (Arrow Left/Right/Up/Down, Home, End)
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = (index + 1) % stops.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIndex = (index - 1 + stops.length) % stops.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = stops.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setPinnedStepIdx(nextIndex);
    stepButtonRefs.current[nextIndex]?.focus();
  };

  // 3D Tilt and Spotlight coordinates (Desktop only, max 3.5 degrees)
  const cardRef = useRef<HTMLDivElement>(null);
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
      const rotX = -((y - centerY) / centerY) * 3.5;
      const rotY = ((x - centerX) / centerX) * 3.5;
      setTilt({ rotX, rotY });
      setSpotlight({ x, y, active: true });
    },
    [canHover, prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotX: 0, rotY: 0 });
    setSpotlight((prev) => ({ ...prev, active: false }));
  }, []);

  const integrationsRow1 = ["Razorpay", "WhatsApp", "Stripe"];
  const integrationsRow2 = ["Zoho", "Tally", "ERPNext"];

  const currentStop = stops[activeStepIdx];

  return (
    <div
      ref={containerRef}
      className={`relative group ${!shouldAnimateLoops ? "pause-animations" : ""}`}
    >
      {/* 1. Breathing Soft Outer Glow (6s opacity and scale pulse) */}
      <div
        className={`pointer-events-none absolute -inset-2.5 rounded-3xl bg-gradient-to-r from-violet-600/30 via-indigo-600/25 to-amber-500/20 blur-xl ${
          shouldAnimateLoops ? "animate-breathe-glow" : "opacity-35"
        }`}
        aria-hidden="true"
      />

      {/* Main Card Frame with Rotating Conic-Gradient Border */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          canHover && !prefersReduced
            ? {
                transform: `perspective(1000px) rotateX(${tilt.rotX.toFixed(2)}deg) rotateY(${tilt.rotY.toFixed(2)}deg)`,
                transition: spotlight.active ? "transform 0.08s ease-out" : "transform 0.4s ease-out",
              }
            : {}
        }
        className="relative rounded-2xl pathway-card-border bg-[#0c1228] p-5 sm:p-6 shadow-2xl backdrop-blur-xl overflow-hidden"
      >
        {/* Faint Dotted Grid Texture Inside Card */}
        <div
          className="pointer-events-none absolute inset-0 bg-grid-mask opacity-40 z-0"
          aria-hidden="true"
        />

        {/* Cursor-Following Spotlight Glow (Desktop only) */}
        {canHover && !prefersReduced && (
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            style={{
              background: spotlight.active
                ? `radial-gradient(circle 260px at ${spotlight.x}px ${spotlight.y}px, rgba(167, 139, 250, 0.16), transparent 75%)`
                : "none",
            }}
            aria-hidden="true"
          />
        )}

        {/* Card Header with lively pulsing dot and Illustration badge */}
        <div className="relative z-20 flex items-center justify-between pb-3.5 mb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75 ${
                  shouldAnimateLoops ? "animate-ping" : ""
                }`}
                aria-hidden="true"
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-200">
              Execution Pathway
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-mono text-violet-300 font-semibold">
              Illustration
            </span>
            <span className="text-[11px] font-mono text-[#CBD5E1] hidden sm:inline">
              From Idea to Launch
            </span>
          </div>
        </div>

        {/* 2 & 3. "Idea to Launch" Route Across 4 Stops */}
        <div className="relative z-20 py-1">
          {/* DESKTOP HORIZONTAL ROUTE (>= 640px) */}
          <div className="hidden sm:block relative">
            {/* SVG Connecting Track, Drawn Connecting Line, and Travelling Comet */}
            <svg
              className="pointer-events-none absolute top-1 left-0 w-full h-11 z-10"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="pathway-line-gradient-h" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <filter id="comet-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#f59e0b" floodOpacity="0.95" />
                </filter>
              </defs>

              {/* Background track line */}
              <line
                x1="12.5%"
                y1="22"
                x2="87.5%"
                y2="22"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Connecting Line: draws left to right via stroke-dashoffset on entrance */}
              <line
                x1="12.5%"
                y1="22"
                x2="87.5%"
                y2="22"
                stroke="url(#pathway-line-gradient-h)"
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="100"
                style={{
                  strokeDashoffset: prefersReduced || isInView ? 0 : 100,
                  transition: prefersReduced ? "none" : "stroke-dashoffset 850ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />

              {/* Travelling Comet Light: runs on a 6s loop along the line from step 1 to 4 */}
              {shouldAnimateLoops && (
                <line
                  x1="12.5%"
                  y1="22"
                  x2="87.5%"
                  y2="22"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="7 93"
                  filter="url(#comet-glow-filter)"
                  className="animate-comet-travel"
                />
              )}
            </svg>

            {/* Subtle launch spark / arrow at the end of Step 04 */}
            <div
              className="pointer-events-none absolute top-1 right-[3%] sm:right-[4%] flex items-center h-11 text-amber-400 z-20"
              aria-hidden="true"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-ping" />
              <svg className="w-3.5 h-3.5 ml-1 text-amber-400/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            {/* 4 Interactive Step Buttons */}
            <ol
              role="tablist"
              aria-label="Execution pathway steps"
              className="grid grid-cols-4 gap-2 relative z-20 list-none m-0 p-0"
            >
              {stops.map((stop, idx) => {
                const isSelected = activeStepIdx === idx;
                return (
                  <li key={stop.step} role="none" className="flex flex-col items-center">
                    <button
                      ref={(el) => {
                        stepButtonRefs.current[idx] = el;
                      }}
                      role="tab"
                      id={`pathway-tab-${stop.step}`}
                      aria-selected={isSelected}
                      aria-current={isSelected ? "step" : undefined}
                      aria-controls="pathway-description"
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => setPinnedStepIdx(idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className="flex flex-col items-center text-center group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-xl p-1 transition-all w-full cursor-pointer"
                    >
                      {/* Circle Node with overshoot entrance and passing pulse ring */}
                      <div
                        style={{ animationDelay: `${idx * 120}ms` }}
                        className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 font-mono text-xs font-bold ${
                          isInView && !prefersReduced ? "animate-step-pop-overshoot" : ""
                        } ${
                          isSelected
                            ? "border-amber-400 bg-violet-950/90 text-white shadow-[0_0_16px_rgba(245,158,11,0.5)] scale-110"
                            : "border-violet-400/40 bg-[#0c1228] text-violet-200 group-hover/btn:border-violet-300 group-hover/btn:text-white"
                        }`}
                      >
                        {stop.step}

                        {/* Synchronized pulse ring as travelling dot arrives */}
                        {shouldAnimateLoops && (
                          <span
                            className={`pointer-events-none absolute -inset-1 rounded-full border border-amber-400/60 ${
                              idx === 0
                                ? "animate-circle-pass-1"
                                : idx === 1
                                ? "animate-circle-pass-2"
                                : idx === 2
                                ? "animate-circle-pass-3"
                                : "animate-circle-pass-4"
                            }`}
                            aria-hidden="true"
                          />
                        )}
                      </div>

                      {/* Step Labels: fade up after each circle entrance */}
                      <div
                        style={{ animationDelay: `${idx * 120 + 200}ms` }}
                        className={`flex flex-col items-center ${
                          isInView && !prefersReduced ? "animate-step-label-fade" : ""
                        }`}
                      >
                        <span
                          className={`mt-2.5 text-xs font-semibold tracking-tight transition-colors ${
                            isSelected ? "text-amber-300 font-bold" : "text-white group-hover/btn:text-violet-200"
                          }`}
                        >
                          {stop.title}
                        </span>

                        <span className="mt-1 text-[11px] text-[#CBD5E1] leading-tight font-medium">
                          {stop.short}
                        </span>

                        {/* Amber Badge "Demo every two weeks" with gentle ping ring and shine sweep */}
                        {stop.badge && (
                          <span className="relative mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-950/70 px-2.5 py-0.5 text-[9px] font-mono font-semibold text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.25)] overflow-hidden">
                            <span className="relative flex h-1.5 w-1.5">
                              <span
                                className={`absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 ${
                                  shouldAnimateLoops ? "animate-ping" : ""
                                }`}
                                aria-hidden="true"
                              />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                            </span>
                            <span>{stop.badge}</span>
                            {/* Periodic shine sweep across badge */}
                            {shouldAnimateLoops && (
                              <span
                                className="pointer-events-none absolute inset-0 -z-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-badge-shine"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* MOBILE VERTICAL ROUTE (< 640px) */}
          <div className="sm:hidden relative pl-9 space-y-6">
            {/* SVG Vertical Track, Drawn Connecting Line, and Travelling Comet */}
            <svg
              className="pointer-events-none absolute top-0 left-0 w-8 h-full z-10"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="pathway-line-gradient-v" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>

              {/* Background track line */}
              <line
                x1="16"
                y1="16"
                x2="16"
                y2="calc(100% - 16px)"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Drawn connecting line */}
              <line
                x1="16"
                y1="16"
                x2="16"
                y2="calc(100% - 16px)"
                stroke="url(#pathway-line-gradient-v)"
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="100"
                style={{
                  strokeDashoffset: prefersReduced || isInView ? 0 : 100,
                  transition: prefersReduced ? "none" : "stroke-dashoffset 850ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />

              {/* Vertical Travelling Comet */}
              {shouldAnimateLoops && (
                <line
                  x1="16"
                  y1="16"
                  x2="16"
                  y2="calc(100% - 16px)"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="7 93"
                  filter="url(#comet-glow-filter)"
                  className="animate-comet-travel"
                />
              )}
            </svg>

            <ol
              role="tablist"
              aria-label="Execution pathway steps mobile"
              className="space-y-6 list-none m-0 p-0"
            >
              {stops.map((stop, idx) => {
                const isSelected = activeStepIdx === idx;
                return (
                  <li key={stop.step} role="none">
                    <button
                      type="button"
                      role="tab"
                      id={`pathway-tab-mobile-${stop.step}`}
                      aria-selected={isSelected}
                      aria-current={isSelected ? "step" : undefined}
                      aria-controls="pathway-description"
                      onClick={() => setPinnedStepIdx(idx)}
                      className="relative flex items-start gap-3.5 text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg p-1 active:scale-[0.98] transition-transform"
                    >
                      <div
                        className={`absolute -left-9 flex h-8 w-8 items-center justify-center rounded-full border transition-all font-mono text-[11px] font-bold z-20 ${
                          isSelected
                            ? "border-amber-400 bg-violet-950/90 text-white shadow-[0_0_12px_rgba(245,158,11,0.5)] scale-110"
                            : "border-violet-400/40 bg-[#0c1228] text-violet-200"
                        }`}
                      >
                        {stop.step}
                      </div>

                      <div className="pl-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${isSelected ? "text-amber-300 font-bold" : "text-white"}`}>
                            {stop.title}
                          </span>
                          {stop.badge && (
                            <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-950/70 px-2 py-0.5 text-[9px] font-mono text-amber-200 font-semibold">
                              {stop.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#CBD5E1] mt-0.5 leading-snug font-medium">
                          {stop.short}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* 4. Interactive Caption Box: Grounded Real Site Copy */}
          <div
            id="pathway-description"
            role="tabpanel"
            aria-labelledby={`pathway-tab-${currentStop.step}`}
            aria-live="polite"
            className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase text-amber-300 tracking-wide">
                Step {currentStop.step} · {currentStop.title}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden="true" />
              <span className="text-[11px] font-mono text-[#CBD5E1]">
                {pinnedStepIdx !== null ? "Selected step" : "Live pathway"}
              </span>
            </div>
            <p className="text-xs text-[#E2E8F0] mt-1.5 leading-relaxed font-medium">
              {currentStop.detail}
            </p>
          </div>
        </div>

        {/* 7. Dual-Row Drifting Marquee of Real Integrations */}
        <div className="relative z-20 mt-6 pt-5 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-mono font-semibold text-[#CBD5E1]">
              Connected Integrations
            </span>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-violet-300 font-medium">
              <svg className="w-3 h-3 text-violet-400 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              <span>Pause on hover</span>
            </div>
          </div>

          <div className="relative space-y-2 overflow-hidden">
            {/* Center Ambient Radial Glow: chips subtly illuminate as they pass the middle */}
            <div
              className="pointer-events-none absolute inset-y-0 left-1/4 right-1/4 bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.18),transparent_70%)] z-10"
              aria-hidden="true"
            />

            {/* Row 1 moving left */}
            <Marquee direction="left" speedSeconds={20}>
              {integrationsRow1.map((tool) => (
                <span
                  key={tool}
                  tabIndex={0}
                  className="inline-flex items-center rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs font-mono font-medium text-violet-200 hover:border-violet-400 hover:text-white hover:bg-violet-950/40 hover:-translate-y-0.5 active:scale-95 hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] transition-all cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  {tool}
                </span>
              ))}
            </Marquee>

            {/* Row 2 moving right */}
            <Marquee direction="right" speedSeconds={22}>
              {integrationsRow2.map((tool) => (
                <span
                  key={tool}
                  tabIndex={0}
                  className="inline-flex items-center rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs font-mono font-medium text-violet-200 hover:border-violet-400 hover:text-white hover:bg-violet-950/40 hover:-translate-y-0.5 active:scale-95 hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] transition-all cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  {tool}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
}
