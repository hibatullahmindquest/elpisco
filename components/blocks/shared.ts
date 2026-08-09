export const BG_VAR: Record<string, string> = {
  "warm-white": "var(--warm-white)",
  "soft-white": "var(--soft-white)",
  navy: "var(--navy)",
};

export function resolveBackground(background?: string | null) {
  return BG_VAR[background ?? "warm-white"] ?? BG_VAR["warm-white"];
}

export function isDarkBackground(background?: string | null) {
  return background === "navy";
}

/** Splits on blank lines so a single CMS textarea can render as multiple <p> tags. */
export function toParagraphs(body?: string | null): string[] {
  if (!body) return [];
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
