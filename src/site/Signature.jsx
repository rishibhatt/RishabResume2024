import { forwardRef, useImperativeHandle, useRef } from "react";
import { gsap } from "./gsap";

const FACE = {
  ring: "M52 7 C76 6 94 26 92 51 C90 75 72 93 48 92 C25 91 7 73 8 49 C9 26 28 9 56 10",
  eyeL: "M36 37 L36 48",
  eyeR: "M58 45 Q64 35 71 44",
  smile: "M27 61 C37 80 63 80 73 59",
};

/**
 * Handwritten signature. A pen nib travels along the word, ink is revealed
 * behind it letter by letter, then it draws a smiley and an underline.
 * Call ref.play() to get a GSAP timeline. Pass `done` to render it finished.
 */
const Signature = forwardRef(function Signature(
  { text = "rishieee", className = "", done = false },
  ref
) {
  const root = useRef(null);
  const word = useRef(null);
  const ink = useRef(null);
  const pen = useRef(null);
  const face = useRef(null);
  const under = useRef(null);

  useImperativeHandle(ref, () => ({
    play() {
      const r = root.current;
      const w = word.current;
      const p = pen.current;
      const n = text.length;
      const wl = w.offsetLeft;
      const ww = w.offsetWidth;
      const base = w.offsetTop + w.offsetHeight * 0.74;
      const state = { p: 0 };
      const tl = gsap.timeline();

      gsap.set(ink.current, { clipPath: "inset(-30% 100% -30% -6%)" });
      gsap.set(r.querySelectorAll(".sig__stroke"), { opacity: 0 });
      gsap.set(p, { opacity: 0, x: wl - 4, y: base - 52, rotation: 0 });

      const movePen = (x, y, tilt = 0) =>
        gsap.set(p, { x: x - 4, y: y - 52, rotation: tilt });

      const applyWord = () => {
        const q = state.p;
        ink.current.style.clipPath = `inset(-30% ${(1 - q) * 100}% -30% -6%)`;
        const bob = Math.sin(q * n * Math.PI * 1.6) * 9;
        movePen(wl + q * ww, base - 6 + bob, Math.sin(q * n * 3) * 4);
      };

      const draw = (path, svg, dur, ease = "power1.inOut") => {
        const len = path.getTotalLength();
        const vb = svg.viewBox.baseVal;
        const sx = svg.offsetWidth / vb.width;
        const sy = svg.offsetHeight / vb.height;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        const o = { v: len };
        return gsap.to(o, {
          v: 0,
          duration: dur,
          ease,
          onStart() {
            path.style.opacity = 1;
          },
          onUpdate() {
            path.style.strokeDashoffset = o.v;
            const pt = path.getPointAtLength(len - o.v);
            movePen(
              svg.offsetLeft + pt.x * sx,
              svg.offsetTop + pt.y * sy,
              -6
            );
          },
        });
      };

      tl.to(p, { opacity: 1, duration: 0.25 });
      for (let i = 0; i < n; i++) {
        tl.to(
          state,
          {
            p: (i + 1) / n,
            duration: 0.15 + Math.random() * 0.07,
            ease: "sine.inOut",
            onUpdate: applyWord,
          },
          i === 0 ? ">" : ">+0.015"
        );
      }

      const fsvg = face.current;
      const [ring, eyeL, eyeR, smile] = fsvg.querySelectorAll("path");
      tl.add(draw(ring, fsvg, 0.6), ">+0.1");
      tl.add(draw(eyeL, fsvg, 0.12));
      tl.add(draw(eyeR, fsvg, 0.2));
      tl.add(draw(smile, fsvg, 0.3));

      const usvg = under.current;
      const swoosh = usvg.querySelector("path");
      tl.add(draw(swoosh, usvg, 0.5, "power2.out"), ">+0.05");
      tl.to(p, {
        opacity: 0,
        y: "-=30",
        x: "+=40",
        rotation: 18,
        duration: 0.45,
        ease: "power2.in",
      });
      return tl;
    },
  }));

  return (
    <span
      ref={root}
      className={`sig ${done ? "sig--done" : ""} ${className}`}
      role="img"
      aria-label={`${text} :)`}
    >
      <span ref={word} className="sig__word" aria-hidden="true">
        <span ref={ink} className="sig__ink">
          {text}
        </span>
      </span>
      <svg
        ref={face}
        className="sig__face"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {Object.values(FACE).map((d) => (
          <path key={d} d={d} className="sig__stroke" />
        ))}
      </svg>
      <svg
        ref={under}
        className="sig__under"
        viewBox="0 0 300 20"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M4 14 C60 4 140 18 296 6"
          className="sig__stroke"
        />
      </svg>
      <svg
        ref={pen}
        className="sig__pen"
        viewBox="0 0 56 56"
        aria-hidden="true"
      >
        <path
          d="M4 52 L10 34 L38 6 Q44 0 50 6 Q56 12 50 18 L22 46 Z"
          fill="var(--ink)"
        />
        <path d="M4 52 L10 34 L22 46 Z" fill="var(--accent)" />
        <path
          d="M14 34 L40 8"
          stroke="var(--paper)"
          strokeWidth="1.5"
          opacity=".5"
        />
      </svg>
    </span>
  );
});

export default Signature;
