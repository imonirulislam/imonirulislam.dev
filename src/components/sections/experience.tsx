"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp, Building2 } from "lucide-react";

import { experiences } from "@/data/experience";
import { ExperienceItem } from "@/components/experience-item";

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

  // Helper to determine if a period includes "Present"
  const isPresent = (period: string) =>
    period.toLowerCase().includes("present");

  return (
    <section
      id="experience"
      className="relative scroll-mt-20 overflow-hidden py-24"
    >
      {/* Background element */}

      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-20 flex items-center gap-4">
          <h2 className="text-muted-foreground text-sm font-bold tracking-[0.3em] whitespace-nowrap uppercase">
            Trace :: Professional History
          </h2>
          <div className="bg-border/40 h-px w-full" />
        </div>

        <div className="relative space-y-12">
          {/* Timeline Spine */}
          <div className="bg-border absolute top-0 -bottom-12 left-[16px] -z-10 w-0.5 -translate-x-1/2 md:left-[24px]" />

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
                    className="relative flex flex-col gap-4 pl-8 md:gap-8 md:pl-12"
                  >
                    <div className="bg-secondary absolute top-[24px] left-[16px] h-3 w-3 -translate-x-1/2 rounded-full md:left-[24px]" />
                    <div className="flex-1">
                      <div className="bg-secondary border-border space-y-4 rounded-lg border p-6">
                        <Skeleton className="bg-secondary h-6 w-1/3" />
                        <Skeleton className="bg-secondary h-4 w-1/4" />
                        <Skeleton className="bg-secondary h-4 w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                className="space-y-12"
              >
                <AnimatePresence mode="popLayout">
                  {displayedExperiences.map((companyData, index) => (
                    <motion.div
                      key={companyData.company}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group/company relative pl-8 md:pl-12"
                    >
                      {/* Company Spine Node */}
                      <div className="absolute top-[24px] left-[16px] z-10 flex -translate-x-1/2 items-center justify-center md:left-[24px]">
                        <div
                          className={`border-background h-4 w-4 rounded-full border-4 transition-colors duration-300 ${isPresent(companyData.totalPeriod) ? "bg-primary" : "bg-muted-foreground/30 group-hover/company:bg-primary/50"}`}
                        />
                      </div>

                      {/* Company Header Block */}
                      <div className="mb-6 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="text-secondary-foreground/70 h-4 w-4" />
                          <h3 className="text-lg font-bold tracking-tight">
                            {companyData.company}
                          </h3>
                        </div>
                        <span className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
                          <span className="bg-muted-foreground/20 block h-px w-4" />
                          {companyData.totalPeriod}
                        </span>
                      </div>

                      {/* Nested Roles Cluster */}
                      <div className="border-border relative ml-3 space-y-8 border-l-2 border-dashed pl-4 md:ml-6 md:pl-6">
                        {companyData.roles.map((role) => (
                          <ExperienceItem
                            key={role.title + role.period}
                            role={role}
                            company={companyData.company}
                          />
                        ))}
                      </div>
                    </motion.div>
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
