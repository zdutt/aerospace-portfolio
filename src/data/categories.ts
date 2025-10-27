export type ProjectCategory =
  | "cad"
  | "manufacturing"
  | "aerospace"
  | "software"
  | "concept";

export const CATEGORIES: Record<ProjectCategory, { label: string; slug: string }> = {
  cad: { label: "CAD", slug: "cad" },
  manufacturing: { label: "Manufacturing", slug: "manufacturing" },
  aerospace: { label: "Aerospace", slug: "aerospace" },
  software: { label: "Software/Analytics", slug: "software" },
  concept: { label: "Concepts", slug: "concept" },
};

export type { ProjectCategory as default };

