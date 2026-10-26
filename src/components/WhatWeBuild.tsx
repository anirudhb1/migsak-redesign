"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

export default function WhatWeBuild() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const services = [
    {
      id: "service-web",
      tag: "Web & Portals",
      title: "Websites and web apps",
      description:
        "Company websites, dashboards, and portals, built to load fast and be found on search engines.",
      highlights: [
        "Company websites, dashboards and portals",
        "Built to load fast and be found on search",
        "Role-based authenticated client & admin portals",
      ],
    },
    {
      id: "service-mobile",
      tag: "iOS & Android",
      title: "Mobile apps",
      description:
        "iOS and Android apps for customers, field teams and members, built cross-platform and shipped to both stores.",
      highlights: [
        "Built cross-platform for iOS and Android",
        "For customers, field teams and members",
        "Shipped directly to Apple App Store & Google Play",
      ],
    },
    {
      id: "service-automation",
      tag: "Workflows & APIs",
      title: "Automation and integrations",
      description:
        "WhatsApp flows, AI assistants and links to Razorpay, Stripe, Zoho, Tally and ERPNext.",
      highlights: [
        "Automated WhatsApp flows and customer intake",
        "AI assistants and links to Razorpay & Stripe",
        "Links to Zoho, Tally, and ERPNext",
      ],
    },
  ];

  // Arrow key navigation across tablist
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % services.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + services.length) % services.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = services.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const currentService = services[activeTab];

  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden">
      {/* Soft Glow Radial Gradient Behind Section Heading */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[350px] w-[600px] glow-section blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Pill Badge and Side Lines */}
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet-400/50" aria-hidden="true" />
            <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-950/40 px-3.5 py-1 text-xs font-mono font-medium tracking-wide text-violet-300">
              Service Explorer
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-violet-400/50" aria-hidden="true" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-violet-200 bg-clip-text text-transparent">
              What We Build
            </span>
          </h2>
          <p className="mt-4 text-base text-[#A8B3CF] leading-relaxed">
            Clear, reliable software engineering built around how your business operations function day to day.
          </p>
        </Reveal>

        {/* Bento Service Explorer Container */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Accessible Tab List with real copy & anchor links */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            <div
              role="tablist"
              aria-label="Engineering services"
              className="flex flex-col gap-3"
            >
              {services.map((svc, idx) => {
                const isSelected = activeTab === idx;
                return (
                  <button
                    key={svc.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    role="tab"
                    id={`tab-${svc.id}`}
                    aria-selected={isSelected}
                    aria-controls={`panel-${svc.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setActiveTab(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={`text-left rounded-2xl p-5 sm:p-6 transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                      isSelected
                        ? "border-violet-500/50 bg-[#101738]/90 shadow-[0_0_24px_rgba(139,92,246,0.2)]"
                        : "border-white/[0.08] bg-[#0c1228]/60 hover:bg-[#0c1228]/85 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-mono font-medium px-2.5 py-0.5 rounded-full border ${
                          isSelected
                            ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                            : "bg-white/[0.03] border-white/10 text-[#7E8BA8]"
                        }`}
                      >
                        {svc.tag}
                      </span>
                      <a
                        href={`#${svc.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-mono text-[#7E8BA8] hover:text-violet-300 transition-colors"
                        aria-label={`Direct link to ${svc.title}`}
                      >
                        #{svc.id}
                      </a>
                    </div>

                    <h3 className="mt-3 text-lg sm:text-xl font-bold text-white tracking-tight">
                      {svc.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#A8B3CF] leading-relaxed">
                      {svc.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Preview Panel with 3D Tilt */}
          <div className="lg:col-span-7">
            <TiltCard maxTiltDeg={4} className="p-6 sm:p-8">
              <div
                role="tabpanel"
                id={`panel-${currentService.id}`}
                aria-labelledby={`tab-${currentService.id}`}
                className="space-y-6"
              >
                {/* Header Information for selected service */}
                <div className="border-b border-white/[0.08] pb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-violet-400 uppercase tracking-wider">
                      Interactive Architecture Preview
                    </span>
                    <span className="text-xs font-mono text-amber-300/90 font-medium">
                      Example
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mt-1.5">
                    {currentService.title}
                  </h3>
                  <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-[#A8B3CF]">
                    {currentService.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          ✓
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* VISUAL 1: Browser Mockup for Websites & Web Apps */}
                {activeTab === 0 && (
                  <div className="rounded-xl border border-white/[0.08] bg-[#090e24] p-4 shadow-inner" aria-hidden="true">
                    {/* Window Title Bar */}
                    <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/[0.06]">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                      <div className="ml-2 h-5 flex-1 max-w-xs rounded bg-white/[0.06] flex items-center px-2 text-[11px] font-mono text-[#7E8BA8]">
                        <span>https://app.example.com/dashboard</span>
                      </div>
                    </div>

                    {/* Dashboard Wireframe Content */}
                    <div className="space-y-3">
                      <div className="h-14 rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="h-2 w-20 rounded bg-violet-400/40" />
                          <div className="h-4 w-32 rounded bg-white/25 font-mono text-xs text-white" />
                        </div>
                        <span className="px-2 py-1 rounded bg-violet-500/20 text-[10px] font-mono text-violet-300">
                          Example Dashboard
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="h-16 rounded-lg bg-white/[0.02] border border-white/[0.05] p-2 flex flex-col justify-between">
                          <div className="h-2 w-10 rounded bg-violet-400/30" />
                          <div className="h-3 w-14 rounded bg-white/20" />
                        </div>
                        <div className="h-16 rounded-lg bg-white/[0.02] border border-white/[0.05] p-2 flex flex-col justify-between">
                          <div className="h-2 w-12 rounded bg-indigo-400/30" />
                          <div className="h-3 w-10 rounded bg-white/20" />
                        </div>
                        <div className="h-16 rounded-lg bg-white/[0.02] border border-white/[0.05] p-2 flex flex-col justify-between">
                          <div className="h-2 w-8 rounded bg-emerald-400/30" />
                          <div className="h-3 w-12 rounded bg-white/20" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* VISUAL 2: Phone Mockup for Mobile Apps */}
                {activeTab === 1 && (
                  <div className="flex justify-center" aria-hidden="true">
                    <div className="w-64 rounded-3xl border-2 border-white/20 bg-[#090e24] p-3 shadow-2xl">
                      {/* Phone Island Notch */}
                      <div className="flex justify-center mb-3">
                        <div className="h-4 w-20 rounded-full bg-black/60 flex items-center justify-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-violet-400/60" />
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
                          <span className="text-[10px] font-mono text-violet-300">
                            Cross-platform iOS & Android
                          </span>
                          <div className="h-2 w-28 rounded bg-white/30 mt-1.5" />
                        </div>

                        <div className="h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          <div className="space-y-1">
                            <div className="h-2 w-20 rounded bg-emerald-300/40" />
                            <div className="h-2 w-14 rounded bg-emerald-300/20" />
                          </div>
                        </div>

                        <div className="h-12 rounded-lg bg-violet-500/10 border border-violet-500/20 p-2 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-violet-400" />
                          <div className="space-y-1">
                            <div className="h-2 w-24 rounded bg-violet-300/40" />
                            <div className="h-2 w-16 rounded bg-violet-300/20" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* VISUAL 3: Node Diagram for Automation & Integrations */}
                {activeTab === 2 && (
                  <div className="rounded-xl border border-white/[0.08] bg-[#090e24] p-6 shadow-inner" aria-hidden="true">
                    <div className="relative flex flex-col items-center gap-8 py-2">
                      {/* Central Engine Node */}
                      <div className="rounded-xl border border-violet-500/40 bg-violet-950/40 px-5 py-2.5 text-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                        <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest block">
                          Backend Core
                        </span>
                        <span className="text-sm font-bold text-white">
                          Automated Integration Engine
                        </span>
                      </div>

                      {/* Animated SVG Connecting Dashed Lines */}
                      <svg className="w-full h-12" viewBox="0 0 300 48" fill="none">
                        <path
                          d="M150 0 V20 H50 V48"
                          stroke="url(#automation-grad-1)"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          className="animate-dash-travel"
                        />
                        <path
                          d="M150 0 V48"
                          stroke="url(#automation-grad-2)"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          className="animate-dash-travel"
                        />
                        <path
                          d="M150 0 V20 H250 V48"
                          stroke="url(#automation-grad-3)"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          className="animate-dash-travel"
                        />
                        <defs>
                          <linearGradient id="automation-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                          <linearGradient id="automation-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#6366f1" />
                          </linearGradient>
                          <linearGradient id="automation-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#f59e0b" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* 3 Connected Integration Nodes */}
                      <div className="grid grid-cols-3 gap-3 w-full">
                        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-center">
                          <span className="text-xs font-mono font-semibold text-emerald-300">
                            WhatsApp
                          </span>
                          <span className="block text-[10px] text-[#A8B3CF] mt-0.5">
                            Customer flows
                          </span>
                        </div>
                        <div className="rounded-lg border border-violet-500/30 bg-violet-500/10 p-2.5 text-center">
                          <span className="text-xs font-mono font-semibold text-violet-300">
                            Payments
                          </span>
                          <span className="block text-[10px] text-[#A8B3CF] mt-0.5">
                            Razorpay & Stripe
                          </span>
                        </div>
                        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-center">
                          <span className="text-xs font-mono font-semibold text-amber-300">
                            ERP & CRM
                          </span>
                          <span className="block text-[10px] text-[#A8B3CF] mt-0.5">
                            Zoho, Tally, ERPNext
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
