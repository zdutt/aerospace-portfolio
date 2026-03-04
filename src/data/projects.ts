import type { ProjectCategory } from "@/data/categories";

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  dateSort: string;
  category: ProjectCategory;
  tags: string[];
  technologies: string[];
  cover: ProjectImage;
  gallery?: ProjectImage[];
  sections?: ProjectSection[];
  links?: ProjectLink[];
  featured?: boolean;
  visibility?: "public" | "private";
  link?: string;
};

const projects: Project[] = [
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    date: "2025",
    dateSort: "2025-10-27",
    summary:
      "This site: Next.js 16 + TypeScript + Tailwind CSS, statically exported and optimized for GitHub Pages.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub Pages"],
    category: "software-data",
    featured: true,
    cover: {
      src: "/projects/portfolio-website/cover.jpg",
      alt: "Portfolio website cover with UI layout panels",
      width: 1200,
      height: 675,
    },
    gallery: [
      {
        src: "/projects/portfolio-website/01.jpg",
        alt: "Portfolio website layout and component styling",
        width: 1200,
        height: 1200,
      },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "I built this portfolio as a static Next.js site that is easy to maintain, deploy, and update as new work is ready to share.",
        ],
      },
      {
        heading: "What I did",
        bullets: [
          "Structured project content in data files so pages render consistently.",
          "Built reusable UI sections for project cards, galleries, and navigation.",
          "Configured static export for GitHub Pages with basePath and trailing slash support.",
          "Focused on accessibility, responsive layout, and lightweight interactions.",
        ],
      },
      {
        heading: "Tools",
        bullets: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub Pages"],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The result is a clean portfolio I can update quickly while keeping performance and accessibility in view.",
          "It also gives me a practical place to document projects with clear context, methods, and lessons learned.",
        ],
      },
      {
        heading: "What I'd improve next",
        bullets: [
          "Add automated checks for link integrity and image metadata.",
          "Add deeper case-study filtering by skill area and toolchain.",
          "Continue tightening motion behavior for reduced-power contexts.",
        ],
      },
    ],
  },
  {
    slug: "fe-sim-coolant-tank",
    title: "Coolant Tank FEA: Stress and FOS",
    date: "Jun 2025",
    dateSort: "2025-06-15",
    summary:
      "Produced stress, displacement, strain, and factor-of-safety plots using SolidWorks Simulation for EH&S sign-off.",
    tags: ["FEA", "SolidWorks", "Reporting"],
    technologies: ["SolidWorks Simulation", "FEA", "Reporting"],
    category: "fea-analysis",
    featured: true,
    cover: {
      src: "/projects/fe-sim-coolant-tank/cover.jpg",
      alt: "FEA result plot of a coolant tank frame",
      width: 1200,
      height: 675,
    },
    gallery: [
      {
        src: "/projects/fe-sim-coolant-tank/01.jpg",
        alt: "Coolant tank simulation stress contour",
        width: 1200,
        height: 1200,
      },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "This analysis focused on evaluating a coolant tank frame with SolidWorks Simulation and producing a report package suitable for EH&S review.",
        ],
      },
      {
        heading: "What I did",
        bullets: [
          "Built and checked load cases and constraints for the frame geometry.",
          "Ran stress, displacement, and strain studies with consistent assumptions.",
          "Generated factor-of-safety views and organized findings for review.",
          "Documented setup and output so results could be reviewed quickly.",
        ],
      },
      {
        heading: "Tools",
        bullets: ["SolidWorks Simulation", "FEA", "Engineering Reporting"],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The project produced a clear set of simulation outputs and supporting documentation for sign-off discussions.",
          "Some details are omitted for confidentiality, but I can discuss the method, assumptions, and interpretation process.",
        ],
      },
      {
        heading: "What I'd improve next",
        bullets: [
          "Expand sensitivity checks on boundary conditions and contact assumptions.",
          "Add a standardized peer-review checklist before report release.",
          "Build a reusable reporting template for similar safety reviews.",
        ],
      },
    ],
  },
  {
    slug: "cad-portfolio",
    title: "CAD Portfolio (CSWA, CATIA, Fusion, Onshape, Inventor)",
    date: "2019 - Present",
    dateSort: "2025-01-01",
    summary:
      "Five-plus years of CAD across SOLIDWORKS (CSWA), CATIA, Fusion 360, Onshape, and Inventor. Emphasis on complex parts, assemblies, drawings, and manufacturability checks.",
    tags: ["CAD", "SOLIDWORKS", "CATIA", "Fusion 360", "Onshape", "Inventor"],
    technologies: [
      "SOLIDWORKS (CSWA)",
      "CATIA",
      "Fusion 360",
      "Onshape",
      "Inventor",
    ],
    category: "cad-design",
    featured: true,
    cover: {
      src: "/projects/cad-portfolio/cover.jpg",
      alt: "CAD portfolio cover with blueprint grid and modeled parts",
      width: 1200,
      height: 675,
    },
    gallery: [
      {
        src: "/projects/cad-portfolio/01.jpg",
        alt: "CAD assembly model detail",
        width: 1200,
        height: 1200,
      },
      {
        src: "/projects/cad-portfolio/02.jpg",
        alt: "CAD part modeling and constraints detail",
        width: 1200,
        height: 1200,
      },
      {
        src: "/projects/cad-portfolio/03.jpg",
        alt: "CAD drawing sheet with annotations",
        width: 1200,
        height: 1200,
      },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "This portfolio captures multi-CAD work across parts, assemblies, and drawing packages, with a focus on designs that are practical to build and review.",
        ],
      },
      {
        heading: "What I did",
        bullets: [
          "Modeled parts and assemblies across SOLIDWORKS, CATIA, Fusion 360, Onshape, and Inventor.",
          "Created drawing views and documentation to communicate design intent.",
          "Checked manufacturability and fit-up early to reduce downstream rework.",
          "Used iterative modeling to refine geometry from feedback and test-fit learning.",
        ],
      },
      {
        heading: "Tools",
        bullets: [
          "SOLIDWORKS (CSWA)",
          "CATIA",
          "Fusion 360",
          "Onshape",
          "Inventor",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The portfolio demonstrates steady CAD growth over several years and comfort moving between platforms based on project needs.",
          "It reinforced the importance of combining clean models with clear documentation and practical build thinking.",
        ],
      },
      {
        heading: "What I'd improve next",
        bullets: [
          "Add more formal tolerance stack examples in shared drawing sets.",
          "Standardize naming and release conventions across software platforms.",
          "Expand design review checklists for assembly-level failure modes.",
        ],
      },
    ],
  },
  {
    slug: "benchtop-injection-molder",
    title: "Benchtop Injection Molder Assembly & Testing",
    date: "Summer 2023",
    dateSort: "2023-07-15",
    summary:
      "Assembled and tested the APSX-PIM benchtop injection machine at Pirouette Medical to evaluate short-run molding with 3D-printed molds.",
    tags: ["Injection Molding", "APSX-PIM", "Testing", "3D-Printed Molds"],
    technologies: [
      "Injection Molding",
      "APSX-PIM",
      "Testing",
      "3D-Printed Molds",
    ],
    category: "manufacturing-automation",
    cover: {
      src: "/projects/benchtop-injection-molder/cover.jpg",
      alt: "APSX-PIM benchtop injection molder assembled on a workbench at Pirouette Medical",
      width: 4032,
      height: 3024,
    },
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "I assembled and tested an APSX-PIM benchtop injection machine to evaluate short-run molding feasibility using 3D-printed molds.",
        ],
      },
      {
        heading: "What I did",
        bullets: [
          "Completed machine assembly and setup checks before test runs.",
          "Ran test cycles and documented process observations and outcomes.",
          "Evaluated how 3D-printed molds performed in short-run use.",
          "Shared findings in a format useful for internal engineering review.",
        ],
      },
      {
        heading: "Tools",
        bullets: [
          "APSX-PIM",
          "Benchtop Injection Molding",
          "3D-Printed Molds",
          "Test Documentation",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The work provided a practical baseline for short-run molding trials and highlighted setup details that matter most for repeatability.",
          "Some details are omitted for confidentiality, but I can discuss the test approach and general conclusions.",
        ],
      },
      {
        heading: "What I'd improve next",
        bullets: [
          "Formalize a more structured test matrix before trial execution.",
          "Capture additional repeatability checks across multiple mold iterations.",
          "Add clearer pass/fail criteria for early screening runs.",
        ],
      },
    ],
  },
  {
    slug: "car-audio-amplifier-upgrade",
    title: "Car Audio Amplifier Upgrade",
    date: "Jun 2023 - Jul 2023",
    dateSort: "2023-07-01",
    summary:
      "Personal project rewiring a car audio system with separate amplifiers for speakers and dual 12-inch subwoofers, building confidence in automotive electrical work.",
    tags: ["Car Audio", "Amplifiers", "Wiring", "Subwoofers"],
    technologies: ["Car Audio", "Amplifiers", "Wiring", "Subwoofers"],
    category: "electrical-systems",
    cover: {
      src: "/projects/car-audio-amplifier-upgrade/cover.jpg",
      alt: "Car audio amplifier board with power, speaker, and signal wiring laid out for installation",
      width: 4032,
      height: 3024,
    },
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "This personal build upgraded a car audio system with separate amplification for speakers and dual 12-inch subwoofers.",
        ],
      },
      {
        heading: "What I did",
        bullets: [
          "Planned and rewired power, ground, and signal routing for a cleaner layout.",
          "Installed and integrated separate amplifiers for speaker and sub channels.",
          "Verified connections and corrected issues through iterative troubleshooting.",
          "Documented lessons learned for safer future electrical installs.",
        ],
      },
      {
        heading: "Tools",
        bullets: [
          "Automotive Wiring",
          "Amplifier Installation",
          "Power Distribution",
          "Signal Routing",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The project increased my confidence with 12V wiring, system integration, and methodical troubleshooting in a constrained installation space.",
          "It reinforced the value of planning wire paths and testing incrementally before finalizing the system.",
        ],
      },
      {
        heading: "What I'd improve next",
        bullets: [
          "Add a cleaner service loop strategy for easier future maintenance.",
          "Create a pre-power checklist to catch wiring issues even earlier.",
          "Standardize labeling on all primary signal and power runs.",
        ],
      },
    ],
  },
  {
    slug: "matlab-image-compare",
    title: "MATLAB Image-Comparison Tool",
    date: "Dec 2022",
    dateSort: "2022-12-15",
    summary:
      "MATLAB program that compares a target image against a folder, ranks similarity scores, visualizes results, and exports to Excel.",
    tags: ["MATLAB", "Algorithms", "Data Viz"],
    technologies: ["MATLAB", "Algorithms", "Data Visualization", "Excel Export"],
    category: "software-data",
    cover: {
      src: "/projects/matlab-image-compare/cover.jpg",
      alt: "Image analysis cover with matrix and pixel grid motif",
      width: 1200,
      height: 675,
    },
    gallery: [
      {
        src: "/projects/matlab-image-compare/01.jpg",
        alt: "Image comparison score ranking output",
        width: 1200,
        height: 1200,
      },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "I built a MATLAB tool that compares a target image against a folder of candidates, ranks similarity, visualizes results, and exports outputs for review.",
        ],
      },
      {
        heading: "What I did",
        bullets: [
          "Implemented image-comparison logic to score candidate matches.",
          "Ranked results and surfaced top matches for quick review.",
          "Added visual output to make differences easier to interpret.",
          "Exported scored output to Excel for reporting and sharing.",
        ],
      },
      {
        heading: "Tools",
        bullets: ["MATLAB", "Image Analysis", "Algorithms", "Data Visualization"],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The script turned a manual comparison task into a repeatable workflow with ranked and visualized results.",
          "It strengthened my ability to bridge algorithmic work with practical reporting output.",
        ],
      },
      {
        heading: "What I'd improve next",
        bullets: [
          "Add configurable weighting for different similarity metrics.",
          "Add a simple UI wrapper for non-technical users.",
          "Benchmark runtime performance across larger image sets.",
        ],
      },
    ],
  },
  {
    slug: "engineering-ev-build",
    title: "Engineering EV Build",
    date: "2021 - 2022",
    dateSort: "2022-06-01",
    summary:
      "Built a one-seat, street-legal EV from a kit with hands-on electrical and mechanical work. Focused on wiring, component integration, and team-based troubleshooting.",
    tags: ["EV", "Electrical", "Fabrication", "Team Project"],
    technologies: ["EV", "Electrical", "Fabrication", "Team Project"],
    category: "electrical-systems",
    featured: true,
    cover: {
      src: "/projects/engineering-ev-build/switchlabs-ev.jpg",
      alt: "SwitchLab EV chassis during assembly in the workshop",
      width: 4032,
      height: 3024,
    },
    gallery: [
      {
        src: "/projects/engineering-ev-build/01.jpg",
        alt: "EV build wiring and cable routing detail",
        width: 1200,
        height: 1200,
      },
      {
        src: "/projects/engineering-ev-build/02.jpg",
        alt: "EV subsystem assembly detail",
        width: 1200,
        height: 1200,
      },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "This team project involved building a one-seat, street-legal EV from a kit, with shared electrical and mechanical integration work.",
        ],
      },
      {
        heading: "What I did",
        bullets: [
          "Contributed to harness routing, soldering, and wiring integration tasks.",
          "Helped fabricate and fit mechanical components during assembly.",
          "Worked through team troubleshooting when subsystem issues appeared.",
          "Supported iterative build adjustments during integration and testing.",
        ],
      },
      {
        heading: "Tools",
        bullets: [
          "Electrical Wiring",
          "Mechanical Assembly",
          "Fabrication",
          "Team Troubleshooting",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The build gave me practical experience combining electrical and mechanical work under real assembly constraints.",
          "It also improved my communication and problem-solving habits in a collaborative project setting.",
        ],
      },
      {
        heading: "What I'd improve next",
        bullets: [
          "Define clearer subsystem interfaces before full integration.",
          "Capture more formal test logs at each major build milestone.",
          "Plan wiring serviceability earlier in the mechanical layout.",
        ],
      },
    ],
  },
];

export default projects;
