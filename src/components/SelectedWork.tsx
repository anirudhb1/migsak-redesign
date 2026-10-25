import Reveal from "./Reveal";

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
            <span
              className="h-px w-8 bg-gradient-to-r from-transparent to-violet-400/50"
              aria-hidden="true"
            />
            <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-950/40 px-3.5 py-1 text-xs font-mono font-medium tracking-wide text-violet-300">
              Selected work
            </span>
            <span
              className="h-px w-8 bg-gradient-to-l from-transparent to-violet-400/50"
              aria-hidden="true"
            />
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

        {/* Bento-Style Portfolio Grid with 80ms Staggered Reveals */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Project 1: Recurva (Bento Span 6 on LG, 0ms delay) */}
          <Reveal delayMs={0} className="lg:col-span-6 flex flex-col">
            <article className="glass-card flex-1 flex flex-col justify-between rounded-2xl p-7 sm:p-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-violet-300">
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

                {/* Custom SVG: Recurva Retention & Biometrics Wireframe */}
                <div
                  className="mt-5 rounded-xl border border-white/[0.08] bg-[#090e24]/70 p-4"
                  aria-hidden="true"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="text-[11px] font-mono text-zinc-300">Gym Member Retention</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#A8B3CF]">
                    <span>Biometric Check-in</span>
                    <span className="text-violet-300">WhatsApp 1-Tap Check-in</span>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 text-xs sm:text-sm text-[#A8B3CF]">
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold shrink-0">•</span>
                    <span>Spots members who are slipping and gives staff automated follow-ups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold shrink-0">•</span>
                    <span>One-tap customer check-ins via WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold shrink-0">•</span>
                    <span>Separate dedicated portals for owners, staff, and members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold shrink-0">•</span>
                    <span>In-app membership renewals powered by Razorpay; biometric attendance</span>
                  </li>
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {["Flutter", "Node.js", "PostgreSQL", "Razorpay", "WhatsApp"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#A8B3CF]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 pt-4 border-t border-white/[0.08]">
                <a
                  href="https://recurva.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
                >
                  <span>Visit recurva.in</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </Reveal>

          {/* Project 2: Prathik Softnet (Bento Span 6 on LG, 80ms delay) */}
          <Reveal delayMs={80} className="lg:col-span-6 flex flex-col">
            <article className="glass-card flex-1 flex flex-col justify-between rounded-2xl p-7 sm:p-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-indigo-300">
                    Company Website & Search Presence
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                    Production
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Prathik Softnet
                </h3>

                <p className="mt-2 text-sm text-[#A8B3CF] leading-relaxed">
                  Enterprise IT hardware and infrastructure partner in Bengaluru and Delhi working with Dell, HP, Cisco, Lenovo.
                </p>

                {/* Custom SVG: IT Hardware & Enterprise Node Card */}
                <div
                  className="mt-5 rounded-xl border border-white/[0.08] bg-[#090e24]/70 p-4"
                  aria-hidden="true"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-400" />
                      <span className="text-[11px] font-mono text-zinc-300">Enterprise IT Architecture</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#A8B3CF]">20+ Pages Built</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>Dell · HP · Cisco · Lenovo</span>
                    <span className="text-indigo-300">Quote Pipeline</span>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 text-xs sm:text-sm text-[#A8B3CF]">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold shrink-0">•</span>
                    <span>Had no prior web presence; built modern company website from scratch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold shrink-0">•</span>
                    <span>20+ comprehensive pages covering solutions, industries, product lines, case studies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold shrink-0">•</span>
                    <span>Full technical search setup (titles, descriptions, local business data, sitemap)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold shrink-0">•</span>
                    <span>Clear path to request a quote engineered into every single page</span>
                  </li>
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {["React", "Tailwind CSS", "Vercel", "Search Presence"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#A8B3CF]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 pt-4 border-t border-white/[0.08]">
                <a
                  href="https://www.prathiksoftnet.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                >
                  <span>Visit prathiksoftnet.com</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </Reveal>

          {/* Project 3: QuietPass (Bento Span 12, 160ms delay) */}
          <Reveal delayMs={160} className="lg:col-span-12 flex flex-col">
            <article className="glass-card flex-1 flex flex-col justify-between rounded-2xl p-7 sm:p-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-amber-300">
                    iOS & Android App
                  </span>
                  {/* MUST remain labeled "In progress" per content rule */}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono border border-amber-500/30 bg-amber-500/10 text-amber-300">
                    In progress
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      QuietPass
                    </h3>

                    <p className="mt-2 text-sm sm:text-base text-[#A8B3CF] leading-relaxed">
                      Privacy-first household coordination application.
                    </p>

                    <ul className="mt-5 space-y-2 text-xs sm:text-sm text-[#A8B3CF]">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span>Live presence status for members</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span>Room reservations with automated conflict protection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span>Anonymous nudges delivered as mobile push notifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span>Already running in production and with the client for testing</span>
                      </li>
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {["Flutter", "FastAPI", "PostgreSQL", "Redis", "Firebase", "Google Cloud Run"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#A8B3CF]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Custom SVG: Coordination App Room & Status Preview */}
                  <div
                    className="lg:col-span-5 rounded-xl border border-white/[0.08] bg-[#090e24]/70 p-4"
                    aria-hidden="true"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          <span className="text-xs text-white">Quiet Room 1</span>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-300">Reserved (Protected)</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                          <span className="text-xs text-white">Study Zone</span>
                        </div>
                        <span className="text-[11px] font-mono text-[#A8B3CF]">Anonymous Nudge Sent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 pt-4 border-t border-white/[0.08]">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A8B3CF]">
                  🔒 Active Client Testing Phase (Production Deployment)
                </span>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
