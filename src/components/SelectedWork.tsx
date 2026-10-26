"use client";

import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

export default function SelectedWork() {
  return (
    <section id="work" className="relative py-20 md:py-28 overflow-hidden">
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
              Selected work
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-violet-400/50" aria-hidden="true" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-violet-200 bg-clip-text text-transparent">
              Selected Work
            </span>
          </h2>
          <p className="mt-4 text-base text-[#A8B3CF] leading-relaxed">
            Real software systems engineered for client businesses, from initial architecture to live production.
          </p>
        </Reveal>

        {/* Bento-Style Portfolio Grid with 3D Tilt, Spotlight Glow & Conic Gradient Borders */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Project 1: Recurva (Bento Span 6 on LG) */}
          <Reveal delayMs={0} className="lg:col-span-6 flex flex-col">
            <TiltCard featured={true} className="flex-1 flex flex-col justify-between p-7 sm:p-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-emerald-400">
                    Mobile App & Platform
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                    Production
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Recurva
                </h3>

                <p className="mt-2 text-sm text-[#A8B3CF] leading-relaxed">
                  Retention platform for service businesses like gyms and fitness studios.
                </p>

                {/* Custom Abstract SVG Art: Retention Loop Arcs */}
                <div
                  className="mt-6 rounded-xl border border-white/[0.08] bg-[#090e24]/70 p-4 flex items-center justify-center overflow-hidden h-36 relative"
                  aria-hidden="true"
                >
                  <svg className="w-full h-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                    {/* Concentric Retention Loop Arcs */}
                    <ellipse cx="140" cy="60" rx="110" ry="45" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" className="animate-dash-travel" />
                    <ellipse cx="140" cy="60" rx="80" ry="32" stroke="#6366f1" strokeWidth="2" strokeOpacity="0.6" />
                    <ellipse cx="140" cy="60" rx="45" ry="18" stroke="#10b981" strokeWidth="2.5" />
                    {/* Pulsing Central Node */}
                    <circle cx="140" cy="60" r="5" fill="#10b981" />
                    <circle cx="140" cy="60" r="9" stroke="#10b981" strokeOpacity="0.5" className="animate-ping" />
                    {/* Moving Satellite Node */}
                    <circle cx="220" cy="60" r="4" fill="#a78bfa" />
                  </svg>
                  <span className="absolute bottom-2 right-3 text-[10px] font-mono text-[#7E8BA8]">
                    Illustration · Retention Loops
                  </span>
                </div>

                {/* Architectural Features */}
                <ul className="mt-6 space-y-2 text-xs sm:text-sm text-[#A8B3CF]">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>WhatsApp check-ins & automated renewal nudges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Biometric attendance hardware integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>In-app membership purchases via Razorpay</span>
                  </li>
                </ul>
              </div>

              {/* Stack tags */}
              <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-wrap gap-2">
                {["Flutter", "Node.js", "PostgreSQL", "Razorpay"].map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-mono text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </TiltCard>
          </Reveal>

          {/* Project 2: Prathik Softnet (Bento Span 6 on LG) */}
          <Reveal delayMs={80} className="lg:col-span-6 flex flex-col">
            <TiltCard featured={true} className="flex-1 flex flex-col justify-between p-7 sm:p-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-cyan-400">
                    Enterprise Web Presence
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                    Production
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Prathik Softnet
                </h3>

                <p className="mt-2 text-sm text-[#A8B3CF] leading-relaxed">
                  Enterprise IT hardware solutions partner in Bengaluru & Delhi.
                </p>

                {/* Custom Abstract SVG Art: Grid of Page Tiles */}
                <div
                  className="mt-6 rounded-xl border border-white/[0.08] bg-[#090e24]/70 p-4 flex items-center justify-center overflow-hidden h-36 relative"
                  aria-hidden="true"
                >
                  <svg className="w-full h-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                    {/* Perspective Page Tile Grid */}
                    <g opacity="0.85">
                      <rect x="30" y="25" width="60" height="35" rx="5" fill="#06b6d4" fillOpacity="0.12" stroke="#06b6d4" strokeWidth="1.5" />
                      <rect x="110" y="25" width="60" height="35" rx="5" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" strokeWidth="1.5" />
                      <rect x="190" y="25" width="60" height="35" rx="5" fill="#06b6d4" fillOpacity="0.12" stroke="#06b6d4" strokeWidth="1.5" />

                      <rect x="50" y="68" width="60" height="35" rx="5" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1.5" />
                      <rect x="130" y="68" width="60" height="35" rx="5" fill="#06b6d4" fillOpacity="0.15" stroke="#06b6d4" strokeWidth="1.5" />
                      <rect x="210" y="68" width="60" height="35" rx="5" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1.5" />

                      {/* Data Connecting Lines */}
                      <line x1="90" y1="42" x2="110" y2="42" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="170" y1="42" x2="190" y2="42" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
                    </g>
                  </svg>
                  <span className="absolute bottom-2 right-3 text-[10px] font-mono text-[#7E8BA8]">
                    Illustration · 20+ Page Grid
                  </span>
                </div>

                {/* Architectural Features */}
                <ul className="mt-6 space-y-2 text-xs sm:text-sm text-[#A8B3CF]">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>20+ specialized product & vendor pages built from scratch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>Search presence across Dell, HP, Cisco, and Lenovo categories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>Direct quote request pipeline capturing verified B2B leads</span>
                  </li>
                </ul>
              </div>

              {/* Stack tags */}
              <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-wrap gap-2">
                {["React", "Tailwind CSS", "Vercel", "B2B SEO"].map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-mono text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </TiltCard>
          </Reveal>

          {/* Project 3: QuietPass (Bento Span 12 on LG) */}
          <Reveal delayMs={160} className="lg:col-span-12 flex flex-col">
            <TiltCard featured={true} className="flex-1 flex flex-col justify-between p-7 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono text-violet-400">
                      Mobile App & Cloud Architecture
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono border border-amber-500/30 bg-amber-500/10 text-amber-300">
                      In progress
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    QuietPass
                  </h3>

                  <p className="mt-2 text-sm sm:text-base text-[#A8B3CF] leading-relaxed">
                    Privacy-first household coordination application currently in client testing.
                  </p>

                  <ul className="mt-5 space-y-2 text-xs sm:text-sm text-[#A8B3CF]">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                      <span>Live presence indicators & room reservation schedule</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                      <span>Anonymous gentle nudge notifications without awkward confrontation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                      <span>Low-latency state syncing with Redis pub/sub and FastAPI</span>
                    </li>
                  </ul>
                </div>

                {/* Custom Abstract SVG Art: Soft Presence Dots */}
                <div className="lg:col-span-5 flex justify-center">
                  <div
                    className="w-full max-w-sm rounded-xl border border-white/[0.08] bg-[#090e24]/70 p-5 flex items-center justify-center overflow-hidden h-40 relative"
                    aria-hidden="true"
                  >
                    <svg className="w-full h-full" viewBox="0 0 240 120" fill="none">
                      {/* Presence ripple circles */}
                      <circle cx="60" cy="60" r="30" stroke="#8b5cf6" strokeOpacity="0.25" strokeWidth="1.5" />
                      <circle cx="60" cy="60" r="15" fill="#8b5cf6" fillOpacity="0.2" />
                      <circle cx="60" cy="60" r="6" fill="#a78bfa" />

                      <circle cx="120" cy="40" r="24" stroke="#fb7185" strokeOpacity="0.3" strokeWidth="1.5" />
                      <circle cx="120" cy="40" r="12" fill="#fb7185" fillOpacity="0.2" />
                      <circle cx="120" cy="40" r="5" fill="#fda4af" />

                      <circle cx="180" cy="65" r="35" stroke="#8b5cf6" strokeOpacity="0.25" strokeWidth="1.5" />
                      <circle cx="180" cy="65" r="18" fill="#8b5cf6" fillOpacity="0.2" />
                      <circle cx="180" cy="65" r="7" fill="#c084fc" />

                      {/* Gentle connecting waves */}
                      <path d="M60 60 Q 90 20, 120 40 T 180 65" stroke="#a78bfa" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash-travel" />
                    </svg>
                    <span className="absolute bottom-2 right-3 text-[10px] font-mono text-[#7E8BA8]">
                      Illustration · Presence Dots
                    </span>
                  </div>
                </div>
              </div>

              {/* Stack tags */}
              <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-wrap gap-2">
                {["Flutter", "FastAPI", "PostgreSQL", "Redis", "Firebase", "Cloud Run"].map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-mono text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
