import { useEffect, useRef } from "react";
import { gsap } from "./gsap";

/**
 * One small dot. Blend mode keeps it visible on every background.
 * It grows over links and buttons, shrinks on press, and steps aside over text fields.
 */
export default function Cursor() {
  const dot = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = dot.current;
    document.documentElement.classList.add("cc");
    const x = gsap.quickTo(el, "x", { duration: 0.18, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.18, ease: "power3" });

    const move = (e) => {
      el.classList.add("is-on");
      x(e.clientX);
      y(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      if (!t?.closest) return;
      el.classList.toggle("is-link", !!t.closest("a, button, summary, label, [role='button'], .row"));
      el.classList.toggle("is-text", !!t.closest("input, textarea, select"));
    };
    const down = () => el.classList.add("is-down");
    const up = () => el.classList.remove("is-down");
    const leave = () => el.classList.remove("is-on");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("cc");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={dot} className="dot" aria-hidden="true" />;
}
