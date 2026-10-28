"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  type Dir,
  DPad,
  GameOverlay,
  keyToDir,
  pad3,
  ScoreBar,
  themeColor,
  useHighScore,
  useSwipe,
} from "./shared";

const GRID = 18;
const CANVAS_PX = 648;
// Food is pink and the head is yellow, so the body never cycles through those.
const BODY_COLORS = ["--pop-lime", "--pop-cyan", "--primary"];

type Point = { x: number; y: number };
type Status = "idle" | "playing" | "paused" | "over";

const STEP: Record<Dir, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE: Record<Dir, Dir> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
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

export function Snake() {
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [newHi, setNewHi] = useState(false);
  const { best, submit } = useHighScore("MI_SNAKE_BEST");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const snakeRef = useRef<Point[]>(START_SNAKE);
  const foodRef = useRef<Point>({ x: 12, y: 9 });
  const dirRef = useRef<Dir>("right");
  // Buffered turns so two quick presses within one tick both register.
  const queueRef = useRef<Dir[]>([]);
  const scoreRef = useRef(0);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const cell = CANVAS_PX / GRID;

    ctx.fillStyle = themeColor("--card");
    ctx.fillRect(0, 0, CANVAS_PX, CANVAS_PX);

    ctx.fillStyle = themeColor("--muted");
    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        ctx.fillRect(x * cell + cell / 2 - 2, y * cell + cell / 2 - 2, 4, 4);
      }
    }

    const block = (p: Point, fill: string) => {
      const inset = 3;
      const size = cell - inset * 2;
      ctx.fillStyle = fill;
      ctx.fillRect(p.x * cell + inset, p.y * cell + inset, size, size);
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#111";
      ctx.strokeRect(p.x * cell + inset, p.y * cell + inset, size, size);
    };

    block(foodRef.current, themeColor("--pop-pink"));
    const body = themeColor(BODY_COLORS[scoreRef.current % BODY_COLORS.length]);
    snakeRef.current
      .slice()
      .reverse()
      .forEach((p, i, arr) =>
        block(p, i === arr.length - 1 ? themeColor("--pop-yellow") : body)
      );
  }, []);

  const reset = useCallback(() => {
    snakeRef.current = START_SNAKE;
    dirRef.current = "right";
    queueRef.current = [];
    foodRef.current = spawnFood(START_SNAKE)!;
    scoreRef.current = 0;
    setScore(0);
    setNewHi(false);
  }, []);

  const gameOver = useCallback(() => {
    setStatus("over");
    setNewHi(submit(scoreRef.current));
  }, [submit]);

  const step = useCallback(() => {
    const queued = queueRef.current.shift();
    if (queued) dirRef.current = queued;
    const d = STEP[dirRef.current];
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

  const pressDir = useCallback(
    (dir: Dir) => {
      if (status === "playing") turn(dir);
      else if (status !== "paused") {
        startOrToggle();
        turn(dir);
      }
    },
    [status, turn, startOrToggle]
  );

  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(step, tickMs(score));
    return () => clearInterval(id);
  }, [status, score, step]);

  useEffect(() => {
    const frame = requestAnimationFrame(draw);
    const onKey = (e: KeyboardEvent) => {
      const dir = keyToDir(e);
      if (dir) {
        e.preventDefault();
        pressDir(dir);
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
  }, [draw, pressDir, startOrToggle]);

  const swipe = useSwipe(pressDir, startOrToggle);

  const overlay = {
    idle: { title: "INSERT_COIN", hint: "Press SPACE or an arrow to start" },
    paused: { title: "PAUSED", hint: "Press SPACE to resume" },
    over: {
      title: "GAME_OVER",
      hint: `Score ${score}${newHi ? " // NEW_HI" : ""}`,
    },
    playing: null,
  }[status];

  return (
    <>
      <ScoreBar
        items={[
          { label: "SCORE", value: pad3(score), className: "bg-pop-yellow" },
          { label: "HI", value: pad3(best), className: "bg-pop-cyan" },
        ]}
      />
      <div
        className="border-border shadow-brutal relative aspect-square w-full touch-none border-2"
        {...swipe}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_PX}
          height={CANVAS_PX}
          className="block h-full w-full"
        />
        {overlay && <GameOverlay {...overlay} onAction={startOrToggle} />}
      </div>
      <DPad onDir={pressDir} />
      <p className="text-muted-foreground hidden text-center text-[10px] tracking-widest uppercase md:block">
        ← ↑ → ↓ / WASD to steer · SPACE to pause
      </p>
    </>
  );
}
