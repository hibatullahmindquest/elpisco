"use client";

import { useLayoutEffect, useRef } from "react";
import { RevealText } from "@/components/ui/RevealText";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { gsap, registerGsap } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    registerGsap();

    const ctx = gsap.context(() => {
      gsap.to(headline, {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 560,
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      <ParallaxImage
        src="/images/hero/main.jpg"
        alt="Architectural interior with natural light and considered material palette"
        background
        priority
        immediate
        sizes="100vw"
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(7,26,44,0.15) 0%, rgba(7,26,44,0.1) 40%, rgba(7,26,44,0.62) 100%)",
        }}
      />

      <div
        ref={headlineRef}
        className="container"
        style={{ position: "relative", width: "100%", paddingBottom: "clamp(48px, 8vh, 96px)" }}
      >
        <p className="label" style={{ color: "var(--champagne)", marginBottom: 20 }}>
          INTERIOR DESIGN &middot; RENOVATION &middot; DESIGN &amp; BUILD
        </p>
        <RevealText
          as="h1"
          className="h-hero"
          style={{ color: "var(--soft-white)" }}
          immediate
          delay={0.15}
          lines={["SPACES", "SHAPED", "AROUND YOU."]}
        />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "var(--outer-margin)",
          bottom: "clamp(48px, 8vh, 96px)",
          width: 1,
          height: 56,
          background: "rgba(244,241,234,0.4)",
        }}
      />
    </section>
  );
}
