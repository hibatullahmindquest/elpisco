import type { Metadata } from "next";
import { Instrument_Serif, Manrope, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { getNavigation } from "@/lib/navigation";
import { getSiteSettings } from "@/lib/siteSettings";
import { getRootMetadata, getOrganizationJsonLd } from "@/lib/seo";
import { getTrackingSettings } from "@/lib/tracking";
import { TrackingHeadCode, TrackingBodyStart, TrackingBodyEnd } from "@/components/analytics/Tracking";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

// Curated font pairs only — next/font requires font choices to be static at
// build time, so this can't be a free-text CMS field. Site Settings picks
// between these two preloaded pairs via a CSS variable swap (see below).
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return getRootMetadata();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [navItems, settings, organizationJsonLd, tracking] = await Promise.all([
    getNavigation(),
    getSiteSettings(),
    getOrganizationJsonLd(),
    getTrackingSettings(),
  ]);

  const fontOverride =
    settings.fontPreset === "playfair-inter"
      ? ({
          "--font-display": "var(--font-display-playfair)",
          "--font-sans": "var(--font-sans-inter)",
        } as React.CSSProperties)
      : undefined;

  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${manrope.variable} ${playfairDisplay.variable} ${inter.variable}`}
      style={fontOverride}
    >
      <head>
        <TrackingHeadCode settings={tracking} />
      </head>
      <body>
        <TrackingBodyStart settings={tracking} />
        <JsonLd data={organizationJsonLd} />
        <SmoothScroll>
          <CustomCursor />
          <Header
            navItems={navItems}
            siteName={settings.siteName}
            logoUrl={settings.logoUrl}
            contact={{
              instagramUrl: settings.instagramUrl,
              whatsappUrl: settings.whatsappUrl,
              city: settings.city,
              country: settings.country,
            }}
          />
          <main>{children}</main>
          <Footer settings={settings} />
        </SmoothScroll>
        <TrackingBodyEnd settings={tracking} />
      </body>
    </html>
  );
}
