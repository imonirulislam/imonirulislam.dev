"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const LOGO = String.raw`
 __  __   ___
|  \/  | |_ _|
| |\/| |  | |
| |  | |  | |
|_|  |_| |___|
`;

const SWATCHES = [
  "bg-foreground",
  "bg-pop-yellow",
  "bg-pop-pink",
  "bg-pop-cyan",
  "bg-pop-lime",
  "bg-primary",
  "bg-card",
];

const formatUptime = (ms: number) => {
  const total = Math.floor(ms / 1000);
  const mins = Math.floor(total / 60);
  return mins ? `${mins} mins, ${total % 60} secs` : `${total} secs`;
};

export function Neofetch() {
  const [isOpen, setIsOpen] = useState(false);
  const [uptime, setUptime] = useState("");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const open = () => {
      setUptime(formatUptime(performance.now()));
      setIsOpen(true);
    };
    window.addEventListener("open-neofetch", open);
    return () => window.removeEventListener("open-neofetch", open);
  }, []);

  const info: [string, string][] = [
    ["OS", `Monirul-OS ${process.env.NEXT_PUBLIC_APP_VERSION}`],
    ["Host", "Cloudflare Pages // BD-DHK-01"],
    ["Kernel", "Next.js 16 + React 19"],
    ["Uptime", uptime],
    ["Shell", "zsh + ⌘K command palette"],
    ["Theme", `Neo-Brutalist (${resolvedTheme ?? "light"})`],
    ["Font", "Space Grotesk, Space Mono"],
    ["Stack", "Node.js · AWS · Kubernetes · Terraform"],
    ["Role", "Senior Software Engineer"],
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl gap-0 p-0 font-mono sm:max-w-2xl">
        <div className="bg-pop-yellow border-border flex items-center justify-between border-b-2 px-4 py-2 pr-14 text-black">
          <DialogTitle className="text-xs font-bold tracking-widest">
            guest@imonirulislam.dev: ~$ neofetch
          </DialogTitle>
        </div>
        <DialogDescription className="sr-only">
          System information about this portfolio, neofetch style.
        </DialogDescription>

        <div className="flex flex-col gap-6 p-6 sm:flex-row">
          <pre className="text-primary shrink-0 text-xs leading-tight font-bold sm:text-sm">
            {LOGO}
          </pre>
          <div className="min-w-0 flex-1 space-y-1 text-xs">
            <p className="font-bold">
              <span className="text-primary">monirul</span>@
              <span className="text-primary">imonirulislam.dev</span>
            </p>
            <div className="bg-border mb-2 h-0.5 w-full" />
            {info.map(([label, value]) => (
              <p key={label} className="truncate">
                <span className="text-primary font-bold">{label}</span>: {value}
              </p>
            ))}
            <div className="flex gap-1.5 pt-3">
              {SWATCHES.map((swatch) => (
                <span
                  key={swatch}
                  className={`${swatch} border-border h-5 w-5 border-2`}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
