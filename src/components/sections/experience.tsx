"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronDown,
  ChevronUp,
  Terminal,
  ExternalLink,
  Cpu,
  Database,
  Cloud,
  Building2,
  Calendar,
  Briefcase,
  LucideIcon,
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

// Interface for type safety
interface Document {
  name: string;
  url: string;
}

interface Role {
  title: string;
  period: string;
  description: string;
  longDescription: string;
  tags: string[];
  icon: LucideIcon;
  logs: string[];
  documents?: Document[];
}

interface CompanyExperience {
  company: string;
  totalPeriod: string;
  isExtended?: boolean; // For "Show More" functionality
  roles: Role[];
}

const experiences: CompanyExperience[] = [
  {
    company: "Stealth Startup / Independent",
    totalPeriod: "Jan 2024 - Present",
    roles: [
      {
        title: "Systems & Bare Metal Specialist",
        period: "Jan 2024 - Present",
        description:
          "Deep-diving into bare metal server management, networking, and low-level system optimizations.",
        longDescription:
          "Currently spearheading infrastructure evolution by moving beyond virtualization into raw hardware orchestration. This involves custom PXE boot setups, automated firmware management, and optimizing networking stacks for high-throughput data pipelines. Working extensively with Linux kernel tuning and low-latency communication protocols.",
        tags: ["Linux Kernel", "PXE", "Networking", "Hardware"],
        icon: Cpu,
        logs: [
          "Optimized kernel parameters for 20% latency reduction.",
          "Provisioning automated bare-metal internal cloud.",
          "Maintaining 99.99% uptime for core infrastructure nodes.",
        ],
        documents: [
          {
            name: "Systems_Architecture_Diagram.pdf",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    company: "CloudScale Solutions",
    totalPeriod: "Mar 2021 - Dec 2023",
    roles: [
      {
        title: "Senior DevOps Engineer",
        period: "Jan 2023 - Dec 2023",
        description:
          "Led the infrastructure team, focusing on cost optimization and architectural scalability.",
        longDescription:
          "Promoted to lead the infrastructure team. Architected multi-region AWS footprint with Terraform and reduced cloud spends by 35% through resource auditing.",
        tags: ["AWS", "Terraform", "Team Lead", "FinOps"],
        icon: Cloud,
        logs: [
          "Architected multi-region AWS footprint.",
          "Reduced cloud spends by 35%.",
          "Mentored junior DevOps engineers.",
        ],
        documents: [
          {
            name: "AWS_Certified_Solutions_Architect.pdf",
            url: "#",
          },
          {
            name: "Team_Performance_2023.pdf",
            url: "#",
          },
        ],
      },
      {
        title: "DevOps & Infrastructure Engineer",
        period: "Mar 2021 - Dec 2022",
        description:
          "Managed complex infrastructures, CI/CD pipelines, and data warehousing solutions.",
        longDescription:
          "Managed a large-scale AWS environment supporting over 50 microservices. Focused on Infrastructure as Code (Terraform) and robust CI/CD practices. Handled migration of legacy data systems to modern Redshift clusters.",
        tags: ["Kubernetes", "CI/CD", "Redshift"],
        icon: Cloud,
        logs: [
          "Managed 50+ microservices in Kubernetes EKS.",
          "Implemented ArgoCD for GitOps workflows.",
          "Migrated legacy DBs to Redshift clusters.",
        ],
      },
    ],
  },
  {
    company: "FinTech Innovations",
    totalPeriod: "Jun 2019 - Feb 2021",
    roles: [
      {
        title: "Full Stack Engineer (Node.js)",
        period: "Jun 2019 - Feb 2021",
        description:
          "Transitioned to the Node.js ecosystem, focusing on high-performance APIs and asynchronous architectures.",
        longDescription:
          "Key player in transitioning the company's core product from a PHP monolith to a distributed Node.js microservices architecture. Designed and implemented critical services for real-time order processing and user notification systems using WebSockets and Redis.",
        tags: ["Node.js", "Redis", "Microservices", "TypeScript"],
        icon: Database,
        logs: [
          "Refactored monolith PHP to Node.js microservices.",
          "Implemented real-time data streaming via WebSockets.",
          "Integrated complex third-party ETL pipelines.",
        ],
      },
    ],
  },
  {
    company: "Creative Web Agency",
    totalPeriod: "Jan 2017 - May 2019",
    roles: [
      {
        title: "PHP Developer",
        period: "Jan 2017 - May 2019",
        description:
          "Started my journey building dynamic web applications with PHP and mastering back-end fundamentals.",
        longDescription:
          "Foundation years spent building robust web applications for news portals and large-scale blog platforms. Mastered MySQL optimization and server-side rendering patterns before the modern JS era.",
        tags: ["PHP", "MySQL", "jQuery", "Apache"],
        icon: Terminal,
        logs: [
          "Developed custom CMS for high-traffic news portals.",
          "Optimized SQL queries for improved performance.",
          "Managed legacy VPS deployments and manual backups.",
        ],
      },
    ],
  },
  {
    company: "Freelance",
    totalPeriod: "Jun 2015 - Dec 2016",
    isExtended: true,
    roles: [
      {
        title: "Junior Web Developer",
        period: "Jun 2015 - Dec 2016",
        description:
          "Learned the ropes of web development, working with early CMS systems and basic jQuery/CSS setups.",
        longDescription:
          "Initial entry into the professional world, maintaining a wide variety of client sites and learning best practices in collaborative software development and client communication.",
        tags: ["HTML", "CSS", "WordPress", "Hosting"],
        icon: Briefcase,
        logs: [
          "Managed shared hosting environments.",
          "Built responsive themes for local businesses.",
          "Maintained legacy WordPress installations.",
        ],
      },
    ],
  },
  {
    company: "Home Lab",
    totalPeriod: "2012 - 2015",
    isExtended: true,
    roles: [
      {
        title: "Self-taught Hobbyist",
        period: "2012 - 2015",
        description:
          "Experimenting with Linux, scripting, and basic HTML/CSS in various home lab configurations.",
        longDescription:
          "The curious start of everything. Learning by breaking and fixing Linux distributions, automating chores with shell scripts, and discovering the power of the terminal.",
        tags: ["Linux", "Bash", "HomeLab", "Curiosity"],
        icon: Terminal,
        logs: [
          "Flashed custom ROMs and kernel optimizations.",
          "Configured first homelab on a recycled Dell OptiPlex.",
          "Wrote first shell script for automated backups.",
        ],
      },
    ],
  },
];

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
      <div className="from-border/0 via-border/20 to-border/0 absolute top-0 left-1/2 -z-10 h-full w-px -translate-x-1/2 bg-gradient-to-b" />

      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-20 flex items-center gap-4">
          <h2 className="text-muted-foreground text-sm font-bold tracking-[0.3em] whitespace-nowrap uppercase">
            Trace :: Professional History
          </h2>
          <div className="bg-border/40 h-px w-full" />
        </div>

        <div className="relative space-y-12">
          {/* Timeline Spine */}
          <div className="from-border/0 via-border/20 to-border/0 absolute top-0 -bottom-12 left-[16px] -z-10 w-px -translate-x-1/2 bg-gradient-to-b md:left-[24px]" />

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
                    <div className="bg-secondary/30 absolute top-[24px] left-[16px] h-3 w-3 -translate-x-1/2 rounded-full md:left-[24px]" />
                    <div className="flex-1">
                      <div className="bg-secondary/5 border-border/40 space-y-4 rounded-lg border p-6">
                        <Skeleton className="bg-secondary/10 h-6 w-1/3" />
                        <Skeleton className="bg-secondary/10 h-4 w-1/4" />
                        <Skeleton className="bg-secondary/10 h-4 w-full" />
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
                          className={`border-background h-4 w-4 rounded-full border-4 transition-colors duration-300 ${isPresent(companyData.totalPeriod) ? "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]" : "bg-muted-foreground/30 group-hover/company:bg-primary/50"}`}
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
                      <div className="border-border/40 relative ml-3 space-y-8 border-l-2 border-dashed pl-4 md:ml-6 md:pl-6">
                        {companyData.roles.map((role) => (
                          <Dialog key={role.title + role.period}>
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

                            <DialogContent className="bg-background/95 border-border/50 max-w-2xl font-mono backdrop-blur-xl">
                              <DialogHeader>
                                <div className="mb-2 flex items-center gap-2">
                                  <div className="bg-primary/10 rounded-lg p-2">
                                    {role.icon && (
                                      <role.icon className="text-primary h-5 w-5" />
                                    )}
                                  </div>
                                  <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                                    {isPresent(role.period)
                                      ? "Role :: Active"
                                      : "Role :: Archived"}
                                  </span>
                                </div>
                                <DialogTitle className="text-2xl font-bold tracking-tight">
                                  {role.title}
                                </DialogTitle>
                                <div className="text-muted-foreground flex flex-col gap-1 pt-1 text-sm">
                                  <span className="font-semibold text-white">
                                    {companyData.company}
                                  </span>
                                  <span className="font-mono text-xs opacity-80">
                                    {role.period}
                                  </span>
                                </div>
                                <DialogDescription className="text-muted-foreground/70 pt-4 text-sm leading-relaxed">
                                  {role.longDescription}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6 py-6">
                                <div className="space-y-3">
                                  <h4 className="text-muted-foreground/50 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                                    <Terminal className="h-3 w-3" /> Execute ::
                                    Key_Logs
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

                                {role.documents &&
                                  role.documents.length > 0 && (
                                    <div className="space-y-3">
                                      <h4 className="text-muted-foreground/50 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                                        <FileText className="h-3 w-3" />{" "}
                                        Artifacts :: Documents
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
                              </div>
                            </DialogContent>
                          </Dialog>
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
