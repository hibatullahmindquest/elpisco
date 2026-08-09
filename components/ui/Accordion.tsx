"use client";

import { useId, useState } from "react";

type AccordionItemProps = {
  question: string;
  answer: string;
};

function AccordionItem({ question, answer }: AccordionItemProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div style={{ borderTop: "1px solid var(--line)" }}>
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            padding: "22px 0",
            textAlign: "left",
          }}
        >
          <span className="body-copy" style={{ color: "var(--ink)", fontSize: 17 }}>
            {question}
          </span>
          <span
            aria-hidden="true"
            style={{
              flexShrink: 0,
              color: "var(--champagne-ink)",
              fontSize: 20,
              lineHeight: 1,
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.3s var(--ease-premium)",
            }}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s var(--ease-premium)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p className="body-copy" style={{ paddingBottom: 22, maxWidth: 640 }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items }: { items: AccordionItemProps[] }) {
  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      {items.map((item) => (
        <AccordionItem key={item.question} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
