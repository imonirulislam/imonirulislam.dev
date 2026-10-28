"use client";

import { motion, AnimatePresence } from "framer-motion";
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
import { siGithub } from "simple-icons/icons";
import { FaLinkedin } from "react-icons/fa";
import { Magnetic } from "@/components/ui/magnetic";

export function Hero() {
  return (
    <section id="about" className="scroll-mt-20 overflow-hidden py-12 md:py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <div className="text-muted-foreground mb-8 flex animate-pulse items-center gap-2 font-mono text-xs tracking-widest uppercase">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                System Online :: imonirulislam.dev
              </div>
              <h1 className="mb-8 text-4xl leading-[1.05] font-bold tracking-tight md:text-6xl">
                Architecting{" "}
                <span className="bg-pop-yellow border-border inline-block -rotate-1 border-2 px-2 text-black">
                  reliable
                </span>{" "}
                systems and{" "}
                <span className="bg-pop-pink border-border inline-block rotate-1 border-2 px-2 text-black">
                  scalable
                </span>{" "}
                <br /> infrastructure
              </h1>
              <p className="text-muted-foreground mb-10 max-w-xl text-base leading-relaxed md:text-lg">
                Bridging the gap between software architecture and hardware
                reality. I lead technical initiatives to build secure, scalable,
                and efficient systems for the modern web.
              </p>
              <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Magnetic>
                  <div className="group relative">
                    <Button
                      className="relative h-12 overflow-hidden px-8 text-xs font-bold tracking-[0.2em] uppercase"
                      asChild
                    >
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <span>[</span>
                          <Download className="h-4 w-4" />
                          <span>DownLoad_Resume</span>
                          <span>]</span>
                        </span>
                      </a>
                    </Button>
                  </div>
                </Magnetic>

                <div className="text-muted-foreground flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
                  <span className="bg-primary/40 h-1.5 w-1.5 animate-pulse rounded-full" />
                  <span>File_Size: 110KB</span>
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
                    className="bg-pop-cyan border-border shadow-brutal-sm border-2 px-3 py-1.5 font-bold text-black"
                  >
                    <span className="mr-2 opacity-60">{stat.label}:</span>
                    {stat.value}
                  </div>
                ))}
              </div>
            </div>

            <div className="group relative lg:col-span-5">
              <div className="bg-card border-border shadow-brutal-lg relative overflow-hidden border-2">
                <div className="bg-pop-yellow border-border flex items-center justify-between border-b-2 p-1.5 px-4 text-black">
                  <div className="flex gap-1.5">
                    <div className="border-border h-3 w-3 rounded-full border-2 bg-red-500" />
                    <div className="border-border h-3 w-3 rounded-full border-2 bg-yellow-400" />
                    <div className="border-border h-3 w-3 rounded-full border-2 bg-emerald-500" />
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase">
                    <Terminal className="h-3 w-3" /> identity_report.sh
                  </div>
                </div>

                <div className="space-y-8 p-8">
                  <div className="flex items-start gap-6">
                    <div className="relative shrink-0">
                      <div className="bg-pop-lime border-border shadow-brutal group/avatar relative flex h-24 w-24 items-center justify-center overflow-hidden border-2">
                        <div className="grid-pattern absolute inset-0 opacity-30" />
                        <span className="font-mono text-3xl font-bold text-black transition-transform duration-500 group-hover/avatar:scale-110">
                          MI
                        </span>
                        <motion.div
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute right-0 left-0 z-10 h-0.5 bg-black"
                        />
                      </div>
                      <div className="bg-pop-pink border-border absolute -right-2 -bottom-2 border-2 p-1.5 text-black">
                        <ShieldCheck className="h-4 w-4" />
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

                  <div className="border-border space-y-4 border-t-2 pt-4">
                    <div className="group/item flex items-center gap-4">
                      <div className="bg-card border-border shadow-brutal-sm group-hover/item:bg-pop-yellow border-2 p-2 transition-colors">
                        <Briefcase className="h-4 w-4 transition-colors group-hover/item:text-black" />
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
                      <div className="bg-card border-border shadow-brutal-sm group-hover/item:bg-pop-yellow border-2 p-2 transition-colors">
                        <Building className="h-4 w-4 transition-colors group-hover/item:text-black" />
                      </div>
                      <div>
                        <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                          Current_Node
                        </p>
                        <p className="text-sm font-medium">Vivasoft Limited</p>
                      </div>
                    </div>
                    <div className="group/item flex items-center gap-4">
                      <div className="bg-card border-border shadow-brutal-sm group-hover/item:bg-pop-yellow border-2 p-2 transition-colors">
                        <MapPin className="h-4 w-4 transition-colors group-hover/item:text-black" />
                      </div>
                      <div>
                        <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                          Geo_Location
                        </p>
                        <p className="text-sm font-medium">Dhaka, Bangladesh</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted border-border flex items-center justify-between border-t-2 p-4 px-6">
                  <div className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                    Social_Interfaces:
                  </div>
                  <div className="flex gap-4">
                    <Magnetic>
                      <a
                        href="https://github.com/imonirulislam"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="bg-card border-border shadow-brutal-sm brutal-press group/social block border-2 p-1.5"
                        title="GITHUB"
                      >
                        <SimpleIcon
                          icon={siGithub}
                          className="h-4 w-4 transition-transform group-hover/social:scale-110"
                        />
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a
                        href="https://www.linkedin.com/in/monirulislamrasel/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="bg-card border-border shadow-brutal-sm brutal-press group/social block border-2 p-1.5"
                        title="LINKEDIN"
                      >
                        <FaLinkedin className="h-4 w-4 transition-transform group-hover/social:scale-110" />
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
