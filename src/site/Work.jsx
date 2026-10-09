import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from "./gsap";
import { PROJECTS, STACK, wa } from "./data";
import { Arrow, WhatsAppIcon } from "./icons";

export function Tape() {
  const root = useRef(null);
  useGSAP(
    () => {
      const t = gsap.to(".tape__row", { xPercent: -50, duration: 36, ease: "none", repeat: -1 });
      ScrollTrigger.create({
        trigger: root.current,
        onUpdate: (s) =>
          gsap.to(t, { timeScale: 1 + Math.abs(s.getVelocity()) / 400, duration: 0.2, overwrite: true }),
      });
    },
    { scope: root }
  );
  const items = [...STACK, ...STACK, ...STACK, ...STACK];
  return (
    <div ref={root} className="tape" aria-hidden="true">
      <div className="tape__row">
        {items.map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function Info({ p }) {
  const [mode, setMode] = useState("plain");
  const panel = useRef(null);
  const swap = (m) => {
    if (m === mode) return;
    setMode(m);
    gsap.fromTo(panel.current.children, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" });
  };
  return (
    <div className="case__info">
      <p className="case__kind">
        <span>{p.n}</span> {p.kind}
      </p>
      <h3 className="case__name">{p.name}</h3>
      <p className="case__tag">{p.tagline}</p>
      <div className="seg" role="group" aria-label="Explain it">
        <button type="button" className={mode === "plain" ? "is-on" : ""} onClick={() => swap("plain")} aria-pressed={mode === "plain"}>
          In plain words
        </button>
        <button type="button" className={mode === "tech" ? "is-on" : ""} onClick={() => swap("tech")} aria-pressed={mode === "tech"}>
          Under the hood
        </button>
      </div>
      <div ref={panel} className="case__panel">
        {mode === "plain" ? (
          <>
            <p className="case__body">{p.plain}</p>
            <ul className="case__points">
              {p.wins.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="case__body">{p.body}</p>
            <ul className="case__points">
              {p.points.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <ul className="case__tech" aria-label="Built with">
              {p.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="case__cta">
        <a
          className="btn btn--wa mag"
          href={wa(`Hi Rishab, I saw ${p.name} on your portfolio and I'd like something like it for my own idea.`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon /> I want one like this
        </a>
        <a className="btn btn--wa-ghost mag" href={p.url} target="_blank" rel="noopener noreferrer">
          Visit {p.domain} <Arrow />
        </a>
      </div>
    </div>
  );
}

function Mock({ p }) {
  const box = useRef(null);

  // pointer tilt (desktop only)
  useGSAP(
    () => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || reduceMotion()) return;
      const el = box.current;
      const rx = gsap.quickTo(el.querySelector(".mock__tilt"), "rotationX", { duration: 0.6, ease: "power3" });
      const ry = gsap.quickTo(el.querySelector(".mock__tilt"), "rotationY", { duration: 0.6, ease: "power3" });
      const px = gsap.quickTo(el.querySelector(".mock__phone"), "x", { duration: 0.8, ease: "power3" });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        ry(nx * 8);
        rx(ny * -6);
        px(nx * 26);
      };
      const leave = () => {
        rx(0);
        ry(0);
        px(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: box }
  );

  return (
    <a
      ref={box}
      className="mock"
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Open site"
      aria-label={`Open ${p.name} at ${p.domain}`}
    >
      <span className="mock__tilt">
        <img className="mock__desk" src={p.d} alt={`${p.name} on desktop`} width="1440" height="900" loading="lazy" />
        <img className="mock__phone" src={p.m} alt={`${p.name} on a phone`} width="390" height="844" loading="lazy" />
      </span>
    </a>
  );
}

export default function Work() {
  const root = useRef(null);

  useGSAP(
    () => {
      const still = reduceMotion();
      gsap.utils.toArray(".case").forEach((c) => {
        if (still) return;
        const desk = c.querySelector(".mock__desk");
        const phone = c.querySelector(".mock__phone");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: c, start: "top 75%", once: true },
          defaults: { ease: "expo.out" },
        });
        tl.from(c.querySelectorAll(".case__info > *"), { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.07 })
          .from(desk, { clipPath: "inset(0 0 100% 0)", yPercent: 6, duration: 1.2 }, 0.1)
          .from(phone, { yPercent: 40, autoAlpha: 0, duration: 1.1 }, 0.5);
        // phone drifts against the page as you scroll
        gsap.to(phone, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: c, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
        gsap.to(c.querySelector(".case__ghost"), {
          yPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: c, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="work" className="work">
      <div className="wrap">
        <header className="work__head">
          <h2 className="eyebrow">Things I've built</h2>
          <p className="work__lede">Three products, live right now. Each one started as a rough idea.</p>
        </header>
        {PROJECTS.map((p) => (
          <article className="case" key={p.id} style={{ "--pa": p.hue }}>
            <span className="case__ghost" aria-hidden="true">
              {p.n}
            </span>
            <Info p={p} />
            <Mock p={p} />
          </article>
        ))}
        <div className="work__end">
          <p>Like what you see? Yours could be next.</p>
          <a
            className="btn btn--wa btn--lg mag"
            href={wa("Hi Rishab, I looked through your work and I'd like to start a project.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> Start yours on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
