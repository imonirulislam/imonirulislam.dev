"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const GRID = 18;
const CANVAS_PX = 648;
const BEST_KEY = "MI_SNAKE_BEST";
// Food is pink and the head is yellow, so the body never cycles through those.
const BODY_COLORS = ["--pop-lime", "--pop-cyan", "--primary"];

const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

type Point = { x: number; y: number };
type Status = "idle" | "playing" | "paused" | "over";

const DIRS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
} as const;
type Dir = keyof typeof DIRS;

const OPPOSITE: Record<Dir, Dir> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

const KEY_DIRS: Record<string, Dir> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

const START_SNAKE: Point[] = [
  { x: 6, y: 9 },
  { x: 5, y: 9 },
  { x: 4, y: 9 },
];

const tickMs = (score: number) => Math.max(60, 140 - score * 4);

function spawnFood(snake: Point[]): Point | null {
  const free: Point[] = [];
  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      if (!snake.some((p) => p.x === x && p.y === y)) free.push({ x, y });
    }
  }
  return free.length ? free[Math.floor(Math.random() * free.length)] : null;
}

function readBest() {
  try {
    return parseInt(localStorage.getItem(BEST_KEY) || "0");
  } catch {
    return 0;
  }
}

export function SnakeGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const snakeRef = useRef<Point[]>(START_SNAKE);
  const foodRef = useRef<Point>({ x: 12, y: 9 });
  const dirRef = useRef<Dir>("right");
  // Buffered turns so two quick presses within one tick both register.
  const queueRef = useRef<Dir[]>([]);
  const scoreRef = useRef(0);
  const bestRef = useRef(0);
  const touchRef = useRef<Point | null>(null);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const css = getComputedStyle(document.documentElement);
    const color = (name: string) => css.getPropertyValue(name).trim();
    const cell = CANVAS_PX / GRID;

    ctx.fillStyle = color("--card");
    ctx.fillRect(0, 0, CANVAS_PX, CANVAS_PX);

    ctx.fillStyle = color("--muted");
    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        ctx.fillRect(x * cell + cell / 2 - 2, y * cell + cell / 2 - 2, 4, 4);
      }
    }

    const block = (p: Point, fill: string) => {
      const inset = 3;
      ctx.fillStyle = fill;
      ctx.fillRect(
        p.x * cell + inset,
        p.y * cell + inset,
        cell - inset * 2,
        cell - inset * 2
      );
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#111";
      ctx.strokeRect(
        p.x * cell + inset,
        p.y * cell + inset,
        cell - inset * 2,
        cell - inset * 2
      );
    };

    block(foodRef.current, color("--pop-pink"));
    snakeRef.current
      .slice()
      .reverse()
      .forEach((p, i, arr) =>
        block(
          p,
          i === arr.length - 1
            ? color("--pop-yellow")
            : color(BODY_COLORS[scoreRef.current % BODY_COLORS.length])
        )
      );
  }, []);

  const reset = useCallback(() => {
    snakeRef.current = START_SNAKE;
    dirRef.current = "right";
    queueRef.current = [];
    foodRef.current = spawnFood(START_SNAKE)!;
    scoreRef.current = 0;
    setScore(0);
  }, []);

  const gameOver = useCallback(() => {
    setStatus("over");
    const final = scoreRef.current;
    if (final <= bestRef.current) return;
    bestRef.current = final;
    setBest(final);
    try {
      localStorage.setItem(BEST_KEY, String(final));
    } catch {}
  }, []);

  const step = useCallback(() => {
    const queued = queueRef.current.shift();
    if (queued) dirRef.current = queued;
    const d = DIRS[dirRef.current];
    const [head] = snakeRef.current;
    const next = { x: head.x + d.x, y: head.y + d.y };
    const food = foodRef.current;
    const ate = next.x === food.x && next.y === food.y;
    const body = ate ? snakeRef.current : snakeRef.current.slice(0, -1);

    const hitWall =
      next.x < 0 || next.y < 0 || next.x >= GRID || next.y >= GRID;
    if (hitWall || body.some((p) => p.x === next.x && p.y === next.y)) {
      gameOver();
      return;
    }

    snakeRef.current = [next, ...body];
    if (ate) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      const newFood = spawnFood(snakeRef.current);
      if (!newFood) {
        gameOver();
        return;
      }
      foodRef.current = newFood;
    }
    draw();
  }, [draw, gameOver]);

  const turn = useCallback((dir: Dir) => {
    const last = queueRef.current.at(-1) ?? dirRef.current;
    if (dir === last || dir === OPPOSITE[last]) return;
    if (queueRef.current.length < 2) queueRef.current.push(dir);
  }, []);

  const startOrToggle = useCallback(() => {
    if (status === "playing") return setStatus("paused");
    if (status === "paused") return setStatus("playing");
    reset();
    setStatus("playing");
  }, [status, reset]);

  useEffect(() => {
    const open = () => {
      bestRef.current = readBest();
      setBest(bestRef.current);
      setIsOpen(true);
    };
    let progress = 0;
    const onKonami = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable=true]")) return;
      const key = e.key.toLowerCase();
      progress =
        key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        open();
      }
    };

    window.addEventListener("open-snake", open);
    window.addEventListener("keydown", onKonami);
    return () => {
      window.removeEventListener("open-snake", open);
      window.removeEventListener("keydown", onKonami);
    };
  }, []);

  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(step, tickMs(score));
    return () => clearInterval(id);
  }, [status, score, step]);

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(draw);

    const onKey = (e: KeyboardEvent) => {
      const dir = KEY_DIRS[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (dir) {
        e.preventDefault();
        if (status === "playing") turn(dir);
        else if (status !== "paused") {
          startOrToggle();
          turn(dir);
        }
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        startOrToggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, status, draw, turn, startOrToggle]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && status === "playing") setStatus("paused");
  };

  const pressDir = (dir: Dir) => {
    if (status === "playing") turn(dir);
    else if (status !== "paused") {
      startOrToggle();
      turn(dir);
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current;
    const t = e.changedTouches[0];
    touchRef.current = null;
    if (!start || !t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) {
      startOrToggle();
      return;
    }
    if (Math.abs(dx) > Math.abs(dy)) pressDir(dx > 0 ? "right" : "left");
    else pressDir(dy > 0 ? "down" : "up");
  };

  const overlay = {
    idle: { title: "INSERT_COIN", hint: "Press SPACE or an arrow to start" },
    paused: { title: "PAUSED", hint: "Press SPACE to resume" },
    over: { title: "GAME_OVER", hint: "Press SPACE to play again" },
    playing: null,
  }[status];

  const dpad =
    "bg-card border-border shadow-brutal-sm flex h-12 w-12 items-center justify-center border-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[400px] gap-4 p-5 font-mono sm:max-w-[400px]">
        <div className="flex items-center justify-between pr-10">
          <DialogTitle className="text-sm font-bold tracking-widest uppercase">
            snake.exe
          </DialogTitle>
          <div className="flex gap-2 text-[10px] font-bold">
            <span className="bg-pop-yellow border-border border-2 px-2 py-0.5 text-black">
              SCORE {String(score).padStart(3, "0")}
            </span>
            <span className="bg-pop-cyan border-border border-2 px-2 py-0.5 text-black">
              HI {String(best).padStart(3, "0")}
            </span>
          </div>
        </div>
        <DialogDescription className="sr-only">
          Classic snake. Use the arrow keys or WASD to steer and space to pause.
        </DialogDescription>

        <div
          className="border-border shadow-brutal relative aspect-square w-full touch-none border-2"
          onTouchStart={(e) => {
            const t = e.touches[0];
            touchRef.current = { x: t.clientX, y: t.clientY };
          }}
          onTouchEnd={onTouchEnd}
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_PX}
            height={CANVAS_PX}
            className="block h-full w-full"
          />
          {overlay && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <button
                onClick={startOrToggle}
                className="bg-pop-pink border-border shadow-brutal brutal-press -rotate-2 border-2 px-5 py-2 text-lg font-bold tracking-widest text-black"
              >
                {overlay.title}
              </button>
              <span className="bg-card border-border border-2 px-2 py-0.5 text-[10px] uppercase">
                {status === "over"
                  ? `Score ${score}${score > 0 && score >= best ? " // NEW_HI" : ""}`
                  : overlay.hint}
              </span>
            </div>
          )}
        </div>

        <div className="mx-auto grid w-fit grid-cols-3 gap-2 md:hidden">
          <span />
          <button
            aria-label="Up"
            className={dpad}
            onClick={() => pressDir("up")}
          >
            <ArrowUp className="h-5 w-5" />
          </button>
          <span />
          <button
            aria-label="Left"
            className={dpad}
            onClick={() => pressDir("left")}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Down"
            className={dpad}
            onClick={() => pressDir("down")}
          >
            <ArrowDown className="h-5 w-5" />
          </button>
          <button
            aria-label="Right"
            className={dpad}
            onClick={() => pressDir("right")}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <p className="text-muted-foreground hidden text-center text-[10px] tracking-widest uppercase md:block">
          ← ↑ → ↓ / WASD to steer · SPACE to pause
        </p>
      </DialogContent>
    </Dialog>
  );
}
