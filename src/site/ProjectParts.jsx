import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, reduceMotion } from "./gsap";
import { wa, EMAIL } from "./data";
import { Arrow, WhatsAppIcon, DocIcon, TagIcon, CloseIcon, CheckIcon } from "./icons";

/* ───────── Architectural Docs Modal ───────── */
export function DocsModal({ project, onClose, onOpenQuote }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project || !project.docs) return null;
  const { docs } = project;

  return (
    <div className="doc-overlay" role="dialog" aria-modal="true" aria-label={docs.title} onClick={onClose}>
      <div className="doc-sheet" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        {/* Header bar */}
        <div className="doc-header">
          <div className="doc-header__meta">
            <span className="doc-badge">{project.kind}</span>
            <span className="doc-badge doc-badge--highlight">{project.badge}</span>
            <span className="doc-code">ID: {project.id.toUpperCase()}-SPEC</span>
          </div>
          <button type="button" className="doc-close" onClick={onClose} aria-label="Close document">
            <CloseIcon />
          </button>
        </div>

        {/* Title */}
        <div className="doc-lead">
          <h2 className="doc-title">{docs.title}</h2>
          <p className="doc-abstract">{docs.abstract}</p>
        </div>

        {/* Problem vs Solution */}
        <div className="doc-grid doc-grid--split">
          <div className="doc-card doc-card--problem">
            <span className="doc-section-tag doc-section-tag--red">The Industry Problem</span>
            <p className="doc-card-text">{docs.problem}</p>
          </div>
          <div className="doc-card doc-card--solution">
            <span className="doc-section-tag doc-section-tag--green">The Architectural Solution</span>
            <p className="doc-card-text">{docs.solution}</p>
          </div>
        </div>

        {/* Engineering Specifications Table */}
        <div className="doc-section">
          <h3 className="doc-section-title">Technical Specifications & Verification</h3>
          <div className="doc-specs-table">
            {docs.specs?.map((s, idx) => (
              <div key={idx} className="doc-spec-row">
                <span className="doc-spec-label">{s.label}</span>
                <span className="doc-spec-val">{s.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Modules if present */}
        {docs.modules && (
          <div className="doc-section">
            <h3 className="doc-section-title">Core Systems & Continuum Modules</h3>
            <div className="doc-modules-grid">
              {docs.modules.map((m, idx) => (
                <div key={idx} className="doc-module-card">
                  <span className="doc-module-num">0{idx + 1}</span>
                  <strong>{m.title}</strong>
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delivery & Actions footer */}
        <div className="doc-footer">
          <div className="doc-footer__meta">
            <strong>Estimated Turnaround</strong>
            <span>{docs.turnaround || "7 to 14 business days"}</span>
          </div>
          <div className="doc-footer__actions">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
              Open Live <Arrow />
            </a>
            {project.quote && onOpenQuote && (
              <button
                type="button"
                className="btn btn--wa btn--sm"
                onClick={() => {
                  onClose();
                  onOpenQuote(project);
                }}
              >
                <TagIcon /> Get Quote & Packages
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Quote & Pricing Calculator Modal ───────── */
export function QuoteModal({ project, onClose, initialPkg }) {
  const [currency, setCurrency] = useState(() => {
    try {
      return /Kolkata|Calcutta/.test(Intl.DateTimeFormat().resolvedOptions().timeZone) ? "INR" : "USD";
    } catch {
      return "USD";
    }
  });
  const [care, setCare] = useState(false);
  const [selectedPkgId, setSelectedPkgId] = useState(() => {
    const pk = project?.quote?.packages || [];
    return (pk.find((p) => p.id === initialPkg) || pk.find((p) => p.popular) || pk[0])?.id;
  });
  const [selectedAddons, setSelectedAddons] = useState(new Set());

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project || !project.quote) return null;
  const { quote } = project;
  const currentPkg = quote.packages.find((p) => p.id === selectedPkgId) || quote.packages[0];

  const toggleAddon = (id) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Calculate pricing numbers
  const baseUSD = parseInt(currentPkg.priceUSD.replace(/[^0-9]/g, ""), 10) || 0;
  const baseINR = parseInt(currentPkg.priceINR.replace(/[^0-9]/g, ""), 10) || 0;

  let totalUSD = baseUSD;
  let totalINR = baseINR;
  quote.addons?.forEach((ad) => {
    if (selectedAddons.has(ad.id)) {
      totalUSD += ad.usd;
      totalINR += ad.inr;
    }
  });

  if (care && quote.care) {
    totalUSD += quote.care.usdYear;
    totalINR += quote.care.inrYear;
  }

  const formattedTotal =
    currency === "USD" ? `$${totalUSD.toLocaleString()}` : `₹${totalINR.toLocaleString()}`;

  const addonSummary = quote.addons
    ?.filter((a) => selectedAddons.has(a.id))
    .map((a) => a.name)
    .join(", ");

  const waMessage = `Hi Rishab, I want a website like ${project.name} for my school. I picked the "${currentPkg.name}" package (${formattedTotal})${
    addonSummary ? ` with add-ons: [${addonSummary}]` : ""
  }${care ? " and the yearly care plan" : ""}. Can we talk about the next steps?`;

  const mailSubject = encodeURIComponent(`Project Quote Request: ${project.name} - ${currentPkg.name}`);
  const mailBody = encodeURIComponent(
    `Hi Rishab,\n\nI am interested in deploying the "${project.name}" platform.\n\nPackage: ${currentPkg.name}\nEstimated Investment: ${formattedTotal}\nAdd-ons: ${addonSummary || "None"}\nTurnaround: ${currentPkg.timeline}\n\nOrganization / School Name:\nTimeline:\nNotes:\n\nLooking forward to hearing from you.`
  );

  return (
    <div className="doc-overlay" role="dialog" aria-modal="true" aria-label="Quote and Pricing" onClick={onClose}>
      <div className="doc-sheet doc-sheet--quote" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="doc-header">
          <div>
            <span className="doc-badge">{project.kind}</span>
            <span className="doc-badge doc-badge--highlight">Fixed Scope & Turnaround</span>
          </div>
          <button type="button" className="doc-close" onClick={onClose} aria-label="Close quote modal">
            <CloseIcon />
          </button>
        </div>

        <div className="doc-lead">
          <h2 className="doc-title">{quote.headline}</h2>
          <p className="doc-abstract">{quote.subhead}</p>
        </div>

        {/* Currency toggle */}
        <div className="quote-currency-row">
          <span className="quote-label">Select Currency</span>
          <div className="seg seg--sm" role="group" aria-label="Currency selection">
            <button
              type="button"
              className={currency === "USD" ? "is-on" : ""}
              onClick={() => setCurrency("USD")}
              aria-pressed={currency === "USD"}
            >
              USD ($)
            </button>
            <button
              type="button"
              className={currency === "INR" ? "is-on" : ""}
              onClick={() => setCurrency("INR")}
              aria-pressed={currency === "INR"}
            >
              INR (₹)
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="quote-pkg-grid">
          {quote.packages.map((pkg) => {
            const isSelected = pkg.id === selectedPkgId;
            return (
              <div
                key={pkg.id}
                className={`quote-pkg-card ${isSelected ? "is-selected" : ""} ${pkg.popular ? "is-popular" : ""}`}
                onClick={() => setSelectedPkgId(pkg.id)}
              >
                {pkg.popular && <span className="quote-pkg-ribbon">Most Popular</span>}
                <div className="quote-pkg-head">
                  <h4 className="quote-pkg-name">{pkg.name}</h4>
                  <div className="quote-pkg-price">
                    <span>{currency === "USD" ? pkg.priceUSD : pkg.priceINR}</span>
                    <small>flat turnkey</small>
                  </div>
                  <span className="quote-pkg-timeline">⏱️ {pkg.timeline}</span>
                  <p className="quote-pkg-desc">{pkg.desc}</p>
                </div>
                <ul className="quote-pkg-list">
                  {pkg.deliverables.map((d, idx) => (
                    <li key={idx}>
                      <CheckIcon /> <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`btn ${isSelected ? "btn--wa" : "btn--ghost"} btn--sm`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPkgId(pkg.id);
                  }}
                >
                  {isSelected ? "Selected Tier" : "Select Tier"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Scope Add-ons */}
        {quote.addons && (
          <div className="doc-section">
            <h3 className="doc-section-title">Optional Add-ons & Custom Modules</h3>
            <div className="quote-addons-grid">
              {quote.addons.map((add) => {
                const checked = selectedAddons.has(add.id);
                const addPrice = currency === "USD" ? `+$${add.usd}` : `+₹${add.inr.toLocaleString()}`;
                return (
                  <label key={add.id} className={`quote-addon-chip ${checked ? "is-checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAddon(add.id)}
                      className="quote-addon-input"
                    />
                    <span className="quote-addon-info">
                      <strong>{add.name}</strong>
                      <span className="quote-addon-price">{addPrice}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {quote.care && (
          <div className="doc-section">
            <h3 className="doc-section-title">Keep it running</h3>
            <label className={`quote-addon-chip quote-care ${care ? "is-checked" : ""}`}>
              <input type="checkbox" checked={care} onChange={() => setCare((v) => !v)} className="quote-addon-input" />
              <span className="quote-addon-info">
                <strong>{quote.care.name}, billed yearly</strong>
                <span className="quote-care-note">{quote.care.note}</span>
                <span className="quote-addon-price">
                  {currency === "USD" ? `${quote.care.usdYear}/year (${quote.care.usdMonth}/month if paid monthly)` : `₹${quote.care.inrYear.toLocaleString()}/year (₹${quote.care.inrMonth.toLocaleString()}/month if paid monthly)`}
                </span>
              </span>
            </label>
            {quote.payment && <p className="quote-pay">Payment: {quote.payment}</p>}
          </div>
        )}

        {/* Guarantees Box */}
        <div className="quote-guarantee-box">
          <strong className="quote-guarantee-title">Delivery & Quality Guarantees:</strong>
          <ul className="quote-guarantee-list">
            {quote.guarantees.map((g, idx) => (
              <li key={idx}>{g}</li>
            ))}
          </ul>
        </div>

        {/* Sticky Action Bar */}
        <div className="quote-summary-bar">
          <div className="quote-summary-meta">
            <span className="quote-summary-tier">
              Selected: <strong>{currentPkg.name}</strong> ({currentPkg.timeline})
            </span>
            <span className="quote-summary-total">Total Estimate: <strong>{formattedTotal}</strong></span>
          </div>
          <div className="quote-summary-actions">
            <a
              href={`mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}`}
              className="btn btn--ghost btn--sm"
            >
              Email RFP
            </a>
            <a
              href={wa(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--wa btn--lg"
            >
              <WhatsAppIcon /> Request Quote on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Case Information Panel ───────── */
export function Info({ p, onOpenDocs, onOpenQuote }) {
  const [mode, setMode] = useState("plain");
  const panel = useRef(null);

  const swap = (m) => {
    if (m === mode) return;
    setMode(m);
    gsap.fromTo(
      panel.current.children,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" }
    );
  };

  return (
    <div className="case__info">
      <div className="case__kind-row">
        <p className="case__kind">
          <span>{p.n}</span> {p.kind}
        </p>
        {p.badge && (
          <span className="case__badge-pill">
            <span className="case__badge-dot" />
            {p.badge}
          </span>
        )}
      </div>

      <h3 className="case__name">{p.name}</h3>
      <p className="case__tag">{p.tagline}</p>

      {/* Mode Segmented Controls */}
      <div className="seg" role="group" aria-label="Explain it">
        <button
          type="button"
          className={mode === "plain" ? "is-on" : ""}
          onClick={() => swap("plain")}
          aria-pressed={mode === "plain"}
        >
          In plain words
        </button>
        <button
          type="button"
          className={mode === "tech" ? "is-on" : ""}
          onClick={() => swap("tech")}
          aria-pressed={mode === "tech"}
        >
          Under the hood
        </button>
        {p.docs && (
          <button
            type="button"
            className="seg__doc-btn"
            onClick={() => onOpenDocs(p)}
            title="Read Architectural Blueprint & Case Study"
          >
            <DocIcon /> Blueprint Docs
          </button>
        )}
      </div>

      <div ref={panel} className="case__panel">
        {mode === "plain" ? (
          <>
            <p className="case__body">{p.plain}</p>
            <ul className="case__points">
              {p.wins.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="case__body">{p.body}</p>
            <ul className="case__points">
              {p.points.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <ul className="case__tech" aria-label="Built with">
              {p.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Action Buttons */}
      {/* Streamlined Standard Action Buttons (2-3 buttons max, no raw URLs, no GitHub) */}
      <div className="case__cta">
        {p.quote ? (
          <button
            type="button"
            className="btn btn--gold mag"
            onClick={() => onOpenQuote(p)}
          >
            <TagIcon /> Get Quote
          </button>
        ) : (
          <a
            className="btn btn--wa mag"
            href={wa(`Hi Rishab, I saw ${p.name} on your portfolio and I would like to discuss a custom build.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> Discuss Build
          </a>
        )}

        {p.docs && (
          <button
            type="button"
            className="btn btn--night-ghost mag"
            onClick={() => onOpenDocs(p)}
          >
            <DocIcon /> Blueprint
          </button>
        )}

        <a className="btn btn--night-ghost mag" href={p.url} target="_blank" rel="noopener noreferrer">
          Open Live <Arrow />
        </a>
      </div>
    </div>
  );
}

/* ───────── 3D Tilt Mockup ───────── */
export function Mock({ p }) {
  const box = useRef(null);

  useGSAP(
    () => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || reduceMotion()) return;
      const el = box.current;
      const rx = gsap.quickTo(el.querySelector(".mock__tilt"), "rotationX", { duration: 0.6, ease: "power3" });
      const ry = gsap.quickTo(el.querySelector(".mock__tilt"), "rotationY", { duration: 0.6, ease: "power3" });
      const px = gsap.quickTo(el.querySelector(".mock__phone"), "x", { duration: 0.8, ease: "power3" });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        ry(nx * 8);
        rx(ny * -6);
        px(nx * 26);
      };
      const leave = () => {
        rx(0);
        ry(0);
        px(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: box }
  );

  return (
    <a
      ref={box}
      className="mock"
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Open site"
      aria-label={`Open ${p.name} at ${p.domain}`}
    >
      <span className="mock__tilt">
        <img className="mock__desk" src={p.d} alt={`${p.name} on desktop`} width="1440" height="900" loading="lazy" />
        <img className="mock__phone" src={p.m} alt={`${p.name} on a phone`} width="390" height="844" loading="lazy" />
      </span>
    </a>
  );
}

/* ───────── Tactile Segmented Tabs Switcher ───────── */
export function TabsSwitcher({ categories, activeCategory, onSelect, projects }) {
  const trackRef = useRef(null);
  const pillRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const activeBtn = track.querySelector(`.work__tab.is-active`);
    if (activeBtn && pillRef.current) {
      const left = activeBtn.offsetLeft;
      const width = activeBtn.offsetWidth;
      gsap.to(pillRef.current, {
        x: left,
        width: width,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, [activeCategory]);

  return (
    <div className="work__switch-wrap">
      <div className="work__switch-track" ref={trackRef} role="tablist" aria-label="Filter projects">
        {/* Sliding mechanical indicator plate */}
        <div ref={pillRef} className="work__switch-pill" aria-hidden="true" />

        {categories.map((cat, idx) => {
          const count =
            cat.id === "all" ? projects.length : projects.filter((p) => p.category === cat.id).length;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              className={`work__tab ${isActive ? "is-active" : ""}`}
              onClick={() => onSelect(cat.id)}
              aria-selected={isActive}
              data-cursor="Select"
            >
              <span className="work__tab-num">0{idx}</span>
              <span className="work__tab-label">{cat.label}</span>
              <span className="work__tab-count">[{String(count).padStart(2, "0")}]</span>
              {cat.badge && <span className="work__tab-tag">{cat.badge}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
