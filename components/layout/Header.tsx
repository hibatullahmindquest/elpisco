"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FullscreenMenu } from "./FullscreenMenu";
import type { NavItem } from "@/lib/navigation";

export function Header({
  navItems,
  siteName,
  logoUrl,
  contact,
  behavior = "frosted",
}: {
  navItems: NavItem[];
  siteName: string;
  logoUrl: string | null;
  contact: { instagramUrl: string; whatsappUrl: string; city: string; country: string };
  behavior?: "frosted" | "hide-on-scroll";
}) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (behavior === "frosted") {
      const onScroll = () => setScrolled(window.scrollY > 40);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [behavior]);

  useEffect(() => {
    const headerH =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 88;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const t = (entry.target as HTMLElement).dataset.navTheme as "light" | "dark" | undefined;
            if (t) setTheme(t);
          }
        });
      },
      {
        rootMargin: `-${headerH}px 0px -${Math.max(window.innerHeight - headerH - 12, 0)}px 0px`,
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isDark = menuOpen ? true : theme === "dark";
  const color = isDark ? "var(--soft-white)" : "var(--navy)";
  const showBackdrop = behavior === "frosted" && scrolled && !menuOpen;
  const isHidden = behavior === "hide-on-scroll" && hidden && !menuOpen;

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "var(--header-h)",
          display: "flex",
          alignItems: "center",
          color,
          background: showBackdrop
            ? isDark
              ? "color-mix(in srgb, var(--navy) 72%, transparent)"
              : "color-mix(in srgb, var(--warm-white) 82%, transparent)"
            : "transparent",
          backdropFilter: showBackdrop ? "blur(12px)" : undefined,
          WebkitBackdropFilter: showBackdrop ? "blur(12px)" : undefined,
          transform: isHidden ? "translateY(-100%)" : "translateY(0)",
          transition:
            "color 0.4s var(--ease-premium), background 0.4s var(--ease-premium), transform 0.4s var(--ease-premium)",
          pointerEvents: "none",
        }}
      >
        <div
          className="container"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pointerEvents: "none",
          }}
        >
          <Link
            href="/"
            className="label"
            style={{ pointerEvents: "auto", letterSpacing: "0.16em", display: "flex", alignItems: "center" }}
            onClick={() => setMenuOpen(false)}
          >
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={siteName} style={{ height: 22, width: "auto" }} />
            ) : (
              siteName
            )}
          </Link>
          <button
            type="button"
            className="label"
            style={{ pointerEvents: "auto" }}
            aria-expanded={menuOpen}
            aria-controls="fullscreen-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      <FullscreenMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navItems={navItems}
        instagramUrl={contact.instagramUrl}
        whatsappUrl={contact.whatsappUrl}
        city={contact.city}
        country={contact.country}
      />
    </>
  );
}
