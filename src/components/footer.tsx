"use client";

import { useEffect, useState } from "react";

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
    <footer className="bg-secondary/10 border-border/20 relative overflow-hidden border-t pt-12 pb-12 backdrop-blur-sm md:pb-24">
      {/* Subtle gradient glow */}
      <div className="bg-primary/5 pointer-events-none absolute -bottom-24 left-1/2 h-[200px] w-[500px] -translate-x-1/2 blur-[100px]" />

      <div className="relative z-10 container mx-auto max-w-5xl px-4">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-muted-foreground font-mono text-[10px] font-bold tracking-widest uppercase">
                NODE_STATUS: OPERATIONAL
              </span>
            </div>
            <p className="text-muted-foreground/70 text-xs leading-relaxed">
              A highly available personal nodespace dedicated to systems
              engineering, infrastructure architecture, and scalable backends.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-muted-foreground/50 font-mono text-[9px] tracking-tighter uppercase">
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
            <p className="text-muted-foreground/40 font-mono text-[10px]">
              VER :: 2.4.0-STABLE-{new Date().getFullYear()}
            </p>
          </div>
        </div>

        <div className="border-border/10 flex items-center justify-between border-t pt-8">
          <p className="text-muted-foreground/30 font-mono text-[10px] tracking-[0.3em] uppercase">
            © Monirul Islam // ROOT_ACCESS_GRANTED
          </p>
        </div>
      </div>
    </footer>
  );
}
