import { getPayloadClient } from "@/lib/payload";

export type NavItem = { label: string; href: string };

const FALLBACK_NAV: NavItem[] = [
  { label: "PROJECTS", href: "/projects" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "PROCESS", href: "/process" },
  { label: "WHY ELPIS", href: "/why-elpis" },
  { label: "FAQ", href: "/faq" },
  { label: "CONTACT", href: "/contact" },
];

export async function getNavigation(): Promise<NavItem[]> {
  try {
    const payload = await getPayloadClient();
    const nav = await payload.findGlobal({ slug: "navigation" });
    const items = (nav.items ?? []).map((item) => ({ label: item.label, href: item.href }));
    return items.length ? items : FALLBACK_NAV;
  } catch {
    return FALLBACK_NAV;
  }
}
