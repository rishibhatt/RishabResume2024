import { useEffect } from "react";
import { PROJECTS, SITE } from "./data";

const BASE_TITLE = "Rishab Bhatt | Product Engineer: Websites, AI Tools and Web Apps";
const BASE_DESC =
  "Independent product engineer in India. I design and build websites, online stores, AI tools and web apps. Buy a ready-made school website, or hire me.";

const setMeta = (sel, attr, value) => {
  const el = document.head.querySelector(sel);
  if (el) el.setAttribute(attr, value);
};

/** Keeps title, description, canonical and share tags in step with the current route. */
export default function useMeta(pathname) {
  useEffect(() => {
    let title = BASE_TITLE;
    let desc = BASE_DESC;
    const path = pathname.replace(/\/+$/, "") || "/";

    if (path === "/work") {
      title = "Work | Rishab Bhatt";
      desc = "Selected work by Rishab Bhatt: a ready-made school website for sale, plus AI and SaaS products built end to end.";
    } else if (path.startsWith("/work/")) {
      const p = PROJECTS.find((x) => x.id === path.split("/")[2]);
      if (p) {
        title = `${p.name} | Rishab Bhatt`;
        desc = `${p.tagline} ${p.plain}`.slice(0, 158);
      }
    }

    const url = `${SITE}${path === "/" ? "/" : path}`;
    document.title = title;
    setMeta('meta[name="description"]', "content", desc);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", desc);
  }, [pathname]);
}
