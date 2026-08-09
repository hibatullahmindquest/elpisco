"use client";

import { useEffect, useRef, useState } from "react";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Item = { number: string; title: string; body?: string | null };

export function StickyStepListBlockView({
  label,
  headlineLines,
  items,
}: {
  label?: string | null;
  headlineLines?: { line: string }[] | null;
  items?: Item[] | null;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  const lines = (headlineLines ?? []).map((l) => l.line);
  const steps = items ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = refs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.55 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [steps.length]);

  if (steps.length === 0) return null;
  const current = steps[Math.min(active, steps.length - 1)];

  return (
    <section data-nav-theme="light" style={{ background: "var(--warm-white)" }}>
      <div className="container" style={{ paddingBlock: "clamp(64px, 10vw, 120px) 0" }}>
        {label && <SectionLabel>{label}</SectionLabel>}
        {lines.length > 0 && (
          <RevealText as="h2" className="h-medium" lines={lines} style={{ color: "var(--ink)", marginTop: 14 }} />
        )}
      </div>

      <div className="container grid-12" style={{ marginTop: "clamp(40px, 6vw, 72px)", rowGap: 24 }}>
        <div style={{ gridColumn: "1 / span 4" }}>
          <div style={{ position: "sticky", top: "calc(var(--header-h) + 24px)" }} className="process-sticky">
            <p className="label" style={{ color: "var(--champagne-ink)" }}>
              Step {active + 1} of {steps.length}
            </p>
            <p className="h-project" style={{ color: "var(--ink)", marginTop: 10, fontSize: "clamp(48px, 6vw, 96px)" }}>
              {current.number}
            </p>
            <p className="label" style={{ color: "var(--ink)", marginTop: 6 }}>
              {current.title}
            </p>
          </div>
        </div>

        <div className="col-line-6-end">
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => {
                refs.current[i] = el;
              }}
              style={{
                minHeight: "38vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderTop: "1px solid var(--line)",
                paddingBlock: 40,
                opacity: active === i ? 1 : 0.4,
                transition: "opacity 0.5s var(--ease-premium)",
              }}
            >
              <p className="h-medium" style={{ color: "var(--ink)", fontSize: "clamp(28px, 3.6vw, 48px)" }}>
                {step.title}
              </p>
              {step.body && (
                <p className="body-copy" style={{ marginTop: 16, maxWidth: 420 }}>
                  {step.body}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
