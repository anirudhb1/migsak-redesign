export default function Hero() {
  const integrations = [
    "Razorpay",
    "WhatsApp",
    "Stripe",
    "Zoho",
    "Tally",
    "ERPNext",
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-32">
      {/* Background Grid Pattern with Radial Mask */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-mask z-0 opacity-80"
        aria-hidden="true"
      />

      {/* Slow Glowing Radial Drift Background */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full glow-hero blur-3xl animate-glow-drift"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Headline, Copy, CTAs */}
          <div className="lg:col-span-7 max-w-2xl">
            {/* Pill badge with thin line on each side (Stagger 1) */}
            <div className="animate-hero-1 inline-flex items-center gap-3 mb-6">
              <span
                className="h-px w-8 bg-gradient-to-r from-transparent to-violet-400/50"
                aria-hidden="true"
              />
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-950/40 px-3.5 py-1 text-xs font-mono font-medium tracking-wide text-violet-300 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_#a78bfa]" />
                Software Studio · Bengaluru, India
              </span>
              <span
                className="h-px w-8 bg-gradient-to-l from-transparent to-violet-400/50"
                aria-hidden="true"
              />
            </div>

            {/* Gradient Headline Text (Stagger 2) */}
            <h1 className="animate-hero-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              <span className="bg-gradient-to-r from-white via-slate-100 to-violet-200 bg-clip-text text-transparent">
                Web and mobile apps, connected to the way your business runs.
              </span>
            </h1>

            {/* Subhead with Plain Jargon Explanation (Stagger 3) */}
            <p className="animate-hero-3 mt-6 text-base sm:text-lg leading-relaxed text-[#A8B3CF]">
              We design and build websites, mobile apps, and the backend behind them, then connect them to payments, WhatsApp, customer or lead tracking (CRM), and enterprise resource planning (ERP). One team from first screen to production.
            </p>

            {/* Truthful Budget Inclusivity Fact & CTAs (Stagger 4) */}
            <div className="animate-hero-4">
              <div className="mt-5 inline-flex items-center gap-2.5 rounded-xl border border-violet-500/20 bg-[#0d132b]/80 px-4 py-2 text-sm font-medium text-violet-200 backdrop-blur-md">
                <svg className="w-4 h-4 text-violet-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Any budget. We can start with a single feature and grow from there.</span>
              </div>

              {/* CTAs with Arrow Micro-Interactions */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#enquiry"
                  className="group btn-primary inline-flex h-12 items-center justify-center gap-2 rounded-xl px-7 text-sm font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c1d]"
                >
                  <span>Start a project</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
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
                {" "}· Guaranteed reply within one working day.
              </p>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Card Stack (Stagger Entrance) */}
          <div className="animate-hero-card lg:col-span-5 mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Subtle Ambient Backing Glow */}
              <div
                className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-xl opacity-60"
                aria-hidden="true"
              />

              {/* Outer Shell for Product Card Stack */}
              <div className="relative rounded-2xl border border-white/10 bg-[#0c1228]/85 p-6 shadow-2xl backdrop-blur-xl">
                {/* Header of Stack */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]" />
                    <span className="text-xs font-mono font-medium uppercase tracking-wider text-violet-300">
                      Live Production Pipeline
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#7E8BA8]">
                    Shipped Modules
                  </span>
                </div>

                {/* 3 Real Product Cards */}
                <div className="space-y-3">
                  {/* Card 1: Payments */}
                  <div className="rounded-xl border border-white/[0.08] bg-[#111836]/90 p-3.5 shadow-sm hover:border-violet-400/40 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wide">
                            Payments
                          </span>
                          <span className="text-[10px] font-mono text-[#7E8BA8]">
                            Razorpay
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#f1f5f9] leading-snug">
                          Membership renewed in the app through Razorpay
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Notifications */}
                  <div className="rounded-xl border border-white/[0.08] bg-[#111836]/90 p-3.5 shadow-sm hover:border-violet-400/40 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-violet-300 uppercase tracking-wide">
                            Notifications
                          </span>
                          <span className="text-[10px] font-mono text-[#7E8BA8]">
                            QuietPass
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#f1f5f9] leading-snug">
                          Anonymous nudge delivered as a push notification
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Attendance */}
                  <div className="rounded-xl border border-white/[0.08] bg-[#111836]/90 p-3.5 shadow-sm hover:border-violet-400/40 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11m0 0a8 8 0 0016 0" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wide">
                            Attendance
                          </span>
                          <span className="text-[10px] font-mono text-[#7E8BA8]">
                            Recurva
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#f1f5f9] leading-snug">
                          Check-in recorded from the biometric device
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proof Line */}
                <p className="mt-4 pt-3 border-t border-white/[0.08] text-center text-xs font-medium text-[#A8B3CF]">
                  Every example here comes from a project we have shipped.
                </p>

                {/* Strip of Integration Names as Text Chips */}
                <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5">
                  {integrations.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-mono text-[#A8B3CF] hover:text-white hover:border-violet-400/30 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
