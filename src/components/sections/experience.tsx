"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronDown,
  ChevronUp,
  Terminal,
  ExternalLink,
  Cpu,
  Database,
  Cloud,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const experiences = [
  {
    period: "Present",
    role: "Systems & Bare Metal Specialist",
    description:
      "Deep-diving into bare metal server management, networking, and low-level system optimizations.",
    longDescription:
      "Currently spearheading infrastructure evolution by moving beyond virtualization into raw hardware orchestration. This involves custom PXE boot setups, automated firmware management, and optimizing networking stacks for high-throughput data pipelines. Working extensively with Linux kernel tuning and low-latency communication protocols.",
    tags: ["Linux Kernel", "PXE", "Networking", "Hardware"],
    icon: Cpu,
    logs: [
      "Optimized kernel parameters for 20% latency reduction.",
      "Provisioning automated bare-metal internal cloud.",
      "Maintaining 99.99% uptime for core infrastructure nodes.",
    ],
  },
  {
    period: "Scale",
    role: "DevOps & Infrastructure Engineer",
    description:
      "Specialized in AWS Cloud, managing complex infrastructures, CI/CD pipelines, and data warehousing solutions.",
    longDescription:
      "Managed a large-scale AWS environment supporting over 50 microservices. Focused on Infrastructure as Code (Terraform), cost optimization, and robust CI/CD practices. Handled migration of legacy data systems to modern Redshift clusters, significantly improving analytics performance across the organization.",
    tags: ["AWS", "Terraform", "Kubernetes", "CI/CD"],
    icon: Cloud,
    logs: [
      "Architected multi-region AWS footprint with Terraform.",
      "Reduced cloud spends by 35% through resource auditing.",
      "Managed 50+ microservices in Kubernetes EKS clusters.",
    ],
  },
  {
    period: "Growth",
    role: "Full Stack Engineer (Node.js)",
    description:
      "Transitioned to the Node.js ecosystem, focusing on high-performance APIs and asynchronous event-driven architectures.",
    longDescription:
      "Key player in transitioning the company's core product from a PHP monolith to a distributed Node.js microservices architecture. Designed and implemented critical services for real-time order processing and user notification systems using WebSockets and Redis.",
    tags: ["Node.js", "Redis", "Microservices", "TypeScript"],
    icon: Database,
    logs: [
      "Refactored monolith PHP to Node.js microservices.",
      "Implemented real-time data streaming via WebSockets.",
      "Integrated complex third-party ETL pipelines.",
    ],
  },
  {
    period: "Early Days",
    role: "PHP Developer",
    description:
      "Started my journey building dynamic web applications with PHP, mastering the fundamentals of back-end development.",
    longDescription:
      "Foundation years spent building robust web applications for news portals and large-scale blog platforms. Mastered MySQL optimization and server-side rendering patterns before the modern JS era.",
    tags: ["PHP", "MySQL", "jQuery", "Apache"],
    icon: Terminal,
    logs: [
      "Developed custom CMS for high-traffic news portals.",
      "Optimized SQL queries for improved performance.",
      "Managed legacy VPS deployments and manual backups.",
    ],
  },
  {
    period: "Legacy",
    role: "Junior Web Developer",
    description:
      "Learned the ropes of web development, working with early CMS systems and basic jQuery/CSS setups.",
    longDescription:
      "Initial entry into the professional world, maintaining a wide variety of client sites and learning best practices in collaborative software development and client communication.",
    tags: ["HTML", "CSS", "WordPress", "Hosting"],
    isExtended: true,
    logs: [
      "Managed shared hosting environments.",
      "Built responsive themes for local businesses.",
      "Maintained legacy WordPress installations.",
    ],
  },
  {
    period: "Origin",
    role: "Self-taught Hobbyist",
    description:
      "Experimenting with Linux, scripting, and basic HTML/CSS in various home lab configurations.",
    longDescription:
      "The curious start of everything. Learning by breaking and fixing Linux distributions, automating chores with shell scripts, and discovering the power of the terminal.",
    tags: ["Linux", "Bash", "HomeLab", "Curiosity"],
    isExtended: true,
    logs: [
      "Flashed custom ROMs and kernel optimizations.",
      "Configured first homelab on a recycled Dell OptiPlex.",
      "Wrote first shell script for automated backups.",
    ],
  },
];

