"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does pricing work?",
      a: "Pricing is a fixed quote after the first call. We review your requirements, determine the scope, and provide a fixed quote. Any change to scope is quoted in writing before we start it.",
    },
    {
      q: "What budget sizes do you work with?",
      a: "Any budget. We can start with a single feature and grow from there.",
    },
    {
      q: "How is the project timeline established?",
      a: "The timeline is established during our initial scoping call. We deliver a working demo every two weeks so you see regular progress.",
    },
    {
      q: "Who owns the code, design assets, and accounts?",
      a: "You do. Code, designs and accounts are owned by you from day one. Everything is created in your repositories and infrastructure.",
    },
    {
      q: "Do you offer post-launch support and maintenance?",
      a: "Yes. Once your project launches and goes through store submission or deployment, we offer an optional monthly support plan for ongoing updates, monitoring, and improvements.",
    },
  ];

  return (
    <section id="faq" className="relative py-20 md:py-28 overflow-hidden">
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
              Questions owners ask
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-violet-400/50" aria-hidden="true" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-violet-200 bg-clip-text text-transparent">
              Questions Owners Ask
            </span>
          </h2>
          <p className="mt-4 text-base text-[#A8B3CF] leading-relaxed">
            Direct, plain-English answers regarding how we price, build, and support software.
          </p>
        </Reveal>

        {/* Accordion List Wrapped in Reveal */}
        <Reveal delayMs={80} className="mt-14 max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-white/10 p-5 sm:p-6 transition-all duration-300 hover:border-violet-400/30"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between text-left text-base sm:text-lg font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg py-1"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 tracking-tight">{faq.q}</span>
                  <span
                    className={`ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-violet-300 text-base font-mono transition-transform duration-300 ${
                      isOpen ? "rotate-45 border-violet-400/40 text-violet-200 bg-violet-500/20" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Smooth Height CSS Grid Transition */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-3.5 pt-3.5 border-t border-white/[0.06]" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm sm:text-base leading-relaxed text-[#A8B3CF]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
