import Reveal from "./Reveal";

export default function WhatWeBuild() {
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
            <span
              className="h-px w-8 bg-gradient-to-r from-transparent to-violet-400/50"
              aria-hidden="true"
            />
            <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-950/40 px-3.5 py-1 text-xs font-mono font-medium tracking-wide text-violet-300">
              What we build
            </span>
            <span
              className="h-px w-8 bg-gradient-to-l from-transparent to-violet-400/50"
              aria-hidden="true"
            />
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

        {/* Bento-Style Grid with 80ms Staggered Reveals */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Card 1: Websites & Web Apps (Bento Span 7 on LG, 0ms delay) */}
          <Reveal delayMs={0} className="lg:col-span-7 flex flex-col">
            <article
              id="service-web"
              className="glass-card flex-1 flex flex-col justify-between rounded-2xl p-7 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center rounded-full bg-violet-500/15 border border-violet-500/25 px-3 py-1 text-xs font-medium text-violet-300 font-mono">
                    Web & Portals
                  </span>
                  <a
                    href="#service-web"
                    className="text-xs font-mono text-[#7E8BA8] hover:text-violet-300 transition-colors"
                    aria-label="Direct anchor to websites and web apps"
                  >
                    #service-web
                  </a>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Websites and web apps
                </h3>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#A8B3CF]">
                  Company websites, dashboards, and portals, built to load fast and be found on search engines.
                </p>

                {/* Custom SVG Illustration: Web & Dashboard Wireframe */}
                <div
                  className="mt-6 rounded-xl border border-white/[0.08] bg-[#090e24]/70 p-4"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/[0.06]">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                    <div className="ml-2 h-4 w-44 rounded bg-white/[0.06] flex items-center px-2">
                      <span className="h-1.5 w-24 rounded bg-violet-400/40" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="h-14 rounded-lg bg-white/[0.03] border border-white/[0.05] p-2 flex flex-col justify-between">
                      <div className="h-2 w-10 rounded bg-violet-400/30" />
                      <div className="h-4 w-14 rounded bg-white/20" />
                    </div>
                    <div className="h-14 rounded-lg bg-white/[0.03] border border-white/[0.05] p-2 flex flex-col justify-between">
                      <div className="h-2 w-12 rounded bg-indigo-400/30" />
                      <div className="h-4 w-10 rounded bg-white/20" />
                    </div>
                    <div className="h-14 rounded-lg bg-white/[0.03] border border-white/[0.05] p-2 flex flex-col justify-between">
                      <div className="h-2 w-8 rounded bg-emerald-400/30" />
                      <div className="h-4 w-12 rounded bg-white/20" />
                    </div>
                  </div>
                </div>

                <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-[#A8B3CF]">
                  <li className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 font-bold text-xs">✓</span>
                    <span>Search-optimized technical structure & performance</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 font-bold text-xs">✓</span>
                    <span>Fast-loading web dashboards and administrative portals</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 font-bold text-xs">✓</span>
                    <span>Fully responsive layouts across phone, tablet, and desktop</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-white/[0.08]">
                <a
                  href="#enquiry"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-md"
                >
                  <span>Discuss a web project</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          </Reveal>

          {/* Card 2: Mobile Apps (Bento Span 5 on LG, 80ms delay) */}
          <Reveal delayMs={80} className="lg:col-span-5 flex flex-col">
            <article
              id="service-mobile"
              className="glass-card flex-1 flex flex-col justify-between rounded-2xl p-7 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center rounded-full bg-indigo-500/15 border border-indigo-500/25 px-3 py-1 text-xs font-medium text-indigo-300 font-mono">
                    iOS & Android
                  </span>
                  <a
                    href="#service-mobile"
                    className="text-xs font-mono text-[#7E8BA8] hover:text-indigo-300 transition-colors"
                    aria-label="Direct anchor to mobile apps"
                  >
                    #service-mobile
                  </a>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Mobile apps
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#A8B3CF]">
                  iOS and Android apps for customers, field teams and members, built cross-platform and shipped to both stores.
                </p>

                {/* Custom SVG Illustration: Cross-Platform Mobile Preview */}
                <div
                  className="mt-6 rounded-xl border border-white/[0.08] bg-[#090e24]/70 p-4 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="w-36 h-28 rounded-xl border-2 border-white/[0.12] bg-[#0d132c] p-2 flex flex-col justify-between shadow-inner">
                    <div className="flex justify-between items-center pb-1 border-b border-white/[0.06]">
                      <span className="h-1.5 w-6 rounded bg-indigo-400/60" />
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2.5 w-full rounded bg-white/[0.08]" />
                      <div className="h-2.5 w-3/4 rounded bg-indigo-500/30" />
                    </div>
                    <div className="flex justify-around pt-1 border-t border-white/[0.06]">
                      <span className="h-1.5 w-4 rounded bg-white/20" />
                      <span className="h-1.5 w-4 rounded bg-violet-400/50" />
                      <span className="h-1.5 w-4 rounded bg-white/20" />
                    </div>
                  </div>
                </div>

                <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-[#A8B3CF]">
                  <li className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs">✓</span>
                    <span>Cross-platform codebase targeting iOS & Android</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs">✓</span>
                    <span>Apps for end-customers, field workforce, or members</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs">✓</span>
                    <span>Full support through App Store & Play Store reviews</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-white/[0.08]">
                <a
                  href="#enquiry"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-md"
                >
                  <span>Discuss a mobile app</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          </Reveal>

          {/* Card 3: Automation & Integrations (Bento Span 12, 160ms delay) */}
          <Reveal delayMs={160} className="lg:col-span-12 flex flex-col">
            <article
              id="service-automation"
              className="glass-card flex-1 flex flex-col justify-between rounded-2xl p-7 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-500/25 px-3 py-1 text-xs font-medium text-emerald-300 font-mono">
                    Workflows & APIs
                  </span>
                  <a
                    href="#service-automation"
                    className="text-xs font-mono text-[#7E8BA8] hover:text-emerald-300 transition-colors"
                    aria-label="Direct anchor to automation and integrations"
                  >
                    #service-automation
                  </a>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      Automation and integrations
                    </h3>

                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#A8B3CF]">
                      WhatsApp flows, AI assistants, and links to Razorpay, Stripe, Zoho, Tally and ERPNext.
                    </p>

                    <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-[#A8B3CF]">
                      <li className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">✓</span>
                        <span>Automated WhatsApp customer communications and updates</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">✓</span>
                        <span>Payment gateway connections with Razorpay and Stripe</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">✓</span>
                        <span>Direct sync with accounting and CRM (Zoho, Tally, ERPNext)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Custom SVG Illustration: Node Integration Circuit Map */}
                  <div
                    className="lg:col-span-5 rounded-xl border border-white/[0.08] bg-[#090e24]/70 p-5"
                    aria-hidden="true"
                  >
                    <div className="flex items-center justify-center gap-2 py-3">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                        WhatsApp
                      </span>
                      <span className="h-px w-6 bg-gradient-to-r from-emerald-400 to-violet-400" />
                      <div className="h-10 w-10 rounded-full border border-violet-400/50 bg-violet-600/20 flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.5)]">
                        <span className="h-2 w-2 rounded-full bg-violet-300 animate-pulse" />
                      </div>
                      <span className="h-px w-6 bg-gradient-to-r from-violet-400 to-indigo-400" />
                      <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-[11px] font-mono text-indigo-300">
                        ERPNext
                      </span>
                    </div>
                    <div className="flex justify-around pt-3 border-t border-white/[0.06] text-[10px] font-mono text-[#7E8BA8]">
                      <span>• Razorpay</span>
                      <span>• Stripe</span>
                      <span>• Zoho</span>
                      <span>• Tally</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/[0.08]">
                <a
                  href="#enquiry"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md"
                >
                  <span>Discuss an automation flow</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
