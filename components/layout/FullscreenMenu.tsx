"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const LINKS = [
  { n: "01", label: "PROJECTS", href: "/projects" },
  { n: "02", label: "STUDIO", href: "/studio" },
  { n: "03", label: "SERVICES", href: "/services" },
  { n: "04", label: "PROCESS", href: "/process" },
  { n: "05", label: "CONTACT", href: "/contact" },
];

export function FullscreenMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = panel.querySelectorAll<HTMLElement>("[data-menu-item]");
    const meta = panel.querySelectorAll<HTMLElement>("[data-menu-meta]");

    if (reduce) {
      gsap.set(panel, { autoAlpha: open ? 1 : 0 });
      gsap.set(items, { yPercent: 0, autoAlpha: 1 });
      gsap.set(meta, { autoAlpha: 1 });
      if (open) firstLinkRef.current?.focus();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      if (open) {
        tl.set(panel, { autoAlpha: 1 })
          .fromTo(panel, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.out" })
          .fromTo(
            items,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.7, ease: "power4.out", stagger: 0.07 },
            "-=0.35"
          )
          .fromTo(meta, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");
        tl.eventCallback("onComplete", () => firstLinkRef.current?.focus());
      } else {
        tl.to(panel, { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "power3.inOut" }).set(panel, {
          autoAlpha: 0,
        });
      }
    }, panel);

    return () => ctx.revert();
  }, [open]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || !open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = panel.querySelectorAll<HTMLElement>("a[href], button");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div
      id="fullscreen-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        background: "var(--navy)",
        opacity: 0,
        visibility: "hidden",
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: "clamp(48px, 8vh, 96px)",
      }}
    >
      <div className="container" style={{ width: "100%" }}>
        <nav aria-label="Primary">
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {LINKS.map((item, i) => (
              <li key={item.href} style={{ overflow: "hidden" }} data-menu-item>
                <Link
                  href={item.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  onClick={onClose}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 28,
                    padding: "14px 0",
                    color: "var(--soft-white)",
                  }}
                  className="h-medium"
                >
                  <span className="label" style={{ color: "var(--champagne)", minWidth: 40 }}>
                    {item.n}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          style={{
            marginTop: "clamp(40px, 6vh, 72px)",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(32px, 8vw, 96px)",
          }}
        >
          <div data-menu-meta style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="[INSTAGRAM_URL]" className="label" style={{ color: "var(--soft-white)" }}>
              INSTAGRAM
            </a>
            <a href="[WHATSAPP_URL]" className="label" style={{ color: "var(--soft-white)" }}>
              WHATSAPP
            </a>
          </div>
          <div data-menu-meta style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="label" style={{ color: "rgba(244,241,234,0.5)" }}>
              SHAH ALAM
            </span>
            <span className="label" style={{ color: "rgba(244,241,234,0.5)" }}>
              MALAYSIA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
