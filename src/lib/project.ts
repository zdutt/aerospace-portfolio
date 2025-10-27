export type ProjectLink = {
  label: string;
  href: string;
};

import type { ProjectCategory } from "@/data/categories";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  image?: string;
  link?: string;
  date?: string;
  dateSort?: string;
  category: ProjectCategory;
  subcategory?: string;
  cover?: string;
  gallery?: string[];
  links?: ProjectLink[];
  featured?: boolean;
  visibility?: "public" | "private";
};

const projects: Project[] = [
  {
    slug: "cad-portfolio",
    title: "CAD Portfolio (CSWA, CATIA, Fusion, Onshape, Inventor)",
    date: "Ongoing",
    dateSort: "2025-01-01",
    summary:
      "Five-plus years of CAD across SOLIDWORKS (CSWA), Fusion 360, Onshape, Inventor, and CATIA. Complex part and assembly modeling, drawings, and composition analysis. Highlights include a CSWA Jack and Roller Table and a fully modeled watch in CATIA.",
    tags: ["CAD", "SOLIDWORKS", "CATIA", "Fusion 360", "Onshape", "Inventor"],
    cover: "/projects/cad-portfolio/cover.jpg",
    image: "/projects/cad-portfolio/cover.jpg",
    category: "cad",
    gallery: [
      "/projects/cad-portfolio/01.jpg",
      "/projects/cad-portfolio/02.jpg",
      "/projects/cad-portfolio/03.jpg",
    ],
  },
  {
    slug: "engineering-ev-build",
    title: "Engineering EV Build",
    date: "2021–2022",
    dateSort: "2022-06-01",
    summary:
      "Built a one-seat, street-legal EV from a kit and customized it: soldering, routing conduit, designing cable holders and hubcaps, and learning EV systems hands-on. Great introduction to electrical fundamentals and teamwork.",
    tags: ["EV", "Electrical", "Fabrication", "Team Project"],
    cover: "/projects/engineering-ev-build/cover.jpg",
    image: "/projects/engineering-ev-build/cover.jpg",
    category: "highschool",
    gallery: [
      "/projects/engineering-ev-build/01.jpg",
      "/projects/engineering-ev-build/02.jpg",
    ],
  },
  {
    slug: "glider-project",
    title: "Glider Project (Longest Duration Study)",
    date: "Year 4",
    dateSort: "2024-04-01",
    summary:
      "Designed a glider to maximize flight duration using airfoil simulation and aircraft modeling tools. Iterated airfoil choices and tuned fuselage and wing geometry--this cemented my interest in aerospace design.",
    tags: ["Aerospace", "Aerodynamics", "Simulation"],
    cover: "/projects/glider-project/cover.jpg",
    image: "/projects/glider-project/cover.jpg",
    category: "highschool",
    gallery: ["/projects/glider-project/01.jpg"],
  },
  {
    slug: "matlab-image-compare",
    title: "MATLAB Image-Comparison Tool",
    date: "Dec 2022",
    dateSort: "2022-12-15",
    summary:
      "MATLAB program that asks for a target image and folder, computes color and matrix similarity across the set, returns the closest matches, charts the results, and exports to Excel.",
    tags: ["MATLAB", "Algorithms", "Data Viz"],
    cover: "/projects/matlab-image-compare/cover.jpg",
    image: "/projects/matlab-image-compare/cover.jpg",
    category: "software",
    gallery: ["/projects/matlab-image-compare/01.jpg"],
    links: [{ label: "Demo or Code", href: "#" }],
  },
  {
    slug: "gcode-cnc-tormach",
    title: "G-Code on Tormach CNC",
    date: "Intro Project",
    dateSort: "2023-01-01",
    summary:
      "Learned toolpath planning and G-code by milling a star path and stylized initials on a Tormach. Focus on careful sequencing, repeatability, and reusable code blocks.",
    tags: ["CNC", "G-Code", "Manufacturing"],
    cover: "/projects/gcode-cnc-tormach/cover.jpg",
    image: "/projects/gcode-cnc-tormach/cover.jpg",
    category: "highschool",
    gallery: [
      "/projects/gcode-cnc-tormach/01.jpg",
      "/projects/gcode-cnc-tormach/02.jpg",
    ],
  },
  {
    slug: "sig-tracker",
    title: "SIG Tracker (Photo Only)",
    date: "Aug 2024",
    dateSort: "2024-08-01",
    summary:
      "A quick visual of an internal tracker concept; adding later as a documented write-up. For now this page serves a single photo and short caption.",
    tags: ["Concept", "Ops", "SIG"],
    cover: "/projects/sig-tracker/cover.jpg",
    image: "/projects/sig-tracker/cover.jpg",
    category: "internships",
    subcategory: "SIG",
    gallery: [],
  },
  {
    slug: "grenzer-pallet-exchange",
    title: "Grenzebach Auto-Pallet Exchange Optimization",
    summary:
      "Reduced changeover downtime by automating pallet exchange sequences; tracked BFU IDs and powder flow to lift throughput.",
    tags: ["Automation", "Manufacturing", "Throughput", "SIG"],
    link: "/projects",
    date: "Summer 2024",
    dateSort: "2024-07-01",
    category: "internships",
    subcategory: "SIG",
  },
  {
    slug: "inc625-dmls-cleaning",
    title: "IN625 DMLS Cleaning Workflow",
    summary:
      "Iterated ultrasonic + manual workflows to remove caked powder after wire EDM; improved surface consistency and time.",
    tags: ["DMLS", "Process", "Quality", "SIG"],
    date: "Jul 2024",
    dateSort: "2024-07-31",
    category: "internships",
    subcategory: "SIG",
  },
  {
    slug: "fe-sim-coolant-tank",
    title: "Coolant Tank FEA: Stress & FOS",
    summary:
      "Produced stress, displacement, strain, and FOS plots for EH&S sign-off using curvature-based mesh and orthotropic checks.",
    tags: ["FEA", "SolidWorks", "Reporting", "SIG"],
    image: "/images/coolant-tank.jpg",
    date: "Jun 2025",
    dateSort: "2025-06-25",
    category: "internships",
    subcategory: "SIG",
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    summary:
      "This site: Next.js + TypeScript + Tailwind, static and fast with a clean UI and simple data-driven pages.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    image: "/projects/portfolio-website/cover.jpg",
    category: "software",
    date: "Ongoing",
    dateSort: "2025-10-27",
    featured: true,
  },
  {
    slug: "esp32-weather-station",
    title: "ESP32 Weather Station",
    summary:
      "ESP32-based weather station posting sensor data to a simple web API with a lightweight web dashboard.",
    tags: ["ESP32", "IoT", "Web API"],
    image: "/projects/esp32-weather-station/cover.jpg",
    category: "software",
    date: "",
    dateSort: "2023-06-01",
  },
];

export default projects;
