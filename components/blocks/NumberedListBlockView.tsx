import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { resolveBackground, isDarkBackground } from "./shared";

type Item = { number: string; title: string; body?: string | null };

function ItemRow({ item, dark }: { item: Item; dark: boolean }) {
  return (
    <div style={{ borderTop: "1px solid var(--line)", padding: "24px 0" }}>
      <div style={{ display: "flex", gap: 24, alignItems: "baseline" }}>
        <span className="label" style={{ color: dark ? "var(--champagne)" : "var(--champagne-ink)", minWidth: 28 }}>
          {item.number}
        </span>
        <div>
          <p className="h-medium" style={{ fontSize: "clamp(20px, 2vw, 26px)", color: dark ? "var(--soft-white)" : "var(--ink)" }}>
            {item.title}
          </p>
          {item.body && (
            <p className="body-copy" style={{ marginTop: 8, maxWidth: 340, color: dark ? "rgba(244,241,234,0.65)" : undefined }}>
              {item.body}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function NumberedListBlockView({
  background,
  label,
  headline,
  ctaLabel,
  ctaHref,
  columns,
  items,
}: {
  background?: string | null;
  label?: string | null;
  headline?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  columns?: string | null;
  items?: Item[] | null;
}) {
  if (!items || items.length === 0) return null;
  const dark = isDarkBackground(background);
  const twoColumns = columns === "2";
  const firstColItems = twoColumns ? items.slice(0, Math.ceil(items.length / 2)) : items;
  const secondColItems = twoColumns ? items.slice(Math.ceil(items.length / 2)) : [];

  return (
    <section data-nav-theme={dark ? "dark" : "light"} style={{ background: resolveBackground(background), paddingBlock: "clamp(64px, 10vw, 120px)" }}>
      <div className="container">
        {label && <SectionLabel theme={dark ? "dark" : "light"}>{label}</SectionLabel>}
        {headline && (
          <RevealText
            as="h2"
            className="h-medium"
            lines={[headline]}
            style={{ color: dark ? "var(--soft-white)" : "var(--ink)", marginTop: 14 }}
          />
        )}
        <div className="grid-12" style={{ marginTop: 32 }}>
          <div className={twoColumns ? "col-line-1-6" : undefined} style={twoColumns ? undefined : { gridColumn: "1 / -1" }}>
            {firstColItems.map((item) => (
              <ItemRow key={item.number} item={item} dark={dark} />
            ))}
          </div>
          {twoColumns && (
            <div className="col-line-7-end">
              {secondColItems.map((item) => (
                <ItemRow key={item.number} item={item} dark={dark} />
              ))}
              <div style={{ borderTop: "1px solid var(--line)" }} />
            </div>
          )}
        </div>
        {ctaLabel && ctaHref && (
          <div style={{ marginTop: "clamp(32px, 5vw, 48px)" }}>
            <AnimatedLink href={ctaHref}>{ctaLabel}</AnimatedLink>
          </div>
        )}
      </div>
    </section>
  );
}
