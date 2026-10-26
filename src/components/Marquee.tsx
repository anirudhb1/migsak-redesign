"use client";

import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speedSeconds?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  direction = "left",
  speedSeconds = 28,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const animDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div
      className={`group relative overflow-hidden flex [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] ${className}`}
    >
      <div
        className={`flex min-w-full shrink-0 items-center justify-around gap-3 ${
          pauseOnHover ? "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]" : ""
        }`}
        style={{
          animation: `marquee-scroll ${speedSeconds}s linear infinite ${animDirection}`,
        }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex min-w-full shrink-0 items-center justify-around gap-3 ${
          pauseOnHover ? "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]" : ""
        }`}
        style={{
          animation: `marquee-scroll ${speedSeconds}s linear infinite ${animDirection}`,
        }}
      >
        {children}
      </div>

      <style jsx global>{`
        @keyframes marquee-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-100%, 0, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes marquee-scroll {
            from { transform: none; }
            to { transform: none; }
          }
        }
      `}</style>
    </div>
  );
}
