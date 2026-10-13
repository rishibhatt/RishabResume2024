import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { wa } from "./data";
import { WhatsAppIcon } from "./icons";

export default function Nav({ ready }) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 24);
      setHidden(!open && y > 400 && y > last.current + 6);
      if (y < last.current - 6 || y < 400) setHidden(false);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav ${ready ? "is-ready" : ""} ${solid || open ? "is-solid" : ""} ${hidden ? "is-hidden" : ""} ${open ? "is-open" : ""}`}>
      <div className="wrap nav__in">
        <Link to="/" className="nav__logo" aria-label="Rishab Bhatt, home">
          Rishab Bhatt <small>Product engineer</small>
        </Link>
        <button type="button" className="nav__burger" aria-expanded={open} aria-controls="menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          <i />
        </button>
        <nav id="menu" className="nav__links" aria-label="Primary">
          <Link to="/work">Work</Link>
          <Link to="/#offer">Buy a website</Link>
          <Link to="/#services">Services</Link>
          <Link to="/#proof">Activity</Link>
          <Link to="/#contact">Contact</Link>
          <a
            className="btn btn--accent btn--sm"
            href={wa("Hi Rishab, I found you through your portfolio and I'd like to talk about a project.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> Message me
          </a>
        </nav>
      </div>
    </header>
  );
}
