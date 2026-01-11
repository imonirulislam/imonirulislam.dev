"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Activity } from "lucide-react";

const logs = [
  "Fetching system status...",
  "Initializing Node.js runtime...",
  "Handshaking with AWS Mumbai...",
  "Monitoring bare metal health...",
  "Indexing professional history...",
  "Querying project deployments...",
  "Optimizing infrastructure logs...",
  "Uptime: 99.99%",
];

interface LogEntry {
  id: number;
  text: string;
}

export function ActivityLog() {
  const [currentLogs, setCurrentLogs] = useState<LogEntry[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const addLog = () => {
      setCurrentLogs((prev) => {
        const nextLog = logs[Math.floor(Math.random() * logs.length)];
        return [...prev, { id: Date.now(), text: nextLog }].slice(-4);
      });

      const nextDelay = Math.random() * 2500 + 1000;
      timeoutId = setTimeout(addLog, nextDelay);
    };

    timeoutId = setTimeout(addLog, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Auto-expand on mount for a premium entrance effect
  useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pointer-events-none fixed right-6 bottom-0 z-50 flex flex-col items-end">
      {/* Main Drawer Container - FIXED WIDTH for perfect symmetry */}
      <motion.div
        initial={false}
        className="bg-background/90 border-border/50 pointer-events-auto w-[240px] overflow-hidden rounded-t-lg border-x border-t shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.3)] backdrop-blur-xl md:w-[280px]"
      >
        {/* Unified Header Tool-bar */}
        <div
          className="bg-secondary/40 border-border/50 hover:bg-secondary/60 flex h-12 cursor-pointer items-center justify-between border-b px-4 transition-colors select-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            {/* OS-style Traffic Lights - perfectly centered */}
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-red-500/30" />
              <div className="h-2 w-2 rounded-full bg-amber-500/30" />
              <div className="h-2 w-2 rounded-full bg-emerald-500/30" />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-muted-foreground/60 font-mono text-[10px] leading-none font-bold tracking-[0.2em] uppercase">
                MI_STREAM_V2
              </span>

              <div className="bg-border/60 h-3 w-px" />

              <div className="flex items-center gap-2">
                <div className="relative flex h-1.5 w-1.5 flex-shrink-0">
                  <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                  <span className="bg-primary relative inline-flex h-1.5 w-1.5 rounded-full"></span>
                </div>
                <span className="text-primary/70 font-mono text-[10px] leading-none font-bold tracking-widest uppercase">
                  Active
                </span>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 0 : 180 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="hover:bg-primary/5 flex items-center justify-center rounded-md p-1 transition-colors"
          >
            <ChevronDown className="text-muted-foreground/50 h-4 w-4" />
          </motion.div>
        </div>

        {/* Sliding Log Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative"
            >
              <div className="space-y-2 p-5 pt-4">
                {/* CRT Scanline Effect Overlay */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
                  <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground/40 flex items-center gap-2 font-mono text-[9px] font-bold tracking-widest uppercase">
                    <Activity className="h-3.5 w-3.5" /> sys_health: nominal
                  </span>
                </div>

                <div className="flex min-h-[90px] flex-col justify-end space-y-2.5 overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {currentLogs.map((log) => (
                      <motion.div
                        key={log.id}
                        layout
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-muted-foreground/90 dark:text-muted-foreground/70 flex items-start gap-2.5 font-mono text-[9px] leading-relaxed"
                      >
                        <span className="text-primary/70 dark:text-primary/40 shrink-0 font-bold select-none">
                          ❯
                        </span>
                        <span className="overflow-hidden tracking-tighter text-ellipsis whitespace-nowrap uppercase">
                          {log.text}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
