import Link from "next/link";
import { cn } from "@/lib/utils";

type AnimatedLinkProps = {
  href: string;
  children: React.ReactNode;
  /** "solid" = navy fill, for light backgrounds. "solid-invert" = champagne fill, for navy/dark backgrounds. */
  variant?: "cta" | "solid" | "solid-invert";
  className?: string;
  external?: boolean;
};

export function AnimatedLink({ href, children, variant = "cta", className, external = false }: AnimatedLinkProps) {
  const classes = cn(
    "cta",
    variant === "solid" && "cta-solid",
    variant === "solid-invert" && "cta-solid-invert",
    className
  );
  const content = (
    <>
      <span className="cta-label">{children}</span>
      <span className="cta-arrow" aria-hidden="true">
        &#8599;
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
