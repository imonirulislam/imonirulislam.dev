"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  ShieldCheck,
  Activity,
  Terminal,
  Wifi,
  ChevronDown,
} from "lucide-react";

export function HUDOverlay() {
  const [section, setSection] = useState("ABOUT");
  const [guestId, setGuestId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("MI_VISITOR_ID") || "";
    }
    return "";
  });
  const [sessionId, setSessionId] = useState("");
  const [visitCount, setVisitCount] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("MI_VISIT_COUNT") || "1");
    }
    return 1;
  });
  const [uptime, setUptime] = useState(0);
  const [isSystemReady, setIsSystemReady] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [latency, setLatency] = useState(22);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll();

  // Decoupled motion value that stays at 0 until system is ready
  const visualProxy = useMotionValue(0);

  const smoothProgress = useSpring(visualProxy, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Pipe scroll progress to proxy only if system is ready
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isSystemReady) {
      visualProxy.set(latest);
      setDisplayProgress(latest);
    }
  });

  useEffect(() => {
    // Real-time Latency Measurement (Ping)
    const measurePing = async () => {
      try {
        const startTime = performance.now();
        await fetch("/favicon.ico", { cache: "no-store", method: "HEAD" });
        const endTime = performance.now();
        const rtt = Math.round(endTime - startTime);
        setLatency(rtt);
      } catch {
        setLatency((prev) =>
          Math.max(10, prev + Math.floor(Math.random() * 5) - 2)
        );
      }
    };

    measurePing();
    const latencyInterval = setInterval(measurePing, 5000);

    // Persistent Identity Logic (localStorage)
    let idArr = localStorage.getItem("MI_VISITOR_ID");
    if (!idArr) {
      idArr = `VX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      localStorage.setItem("MI_VISITOR_ID", idArr || "");
      setTimeout(() => setGuestId(idArr || ""), 0);
    }

    // Visit Count
    if (!sessionStorage.getItem("MI_HAS_COUNTED")) {
      const currentVisits = parseInt(
        localStorage.getItem("MI_VISIT_COUNT") || "0"
      );
      const newVisits = currentVisits + 1;
      localStorage.setItem("MI_VISIT_COUNT", newVisits.toString());
      sessionStorage.setItem("MI_HAS_COUNTED", "true");
      setTimeout(() => setVisitCount(newVisits), 0);
    }

    // Session ID (window-specific)
    const sId = `SID-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setTimeout(() => setSessionId(sId), 0);

    // Uptime Counter
    const uptimeInterval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);

    const handleReady = () => {
      setTimeout(() => {
        const current = scrollYProgress.get();
        const initialValue =
          current >= 0.98 && window.scrollY < 100 ? 0 : current;
        visualProxy.set(initialValue);
        setDisplayProgress(initialValue);
        setIsSystemReady(true);
      }, 800);
    };

    window.addEventListener("system-ready", handleReady);

    const handleScroll = () => {
      const sections = ["about", "tech", "experience", "projects"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setSection(id.toUpperCase());
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("system-ready", handleReady);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(latencyInterval);
      clearInterval(uptimeInterval);
    };
  }, [scrollYProgress, visualProxy]);

  const formatUptime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-70 flex flex-col justify-between p-4 font-mono text-[10px] tracking-widest uppercase md:p-8">
      {/* Top Right: Advanced Session Handshake Report (Expandable) */}
      <div className="fixed right-4 bottom-4 flex flex-col items-end gap-1 md:top-20 md:right-8 md:bottom-auto">
        <AnimatePresence>
          {isSystemReady && (
            <motion.div
              layout
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-card border-border shadow-brutal pointer-events-auto flex flex-col items-start gap-1.5 border-2 p-2"
            >
              {/* Compact View / Header */}
              <motion.div layout className="flex w-full items-center gap-3">
                <div className="text-primary flex items-center gap-2 font-bold">
                  <Terminal className="h-3.5 w-3.5" />
                  <span className="text-[9px]">GUEST::{guestId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  <span className="text-muted-foreground text-[7px]">LIVE</span>
                </div>
                {!isHovered && (
                  <ChevronDown className="text-muted-foreground h-3 w-3 animate-bounce" />
                )}
              </motion.div>

              {/* Expanded View */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-border mt-1 w-full space-y-3 overflow-hidden border-t-2 pt-3"
                >
                  <div className="grid w-full grid-cols-2 gap-x-6 gap-y-2 text-[8px]">
                    <div className="flex flex-col gap-1">
                      <span className="text-muted-foreground font-bold">
                        AUTHORIZATION
                      </span>
                      <span className="bg-pop-lime border-border w-fit border px-1 font-bold text-black">
                        LVL_01_SECURE
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 text-right">
                      <span className="text-muted-foreground font-bold">
                        SESSION_TOKEN
                      </span>
                      <span className="text-foreground">{sessionId}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-muted-foreground font-bold">
                        TOTAL_ACCESS
                      </span>
                      <span className="text-foreground">
                        {visitCount.toString().padStart(2, "0")}_IDENTIFIED
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 text-right">
                      <span className="text-muted-foreground font-bold">
                        UPTIME
                      </span>
                      <span className="text-foreground font-bold tracking-tighter">
                        {formatUptime(uptime)}
                      </span>
                    </div>
                  </div>

                  <div className="border-border flex w-full items-center justify-between border-t-2 pt-2 text-[7px]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="text-primary h-3 w-3" />
                      <span className="text-muted-foreground">
                        SYSTEM_STABLE
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="text-muted-foreground h-3 w-3" />
                      <span className="text-muted-foreground">RTT:</span>
                      <motion.span
                        key={latency}
                        animate={{ scale: [1, 1.1, 1] }}
                        className="text-primary font-bold"
                      >
                        {latency}ms
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Center Left Progress indicator */}
      <AnimatePresence>
        {isSystemReady && (
          <motion.div
            key="center-left-progress"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed top-1/2 left-4 hidden -translate-y-1/2 flex-col items-center gap-4 md:left-8 md:flex"
          >
            <span className="text-muted-foreground rotate-90 text-[8px] font-bold tracking-tighter">
              SCROLL_PROGRESS
            </span>
            <div className="bg-card border-border relative h-32 w-3 overflow-hidden border-2">
              <motion.div
                style={{ scaleY: smoothProgress }}
                className="bg-pop-pink absolute inset-0 origin-top"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="bg-pop-yellow border-border border-2 px-1 font-bold text-black">
                {Math.round(displayProgress * 100)}%
              </span>
              <span className="text-muted-foreground text-[7px] tracking-tighter">
                /{section}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Left: Static decoration (minimized) */}
      <div className="fixed bottom-4 left-4 flex items-center gap-3 opacity-30 md:bottom-8 md:left-8">
        <div className="flex items-center gap-1.5">
          <Activity className="h-3 w-3" />
          <span className="text-[7px]">TELEMETRY_STREAM_ACTIVE</span>
        </div>
      </div>

      {/* Global Progress Bar (Top) */}
      <AnimatePresence>
        {isSystemReady && (
          <motion.div
            key="global-top-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-pop-pink fixed top-0 left-0 z-80 h-1 w-full origin-left"
            style={{ scaleX: smoothProgress }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
