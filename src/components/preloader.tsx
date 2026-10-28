"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootMessages = [
  "Initializing MI_ROOT kernel...",
  "Compiling Next.js environment...",
  "Calibrating OKLCH color matrix...",
  "Hydrating React visual nodes...",
  "Fetching portfolio telemetry data...",
  "Stacking hard shadows...",
  "System ready.",
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (currentStep < bootMessages.length) {
      const timer = setTimeout(
        () => setCurrentStep((prev) => prev + 1),
        Math.random() * 300 + 150
      );
      return () => clearTimeout(timer);
    }

    let completeTimer: ReturnType<typeof setTimeout>;
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      completeTimer = setTimeout(() => {
        onComplete();
        // Dispatch only AFTER content is visible to ensure correct scroll height calculation
        window.dispatchEvent(new CustomEvent("system-ready"));
      }, 500);
    }, 300);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(completeTimer);
    };
  }, [currentStep, onComplete]);

  const progress = Math.round((currentStep / bootMessages.length) * 100);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: [0.7, 0, 0.3, 1] }}
          className="bg-pop-yellow fixed inset-0 z-[100] flex items-center justify-center p-6 text-black"
        >
          <div className="w-full max-w-md border-2 border-black bg-white font-mono shadow-[8px_8px_0_0_#000]">
            <div className="flex items-center justify-between border-b-2 border-black bg-black px-4 py-2 text-white">
              <span className="text-[10px] font-bold tracking-widest uppercase">
                boot.sh
              </span>
              <span className="text-[10px] font-bold">{progress}%</span>
            </div>

            <div className="h-48 space-y-1 p-4">
              {bootMessages.slice(0, currentStep).map((msg) => (
                <motion.div
                  key={msg}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-[11px]"
                >
                  <span className="bg-pop-lime shrink-0 border border-black px-1 font-bold">
                    OK
                  </span>
                  <span className="truncate">{msg}</span>
                </motion.div>
              ))}
            </div>

            <div className="h-4 border-t-2 border-black">
              <motion.div
                className="bg-pop-pink h-full border-r-2 border-black"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