export function Experience() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const displayedExperiences = showAll
    ? experiences
    : experiences.filter((exp) => !exp.isExtended);

  return (
    <section
      id="experience"
      className="relative scroll-mt-20 overflow-hidden py-24"
    >
      {/* Background element */}
      <div className="from-border/0 via-border/20 to-border/0 absolute top-0 left-1/2 -z-10 h-full w-px -translate-x-1/2 bg-gradient-to-b" />

      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-20 flex items-center gap-4">
          <h2 className="text-muted-foreground text-sm font-bold tracking-[0.3em] whitespace-nowrap uppercase">
            Trace :: Professional History
          </h2>
          <div className="bg-border/40 h-px w-full" />
        </div>

        <div className="relative space-y-12">
          {/* Timeline Spine */}
          <div className="from-border/0 via-border/20 to-border/0 absolute top-0 -bottom-12 left-0 -z-10 w-px -translate-x-1/2 bg-gradient-to-b md:left-[124px]" />

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="relative flex flex-col gap-4 pl-8 md:flex-row md:gap-12 md:pl-0"
                  >
                    <div className="bg-secondary/30 absolute top-[13px] left-0 h-3 w-3 -translate-x-1/2 rounded-full md:left-[124px]" />
                    <div className="flex-shrink-0 pt-1 text-right md:w-32">
                      <Skeleton className="bg-secondary/10 ml-auto h-6 w-20" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-secondary/5 border-border/40 space-y-4 rounded-lg border p-6">
                        <Skeleton className="bg-secondary/10 h-6 w-1/3" />
                        <Skeleton className="bg-secondary/10 h-4 w-full" />
                        <div className="space-y-2">
                          <Skeleton className="bg-secondary/10 h-3 w-3/4" />
                          <Skeleton className="bg-secondary/10 h-3 w-1/2" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12"
              >
                <AnimatePresence mode="popLayout">
                  {displayedExperiences.map((exp, index) => (
                    <Dialog key={exp.role + exp.period}>
                      <DialogTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="group/item relative cursor-pointer pl-8 md:pl-0"
                        >
                          {/* Timeline Node */}
                          <div className="absolute top-[13px] left-0 z-10 flex -translate-x-1/2 items-center justify-center md:left-[124px]">
                            <div
                              className={`border-background h-3 w-3 rounded-full border-2 transition-colors duration-300 ${exp.period === "Present" ? "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]" : "bg-muted-foreground/30 group-hover/item:bg-primary/50"}`}
                            />
                            {exp.period === "Present" && (
                              <div className="bg-primary absolute inset-0 h-3 w-3 animate-ping rounded-full opacity-75" />
                            )}
                          </div>

                          <div className="group flex flex-col gap-4 md:flex-row md:gap-12">
                            <div className="flex-shrink-0 pt-1 text-right md:w-32 md:pr-1">
                              <span className="text-muted-foreground bg-secondary/50 border-border/30 group-hover/item:border-primary/30 inline-block rounded border px-2 py-1 font-mono text-[10px] tracking-widest uppercase transition-colors">
                                {exp.period}
                              </span>
                            </div>
                            <div className="flex-1 pb-12">
                              <div className="bg-secondary/5 border-border/40 group-hover/item:border-primary/30 group-hover/item:bg-secondary/10 rounded-lg border p-6 backdrop-blur-sm transition-all duration-300">
                                <div className="mb-4 flex items-start justify-between">
                                  <h3 className="group-hover/item:text-primary text-xl font-semibold transition-colors">
                                    {exp.role}
                                  </h3>
                                  <ExternalLink className="text-muted-foreground h-4 w-4 opacity-0 transition-opacity group-hover/item:opacity-100" />
                                </div>
                                <p className="text-muted-foreground mb-6 text-sm leading-relaxed md:text-base">
                                  {exp.description}
                                </p>

                                <div className="space-y-2">
                                  {exp.logs.map((log, i) => (
                                    <div
                                      key={i}
                                      className="text-muted-foreground/80 flex items-start gap-3 font-mono text-[11px]"
                                    >
                                      <span className="text-primary/60 shrink-0 font-bold">
                                        [INFO]
                                      </span>
                                      <span>{log}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="bg-background/95 border-border/50 max-w-2xl font-mono backdrop-blur-xl">
                        <DialogHeader>
                          <div className="mb-2 flex items-center gap-2">
                            <div className="bg-primary/10 rounded-lg p-2">
                              {exp.icon && (
                                <exp.icon className="text-primary h-5 w-5" />
                              )}
                            </div>
                            <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                              {exp.period} NODE
                            </span>
                          </div>
                          <DialogTitle className="text-2xl font-bold tracking-tight">
                            {exp.role}
                          </DialogTitle>
                          <DialogDescription className="text-muted-foreground/70 pt-4 text-sm leading-relaxed">
                            {exp.longDescription}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 py-6">
                          <div className="space-y-3">
                            <h4 className="text-muted-foreground/50 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                              <Terminal className="h-3 w-3" /> Execute ::
                              Key_Logs
                            </h4>
                            <div className="bg-secondary/20 border-border/30 space-y-2 rounded-lg border p-4">
                              {exp.logs.map((log, i) => (
                                <div
                                  key={i}
                                  className="text-muted-foreground/90 flex items-start gap-4 font-mono text-xs"
                                >
                                  <span className="text-primary/70 shrink-0 font-bold">
                                    [$]
                                  </span>
                                  <span>{log}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-muted-foreground/50 text-[10px] font-bold tracking-widest uppercase">
                              Stack :: Environment
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-secondary/40 text-muted-foreground border-border/50 rounded border px-2 py-1 text-[10px] tracking-wider uppercase"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="border-border/20 text-muted-foreground/40 flex items-center justify-between border-t pt-4 text-[9px] tracking-widest uppercase">
                          <span>
                            Node_ID: {exp.role.substring(0, 3).toUpperCase()}_
                            {String(index).padStart(3, "0")}
                          </span>
                          <span>Status: Operational</span>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isLoading && (
          <div className="mt-12 flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="text-muted-foreground hover:text-primary font-mono text-[10px] tracking-widest uppercase hover:bg-transparent"
            >
              {showAll ? (
                <>
                  <ChevronUp className="mr-2 h-3 w-3" /> Compress_Trace
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-3 w-3" /> Expand_All_History
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
