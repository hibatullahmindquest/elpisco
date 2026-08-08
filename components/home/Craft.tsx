import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Craft() {
  return (
    <section
      data-nav-theme="light"
      style={{ background: "var(--soft-white)", paddingBlock: "clamp(64px, 10vw, 120px)" }}
    >
      <div className="container grid-12" style={{ alignItems: "end", rowGap: 40 }}>
        <div className="col-line-1-7">
          <ParallaxImage
            src="/images/details/material-detail.jpg"
            alt="Timber-panelled corridor with warm cove lighting, a detail of material and craftsmanship"
            aspect="3 / 4"
            sizes="(max-width: 900px) 100vw, 55vw"
          />
        </div>

        <div className="col-line-9-end" style={{ paddingBottom: "clamp(8px, 3vw, 40px)" }}>
          <SectionLabel>Craft</SectionLabel>
          <RevealText
            as="h2"
            className="h-section"
            lines={["MATERIAL", "MATTERS."]}
            style={{ color: "var(--ink)", marginTop: 14, fontSize: "clamp(36px, 5.5vw, 88px)" }}
          />
          <p className="body-copy" style={{ marginTop: 28, maxWidth: 340 }}>
            The quality of a space lives in the details: how materials meet, how light falls, how
            storage disappears and how every surface is resolved.
          </p>
        </div>
      </div>
    </section>
  );
}
