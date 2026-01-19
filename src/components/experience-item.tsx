import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  ExternalLink,
  Terminal,
  FileText,
  Download,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Role } from "@/types/experience";

export function ExperienceItem({
  role,
  company,
}: {
  role: Role;
  company: string;
}) {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const isRolePresent = role.period.toLowerCase().includes("present");

  const handleOpen = (open: boolean) => {
    if (open) {
      setIsDataLoading(true);
      setTimeout(() => setIsDataLoading(false), 800);
    }
  };

  return (
    <Dialog onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <div className="group/item bg-secondary/5 border-border/40 hover:border-primary/30 hover:bg-secondary/10 relative cursor-pointer rounded-lg border p-5 backdrop-blur-sm transition-all duration-300">
          {/* Role Connector Dot */}
          <div className="bg-border group-hover/item:bg-primary absolute top-1/2 -left-[23px] h-2 w-2 -translate-y-1/2 rounded-full transition-colors md:-left-[31px]" />
          <div className="bg-border/30 group-hover/item:bg-primary/30 absolute top-1/2 -left-[18px] h-px w-4 -translate-y-1/2 transition-colors md:-left-[27px] md:w-6" />

          <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
            <div>
              <h4 className="group-hover/item:text-primary text-base font-semibold transition-colors">
                {role.title}
              </h4>
              <div className="text-muted-foreground mt-1 flex items-center gap-2 font-mono text-xs">
                <Calendar className="h-3 w-3" />
                {role.period}
              </div>
            </div>
            <ExternalLink className="text-muted-foreground h-3.5 w-3.5 opacity-0 transition-opacity group-hover/item:opacity-100" />
          </div>
          <p className="text-muted-foreground/80 mt-3 line-clamp-2 text-sm leading-relaxed">
            {role.description}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent className="bg-background/95 border-border/50 max-w-2xl font-mono backdrop-blur-xl md:max-w-4xl">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            {isDataLoading ? (
              <Skeleton className="bg-secondary/10 h-9 w-9 rounded-lg" />
            ) : (
              <div className="bg-primary/10 rounded-lg p-2">
                {role.icon && <role.icon className="text-primary h-5 w-5" />}
              </div>
            )}
            {isDataLoading ? (
              <Skeleton className="bg-secondary/10 h-3 w-40" />
            ) : (
              <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                {isRolePresent ? "Role :: Active" : "Role :: Archived"}
              </span>
            )}
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {isDataLoading ? (
              <Skeleton className="bg-secondary/10 h-8 w-3/4" />
            ) : (
              role.title
            )}
          </DialogTitle>
          <div className="text-muted-foreground flex flex-col gap-1 pt-1 text-sm">
            {isDataLoading ? (
              <>
                <Skeleton className="bg-secondary/10 h-4 w-1/3" />
                <Skeleton className="bg-secondary/10 h-3 w-1/4" />
              </>
            ) : (
              <>
                <span className="font-semibold text-white">{company}</span>
                <span className="font-mono text-xs opacity-80">
                  {role.period}
                </span>
              </>
            )}
          </div>
          {isDataLoading ? (
            <div className="space-y-2 pt-4">
              <Skeleton className="bg-secondary/10 h-4 w-full" />
              <Skeleton className="bg-secondary/10 h-4 w-5/6" />
              <Skeleton className="bg-secondary/10 h-4 w-4/5" />
            </div>
          ) : (
            <DialogDescription className="text-muted-foreground/70 pt-4 text-sm leading-relaxed">
              {role.longDescription}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-6 py-6">
          <AnimatePresence mode="wait">
            {isDataLoading ? (
              <motion.div
                key="skeleton-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <Skeleton className="bg-secondary/10 h-3 w-40" />
                  <div className="bg-secondary/20 border-border/30 space-y-2 rounded-lg border p-4 opacity-50">
                    <Skeleton className="bg-secondary/10 h-3 w-full" />
                    <Skeleton className="bg-secondary/10 h-3 w-5/6" />
                    <Skeleton className="bg-secondary/10 h-3 w-4/5" />
                    <Skeleton className="bg-secondary/10 h-3 w-full" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Skeleton className="bg-secondary/10 h-3 w-32" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Skeleton
                        key={i}
                        className="bg-secondary/10 h-6 w-16 rounded shadow-sm"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Skeleton className="bg-secondary/10 h-3 w-36" />
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <Skeleton className="bg-secondary/10 h-16 rounded-lg" />
                    <Skeleton className="bg-secondary/10 h-16 rounded-lg" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <h4 className="text-muted-foreground/50 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                    <Terminal className="h-3 w-3" /> Execute :: Key_Logs
                  </h4>
                  <div className="bg-secondary/20 border-border/30 space-y-2 rounded-lg border p-4">
                    {role.logs.map((log, i) => (
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
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-secondary/40 text-muted-foreground border-border/50 rounded border px-2 py-1 text-[10px] tracking-wider uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {role.documents && role.documents.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-muted-foreground/50 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                      <FileText className="h-3 w-3" /> Artifacts :: Documents
                    </h4>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {role.documents.map((doc, i) => (
                        <a
                          key={i}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-secondary/20 border-border/30 hover:border-primary/50 hover:bg-secondary/30 group/doc flex items-center gap-3 rounded-lg border p-3 transition-all"
                        >
                          <div className="bg-primary/10 group-hover/doc:bg-primary/20 rounded p-1.5 transition-colors">
                            <FileText className="text-primary h-4 w-4" />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <p className="text-muted-foreground group-hover/doc:text-foreground truncate text-xs font-medium transition-colors">
                              {doc.name}
                            </p>
                          </div>
                          <Download className="text-muted-foreground/50 h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
