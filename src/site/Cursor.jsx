import { useEffect, useRef } from "react";
import { gsap } from "./gsap";

/** Trailing dot that turns into a labelled pill over [data-cursor]; also drives .mag buttons. */
export default function Cursor() {
  const dot = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const el = dot.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    gsap.set(el, { xPercent: -50, yPercent: -50 });

    let magEl = null;
    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      el.classList.add("is-on");
      if (magEl) {
        const r = magEl.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        gsap.to(magEl, { x: dx * 0.25, y: dy * 0.35, duration: 0.3, ease: "power3" });
      }
    };
    const onOver = (e) => {
      const t = e.target.closest?.("[data-cursor]");
      if (t) {
        label.current.textContent = t.dataset.cursor;
        el.classList.add("is-label");
      } else {
        el.classList.remove("is-label");
      }
      const m = e.target.closest?.(".mag");
      if (m !== magEl) {
        if (magEl) gsap.to(magEl, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
        magEl = m || null;
      }
    };
    const onLeave = () => el.classList.remove("is-on", "is-label");

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={dot} className="cursor" aria-hidden="true">
      <span ref={label} className="cursor__label" />
    </div>
  );
}
