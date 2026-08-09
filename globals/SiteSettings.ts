import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      defaultValue: "ELPIS.CO",
      admin: {
        description: "Shown in the header wordmark and footer, unless a logo image is set below.",
      },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Optional. If set, replaces the text wordmark in the header.",
      },
    },
    {
      name: "tagline",
      type: "text",
      defaultValue: "Interior design, renovation and design & build, based in Shah Alam, Malaysia.",
    },
    {
      name: "fontPreset",
      type: "select",
      defaultValue: "instrument-manrope",
      options: [
        { label: "Instrument Serif + Manrope (default)", value: "instrument-manrope" },
        { label: "Playfair Display + Inter", value: "playfair-inter" },
        { label: "Playfair Display + Montserrat", value: "playfair-montserrat" },
      ],
      admin: {
        description:
          "A curated set of font pairs. Self-hosted fonts must be built into the site ahead of time, so this isn't a free-text field.",
      },
    },
    {
      name: "colorPreset",
      type: "select",
      defaultValue: "elpis-editorial",
      options: [
        { label: "Elpis Editorial (default)", value: "elpis-editorial" },
        { label: "Client Brand Palette (Navy / Ivory / Charcoal / Gold)", value: "client-palette" },
      ],
      admin: {
        description:
          "A curated set of color palettes. Elpis Editorial is the site's original dark-navy tone; Client Brand Palette applies the exact brand hex codes (#183A6B navy, #F7F3EA ivory, #1C1C1C charcoal, #C8A96A gold) site-wide.",
      },
    },
    {
      name: "headerBehavior",
      type: "select",
      defaultValue: "frosted",
      options: [
        { label: "Frosted glass on scroll (default)", value: "frosted" },
        { label: "Hide on scroll down, show on scroll up", value: "hide-on-scroll" },
      ],
      admin: {
        description:
          "How the fixed header avoids clashing with page content as you scroll. Frosted glass gives it a blurred background once you scroll past the hero. Hide-on-scroll tucks it away while scrolling down and brings it back when you scroll up.",
      },
    },
    {
      type: "group",
      name: "contact",
      fields: [
        {
          name: "email",
          type: "text",
        },
        {
          name: "whatsappUrl",
          type: "text",
        },
        {
          name: "instagramUrl",
          type: "text",
        },
        {
          name: "city",
          type: "text",
          defaultValue: "Shah Alam",
        },
        {
          name: "country",
          type: "text",
          defaultValue: "Malaysia",
        },
      ],
    },
  ],
};
