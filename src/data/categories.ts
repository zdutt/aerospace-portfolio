export type ProjectCategory =
  | "software-data"
  | "fea-analysis"
  | "cad-design"
  | "manufacturing-automation"
  | "electrical-systems";

export const CATEGORIES: Record<
  ProjectCategory,
  { label: string; slug: ProjectCategory }
> = {
  "software-data": { label: "Software & Data Tools", slug: "software-data" },
  "fea-analysis": { label: "FEA Analysis", slug: "fea-analysis" },
  "cad-design": { label: "CAD & Design", slug: "cad-design" },
  "manufacturing-automation": {
    label: "Manufacturing & Automation",
    slug: "manufacturing-automation",
  },
  "electrical-systems": {
    label: "Electrical & Systems",
    slug: "electrical-systems",
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);

export type { ProjectCategory as default };
