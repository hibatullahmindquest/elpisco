import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { getNavigation } from "@/lib/navigation";

export const dynamic = "force-dynamic";

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
  const navItems = await getNavigation();

  return (
    <html lang="en" className={`${instrumentSerif.variable} ${manrope.variable}`}>
      <body>
        <SmoothScroll>
          <CustomCursor />
          <Header navItems={navItems} />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
