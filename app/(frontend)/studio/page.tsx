import type { Metadata } from "next";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

export const metadata: Metadata = {
  title: "Studio",
  description: "Elpis.co is an interior design, renovation and design & build studio based in Shah Alam, Malaysia.",
};

export default function StudioPage() {
  return (
    <>
      <section
        data-nav-theme="light"
        style={{
          background: "var(--warm-white)",
          paddingTop: "calc(var(--header-h) + clamp(48px, 10vw, 96px))",
          paddingBottom: "clamp(48px, 8vw, 88px)",
        }}
      >
        <div className="container grid-12">
          <div className="col-line-label">
            <SectionLabel>Studio</SectionLabel>
          </div>
          <div className="col-line-4-end">
            <RevealText as="h1" className="h-hero" lines={["A STUDIO FOR", "CONSIDERED", "LIVING."]} style={{ color: "var(--ink)" }} />
            <p className="body-copy" style={{ marginTop: 28, maxWidth: 420 }}>
              Based in Shah Alam, Elpis works across interior design, renovation and design &amp;
              build. We take on a limited number of projects at a time, so every space gets the
              attention it deserves.
            </p>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" style={{ background: "var(--soft-white)" }}>
        <ParallaxImage
          src="/images/studio/studio-atmosphere.jpg"
          alt="Studio atmosphere: a timber-panelled corridor with warm cove lighting"
          aspect="21 / 9"
          sizes="100vw"
        />
      </section>

      <section data-nav-theme="light" style={{ background: "var(--soft-white)", paddingBlock: "clamp(64px, 10vw, 120px)" }}>
        <div className="container grid-12" style={{ rowGap: 56 }}>
          <div className="col-line-1-5">
            <SectionLabel>Approach</SectionLabel>
            <h2 className="h-medium" style={{ color: "var(--ink)", marginTop: 14 }}>
              Design led by how a home is lived in, not how it photographs.
            </h2>
          </div>
          <div className="col-line-7-end">
            <p className="body-copy" style={{ maxWidth: 460 }}>
              Every project begins with the everyday: how a family moves through a kitchen, where
              light falls in the afternoon, what a hallway needs to hold. Design decisions follow
              from there, not from trend. We work closely with each client through concept,
              material selection and site execution, refining as the project takes shape rather
              than locking every decision at the outset.
            </p>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" style={{ background: "var(--warm-white)", paddingBlock: "clamp(64px, 10vw, 120px)" }}>
        <div className="container grid-12" style={{ rowGap: 56 }}>
          <div className="col-line-1-5">
            <SectionLabel>Workmanship</SectionLabel>
            <h2 className="h-medium" style={{ color: "var(--ink)", marginTop: 14 }}>
              Resolved down to the joinery.
            </h2>
          </div>
          <div className="col-line-7-end">
            <p className="body-copy" style={{ maxWidth: 460 }}>
              A well-designed home shows in the details that are easy to miss: a flush reveal, a
              storage door that closes without a sound, a material that ages well. We coordinate
              directly with tradespeople and vendors through construction, so the finished space
              matches the drawing, not an approximation of it.
            </p>
          </div>
        </div>
      </section>

      <section
        data-nav-theme="dark"
        style={{ background: "var(--navy)", paddingBlock: "clamp(80px, 12vw, 140px)", textAlign: "center" }}
      >
        <div className="container">
          <RevealText as="h2" className="h-section" lines={["LET'S TALK", "ABOUT YOUR SPACE."]} style={{ color: "var(--soft-white)", textAlign: "center" }} />
          <div style={{ marginTop: 40 }}>
            <AnimatedLink href="/contact" variant="solid-invert">
              START A PROJECT
            </AnimatedLink>
          </div>
        </div>
      </section>
    </>
  );
}
