export type Project = {
  slug: string;
  title: string;
  location: string;
  year: string;
  type: string;
  scope: string;
  services: string[];
  cover: string;
  coverAspect: "landscape" | "portrait" | "wide";
  hero: string;
  images: string[];
  description: string;
};
