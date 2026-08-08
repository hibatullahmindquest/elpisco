"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

function getCursorEnabledSnapshot() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getCursorEnabledServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(
    noopSubscribe,
    getCursorEnabledSnapshot,
    getCursorEnabledServerSnapshot
  );
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor === "view" ? "VIEW" : null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 200,
        pointerEvents: "none",
        width: label ? 64 : 8,
        height: label ? 64 : 8,
        borderRadius: "50%",
        background: label ? "var(--navy)" : "var(--champagne)",
        color: "var(--soft-white)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        letterSpacing: "0.1em",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        transition:
          "width 0.3s var(--ease-premium), height 0.3s var(--ease-premium), background 0.3s var(--ease-premium)",
      }}
    >
      {label}
    </div>
  );
}
