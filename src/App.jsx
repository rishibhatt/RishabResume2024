import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "./site/gsap";
import Loader from "./site/Loader";
import Cursor from "./site/Cursor";
import Nav from "./site/Nav";
import Hero from "./site/Hero";
import Work, { Tape } from "./site/Work";
import Services from "./site/Services";
import Signal from "./site/Signal";
import Contact from "./site/Contact";
import Footer from "./site/Footer";

export default function App() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <Loader onDone={done} />
      <Cursor />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Tape />
        <Work />
        <Services />
        <Signal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
