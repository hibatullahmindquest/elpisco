import type { AssessmentOption } from "@/data/projectAssessment";

export function SingleChoiceField({
  name,
  groupLabel,
  options,
  value,
  onChange,
}: {
  name: string;
  groupLabel: string;
  options: AssessmentOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={groupLabel}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <label
            key={option.value}
            className={selected ? "assessment-option is-selected" : "assessment-option"}
          >
            <input
              className="visually-hidden"
              type="radio"
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
            />
            <span className="assessment-option-mark assessment-option-mark--round" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 10 10">
                <circle cx="5" cy="5" r="5" fill="var(--navy)" />
              </svg>
            </span>
            <span style={{ flex: 1 }}>
              <span className="h-medium" style={{ display: "block", fontSize: "clamp(18px, 2.2vw, 26px)" }}>
                {option.label}
              </span>
              {option.description && (
                <span className="body-copy" style={{ display: "block", marginTop: 6, color: "rgba(244,241,234,0.6)" }}>
                  {option.description}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}
