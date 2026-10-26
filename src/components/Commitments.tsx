"use client";

import Reveal from "./Reveal";

export default function Commitments() {
  const commitments = [
    "A reply to every message within one working day",
    "A working demo every two weeks",
    "Code, designs and accounts owned by you from day one",
    "Any change to scope quoted in writing before we start it",
  ];

  return (
    <section id="commitments" className="relative py-20 md:py-28 overflow-hidden">
      {/* Soft Glow Radial Behind Heading */}
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
              Commitments
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-violet-400/50" aria-hidden="true" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-violet-200 bg-clip-text text-transparent">
              Commitments
            </span>
          </h2>
          <p className="mt-4 text-base text-[#A8B3CF] leading-relaxed">
            What you can hold us to.
          </p>
        </Reveal>

        {/* 4 Commitments Grid with Staggered Spring-Pop Tick Icons */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {commitments.map((title, idx) => (
            <Reveal
              key={idx}
              delayMs={idx * 90}
              className="flex flex-col"
            >
              <div className="glass-card flex-1 flex items-center gap-4 rounded-2xl p-6 sm:p-7 hover:border-violet-400/30 transition-all">
                {/* Spring Pop Icon */}
                <div
                  style={{ animationDelay: `${idx * 120 + 200}ms` }}
                  className="animate-spring-pop flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.2)]"
                >
                  <span className="font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {title}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
