"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Brackets } from "lucide-react";
import { projects, projectCategories as categories } from "@/data/projects";
import { ProjectItem } from "@/components/project-item";
import { ProjectCategory } from "@/types/project";

export function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.category === (filter as ProjectCategory) ||
            p.tech.includes(filter)
        );

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  return (
    <section id="projects" className="relative scroll-mt-20 py-24">
      <div className="bg-border absolute top-0 left-1/2 h-24 w-0.5 -translate-x-1/2" />

      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-1 items-center gap-4">
            <h2 className="text-muted-foreground text-sm font-bold tracking-[0.3em] whitespace-nowrap uppercase">
              Deployments :: Projects
            </h2>
            <div className="bg-border h-0.5 w-full" />
          </div>
        </div>

        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex flex-wrap items-center gap-2"
          >
            <span className="text-muted-foreground mr-2 font-mono text-[10px]">
              QUERY_FILTER:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setVisibleCount(6);
                }}
                className={`border-border border-2 px-3 py-1 font-mono text-[10px] font-bold transition-all duration-150 ${
                  filter === cat
                    ? "bg-pop-pink shadow-brutal-sm -translate-x-0.5 -translate-y-0.5 text-black"
                    : "bg-card hover:bg-pop-yellow hover:text-black"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="grid-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-secondary border-border flex flex-col overflow-hidden rounded-lg border p-0"
                  >
                    <Skeleton className="bg-secondary h-40 w-full" />
                    <div className="space-y-4 p-6">
                      <Skeleton className="bg-secondary h-6 w-2/3" />
                      <Skeleton className="bg-secondary h-4 w-full" />
                      <div className="border-border flex gap-2 border-t pt-4">
                        <Skeleton className="bg-secondary h-4 w-12" />
                        <Skeleton className="bg-secondary h-4 w-12" />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="grid-content"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                className="col-span-full grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {displayedProjects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="h-full"
                    >
                      <ProjectItem project={project} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isLoading && visibleCount < filteredProjects.length && (
          <div className="mt-12 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="gap-2 px-8 font-mono text-xs tracking-widest uppercase"
            >
              <Brackets className="h-4 w-4 rotate-90" />
              Load_More_Nodes
              <Brackets className="h-4 w-4 -rotate-90" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
