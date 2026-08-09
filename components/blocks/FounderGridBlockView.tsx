import Image from "next/image";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getFounders } from "@/lib/founders";
import { resolveBackground, isDarkBackground } from "./shared";

export async function FounderGridBlockView({
  background,
  label,
  headlineLines,
  note,
}: {
  background?: string | null;
  label?: string | null;
  headlineLines?: { line: string }[] | null;
  note?: string | null;
}) {
  const founders = await getFounders();
  const dark = isDarkBackground(background);
  const lines = (headlineLines ?? []).map((l) => l.line);

  return (
    <section data-nav-theme={dark ? "dark" : "light"} style={{ background: resolveBackground(background), paddingBlock: "clamp(64px, 10vw, 120px)" }}>
      <div className="container">
        {label && <SectionLabel theme={dark ? "dark" : "light"}>{label}</SectionLabel>}
        {lines.length > 0 && (
          <RevealText
            as="h2"
            className="h-section"
            lines={lines}
            style={{ color: dark ? "var(--soft-white)" : "var(--ink)", marginTop: 14 }}
          />
        )}

        {founders.length > 0 ? (
          <div className="grid-12" style={{ marginTop: 56, rowGap: 48 }}>
            {founders.map((founder) => (
              <div key={founder.name} className="col-line-1-6">
                {founder.photoUrl ? (
                  <div style={{ position: "relative", aspectRatio: "3 / 4" }}>
                    <Image
                      src={founder.photoUrl}
                      alt={founder.name}
                      fill
                      sizes="(max-width: 900px) 100vw, 40vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      aspectRatio: "3 / 4",
                      background: "var(--line)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-hidden="true"
                  >
                    <span className="label" style={{ color: "var(--muted)" }}>
                      PORTRAIT PENDING
                    </span>
                  </div>
                )}
                <p
                  className="h-medium"
                  style={{ fontSize: "clamp(24px, 2.4vw, 32px)", color: dark ? "var(--soft-white)" : "var(--ink)", marginTop: 20 }}
                >
                  {founder.name}
                </p>
                {founder.title && (
                  <p className="label" style={{ color: dark ? "var(--champagne)" : "var(--champagne-ink)", marginTop: 6 }}>
                    {founder.title}
                  </p>
                )}
                {founder.bio && (
                  <p className="body-copy" style={{ marginTop: 14, maxWidth: 380, color: dark ? "rgba(244,241,234,0.65)" : undefined }}>
                    {founder.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          note && (
            <p className="body-copy" style={{ marginTop: 32, maxWidth: 420, color: dark ? "rgba(244,241,234,0.65)" : undefined }}>
              {note}
            </p>
          )
        )}
      </div>
    </section>
  );
}
