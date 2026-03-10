export type HomeExperienceImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type HomeExperienceItem = {
  id: string;
  title: string;
  label?: string;
  subtitle: string;
  date: string;
  caption: string;
  image?: HomeExperienceImage;
  href?: string;
};

const homeExperience: HomeExperienceItem[] = [
  {
    id: "malloy-open-house",
    title: "Malloy Open House Event",
    subtitle: "Campus showcase",
    date: "Project presentation",
    caption:
      "Representing engineering work in a public-facing setting and speaking about projects with clarity.",
    image: {
      src: "/home/experience/malloy-open-house.jpg",
      alt: "Malloy open house event photo",
      width: 1320,
      height: 742,
    },
  },
  {
    id: "baja-team",
    title: "Baja Team Photo",
    label: "Baja SAE Team",
    subtitle: "Student design team",
    date: "Hands-on build culture",
    caption:
      "A snapshot of the collaborative side of engineering work: fabrication, iteration, and team problem-solving.",
    image: {
      src: "/home/experience/baja-team.jpg",
      alt: "Baja team group photo",
      width: 1284,
      height: 1288,
    },
  },
  {
    id: "pirouette-professional-team",
    title: "Pirouette Professional Team Photo",
    label: "Pirouette Medical Team",
    subtitle: "Professional environment",
    date: "Manufacturing and test work",
    caption:
      "Working with a multidisciplinary team sharpened my approach to documentation, testing, and execution.",
    image: {
      src: "/home/experience/pirouette-professional-team.jpg",
      alt: "Pirouette Medical professional team photo",
      width: 8256,
      height: 5504,
    },
  },
  {
    id: "pirouette-team-lunch",
    title: "Pirouette Team Lunch",
    subtitle: "Team culture",
    date: "Pirouette Medical",
    caption:
      "A lighter moment that still reflects the importance of trust, communication, and a strong working team.",
    image: {
      src: "/home/experience/pirouette-team-lunch.jpg",
      alt: "Pirouette Medical team lunch photo",
      width: 1600,
      height: 1200,
    },
  },
];

export default homeExperience;
