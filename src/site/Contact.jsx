import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from "./gsap";
import { EMAIL, LINKS, wa } from "./data";
import { WhatsAppIcon, Arrow } from "./icons";
import Signature from "./Signature";

const TYPES = ["An online store", "A portfolio", "A landing page", "A business website", "An AI tool", "Not sure yet"];

export default function Contact() {
  const root = useRef(null);
  const sig = useRef(null);
  const [type, setType] = useState(TYPES[0]);
  const [note, setNote] = useState("");

  const msg = `Hi Rishab, I found you through your portfolio. I'm looking for: ${type.toLowerCase()}.${note.trim() ? " " + note.trim() : ""}`;

  useGSAP(
    () => {
      gsap.from(".ct__title span", {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ct__title", start: "top 85%", once: true },
      });
      if (reduceMotion()) {
        root.current.querySelector(".sig").classList.add("sig--done");
        return;
      }
      ScrollTrigger.create({
        trigger: ".ct__sign",
        start: "top 85%",
        once: true,
        onEnter: () => sig.current.play(),
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="contact" className="ct">
      <div className="wrap">
        <h2 className="ct__title">
          <span>Got something</span> <span>to build?</span>
        </h2>

        <div className="ct__grid">
          <div className="ct__form">
            <fieldset>
              <legend>I want to build</legend>
              <div className="ct__chips">
                {TYPES.map((t) => (
                  <label key={t} className={type === t ? "is-on" : ""}>
                    <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="ct__note">
              <span>One line about it (optional)</span>
              <input
                type="text"
                value={note}
                maxLength={140}
                onChange={(e) => setNote(e.target.value)}
                placeholder="A booking site for my studio, launching in March"
              />
            </label>
            <a className="btn btn--wa btn--xl mag" href={wa(msg)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon width="22" height="22" /> Send on WhatsApp
            </a>
          </div>

          <div className="ct__preview" aria-live="polite">
            <div className="ct__who">
              <img src="/pfp.png" alt="" width="52" height="52" />
              <p>
                <b>Rishab Bhatt</b>
                <span>This is the message I'll get</span>
              </p>
            </div>
            <p className="ct__bubble">{msg}</p>
            <ul className="ct__alt">
              <li>
                <a href={`mailto:${EMAIL}`}>
                  {EMAIL} <Arrow width="16" height="16" />
                </a>
              </li>
              <li>
                <a href={LINKS.cv} target="_blank" rel="noopener noreferrer">
                  Download résumé <Arrow width="16" height="16" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="ct__sign">
          <Signature ref={sig} className="sig--contact" />
        </div>
      </div>
    </section>
  );
}
