"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  type Dir,
  DPad,
  GameOverlay,
  keyToDir,
  ScoreBar,
  useHighScore,
  useSwipe,
} from "./shared";

const SIZE = 4;
type Board = number[];
type Status = "playing" | "won" | "over";

const TILE_STYLES: Record<number, string> = {
  2: "bg-card text-foreground",
  4: "bg-muted text-foreground",
  8: "bg-pop-yellow text-black",
  16: "bg-pop-lime text-black",
  32: "bg-pop-cyan text-black",
  64: "bg-pop-pink text-black",
  128: "bg-primary text-primary-foreground",
  256: "bg-black text-pop-yellow",
  512: "bg-black text-pop-lime",
  1024: "bg-black text-pop-cyan",
  2048: "bg-pop-pink text-black -rotate-3 shadow-brutal",
};

function addTile(board: Board): Board {
  const empty = board.flatMap((v, i) => (v ? [] : [i]));
  if (!empty.length) return board;
  const next = board.slice();
  next[empty[Math.floor(Math.random() * empty.length)]] =
    Math.random() < 0.9 ? 2 : 4;
  return next;
}

const newBoard = () => addTile(addTile(Array(SIZE * SIZE).fill(0)));

// Index lists for each line, ordered so tiles slide toward index 0.
function lines(dir: Dir): number[][] {
  return Array.from({ length: SIZE }, (_, a) =>
    Array.from({ length: SIZE }, (_, b) => {
      switch (dir) {
        case "left":
          return a * SIZE + b;
        case "right":
          return a * SIZE + (SIZE - 1 - b);
        case "up":
          return b * SIZE + a;
        case "down":
          return (SIZE - 1 - b) * SIZE + a;
      }
    })
  );
}

function slide(board: Board, dir: Dir) {
  const next = board.slice();
  let gained = 0;
  for (const line of lines(dir)) {
    const values = line.map((i) => board[i]).filter(Boolean);
    const merged: number[] = [];
    for (let i = 0; i < values.length; i++) {
      if (values[i] === values[i + 1]) {
        merged.push(values[i] * 2);
        gained += values[i] * 2;
        i++;
      } else {
        merged.push(values[i]);
      }
    }
    line.forEach((idx, i) => (next[idx] = merged[i] ?? 0));
  }
  const moved = next.some((v, i) => v !== board[i]);
  return { next, gained, moved };
}

const canMove = (board: Board) =>
  (["left", "right", "up", "down"] as Dir[]).some(
    (dir) => slide(board, dir).moved
  );

export function Game2048() {
  const [board, setBoard] = useState<Board>(newBoard);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<Status>("playing");
  const [keepGoing, setKeepGoing] = useState(false);
  const [newHi, setNewHi] = useState(false);
  const { best, submit } = useHighScore("MI_2048_BEST");

  const restart = useCallback(() => {
    setBoard(newBoard());
    setScore(0);
    setStatus("playing");
    setKeepGoing(false);
    setNewHi(false);
  }, []);

  const move = useCallback(
    (dir: Dir) => {
      if (status !== "playing") return;
      const { next, gained, moved } = slide(board, dir);
      if (!moved) return;
      const withTile = addTile(next);
      const total = score + gained;
      setBoard(withTile);
      setScore(total);
      if (!keepGoing && withTile.includes(2048)) {
        setStatus("won");
        submit(total);
      } else if (!canMove(withTile)) {
        setStatus("over");
        setNewHi(submit(total));
      }
    },
    [board, score, status, keepGoing, submit]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const dir = keyToDir(e);
      if (dir) {
        e.preventDefault();
        move(dir);
      } else if (e.key.toLowerCase() === "r") {
        restart();
      } else if ((e.key === " " || e.key === "Enter") && status !== "playing") {
        e.preventDefault();
        if (status === "won") {
          setKeepGoing(true);
          setStatus("playing");
        } else restart();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move, restart, status]);

  const swipe = useSwipe(move);

  return (
    <>
      <div className="flex items-center justify-between gap-2">
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
          ]}
        />
        <button
          onClick={restart}
          className="bg-card border-border shadow-brutal-sm brutal-press border-2 px-2 py-0.5 text-[10px] font-bold uppercase"
        >
          New [R]
        </button>
      </div>

      <div
        className="border-border shadow-brutal bg-muted relative grid aspect-square w-full touch-none grid-cols-4 gap-2 border-2 p-2"
        {...swipe}
      >
        {board.map((value, i) => (
          <div key={i} className="bg-background relative">
            {value > 0 && (
              <motion.div
                key={`${i}-${value}`}
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.12 }}
                className={`${TILE_STYLES[value] ?? "text-pop-pink bg-black"} border-border absolute inset-0 flex items-center justify-center border-2 font-bold ${value >= 1024 ? "text-lg" : "text-2xl"}`}
              >
                {value}
              </motion.div>
            )}
          </div>
        ))}
        {status === "won" && (
          <GameOverlay
            title="2048!"
            hint="SPACE to keep going"
            onAction={() => {
              setKeepGoing(true);
              setStatus("playing");
            }}
          />
        )}
        {status === "over" && (
          <GameOverlay
            title="GAME_OVER"
            hint={`Score ${score}${newHi ? " // NEW_HI" : ""}`}
            onAction={restart}
          />
        )}
      </div>

      <DPad onDir={move} />
      <p className="text-muted-foreground hidden text-center text-[10px] tracking-widest uppercase md:block">
        ← ↑ → ↓ / WASD to slide · R for a new game
      </p>
    </>
  );
}
