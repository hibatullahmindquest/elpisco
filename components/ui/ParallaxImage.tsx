"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  src: string;
  alt: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** Adds a slow, low-amplitude continuous parallax while scrolling past. */
  parallax?: boolean;
  /** Play the entrance reveal on mount instead of on scroll (for above-the-fold hero images). */
  immediate?: boolean;
  delay?: number;
  className?: string;
  /** Absolutely fill the parent (position: absolute; inset: 0) instead of sizing by aspect-ratio. Use for full-bleed backgrounds. */
  background?: boolean;
};

export function ParallaxImage({
  src,
  alt,
  aspect = "4 / 3",
  sizes = "100vw",
  priority = false,
  parallax = false,
  immediate = false,
  delay = 0,
  className,
  background = false,
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    registerGsap();
    gsap.set(img, { scale: 1.08, yPercent: 4 });

    // Deferred for the same reason as RevealText: avoids React Strict
    // Mode's dev-only double-mount leaving a ScrollTrigger with stale
    // cached measurements.
    let ctx: ReturnType<typeof gsap.context> | null = null;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.to(img, {
          scale: 1,
          yPercent: 0,
          duration: 1.4,
          delay,
          ease: "power3.out",
          scrollTrigger: immediate ? undefined : { trigger: wrap, start: "top 80%" },
        });

        if (parallax) {
          gsap.to(img, {
            y: -28,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      }, wrap);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [parallax, immediate, delay]);

  return (
    <div
      ref={wrapRef}
      className={cn("reveal-image", className)}
      style={background ? { position: "absolute", inset: 0 } : { aspectRatio: aspect }}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
