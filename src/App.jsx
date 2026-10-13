import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { gsap, ScrollTrigger, reduceMotion, startSmoothScroll, scrollToTarget } from "./site/gsap";
import Loader from "./site/Loader";
import Cursor from "./site/Cursor";
import Nav from "./site/Nav";
import Footer from "./site/Footer";
import { Home, WorkPage, ProjectPage } from "./site/Pages";
import useMeta from "./site/useMeta";

/** Ink curtain that lifts on every page change. */
function Wipe({ pathname }) {
  const el = useRef(null);
  const prev = useRef(pathname);
  useLayoutEffect(() => {
    if (prev.current === pathname) return;
    prev.current = pathname;
    if (reduceMotion()) return;
    gsap.fromTo(
      el.current,
      { yPercent: 0, display: "block" },
      { yPercent: -100, duration: 0.8, ease: "expo.inOut", onComplete: () => gsap.set(el.current, { display: "none" }) }
    );
  }, [pathname]);
  return <div ref={el} className="wipe" aria-hidden="true" />;
}

export default function App() {
  const { pathname, hash } = useLocation();
  const [ready, setReady] = useState(false);
  const done = useCallback(() => {
    document.documentElement.style.overflow = "";
    setReady(true);
  }, []);
  const introRoute = useRef(pathname === "/").current;
  useMeta(pathname);

  useEffect(() => startSmoothScroll(), []);
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  // top of page on a new route, or the #section when one is given
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => {
      const el = hash ? document.querySelector(hash) : null;
      if (el) scrollToTarget(el);
      else scrollToTarget(0, true);
      ScrollTrigger.refresh();
    }, 140);
    return () => clearTimeout(id);
  }, [pathname, hash, ready]);

  return (
    <>
      <Loader onDone={done} enabled={introRoute} />
      <Wipe pathname={pathname} />
      <Cursor />
      <Nav ready={ready} />
      <main>
        <Routes>
          <Route path="/" element={<Home ready={ready} />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:id" element={<ProjectPage />} />
          <Route path="*" element={<Home ready={ready} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
