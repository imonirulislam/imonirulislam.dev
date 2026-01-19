import { Project, ProjectCategory } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Butelka (Unified AdPlatform)",
    description:
      "Unified ad tech platform to push ads to different platforms like Improve Digital, DV360, and XANDR.",
    longDescription:
      "A comprehensive AdTech solution designed to streamline ad ingestion and distribution. Features upgraded auth mechanics for cross-platform access, efficient campaign syncing for batch ingestion to GCP, and optimized data conversion algorithms for seamless integration with multiple ad platforms.",
    tech: ["NodeJS", "NestJS", "MongoDB", "ReactJs", "GCP"],
    category: ProjectCategory.Cloud,
    specs: ["Unified Auth", "Batch Ingestion", "Ad Syncing"],
    logs: [
      "Upgraded the current Auth mechanics in the unified Adtech platform to access it from various platforms.",
      "Syncing the ads campaign in an efficient way to support batch ingestion over time to GCP.",
      "Make efficient conversion of unified ads data that helped it to push into different ad platforms",
    ],
    github: "#",
    demo: "#",
    images: [],
  },
  {
    title: "Madvertise Warehouse",
    description:
      "Data warehousing pipeline migration and optimization for high-speed reporting.",
    longDescription:
      "Successfully migrated the full data warehousing pipeline from OVH to AWS, significantly speeding up data reporting. specialized in optimizing Apache Druid cluster configurations and ingestion specifications to reduce processing time and improve hardware efficiency.",
    tech: ["Laravel", "PHP", "Druid", "AWS", "Terraform"],
    category: ProjectCategory.Data,
    specs: ["AWS Migration", "Druid Optimization", "Terraform Infra"],
    logs: [
      "Migrated the full data warehousing pipeline to AWS cloud from OVH cloud which helped speed up the data cluster for reporting.",
      "Updated Apache Druid cluster configs for efficient system hardware usability.",
      "Updated Apache Druid ingestion specs for a better way to store data which helped reduce data ingestion time.",
      "Bash scripting for managing log processing of the current application.",
      "Migrated the existing infra in terraform for AWS services.",
    ],
    github: "#",
    demo: "#",
    images: [],
  },
  {
    title: "Online Exam Platform",
    description:
      "Serverless MERN stack platform supporting 200K concurrent production requests.",
    longDescription:
      "A high-scale online examination platform built on a serverless architecture using AWS Lambda and DynamoDB. optimized for cost and performance, handling massive concurrent user loads with custom batch data insertion scripts and tuned database configurations.",
    tech: ["NestJs", "DynamoDB", "AWS Lambda", "Serverless"],
    category: ProjectCategory.Backend,
    specs: ["Serverless Arch", "200k User Capacity", "Cost Optimization"],
    logs: [
      "Building an online exam platform in the MERN stack for the company & and deploying in a serverless infrastructure that can support up to 200K requests from the users.",
      "Created a NodeJS (express) script for batch data insertion to DynamoDb tables.",
      "Configured the DynamoDb configs that helped reduce the cost.",
    ],
    github: "#",
    demo: "#",
    images: [],
  },
  {
    title: "Self Hosted Git",
    description:
      "Fully managed self-hosted Gitea environment on AWS with automated backups.",
    longDescription:
      "Deployed and maintained a secure, self-hosted git infrastructure using Gitea on AWS. implemented robust automated backup solutions to ensure data integrity and minimize the risk of data loss for internal codebases.",
    tech: ["Gitea", "AWS", "Bash", "DevOps"],
    category: ProjectCategory.DevOps,
    specs: ["Self-Hosted", "Automated Backups", "Infra Management"],
    logs: [
      "Deployed own self-hosted git environment called (gitea) & and managed the full infrastructure on AWS.",
      "Added backup for the git server to minimize the risk of data loss.",
    ],
    github: "#",
    demo: "#",
    images: [],
  },
  {
    title: "Code Generator",
    description:
      "Custom internal tool in Golang for generating CRUD operations from rules.",
    longDescription:
      "An internal developer productivity tool built in Golang. Automates the creation of standard CRUD operations based on predefined business rules, significantly reducing boilerplate code and speeding up feature development.",
    tech: ["Golang", "Bash", "Internal Tool"],
    category: ProjectCategory.Backend,
    specs: ["Code Generation", "Custom CRUD", "Rule Engine"],
    logs: [
      "Build a custom code generator in Golang that generates custom CRUD from predefined rules.",
    ],
    github: "#",
    demo: "#",
    images: [],
  },
  {
    title: "Data Warehouse Solution",
    description:
      "Built a custom data warehousing internal tool for large scale data processing using AWS services.",
    longDescription:
      "A comprehensive data warehousing platform designed to ingest, process, and query terabytes of infrastructure logs. Built with a focus on high availability and low-latency querying for internal analytics teams.",
    tech: ["AWS", "Node.js", "Redshift"],
    category: ProjectCategory.Cloud,
    specs: ["ETL Pipelines", "S3 Data Lake", "IAM Security"],
    github: "https://github.com/imonirulislam",
    demo: "https://imonirulislam.dev",
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
    category: ProjectCategory.Infrastructure,
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
    category: ProjectCategory.DevOps,
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
    category: ProjectCategory.Backend,
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
    category: ProjectCategory.Legacy,
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
    category: ProjectCategory.Data,
    specs: ["Grok Patterns", "Index Lifecycle", "Logstash Clusters"],
    github: "https://github.com/imonirulislam",
    demo: "#",
    images: [],
  },
];

export const projectCategories: string[] = [
  "All",
  ...Object.values(ProjectCategory),
];
