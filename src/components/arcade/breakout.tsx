"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GameOverlay, ScoreBar, themeColor, useHighScore } from "./shared";

const W = 640;
const H = 480;
const COLS = 8;
const ROW_COLORS = [
  "--pop-pink",
  "--pop-yellow",
  "--pop-lime",
  "--pop-cyan",
  "--primary",
];
const ROW_POINTS = [50, 40, 30, 20, 10];
const BRICK_GAP = 8;
const BRICK_SIDE = 24;
const BRICK_TOP = 48;
const BRICK_W = (W - BRICK_SIDE * 2 - BRICK_GAP * (COLS - 1)) / COLS;
const BRICK_H = 22;
const PADDLE_W = 104;
const PADDLE_H = 14;
const PADDLE_Y = H - 36;
const PADDLE_SPEED = 560;
const BALL = 14;
const LIVES = 3;

type Status = "idle" | "playing" | "paused" | "over";
type Brick = { x: number; y: number; row: number; alive: boolean };

const ballSpeed = (level: number, hits: number) =>
  Math.min(620, 320 + (level - 1) * 40 + hits * 3);

function buildBricks(): Brick[] {
  return ROW_COLORS.flatMap((_, row) =>
    Array.from({ length: COLS }, (_, col) => ({
      x: BRICK_SIDE + col * (BRICK_W + BRICK_GAP),
      y: BRICK_TOP + row * (BRICK_H + BRICK_GAP),
      row,
      alive: true,
    }))
  );
}

