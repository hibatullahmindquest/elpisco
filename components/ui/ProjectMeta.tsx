type MetaItem = {
  label: string;
  value: string | string[];
};

export function ProjectMeta({ items, theme = "light" }: { items: MetaItem[]; theme?: "light" | "dark" }) {
  const labelColor = theme === "dark" ? "var(--champagne)" : "var(--champagne-ink)";
  const valueColor = theme === "dark" ? "var(--soft-white)" : "var(--ink)";

  return (
    <dl
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "28px",
        margin: 0,
      }}
    >
      {items.map((item) => (
        <div key={item.label}>
          <dt className="label" style={{ color: labelColor, marginBottom: 10 }}>
            {item.label}
          </dt>
          <dd
            style={{
              margin: 0,
              color: valueColor,
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              lineHeight: 1.5,
            }}
          >
            {Array.isArray(item.value)
              ? item.value.map((v) => <div key={v}>{v}</div>)
              : item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
