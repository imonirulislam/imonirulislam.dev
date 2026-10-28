import { activateOnKey } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
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
  const isRolePresent = role.period.toLowerCase().includes("present");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={activateOnKey}
          className="group/item bg-card border-border shadow-brutal brutal-lift focus-visible:outline-primary relative cursor-pointer border-2 p-5 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {/* Role Connector Dot */}
          <div className="bg-pop-yellow border-border group-hover/item:bg-pop-pink absolute top-1/2 -left-[25px] h-3 w-3 -translate-y-1/2 border-2 transition-colors md:-left-[33px]" />
          <div className="bg-border/30 group-hover/item:bg-primary/30 absolute top-1/2 -left-[18px] h-px w-4 -translate-y-1/2 transition-colors md:-left-[27px] md:w-6" />

          <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
            <div>
              <h4 className="text-base font-bold transition-colors">
                {role.title}
              </h4>
              <div className="text-muted-foreground mt-1 flex items-center gap-2 font-mono text-xs">
                <Calendar className="h-3 w-3" />
                {role.period}
              </div>
            </div>
            <ExternalLink className="text-muted-foreground h-3.5 w-3.5 opacity-0 transition-opacity group-hover/item:opacity-100" />
          </div>
          <p className="text-muted-foreground mt-3 line-clamp-2 text-sm leading-relaxed">
            {role.description}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent className="bg-background border-border max-w-2xl font-mono md:max-w-4xl">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            <div className="bg-primary/10 rounded-lg p-2">
              {role.icon && <role.icon className="text-primary h-5 w-5" />}
            </div>
            <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
              {isRolePresent ? "Role :: Active" : "Role :: Archived"}
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            role.title
          </DialogTitle>
          <div className="text-muted-foreground flex flex-col gap-1 pt-1 text-sm">
            <>
              <span className="text-foreground font-semibold">{company}</span>
              <span className="font-mono text-xs opacity-80">
                {role.period}
              </span>
            </>
          </div>
          <DialogDescription className="text-muted-foreground pt-4 text-sm leading-relaxed">
            {role.longDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="content-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <h4 className="text-muted-foreground flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                  <Terminal className="h-3 w-3" /> Execute :: Key_Logs
                </h4>
                <div className="bg-secondary border-border space-y-2 rounded-lg border p-4">
                  {role.logs.map((log, i) => (
                    <div
                      key={i}
                      className="text-muted-foreground flex items-start gap-4 font-mono text-xs"
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
                <h4 className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  Stack :: Environment
                </h4>
                <div className="flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-secondary text-muted-foreground border-border rounded border px-2 py-1 text-[10px] tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {role.documents && role.documents.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-muted-foreground flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                    <FileText className="h-3 w-3" /> Artifacts :: Documents
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {role.documents.map((doc, i) => (
                      <a
                        key={i}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-secondary border-border hover:border-primary hover:bg-secondary group/doc flex items-center gap-3 rounded-lg border p-3 transition-all"
                      >
                        <div className="bg-primary/10 group-hover/doc:bg-primary/20 rounded p-1.5 transition-colors">
                          <FileText className="text-primary h-4 w-4" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-muted-foreground group-hover/doc:text-foreground truncate text-xs font-medium transition-colors">
                            {doc.name}
                          </p>
                        </div>
                        <Download className="text-muted-foreground h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
