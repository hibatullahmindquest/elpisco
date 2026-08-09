import { getSiteSettings } from "@/lib/siteSettings";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

const SITE_URL = "https://elpisco.vercel.app";

// llms.txt (llmstxt.org) — a plain-text summary for AI answer engines and
// LLM crawlers (ChatGPT, Perplexity, Gemini, etc.) that can't run GSAP/JS
// the way a browser does. Kept as a plain Route Handler, not a Next.js
// metadata-route convention file (robots.ts hit a Turbopack bug earlier).
export async function GET() {
  const [settings, projects] = await Promise.all([getSiteSettings(), getProjects()]);

  const lines = [
    `# ${settings.siteName}`,
    "",
    `> ${settings.tagline}`,
    "",
    `Based in ${settings.city}, ${settings.country}.`,
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}/)`,
    `- [Selected Work](${SITE_URL}/projects)`,
    `- [About](${SITE_URL}/about)`,
    `- [Services](${SITE_URL}/services)`,
    `- [Process](${SITE_URL}/process)`,
    `- [Why Elpis](${SITE_URL}/why-elpis)`,
    `- [FAQ](${SITE_URL}/faq)`,
    `- [Contact](${SITE_URL}/contact)`,
    `- [Start a Project](${SITE_URL}/start-a-project)`,
    `- [Careers](${SITE_URL}/careers)`,
    "",
    "## Selected Work",
    "",
    ...projects.map(
      (p) => `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.description}`
    ),
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
