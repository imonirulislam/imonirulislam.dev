"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  Terminal,
  Hash,
  ExternalLink,
  Moon,
  Sun,
  Monitor,
  Zap,
  Code,
} from "lucide-react";
import { useTheme } from "next-themes";

const NAV_ACTIONS = [
  { id: "about", icon: Hash, label: "Navigate: About", shortcut: "G A" },
  {
    id: "experience",
    icon: Hash,
    label: "Navigate: Experience",
    shortcut: "G E",
  },
  { id: "projects", icon: Hash, label: "Navigate: Projects", shortcut: "G P" },
  { id: "tech", icon: Hash, label: "Navigate: Tech Stack", shortcut: "G T" },
];

const SYS_ACTIONS = [
  {
    id: "theme-dark",
    icon: Moon,
    label: "Theme: Switch to Dark",
    shortcut: "T D",
  },
  {
    id: "theme-light",
    icon: Sun,
    label: "Theme: Switch to Light",
    shortcut: "T L",
  },
  {
    id: "github",
    icon: ExternalLink,
    label: "Link: Open GitHub",
    shortcut: "L G",
  },
];

const EASTER_EGGS = [
  { id: "matrix", icon: Code, label: "Protocol: /matrix", shortcut: "EXE" },
  { id: "neofetch", icon: Zap, label: "Protocol: /neofetch", shortcut: "EXE" },
];

interface Action {
  id: string;
  icon: React.ElementType;
  label: string;
  shortcut: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { setTheme } = useTheme();

  const handleAction = useCallback(
    (id: string) => {
      switch (id) {
        case "about":
        case "experience":
        case "projects":
        case "tech":
          const el = document.getElementById(id);
          el?.scrollIntoView({ behavior: "smooth" });
          break;
        case "theme-dark":
          setTheme("dark");
          break;
        case "theme-light":
          setTheme("light");
          break;
        case "github":
          window.open("https://github.com/imonirulislam", "_blank");
          break;
        case "matrix":
          window.dispatchEvent(new CustomEvent("toggle-matrix"));
          break;
        case "neofetch":
          alert(
            "System Architecture: Monirul-OS v4.2\nKernel: imonirul-core-1.0.0\nUptime: 99.9%\nTheme: Geist-Mono\nStatus: Authorized"
          );
          break;
      }
      setIsOpen(false);
      setSearch("");
    },
    [setTheme]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  const allActions = [...NAV_ACTIONS, ...SYS_ACTIONS, ...EASTER_EGGS];
  const filteredActions = allActions.filter((action) =>
    action.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[20vh]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-card border-border shadow-brutal-lg relative w-full max-w-lg overflow-hidden border-2 p-2"
            >
              <div className="border-border flex items-center gap-3 border-b p-3">
                <Search className="text-muted-foreground h-4 w-4" />
                <input
                  autoFocus
                  placeholder="Execute command or search..."
                  className="placeholder:text-muted-foreground w-full bg-transparent font-mono text-sm outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && filteredActions.length > 0) {
                      handleAction(filteredActions[0].id);
                    }
                  }}
                />
                <div className="border-border flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5">
                  <Command className="text-muted-foreground h-2.5 w-2.5" />
                  <span className="text-muted-foreground font-mono text-[9px] uppercase">
                    K
                  </span>
                </div>
              </div>

              <div className="scrollbar-hide max-h-[300px] overflow-y-auto p-2">
                {search === "" && (
                  <>
                    <div className="text-muted-foreground px-2 py-1.5 font-mono text-[10px] tracking-widest uppercase">
                      Navigation
                    </div>
                    {NAV_ACTIONS.map((action) => (
                      <ActionItem
                        key={action.id}
                        action={action}
                        onClick={() => handleAction(action.id)}
                      />
                    ))}
                    <div className="text-muted-foreground mt-2 px-2 py-1.5 font-mono text-[10px] tracking-widest uppercase">
                      System
                    </div>
                    {SYS_ACTIONS.map((action) => (
                      <ActionItem
                        key={action.id}
                        action={action}
                        onClick={() => handleAction(action.id)}
                      />
                    ))}
                    <div className="text-muted-foreground mt-2 px-2 py-1.5 font-mono text-[10px] tracking-widest uppercase">
                      Reserved
                    </div>
                    {EASTER_EGGS.map((action) => (
                      <ActionItem
                        key={action.id}
                        action={action}
                        onClick={() => handleAction(action.id)}
                      />
                    ))}
                  </>
                )}
                {search !== "" &&
                  filteredActions.map((action) => (
                    <ActionItem
                      key={action.id}
                      action={action}
                      onClick={() => handleAction(action.id)}
                    />
                  ))}

                {filteredActions.length === 0 && (
                  <div className="p-8 text-center">
                    <Terminal className="text-muted-foreground mx-auto mb-4 h-8 w-8" />
                    <p className="text-muted-foreground font-mono text-sm">
                      No protocols found for &apos;{search}&apos;
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-secondary border-border flex items-center justify-between border-t p-3">
                <div className="flex items-center gap-4">
                  <div className="text-muted-foreground flex items-center gap-1.5 font-mono text-[9px]">
                    <kbd className="border-border rounded border px-1">↑↓</kbd>
                    <span>Navigate</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-1.5 font-mono text-[9px]">
                    <kbd className="border-border rounded border px-1">
                      ENTER
                    </kbd>
                    <span>Execute</span>
                  </div>
                </div>
                <div className="text-muted-foreground flex items-center gap-1 font-mono text-[9px] tracking-tighter uppercase">
                  <Monitor className="h-3 w-3" />
                  <span>SYSTEM_V4.2</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function ActionItem({
  action,
  onClick,
}: {
  action: Action;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group hover:bg-primary/10 flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left font-mono transition-colors"
    >
      <div className="flex items-center gap-3">
        <action.icon className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
        <span className="text-sm">{action.label}</span>
      </div>
      <span className="text-muted-foreground group-hover:text-primary/60 text-[10px]">
        {action.shortcut}
      </span>
    </button>
  );
}
