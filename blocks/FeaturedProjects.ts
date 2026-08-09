import type { Block } from "payload";

export const FeaturedProjectsBlock: Block = {
  slug: "featuredProjects",
  labels: { singular: "Featured Projects", plural: "Featured Projects" },
  fields: [
    {
      name: "count",
      type: "number",
      defaultValue: 2,
      admin: { description: "How many of the most recent projects to feature." },
    },
  ],
};
