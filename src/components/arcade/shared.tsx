"use client";

import { useCallback, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

export type Dir = "up" | "down" | "left" | "right";

export const KEY_DIRS: Record<string, Dir> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

export const keyToDir = (e: KeyboardEvent): Dir | undefined =>
  KEY_DIRS[e.key.length === 1 ? e.key.toLowerCase() : e.key];

// Canvas can't read CSS variables, so resolve theme tokens at draw time.
export function themeColor(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function readStored(key: string) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? null : parseInt(raw);
  } catch {
    return null;
  }
}

export function useHighScore(key: string, lowerIsBetter = false) {
  const [best, setBest] = useState<number | null>(() =>
    typeof window === "undefined" ? null : readStored(key)
  );

  const submit = useCallback(
    (score: number) => {
      const current = readStored(key);
      const isBetter =
        current === null || (lowerIsBetter ? score < current : score > current);
      if (!isBetter || (!lowerIsBetter && score === 0)) return false;
      setBest(score);
      try {
        localStorage.setItem(key, String(score));
      } catch {}
      return true;
    },
    [key, lowerIsBetter]
  );

  return { best, submit };
}

export const pad3 = (n: number | null) =>
  n === null ? "---" : String(n).padStart(3, "0");

export function ScoreBar({
  items,
}: {
  items: { label: string; value: string; className: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2 text-[10px] font-bold">
      {items.map((item) => (
        <span
          key={item.label}
          className={`${item.className} border-border border-2 px-2 py-0.5 text-black`}
        >
          {item.label} {item.value}
        </span>
      ))}
    </div>
  );
}

export function GameOverlay({
  title,
  hint,
  onAction,
}: {
  title: string;
  hint: string;
  onAction: () => void;
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
      <button
        onClick={onAction}
        className="bg-pop-pink border-border shadow-brutal brutal-press -rotate-2 border-2 px-5 py-2 text-lg font-bold tracking-widest text-black"
      >
        {title}
      </button>
      <span className="bg-card border-border border-2 px-2 py-0.5 text-[10px] uppercase">
        {hint}
      </span>
    </div>
  );
}

const DPAD_BUTTON =
  "bg-card border-border shadow-brutal-sm flex h-12 w-12 items-center justify-center border-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

export function DPad({
  onDir,
  only,
}: {
  onDir: (dir: Dir) => void;
  only?: Dir[];
}) {
  const show = (dir: Dir) => !only || only.includes(dir);
  const button = (dir: Dir, label: string, Icon: typeof ArrowUp) =>
    show(dir) ? (
      <button
        aria-label={label}
        className={DPAD_BUTTON}
        onClick={() => onDir(dir)}
      >
        <Icon className="h-5 w-5" />
      </button>
    ) : (
      <span />
    );

  return (
    <div className="mx-auto grid w-fit grid-cols-3 gap-2 md:hidden">
      <span />
      {button("up", "Up", ArrowUp)}
      <span />
      {button("left", "Left", ArrowLeft)}
      {button("down", "Down", ArrowDown)}
      {button("right", "Right", ArrowRight)}
    </div>
  );
}

export function useSwipe(onSwipe: (dir: Dir) => void, onTap?: () => void) {
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  return {
    onTouchStart: (e: React.TouchEvent) => {
      const t = e.touches[0];
      setStart({ x: t.clientX, y: t.clientY });
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const t = e.changedTouches[0];
      if (!start || !t) return;
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      setStart(null);
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return onTap?.();
      if (Math.abs(dx) > Math.abs(dy)) onSwipe(dx > 0 ? "right" : "left");
      else onSwipe(dy > 0 ? "down" : "up");
    },
  };
}
