"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { MoveUpRight, Globe } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];

export function Navbar() {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = elem.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b font-mono backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex items-center gap-1 text-sm font-bold tracking-tight"
          >
            <span className="text-primary">[</span>
            <span className="text-foreground shrink-0 uppercase">
              root@imonirul
            </span>
            <span className="text-muted-foreground">~</span>
            <span className="text-primary">]</span>
            <span className="text-foreground">#</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="bg-primary ml-0.5 h-3.5 w-1.5"
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-muted-foreground hover:text-primary group relative flex items-center py-1 text-[10px] font-medium tracking-[0.2em] uppercase transition-all"
              >
                <span className="text-primary mr-1 -ml-2 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100">
                  {">"}
                </span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-secondary/20 border-border/30 hidden items-center gap-3 rounded-sm border px-3 py-1 lg:flex">
            <div className="flex items-center gap-1.5">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.5)] dark:bg-emerald-500"
              />
              <div className="flex h-2 items-center gap-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: ["20%", "100%", "20%"],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                    className="w-0.5 rounded-full bg-emerald-600 dark:bg-emerald-500"
                  />
                ))}
              </div>
              <span className="text-muted-foreground ml-1 text-[9px] font-bold tracking-widest uppercase">
                ONLINE
              </span>
            </div>
            <div className="bg-border/40 h-3 w-px" />
            <div className="flex items-center gap-1.5">
              <Globe className="text-muted-foreground/50 h-3 w-3" />
              <span className="text-muted-foreground text-[9px] font-bold tracking-widest uppercase">
                BD-DHK-01
              </span>
            </div>
          </div>

          <div className="border-border/40 flex items-center gap-3 border-l pl-4">
            <ModeToggle />
            <Link
              href="https://github.com/imonirulislam"
              target="_blank"
              className="text-muted-foreground hover:text-primary hidden items-center gap-1 text-[10px] font-bold tracking-widest uppercase transition-colors sm:inline-flex"
            >
              <MoveUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
