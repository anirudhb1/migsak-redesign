"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "@/lib/hooks";

export default function EnquiryTravelDemo() {
  const prefersReduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(prefersReduced ? 3 : 1);
  const [isReplaying, setIsReplaying] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      return;
    }
    const t1 = setTimeout(() => setActiveStep(2), 1200);
    const t2 = setTimeout(() => setActiveStep(3), 2600);
    const t3 = setTimeout(() => setIsReplaying(false), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [prefersReduced]);

  const handleReplay = useCallback(() => {
    if (prefersReduced) {
      setActiveStep(3);
      return;
    }
    setActiveStep(1);
    setIsReplaying(true);

    setTimeout(() => setActiveStep(2), 1200);
    setTimeout(() => setActiveStep(3), 2600);
    setTimeout(() => setIsReplaying(false), 3800);
  }, [prefersReduced]);

  const steps = [
    {
      step: 1,
      title: "You send the form",
      detail: "Client-side validated payload dispatched via HTTPS POST",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      step: 2,
      title: "It is saved in a database",
      detail: "Re-validated on server, checked with RLS & written to Postgres",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
    },
    {
      step: 3,
      title: "The team sees it on a protected page",
      detail: "Protected admin dashboard displays timestamp in IST",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c1228]/85 p-6 backdrop-blur-xl shadow-2xl mb-10">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]" />
          <div>
            <span className="text-xs font-mono font-medium tracking-wide text-violet-300 uppercase block">
              Illustration of how this form works
            </span>
            <span className="text-[11px] text-[#7E8BA8]">
              Automated data flow from submit to admin dashboard
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReplay}
          disabled={isReplaying}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-mono font-medium text-violet-200 hover:bg-white/[0.08] hover:text-white transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          aria-label="Replay enquiry data flow illustration"
        >
          <svg
            className={`w-3.5 h-3.5 ${isReplaying ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Replay</span>
        </button>
      </div>

      {/* 3 Steps Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {steps.map((s, idx) => {
          const isPassed = activeStep >= s.step;
          const isCurrent = activeStep === s.step;

          return (
            <div
              key={s.step}
              className={`relative rounded-xl border p-4 transition-all duration-500 ${
                isPassed
                  ? "border-violet-500/40 bg-violet-950/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                  : "border-white/[0.06] bg-white/[0.02] opacity-55"
              }`}
            >
              {/* Connector line for desktop */}
              {idx < steps.length - 1 && (
                <div
                  className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
                  aria-hidden="true"
                >
                  <svg className="w-5 h-5 text-violet-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                    isPassed
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/30 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                      : "bg-white/[0.05] text-[#7E8BA8] border border-white/10"
                  } ${isCurrent && !prefersReduced ? "scale-105" : ""}`}
                >
                  {s.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-violet-400 font-semibold uppercase">
                      Step 0{s.step}
                    </span>
                    {isCurrent && (
                      <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-white tracking-tight mt-0.5">
                    {s.title}
                  </h4>
                  <p className="text-xs text-[#A8B3CF] mt-1 leading-snug">
                    {s.detail}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
