// Real content for Sudhanshu Panthri, mapped into the editorial portfolio layout.
// Years are approximate and easy to adjust below.

export const profile = {
  name: "Sudhanshu Panthri",
  firstName: "Sudhanshu",
  lastName: "Panthri",
  role: "Full-stack .NET Developer",
  tagline:
    "Forging C# APIs, GraphQL services, and Blazor apps that keep healthcare systems moving.",
  location: "New Delhi, IN",
  email: "panthrisudhanshu666@gmail.com",
  phone: "+91 70422 48925",
  resume: "/Sudhanshu-Panthri-Resume.pdf",
  available: true,
  availabilityLabel: "Available — open to work",
  socials: [
    { label: "GitHub", href: "https://github.com/SudhanshuPanthri" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sudhanshu-p-43797ab1/" },
    { label: "Email", href: "mailto:panthrisudhanshu666@gmail.com" },
  ],
};

// Keywords for the hero marquee
export const marqueeWords = [
  "C# / .NET",
  "ASP.NET Core",
  "GraphQL",
  "HotChocolate",
  "Blazor",
  "EF Core",
  "SQL Server",
  "Azure DevOps",
  "Clean Architecture",
  "Next.js",
];

export type NavCategory = {
  label: string;
  href: string;
  items: { label: string; href: string }[];
};

export const navCategories: NavCategory[] = [
  {
    label: "Work",
    href: "#work",
    items: [
      { label: "Selected", href: "#work" },
      { label: "Open source", href: "https://github.com/SudhanshuPanthri" },
    ],
  },
  {
    label: "Stack",
    href: "#stack",
    items: [
      { label: "Backend", href: "#stack" },
      { label: "Frontend", href: "#stack" },
      { label: "Cloud", href: "#stack" },
    ],
  },
  {
    label: "Info",
    href: "#about",
    items: [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#about" },
    ],
  },
  {
    label: "Contact",
    href: "#contact",
    items: [
      { label: "Email", href: "mailto:panthrisudhanshu666@gmail.com" },
      { label: "Résumé", href: "/Sudhanshu-Panthri-Resume.pdf" },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  year: string;
  role: string;
  description: string;
  tags: string[];
  art: string; // css art class for primary media
  media: string[]; // css art classes for the thumbnail selector
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "wealthlens",
    title: "WealthLens",
    year: "2025",
    role: "Solo · Full-stack",
    description:
      "A portfolio analytics platform that sees what broker apps can't: multi-broker imports with format auto-detection, live NSE/BSE pricing and mutual-fund NAVs, FIFO/XIRR analytics, capital-gains tax intelligence, and an AI insights engine that escalates from rule-based analysis up to Claude.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Prisma", "Tailwind", "Claude"],
    art: "/projects/wealthlens/ai-insights.png",
    media: [
      "/projects/wealthlens/ai-insights.png",
      "/projects/wealthlens/transactions.png",
      "/projects/wealthlens/watchlist.png",
      "/projects/wealthlens/stock-detail.png",
      "/projects/wealthlens/import.png",
    ],
    links: [
      { label: "Live ↗", href: "https://wealth-lens-one.vercel.app/" },
      { label: "GitHub ↗", href: "https://github.com/SudhanshuPanthri/WealthLens" },
    ],
  },
  {
    id: "code-forge",
    title: "Code Forge",
    year: "2025",
    role: "Platform · Backend + Blazor",
    description:
      "A production-grade code-generation platform that forges entire backend layers automatically — data models, DbContexts, GraphQL types, and WebAPIs — with HotChocolate v13+ support. A Blazor frontend drives the whole thing, letting developers configure and run generation workflows visually.",
    tags: ["C#", ".NET", "GraphQL", "HotChocolate", "Blazor", "WebAPI"],
    art: "art-2",
    media: ["art-2", "art-3", "art-5"],
    links: [],
  },
  {
    id: "graphql-upgrade",
    title: "The Upgrade Saga",
    year: "2026",
    role: "Lead · GraphQL modernization",
    description:
      "Modernizing the organization's GraphQL stack onto .NET 10 and HotChocolate 16, with performance as a first-class goal — targeting 40% faster query execution and a schema restructured so future changes are easy instead of risky. Ongoing.",
    tags: ["GraphQL", "HotChocolate 16", ".NET 10", "C#", "Performance"],
    art: "art-3",
    media: ["art-3", "art-1", "art-2"],
    links: [],
  },
  {
    id: "offline-emr",
    title: "Offline-first EMR",
    year: "2024",
    role: "Blazor · Field reliability",
    description:
      "Gave clinicians an EMR that works with zero bars. Offline-first Blazor backed by local storage and in-memory caching keeps the app fully functional with no connection, while care-plan conflict-resolution logic merges concurrent edits safely on sync — cutting sync failures by 25%.",
    tags: ["Blazor", "C#", ".NET", "Local Storage", "Caching"],
    art: "art-4",
    media: ["art-4", "art-5", "art-1"],
    links: [],
  },
  {
    id: "service-opportunities",
    title: "Service Opportunities",
    year: "2024",
    role: "Lead backend · VITAS Healthcare",
    description:
      "Lead developer for the backend of a healthcare service system. Designed RESTful APIs within a Clean Architecture framework and profiled, projected, and tuned SQL and EF Core operations until data-processing efficiency jumped 30% — every change protected by unit tests and Azure DevOps CI/CD.",
    tags: ["C#", "ASP.NET Core", "EF Core", "SQL Server", "Clean Architecture"],
    art: "art-5",
    media: ["art-5", "art-2", "art-4"],
    links: [],
  },
];

export type StackGroup = {
  index: string;
  title: string;
  blurb: string;
  skills: string[];
  art: string;
};

export const stackGroups: StackGroup[] = [
  {
    index: "01",
    title: "Backend",
    blurb: "Where most of my work lives — pure domain logic, replaceable infrastructure.",
    skills: ["C# / .NET 8+", "ASP.NET Core / MVC", "Clean Architecture", "REST APIs"],
    art: "art-1",
  },
  {
    index: "02",
    title: "APIs & Data",
    blurb: "Typed schemas and tuned queries that hold up under healthcare-scale load.",
    skills: ["GraphQL (HotChocolate)", "EF Core / LINQ", "SQL Server", "yahoo-finance2"],
    art: "art-2",
  },
  {
    index: "03",
    title: "Frontend",
    blurb: "Interfaces that ship — from offline-first Blazor to modern React.",
    skills: ["Blazor", "Next.js / React 19", "TypeScript", "Tailwind CSS"],
    art: "art-3",
  },
  {
    index: "04",
    title: "Cloud & Quality",
    blurb: "Every release tested, reviewed, and shipped through a pipeline.",
    skills: ["Azure / AZ-900", "Azure DevOps CI/CD", "xUnit / NUnit", "Prisma"],
    art: "art-4",
  },
];

export const aboutParagraphs: string[] = [
  "I'm a full-stack .NET developer who lives mostly on the backend — designing RESTful and GraphQL APIs inside Clean Architecture, tuning EF Core and SQL until the slow paths stop being slow, and shipping it all behind unit tests and CI/CD.",
  "I started as an intern at Symbiotic Consulting Group, learning C#, .NET and EF Core on real healthcare systems, and was promoted to lead the backend of the Service Opportunities project at VITAS Healthcare. Along the way I've built an offline-first Blazor EMR, a four-layer code-generation platform, and WealthLens — a portfolio analytics product with live market data and AI insights.",
  "I care about systems that stay maintainable as they grow, and about the unglamorous engineering — caching, conflict resolution, query tuning — that quietly makes software feel fast. If you're building something that deserves that kind of care, let's talk.",
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
};

export const experience: ExperienceItem[] = [
  { role: "Software Developer", org: "VITAS Healthcare", period: "2024 — Present" },
  { role: "Backend Intern", org: "Symbiotic Consulting Group", period: "2023 — 2024" },
  { role: "MCA · 8.8 CGPA", org: "Vivekananda Institute of Professional Studies", period: "2022 — 2024" },
  { role: "BCA · 9.0 CGPA", org: "Jagannath International Management School", period: "2019 — 2022" },
  { role: "AZ-900 Certified", org: "Microsoft Azure Fundamentals", period: "Credential" },
];
