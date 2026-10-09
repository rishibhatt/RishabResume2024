import { useEffect, useRef } from "react";
import { gsap, Draggable, useGSAP, reduceMotion } from "./gsap";
import { SERVICES, wa } from "./data";
import { WhatsAppIcon, ArrowDown } from "./icons";

const LINES = [
  [{ t: "I" }, { t: "turn" }, { t: "ideas" }],
  [{ t: "into" }, { t: "products" }],
  [{ t: "people", hl: true }, { t: "pay", hl: true }, { t: "for.", hl: true }],
];

/* Sticky-note idea board: each note is a thing a client can ask for. Drag to play, tap to ask. */
const NOTES = [
  { i: 0, x: 1, y: 2, r: -4, tone: "paper" },
  { i: 1, x: 52, y: 0, r: 3, tone: "mint" },
  { i: 2, x: 6, y: 33, r: 3, tone: "ink" },
  { i: 3, x: 53, y: 31, r: -3, tone: "blue" },
  { i: 4, x: 0, y: 64, r: -3, tone: "mint" },
  { i: 5, x: 50, y: 62, r: 4, tone: "paper" },
];

function useDotField(canvas, host) {
  useEffect(() => {
    const c = canvas.current;
    const ctx = c.getContext("2d");
    const GAP = 30;
    let w = 0, h = 0, dots = [], raf = 0, visible = true;
    const mouse = { x: -999, y: -999 };
    const css = getComputedStyle(document.documentElement);
    const base = css.getPropertyValue("--line").trim();
    const hot = css.getPropertyValue("--accent").trim();
    const still = reduceMotion();

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < h; y += GAP)
        for (let x = GAP / 2; x < w; x += GAP) dots.push([x, y]);
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const [x, y] of dots) {
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const d = Math.hypot(dx, dy) || 1;
        const f = Math.max(0, 1 - d / 170);
        const wave = still ? 0 : Math.sin(t / 900 + x * 0.012 + y * 0.01) * 0.35;
        const r = Math.max(0.6, 1.25 + wave + f * 2.4);
        const px = x + (dx / d) * f * 16;
        const py = y + (dy / d) * f * 16;
        ctx.globalAlpha = 1;
        ctx.fillStyle = base;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, 6.283);
        ctx.fill();
        if (f > 0.02) {
          ctx.globalAlpha = f;
          ctx.fillStyle = hot;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, 6.283);
          ctx.fill();
        }
      }
    };

    const loop = (t) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -999;
    };

    build();
    draw(0);
    if (!still) raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(host.current);
    const ro = new ResizeObserver(() => {
      build();
      draw(0);
    });
    ro.observe(c);
    const el = host.current;
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [canvas, host]);
}

export default function Hero({ ready }) {
  const root = useRef(null);
  const canvas = useRef(null);
  const board = useRef(null);
  useDotField(canvas, root);

  // draggable notes
  useGSAP(
    () => {
      const notes = gsap.utils.toArray(".note", board.current);
      gsap.set(notes, { rotation: (i, el) => +el.dataset.r });
      const drags = Draggable.create(notes, {
        type: "x,y",
        bounds: board.current,
        edgeResistance: 0.8,
        onPress() {
          gsap.to(this.target, { scale: 1.06, rotation: 0, boxShadow: "0 24px 40px -18px rgba(10,20,50,.45)", duration: 0.25 });
          notes.forEach((n) => (n.style.zIndex = n === this.target ? 20 : 1));
        },
        onRelease() {
          gsap.to(this.target, { scale: 1, rotation: +this.target.dataset.r, boxShadow: "0 10px 22px -14px rgba(10,20,50,.4)", duration: 0.4, ease: "back.out(2)" });
        },
        onClick() {
          window.open(this.target.dataset.href, "_blank", "noopener");
        },
      });
      return () => drags.forEach((d) => d.kill());
    },
    { scope: board }
  );

  useGSAP(
    () => {
      if (!ready || reduceMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero .wi", { yPercent: 115, rotate: 5, duration: 1.1, stagger: 0.06 })
        .from("[data-in='chip']", { opacity: 0, y: 16, duration: 0.7 }, "<0.1")
        .to(".hl", { "--hl": "100%", duration: 0.9, ease: "power3.inOut", stagger: 0.12 }, "-=0.4")
        .from("[data-in='sub']", { opacity: 0, y: 24, duration: 0.8 }, "-=0.8")
        .from("[data-in='cta'] > *", { opacity: 0, y: 24, duration: 0.7, stagger: 0.08 }, "-=0.6")
        .from(".note", { y: 140, opacity: 0, rotation: () => gsap.utils.random(-25, 25), duration: 1.1, stagger: 0.09, ease: "back.out(1.4)" }, "-=1.2")
        .from(".board__hint", { opacity: 0, duration: 0.6 }, "-=0.3");

      // idle bob on inner wrapper so it never fights dragging
      gsap.utils.toArray(".note__in").forEach((el, i) => {
        gsap.to(el, { y: gsap.utils.random(-6, 6), rotate: gsap.utils.random(-1.5, 1.5), duration: gsap.utils.random(2.2, 3.4), ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.15 });
      });
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section ref={root} id="top" className="hero">
      <canvas ref={canvas} className="hero__field" aria-hidden="true" />
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <div className="hello" data-in="chip">
            <img src="/pfp.png" alt="Rishab Bhatt" width="52" height="52" />
            <span>hi, I'm Rishab</span>
          </div>
          <h1 className="hero__h1" aria-label="I turn ideas into products people pay for.">
            {LINES.map((line, li) => (
              <span className="hero__line" key={li} aria-hidden="true">
                {line.map((w, wi) => (
                  <span className="w" key={wi}>
                    <span className={`wi ${w.hl ? "hl" : ""}`}>{w.t}</span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="hero__sub" data-in="sub">
            No tech background needed. Tell me what you want to sell, show or launch, and I'll design it, build it and put it
            online.
          </p>
          <div className="hero__cta" data-in="cta">
            <a
              className="btn btn--wa btn--lg mag"
              href={wa("Hi Rishab, I found you through your portfolio and I'd like to talk about a project.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon /> Message me on WhatsApp
            </a>
            <a className="btn btn--ghost btn--lg mag" href="#work">
              See the work <ArrowDown />
            </a>
          </div>
        </div>

        <div className="board" ref={board}>
          {NOTES.map((n) => {
            const s = SERVICES[n.i];
            return (
              <div
                key={s.n}
                className={`note note--${n.tone}`}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                data-r={n.r}
                data-href={wa(`Hi Rishab, I'm looking for ${s.topic}. Can we talk?`)}
                data-cursor="Ask"
                role="link"
                tabIndex={0}
                aria-label={`${s.title}. Opens WhatsApp`}
                onKeyDown={(e) => e.key === "Enter" && window.open(e.currentTarget.dataset.href, "_blank", "noopener")}
              >
                <div className="note__in">
                  <strong>{s.title}</strong>
                  <span>{s.plain.split(",")[0].replace(/\.$/, "")}</span>
                </div>
              </div>
            );
          })}
          <p className="board__hint">
            <svg viewBox="0 0 60 40" width="54" height="36" aria-hidden="true">
              <path d="M4 6 C20 2 44 8 52 30 M52 30 L40 26 M52 30 L54 17" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Drag me around. Tap one to ask about it.
          </p>
        </div>
      </div>
      <a href="#work" className="hero__scroll" aria-label="Scroll to work">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  );
}
