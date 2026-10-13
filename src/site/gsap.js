import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** The one smooth-scroll engine. Created once, driven by the GSAP ticker, skipped under reduced motion. */
let lenis = null;
export const getLenis = () => lenis;

export function startSmoothScroll() {
  if (lenis || reduceMotion()) return () => {};
  lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (t) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenis = null;
  };
}

export function scrollToTarget(target, immediate = false) {
  if (lenis) lenis.scrollTo(target, { immediate, offset: typeof target === "number" ? 0 : -72, duration: 1.1 });
  else if (typeof target === "number") window.scrollTo(0, target);
  else target.scrollIntoView();
}

export { gsap, ScrollTrigger, useGSAP };
