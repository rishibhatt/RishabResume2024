import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP, reduceMotion } from "./gsap";
import { wa, mail, LINKS } from "./data";
import { Arrow, WhatsAppIcon } from "./icons";
import Split from "./Split";

export default function Hero({ ready }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (!ready || reduceMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero .wi", { yPercent: 110, duration: 1.2, stagger: 0.05 })
        .from(".hero [data-in]", { y: 22, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, "-=0.8")
        .from(".path", { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, "-=0.6");
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section ref={root} id="top" className="hero">
      <div className="wrap hero__top">
        <div>
          <p className="eyebrow" data-in>Rishab Bhatt · Independent product engineer · India</p>
          <Split as="h1" className="display hero__h1" text="Websites and products, built end to end." />
        </div>
        <div className="hero__side">
          <div className="hero__avatar" data-in>
            <img src="/pfp.png" alt="Rishab Bhatt" width="52" height="52" />
            <span>hi, I'm Rishab</span>
          </div>
          <p className="lede" data-in>
            Four years of shipping Next.js, AI and Web3 products. I take on freelance projects and full-time roles.
          </p>
          <div className="hero__cta" data-in>
            <a
              className="btn btn--accent btn--lg"
              href={wa("Hi Rishab, I found you through your portfolio and I'd like to talk about a project.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon /> Message on WhatsApp
            </a>
            <a className="btn btn--lg" href={mail("Project enquiry from your portfolio", "Hi Rishab,\n\nI found your portfolio and I'd like to talk about a project.\n\nWhat I need:\n")}>
              Send an email
            </a>
          </div>
        </div>
      </div>

      <div className="wrap">
        <nav className="paths" aria-label="Where to start">
          <Link className="path" to="/work">
            <span>If you are hiring</span>
            <strong>See the work and the stack</strong>
            <em>Four shipped products, how they were built, and my résumé.</em>
            <Arrow width="26" height="26" />
          </Link>
          <Link className="path" to="/#offer">
            <span>If you need a website</span>
            <strong>Buy a ready-made school site</strong>
            <em>Fixed packages, clear prices, live in 7 to 21 business days.</em>
            <Arrow width="26" height="26" />
          </Link>
        </nav>
      </div>
    </section>
  );
}
