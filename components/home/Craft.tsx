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
            lines={["THE DIFFERENCE IS", "IN WHAT GETS", "RESOLVED."]}
            style={{ color: "var(--ink)", marginTop: 14, fontSize: "clamp(32px, 5vw, 76px)" }}
          />
          <p className="body-copy" style={{ marginTop: 28, maxWidth: 380 }}>
            The quality of a home often lives in the details that are easiest to overlook — the
            alignment of a shadow gap, the proportion of a cabinet, the transition between two
            materials, the warmth of a light source, the way a door closes.
          </p>
          <p className="body-copy" style={{ marginTop: 16, maxWidth: 380 }}>
            We treat these decisions as part of the architecture, not decoration added at the end.
          </p>
        </div>
      </div>
    </section>
  );
}
