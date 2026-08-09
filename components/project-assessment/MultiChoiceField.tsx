import type { AssessmentOption } from "@/data/projectAssessment";

export function MultiChoiceField({
  name,
  options,
  values,
  onChange,
  exclusiveValue,
}: {
  name: string;
  options: AssessmentOption[];
  values: string[];
  onChange: (values: string[]) => void;
  exclusiveValue?: string;
}) {
  function toggle(value: string) {
    const isSelected = values.includes(value);

    if (isSelected) {
      onChange(values.filter((v) => v !== value));
      return;
    }

    if (exclusiveValue && value === exclusiveValue) {
      onChange([value]);
      return;
    }

    const next = exclusiveValue ? values.filter((v) => v !== exclusiveValue) : values;
    onChange([...next, value]);
  }

  return (
    <div role="group" aria-label={name}>
      {options.map((option) => {
        const selected = values.includes(option.value);
        return (
          <label
            key={option.value}
            className={selected ? "assessment-option is-selected" : "assessment-option"}
          >
            <input
              className="visually-hidden"
              type="checkbox"
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => toggle(option.value)}
            />
            <span className="assessment-option-mark" aria-hidden="true">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M1 5L4.5 8.5L11 1.5" stroke="var(--navy)" strokeWidth="1.6" />
              </svg>
            </span>
            <span
              className="h-medium"
              style={{ flex: 1, fontSize: "clamp(18px, 2.2vw, 26px)" }}
            >
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
