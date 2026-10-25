import Reveal from "./Reveal";

export default function Commitments() {
  const commitments = [
    {
      title: "One-day response time",
      rule: "Reply to every message within one working day",
      explanation:
        "No disappearing or waiting days for an update. Every email and question is acknowledged and answered promptly.",
    },
    {
      title: "Fortnightly working demos",
      rule: "A working demo every two weeks",
      explanation:
        "You never have to guess what is happening behind the scenes. Review clickable, testable milestones on real devices.",
    },
    {
      title: "100% intellectual property ownership",
      rule: "Code, designs and accounts owned by you from day one",
      explanation:
        "All git repositories, Figma design assets, domain names, and third-party hosting accounts are created in your name.",
    },
    {
      title: "Zero unexpected costs",
      rule: "Any scope change quoted in writing before starting",
      explanation:
        "If project requirements evolve, we assess the impact, provide a written cost estimate, and wait for your go-ahead first.",
    },
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
            <span
              className="h-px w-8 bg-gradient-to-r from-transparent to-violet-400/50"
              aria-hidden="true"
            />
            <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-950/40 px-3.5 py-1 text-xs font-mono font-medium tracking-wide text-violet-300">
              What you can hold us to
            </span>
            <span
              className="h-px w-8 bg-gradient-to-l from-transparent to-violet-400/50"
              aria-hidden="true"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-violet-200 bg-clip-text text-transparent">
              What You Can Hold Us To
            </span>
          </h2>
          <p className="mt-4 text-base text-[#A8B3CF] leading-relaxed">
            Clear standards we promise in writing for every single client engagement.
          </p>
        </Reveal>

        {/* 4 Commitments Grid with 80ms Staggered Reveals */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {commitments.map((c, idx) => (
            <Reveal
              key={idx}
              delayMs={idx * 80}
              className="flex flex-col"
            >
              <div className="glass-card flex-1 flex items-start gap-4 rounded-2xl p-6 sm:p-7">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.2)]">
                  <span className="font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {c.rule}
                  </h3>
                  <p className="mt-1 text-xs font-mono text-violet-300">
                    {c.title}
                  </p>
                  <p className="mt-2.5 text-sm text-[#A8B3CF] leading-relaxed">
                    {c.explanation}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
