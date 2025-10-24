export type Project = {
  slug: string;
  title: string;
  summary: string;
  image?: string;   // optional for now
  tags: string[];
  link?: string;
};

const projects: Project[] = [
  {
    slug: "grenzer-pallet-exchange",
    title: "Grenzebach Auto-Pallet Exchange Optimization",
    summary:
      "Reduced changeover downtime by automating pallet exchange sequences; tracked BFU IDs and powder flow to lift throughput.",
    tags: ["Manufacturing", "Automation", "Throughput"],
    link: "/projects",
  },
  {
    slug: "inc625-dmls-cleaning",
    title: "IN625 DMLS Cleaning Workflow",
    summary:
      "Iterated ultrasonic + manual workflows to remove caked powder after wire EDM; improved surface consistency and time.",
    tags: ["DMLS", "Process", "Quality"],
  },
  {
    slug: "fe-sim-coolant-tank",
    title: "Coolant Tank FEA: Stress & FOS",
    summary:
      "Produced stress, displacement, strain, and FOS plots for EH&S sign-off using curvature-based mesh and orthotropic checks.",
    tags: ["FEA", "SolidWorks", "Reporting"],
  },
];

export default projects;

