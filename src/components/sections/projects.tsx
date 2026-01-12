"use client";

import { useEffect, useState } from "react";
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
  Github,
  Monitor,
  Terminal,
  Server,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Data Warehouse Solution",
    description:
      "Built a custom data warehousing internal tool for large scale data processing using AWS services.",
    longDescription:
      "A comprehensive data warehousing platform designed to ingest, process, and query terabytes of infrastructure logs. Built with a focus on high availability and low-latency querying for internal analytics teams.",
    tech: ["AWS", "Node.js", "Redshift"],
    category: "Cloud",
    specs: ["ETL Pipelines", "S3 Data Lake", "IAM Security"],
    github: "https://github.com/imonirulislam",
    demo: "#",
    images: [
      "/projects/data_warehouse_viz.png",
      "/projects/data_warehouse_query.png",
    ],
  },
  {
    title: "Bare Metal Monitor",
    description:
      "A lightweight dashboard for monitoring bare metal server health and performance metrics.",
    longDescription:
      "A real-time monitoring agent and dashboard specifically for bare metal fleets. Collects kernel telemetry, thermal data, and disk IO stats without the overhead of heavy agents like Prometheus.",
    tech: ["Go", "React", "Linux"],
    category: "Infrastructure",
    specs: ["Kernel Telemetry", "WebSockets", "Zero-Agent"],
    github: "https://github.com/imonirulislam",
    demo: "#",
    images: [
      "/projects/bare_metal_dashboard.png",
      "/projects/bare_metal_node.png",
    ],
  },
  {
    title: "Infrastructure as Code",
    description:
      "Personal collection of Terraform modules for rapid deployment of secure AWS environments.",
    longDescription:
      "Battle-tested Terraform blueprints for deploying production-grade AWS infrastructure. Includes hardened VPCs, EKS clusters with custom CNI, and automated RDS failover configurations.",
    tech: ["Terraform", "AWS", "DevOps"],
    category: "DevOps",
    specs: ["Hardened VPCs", "EKS Modules", "Auto-Scaling"],
    github: "https://github.com/imonirulislam",
    demo: "#",
    images: [],
  },
  {
    title: "Node.js API Gateway",
    description:
      "High-performance microservices gateway with rate limiting and authentication.",
    longDescription:
      "A custom-built API gateway designed to handle 10k+ requests per second. Features dynamic routing, JWT validation at the edge, and distributed rate limiting using Redis.",
    tech: ["Node.js", "Redis", "Docker"],
    category: "Backend",
    specs: ["JWT Edge Auth", "Dynamic Routing", "Rate Limiting"],
    github: "https://github.com/imonirulislam",
    demo: "#",
    images: [],
  },
  {
    title: "PHP Legacy Migration",
    description:
      "Step-by-step migration tool for moving monolithic PHP apps to distributed Node.js.",
    longDescription:
      "A set of proxy services and data synchronizers that allow for the incremental strangulation of PHP monoliths. Enables teams to migrate routes one-by-one to Node.js without downtime.",
    tech: ["PHP", "Node.js", "MySQL"],
    category: "Legacy",
    specs: ["Proxy Routing", "Data Sync", "Incremental Cutover"],
    github: "https://github.com/imonirulislam",
    demo: "#",
    images: [],
  },
  {
    title: "Log Aggregator",
    description:
      "Custom ELK stack configuration for handling millions of logs from heterogeneous sources.",
    longDescription:
      "Optimized ELK (Elasticsearch, Logstash, Kibana) deployment tailored for high-volume syslogs. Includes custom Grok patterns and automated index lifecycle management.",
    tech: ["Elasticsearch", "Logstash", "Kibana"],
    category: "Data",
    specs: ["Grok Patterns", "Index Lifecycle", "Logstash Clusters"],
    github: "https://github.com/imonirulislam",
    demo: "#",
    images: [],
  },
];

