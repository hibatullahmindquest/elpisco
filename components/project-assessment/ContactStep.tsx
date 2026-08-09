export type ContactAnswers = {
  name: string;
  phone: string;
  email: string;
  preferredContactMethod: string;
  consent: boolean;
};

export function ContactStep({
  answers,
  onChange,
}: {
  answers: ContactAnswers;
  onChange: (patch: Partial<ContactAnswers>) => void;
}) {
  return (
    <div style={{ display: "grid", gap: 28, maxWidth: 520 }}>
      <div className="field field-dark">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={answers.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </div>
      <div className="field field-dark">
        <label htmlFor="phone">Mobile / WhatsApp</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          value={answers.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
        />
      </div>
      <div className="field field-dark">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={answers.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
      </div>
      <div className="field field-dark">
        <label htmlFor="preferredContactMethod">Preferred Contact Method (optional)</label>
        <select
          id="preferredContactMethod"
          name="preferredContactMethod"
          value={answers.preferredContactMethod}
          onChange={(e) => onChange({ preferredContactMethod: e.target.value })}
        >
          <option value="">No preference</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Phone">Phone call</option>
          <option value="Email">Email</option>
        </select>
      </div>

      <label style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <input
          type="checkbox"
          checked={answers.consent}
          onChange={(e) => onChange({ consent: e.target.checked })}
          required
          style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0, accentColor: "var(--champagne)" }}
        />
        <span className="body-copy" style={{ color: "rgba(244,241,234,0.75)" }}>
          I agree to be contacted by Elpis regarding this project enquiry.
        </span>
      </label>
    </div>
  );
}
