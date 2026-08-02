import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Monitor,
  Server,
  Terminal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SimpleIcon } from "@/components/ui/simple-icon";
import { siGithub } from "simple-icons/icons";
import Image from "next/image";
import { Project } from "@/types/project";
import { ProjectPlaceholder } from "@/components/project-placeholder";

export function ProjectItem({ project }: { project: Project }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const hasImages = project.images && project.images.length > 0;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasImages) return;
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasImages) return;
    setCurrentImage(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  const handleOpen = (open: boolean) => {
    if (open) {
      setIsDataLoading(true);
      setTimeout(() => setIsDataLoading(false), 800);
    }
  };

  return (
    <Dialog onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          <Card className="bg-secondary/10 border-border/50 hover:bg-secondary/20 hover:border-primary/50 group flex h-full cursor-pointer flex-col overflow-hidden border p-0 shadow-none backdrop-blur-sm transition-all duration-300">
            <div className="border-border/20 relative h-40 overflow-hidden border-b">
              {hasImages ? (
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <ProjectPlaceholder />
              )}
              <div className="from-background/60 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <CardHeader className="pb-4">
              <div className="mb-2 flex items-start justify-between gap-4">
                <CardTitle className="group-hover:text-primary flex-1 font-mono text-lg leading-tight tracking-tight transition-colors">
                  {project.title}
                </CardTitle>
                <div className="bg-primary/10 text-primary shrink-0 rounded-sm p-1 px-2 font-mono text-[10px] whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                  VIEW_SPECS
                </div>
              </div>
              <CardDescription className="text-muted-foreground/80 text-sm leading-relaxed">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="border-border/20 flex flex-wrap gap-2 border-t pt-4 pb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-muted-foreground bg-secondary/30 rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="bg-background/95 border-border/50 max-w-2xl font-mono backdrop-blur-xl md:max-w-4xl">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            {isDataLoading ? (
              <Skeleton className="bg-secondary/10 h-9 w-9 rounded-lg" />
            ) : (
              <div className="bg-primary/10 rounded-lg p-2">
                <Server className="text-primary h-5 w-5" />
              </div>
            )}
            {isDataLoading ? (
              <Skeleton className="bg-secondary/10 h-3 w-48" />
            ) : (
              <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                DEPLOYMENT_NODE :: {project.category}
              </span>
            )}
          </div>
          <DialogTitle className="flex items-center justify-between gap-3 text-2xl font-bold tracking-tight">
            <div className="flex items-center gap-3">
              {isDataLoading ? (
                <Skeleton className="bg-secondary/10 h-8 w-48" />
              ) : (
                <>
                  {project.title}
                  {!hasImages && (
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20 px-2 py-0.5 font-mono text-[9px] tracking-widest shadow-sm"
                    >
                      DATA_ONLY_MODE
                    </Badge>
                  )}
                </>
              )}
            </div>

            {/* Desktop Buttons */}
            {!isDataLoading && (
              <div className="hidden items-center gap-2 md:flex">
                {project.github && project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary hover:bg-secondary/80 border-border/50 flex items-center justify-center gap-2 rounded-md border px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors"
                  >
                    <SimpleIcon icon={siGithub} className="h-3 w-3" /> Source
                  </a>
                )}
                {project.demo && project.demo !== "#" && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors"
                  >
                    <Monitor className="h-3 w-3" /> Demo
                  </a>
                )}
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-6">
          <AnimatePresence mode="wait">
            {isDataLoading ? (
              <motion.div
                key="modal-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {hasImages && (
                  <Skeleton className="bg-secondary/20 h-64 w-full rounded-lg" />
                )}
                <div className="space-y-4">
                  <Skeleton className="bg-secondary/10 h-4 w-full" />
                  <Skeleton className="bg-secondary/10 h-4 w-5/6" />
                  <Skeleton className="bg-secondary/10 h-4 w-4/6" />
                </div>

                <div className="space-y-4">
                  <Skeleton className="bg-secondary/10 h-3 w-32" />
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton
                        key={i}
                        className="bg-secondary/10 h-10 rounded-md"
                      />
                    ))}
                  </div>
                </div>

                {project.logs && project.logs.length > 0 && (
                  <div className="space-y-4">
                    <Skeleton className="bg-secondary/10 h-3 w-40" />
                    <div className="bg-secondary/10 space-y-3 rounded-md p-4 opacity-50">
                      <Skeleton className="bg-secondary/20 h-3 w-full" />
                      <Skeleton className="bg-secondary/20 h-3 w-5/6" />
                      <Skeleton className="bg-secondary/20 h-3 w-4/5" />
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <Skeleton className="bg-secondary/10 h-3 w-36" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton
                        key={i}
                        className="bg-secondary/10 h-6 w-16 rounded shadow-sm"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Skeleton className="bg-secondary/10 h-10 flex-1 rounded-md" />
                  <Skeleton className="bg-secondary/10 h-10 flex-1 rounded-md" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="modal-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {hasImages && (
                  <div className="border-border/40 group/carousel relative h-64 overflow-hidden rounded-lg border bg-black/40">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full w-full"
                      >
                        <Image
                          src={project.images[currentImage]}
                          alt={`${project.title} ${currentImage + 1}`}
                          width={800}
                          height={600}
                          className="h-full w-full object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {project.images.length > 1 && (
                      <>
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 opacity-0 transition-opacity group-hover/carousel:opacity-100">
                          <button
                            onClick={prevImage}
                            className="bg-background/80 border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground pointer-events-auto rounded-full border p-2 shadow-lg transition-all"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="bg-background/80 border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground pointer-events-auto rounded-full border p-2 shadow-lg transition-all"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="absolute right-4 bottom-4">
                          <Badge
                            variant="outline"
                            className="bg-background/90 border-primary/40 px-2 py-0.5 font-mono text-[9px] tracking-widest shadow-xl backdrop-blur-md"
                          >
                            ASSET_0{currentImage + 1}/0{project.images.length}
                          </Badge>
                        </div>
                      </>
                    )}

                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="outline"
                        className="bg-background/80 border-primary/30 text-[10px] backdrop-blur-sm"
                      >
                        ASSET_LOADED
                      </Badge>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <DialogDescription className="text-muted-foreground/70 text-sm leading-relaxed">
                    {project.longDescription}
                  </DialogDescription>
                  {project.docs && project.docs !== "#" && (
                    <a
                      href={project.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary/80 hover:text-primary inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase underline decoration-dotted underline-offset-4 transition-colors"
                    >
                      <BookOpen className="h-3 w-3" /> Read_The_Docs
                    </a>
                  )}
                </div>
                <div className="space-y-4">
                  <h4 className="text-muted-foreground/50 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                    <Terminal className="h-3 w-3" /> System :: Specifications
                  </h4>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {project.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="bg-secondary/20 border-border/30 flex items-center gap-3 rounded-md border p-3"
                      >
                        <div className="bg-primary/60 h-1.5 w-1.5 shrink-0 rounded-full" />
                        <span className="text-muted-foreground/90 text-xs">
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {project.logs && project.logs.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-muted-foreground/50 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                      <Terminal className="h-3 w-3" /> System :: Execution_Log
                    </h4>
                    <div className="bg-secondary/20 border-border/30 space-y-2 rounded-md border p-4">
                      {project.logs.map((log, i) => (
                        <div
                          key={i}
                          className="text-muted-foreground/90 flex items-start gap-4 font-mono text-xs"
                        >
                          <span className="text-primary/70 shrink-0 font-bold">
                            [#]
                          </span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <h4 className="text-muted-foreground/50 text-[10px] font-bold tracking-widest uppercase">
                    Core :: Technology
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-secondary/40 text-muted-foreground border-border/50 rounded border px-2 py-1 text-[10px] tracking-wider uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Footer Buttons */}
        <div className="border-border/20 flex gap-4 border-t pt-6 md:hidden">
          {isDataLoading ? (
            <>
              <Skeleton className="bg-secondary/10 h-10 flex-1 rounded-md" />
              <Skeleton className="bg-secondary/10 h-10 flex-1 rounded-md" />
            </>
          ) : (
            <>
              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary hover:bg-secondary/80 border-border/50 flex flex-1 items-center justify-center gap-2 rounded-md border py-2.5 text-[11px] font-bold tracking-widest uppercase transition-colors"
                >
                  <SimpleIcon icon={siGithub} className="h-3.5 w-3.5" />{" "}
                  Source_Code
                </a>
              )}
              {project.demo && project.demo !== "#" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 text-[11px] font-bold tracking-widest uppercase transition-colors"
                >
                  <Monitor className="h-3.5 w-3.5" /> Live_Demo
                </a>
              )}
            </>
          )}
        </div>

        <div className="text-muted-foreground/40 flex items-center justify-between pt-4 text-[9px] tracking-widest uppercase">
          <span>Build_Status: Stable</span>
          <span>Environment: Production</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
