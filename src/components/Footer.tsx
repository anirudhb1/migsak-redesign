import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    solutions: [
      { name: "Web & Mobile", href: "https://www.migsak.com/solutions/web-mobile" },
      { name: "AI Automation", href: "https://www.migsak.com/solutions/ai-automation" },
      { name: "Custom Software", href: "https://www.migsak.com/solutions/custom-software" },
    ],
    company: [
      { name: "Work", href: "https://www.migsak.com/work" },
      { name: "About", href: "https://www.migsak.com/about" },
      { name: "Careers", href: "https://www.migsak.com/careers" },
      { name: "Contact", href: "https://www.migsak.com/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "https://www.migsak.com/privacy" },
      { name: "Terms of Service", href: "https://www.migsak.com/terms" },
    ],
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#050814] overflow-hidden pt-16 pb-12">
      {/* Large faint Migsak wordmark watermark at the bottom */}
      <div
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 w-full text-center text-[14vw] font-black tracking-tighter text-white/[0.02] select-none leading-none z-0"
        aria-hidden="true"
      >
        MIGSAK
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand info */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="flex items-center text-2xl font-bold tracking-tight text-white hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-md transition-colors"
              aria-label="Migsak Home"
            >
              <span>Migsak</span>
            </Link>
            <p className="mt-3.5 text-sm text-[#A8B3CF] max-w-sm leading-relaxed">
              Web and mobile apps, connected to the way your business runs.
            </p>
            <div className="mt-5 text-sm text-[#A8B3CF] space-y-1.5">
              <p>
                <strong className="text-white font-medium">Email:</strong>{" "}
                <a
                  href="mailto:contact@migsak.com"
                  className="group relative inline-block text-violet-300 hover:text-white transition-colors"
                >
                  contact@migsak.com
                  <span className="absolute bottom-0 left-0 h-px w-full bg-violet-400 scale-x-100 transition-transform origin-left" />
                </a>
              </p>
              <p>
                <strong className="text-white font-medium">Location:</strong> Bengaluru, Karnataka, India
              </p>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-violet-300">
              Solutions
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#A8B3CF]">
              {links.solutions.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block hover:text-white transition-colors"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-violet-400 transition-all duration-200 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-violet-300">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#A8B3CF]">
              {links.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block hover:text-white transition-colors"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-violet-400 transition-all duration-200 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Internal Access */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-violet-300">
              Legal & Access
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#A8B3CF]">
              {links.legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block hover:text-white transition-colors"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-violet-400 transition-all duration-200 group-hover:w-full" />
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-white/[0.08]">
                <Link
                  href="/admin/login"
                  className="text-xs font-mono text-[#7E8BA8] hover:text-violet-300 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>🔒 Admin Portal</span>
                  <span className="text-[10px] text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E8BA8]">
          <p>© {currentYear} Migsak. All rights reserved. Evaluation redesign.</p>
          <p>Bengaluru, India · contact@migsak.com</p>
        </div>
      </div>
    </footer>
  );
}
