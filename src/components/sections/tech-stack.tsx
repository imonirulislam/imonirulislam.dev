"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { techCategories } from "@/data/tech-stack";
import { TechCategoryCard } from "@/components/tech-category-card";

function TechStackSkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-secondary/10 border-border/50 h-[200px] w-full max-w-[340px] min-w-[250px] flex-1 rounded-lg border p-6"
        >
          <div className="mb-6 flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="flex items-center justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function TechStack() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="scroll-mt-20 py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="border-border/40 mb-12 flex flex-col justify-between gap-4 border-b pb-8 md:flex-row md:items-end">
          <div>
            <div className="text-primary mb-2 flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
              <Terminal className="h-3 w-3" /> system_stack_inventory
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Technology Stack
            </h2>
          </div>
          <div className="text-muted-foreground/60 bg-secondary/20 border-border/50 flex items-center gap-2 rounded-sm border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />{" "}
            Authorized_Toolchain_Report
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TechStackSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap justify-center gap-6"
            >
              {techCategories.map((category, idx) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative w-full max-w-[340px] min-w-[250px] flex-1"
                >
                  <div className="from-primary/10 absolute -inset-0.5 rounded-lg bg-gradient-to-b to-transparent opacity-0 blur transition duration-500 group-hover:opacity-100" />
                  <TechCategoryCard category={category} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-center">
          <div className="via-border/40 h-px flex-1 bg-gradient-to-r from-transparent to-transparent" />
          <div className="text-muted-foreground/40 px-6 font-mono text-[9px] tracking-[0.4em] uppercase antialiased">
            End_of_Inventory_Stream
          </div>
          <div className="via-border/40 h-px flex-1 bg-gradient-to-r from-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
