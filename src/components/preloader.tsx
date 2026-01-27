"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Fingerprint,
  ShieldAlert,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const bootMessages = [
  "Initializing MI_ROOT kernel...",
  "Compiling Next.js environment...",
  "Calibrating OKLCH color matrix...",
  "Hydrating React visual nodes...",
  "Fetching portfolio telemetry data...",
  "Optimizing system HUD animations...",
  "System ready. Awaiting authentication.",
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currentStep < bootMessages.length) {
      const timer = setTimeout(
        () => {
          setCurrentStep((prev) => prev + 1);
        },
        Math.random() * 300 + 150
      );
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setIsBooted(true), 0);
    }
  }, [currentStep]);

  const startScan = () => {
    if (isAuthorized) return;
    setIsAuthenticating(true);
    scanIntervalRef.current = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(scanIntervalRef.current!);
          handleSuccess();
          return 100;
        }
        return prev + 3; // Slightly faster for better UX
      });
    }, 40);
  };

  const stopScan = () => {
    if (isAuthorized) return;
    setIsAuthenticating(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    setScanProgress(0);
  };

  const handleSuccess = () => {
    setIsAuthorized(true);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
        // Dispatch only AFTER content is visible to ensure correct scroll height calculation
        window.dispatchEvent(new CustomEvent("system-ready"));
      }, 500);
    }, 1000);
  };

  const bypassAuth = () => {
    handleSuccess();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-background fixed inset-0 z-[100] flex flex-col items-center justify-center p-6"
        >
          {/* Background Grid Pattern */}
          <div className="grid-pattern pointer-events-none absolute inset-0 opacity-[0.05]" />

          <div className="relative z-10 w-full max-w-md space-y-8 font-mono">
            {!isBooted ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
                  <span className="text-primary text-[10px] font-bold tracking-widest uppercase">
                    System_Initialization_V4
                  </span>
                </div>
                <div className="space-y-1">
                  {bootMessages.slice(0, currentStep).map((msg) => (
                    <motion.div
                      key={msg}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-muted-foreground flex items-center gap-2 text-[10px]"
                    >
                      <span className="shrink-0 font-bold text-emerald-500">
                        [ OK ]
                      </span>
                      <span className="truncate">{msg}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center space-y-8"
              >
                <div className="space-y-2 text-center">
                  <div
                    className={`flex items-center justify-center gap-2 ${isAuthorized ? "text-emerald-500" : "text-primary"}`}
                  >
                    <ShieldAlert
                      className={`h-4 w-4 ${isAuthorized ? "hidden" : "block animate-pulse"}`}
                    />
                    <CheckCircle2
                      className={`h-4 w-4 ${isAuthorized ? "block" : "hidden"}`}
                    />
                    <span className="text-xs font-bold tracking-[0.3em] uppercase">
                      {isAuthorized
                        ? "Access_Granted"
                        : "Authentication_Required"}
                    </span>
                  </div>
                  <p className="text-muted-foreground/60 max-w-[280px] text-[9px] leading-relaxed tracking-widest uppercase">
                    {isAuthorized
                      ? "System unlocked. Initializing session..."
                      : "Hold finger on the scanner below to authorize terminal session"}
                  </p>
                </div>

                {/* Biometric Scanner UI */}
                <div className="group perspective-1000 relative">
                  <motion.div
                    role="button"
                    className={`hover-trigger relative flex h-36 w-36 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                      isAuthenticating
                        ? "border-primary bg-primary/10 scale-105"
                        : "border-border/50 bg-secondary/5"
                    } ${isAuthorized ? "border-emerald-500 bg-emerald-500/10" : "hover:border-primary/50"}`}
                    onMouseDown={startScan}
                    onMouseUp={stopScan}
                    onMouseLeave={stopScan}
                    onTouchStart={startScan}
                    onTouchEnd={stopScan}
                    animate={
                      isAuthenticating
                        ? {
                            boxShadow: [
                              "0 0 0px var(--primary)",
                              "0 0 20px var(--primary)",
                              "0 0 0px var(--primary)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {/* Perfect Circle Progress */}
                    <svg
                      className="absolute inset-0 h-full w-full -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="transparent"
                        className="text-border/10"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="transparent"
                        strokeDasharray="301.59" // 2 * pi * 48
                        animate={{
                          strokeDashoffset:
                            301.59 - (301.59 * scanProgress) / 100,
                        }}
                        className={
                          isAuthorized ? "text-emerald-500" : "text-primary"
                        }
                      />
                    </svg>

                    {/* Scan Line Animation */}
                    <AnimatePresence>
                      {isAuthenticating && !isAuthorized && (
                        <motion.div
                          initial={{ top: "20%", opacity: 0 }}
                          animate={{ top: "80%", opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="bg-primary absolute right-1/4 left-1/4 z-10 h-0.5 shadow-[0_0_15px_var(--primary)]"
                        />
                      )}
                    </AnimatePresence>

                    <Fingerprint
                      className={`h-16 w-16 transition-all duration-500 ${
                        isAuthorized
                          ? "scale-110 text-emerald-500"
                          : isAuthenticating
                            ? "text-primary scale-110 drop-shadow-[0_0_8px_var(--primary)]"
                            : "text-muted-foreground/40"
                      }`}
                    />

                    {/* Interaction Glow */}
                    <div
                      className={`absolute inset-0 rounded-full transition-opacity duration-500 ${isAuthenticating ? "opacity-100" : "opacity-0"} pointer-events-none`}
                    >
                      <div className="bg-primary/20 absolute inset-0 rounded-full blur-2xl" />
                    </div>
                  </motion.div>

                  <div className="absolute right-0 -bottom-14 left-0 text-center">
                    <div
                      className={`flex flex-col items-center gap-1 transition-all duration-300 ${isAuthenticating ? "text-primary" : "text-muted-foreground/40"}`}
                    >
                      <span className="font-mono text-[9px] font-bold tracking-[0.4em] uppercase">
                        {isAuthorized
                          ? "IDENTITY_CONFIRMED"
                          : isAuthenticating
                            ? "EXECUTING_SCAN"
                            : "SCAN_INITIALIZED"}
                      </span>
                      <span className="font-mono text-[8px] tracking-widest opacity-60">
                        {isAuthorized
                          ? "OK"
                          : isAuthenticating
                            ? `${scanProgress}%`
                            : "[ HOLD_TO_AUTHORIZE ]"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bypass Option for better UX */}
                {!isAuthorized && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    onClick={bypassAuth}
                    className="group border-border/30 hover:bg-secondary/20 mt-12 flex items-center gap-2 rounded-sm border px-4 py-2 transition-all"
                  >
                    <span className="text-muted-foreground/60 group-hover:text-primary font-mono text-[9px] tracking-widest uppercase transition-colors">
                      [ Bypass_Auth_Protocols ]
                    </span>
                    <ChevronRight className="text-muted-foreground/40 group-hover:text-primary h-3 w-3 transition-all group-hover:translate-x-0.5" />
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Bottom System Info */}
            <div className="border-border/20 border-t pt-12">
              <div className="text-muted-foreground/40 flex items-end justify-between font-mono text-[8px] tracking-[0.2em] uppercase">
                <div className="space-y-1 text-left">
                  <div>SYS_LOC: 127.0.0.1</div>
                  <div>USR_LVL: GUEST_DEFAULT</div>
                </div>
                <div className="space-y-1 text-right">
                  <div>ENC: SHA-256_ACTIVE</div>
                  <div>SEC: LEVEL_01_AUTH</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
