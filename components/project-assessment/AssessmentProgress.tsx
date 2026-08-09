export function AssessmentProgress({
  step,
  total,
  onBack,
}: {
  step: number;
  total: number;
  onBack?: () => void;
}) {
  const percent = (step / total) * 100;

  return (
    <div>
      <div style={{ height: 1, background: "var(--line-on-navy)" }}>
        <div
          style={{
            height: 1,
            width: `${percent}%`,
            background: "var(--champagne)",
            transition: "width 0.4s var(--ease-premium)",
          }}
        />
      </div>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {onBack ? (
          <button type="button" onClick={onBack} className="label" style={{ color: "rgba(244,241,234,0.6)" }}>
            &#8592; BACK
          </button>
        ) : (
          <span />
        )}
        <p className="label" style={{ color: "var(--champagne)" }}>
          STEP {String(step).padStart(2, "0")} / {total}
        </p>
      </div>
    </div>
  );
}
