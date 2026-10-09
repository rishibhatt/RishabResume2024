import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, useGSAP } from "./gsap";
import { LINKS, POSTS } from "./data";
import { Arrow } from "./icons";

const fmt = (d) =>
  new Date(d + "T00:00:00").toLocaleDateString("en", { day: "numeric", month: "short", year: "numeric" });

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

function stats(days) {
  let best = days[0];
  let streak = 0, longest = 0;
  for (const d of days) {
    if (d.count > best.count) best = d;
    streak = d.count ? streak + 1 : 0;
    longest = Math.max(longest, streak);
  }
  return { best, longest };
}

export default function Signal() {
  const root = useRef(null);
  const [tip, setTip] = useState(null);
  const { graph, events } = useGithub();
  const st = useMemo(() => (graph.state === "ok" && graph.days.length ? stats(graph.days) : null), [graph]);
  const lead = useMemo(() => (graph.state === "ok" ? new Date(graph.days[0].date + "T00:00:00").getDay() : 0), [graph]);

  useGSAP(
    () => {
      if (graph.state !== "ok") return;
      gsap.from(".cell", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: { each: 0.0035, from: "start" },
        scrollTrigger: { trigger: ".graph", start: "top 85%", once: true },
      });
      gsap.from(".count", {
        textContent: 0,
        duration: 1.6,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: { trigger: ".graph", start: "top 85%", once: true },
      });
    },
    { scope: root, dependencies: [graph.state] }
  );

  return (
    <section ref={root} id="signal" className="sig-sec">
      <div className="wrap">
        <h2 className="eyebrow eyebrow--dark">Shipping in public</h2>
        <div className="sig-sec__head">
          <p className="sig-sec__big">
            {graph.state === "ok" ? (
              <>
                <span className="count">{graph.total}</span> contributions
                <br />
                in the last year.
              </>
            ) : (
              <>Code goes up on GitHub most days.</>
            )}
          </p>
          <a className="btn btn--ink mag" href={LINKS.github} target="_blank" rel="noopener noreferrer">
            Follow on GitHub <Arrow />
          </a>
        </div>

        <div className="graph" onMouseLeave={() => setTip(null)}>
          {graph.state === "ok" && (
            <div className="graph__grid" style={{ "--lead": lead }}>
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
          {graph.state === "loading" && <p className="graph__msg">Loading contribution graph…</p>}
          {graph.state === "error" && (
            <p className="graph__msg">
              Couldn't load the graph right now. <a href={LINKS.github}>See it on GitHub</a>.
            </p>
          )}
          <p className="graph__tip" aria-live="polite">
            {tip || (st ? `Busiest day: ${st.best.count} commits on ${fmt(st.best.date)} · Longest streak: ${st.longest} days` : " ")}
          </p>
        </div>

        <div className="feed">
          <div className="feed__col">
            <h3 className="feed__h">Latest pushes</h3>
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
              <p className="feed__empty">Public pushes show up here. Private client work stays private.</p>
            )}
          </div>

          <div className="feed__col">
            <h3 className="feed__h">Find me elsewhere</h3>
            <ul>
              <li>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                  <b>LinkedIn</b>
                  <span>Build notes and launches. Connect with Rishab Bhatt.</span>
                  <time>Open ↗</time>
                </a>
              </li>
              <li>
                <a href={LINKS.x} target="_blank" rel="noopener noreferrer">
                  <b>X</b>
                  <span>Quick thoughts and shipping updates from {LINKS.xHandle}.</span>
                  <time>Open ↗</time>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {POSTS.length > 0 && (
          <div className="posts">
            <h3 className="feed__h">From my feed</h3>
            <div className="posts__grid">
              {POSTS.map((p) => (
                <iframe
                  key={p.urn || p.id}
                  className={`post post--${p.platform}`}
                  title={`${p.platform} post`}
                  loading="lazy"
                  src={
                    p.platform === "x"
                      ? `https://platform.twitter.com/embed/Tweet.html?id=${p.id}&dnt=true&theme=light`
                      : `https://www.linkedin.com/embed/feed/update/${p.urn}`
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
