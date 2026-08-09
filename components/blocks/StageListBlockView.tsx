import { SectionLabel } from "@/components/ui/SectionLabel";
import { resolveBackground, isDarkBackground } from "./shared";

type StageItem = {
  number: string;
  title: string;
  headline?: string | null;
  body?: string | null;
  subListLabel?: string | null;
  subList?: { value: string }[] | null;
  outcomeLabel?: string | null;
  outcome?: string | null;
  background?: string | null;
};

export function StageListBlockView({ items }: { items?: StageItem[] | null }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      {items.map((item, i) => {
        const dark = isDarkBackground(item.background);
        return (
          <section
            key={i}
            data-nav-theme={dark ? "dark" : "light"}
            style={{ background: resolveBackground(item.background), paddingBlock: "clamp(56px, 9vw, 100px)" }}
          >
            <div className="container grid-12" style={{ alignItems: "start", rowGap: 32 }}>
              <div className="col-line-1-5">
                <p
                  className="h-project"
                  style={{ color: "var(--champagne-soft)", fontSize: "clamp(64px, 8vw, 120px)" }}
                >
                  {item.number}
                </p>
                {item.headline ? (
                  <SectionLabel theme={dark ? "dark" : "light"}>{item.title}</SectionLabel>
                ) : (
                  <h2
                    className="h-medium"
                    style={{ color: dark ? "var(--soft-white)" : "var(--ink)", marginTop: -8, fontSize: "clamp(24px, 2.8vw, 38px)" }}
                  >
                    {item.title}
                  </h2>
                )}
              </div>
              <div className="col-line-7-end">
                {item.headline && (
                  <h2 className="h-medium" style={{ color: dark ? "var(--soft-white)" : "var(--ink)" }}>
                    {item.headline}
                  </h2>
                )}
                {item.body && (
                  <p
                    className="body-copy"
                    style={{
                      marginTop: item.headline ? 20 : 0,
                      maxWidth: 460,
                      fontSize: 17,
                      color: dark ? "rgba(244,241,234,0.65)" : "var(--ink)",
                    }}
                  >
                    {item.body}
                  </p>
                )}

                {item.subList && item.subList.length > 0 && (
                  <div style={{ marginTop: 32 }}>
                    {item.subListLabel && (
                      <p className="label" style={{ color: dark ? "var(--champagne)" : "var(--champagne-ink)", marginBottom: 12 }}>
                        {item.subListLabel}
                      </p>
                    )}
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      {item.subList.map((point) => (
                        <li
                          key={point.value}
                          className="body-copy"
                          style={{ padding: "14px 0", borderTop: "1px solid var(--line)" }}
                        >
                          {point.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.outcome && (
                  <div style={{ marginTop: 28, borderTop: "1px solid var(--line)", paddingTop: 20 }}>
                    {item.outcomeLabel && (
                      <p className="label" style={{ color: dark ? "var(--champagne)" : "var(--champagne-ink)", marginBottom: 8 }}>
                        {item.outcomeLabel}
                      </p>
                    )}
                    <p className="body-copy" style={{ maxWidth: 420, color: dark ? "rgba(244,241,234,0.65)" : undefined }}>
                      {item.outcome}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
