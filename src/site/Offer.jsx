import { useRef, useState } from "react";
import { gsap, useGSAP, reduceMotion } from "./gsap";
import { PROJECTS, OFFER, PRODUCT_STEPS, PRODUCT_FAQ, wa, mail } from "./data";
import { Arrow, WhatsAppIcon, CheckIcon } from "./icons";
import Quote, { detectINR } from "./Quote";
import Split from "./Split";

function Product({ p, onQuote }) {
  const [inr, setInr] = useState(detectINR);
  const pk = p.quote.packages;
  return (
    <div className="offer__grid">
      <div className="offer__media">
        <a className="shots" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Open the ${p.name} live demo`}>
          <img className="shots__d" src={p.d} alt={`${p.name} on a computer`} width="1440" height="900" loading="lazy" />
          <img className="shots__m" src={p.m} alt={`${p.name} on a phone`} width="390" height="844" loading="lazy" />
        </a>
        <p className="offer__demo">
          The demo is live.
          <a className="link" href={p.url} target="_blank" rel="noopener noreferrer">
            Open {p.domain} <Arrow width="14" height="14" />
          </a>
        </p>
      </div>

      <div className="offer__body">
        <p className="offer__lead">{p.plain}</p>

        <div>
          <h3 className="eyebrow" style={{ marginBottom: "0.9rem" }}>What you get</h3>
          <ul className="stack">
            {OFFER.bonuses.map((b) => (
              <li key={b.t}>
                <CheckIcon width="16" height="16" />
                <span>
                  <b>{b.t}.</b> {b.d}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="pricehead">
            <h3>Pick a package</h3>
            <div className="seg" role="group" aria-label="Currency">
              <button type="button" className={!inr ? "is-on" : ""} aria-pressed={!inr} onClick={() => setInr(false)}>USD</button>
              <button type="button" className={inr ? "is-on" : ""} aria-pressed={inr} onClick={() => setInr(true)}>INR</button>
            </div>
          </div>
          <div className="tiers" style={{ marginTop: "1.1rem" }}>
            {pk.map((k, i) => (
              <button key={k.id} type="button" className={`tier ${k.popular ? "is-pop" : ""}`} onClick={() => onQuote(p, k.id)}>
                {k.popular && <em>Recommended</em>}
                <strong>{k.name}</strong>
                <small>{k.desc}</small>
                <span className="tier__price">
                  <i>{i === pk.length - 1 ? "from · " : ""}live in {k.timeline.replace(" business days", " days")}</i>
                  {inr ? k.priceINR : k.priceUSD}
                </span>
              </button>
            ))}
          </div>
          <p className="fine" style={{ marginTop: "0.9rem" }}>
            One-time price. {p.quote.payment} Domain, SSL and launch are included.
          </p>
        </div>

        <div className="guarantee">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
          <p>
            <b>Timeline guarantee</b>
            {OFFER.guarantee}
          </p>
        </div>

        <div className="offer__cta">
          <button type="button" className="btn btn--accent btn--lg" onClick={() => onQuote(p)}>
            Build my quote
          </button>
          <a
            className="btn btn--lg"
            href={wa("Hi Rishab, I want a website like H-12 for my school. Can we talk about the right package?")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> Ask on WhatsApp
          </a>
          <a className="btn btn--lg" href={mail("Website for my school", "Hi Rishab,\n\nI'm interested in the H-12 school website.\n\nSchool name:\nCity:\nQuestions:\n")}>
            Email me
          </a>
        </div>

        <div className="free">
          <p>Not ready to buy? {OFFER.free}</p>
          <a
            className="btn btn--light btn--sm"
            href={wa("Hi Rishab, here is my school's website link. Please tell me the three changes that would bring in more admission enquiries: ")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> Send my link
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Offer() {
  const root = useRef(null);
  const [quote, setQuote] = useState(null);
  const products = PROJECTS.filter((p) => p.type === "product" && p.quote);

  useGSAP(
    () => {
      if (reduceMotion()) return;
      const once = (trigger) => ({ trigger, start: "top 82%", once: true });
      gsap.from(".offer .shots__d", { clipPath: "inset(0 0 100% 0)", duration: 1.3, ease: "expo.out", scrollTrigger: once(".offer__grid") });
      gsap.from(".offer .shots__m", { yPercent: 30, autoAlpha: 0, duration: 1.1, delay: 0.2, ease: "expo.out", scrollTrigger: once(".offer__grid") });
      gsap.from(".stack li", { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.07, ease: "power3.out", scrollTrigger: once(".stack") });
      gsap.from(".tier", { y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: once(".tiers") });
      gsap.from(".how li", { y: 28, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: once(".how") });
    },
    { scope: root }
  );

  if (!products.length) return null;

  return (
    <section ref={root} id="offer" className="sec offer">
      <div className="wrap">
        <header className="offer__head">
          <div>
            <p className="eyebrow">For sale · Websites for schools</p>
            <Split className="display offer__title" text="A school website that turns parents into admission enquiries." />
          </div>
          <p className="lede">
            Parents compare schools online before they call. {OFFER.name} is finished and tested, so you skip the build and go
            straight to launch. Admissions season has a date, and the site should be live before it.
          </p>
        </header>

        {products.map((p) => (
          <Product key={p.id} p={p} onQuote={(proj, id) => setQuote({ proj, id })} />
        ))}

        <ol className="how">
          {PRODUCT_STEPS.map((s, i) => (
            <li key={s.t}>
              <span>0{i + 1}</span>
              <strong>{s.t}</strong>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>

        <div className="faq">
          <h3 className="display" style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)" }}>Questions people ask first</h3>
          <div>
            {PRODUCT_FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      {quote && <Quote project={quote.proj} initialPkg={quote.id} onClose={() => setQuote(null)} />}
    </section>
  );
}
