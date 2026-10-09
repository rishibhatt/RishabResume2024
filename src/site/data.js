export const WA_NUMBER = "918360558587";
export const wa = (msg) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export const SITE = "https://rishieee.netlify.app";
export const EMAIL = "bhattrishu07@gmail.com";

export const LINKS = {
  github: "https://github.com/rishibhatt",
  githubUser: "rishibhatt",
  linkedin: "https://www.linkedin.com/in/rishab-bhatt-7ba7111ab/",
  x: "https://x.com/Rishi_o07",
  xHandle: "@Rishi_o07",
  instagram: "https://www.instagram.com/rishibhatt.007/",
  cv: "/RishabCV2026.pdf",
};

/** Screenshots live in /public/shots as {id}-d.webp (desktop 1440x900) and {id}-m.webp (phone 390x844). */
export const PROJECTS = [
  {
    id: "apiforge",
    n: "01",
    name: "API Forge",
    domain: "apiforge.info",
    url: "https://apiforge.info",
    d: "/shots/apiforge-d.webp",
    m: "/shots/apiforge-m.webp",
    hue: "oklch(78% 0.13 225)",
    kind: "AI product",
    tagline: "Describe an endpoint. Get a tested API.",
    plain:
      "Developers lose hours wiring up and testing APIs. Here you type what you need in normal English and the tool sets it up, tests it and tells you how fast it is.",
    wins: [
      "Type a sentence, get a working setup",
      "Checks the result automatically",
      "Shows speed in real time",
    ],
    body: "Plain English in, configured REST endpoint out. API Forge runs live tests, validates the JSON schema and benchmarks latency.",
    points: [
      "Natural language to configured REST endpoint",
      "Streams LLM tokens with live latency metrics",
      "Automatic JSON schema validation and scoring",
    ],
    tech: ["Next.js", "OpenAI SDK", "TypeScript", "Tailwind"],
  },
  {
    id: "dossier",
    n: "02",
    name: "Dossier",
    domain: "dossier-cv.com",
    url: "https://dossier-cv.com",
    d: "/shots/dossier-d.webp",
    m: "/shots/dossier-m.webp",
    hue: "oklch(84% 0.14 172)",
    kind: "AI product",
    tagline: "Resume in. Live portfolio out.",
    plain:
      "You upload your resume and get a professional website in minutes. No design skills, no coding, and a link you can send to anyone.",
    wins: [
      "Upload once, site is ready",
      "Pick a look and see it live",
      "One click to get your own link",
    ],
    body: "Dossier's AI reads a resume, pulls out every project and skill, then builds a shareable portfolio with SEO built in.",
    points: [
      "Resume parsing into structured skills and projects",
      "Multiple responsive templates with live preview",
      "One-click publish to a shareable URL",
    ],
    tech: ["Next.js", "OpenAI APIs", "Framer Motion", "Tailwind"],
  },
  {
    id: "velvet",
    n: "03",
    name: "Velvet",
    domain: "the-velvet.netlify.app",
    url: "https://the-velvet.netlify.app",
    d: "/shots/velvet-d.webp",
    m: "/shots/velvet-m.webp",
    hue: "oklch(76% 0.13 300)",
    kind: "SaaS platform",
    tagline: "Moodboards your whole team builds together.",
    plain:
      "A shared pinboard for ideas. Paste any link and it becomes a neat card on a board your team can add to, tag and like together.",
    wins: [
      "Paste a link, get a preview card",
      "Everyone edits the same board live",
      "Choose who can view or edit",
    ],
    body: "Velvet scrapes rich previews from any URL and drops them on real-time collaborative boards with roles, tags and likes.",
    points: [
      "Universal link scraping with OpenGraph metadata",
      "Real-time boards with role-based access",
      "Adaptive masonry layout with provenance tracking",
    ],
    tech: ["Next.js 14", "TypeScript", "Supabase", "Tailwind"],
  },
];

export const SERVICES = [
  {
    n: "01",
    title: "Online store",
    plain: "Sell your products on your own website, with a cart, payments and order tracking.",
    tech: ["Next.js", "Payment gateway", "Admin dashboard"],
    topic: "an online store",
  },
  {
    n: "02",
    title: "Portfolio website",
    plain: "A personal site that shows your work properly and gets you hired or booked.",
    tech: ["React", "GSAP animation", "SEO"],
    topic: "a portfolio website",
  },
  {
    n: "03",
    title: "Landing page",
    plain: "One focused page to launch an offer, event or app and collect sign-ups.",
    tech: ["Next.js", "Fast load", "Analytics"],
    topic: "a landing page",
  },
  {
    n: "04",
    title: "Business website",
    plain: "Your shop, studio or clinic online. Services, contact form and easy to find on Google.",
    tech: ["CMS", "SEO", "Forms"],
    topic: "a business website",
  },
  {
    n: "05",
    title: "AI tool",
    plain: "A chatbot, writing helper or document reader built into your product or business.",
    tech: ["OpenAI API", "Streaming", "Prompt design"],
    topic: "an AI-powered tool",
  },
  {
    n: "06",
    title: "Web3 app or dashboard",
    plain: "Crypto wallet login, staking screens, live numbers and the admin panels behind them.",
    tech: ["Web3.js", "MetaMask", "Supabase"],
    topic: "a Web3 app or dashboard",
  },
];

export const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "OpenAI",
  "Supabase",
  "Web3.js",
  "Tailwind",
  "GSAP",
  "Node",
];

/**
 * Real posts, embedded live. Add entries and they appear in "From my feed".
 *  LinkedIn: open your post, click ... > "Embed this post", copy the part after
 *            /embed/feed/update/  ->  { platform: "linkedin", urn: "urn:li:share:7123456789" }
 *  X:        the number at the end of the tweet URL  ->  { platform: "x", id: "1780000000000000000" }
 */
export const POSTS = [];
