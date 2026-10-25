import Reveal from "./Reveal";

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Scope",
      tagline: "Written scope & fixed quote",
      description:
        "Map users, screens, and integrations. You receive a detailed written scope and a fixed quote sized to your budget.",
    },
    {
      number: "02",
      title: "Build in phases",
      tagline: "Bi-weekly clickable milestones",
      description:
        "Short development cycles, each ending in something clickable and interactive that you can test on real devices.",
    },
    {
      number: "03",
      title: "Launch",
      tagline: "Store submission & hosting",
      description:
        "Apple App Store and Google Play submission, production hosting setup, error monitoring, and complete operational handover.",
    },
    {
      number: "04",
      title: "Support",
      tagline: "Optional monthly plan",
      description:
        "An optional monthly support plan to handle ongoing maintenance, dependency updates, and feature expansions.",
    },
  ];

  return (
    <section id="process" className="relative py-20 md:py-28 overflow-hidden">
      {/* Soft Glow Radial Gradient Behind Heading */}
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
              How a project runs
            </span>
            <span
              className="h-px w-8 bg-gradient-to-l from-transparent to-violet-400/50"
              aria-hidden="true"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-violet-200 bg-clip-text text-transparent">
              How a Project Runs
            </span>
          </h2>
          <p className="mt-4 text-base text-[#A8B3CF] leading-relaxed">
            A straightforward four-step execution process designed to prevent surprises, scope creep, and hidden costs.
          </p>
        </Reveal>

        {/* 4 Steps Grid with 80ms Staggered Reveals */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <Reveal
              key={step.number}
              delayMs={idx * 80}
              className="flex flex-col"
            >
              <div className="glass-card flex-1 relative flex flex-col justify-between rounded-2xl p-6 sm:p-7">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black font-mono bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                      {step.number}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-violet-400/40" />
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-white tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-xs font-mono text-violet-300 font-medium">
                    {step.tagline}
                  </p>

                  <p className="mt-3 text-sm text-[#A8B3CF] leading-relaxed">
                    {step.description}
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
