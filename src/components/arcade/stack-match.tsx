"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  siApachedruid,
  siArgo,
  siDocker,
  siGo,
  siGrafana,
  siKubernetes,
  siLinux,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrometheus,
  siReact,
  siRedis,
  siTerraform,
} from "simple-icons/icons";
import { SimpleIcon } from "@/components/ui/simple-icon";
import { GameOverlay, pad3, ScoreBar, useHighScore } from "./shared";

const ICONS = [
  siNodedotjs,
  siNestjs,
  siDocker,
  siKubernetes,
  siTerraform,
  siArgo,
  siApachedruid,
  siPrometheus,
  siGrafana,
  siPostgresql,
  siMongodb,
  siRedis,
  siGo,
  siLinux,
  siReact,
  siNextdotjs,
];
const PAIRS = 8;
const BACKS = ["bg-pop-yellow", "bg-pop-pink", "bg-pop-cyan", "bg-pop-lime"];

type Card = { id: number; icon: (typeof ICONS)[number] };

function shuffle<T>(items: T[]) {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const deal = (): Card[] =>
  shuffle(
    shuffle(ICONS)
      .slice(0, PAIRS)
      .flatMap((icon) => [icon, icon])
  ).map((icon, id) => ({ id, icon }));

export function StackMatch() {
  const [cards, setCards] = useState<Card[]>(deal);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [newBest, setNewBest] = useState(false);
  const { best, submit } = useHighScore("MI_MATCH_BEST", true);
  const won = matched.size === PAIRS;

  const restart = useCallback(() => {
    setCards(deal());
    setOpen([]);
    setMatched(new Set());
    setMoves(0);
    setNewBest(false);
  }, []);

  useEffect(() => {
    if (open.length !== 2) return;
    const [a, b] = open.map((i) => cards[i]);
    if (a.icon.slug === b.icon.slug) {
      const next = new Set(matched).add(a.icon.slug);
      const timer = setTimeout(() => {
        setMatched(next);
        setOpen([]);
        if (next.size === PAIRS) setNewBest(submit(moves));
      }, 250);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setOpen([]), 750);
    return () => clearTimeout(timer);
  }, [open, cards, matched, moves, submit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "r") restart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [restart]);

  const flip = (index: number) => {
    if (open.length === 2 || open.includes(index)) return;
    if (matched.has(cards[index].icon.slug)) return;
    if (open.length === 1) setMoves((m) => m + 1);
    setOpen([...open, index]);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <ScoreBar
          items={[
            { label: "MOVES", value: pad3(moves), className: "bg-pop-yellow" },
            {
              label: "PAIRS",
              value: `${matched.size}/${PAIRS}`,
              className: "bg-pop-lime",
            },
            { label: "BEST", value: pad3(best), className: "bg-pop-cyan" },
          ]}
        />
        <button
          onClick={restart}
          className="bg-card border-border shadow-brutal-sm brutal-press border-2 px-2 py-0.5 text-[10px] font-bold uppercase"
        >
          New [R]
        </button>
      </div>

      <div className="border-border shadow-brutal bg-muted relative grid aspect-square w-full grid-cols-4 gap-2 border-2 p-2">
        {cards.map((card, i) => {
          const isMatched = matched.has(card.icon.slug);
          const faceUp = isMatched || open.includes(i);
          return (
            <motion.button
              key={card.id}
              onClick={() => flip(i)}
              aria-label={faceUp ? card.icon.title : "Hidden card"}
              animate={{ rotateY: faceUp ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              <span
                className={`${BACKS[i % BACKS.length]} border-border shadow-brutal-sm absolute inset-0 flex items-center justify-center border-2 text-2xl font-bold text-black [backface-visibility:hidden]`}
              >
                ?
              </span>
              <span
                className={`${isMatched ? "bg-pop-lime text-black" : "bg-card text-foreground"} border-border absolute inset-0 flex [transform:rotateY(180deg)] flex-col items-center justify-center gap-1 border-2 [backface-visibility:hidden]`}
              >
                <SimpleIcon icon={card.icon} className="h-1/3 w-1/3" />
                <span className="hidden text-[10px] font-bold uppercase sm:block">
                  {card.icon.title}
                </span>
              </span>
            </motion.button>
          );
        })}
        {won && (
          <GameOverlay
            title="STACK_MATCHED"
            hint={`${moves} moves${newBest ? " // NEW_BEST" : ""}`}
            onAction={restart}
          />
        )}
      </div>

      <p className="text-muted-foreground text-center text-[10px] tracking-widest uppercase">
        Match the tools I work with · fewest moves wins · R to reshuffle
      </p>
    </>
  );
}
