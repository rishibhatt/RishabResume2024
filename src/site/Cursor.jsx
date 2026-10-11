import { useEffect, useRef } from "react";
import { gsap } from "./gsap";

/**
 * Fast & robust background luminance detection
 * Determines whether the element directly beneath the cursor is visually light or dark.
 */
function detectElementTone(el) {
  if (!el || !(el instanceof Element)) return "light";

  // 1. Fast semantic selector hierarchy
  const darkParent = el.closest(
    ".work, .foot, .tape, [data-theme='dark'], .btn--ink, .btn--night, .btn--night-ghost, .svc__not, .ct"
  );
  const lightParent = el.closest(
    ".ct__bubble, .chip, .nav__bar, .svc__card, [data-theme='light'], .btn--light, .btn--ghost, .hello"
  );

  if (darkParent && lightParent) {
    // Closer ancestor wins (e.g. light preview card inside dark contact section)
    return darkParent.contains(lightParent) ? "light" : "dark";
  }
  if (darkParent) return "dark";
  if (lightParent) return "light";

  // 2. Fallback: inspect computed background-color up to 5 levels
  let curr = el;
  let depth = 0;
  while (curr && curr !== document.documentElement && curr !== document.body && depth < 5) {
    depth++;
    try {
      const bg = window.getComputedStyle(curr).backgroundColor;
      if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
        const rgbMatch = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (rgbMatch) {
          const a = rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1;
          if (a > 0.25) {
            const r = parseInt(rgbMatch[1], 10);
            const g = parseInt(rgbMatch[2], 10);
            const b = parseInt(rgbMatch[3], 10);
            const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            return lum < 0.52 ? "dark" : "light";
          }
        }
        const oklchMatch = bg.match(/oklch\(([\d.]+)%/);
        if (oklchMatch) {
          return parseFloat(oklchMatch[1]) < 55 ? "dark" : "light";
        }
      }
    } catch {
      break;
    }
    curr = curr.parentElement;
  }

  return "light";
}

/**
 * Editorial Drafting Reticle & Viewfinder Cursor
 * - Removes default OS pointer entirely (cursor: none)
 * - Dynamic tone adaptation: switches instantly between light paper and dark night backgrounds
 * - Dual-contour CAD casing: guaranteed 100% visibility over all textures, edges, images, and text
 * - Precision drafting crosshair (+) that snaps to (×) on pointerdown
 * - Trailing architectural 4-corner viewfinder brackets (┌ ┐ └ ┘)
 * - Dynamic frame expansion: snaps to frame links, buttons, and switches
 * - On [data-cursor]: expands into an architectural HUD pill displaying the action
 */
