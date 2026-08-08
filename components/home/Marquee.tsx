const ITEM = "SELECTED WORK";

export function Marquee() {
  const row = Array.from({ length: 8 }, () => ITEM).join(" / ");

  return (
    <section
      data-nav-theme="light"
      aria-hidden="true"
      style={{
        background: "var(--warm-white)",
        borderBlock: "1px solid var(--line)",
        overflow: "hidden",
        paddingBlock: 28,
      }}
    >
      <div className="marquee-track">
        <span className="h-medium marquee-item">{row}</span>
        <span className="h-medium marquee-item">{row}</span>
      </div>
    </section>
  );
}
