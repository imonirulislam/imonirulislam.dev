"use client";

import { TechCategory } from "@/types/tech-stack";

interface TechCategoryCardProps {
  category: TechCategory;
}

export function TechCategoryCard({ category }: TechCategoryCardProps) {
  return (
    <div className="bg-card border-border shadow-brutal brutal-lift relative flex h-full flex-col border-2 p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-pop-yellow border-border shrink-0 border-2 p-2 text-black">
          <category.icon className="h-4 w-4" />
        </div>
        <h3 className="text-foreground text-sm font-bold tracking-wider whitespace-nowrap uppercase">
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
            <span className="bg-muted border-border group-hover/item:bg-pop-lime border px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-tighter whitespace-nowrap uppercase transition-all group-hover/item:text-black">
              {item.version}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
