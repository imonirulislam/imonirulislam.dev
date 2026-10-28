"use client";

import { useState, useEffect } from "react";
import { MatrixRain } from "@/components/matrix-rain";
import { HUDOverlay } from "@/components/hud-overlay";
import { CommandPalette } from "@/components/command-palette";
import { Arcade } from "@/components/arcade/arcade";
import { Neofetch } from "@/components/neofetch";

export function GlobalEffects() {
  const [showMatrix, setShowMatrix] = useState(false);

  useEffect(() => {
    const handleToggle = () => setShowMatrix((prev) => !prev);
    window.addEventListener("toggle-matrix", handleToggle);
    return () => window.removeEventListener("toggle-matrix", handleToggle);
  }, []);

  return (
    <>
      {showMatrix && <MatrixRain />}
      <HUDOverlay />
      <CommandPalette />
      <Arcade />
      <Neofetch />
    </>
  );
}
