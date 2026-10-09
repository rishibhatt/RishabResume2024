import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { SERVICES, wa } from "./data";
import { Arrow, WhatsAppIcon } from "./icons";

export default function Services() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".svc__title span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".svc__title", start: "top 85%", once: true },
      });
      gsap.from(".svc__card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc__grid", start: "top 82%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="services" className="svc">
      <div className="wrap">
        <h2 className="svc__title">
          <span>What do you</span> <span>want to launch?</span>
        </h2>
        <p className="svc__lede">
          No tech background needed. Pick the closest one, or just tell me your idea in your own words. The grey tags are the
          technical terms, in case your developer asks.
        </p>
        <ul className="svc__grid">
          {SERVICES.map((s) => (
            <li key={s.n} className="svc__card">
              <a
                href={wa(`Hi Rishab, I'm looking for ${s.topic}. Can we talk?`)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Chat"
              >
                <span className="svc__n">{s.n}</span>
                <strong>{s.title}</strong>
                <em>{s.plain}</em>
                <span className="svc__tags">
                  {s.tech.map((t) => (
                    <i key={t}>{t}</i>
                  ))}
                </span>
                <span className="svc__go">
                  Ask about this <Arrow width="18" height="18" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="svc__not">
          <p>Not sure what you need? That's normal. Describe the problem and I'll tell you the simplest way to solve it.</p>
          <a
            className="btn btn--wa btn--lg mag"
            href={wa("Hi Rishab, I have an idea but I'm not sure what I need. Can I explain it to you?")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> Explain your idea on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
