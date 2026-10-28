"use client";

import { useEffect, useState } from "react";
import { Gamepad2 } from "lucide-react";

export function Footer() {
  const [load, setLoad] = useState([0.42, 0.38, 0.31]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad((prev) =>
        prev.map((val) => {
          const fluctuation = (Math.random() - 0.5) * 0.05;
          const newVal = Math.max(0.1, Math.min(0.9, val + fluctuation));
          return parseFloat(newVal.toFixed(2));
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "REGION", value: "BD-DHK-01" },
    { label: "UPTIME", value: "99.982%" },
    { label: "LOAD", value: load.join(", ") },
    { label: "STACK", value: "TS-NODE-AWS" },
  ];

  return (
    <footer className="bg-pop-yellow border-border relative overflow-hidden border-t-2 pt-12 pb-12 text-black [--border:oklch(0.15_0_0)] [--foreground:oklch(0.15_0_0)] [--muted-foreground:oklch(0.32_0_0)] [--primary:oklch(0.45_0.25_264)] md:pb-24">
      <div className="relative z-10 container mx-auto max-w-5xl px-4">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-muted-foreground font-mono text-[10px] font-bold tracking-widest uppercase">
                NODE_STATUS: OPERATIONAL
              </span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              A highly available personal nodespace dedicated to systems
              engineering, infrastructure architecture, and scalable backends.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-muted-foreground font-mono text-[9px] tracking-tighter uppercase">
                  {stat.label}
                </p>
                <p className="text-muted-foreground font-mono text-[11px] font-bold">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex gap-6">
              {[
                {
                  name: "LinkedIn",
                  href: "https://www.linkedin.com/in/monirulislamrasel/",
                },
                { name: "GitHub", href: "https://github.com/imonirulislam" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary font-mono text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
            <p className="text-muted-foreground font-mono text-[10px]">
              VER :: 2.4.0-STABLE-{new Date().getFullYear()}
            </p>
          </div>
        </div>

        <div className="border-border flex flex-wrap items-center justify-between gap-4 border-t-2 pt-8">
          <p className="text-muted-foreground font-mono text-[10px] tracking-[0.3em] uppercase">
            © Monirul Islam // ROOT_ACCESS_GRANTED
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-snake"))}
            className="bg-pop-pink border-border shadow-brutal brutal-press flex items-center gap-2 border-2 px-4 py-2 font-mono text-[10px] font-bold tracking-[0.2em] uppercase"
          >
            <Gamepad2 className="h-4 w-4" />
            Insert_Coin
          </button>
        </div>
      </div>
    </footer>
  );
}
