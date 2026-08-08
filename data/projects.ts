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

// Placeholder project data for demonstration. Replace with real client
// projects (and swap /public/images/projects/* for final photography) once
// available — see README.md.
export const projects: Project[] = [
  {
    slug: "serene-residence",
    title: "Serene Residence",
    location: "Shah Alam",
    year: "2026",
    type: "Residential",
    scope: "Full Interior Renovation",
    services: ["Interior Design", "Renovation", "Space Planning"],
    cover: "/images/projects/serene-residence/cover.jpg",
    coverAspect: "landscape",
    hero: "/images/projects/serene-residence/hero.jpg",
    images: ["/images/projects/serene-residence/hero.jpg"],
    description:
      "A calm contemporary residence shaped around light, proportion and everyday living.",
  },
  {
    slug: "modern-sanctuary",
    title: "Modern Sanctuary",
    location: "Petaling Jaya",
    year: "2026",
    type: "Residential",
    scope: "Design & Build",
    services: ["Interior Design", "Design & Build", "Custom Joinery"],
    cover: "/images/projects/modern-sanctuary/cover.jpg",
    coverAspect: "portrait",
    hero: "/images/projects/modern-sanctuary/hero.jpg",
    images: ["/images/projects/modern-sanctuary/hero.jpg"],
    description:
      "A warm, material-led family home built around slower mornings and open living.",
  },
  {
    slug: "coastal-retreat",
    title: "Coastal Retreat",
    location: "Port Dickson",
    year: "2025",
    type: "Residential",
    scope: "Full Interior Renovation",
    services: ["Interior Design", "Renovation", "Project Management"],
    cover: "/images/projects/coastal-retreat/cover.jpg",
    coverAspect: "wide",
    hero: "/images/projects/coastal-retreat/hero.jpg",
    images: ["/images/projects/coastal-retreat/hero.jpg"],
    description:
      "A quiet coastal home reworked to frame the view and soften the light.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
