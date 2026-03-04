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

const homeExperience: HomeExperienceItem[] = [];

export default homeExperience;
