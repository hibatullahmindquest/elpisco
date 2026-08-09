import Image from "next/image";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getCredentials } from "@/lib/credentials";
import { resolveBackground, isDarkBackground } from "./shared";

export async function CredentialsGridBlockView({
  background,
  label,
  headlineLines,
  note,
}: {
  background?: string | null;
  label?: string | null;
  headlineLines?: { line: string }[] | null;
  note?: string | null;
}) {
  const credentials = await getCredentials();
  const dark = isDarkBackground(background);
  const lines = (headlineLines ?? []).map((l) => l.line);

  return (
    <section data-nav-theme={dark ? "dark" : "light"} style={{ background: resolveBackground(background), paddingBlock: "clamp(64px, 10vw, 120px)" }}>
      <div className="container">
        {label && <SectionLabel theme={dark ? "dark" : "light"}>{label}</SectionLabel>}
        {lines.length > 0 && (
          <RevealText
            as="h2"
            className="h-section"
            lines={lines}
            style={{ color: dark ? "var(--soft-white)" : "var(--ink)", marginTop: 14 }}
          />
        )}

        {credentials.length > 0 ? (
          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {credentials.map((credential) => (
              <div
                key={credential.label}
                style={{
                  borderTop: "1px solid var(--line)",
                  paddingTop: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                {credential.iconUrl && (
                  <Image
                    src={credential.iconUrl}
                    alt=""
                    width={40}
                    height={40}
                    style={{ objectFit: "contain", flexShrink: 0 }}
                  />
                )}
                <div>
                  <p className="body-copy" style={{ color: dark ? "var(--soft-white)" : "var(--ink)", fontSize: 15, fontWeight: 600 }}>
                    {credential.label}
                  </p>
                  {credential.value && (
                    <p className="body-copy" style={{ marginTop: 4, fontSize: 14, color: dark ? "rgba(244,241,234,0.65)" : undefined }}>
                      {credential.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          note && (
            <p className="body-copy" style={{ marginTop: 32, maxWidth: 420, color: dark ? "rgba(244,241,234,0.65)" : undefined }}>
              {note}
            </p>
          )
        )}
      </div>
    </section>
  );
}
