"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { MoveUpRight, Globe, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

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
    <header className="border-border bg-background sticky top-0 z-50 w-full border-b-2 font-mono">
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
                className="hover:bg-pop-yellow hover:border-border group relative flex items-center border-2 border-transparent px-2 py-1 text-[10px] font-bold tracking-[0.2em] uppercase transition-all hover:text-black"
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
          <div className="bg-pop-lime border-border shadow-brutal-sm hidden items-center gap-3 border-2 px-3 py-1 text-black lg:flex">
            <div className="flex items-center gap-1.5">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-emerald-700"
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
                    className="w-0.5 rounded-full bg-emerald-700"
                  />
                ))}
              </div>
              <span className="ml-1 text-[9px] font-bold tracking-widest uppercase">
                ONLINE
              </span>
            </div>
            <div className="bg-border/40 h-3 w-px" />
            <div className="flex items-center gap-1.5">
              <Globe className="h-3 w-3" />
              <span className="text-[9px] font-bold tracking-widest uppercase">
                BD-DHK-01
              </span>
            </div>
          </div>

          <div className="border-border flex items-center gap-3 border-l-2 pl-4">
            <ModeToggle />
            <Link
              href="https://github.com/imonirulislam"
              target="_blank"
              className="text-muted-foreground hover:text-primary hidden items-center gap-1 text-[10px] font-bold tracking-widest uppercase transition-colors sm:inline-flex"
            >
              <MoveUpRight className="h-3 w-3" />
            </Link>

            {/* Mobile Menu */}
            <nav className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-sm"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="border-border bg-background font-mono">
                  <div className="mt-8 flex flex-col gap-6">
                    <div className="border-border border-b pb-4">
                      <SheetTitle className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                        Navigation_Module
                      </SheetTitle>
                    </div>
                    <div className="flex flex-col gap-4">
                      {navItems.map((item, i) => (
                        <SheetClose key={item.name} asChild>
                          <Link
                            href={item.href}
                            onClick={(e) => handleScroll(e, item.href)}
                            className="bg-secondary hover:bg-secondary hover:text-primary text-muted-foreground hover:border-primary flex items-center justify-between rounded-md border border-transparent px-4 py-3 text-sm tracking-widest uppercase transition-all"
                          >
                            <span>{item.name}</span>
                            <span className="text-muted-foreground text-[10px]">
                              0{i + 1}
                            </span>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    <div className="bg-secondary border-border mt-auto rounded-lg border p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="h-1.5 w-1.5 rounded-full bg-emerald-700"
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
                                className="w-0.5 rounded-full bg-emerald-700"
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                          ONLINE
                        </span>
                      </div>
                      <div className="text-muted-foreground space-y-2 text-[10px] tracking-wider uppercase">
                        <div className="flex justify-between">
                          <span>Node:</span>
                          <span className="text-foreground font-mono">
                            Active
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Region:</span>
                          <span className="text-foreground font-mono">
                            BD-DHK-01
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
