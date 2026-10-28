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
import { activateOnKey } from "@/lib/utils";

export function ProjectItem({ project }: { project: Project }) {
  const [currentImage, setCurrentImage] = useState(0);
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          role="button"
          tabIndex={0}
          aria-label={`Open ${project.title} details`}
          onKeyDown={activateOnKey}
          className="h-full focus-visible:outline-none"
        >
          <Card className="bg-card border-border group brutal-lift [:focus-visible>&]:outline-primary flex h-full cursor-pointer flex-col gap-4 overflow-hidden border-2 p-0 [:focus-visible>&]:outline-2 [:focus-visible>&]:outline-offset-4">
            <div className="border-border relative h-40 overflow-hidden border-b-2">
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
            </div>

            <CardHeader className="pb-4">
              <div className="mb-2 flex items-start justify-between gap-4">
                <CardTitle className="flex-1 font-mono text-lg leading-tight tracking-tight transition-colors">
                  {project.title}
                </CardTitle>
                <div className="bg-pop-yellow border-border shrink-0 border-2 p-1 px-2 font-mono text-[10px] font-bold whitespace-nowrap text-black opacity-0 transition-opacity group-hover:opacity-100">
                  VIEW_SPECS
                </div>
              </div>
              <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="border-border flex flex-wrap gap-2 border-t-2 pt-4 pb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="bg-pop-cyan border-border border px-2 py-0.5 font-mono text-[10px] font-bold text-black uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="bg-background border-border max-w-2xl font-mono md:max-w-4xl">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            <div className="bg-primary/10 rounded-lg p-2">
              <Server className="text-primary h-5 w-5" />
            </div>
            <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
              DEPLOYMENT_NODE :: {project.category}
            </span>
          </div>
          <DialogTitle className="flex items-center justify-between gap-3 text-2xl font-bold tracking-tight">
            <div className="flex items-center gap-3">
              <>
                {project.title}
                {!hasImages && (
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary px-2 py-0.5 font-mono text-[9px] tracking-widest shadow-sm"
                  >
                    DATA_ONLY_MODE
                  </Badge>
                )}
              </>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden items-center gap-2 md:flex">
              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border-border shadow-brutal-sm brutal-press flex items-center justify-center gap-2 border-2 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase"
                >
                  <SimpleIcon icon={siGithub} className="h-3 w-3" /> Source
                </a>
              )}
              {project.demo && project.demo !== "#" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pop-yellow border-border shadow-brutal-sm brutal-press flex items-center justify-center gap-2 border-2 px-3 py-1.5 text-[10px] font-bold tracking-widest text-black uppercase"
                >
                  <Monitor className="h-3 w-3" /> Demo
                </a>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="modal-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {hasImages && (
                <div className="border-border group/carousel relative h-64 overflow-hidden rounded-lg border bg-black/40">
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
                          className="bg-background border-border text-foreground hover:bg-primary hover:text-primary-foreground pointer-events-auto rounded-full border p-2 shadow-lg transition-all"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="bg-background border-border text-foreground hover:bg-primary hover:text-primary-foreground pointer-events-auto rounded-full border p-2 shadow-lg transition-all"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="absolute right-4 bottom-4">
                        <Badge
                          variant="outline"
                          className="bg-background border-primary px-2 py-0.5 font-mono text-[9px] tracking-widest shadow-xl"
                        >
                          ASSET_0{currentImage + 1}/0{project.images.length}
                        </Badge>
                      </div>
                    </>
                  )}

                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="outline"
                      className="bg-background border-primary text-[10px]"
                    >
                      ASSET_LOADED
                    </Badge>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
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
                <h4 className="text-muted-foreground flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                  <Terminal className="h-3 w-3" /> System :: Specifications
                </h4>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {project.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="bg-secondary border-border flex items-center gap-3 rounded-md border p-3"
                    >
                      <div className="bg-primary/60 h-1.5 w-1.5 shrink-0 rounded-full" />
                      <span className="text-muted-foreground text-xs">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {project.logs && project.logs.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-muted-foreground flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                    <Terminal className="h-3 w-3" /> System :: Execution_Log
                  </h4>
                  <div className="bg-secondary border-border space-y-2 rounded-md border p-4">
                    {project.logs.map((log, i) => (
                      <div
                        key={i}
                        className="text-muted-foreground flex items-start gap-4 font-mono text-xs"
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
                <h4 className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  Core :: Technology
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="bg-secondary text-muted-foreground border-border rounded border px-2 py-1 text-[10px] tracking-wider uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Footer Buttons */}
        <div className="border-border flex gap-4 border-t pt-6 md:hidden">
          <>
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card border-border shadow-brutal-sm brutal-press flex flex-1 items-center justify-center gap-2 border-2 py-2.5 text-[11px] font-bold tracking-widest uppercase transition-colors"
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
                className="bg-pop-yellow border-border shadow-brutal-sm brutal-press flex flex-1 items-center justify-center gap-2 border-2 py-2.5 text-[11px] font-bold tracking-widest text-black uppercase"
              >
                <Monitor className="h-3.5 w-3.5" /> Live_Demo
              </a>
            )}
          </>
        </div>

        <div className="text-muted-foreground flex items-center justify-between pt-4 text-[9px] tracking-widest uppercase">
          <span>Build_Status: Stable</span>
          <span>Environment: Production</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
