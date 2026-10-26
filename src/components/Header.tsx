"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Process", href: "#process", id: "process" },
  { label: "Commitments", href: "#commitments", id: "commitments" },
  { label: "FAQ", href: "#faq", id: "faq" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Scroll-spy active section observer
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const sectionElements = NAV_LINKS
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -40% 0px",
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-3 z-50 w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Floating Capsule Bar */}
        <div className="flex h-14 items-center justify-between rounded-full border border-white/10 bg-[#090e23]/80 px-4 sm:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          {/* Wordmark Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-full px-2 py-1 transition-colors"
            aria-label="Migsak Home"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa] animate-pulse" />
            <span className="font-extrabold tracking-tight">Migsak</span>
          </Link>

          {/* Desktop Navigation Links with Scroll-Spy Indicator */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-[#A8B3CF]">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                    isActive
                      ? "text-white bg-white/[0.1] shadow-inner font-semibold"
                      : "hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-violet-400 shadow-[0_0_6px_#a78bfa]"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA with Magnetic Hover */}
          <div className="hidden md:flex items-center">
            <MagneticButton maxOffset={4}>
              <a
                href="#enquiry"
                className="btn-primary inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-4 text-xs font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c1d]"
              >
                <span>Start a project</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Smooth Staggered Slide-down */}
        {mobileMenuOpen && (
          <div className="mt-2 rounded-2xl border border-white/10 bg-[#090e23]/95 p-4 shadow-2xl backdrop-blur-2xl md:hidden animate-page-enter">
            <nav className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${idx * 40}ms` }}
                  className="flex h-11 items-center rounded-xl px-4 text-sm font-medium text-[#A8B3CF] hover:bg-white/[0.08] hover:text-white transition-colors animate-page-enter"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 mt-1 border-t border-white/10">
                <a
                  href="#enquiry"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold tracking-wide"
                >
                  <span>Start a project</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
