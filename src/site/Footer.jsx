import { Link } from "react-router-dom";
import { LINKS, EMAIL, wa } from "./data";
import { scrollToTarget } from "./gsap";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__in">
          <div className="foot__brand">
            <b>Rishab Bhatt</b>
            <p>Independent product engineer. Websites, AI tools and web apps, designed and built end to end.</p>
          </div>
          <nav className="foot__cols" aria-label="Footer">
            <div>
              <h4>Pages</h4>
              <Link to="/work">Work</Link>
              <Link to="/#offer">Buy a website</Link>
              <Link to="/#services">Services</Link>
              <Link to="/#contact">Contact</Link>
            </div>
            <div>
              <h4>Reach me</h4>
              <a href={wa("Hi Rishab!")} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href={`mailto:${EMAIL}`}>Email</a>
              <a href={LINKS.cv} target="_blank" rel="noopener noreferrer">Résumé</a>
            </div>
            <div>
              <h4>Elsewhere</h4>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={LINKS.x} target="_blank" rel="noopener noreferrer">X</a>
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </nav>
        </div>
        <div className="foot__bar">
          <p>© {new Date().getFullYear()} Rishab Bhatt.</p>
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollToTarget(0); }}>Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
