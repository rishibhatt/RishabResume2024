import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, reduceMotion } from "./gsap";
import { LINKS, EMAIL, wa } from "./data";
import { Arrow, WhatsAppIcon } from "./icons";

const WORD = "RISHIEEE".split("");

function useIST() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true }));
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Footer() {
  const root = useRef(null);
  const time = useIST();

  useGSAP(
    () => {
      const letters = gsap.utils.toArray(".foot__l", root.current);
      if (reduceMotion()) return;
      gsap.from(letters, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.06,
        ease: "expo.out",
        scrollTrigger: { trigger: ".foot__word", start: "top 92%", once: true },
      });
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const word = root.current.querySelector(".foot__word");
      const setters = letters.map((l) => ({
        y: gsap.quickTo(l, "y", { duration: 0.5, ease: "power3" }),
        s: gsap.quickTo(l, "scaleY", { duration: 0.5, ease: "power3" }),
      }));
      const move = (e) => {
        letters.forEach((l, i) => {
          const r = l.getBoundingClientRect();
          const d = Math.abs(e.clientX - (r.left + r.width / 2));
          const f = Math.max(0, 1 - d / (r.width * 2.2));
          setters[i].y(-f * r.height * 0.14);
          setters[i].s(1 + f * 0.08);
        });
      };
      const leave = () => setters.forEach((s) => (s.y(0), s.s(1)));
      word.addEventListener("pointermove", move);
      word.addEventListener("pointerleave", leave);
      return () => {
        word.removeEventListener("pointermove", move);
        word.removeEventListener("pointerleave", leave);
      };
    },
    { scope: root }
  );

  return (
    <footer ref={root} className="foot">
      <div className="wrap">
        <div className="foot__top">
          <div className="foot__cta">
            <p>Your idea is already half the work.</p>
            <a
              className="btn btn--wa btn--lg mag"
              href={wa("Hi Rishab, I'd like to talk about an idea.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon /> Tell me about it
            </a>
          </div>
          <nav className="foot__cols" aria-label="Footer">
            <div>
              <h4>Say hi</h4>
              <a href={wa("Hi Rishab!")} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href={`mailto:${EMAIL}`}>Email</a>
              <a href={LINKS.cv} target="_blank" rel="noopener noreferrer">Résumé</a>
            </div>
            <div>
              <h4>Elsewhere</h4>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub <Arrow width="14" height="14" /></a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow width="14" height="14" /></a>
              <a href={LINKS.x} target="_blank" rel="noopener noreferrer">X <Arrow width="14" height="14" /></a>
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">Instagram <Arrow width="14" height="14" /></a>
            </div>
            <div>
              <h4>Right now</h4>
              <p className="foot__time">{time || " "}</p>
              <p className="foot__tz">in India (IST)</p>
            </div>
          </nav>
        </div>
      </div>

      <div className="foot__word" aria-hidden="true">
        {WORD.map((l, i) => (
          <span className="foot__mask" key={i}>
            <span className="foot__l">{l}</span>
          </span>
        ))}
      </div>

      <div className="wrap foot__bar">
        <p>© {new Date().getFullYear()} Rishab Bhatt.</p>
        <a href="#top" className="foot__up">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
