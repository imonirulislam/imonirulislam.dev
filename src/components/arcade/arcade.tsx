"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Blocks, BrickWall, Grid2x2, Worm } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Snake } from "./snake";
import { Breakout } from "./breakout";
import { Game2048 } from "./game-2048";
import { StackMatch } from "./stack-match";

const GAMES = [
  {
    id: "snake",
    title: "snake.exe",
    blurb: "Eat, grow, don't bite yourself.",
    icon: Worm,
    color: "bg-pop-lime",
    hiKey: "MI_SNAKE_BEST",
    Component: Snake,
  },
  {
    id: "breakout",
    title: "breakout.exe",
    blurb: "Smash the brick wall, level by level.",
    icon: BrickWall,
    color: "bg-pop-pink",
    hiKey: "MI_BREAKOUT_BEST",
    Component: Breakout,
  },
  {
    id: "2048",
    title: "2048.exe",
    blurb: "Slide and merge tiles up to 2048.",
    icon: Grid2x2,
    color: "bg-pop-yellow",
    hiKey: "MI_2048_BEST",
    Component: Game2048,
  },
  {
    id: "match",
    title: "stack_match.exe",
    blurb: "Memory game with my tech stack.",
    icon: Blocks,
    color: "bg-pop-cyan",
    hiKey: "MI_MATCH_BEST",
    hiLabel: "BEST",
    Component: StackMatch,
  },
] as const;

type GameId = (typeof GAMES)[number]["id"];

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

let greeted = false;

function readHi(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function Arcade() {
  const [isOpen, setIsOpen] = useState(false);
  const [game, setGame] = useState<GameId | null>(null);
  const [cheat, setCheat] = useState(false);

  useEffect(() => {
    if (!greeted) {
      greeted = true;
      console.log(
        "%c INSERT_COIN %c Psst... try ↑ ↑ ↓ ↓ ← → ← → B A anywhere on the page.",
        "background:#ffde59;color:#111;font-weight:bold;padding:4px 8px;border:2px solid #111",
        "color:inherit;padding:4px"
      );
    }

    const open = (e: Event) => {
      const requested = (e as CustomEvent<{ game?: GameId }>).detail?.game;
      setGame(requested ?? null);
      setCheat(false);
      setIsOpen(true);
    };
    const openSnake = () => {
      setGame("snake");
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
        setGame(null);
        setCheat(true);
        setIsOpen(true);
      }
    };

    window.addEventListener("open-arcade", open);
    window.addEventListener("open-snake", openSnake);
    window.addEventListener("keydown", onKonami);
    return () => {
      window.removeEventListener("open-arcade", open);
      window.removeEventListener("open-snake", openSnake);
      window.removeEventListener("keydown", onKonami);
    };
  }, []);

  const current = GAMES.find((g) => g.id === game);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[440px] gap-4 p-5 font-mono sm:max-w-[440px]">
        <div className="flex items-center gap-3 pr-10">
          {current && (
            <button
              onClick={() => setGame(null)}
              aria-label="Back to game menu"
              className="bg-card border-border shadow-brutal-sm brutal-press border-2 p-1"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <DialogTitle className="text-sm font-bold tracking-widest uppercase">
            {current ? current.title : "arcade.exe"}
          </DialogTitle>
        </div>
        <DialogDescription className="sr-only">
          A small arcade of retro games. Pick a game to play.
        </DialogDescription>

        {current ? (
          <current.Component key={current.id} />
        ) : (
          <>
            {cheat && (
              <div className="bg-pop-lime border-border shadow-brutal-sm w-fit -rotate-2 border-2 px-3 py-1 text-xs font-bold text-black">
                CHEAT_CODE_ACCEPTED // +30 LIVES (not really)
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              {GAMES.map((g) => {
                const hi = readHi(g.hiKey);
                return (
                  <button
                    key={g.id}
                    onClick={() => setGame(g.id)}
                    className="bg-card border-border shadow-brutal brutal-lift flex flex-col items-start gap-2 border-2 p-3 text-left"
                  >
                    <span
                      className={`${g.color} border-border border-2 p-1.5 text-black`}
                    >
                      <g.icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-bold">{g.title}</span>
                    <span className="text-muted-foreground text-[10px] leading-snug">
                      {g.blurb}
                    </span>
                    <span className="bg-muted border-border mt-auto border px-1.5 text-[10px] font-bold">
                      {"hiLabel" in g ? g.hiLabel : "HI"} {hi ?? "---"}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-muted-foreground text-center text-[10px] tracking-widest uppercase">
              Psst: ↑ ↑ ↓ ↓ ← → ← → B A
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
