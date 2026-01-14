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
    company: "Vivasoft Limited",
    totalPeriod: "Jan 2023 - Present",
    roles: [
      {
        title: "Senior Software Engineer L-II",
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
      {
        title: "Senior Software Engineer L-I",
        period: "Jan 2023 - Jan 2024",
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
    company: "APSIS",
    totalPeriod: "NOV 2019 - DEC 2022",
    roles: [
      {
        title: "Senior Software Engineer",
        period: "Apr 2022 - Dec 2022",
        description:
          "Led backend development and system architecture, focusing on scalable Node.js services and team mentorship.",
        longDescription:
          "Architected and implemented core backend services using NestJs, including robust authentication with JWT and Azure AD. Designed dynamic notification systems with WebSockets and Redis, managed distributed queues, and established comprehensive logging and audit trails. Mentored the team in adopting modern Node.js practices and optimized system performance.",
        tags: [
          "Laravel",
          "Docker",
          "Node.Js",
          "WebSocket",
          "Redis",
          "AWS",
          "Terraform",
          "Team Lead",
          "FinOps",
        ],
        icon: Cloud,
        logs: [
          "Build backend services supporting multiple business functions and heavy daily usage.",
          "Working closely with product owner for Banking, Supply chain ERP solutions.",
          "Implementing Core application setup in NestJs.",
          "Implementing an Authentication system with JWT.",
          "Thirparty Auth Implementation with Azure AD.",
          "Design & Implementation of User behavior into the system.",
          "Design & Implementation of the application log.",
          "API documentation implementation with Swagger/Open API.",
          "Design & Implementation of DB logs.",
          "Working with Socket.io and Websocket for a dynamic notification system.",
          "Redis PUB/SUB services.",
          "Distributed Queue management system for various work.",
          "Implentation of Audit Trail Services.",
          "Implementing a Custom & configurable file management system for the application.",
          "Reviewing codes and providing assistance to group members who have very little expertise in NestJs.",
          "Training employees on how to use the new system and providing ongoing support for them as issues arise.",
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
        title: "Associate Software Engineer",
        period: "Nov 2019 - Apr 2022",
        description:
          "Developed and maintained enterprise ERP solutions using PHP/Laravel ecosystem.",
        longDescription:
          "Played a key role in the full lifecycle development of complex ERP modules including Accounts, Procurement, and Sales. Specialized in creating detailed accounting reports, optimizing database performance, and collaborating with cross-functional teams to resolve production issues and ensure system stability.",
        tags: ["PHP", "Laravel", "Lumen", "MySql"],
        icon: Cloud,
        logs: [
          "Design, develop, and maintain enterprise resource planning (ERP) software solutions.",
          "Write well-designed, testable, and efficient code based on specifications.",
          "Integrate ERP software with third-party applications as needed.",
          "Assist in the creation of technical documentation for ERP software solutions.",
          "Collaborate with team members to identify and resolve defects in a timely manner.",
          "Monitor ERP software performance in production and address any issues that arise.",
          "Improving Accounting Reports (Ex: Profit Loss, Balance Sheet, Account Statement, Trial Balance) functionalities based on business requirements.",
          "Working with a different part of the ERP module including Accounts, Procurement, Sales, and Fixed Asset.",
          "Stay up-to-date on the latest industry trends and best practices.",
        ],
      },
    ],
  },
  {
    company: "UniSearch / Independent",
    totalPeriod: "Dec 2021 - Mar 2022",
    roles: [
      {
        title: "Backend Api Developer",
        period: "Dec 2021 - Mar 2022",
        description:
          "Engineered high-performance backend systems for search accuracy, real-time features, and platform scalability.",
        longDescription:
          "Spearheaded the development of core EduTech features including dynamic page generation, virtual office integration, and appointment booking systems across timezones. Optimized platform performance through Redis caching and improved student-university matching algorithms while integrating external services like Weather APIs.",
        tags: [
          "Node.js",
          "Redis",
          "TypeScript",
          "Database Design",
          "PostgreSql",
        ],
        icon: Database,
        logs: [
          "Works closely with the Product Owner, design solutions, and write user stories based on business requirements.",
          "Help train and mentor other data/integration developers.",
          "Design & architect Ed-tech solution backend application(Built-in NestJs).",
          "Integrating chat & messaging system.",
          "Improving search accuracy for course search for the application.",
          "Adding Dynamic page generation for the application.",
          "Integrating Virtual office for Counsellor & Student.",
          "Booking appointment implementation (Considering various timezone constraints).",
          "Online Learning Management for prospective students.",
          "Caching data into caching DB (REDIS).",
          "Improving accuracy for matching student profiles with matched Universities & Courses.",
          "Integrating Weather APIs into system.",
        ],
      },
    ],
  },
  {
    company: "Nenorex Technologies / Contractual",
    totalPeriod: "Jan 2018 - Jan 2019",
    roles: [
      {
        title: "Software Developer",
        period: "Jan 2018 - Jan 2019",
        description:
          "Built and optimized HRM solutions with a focus on automation and real-time tracking.",
        longDescription:
          "Focused on developing comprehensive Human Resource Management (HRM) systems. Automated critical workflows including attendance device integration, real-time attendance capture, and payroll processing, significantly improving operational efficiency for client businesses.",
        tags: ["PHP", "MySQL", "jQuery", "Laravel", "CodeIgniter"],
        icon: Terminal,
        logs: [
          "Working with HRM solutions.",
          "Automating attendance devices with the HRM application.",
          "Improve attendance capture in real-time with HRM application.",
          "Improving Payroll automation in the HRM application.",
        ],
      },
    ],
  },
  {
    company: "CAPM Company Ltd.",
    totalPeriod: "May 2017 - Dec 2017",
    isExtended: true,
    roles: [
      {
        title: "Software Developer",
        period: "May 2017 - Dec 2017",
        description:
          "Developed financial portfolio management applications and corporate web solutions.",
        longDescription:
          "Built and maintained the company's corporate website using CodeIgniter and developed a specialized Portfolio Management Application for stock exchange operations. Gained valuable experience working with Oracle databases and financial data structures.",
        tags: ["CodeIgniter", "Oracle", "HTML", "CSS"],
        icon: Briefcase,
        logs: [
          "Built Company website in Codeigniter.",
          "Portfolio Management Application for stock exchange.",
          "Working with oracle database in portfolio management application.",
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
