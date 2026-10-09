import { useEffect, useRef, useState } from "react";
import { wa } from "./data";
import { WhatsAppIcon } from "./icons";

export default function Nav({ ready }) {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 240 && y > last.current + 4);
      if (y < last.current - 4 || y < 240) setHidden(false);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`nav ${ready ? "is-ready" : ""} ${hidden ? "is-hidden" : ""}`}
    >
      <a href="#top" className="nav__logo" aria-label="Rishab Bhatt, back to top">
        rishieee
      </a>
      <nav className="nav__links" aria-label="Primary">
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#signal">Signal</a>
      </nav>
      <a
        className="btn btn--wa btn--sm mag"
        href={wa("Hi Rishab, I found you through your portfolio and I'd like to talk about a project.")}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon /> WhatsApp
      </a>
    </header>
  );
}
