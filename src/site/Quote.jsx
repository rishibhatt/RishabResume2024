import { useEffect, useMemo, useRef, useState } from "react";
import { getLenis } from "./gsap";
import { wa, mail } from "./data";
import { CloseIcon, CheckIcon, WhatsAppIcon } from "./icons";

export const detectINR = () => {
  try {
    return /Kolkata|Calcutta/.test(Intl.DateTimeFormat().resolvedOptions().timeZone);
  } catch {
    return false;
  }
};

const num = (s) => parseInt(String(s).replace(/[^0-9]/g, ""), 10) || 0;
const money = (n, inr) => (inr ? `₹${n.toLocaleString("en-IN")}` : `$${n.toLocaleString("en-US")}`);

/** Build a quote: pick a package, add-ons, optional care plan. Send it by WhatsApp or email. */
export default function Quote({ project, initialPkg, onClose }) {
  const q = project.quote;
  const [inr, setInr] = useState(detectINR);
  const [pkgId, setPkgId] = useState(() => (q.packages.find((p) => p.id === initialPkg) || q.packages.find((p) => p.popular) || q.packages[0]).id);
  const [addons, setAddons] = useState(() => new Set());
  const [care, setCare] = useState(false);
  const sheet = useRef(null);

  useEffect(() => {
    const prev = document.activeElement;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    sheet.current?.querySelector("button")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const f = [...sheet.current.querySelectorAll("a[href], button, input")].filter((n) => !n.disabled);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
        else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      getLenis()?.start();
      prev?.focus?.();
    };
  }, [onClose]);

  const pkg = q.packages.find((p) => p.id === pkgId);
  const total = useMemo(() => {
    let t = num(inr ? pkg.priceINR : pkg.priceUSD);
    q.addons?.forEach((a) => addons.has(a.id) && (t += inr ? a.inr : a.usd));
    if (care && q.care) t += inr ? q.care.inrYear : q.care.usdYear;
    return t;
  }, [pkg, addons, care, inr, q]);

  const picked = q.addons?.filter((a) => addons.has(a.id)).map((a) => a.name) || [];
  const summary = `Package: ${pkg.name} (${pkg.timeline})${picked.length ? `\nAdd-ons: ${picked.join(", ")}` : ""}${care ? `\nCare plan: yearly` : ""}\nEstimate: ${money(total, inr)}`;
  const waMsg = `Hi Rishab, I want a website like ${project.name} for my school.\n${summary}\nCan we talk about the next steps?`;
  const mailBody = `Hi Rishab,\n\nI'd like a website like ${project.name}.\n\n${summary}\n\nSchool name:\nCity:\nWhen we need it live:\n\nThanks`;

  const toggle = (id) =>
    setAddons((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <div className="qb" role="dialog" aria-modal="true" aria-label="Build your quote" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="qb__sheet" ref={sheet} data-lenis-prevent>
        <div className="qb__top">
          <div>
            <p className="eyebrow">Build your quote</p>
            <h2>{q.headline}</h2>
          </div>
          <button type="button" className="qb__x" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div>
          <div className="pricehead" style={{ marginBottom: "0.8rem" }}>
            <h3 style={{ margin: 0 }}>1. Choose a package</h3>
            <div className="seg" role="group" aria-label="Currency">
              <button type="button" className={!inr ? "is-on" : ""} aria-pressed={!inr} onClick={() => setInr(false)}>USD</button>
              <button type="button" className={inr ? "is-on" : ""} aria-pressed={inr} onClick={() => setInr(true)}>INR</button>
            </div>
          </div>
          <div className="qb__tiers" role="radiogroup" aria-label="Package">
            {q.packages.map((p) => (
              <label key={p.id} className={`opt ${pkgId === p.id ? "is-on" : ""}`}>
                <input type="radio" name="pkg" checked={pkgId === p.id} onChange={() => setPkgId(p.id)} />
                <span>
                  <b>{p.name}{p.popular ? " · Recommended" : ""}</b>
                  <small>{p.desc} Live in {p.timeline}.</small>
                </span>
                <span>{inr ? p.priceINR : p.priceUSD}</span>
              </label>
            ))}
          </div>
          <ul className="qb__list">
            {pkg.deliverables.map((d) => (
              <li key={d}>
                <CheckIcon width="16" height="16" /> {d}
              </li>
            ))}
          </ul>
        </div>

        {q.addons?.length > 0 && (
          <div>
            <h3>2. Add what you need</h3>
            <div className="qb__tiers">
              {q.addons.map((a) => (
                <label key={a.id} className={`opt ${addons.has(a.id) ? "is-on" : ""}`}>
                  <input type="checkbox" checked={addons.has(a.id)} onChange={() => toggle(a.id)} />
                  <span><b>{a.name}</b></span>
                  <span>+{money(inr ? a.inr : a.usd, inr)}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {q.care && (
          <div>
            <h3>3. Keep it running (optional)</h3>
            <label className={`opt ${care ? "is-on" : ""}`}>
              <input type="checkbox" checked={care} onChange={() => setCare((c) => !c)} />
              <span>
                <b>{q.care.name}, billed yearly</b>
                <small>{q.care.note} {inr ? `₹${q.care.inrMonth.toLocaleString("en-IN")}/month if paid monthly.` : `$${q.care.usdMonth}/month if paid monthly.`}</small>
              </span>
              <span>{money(inr ? q.care.inrYear : q.care.usdYear, inr)}</span>
            </label>
          </div>
        )}

        {q.payment && <p className="fine">Payment: {q.payment}</p>}

        <div className="qb__bar">
          <div className="qb__total">
            <small>Your estimate</small>
            <b>{money(total, inr)}</b>
          </div>
          <div className="qb__send">
            <a className="btn btn--accent" href={wa(waMsg)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Send on WhatsApp
            </a>
            <a className="btn btn--light" href={mail(`Quote request: ${pkg.name}`, mailBody)}>
              Send by email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
