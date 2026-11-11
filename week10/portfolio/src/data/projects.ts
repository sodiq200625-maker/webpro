export type ProjectId =
  | "api-atlas"
  | "book-search"
  | "api-lab"
  | "observatory";

export type Project = {
  id: ProjectId;
  number: string;
  name: string;
  kind: string;
  description: string;
  details: string;
  technologies: string[];
  skills: string[];
  liveUrl?: string;
  sourceUrl?: string;
  status: "live" | "coursework" | "in-progress";
  visual: "atlas" | "books" | "api" | "stars";
};

export const projects: Project[] = [
  {
    id: "api-atlas",
    number: "01",
    name: "API Atlas",
    kind: "Team project · travel toolkit",
    description:
      "A browser-based travel hub connecting trip planning, weather, currency, and media tools.",
    details:
      "Built as a team project with four modular JavaScript applications. The trip planner combines location and nearby-place data, while the other tools help travelers explore forecasts, currencies, books, and films.",
    technologies: ["HTML", "CSS", "JavaScript", "ES modules", "Public APIs"],
    skills: ["html-css", "javascript", "rest-apis", "es-modules", "responsive-ui"],
    liveUrl: "https://sodiq200625-maker.github.io/webpro/project/mebel.html",
    sourceUrl:
      "https://github.com/sodiq200625-maker/webpro/tree/main/project",
    status: "live",
    visual: "atlas",
  },
  {
    id: "book-search",
    number: "02",
    name: "Open Library",
    kind: "Independent project · book search",
    description:
      "Search a live book catalog by title, author, or keyword and browse cover-aware results.",
    details:
      "A static search app that requests results from the Open Library API and presents each book with an author, publication year, and a helpful fallback when a cover is unavailable.",
    technologies: ["HTML", "CSS", "JavaScript", "Open Library API"],
    skills: [
      "html-css",
      "javascript",
      "rest-apis",
      "accessible-ui",
      "github-pages",
      "responsive-ui",
    ],
    liveUrl:
      "https://sodiq200625-maker.github.io/webpro/week7/book-search.html",
    sourceUrl:
      "https://github.com/sodiq200625-maker/webpro/tree/main/week7",
    status: "live",
    visual: "books",
  },
  {
    id: "api-lab",
    number: "03",
    name: "API Field Notes",
    kind: "Coursework · six API exercises",
    description:
      "A collection of small browser experiments for learning to request and present public API data.",
    details:
      "Six focused exercises explore jokes, placeholder posts, weather, random users, Pokémon, and country information. Each one is a separate practice space for working with browser fetch and API responses.",
    technologies: ["HTML", "CSS", "JavaScript", "Fetch API"],
    skills: [
      "html-css",
      "javascript",
      "rest-apis",
      "responsive-ui",
      "github-pages",
    ],
    liveUrl: "https://sodiq200625-maker.github.io/webpro/week6/",
    sourceUrl:
      "https://github.com/sodiq200625-maker/webpro/tree/main/week6",
    status: "coursework",
    visual: "api",
  },
  {
    id: "observatory",
    number: "04",
    name: "Midnight Observatory",
    kind: "Personal portfolio · published",
    description:
      "An interactive portfolio connecting skills, projects, and the work behind them.",
    details:
      "A Next.js portfolio built with TypeScript and Tailwind CSS. Its constellation view connects skills to projects, and its daybreak theme, keyboard-friendly controls, and illustrated portrait give the site its own visual identity.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    skills: [
      "nextjs",
      "typescript",
      "tailwind",
      "accessible-ui",
      "responsive-ui",
    ],
    liveUrl: "https://sodiq200625-maker.github.io/webpro/week10/portfolio/",
    sourceUrl:
      "https://github.com/sodiq200625-maker/webpro/tree/main/week10/portfolio",
    status: "live",
    visual: "stars",
  },
];
