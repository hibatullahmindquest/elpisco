import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "group",
      name: "hero",
      label: "Hero",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          admin: {
            description: "Falls back to the default hero image if left blank.",
          },
        },
        {
          name: "imageAlt",
          type: "text",
          admin: {
            description: "Describes the hero image for screen readers. Falls back to a default description if left blank.",
          },
        },
      ],
    },
  ],
};
