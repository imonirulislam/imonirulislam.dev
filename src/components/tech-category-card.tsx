"use client";

import { TechCategory } from "@/types/tech-stack";

interface TechCategoryCardProps {
  category: TechCategory;
}

export function TechCategoryCard({ category }: TechCategoryCardProps) {
  return (
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
  );
}
