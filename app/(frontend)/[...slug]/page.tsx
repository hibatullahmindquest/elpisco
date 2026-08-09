import { notFound, redirect, permanentRedirect } from "next/navigation";
import { getRedirect } from "@/lib/redirects";

export const dynamic = "force-dynamic";

// Next.js resolves named routes (/services, /projects, etc.) before this
// catch-all, so it only ever runs for paths that don't otherwise exist —
// exactly the ones a CMS-managed redirect is meant to catch.
export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;

  const match = await getRedirect(path);
  if (!match) notFound();

  if (match.permanent) permanentRedirect(match.toPath);
  redirect(match.toPath);
}
