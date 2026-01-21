import { CompanyExperience } from "@/types/experience";
import { Cpu, Cloud, Database, Terminal, Briefcase } from "lucide-react";

export const experiences: CompanyExperience[] = [
  {
    company: "Vivasoft Limited",
    totalPeriod: "Jan 2023 - Present",
    roles: [
      {
        title: "Senior Software Engineer L-II",
        period: "Jan 2024 - Present",
        description:
          "Contributing to backend, infrastructure, and platform engineering for large-scale AdTech platforms, focusing on AWS migrations, Kubernetes, and observability.",
        longDescription:
          "Leading infrastructure evolution and backend engineering for the Bluestack AdTech platform. Improved scalability by 4x through migrating legacy on-premise systems to AWS EKS. Designed and managed AWS infrastructure using Terraform and migrated data warehousing to Apache Druid. Implemented comprehensive observability with Prometheus, Grafana, Vector, and Fluent Bit. Managing hybrid cloud infrastructure including bare-metal servers and mentoring engineers in backend best practices.",
        tags: [
          "AWS",
          "EKS",
          "Terraform",
          "Apache Druid",
          "Prometheus",
          "Grafana",
          "Vector",
          "Fluent Bit",
          "PHP",
          "Laravel",
          "Node.js",
          "Kinesis",
        ],
        icon: Cpu,
        logs: [
          "Migrated legacy on-premise AdTech system to AWS EKS, improving scalability and reliability.",
          "Designed and managed AWS infrastructure using Terraform for high-availability.",
          "Migrated data warehousing platform to Apache Druid, scaling platform to 4x original size.",
          "Implemented observability stack with Prometheus and Grafana for system health visibility.",
          "Designed log and data pipelines using Vector, Fluent Bit, and Amazon Kinesis, achieving 99% data ingestion accuracy.",
          "Managed internal infrastructure including bare-metal servers and KVM virtualization, optimizing hybrid cloud costs.",
          "Mentored engineers in Node.js and backend best practices.",
          "Contributed to internal tools like Progress Tracker.",
        ],
        documents: [
          {
            name: "Systems_Architecture_Diagram.pdf",
            url: "#",
          },
        ],
      },
      {
        title: "Senior Software Engineer L-1",
        period: "Jan 2023 - Jan 2024",
        description:
          "Served as a resource augmentation engineer for Azerion, improving backend architecture and security for the Butelka AdTech platform before transitioning to the Bluestack project.",
        longDescription:
          "Assigned as a resource augmentation engineer for Azerion, a global AdTech company, contributing to the Butelka project. My responsibilities included improving backend architecture, strengthening error handling mechanisms, and enhancing authentication and authorization flows to improve system reliability and security. Worked closely with distributed teams and international stakeholders to deliver backend improvements over a four-month engagement before transitioning to long-term contributions on the Bluestack project.",
        tags: [
          "NestJS",
          "MongoDB",
          "Backend Architecture",
          "System Design",
          "AWS",
          "GCP",
          "Laravel",
          "PHP",
          "Druid",
          "Terraform",
          "Golang",
        ],
        icon: Cpu,
        logs: [
          "Resource Augmentation: Engaged with Azerion for the Butelka AdTech platform.",
          "Project Butelka: Improved backend architecture and strengthened error handling mechanisms in NestJS.",
          "Project Butelka: Enhanced authentication and authorization flows to improve system reliability and security.",
          "Project Butelka: Collaborated with distributed teams to deliver backend improvements.",
          "Project Butelka: Optimized unified ads data conversion for pushing to platforms like Improve Digital, DV360, XANDR.",
          "Project Madvertise: Migrated data warehousing pipeline from OVH to AWS, improving reporting speed.",
          "Project Madvertise: Updated Apache Druid cluster configs for efficient hardware usability.",
          "Project Madvertise: Optimized Druid ingestion specs to reduce data ingestion time.",
          "Project Madvertise: Managed log processing via Bash scripting.",
          "Project Madvertise: Migrated infrastructure to AWS using Terraform.",
          "Online Exam Platform: Built MERN stack platform supporting 200K concurrent users.",
          "Online Exam Platform: Deployed on Serverless AWS Lambda infrastructure.",
          "Online Exam Platform: Created NodeJS scripts for batch DynamoDB insertion.",
          "Online Exam Platform: Optimized DynamoDB configs to reduce costs.",
          "Infrastructure: Deployed and managed self-hosted Gitea on AWS.",
          "Infrastructure: Implemented automated backup solutions for git server.",
          "Internal Tools: Built custom code generator in Golang for rule-based CRUD generation.",
        ],
        documents: [],
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
