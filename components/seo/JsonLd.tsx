// Centralises the `</script>` escaping so admin/CMS-supplied strings inside
// structured data (FAQ answers, project descriptions, etc.) can't break out
// of the script tag they're rendered inside.
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
