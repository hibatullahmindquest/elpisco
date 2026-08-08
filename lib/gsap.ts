"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export const EASE = {
  out3: "power3.out",
  out4: "power4.out",
  premium: "cubic-bezier(.22,1,.36,1)",
};

export { gsap, ScrollTrigger };
