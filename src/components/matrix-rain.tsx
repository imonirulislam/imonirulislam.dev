"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Staggered start
    }

    let animationFrame: number;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981"; // Primary emerald
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );

        // Add brightness at the head of the drop
        if (Math.random() > 0.95) ctx.fillStyle = "#fff";
        else ctx.fillStyle = "#10b981";

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    // Auto-shutdown after 8 seconds
    const shutdownTimer = setTimeout(() => {
      setIsShuttingDown(true);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("toggle-matrix"));
      }, 1000); // Wait for glitch animation to finish
    }, 8000);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(shutdownTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isShuttingDown ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none fixed inset-0 z-[150] bg-black"
      >
        <canvas ref={canvasRef} className="h-full w-full opacity-80" />

        {/* CRT Shut Down Glitch Effect */}
        {isShuttingDown && (
          <motion.div
            initial={{ scaleY: 1, opacity: 1 }}
            animate={{ scaleY: 0.005, opacity: 0.8 }}
            className="absolute inset-0 z-[151] flex items-center justify-center bg-white"
          />
        )}

        {/* System Message during Matrix */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, times: [0, 0.1, 1], repeat: 3 }}
            className="border-primary text-primary border-2 bg-black/80 px-8 py-4 font-mono text-xl font-bold tracking-[0.5em] uppercase backdrop-blur-xl"
          >
            Protocol_Override_Active
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
