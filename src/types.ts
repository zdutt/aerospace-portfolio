export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  cover: string; // path under /public, e.g. /projects/<slug>/cover.jpg
  gallery: string[]; // additional images under /public
  links?: ProjectLink[];
};

