import { SectionLabel } from "@/components/ui/SectionLabel";
import { resolveBackground, isDarkBackground } from "./shared";

export function SplitTextBlockView({
  background,
  columns,
}: {
  background?: string | null;
  columns?: { label?: string | null; headline: string; body?: string | null }[] | null;
}) {
  if (!columns || columns.length === 0) return null;
  const dark = isDarkBackground(background);
  const colClasses = ["col-line-1-5", "col-line-7-end"];

  return (
    <section data-nav-theme={dark ? "dark" : "light"} style={{ background: resolveBackground(background), paddingBlock: "clamp(80px, 12vw, 140px)" }}>
      <div className="container grid-12" style={{ rowGap: 64 }}>
        {columns.map((col, i) => (
          <div key={i} className={colClasses[i] ?? "col-line-1-6"}>
            {col.label && <SectionLabel theme={dark ? "dark" : "light"}>{col.label}</SectionLabel>}
            <h2 className="h-medium" style={{ color: dark ? "var(--soft-white)" : "var(--ink)", marginTop: col.label ? 14 : 0 }}>
              {col.headline}
            </h2>
            {col.body && (
              <p
                className="body-copy"
                style={{ marginTop: 20, maxWidth: 380, color: dark ? "rgba(244,241,234,0.65)" : undefined }}
              >
                {col.body}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
