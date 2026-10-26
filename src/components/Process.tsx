"use client";

import React from "react";
import Reveal from "./Reveal";
import { useInView, useReducedMotion } from "@/lib/hooks";

export default function Process() {
  const prefersReduced = useReducedMotion();
  const { ref: sectionRef, isInView: sectionInView } = useInView({ threshold: 0.15, triggerOnce: true });

  const steps = [
    {
      number: "01",
      title: "Scope",
      tagline: "Written scope & fixed quote",
      description:
        "We map the users, screens and integrations, and you get a written scope and a fixed quote sized to your budget.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Build in phases",
      tagline: "Bi-weekly clickable milestones",
      description:
        "Short cycles, each ending in something you can click through.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Launch",
      tagline: "Store submission & hosting",
      description:
        "Store submission, hosting, monitoring and a handover your team can follow.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Support",
      tagline: "Optional monthly plan",
      description:
        "An optional monthly plan for fixes, updates and new features.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="process" className="relative py-20 md:py-28 overflow-hidden">
      {/* Soft Glow Radial Gradient Behind Heading */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[350px] w-[600px] glow-section blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Pill Badge and Side Lines */}
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet-400/50" aria-hidden="true" />
            <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-950/40 px-3.5 py-1 text-xs font-mono font-medium tracking-wide text-violet-300">
              Process Timeline
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-violet-400/50" aria-hidden="true" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-violet-200 bg-clip-text text-transparent">
              How a Project Runs
            </span>
          </h2>
          <p className="mt-4 text-base text-[#A8B3CF] leading-relaxed">
            From first call to live product.
          </p>
        </Reveal>

        {/* Process Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="mt-16 relative">
          {/* Desktop Connecting Line that draws itself on view */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-white/[0.08]" aria-hidden="true">
            <div
              className="h-full bg-gradient-to-r from-violet-500 via-indigo-400 to-amber-400 transition-transform duration-1000 ease-out origin-left shadow-[0_0_10px_rgba(139,92,246,0.6)]"
              style={{
                transform: prefersReduced || sectionInView ? "scaleX(1)" : "scaleX(0)",
              }}
            />
          </div>

          {/* 4 Steps Container */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {steps.map((step, idx) => (
              <Reveal
                key={step.number}
                delayMs={idx * 100}
                className="flex flex-col"
              >
                <div className="glass-card flex-1 relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 group hover:border-violet-400/35 transition-all">
                  <div>
                    {/* Checkpoint Node & Step Number */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-950/40 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.25)] group-hover:scale-105 group-hover:border-violet-400 group-hover:text-white transition-all">
                        {step.icon}
                      </div>

                      <span className="text-3xl font-black font-mono bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-xs font-mono text-violet-300 font-medium">
                      {step.tagline}
                    </p>

                    <p className="mt-3.5 text-sm text-[#A8B3CF] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
