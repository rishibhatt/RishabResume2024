import { useLayoutEffect, useRef, useState } from "react";
import { gsap, reduceMotion } from "./gsap";
import Signature from "./Signature";

const SEEN = "rb-intro-seen";

export default function Loader({ onDone, enabled = true }) {
  const root = useRef(null);
  const sig = useRef(null);
  const [gone, setGone] = useState(false);
  const skip = useRef(() => {});

  useLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN) === "1";
    } catch {
      /* storage blocked */
    }
    if (!enabled || reduceMotion() || seen) {
      setGone(true);
      onDone();
      return;
    }

    const html = document.documentElement;
    html.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const master = gsap.timeline({
        delay: 0.35,
        onComplete: () => {
          html.style.overflow = "";
          try {
            sessionStorage.setItem(SEEN, "1");
          } catch {
            /* ignore */
          }
          setGone(true);
        },
      });
      skip.current = () => master.timeScale(6);

      gsap.set(".loader__meta", { opacity: 0, y: 10 });
      master.to(".loader__meta", { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
      master.add(sig.current.play(), 0.2);
      master.to(".loader__sig", { scale: 1.04, duration: 0.5, ease: "power2.out" }, ">-0.1");
      master.to(".loader__sig", { y: -24, opacity: 0, duration: 0.45, ease: "power2.in" }, ">+0.35");
      master.to(".loader__meta", { opacity: 0, duration: 0.3 }, "<");
      master.add(() => {
        html.style.overflow = "";
        onDone();
      }, ">-0.1");
      master.to(
        root.current,
        { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" },
        "<"
      );
    }, root);

    return () => {
      ctx.revert();
      html.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="loader"
      onClick={() => skip.current()}
      role="presentation"
    >
      <div className="loader__sig">
        <Signature ref={sig} className="sig--hero" />
      </div>
      <p className="loader__meta loader__meta--l">Rishab Bhatt</p>
      <p className="loader__meta loader__meta--r">Product engineer</p>
      <p className="loader__meta loader__meta--b">Tap to skip</p>
    </div>
  );
}
