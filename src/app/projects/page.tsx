import type { Metadata } from "next";
import ProjectsClient from "@/components/ProjectsClient";

export const metadata: Metadata = {
  title: "Projects | Zachary Dutton",
  description:
    "Project case studies from Zachary Dutton covering CAD, FEA, manufacturing, electrical builds, and software tools.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
