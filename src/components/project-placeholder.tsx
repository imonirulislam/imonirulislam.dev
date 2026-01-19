import { Terminal } from "lucide-react";

export const ProjectPlaceholder = () => (
  <div className="bg-secondary/20 group/placeholder relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
    <div className="grid-pattern absolute inset-0 opacity-20" />
    <Terminal className="text-muted-foreground/20 mb-4 h-12 w-12 transition-transform duration-500 group-hover/placeholder:scale-110" />
    <div className="text-muted-foreground/40 z-10 font-mono text-[10px] tracking-[0.4em] uppercase antialiased">
      Non_Visual_Protocol
    </div>
    <div className="mt-2 flex gap-1.5 opacity-30 grayscale">
      <div className="bg-primary/40 h-1.5 w-1.5 animate-pulse rounded-sm" />
      <div className="bg-primary/40 h-1.5 w-1.5 animate-pulse rounded-sm delay-75" />
      <div className="bg-primary/40 h-1.5 w-1.5 animate-pulse rounded-sm delay-150" />
    </div>
  </div>
);
