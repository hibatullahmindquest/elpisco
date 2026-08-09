export function TextField({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel";
}) {
  return (
    <div className="field field-dark" style={{ maxWidth: 560 }}>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ fontSize: "clamp(18px, 2.4vw, 26px)", padding: "18px 4px", border: 0, borderBottom: "1px solid var(--line-on-navy)" }}
        autoComplete="off"
      />
    </div>
  );
}

export function TextareaField({
  id,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="field field-dark">
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={6}
        style={{ fontSize: 17, lineHeight: 1.6 }}
      />
    </div>
  );
}
