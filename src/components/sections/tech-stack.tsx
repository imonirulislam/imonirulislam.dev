"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Terminal,
  Code2,
  Database,
  Cloud,
  ShieldCheck,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const techCategories = [
  {
    title: "Back-end Core",
    icon: Code2,
    items: [
      { name: "Node.js", version: "v20.x" },
      { name: "PHP", version: "v8.x" },
      { name: "TypeScript", version: "v5.x" },
      { name: "Go", version: "v1.2x" },
    ],
  },
  {
    title: "Infrastructure",
    icon: Cpu,
    items: [
      { name: "Docker", version: "Engine" },
      { name: "Kubernetes", version: "K8s" },
      { name: "Terraform", version: "IaC" },
      { name: "Linux", version: "Kernel" },
    ],
  },
  {
    title: "Cloud Systems",
    icon: Cloud,
    items: [
      { name: "AWS", version: "Global" },
      { name: "GCP", version: "Compute" },
      { name: "Azure", version: "Cloud" },
      { name: "Cloudflare", version: "Edge" },
    ],
  },
  {
    title: "Data & Runtime",
    icon: Database,
    items: [
      { name: "PostgreSQL", version: "v15" },
      { name: "Redis", version: "Buffer" },
      { name: "RabbitMQ", version: "Bus" },
      { name: "ClickHouse", version: "OLAP" },
    ],
  },
];

function TechStackSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-secondary/10 border-border/50 h-[200px] rounded-lg border p-6"
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
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              {techCategories.map((category, idx) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="from-primary/10 absolute -inset-0.5 rounded-lg bg-gradient-to-b to-transparent opacity-0 blur transition duration-500 group-hover:opacity-100" />
                  <div className="bg-secondary/30 dark:bg-secondary/10 border-border/50 hover:border-primary/30 relative flex h-full flex-col rounded-lg border p-6 backdrop-blur-sm transition-all duration-300">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="bg-secondary/20 border-border/30 group-hover:border-primary/30 shrink-0 rounded-md border p-2 transition-colors">
                        <category.icon className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
                      </div>
                      <h3 className="text-foreground/80 text-sm font-bold tracking-wider whitespace-nowrap uppercase">
                        {category.title}
                      </h3>
                    </div>

                    <div className="flex-1 space-y-3">
                      {category.items.map((item) => (
                        <div
                          key={item.name}
                          className="group/item flex items-center justify-between"
                        >
                          <span className="text-muted-foreground group-hover/item:text-foreground font-mono text-xs tracking-tighter whitespace-nowrap transition-colors">
                            {item.name}
                          </span>
                          <span className="text-muted-foreground/40 bg-secondary/30 border-border/20 group-hover/item:border-primary/20 group-hover/item:text-primary rounded border px-1.5 py-0.5 font-mono text-[9px] tracking-tighter whitespace-nowrap uppercase transition-all">
                            {item.version}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
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
