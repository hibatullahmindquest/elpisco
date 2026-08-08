"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div";
  className?: string;
  style?: React.CSSProperties;
  lineClassName?: string;
  stagger?: number;
  start?: string;
  /** Play immediately on mount instead of on scroll (use for above-the-fold hero text). */
  immediate?: boolean;
  delay?: number;
};

export function RevealText({
  lines,
  as = "div",
  className,
  style,
  lineClassName,
  stagger = 0.08,
  start = "top 85%",
  immediate = false,
  delay = 0,
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const spans = el.querySelectorAll<HTMLElement>(".line-mask > span");

    if (reduce) {
      gsap.set(spans, { yPercent: 0 });
      return;
    }

    registerGsap();

    const ctx = gsap.context(() => {
      gsap.set(spans, { yPercent: 110 });
      gsap.to(spans, {
        yPercent: 0,
        duration: 1,
        delay,
        ease: "power4.out",
        stagger,
        scrollTrigger: immediate ? undefined : { trigger: el, start },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, start, immediate, delay]);

  const Tag = as as React.ElementType;

  return (
    <Tag ref={ref} className={className} style={style}>
      {lines.map((line, i) => (
        <span className={cn("line-mask", lineClassName)} key={i}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