export default function Cursor() {
  const rootRef = useRef(null);
  const crosshairRef = useRef(null);
  const frameRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;

    const root = rootRef.current;
    const crosshair = crosshairRef.current;
    const frame = frameRef.current;
    const label = labelRef.current;

    // Default to light tone on initial mount
    root.classList.add("is-on-light");

    // Instant precision crosshair (duration: 0.02s - zero perceived lag)
    const chX = gsap.quickTo(crosshair, "x", { duration: 0.02, ease: "none" });
    const chY = gsap.quickTo(crosshair, "y", { duration: 0.02, ease: "none" });

    // Smooth inertia trailing viewfinder frame (duration: 0.22s)
    const frX = gsap.quickTo(frame, "x", { duration: 0.22, ease: "power2.out" });
    const frY = gsap.quickTo(frame, "y", { duration: 0.22, ease: "power2.out" });

    gsap.set([crosshair, frame], { xPercent: -50, yPercent: -50 });

    let activeMag = null;
    let currentTone = "light";
    let lastX = 0;
    let lastY = 0;

    const updateTone = (targetEl) => {
      const tone = detectElementTone(targetEl);
      if (tone !== currentTone) {
        currentTone = tone;
        if (tone === "dark") {
          root.classList.add("is-on-dark");
          root.classList.remove("is-on-light");
        } else {
          root.classList.add("is-on-light");
          root.classList.remove("is-on-dark");
        }
      }
    };

    const onPointerMove = (e) => {
      root.classList.add("is-visible");
      lastX = e.clientX;
      lastY = e.clientY;

      chX(e.clientX);
      chY(e.clientY);
      frX(e.clientX);
      frY(e.clientY);

      // Dynamically detect background luminance under pointer
      updateTone(e.target);

      // Magnetic attraction for .mag targets
      if (activeMag) {
        const rect = activeMag.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        gsap.to(activeMag, {
          x: dx * 0.26,
          y: dy * 0.32,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onScroll = () => {
      if (!lastX && !lastY) return;
      const el = document.elementFromPoint(lastX, lastY);
      if (el) updateTone(el);
    };

    const onPointerDown = () => {
      root.classList.add("is-down");
      gsap.to(crosshair, { rotation: 45, scale: 0.85, duration: 0.12, ease: "power2.out" });
      gsap.to(frame, { scale: 0.78, duration: 0.12, ease: "power2.out" });
    };

    const onPointerUp = () => {
      root.classList.remove("is-down");
      gsap.to(crosshair, { rotation: 0, scale: 1, duration: 0.35, ease: "elastic.out(1.2, 0.4)" });
      gsap.to(frame, { scale: 1, duration: 0.35, ease: "elastic.out(1.2, 0.4)" });
    };

    const onPointerOver = (e) => {
      const target = e.target;
      if (!target || !target.closest) return;

      updateTone(target);

      const cursorEl = target.closest("[data-cursor]");
      if (cursorEl) {
        const text = cursorEl.getAttribute("data-cursor") || "VIEW";
        label.textContent = text;
        root.classList.add("is-labeled");
      } else {
        root.classList.remove("is-labeled");
      }

      const clickable = target.closest("a, button, [role='button'], [role='tab'], input, select");
      if (clickable && !cursorEl) {
        root.classList.add("is-clickable");
      } else {
        root.classList.remove("is-clickable");
      }

      const magTarget = target.closest(".mag");
      if (magTarget !== activeMag) {
        if (activeMag) {
          gsap.to(activeMag, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)", overwrite: "auto" });
        }
        activeMag = magTarget || null;
      }
    };

    const onPointerLeave = () => {
      root.classList.remove("is-visible", "is-labeled", "is-clickable", "is-down");
      if (activeMag) {
        gsap.to(activeMag, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)", overwrite: "auto" });
        activeMag = null;
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerleave", onPointerLeave);
      if (activeMag) {
        gsap.set(activeMag, { x: 0, y: 0 });
      }
    };
  }, []);

  return (
    <div ref={rootRef} className="reticle-cursor" aria-hidden="true">
      {/* Precision dual-contour drafting crosshair (never vanishes on any background) */}
      <div ref={crosshairRef} className="reticle-crosshair">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          {/* Outer high-contrast casing line */}
          <line x1="10" y1="2" x2="10" y2="18" stroke="var(--reticle-casing)" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="2" y1="10" x2="18" y2="10" stroke="var(--reticle-casing)" strokeWidth="3.2" strokeLinecap="round" />
          <rect x="7" y="7" width="6" height="6" fill="var(--reticle-casing)" rx="1" />

          {/* Inner precision hairline core */}
          <line x1="10" y1="2" x2="10" y2="18" stroke="var(--reticle-core)" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="2" y1="10" x2="18" y2="10" stroke="var(--reticle-core)" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="8.5" y="8.5" width="3" height="3" fill="var(--reticle-core)" />
        </svg>
      </div>

      {/* Trailing architectural corner viewfinder frame */}
      <div ref={frameRef} className="reticle-frame">
        <span className="reticle-corner reticle-corner--tl" />
        <span className="reticle-corner reticle-corner--tr" />
        <span className="reticle-corner reticle-corner--bl" />
        <span className="reticle-corner reticle-corner--br" />
        <span ref={labelRef} className="reticle-label" />
      </div>
    </div>
  );
}
