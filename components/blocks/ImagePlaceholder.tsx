export function ImagePlaceholder({ dark, aspect = "4 / 3" }: { dark?: boolean; aspect?: string }) {
  return (
    <div
      style={{
        aspectRatio: aspect,
        border: `1px dashed ${dark ? "rgba(244,241,234,0.3)" : "var(--line)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden="true"
    >
      <span className="label" style={{ color: dark ? "rgba(244,241,234,0.5)" : "var(--muted)" }}>
        IMAGE PLACEHOLDER
      </span>
    </div>
  );
}
