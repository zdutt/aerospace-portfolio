export type ProjectCategory = "software" | "internships" | "cad" | "highschool";

export const CATEGORIES: Record<ProjectCategory, { label: string; slug: string }> = {
  software: { label: "Software", slug: "software" },
  internships: { label: "Internships", slug: "internships" },
  cad: { label: "CAD", slug: "cad" },
  // Use a space instead of a hyphen to avoid awkward wrapping
  highschool: { label: "High School Engineering", slug: "highschool" },
};

export type { ProjectCategory as default };
