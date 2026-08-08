"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FullscreenMenu } from "./FullscreenMenu";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [menuOpen, setMenuOpen] = useState(false);

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
          transition: "color 0.4s var(--ease-premium)",
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
            style={{ pointerEvents: "auto", letterSpacing: "0.16em" }}
            onClick={() => setMenuOpen(false)}
          >
            ELPIS.CO
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

      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
