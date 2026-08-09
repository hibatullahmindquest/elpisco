import type { Metadata } from "next";
import { getPayloadClient } from "@/lib/payload";
import { getSiteSettings } from "@/lib/siteSettings";
import type { Media, Seo as SeoGlobal } from "@/payload-types";

const SITE_URL = "https://elpisco.vercel.app";

function mediaUrl(value: number | Media | null | undefined): string | null {
  if (value && typeof value === "object") return value.url ?? null;
  return null;
}

async function getSeoGlobal(): Promise<SeoGlobal | null> {
  try {
    const payload = await getPayloadClient();
    return await payload.findGlobal({ slug: "seo" });
  } catch {
    return null;
  }
}

function robotsFromGlobal(seo: SeoGlobal | null): Metadata["robots"] {
  if (seo?.robotsIndex === false) return { index: false, follow: false };
  return undefined;
}

export async function getPageMetadata(
  path: string,
  fallback: { title: string; description: string }
): Promise<Metadata> {
  const seo = await getSeoGlobal();

  let pageDoc: { title: string; seo?: { metaTitle?: string | null; metaDescription?: string | null; ogImage?: number | Media | null } } | undefined;
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "pages",
      where: { path: { equals: path } },
      limit: 1,
    });
    pageDoc = result.docs[0];
  } catch {
    pageDoc = undefined;
  }

  const title = pageDoc?.seo?.metaTitle || pageDoc?.title || fallback.title;
  const description =
    pageDoc?.seo?.metaDescription || fallback.description || seo?.defaultMetaDescription || undefined;
  const ogImageUrl = mediaUrl(pageDoc?.seo?.ogImage) || mediaUrl(seo?.defaultOgImage);

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path === "/" ? "" : path}` },
    openGraph: {
      title,
      description,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: seo?.twitterHandle || undefined,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    robots: robotsFromGlobal(seo),
  };
}

export async function getRootMetadata(): Promise<Metadata> {
  const seo = await getSeoGlobal();
  const title = seo?.defaultMetaTitle || "Elpis.co | Interior Design & Renovation";
  const description =
    seo?.defaultMetaDescription ||
    "Elpis.co is an interior design, renovation and design & build studio based in Shah Alam, Malaysia. Spaces shaped around the way you live.";
  const ogImageUrl = mediaUrl(seo?.defaultOgImage);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s | Elpis.co" },
    description,
    ...(seo?.googleSiteVerification
      ? { verification: { google: seo.googleSiteVerification } }
      : {}),
    openGraph: {
      title,
      description,
      siteName: "Elpis.co",
      type: "website",
      locale: "en_MY",
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: seo?.twitterHandle || undefined,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    robots: robotsFromGlobal(seo),
  };
}

export async function getProjectMetadata(
  slug: string,
  fallback: { title: string; description: string; imageUrl: string }
): Promise<Metadata> {
  const seo = await getSeoGlobal();

  let projectDoc:
    | { title: string; seo?: { metaTitle?: string | null; metaDescription?: string | null; ogImage?: number | Media | null } }
    | undefined;
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    projectDoc = result.docs[0];
  } catch {
    projectDoc = undefined;
  }

  const title = projectDoc?.seo?.metaTitle || projectDoc?.title || fallback.title;
  const description = projectDoc?.seo?.metaDescription || fallback.description;
  const ogImageUrl = mediaUrl(projectDoc?.seo?.ogImage) || fallback.imageUrl || mediaUrl(seo?.defaultOgImage);

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/projects/${slug}` },
    openGraph: {
      title,
      description,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: seo?.twitterHandle || undefined,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    robots: robotsFromGlobal(seo),
  };
}

export async function getProjectJsonLd(project: {
  slug: string;
  title: string;
  description: string;
  location: string;
  hero: string;
}) {
  const settings = await getSiteSettings();

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/projects/${project.slug}`,
    ...(project.hero ? { image: project.hero } : {}),
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    creator: {
      "@type": "Organization",
      name: settings.siteName,
      url: SITE_URL,
    },
  };
}

export async function getOrganizationJsonLd() {
  const [seo, settings] = await Promise.all([getSeoGlobal(), getSiteSettings()]);

  const name = seo?.organization?.legalName || settings.siteName;
  const description = seo?.organization?.description || settings.tagline;
  const sameAs = (seo?.organization?.sameAs ?? [])
    .map((s) => s.url)
    .filter((url): url is string => Boolean(url) && !url.startsWith("["));

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name,
    description,
    url: SITE_URL,
    ...(settings.logoUrl ? { logo: settings.logoUrl, image: settings.logoUrl } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.city,
      addressCountry: settings.country,
    },
    ...(seo?.organization?.priceRange ? { priceRange: seo.organization.priceRange } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
