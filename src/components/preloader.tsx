"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootMessages = [
  "Initializing MI_ROOT kernel...",
  "Compiling Next.js environment...",
  "Calibrating OKLCH color matrix...",
  "Hydrating React visual nodes...",
  "Fetching portfolio telemetry data...",
  "Optimizing system HUD animations...",
  "System ready. Welcome, USER.",
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (currentStep < bootMessages.length) {
      const timer = setTimeout(
        () => {
          setCurrentStep((prev) => prev + 1);
        },
        Math.random() * 400 + 200
      ); // Random typing/loading feel
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 500); // Wait for fade out animation
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-background fixed inset-0 z-[100] flex flex-col items-center justify-center p-6"
        >
          <div className="w-full max-w-md space-y-2 font-mono">
            <div className="mb-6 flex items-center gap-2">
              <div className="bg-primary h-3 w-3 animate-pulse rounded-full" />
              <span className="text-primary text-xs font-bold tracking-widest uppercase">
                Booting System :: Monirul Islam
              </span>
            </div>

            <div className="space-y-1">
              {bootMessages.slice(0, currentStep).map((msg) => (
                <motion.div
                  key={msg}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-muted-foreground flex items-center gap-2 text-[11px] md:text-xs"
                >
                  <span className="shrink-0 font-bold text-emerald-500">
                    [ OK ]
                  </span>
                  <span className="truncate">{msg}</span>
                </motion.div>
              ))}

              {currentStep < bootMessages.length && (
                <div className="flex items-center gap-2">
                  <span className="text-primary shrink-0 animate-pulse font-bold">
                    [ .. ]
                  </span>
                  <span className="text-foreground bg-foreground/10 px-1 text-[11px] md:text-xs">
                    {bootMessages[currentStep]}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-8">
              <div className="bg-secondary h-1 w-full overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${(currentStep / bootMessages.length) * 100}%`,
                  }}
                  className="bg-primary h-full"
                />
              </div>
              <div className="text-muted-foreground mt-2 flex items-center justify-between font-mono text-[9px] tracking-[0.2em] uppercase">
                <span>Status: Initializing</span>
                <span>
                  {Math.round((currentStep / bootMessages.length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
