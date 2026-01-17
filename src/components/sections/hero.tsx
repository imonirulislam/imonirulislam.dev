"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Briefcase,
  Building,
  Terminal,
  ShieldCheck,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimpleIcon } from "@/components/ui/simple-icon";
import { siGithub, siX } from "simple-icons/icons";
import { FaLinkedin } from "react-icons/fa";

export function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="scroll-mt-20 overflow-hidden py-12 md:py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-12 lg:grid-cols-12"
            >
              <div className="space-y-6 lg:col-span-7">
                <Skeleton className="bg-secondary/20 h-4 w-48" />
                <div className="space-y-4">
                  <Skeleton className="bg-secondary/20 h-16 w-3/4" />
                  <Skeleton className="bg-secondary/20 h-16 w-1/2" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="bg-secondary/20 h-6 w-full" />
                  <Skeleton className="bg-secondary/20 h-6 w-2/3" />
                </div>
                <div className="space-y-4 py-2">
                  <Skeleton className="bg-secondary/20 h-12 w-64 rounded-lg" />
                  <Skeleton className="bg-secondary/20 h-3 w-40" />
                </div>
                <div className="flex gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="bg-secondary/20 h-10 w-24" />
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5">
                <Skeleton className="bg-secondary/10 h-[400px] w-full rounded-xl" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12"
            >
              <div className="lg:col-span-7">
                <div className="text-muted-foreground mb-8 flex animate-pulse items-center gap-2 font-mono text-xs tracking-widest uppercase">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  System Online :: imonirulislam.dev
                </div>
                <h1 className="mb-8 text-4xl leading-tight font-bold tracking-tight md:text-5xl">
                  Architecting{" "}
                  <span className="text-muted-foreground">reliable</span>{" "}
                  systems and
                  <span className="text-muted-foreground"> scalable</span>{" "}
                  <br /> infrastructure
                </h1>
                <p className="text-muted-foreground mb-10 max-w-xl text-base leading-relaxed md:text-lg">
                  Bridging the gap between software architecture and hardware
                  reality. I lead technical initiatives to build secure,
                  scalable, and efficient systems for the modern web.
                </p>
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="group relative">
                    <div className="from-primary/50 to-secondary/50 absolute -inset-0.5 animate-pulse rounded-lg bg-gradient-to-r opacity-30 blur transition duration-500 group-hover:opacity-100" />
                    <Button
                      className="bg-background border-primary/20 hover:bg-primary/5 hover:border-primary/50 text-foreground relative h-12 overflow-hidden rounded-lg border px-8 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                      asChild
                    >
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                      >
                        <div className="bg-secondary/10 absolute inset-0 translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0" />
                        <span className="relative z-10 flex items-center gap-2">
                          <span className="text-primary group-hover:animate-pulse">
                            [
                          </span>
                          <Download className="h-4 w-4" />
                          <span>DownLoad_Resume</span>
                          <span className="text-primary group-hover:animate-pulse">
                            ]
                          </span>
                        </span>
                      </a>
                    </Button>
                  </div>

                  <div className="text-muted-foreground/60 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
                    <span className="bg-primary/40 h-1.5 w-1.5 animate-pulse rounded-full" />
                    <span>File_Size: 2.4MB</span>
                    <span className="text-border">|</span>
                    <span>Format: PDF</span>
                  </div>
                </div>
                <div className="mb-12 flex flex-wrap gap-4 font-mono text-[10px] tracking-widest uppercase">
                  {[
                    { label: "OS", value: "Linux" },
                    { label: "Stack", value: "Node/AWS" },
                    { label: "Role", value: "Systems" },
                    { label: "Status", value: "Active" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-secondary/20 border-border/30 rounded-sm border px-3 py-1.5 backdrop-blur-sm"
                    >
                      <span className="text-muted-foreground/60 mr-2">
                        {stat.label}:
                      </span>
                      {stat.value}
                    </div>
                  ))}
                </div>
              </div>

              <div className="group relative lg:col-span-5">
                <div className="from-primary/20 to-primary/5 absolute -inset-1 rounded-2xl bg-gradient-to-r opacity-50 blur-xl transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />

                <div className="bg-secondary/10 border-border/50 relative overflow-hidden rounded-xl border shadow-2xl backdrop-blur-xl">
                  <div className="bg-secondary/20 border-border/30 flex items-center justify-between border-b p-1 px-4">
                    <div className="flex gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-red-500/30" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500/30" />
                      <div className="h-2 w-2 rounded-full bg-emerald-500/30" />
                    </div>
                    <div className="text-muted-foreground/60 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
                      <Terminal className="h-3 w-3" /> identity_report.sh
                    </div>
                  </div>

                  <div className="space-y-8 p-8">
                    <div className="flex items-start gap-6">
                      <div className="relative shrink-0">
                        <div className="bg-secondary/40 border-border/50 group/avatar relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg border">
                          <div className="grid-pattern absolute inset-0 opacity-30" />
                          <div className="via-primary/5 to-primary/10 absolute inset-0 bg-gradient-to-b from-transparent" />
                          <span className="text-muted-foreground/30 font-mono text-3xl font-bold transition-transform duration-500 group-hover/avatar:scale-110">
                            MI
                          </span>
                          <motion.div
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="bg-primary/40 absolute right-0 left-0 z-10 h-px shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                          />
                        </div>
                        <div className="bg-background border-border/50 absolute -right-2 -bottom-2 rounded-md border p-1.5 shadow-lg">
                          <ShieldCheck className="text-primary h-4 w-4" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold tracking-tight">
                          Monirul Islam
                        </h3>
                        <p className="text-primary font-mono text-xs tracking-widest uppercase">
                          Authorized Specialist
                        </p>
                        <div className="flex items-center gap-2 pt-2 grayscale transition-all hover:grayscale-0">
                          <div className="flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500/20">
                            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                          </div>
                          <span className="font-mono text-[10px] tracking-tighter text-emerald-500 uppercase">
                            Status: Verified
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-border/20 space-y-4 border-t pt-4">
                      <div className="group/item flex items-center gap-4">
                        <div className="bg-secondary/20 border-border/30 group-hover/item:border-primary/30 rounded-md border p-2 transition-colors">
                          <Briefcase className="text-muted-foreground group-hover/item:text-primary h-4 w-4 transition-colors" />
                        </div>
                        <div>
                          <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                            Designation
                          </p>
                          <p className="text-sm font-medium">
                            Sr. Software Engineer L-II
                          </p>
                        </div>
                      </div>
                      <div className="group/item flex items-center gap-4">
                        <div className="bg-secondary/20 border-border/30 group-hover/item:border-primary/30 rounded-md border p-2 transition-colors">
                          <Building className="text-muted-foreground group-hover/item:text-primary h-4 w-4 transition-colors" />
                        </div>
                        <div>
                          <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                            Current_Node
                          </p>
                          <p className="text-sm font-medium">
                            Vivasoft Limited
                          </p>
                        </div>
                      </div>
                      <div className="group/item flex items-center gap-4">
                        <div className="bg-secondary/20 border-border/30 group-hover/item:border-primary/30 rounded-md border p-2 transition-colors">
                          <MapPin className="text-muted-foreground group-hover/item:text-primary h-4 w-4 transition-colors" />
                        </div>
                        <div>
                          <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                            Geo_Location
                          </p>
                          <p className="text-sm font-medium">
                            Dhaka, Bangladesh
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/30 border-border/30 flex items-center justify-between border-t p-4 px-6">
                    <div className="text-muted-foreground/60 font-mono text-[9px] tracking-widest uppercase">
                      Social_Interfaces:
                    </div>
                    <div className="flex gap-4">
                      <a
                        href="https://github.com/imonirulislam"
                        target="_blank"
                        className="hover:text-primary group/social p-1.5 transition-colors"
                        title="GITHUB"
                      >
                        <SimpleIcon
                          icon={siGithub}
                          className="h-4 w-4 transition-transform group-hover/social:scale-110"
                        />
                      </a>
                      <a
                        href="#"
                        className="hover:text-primary group/social p-1.5 transition-colors"
                        title="LINKEDIN"
                      >
                        <FaLinkedin className="h-4 w-4 transition-transform group-hover/social:scale-110" />
                      </a>
                      <a
                        href="#"
                        className="hover:text-primary group/social p-1.5 transition-colors"
                        title="X"
                      >
                        <SimpleIcon
                          icon={siX}
                          className="h-4 w-4 transition-transform group-hover/social:scale-110"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