const ProjectPlaceholder = () => (
  <div className="bg-secondary/20 group/placeholder relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
    <div className="grid-pattern absolute inset-0 opacity-20" />
    <Terminal className="text-muted-foreground/20 mb-4 h-12 w-12 transition-transform duration-500 group-hover/placeholder:scale-110" />
    <div className="text-muted-foreground/40 z-10 font-mono text-[10px] tracking-[0.4em] uppercase antialiased">
      Non_Visual_Protocol
    </div>
    <div className="mt-2 flex gap-1.5 opacity-30 grayscale">
      <div className="bg-primary/40 h-1.5 w-1.5 animate-pulse rounded-sm" />
      <div className="bg-primary/40 h-1.5 w-1.5 animate-pulse rounded-sm delay-75" />
      <div className="bg-primary/40 h-1.5 w-1.5 animate-pulse rounded-sm delay-150" />
    </div>
  </div>
);

function ProjectItem({ project }: { project: (typeof projects)[0] }) {
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
      <DialogContent className="bg-background/95 border-border/50 max-w-2xl font-mono backdrop-blur-xl">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            <div className="bg-primary/10 rounded-lg p-2">
              <Server className="text-primary h-5 w-5" />
            </div>
            <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
              DEPLOYMENT_NODE :: {project.category}
            </span>
          </div>
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold tracking-tight">
            {project.title}
            {!hasImages && (
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20 px-2 py-0.5 font-mono text-[9px] tracking-widest shadow-sm"
              >
                DATA_ONLY_MODE
              </Badge>
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
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton
                      key={i}
                      className="bg-secondary/10 h-12 rounded-md"
                    />
                  ))}
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

                <DialogDescription className="text-muted-foreground/70 text-sm leading-relaxed">
                  {project.longDescription}
                </DialogDescription>
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

        <div className="border-border/20 flex gap-4 border-t pt-6">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-secondary/80 border-border/50 flex flex-1 items-center justify-center gap-2 rounded-md border py-2.5 text-[11px] font-bold tracking-widest uppercase transition-colors"
          >
            <Github className="h-3.5 w-3.5" /> Source_Code
          </a>
          <a
            href={project.demo}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 text-[11px] font-bold tracking-widest uppercase transition-colors"
          >
            <Monitor className="h-3.5 w-3.5" /> Live_Demo
          </a>
        </div>

        <div className="text-muted-foreground/40 flex items-center justify-between pt-4 text-[9px] tracking-widest uppercase">
          <span>Build_Status: Stable</span>
          <span>Environment: Production</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const categories = [
  "All",
  "Cloud",
  "Infrastructure",
  "DevOps",
  "Backend",
  "Data",
];

export function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter(
          (p) => p.category === filter || p.tech.includes(filter)
        );

  return (
    <section id="projects" className="relative scroll-mt-20 py-24">
      <div className="from-border/0 via-border to-border/0 absolute top-0 left-1/2 h-24 w-px -translate-x-1/2 bg-gradient-to-b" />

      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-1 items-center gap-4">
            <h2 className="text-muted-foreground text-sm font-bold tracking-[0.3em] whitespace-nowrap uppercase">
              Deployments :: Projects
            </h2>
            <div className="bg-border/40 h-px w-full" />
          </div>
        </div>

        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex flex-wrap items-center gap-2"
          >
            <span className="text-muted-foreground mr-2 font-mono text-[10px]">
              QUERY_FILTER:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`border px-3 py-1 font-mono text-[10px] transition-all duration-200 ${
                  filter === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/20 text-muted-foreground border-border/50 hover:border-primary/50"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="grid-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-secondary/10 border-border/50 flex flex-col overflow-hidden rounded-lg border p-0"
                  >
                    <Skeleton className="bg-secondary/10 h-40 w-full" />
                    <div className="space-y-4 p-6">
                      <Skeleton className="bg-secondary/10 h-6 w-2/3" />
                      <Skeleton className="bg-secondary/10 h-4 w-full" />
                      <div className="border-border/20 flex gap-2 border-t pt-4">
                        <Skeleton className="bg-secondary/10 h-4 w-12" />
                        <Skeleton className="bg-secondary/10 h-4 w-12" />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="grid-content"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                className="col-span-full grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="h-full"
                    >
                      <ProjectItem project={project} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