export function Breakout() {
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [level, setLevel] = useState(1);
  const [newHi, setNewHi] = useState(false);
  const { best, submit } = useHighScore("MI_BREAKOUT_BEST");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const game = useRef({
    paddleX: W / 2 - PADDLE_W / 2,
    ball: { x: W / 2, y: PADDLE_Y - BALL, vx: 0, vy: 0 },
    stuck: true,
    bricks: buildBricks(),
    hits: 0,
    score: 0,
    lives: LIVES,
    level: 1,
    keys: { left: false, right: false },
  });

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const g = game.current;
    const ink = "#111";

    ctx.fillStyle = themeColor("--card");
    ctx.fillRect(0, 0, W, H);

    ctx.lineWidth = 3;
    ctx.strokeStyle = ink;
    for (const b of g.bricks) {
      if (!b.alive) continue;
      ctx.fillStyle = themeColor(ROW_COLORS[b.row]);
      ctx.fillRect(b.x, b.y, BRICK_W, BRICK_H);
      ctx.strokeRect(b.x, b.y, BRICK_W, BRICK_H);
    }

    ctx.fillStyle = ink;
    ctx.fillRect(g.paddleX + 4, PADDLE_Y + 4, PADDLE_W, PADDLE_H);
    ctx.fillStyle = themeColor("--pop-yellow");
    ctx.fillRect(g.paddleX, PADDLE_Y, PADDLE_W, PADDLE_H);
    ctx.strokeRect(g.paddleX, PADDLE_Y, PADDLE_W, PADDLE_H);

    ctx.fillStyle = themeColor("--foreground");
    ctx.fillRect(g.ball.x - BALL / 2, g.ball.y - BALL / 2, BALL, BALL);

    if (g.stuck && status === "playing") {
      ctx.fillStyle = themeColor("--muted-foreground");
      const mono = getComputedStyle(document.body).getPropertyValue(
        "--font-space-mono"
      );
      ctx.font = `bold 16px ${mono || "monospace"}`;
      ctx.textAlign = "center";
      ctx.fillText("SPACE / TAP TO LAUNCH", W / 2, H / 2 + 40);
    }
  }, [status]);

  const resetBall = useCallback(() => {
    const g = game.current;
    g.stuck = true;
    g.ball = { x: g.paddleX + PADDLE_W / 2, y: PADDLE_Y - BALL, vx: 0, vy: 0 };
  }, []);

  const newGame = useCallback(() => {
    const g = game.current;
    g.bricks = buildBricks();
    g.hits = 0;
    g.score = 0;
    g.lives = LIVES;
    g.level = 1;
    g.paddleX = W / 2 - PADDLE_W / 2;
    resetBall();
    setScore(0);
    setLives(LIVES);
    setLevel(1);
    setNewHi(false);
  }, [resetBall]);

  const launch = useCallback(() => {
    const g = game.current;
    if (!g.stuck) return;
    g.stuck = false;
    const speed = ballSpeed(g.level, g.hits);
    const angle = (Math.random() * 0.6 - 0.3) * Math.PI;
    g.ball.vx = speed * Math.sin(angle);
    g.ball.vy = -speed * Math.cos(angle);
  }, []);

  const primary = useCallback(() => {
    if (status === "playing") {
      if (game.current.stuck) launch();
      else setStatus("paused");
    } else if (status === "paused") {
      setStatus("playing");
    } else {
      newGame();
      setStatus("playing");
    }
  }, [status, launch, newGame]);

  const update = useCallback(
    (dt: number) => {
      const g = game.current;
      const dir = (g.keys.right ? 1 : 0) - (g.keys.left ? 1 : 0);
      g.paddleX = Math.max(
        0,
        Math.min(W - PADDLE_W, g.paddleX + dir * PADDLE_SPEED * dt)
      );

      const b = g.ball;
      if (g.stuck) {
        b.x = g.paddleX + PADDLE_W / 2;
        b.y = PADDLE_Y - BALL;
        return;
      }

      const prevX = b.x;
      const prevY = b.y;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      const r = BALL / 2;

      if (b.x < r) {
        b.x = r;
        b.vx = Math.abs(b.vx);
      } else if (b.x > W - r) {
        b.x = W - r;
        b.vx = -Math.abs(b.vx);
      }
      if (b.y < r) {
        b.y = r;
        b.vy = Math.abs(b.vy);
      }

      if (
        b.vy > 0 &&
        b.y + r >= PADDLE_Y &&
        prevY + r <= PADDLE_Y + 2 &&
        b.x + r >= g.paddleX &&
        b.x - r <= g.paddleX + PADDLE_W
      ) {
        const hit = (b.x - (g.paddleX + PADDLE_W / 2)) / (PADDLE_W / 2);
        const angle = Math.max(-1, Math.min(1, hit)) * (Math.PI / 3);
        const speed = ballSpeed(g.level, g.hits);
        b.vx = speed * Math.sin(angle);
        b.vy = -speed * Math.cos(angle);
        b.y = PADDLE_Y - r;
      }

      const hitIndex = g.bricks.findIndex(
        (brick) =>
          brick.alive &&
          b.x + r >= brick.x &&
          b.x - r <= brick.x + BRICK_W &&
          b.y + r >= brick.y &&
          b.y - r <= brick.y + BRICK_H
      );
      if (hitIndex !== -1) {
        const brick = g.bricks[hitIndex];
        g.bricks = g.bricks.map((other, i) =>
          i === hitIndex ? { ...other, alive: false } : other
        );
        const cameFromSide =
          prevX + r <= brick.x || prevX - r >= brick.x + BRICK_W;
        if (cameFromSide) b.vx = -b.vx;
        else b.vy = -b.vy;
        g.hits += 1;
        g.score += ROW_POINTS[brick.row] * g.level;
        setScore(g.score);
      }

      if (g.bricks.every((brick) => !brick.alive)) {
        g.level += 1;
        g.bricks = buildBricks();
        setLevel(g.level);
        resetBall();
      }

      if (b.y - r > H) {
        g.lives -= 1;
        setLives(g.lives);
        if (g.lives <= 0) {
          setStatus("over");
          setNewHi(submit(g.score));
        } else {
          resetBall();
        }
      }
    },
    [resetBall, submit]
  );

  useEffect(() => {
    if (status !== "playing") {
      const frame = requestAnimationFrame(draw);
      return () => cancelAnimationFrame(frame);
    }
    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      update(dt);
      draw();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [status, update, draw]);

  useEffect(() => {
    const keys = game.current.keys;
    const set = (e: KeyboardEvent, down: boolean) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === "ArrowLeft" || k === "a") keys.left = down;
      else if (k === "ArrowRight" || k === "d") keys.right = down;
      else return false;
      return true;
    };
    const onDown = (e: KeyboardEvent) => {
      if (set(e, true)) e.preventDefault();
      else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        primary();
      }
    };
    const onUp = (e: KeyboardEvent) => {
      set(e, false);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [primary]);

  const movePaddle = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    game.current.paddleX = Math.max(
      0,
      Math.min(W - PADDLE_W, x - PADDLE_W / 2)
    );
    if (status !== "playing") draw();
  };

  const overlay = {
    idle: { title: "INSERT_COIN", hint: "Press SPACE to start" },
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
          {
            label: "SCORE",
            value: String(score).padStart(4, "0"),
            className: "bg-pop-yellow",
          },
          {
            label: "HI",
            value: best === null ? "----" : String(best).padStart(4, "0"),
            className: "bg-pop-cyan",
          },
          { label: "LV", value: String(level), className: "bg-pop-lime" },
          {
            label: "♥",
            value: "■".repeat(Math.max(lives, 0)) || "-",
            className: "bg-pop-pink",
          },
        ]}
      />
      <div className="border-border shadow-brutal relative aspect-[4/3] w-full touch-none border-2">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="block h-full w-full"
          onPointerMove={movePaddle}
          onPointerDown={(e) => {
            movePaddle(e);
            if (status === "playing" && game.current.stuck) launch();
          }}
        />
        {overlay && <GameOverlay {...overlay} onAction={primary} />}
      </div>
      <p className="text-muted-foreground text-center text-[10px] tracking-widest uppercase">
        <span className="hidden md:inline">
          ← → / A D or mouse to move · SPACE to launch &amp; pause
        </span>
        <span className="md:hidden">
          Drag on the board to move · tap to launch
        </span>
      </p>
    </>
  );
}
