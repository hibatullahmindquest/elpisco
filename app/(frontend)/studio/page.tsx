import { permanentRedirect } from "next/navigation";

// The Studio page was renamed to /about as part of the expanded site
// architecture. Redirect in code (rather than relying solely on a
// CMS-managed Redirects entry) so old links keep working regardless of
// what's been configured in the admin.
export default function StudioPage() {
  permanentRedirect("/about");
}
