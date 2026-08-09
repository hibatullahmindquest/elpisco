import type { Metadata } from "next";
import { Instrument_Serif, Manrope, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { getNavigation } from "@/lib/navigation";
import { getSiteSettings } from "@/lib/siteSettings";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://elpisco.vercel.app"),
  title: {
    default: "Elpis.co | Interior Design & Renovation",
    template: "%s | Elpis.co",
  },
  description:
    "Elpis.co is an interior design, renovation and design & build studio based in Shah Alam, Malaysia. Spaces shaped around the way you live.",
  openGraph: {
    title: "Elpis.co | Interior Design & Renovation",
    description:
      "Interior design, renovation and design & build. Spaces shaped around the way you live.",
    siteName: "Elpis.co",
    type: "website",
    locale: "en_MY",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elpis.co | Interior Design & Renovation",
    description:
      "Interior design, renovation and design & build. Spaces shaped around the way you live.",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [navItems, settings] = await Promise.all([getNavigation(), getSiteSettings()]);

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
      <body>
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
      </body>
    </html>
  );
}
