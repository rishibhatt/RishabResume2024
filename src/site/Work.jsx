import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from "./gsap";
import { PROJECTS } from "./data";
import { Arrow } from "./icons";
import Split from "./Split";

const TYPE_LABEL = { product: "For sale", personal: "Personal", client: "Client work" };
const pad = (n) => String(n + 1).padStart(2, "0");

/** Selected-work index. Add a project to data.js and it appears here, filter included. */
export function WorkIndex({ limit, id = "work", showHead = true }) {
  const root = useRef(null);
  const peek = useRef(null);
  const [filter, setFilter] = useState("all");

  const types = useMemo(() => [...new Set(PROJECTS.map((p) => p.type))], []);
  const all = PROJECTS.map((p, i) => ({ ...p, i }));
  const filtered = filter === "all" ? all : all.filter((p) => p.type === filter);
  const list = limit ? filtered.slice(0, limit) : filtered;

  useGSAP(
    () => {
      if (reduceMotion()) return;
      gsap.from(root.current.querySelectorAll(".row"), {
        y: 28,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current.querySelector(".index"), start: "top 85%", once: true },
      });
    },
    { scope: root, dependencies: [filter] }
  );

  // hover preview that follows the pointer (desktop only)
  useGSAP(
    () => {
      const fine = window.matchMedia("(hover: hover) and (min-width: 961px)").matches;
      if (!fine || reduceMotion()) return;
      const el = peek.current;
      const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      const index = root.current.querySelector(".index");
      const imgs = el.querySelectorAll("img");
      const move = (e) => {
        x(e.clientX + 28);
        y(e.clientY - el.offsetHeight / 2);
      };
      const enter = (e) => {
        const link = e.target.closest(".row__link");
        if (!link) return;
        const i = +link.dataset.i;
        imgs.forEach((im, k) => gsap.to(im, { autoAlpha: k === i ? 1 : 0, duration: 0.25, overwrite: true }));
        gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
      };
      const leave = () => gsap.to(el, { autoAlpha: 0, scale: 0.94, duration: 0.25, overwrite: "auto" });
      gsap.set(el, { scale: 0.94 });
      index.addEventListener("pointermove", move);
      index.addEventListener("pointerover", enter);
      index.addEventListener("pointerleave", leave);
      return () => {
        index.removeEventListener("pointermove", move);
        index.removeEventListener("pointerover", enter);
        index.removeEventListener("pointerleave", leave);
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} id={id} className="sec work">
      <div className="wrap">
        {showHead && (
          <header className="work__head">
            <div>
              <p className="eyebrow">Selected work</p>
              <Split className="display h2" text="Products I designed, built and shipped." />
            </div>
            {limit && PROJECTS.length > limit && (
              <Link className="link" to="/work" style={{ justifySelf: "end" }}>
                All {PROJECTS.length} projects <Arrow width="16" height="16" />
              </Link>
            )}
          </header>
        )}

        {types.length > 1 && (
          <div className="filters" role="group" aria-label="Filter projects">
            <button type="button" className={`chip ${filter === "all" ? "is-on" : ""}`} aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
              All ({PROJECTS.length})
            </button>
            {types.map((t) => (
              <button key={t} type="button" className={`chip ${filter === t ? "is-on" : ""}`} aria-pressed={filter === t} onClick={() => setFilter(t)}>
                {TYPE_LABEL[t] || t} ({PROJECTS.filter((p) => p.type === t).length})
              </button>
            ))}
          </div>
        )}

        <ul className="index">
          {list.map((p) => (
            <li className="row" key={p.id}>
              <Link className="row__link" to={`/work/${p.id}`} data-i={p.i}>
                <span className="row__n">{pad(p.i)}</span>
                <span className="row__name">{p.name}</span>
                <span className="row__meta">
                  <span className="row__tags">
                    {p.type === "product" ? <span className="badge">For sale</span> : <span className="badge badge--quiet">{TYPE_LABEL[p.type] || p.type}</span>}
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </span>
                  <p>{p.line}</p>
                </span>
                <span className="row__arrow" aria-hidden="true">
                  <Arrow width="20" height="20" />
                </span>
                <span className="row__thumb" aria-hidden="true">
                  <img src={p.d} alt="" width="1440" height="900" loading="lazy" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div ref={peek} className="peek" aria-hidden="true">
        {PROJECTS.map((p) => (
          <img key={p.id} src={p.d} alt="" width="1440" height="900" style={{ opacity: 0, visibility: "hidden" }} />
        ))}
      </div>
    </section>
  );
}

export default WorkIndex;
