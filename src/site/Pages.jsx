import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { gsap, useGSAP, reduceMotion } from "./gsap";
import { PROJECTS, wa, mail } from "./data";
import { Arrow, WhatsAppIcon, CheckIcon } from "./icons";
import Hero from "./Hero";
import { WorkIndex } from "./Work";
import Offer from "./Offer";
import Services from "./Services";
import Signal from "./Signal";
import Contact from "./Contact";
import Quote from "./Quote";
import Split from "./Split";

export function Home({ ready }) {
  return (
    <>
      <Hero ready={ready} />
      <WorkIndex limit={6} />
      <Offer />
      <Services />
      <Signal />
      <Contact />
    </>
  );
}

/* ───────── /work : every project, filterable ───────── */
export function WorkPage() {
  const root = useRef(null);
  useGSAP(
    () => {
      if (reduceMotion()) return;
      gsap.from(".page .wi", { yPercent: 110, duration: 1.1, stagger: 0.06, ease: "expo.out", delay: 0.1 });
      gsap.from(".page [data-in]", { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.4 });
    },
    { scope: root }
  );
  return (
    <div ref={root}>
      <section className="page">
        <div className="wrap">
          <p className="eyebrow" data-in>
            <Link to="/">Home</Link> / Work
          </p>
          <Split as="h1" className="display page__title" lines={["Selected work,", "and one thing for sale."]} />
          <p className="lede" data-in style={{ marginTop: "1.5rem" }}>
            Every project here is live. Open one for the story, the stack and what I would do differently for your idea.
          </p>
        </div>
      </section>
      <WorkIndex showHead={false} id="all" />
      <Contact />
    </div>
  );
}

/* ───────── /work/:id : one project ───────── */
export function ProjectPage() {
  const { id } = useParams();
  const root = useRef(null);
  const [quote, setQuote] = useState(null);
  const i = PROJECTS.findIndex((p) => p.id === id);
  const p = PROJECTS[i];
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  useGSAP(
    () => {
      if (reduceMotion() || !p) return;
      gsap.from(".pj .wi", { yPercent: 110, duration: 1.1, ease: "expo.out", delay: 0.1 });
      gsap.from(".pj [data-in]", { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.35 });
      gsap.from(".pj .shots__d", { clipPath: "inset(0 0 100% 0)", duration: 1.3, ease: "expo.out", delay: 0.4 });
      gsap.from(".pj .shots__m", { yPercent: 30, autoAlpha: 0, duration: 1.1, ease: "expo.out", delay: 0.8 });
    },
    { scope: root, dependencies: [id] }
  );

  if (!p) {
    return (
      <section className="pj">
        <div className="wrap">
          <h1 className="display page__title">Not found</h1>
          <p className="lede" style={{ marginTop: "1rem" }}>That project does not exist.</p>
          <Link className="btn btn--accent" style={{ marginTop: "1.5rem" }} to="/work">See all work</Link>
        </div>
      </section>
    );
  }

  const sale = p.type === "product";
  const d = p.docs;

  return (
    <article ref={root} className="pj">
      <div className="wrap">
        <p className="eyebrow pj__crumb" data-in>
          <Link to="/work">Work</Link> / {p.name}
        </p>
        <Split as="h1" className="display pj__title" text={p.name} />
        <p className="lede" data-in style={{ marginTop: "1.2rem", fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)", color: "var(--ink)" }}>
          {p.tagline}
        </p>

        <dl className="pj__meta" data-in>
          <div><dt>Status</dt><dd>{sale ? "For sale" : "Personal project"}</dd></div>
          <div><dt>Type</dt><dd>{p.kind}</dd></div>
          <div><dt>Stack</dt><dd>{p.tech.slice(0, 3).join(", ")}</dd></div>
          <div><dt>Live</dt><dd><a className="link" href={p.url} target="_blank" rel="noopener noreferrer">{p.domain} <Arrow width="14" height="14" /></a></dd></div>
        </dl>

        <a className="shots pj__hero" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.name} at ${p.domain}`}>
          <img className="shots__d" src={p.d} alt={`${p.name} on a computer`} width="1440" height="900" />
          <img className="shots__m" src={p.m} alt={`${p.name} on a phone`} width="390" height="844" />
        </a>

        <div className="pj__cols">
          <h2>What it is</h2>
          <div className="pj__prose">
            <p className="lead">{p.plain}</p>
            <ul className="stack">
              {p.wins.map((w) => (
                <li key={w}><CheckIcon width="16" height="16" /><span>{w}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pj__cols">
          <h2>How it is built</h2>
          <div className="pj__prose">
            <p>{p.body}</p>
            <ul className="stack">
              {p.points.map((w) => (
                <li key={w}><CheckIcon width="16" height="16" /><span>{w}</span></li>
              ))}
            </ul>
            <ul className="techchips" aria-label="Built with">
              {p.tech.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>

        {d && (
          <>
            <div className="pj__cols">
              <h2>The brief</h2>
              <div className="pj__prose">
                <p className="lead">{d.abstract}</p>
                <p><b>The problem.</b> {d.problem}</p>
                <p><b>The solution.</b> {d.solution}</p>
              </div>
            </div>
            <div className="pj__cols">
              <h2>Specification</h2>
              <dl className="pj__specs">
                {d.specs.map((s) => (
                  <div key={s.label}><dt>{s.label}</dt><dd>{s.val}</dd></div>
                ))}
              </dl>
            </div>
            {d.modules && (
              <div className="pj__cols">
                <h2>Modules</h2>
                <ul className="mods">
                  {d.modules.map((m) => (
                    <li key={m.title}><b>{m.title}</b><p>{m.desc}</p></li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <div className="pj__cols">
          <h2>{sale ? "Get this for your school" : `Want something like ${p.name}?`}</h2>
          <div className="pj__prose">
            <p>
              {sale
                ? "Pick a package, add what you need and see the total before you message me. Prices are fixed and you own the code."
                : "Tell me the idea in your own words. I will tell you the simplest way to build it, and what it would cost."}
            </p>
            <div className="offer__cta">
              {sale && <button type="button" className="btn btn--accent btn--lg" onClick={() => setQuote({ proj: p })}>Build my quote</button>}
              <a
                className={`btn btn--lg ${sale ? "" : "btn--accent"}`}
                href={wa(sale ? "Hi Rishab, I want this website for my school." : `Hi Rishab, I saw ${p.name} and I'd like something similar built.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon /> Message on WhatsApp
              </a>
              <a className="btn btn--lg" href={mail(sale ? "Website for my school" : `Something like ${p.name}`, "Hi Rishab,\n\n")}>
                Send an email
              </a>
            </div>
          </div>
        </div>

        <Link className="pj__next" to={`/work/${next.id}`}>
          <span className="mono" style={{ color: "var(--ink-mute)" }}>Next project</span>
          <strong>{next.name}</strong>
          <em>{next.tagline}</em>
          <Arrow width="34" height="34" />
        </Link>
      </div>
      <div style={{ height: "var(--rhythm)" }} />
      {quote && <Quote project={quote.proj} initialPkg={quote.id} onClose={() => setQuote(null)} />}
    </article>
  );
}
