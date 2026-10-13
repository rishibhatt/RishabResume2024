import { useRef } from "react";
import { gsap, useGSAP, reduceMotion } from "./gsap";
import { SERVICES, wa } from "./data";
import { Arrow } from "./icons";
import Split from "./Split";

export default function Services() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (reduceMotion()) return;
      gsap.from(".svc__row", {
        y: 26,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc__list", start: "top 85%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="services" className="sec svc">
      <div className="wrap">
        <p className="eyebrow">Services</p>
        <Split className="display h2" style={{ marginTop: "1.2rem" }} text="What I build for clients." />
        <p className="lede" style={{ marginTop: "1.2rem" }}>
          No technical background needed. Describe what you want to sell, show or launch. The small grey tags are the technical
          terms, in case your developer asks.
        </p>
        <ul className="svc__list">
          {SERVICES.map((s, i) => (
            <li key={s.title}>
              <a
                className="svc__row"
                href={wa(`Hi Rishab, I'm looking for ${s.topic}. Can we talk?`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mono svc__n" style={{ color: "var(--ink-mute)" }}>0{i + 1}</span>
                <h3>{s.title}</h3>
                <span className="svc__d">
                  <p>{s.plain}</p>
                  <small>{s.tech.join(" · ")}</small>
                </span>
                <span className="row__arrow" aria-hidden="true">
                  <Arrow width="20" height="20" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
