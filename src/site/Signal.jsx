import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, useGSAP, reduceMotion } from "./gsap";
import { LINKS, POSTS } from "./data";
import { Arrow } from "./icons";
import Split from "./Split";

const fmt = (d) => new Date(d + "T00:00:00").toLocaleDateString("en", { day: "numeric", month: "short", year: "numeric" });
const ago = (iso) => {
  const s = (Date.now() - new Date(iso)) / 1000;
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
};

function useGithub() {
  const [graph, setGraph] = useState({ state: "loading" });
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const ac = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${LINKS.githubUser}?y=last`, { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => setGraph({ state: "ok", days: j.contributions, total: Object.values(j.total).reduce((a, b) => a + b, 0) }))
      .catch(() => !ac.signal.aborted && setGraph({ state: "error" }));
    fetch(`https://api.github.com/users/${LINKS.githubUser}/events/public?per_page=40`, { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) =>
        setEvents(
          j
            .filter((e) => e.type === "PushEvent")
            .slice(0, 4)
            .map((e) => ({
              id: e.id,
              repo: e.repo.name.split("/")[1] || e.repo.name,
              url: `https://github.com/${e.repo.name}`,
              msg: e.payload.commits?.[e.payload.commits.length - 1]?.message?.split("\n")[0] || "Pushed new commits",
              at: e.created_at,
            }))
        )
      )
      .catch(() => {});
    return () => ac.abort();
  }, []);
  return { graph, events };
}

export default function Signal() {
  const root = useRef(null);
  const [tip, setTip] = useState(null);
  const { graph, events } = useGithub();
  const best = useMemo(() => (graph.state === "ok" && graph.days.length ? graph.days.reduce((a, d) => (d.count > a.count ? d : a), graph.days[0]) : null), [graph]);
  const lead = useMemo(() => (graph.state === "ok" ? new Date(graph.days[0].date + "T00:00:00").getDay() : 0), [graph]);

  useGSAP(
    () => {
      if (graph.state !== "ok" || reduceMotion()) return;
      gsap.from(".cell", { opacity: 0, scale: 0.4, duration: 0.5, ease: "power3.out", stagger: { each: 0.003 }, scrollTrigger: { trigger: ".graph", start: "top 88%", once: true } });
      gsap.from(".count", { textContent: 0, duration: 1.4, ease: "power2.out", snap: { textContent: 1 }, scrollTrigger: { trigger: ".graph", start: "top 88%", once: true } });
    },
    { scope: root, dependencies: [graph.state] }
  );

  return (
    <section ref={root} id="proof" className="sec proof">
      <div className="wrap">
        <header className="proof__head">
          <div>
            <p className="eyebrow">Activity</p>
            <h2 className="display h2 proof__big" style={{ marginTop: "1.2rem" }}>
              {graph.state === "ok" ? (
                <>
                  <span className="count">{graph.total}</span> contributions
                  <br />
                  in the last year.
                </>
              ) : (
                <>I ship in public on GitHub.</>
              )}
            </h2>
          </div>
          <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
            <a className="btn" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub <Arrow width="16" height="16" /></a>
            <a className="btn" href={LINKS.cv} target="_blank" rel="noopener noreferrer">Résumé (PDF) <Arrow width="16" height="16" /></a>
          </div>
        </header>

        <div className="graph" onMouseLeave={() => setTip(null)}>
          {graph.state === "ok" && (
            <div className="graph__grid">
              {graph.days.map((d, i) => (
                <i
                  key={d.date}
                  className={`cell l${d.level}`}
                  style={i === 0 ? { gridRowStart: lead + 1 } : undefined}
                  onMouseEnter={() => setTip(`${d.count} ${d.count === 1 ? "contribution" : "contributions"} · ${fmt(d.date)}`)}
                />
              ))}
            </div>
          )}
          {graph.state === "loading" && <p className="graph__msg">Loading the contribution graph…</p>}
          {graph.state === "error" && (
            <p className="graph__msg">
              The graph could not load right now. <a className="link" href={LINKS.github}>See it on GitHub</a>.
            </p>
          )}
          <p className="graph__tip" aria-live="polite">{tip || (best ? `Busiest day: ${best.count} contributions on ${fmt(best.date)}` : " ")}</p>
        </div>

        <div className="feed">
          <div>
            <h3>Latest pushes</h3>
            {events.length ? (
              <ul>
                {events.map((e) => (
                  <li key={e.id}>
                    <a href={e.url} target="_blank" rel="noopener noreferrer">
                      <b>{e.repo}</b>
                      <span>{e.msg}</span>
                      <time>{ago(e.at)}</time>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="feed__empty">Public pushes appear here. Client work stays private.</p>
            )}
          </div>
          <div>
            <h3>Elsewhere</h3>
            <ul>
              <li>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                  <b>LinkedIn</b>
                  <span>Build notes, launches and work updates.</span>
                  <time>Open ↗</time>
                </a>
              </li>
              <li>
                <a href={LINKS.x} target="_blank" rel="noopener noreferrer">
                  <b>X</b>
                  <span>Shipping updates from {LINKS.xHandle}.</span>
                  <time>Open ↗</time>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {POSTS.length > 0 && (
          <div className="posts">
            <div className="feed" style={{ display: "block", marginTop: 0 }}><h3>From my feed</h3></div>
            <div className="posts__grid">
              {POSTS.map((p) => (
                <iframe
                  key={p.urn || p.id}
                  className="post"
                  title={`${p.platform} post`}
                  loading="lazy"
                  src={p.platform === "x" ? `https://platform.twitter.com/embed/Tweet.html?id=${p.id}&dnt=true&theme=light` : `https://www.linkedin.com/embed/feed/update/${p.urn}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
