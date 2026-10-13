import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from "./gsap";
import { EMAIL, LINKS, SERVICES, wa, mail } from "./data";
import { WhatsAppIcon, Arrow } from "./icons";
import Signature from "./Signature";
import Split from "./Split";

const TYPES = ["Hiring for a role", ...SERVICES.map((s) => s.title), "A school website", "Not sure yet"];

export default function Contact() {
  const root = useRef(null);
  const sig = useRef(null);
  const [type, setType] = useState(TYPES[1]);
  const [note, setNote] = useState("");

  const hiring = type === "Hiring for a role";
  const body = hiring
    ? `Hi Rishab, I'm hiring and I found your portfolio.${note.trim() ? " " + note.trim() : ""}`
    : `Hi Rishab, I found your portfolio. I'm looking for: ${type.toLowerCase()}.${note.trim() ? " " + note.trim() : ""}`;
  const subject = hiring ? "Role enquiry from your portfolio" : `Project enquiry: ${type}`;

  useGSAP(
    () => {
      if (reduceMotion()) {
        root.current.querySelector(".sig")?.classList.add("sig--done");
        return;
      }
      ScrollTrigger.create({ trigger: ".contact__sign", start: "top 88%", once: true, onEnter: () => sig.current?.play() });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="contact" className="sec contact">
      <div className="wrap">
        <p className="eyebrow">Contact</p>
        <Split className="display contact__title" lines={["Have a project,", "or a role in mind?"]} />

        <div className="contact__grid">
          <div>
            <fieldset>
              <legend>What is it about</legend>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {TYPES.map((t) => (
                  <label key={t} className={`chip ${type === t ? "is-on" : ""}`}>
                    <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="field">
              <span>One line about it (optional)</span>
              <input type="text" value={note} maxLength={160} onChange={(e) => setNote(e.target.value)} placeholder={hiring ? "A frontend role, remote, starting next month" : "A booking site for my studio, live by March"} />
            </label>
            <div className="contact__send">
              <a className="btn btn--accent btn--lg" href={wa(body)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Send on WhatsApp
              </a>
              <a className="btn btn--light btn--lg" href={mail(subject, `${body}\n\nName:\nCompany:\n`)}>
                Send by email
              </a>
            </div>
          </div>

          <div className="msg" aria-live="polite">
            <div className="msg__who">
              <img src="/pfp.png" alt="" width="48" height="48" />
              <p>
                <b>Rishab Bhatt</b>
                <span>This is the message I will receive</span>
              </p>
            </div>
            <p className="msg__bubble">{body}</p>
            <div className="msg__alt">
              <a href={`mailto:${EMAIL}`}>{EMAIL} <Arrow width="14" height="14" /></a>
              <a href={LINKS.cv} target="_blank" rel="noopener noreferrer">Download résumé <Arrow width="14" height="14" /></a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow width="14" height="14" /></a>
            </div>
          </div>
        </div>

        <div className="contact__sign">
          <Signature ref={sig} className="sig--contact" />
        </div>
      </div>
    </section>
  );
}
