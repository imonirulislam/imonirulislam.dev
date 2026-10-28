"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 25, stiffness: 400 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(
        !!target.closest("button, a, [role='button'], .hover-trigger")
      );
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Crosshair */}
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{
              width: isHovered ? 40 : 24,
              height: isHovered ? 40 : 24,
              rotate: isHovered ? 90 : 0,
            }}
            className="border-primary relative rounded-full border border-dashed"
          />

          <div className="bg-primary absolute h-1.5 w-1.5 rounded-full" />

          {/* Axis Labels */}
          <div className="text-primary/60 absolute top-8 left-8 flex flex-col font-mono text-[8px] tracking-tight">
            <span>X:{coords.x}</span>
            <span>Y:{coords.y}</span>
          </div>

          {/* Horizontal Line */}
          <motion.div
            animate={{ width: isHovered ? 60 : 20 }}
            className="bg-primary/20 absolute h-px"
          />
          {/* Vertical Line */}
          <motion.div
            animate={{ height: isHovered ? 60 : 20 }}
            className="bg-primary/20 absolute w-px"
          />
        </div>
      </motion.div>
    </div>
  );
}
