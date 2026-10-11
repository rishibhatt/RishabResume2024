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
export const CATEGORIES = [
  { id: "all", label: "All Work" },
  { id: "starters", label: "Commercial Starters", badge: "Ready to Deploy" },
  { id: "ai", label: "AI Products" },
  { id: "saas", label: "SaaS Platforms" },
];

export const PROJECTS = [
  {
    id: "h12",
    n: "01",
    name: "H-12 Academy",
    domain: "h12academy.netlify.app",
    url: "https://h12academy.netlify.app",
    repo: "https://github.com/rishibhatt/h-12-school",
    d: "/shots/h12-d.webp",
    m: "/shots/h12-m.webp",
    hue: "oklch(76% 0.16 80)",
    kind: "Commercial Starter · Demo",
    badge: "Ready to License & Deploy",
    category: "starters",
    tagline: "Academic prestige meets a conversion-tuned admissions engine.",
    plain:
      "A complete, bilingual digital campus engineered for private schools and academies. Parents get dedicated division portals from Kindergarten to Grade 12, an interactive multi-step admissions inquiry form, and zero PDF hunting.",
    wins: [
      "26 static pre-rendered routes with sub-second page loads",
      "Native English & Hindi localization with instant client switching",
      "Conversion-tuned admissions funnel with automated inquiry reference codes",
    ],
    body:
      "An editorial-grade institutional platform built with Next.js 16 App Router, TypeScript 5.9, Tailwind CSS v4, and GSAP 3. Includes division portals (K–5, 6–8, 9–12), strategic 2026–2030 roadmap, faculty directory, and an abstract CRM layer ready for HubSpot or Salesforce.",
    points: [
      "Next.js 16 App Router + Turbopack achieving Lighthouse 95+ performance",
      "Native dual-locale engine (EN / HI) with Devanagari typography tuning",
      "WCAG AAA compliance with 9.8:1 text contrast and full keyboard navigation",
      "Interactive 2026–2030 institutional roadmap with milestone phase filtering",
    ],
    tech: ["Next.js 16", "TypeScript 5.9", "Tailwind v4", "GSAP 3", "i18n (EN/HI)"],
    docs: {
      title: "H-12 School of Learning & Discovery — Architectural Brief & System Blueprint",
      abstract:
        "Engineered as a customizable commercial starter for K-12 private institutions, preparatory academies, and educational foundations. Combines institutional prestige with an enrollment-driven conversion funnel, zero-hydration bilingual localization, and strict atomic modular architecture.",
      problem:
        "Most private school websites rely on outdated WordPress templates with slow load times, unreadable video headers, and 80+ buried PDF links. As a result, schools leak prospective parent admissions inquiries during key enrollment cycles.",
      solution:
        "A modern, customizable institutional platform built from scratch with dedicated division portals (Primary, Middle, Senior), a strategic 2026–2030 roadmap, academic leadership credentials, and an interactive admissions inquiry engine.",
      specs: [
        { label: "Framework & Architecture", val: "Next.js 16 (App Router), React 19, Turbopack" },
        { label: "Language & Standards", val: "TypeScript 5.9 strict mode (zero any, strictNullChecks)" },
        { label: "Styling & Tokens", val: "Tailwind CSS v4 (Midnight Navy #0B1B2B, Academic Gold #C89B3C, Warm Ivory #FAF7F2)" },
        { label: "Motion Engineering", val: "GSAP 3 + ScrollTrigger with automatic prefers-reduced-motion fallback" },
        { label: "Localization Engine", val: "Zero-hydration client dictionary switcher (English & Hindi)" },
        { label: "Accessibility (a11y)", val: "WCAG AAA compliant with 9.8:1 contrast ratio & full keyboard focus rings" },
        { label: "Admissions CRM Layer", val: "Client-side validated multi-step funnel with automated tracking codes (HubSpot / Salesforce ready)" },
        { label: "Codebase Modularity", val: "Atomic component hierarchy (Atoms, Molecules, Organisms); 54 source files all under 300 LOC" },
      ],
      modules: [
        {
          title: "Core Academic Continuum",
          desc: "Dedicated division portals for Primary (K–5), Middle (6–8), and Senior (9–12) schools with daily schedules, laboratory highlights, and curricula.",
        },
        {
          title: "Strategic Roadmap (2026–2030)",
          desc: "Institutional master plan featuring filterable progress phases, deliverable checklists, and status badges.",
        },
        {
          title: "Faculty & Deans Directory",
          desc: "Credentials, degrees, alma maters, and pedagogical philosophy profiles for academic department heads.",
        },
        {
          title: "Visual Archives & Lightbox",
          desc: "Accessible campus photography gallery, events calendar, and administrative noticeboard circulars.",
        },
        {
          title: "Admissions Inquiry Engine",
          desc: "Interactive, client-validated multi-step funnel backed by an abstract CRM service layer with automated reference code generation.",
        },
      ],
      turnaround: "7 to 14 business days from content handover to production edge launch.",
    },
    quote: {
      headline: "Deploy a Modern School Platform in 10 Days",
      subhead: "Fixed scope, clear deliverables, guaranteed Lighthouse 90+ performance, and complete source code ownership.",
      packages: [
        {
          id: "admissions-lite",
          name: "Admissions Portal Starter",
          priceUSD: "$990",
          priceINR: "₹80,000",
          timeline: "7 business days",
          desc: "Targeted admissions landing engine designed to increase enrollment inquiries quickly.",
          deliverables: [
            "6 Core Pages (Home, Admissions, Curriculum Overview, About, Contact, Virtual Tour Preview)",
            "Multi-step admissions inquiry engine with automated confirmation emails",
            "Mobile-first responsive design with Lighthouse 95+ score",
            "Domain setup, SSL certificate & edge deployment on Netlify or Vercel",
            "14 days post-launch support and bug fixes",
          ],
        },
        {
          id: "institutional-master",
          name: "Full Institutional Campus",
          popular: true,
          priceUSD: "$1,950",
          priceINR: "₹1,60,000",
          timeline: "14 business days",
          desc: "The complete 26-page flagship portal for K-12 schools, private academies, and preparatory institutions.",
          deliverables: [
            "Complete 26-page continuum (Primary K–5, Middle 6–8, Senior 9–12 portals)",
            "Bilingual dual-locale localization (English & Hindi or custom language pair)",
            "Faculty Directory with academic credentials & Dean profiles",
            "2026–2030 Institutional Roadmap with interactive milestone badges",
            "Filterable campus photography gallery with accessible modal lightbox",
            "CRM webhook connection (HubSpot, Salesforce, Google Sheets, or custom webhook)",
            "Scoped GSAP 3 scroll animations & WCAG AAA accessible typography",
            "30 days post-launch support and staff handover guide",
          ],
        },
        {
          id: "trust-enterprise",
          name: "Multi-Campus Trust Suite",
          priceUSD: "$3,400",
          priceINR: "₹2,75,000",
          timeline: "21 business days",
          desc: "Engineered for educational foundations, multi-branch school networks, and colleges.",
          deliverables: [
            "Multi-branch portal architecture with unified design system",
            "Interactive events calendar, circular distribution & noticeboard feeds",
            "Parent/Student onboarding portal shell with syllabus download center",
            "Custom admissions payment gateway integration (Stripe / Razorpay)",
            "Dedicated priority staging environment, video staff walkthrough & 60 days support",
          ],
        },
      ],
      addons: [
        { id: "crm", name: "CRM Webhook Sync (HubSpot / Salesforce)", usd: 250, inr: 20000 },
        { id: "lang", name: "Additional Language Dictionary (e.g. French, Spanish)", usd: 200, inr: 16000 },
        { id: "motion", name: "Custom 3D / GSAP Interactive Timelines & Campus Map", usd: 300, inr: 24000 },
      ],
      guarantees: [
        "10-Day Staging Guarantee: Live review environment delivered within 10 business days of content receipt, or $200 deducted.",
        "Lighthouse 90+ Performance SLA: Sub-second edge loads and 100% mobile accessibility guaranteed.",
        "Zero Lock-in: 100% clean Next.js 16 source code transferred to your GitHub organization with full ownership.",
      ],
    },
  },
  {
    id: "apiforge",
    n: "02",
    name: "API Forge",
    domain: "apiforge.info",
    url: "https://apiforge.info",
    repo: "https://github.com/rishibhatt/api-forge",
    d: "/shots/apiforge-d.webp",
    m: "/shots/apiforge-m.webp",
    hue: "oklch(78% 0.13 225)",
    kind: "AI Product",
    badge: "Live Production App",
    category: "ai",
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
    docs: {
      title: "API Forge — AI-Powered API Design & Testing Platform",
      abstract: "Full-stack developer platform transforming natural language specifications into tested, validated REST endpoints with real-time latency benchmarking.",
      problem: "API prototyping is bogged down by manual JSON schema drafting, mock server wiring, and Postman context switching.",
      solution: "An automated prompt-to-endpoint compiler with streaming response inspection, schema validation, and CORS sandboxing.",
      specs: [
        { label: "Framework", val: "Next.js App Router & TypeScript" },
        { label: "AI Integration", val: "OpenAI SDK with streaming token pipelines" },
        { label: "Validation", val: "Real-time JSON schema validation & latency benchmarking" },
      ],
    },
  },
  {
    id: "dossier",
    n: "03",
    name: "Dossier",
    domain: "dossier-cv.com",
    url: "https://dossier-cv.com",
    repo: "https://github.com/rishibhatt/dossier",
    d: "/shots/dossier-d.webp",
    m: "/shots/dossier-m.webp",
    hue: "oklch(84% 0.14 172)",
    kind: "AI Product",
    badge: "Live Production App",
    category: "ai",
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
    docs: {
      title: "Dossier — AI Resume-to-Portfolio Generation Engine",
      abstract: "Automated candidate portfolio builder converting unformatted PDF resumes into structured web experiences with SEO metadata.",
      problem: "Software engineers and creatives struggle to build personal portfolios, abandoning projects midway due to design fatigue.",
      solution: "A single-step resume parsing pipeline that generates responsive multi-theme websites with one-click deployment.",
      specs: [
        { label: "Framework", val: "Next.js & Framer Motion" },
        { label: "Extraction", val: "Structured entity extraction for skills, projects, and career milestones" },
        { label: "Publishing", val: "Instant static URL generation with built-in OpenGraph cards" },
      ],
    },
  },
  {
    id: "velvet",
    n: "04",
    name: "Velvet",
    domain: "the-velvet.netlify.app",
    url: "https://the-velvet.netlify.app",
    repo: "https://github.com/rishibhatt/velvet",
    d: "/shots/velvet-d.webp",
    m: "/shots/velvet-m.webp",
    hue: "oklch(76% 0.13 300)",
    kind: "SaaS Platform",
    badge: "Live Production Platform",
    category: "saas",
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
    docs: {
      title: "Velvet — Collaborative Visual Curation & Moodboard Platform",
      abstract: "Real-time design collaboration canvas with universal URL scraping, metadata extraction, and multi-tenant workspace permissions.",
      problem: "Creative teams share reference links across fragmented Slack threads, losing provenance and visual context.",
      solution: "Centralized moodboards with automatic OpenGraph preview card generation, tags, likes, and role-based permissions.",
      specs: [
        { label: "Framework", val: "Next.js 14 & Supabase Realtime" },
        { label: "Scraper Engine", val: "Universal headless OpenGraph & media metadata extractor" },
        { label: "Layout", val: "Adaptive virtualized masonry board with provenance audit trails" },
      ],
    },
  },
];

export const SERVICES = [
  {
    n: "01",
    title: "School & Institutional platform",
    plain: "A full bilingual portal for your school, college or academy. Admissions inquiry engine, division portals and mobile-ready.",
    tech: ["Next.js 16", "i18n (EN/HI)", "Admissions Funnel"],
    topic: "an institutional or school website",
  },
  {
    n: "02",
    title: "Online store",
    plain: "Sell your products on your own website, with a cart, payments and order tracking.",
    tech: ["Next.js", "Payment gateway", "Admin dashboard"],
    topic: "an online store",
  },
  {
    n: "03",
    title: "Portfolio website",
    plain: "A personal site that shows your work properly and gets you hired or booked.",
    tech: ["React", "GSAP animation", "SEO"],
    topic: "a portfolio website",
  },
  {
    n: "04",
    title: "Landing page",
    plain: "One focused page to launch an offer, event or app and collect sign-ups.",
    tech: ["Next.js", "Fast load", "Analytics"],
    topic: "a landing page",
  },
  {
    n: "05",
    title: "Business website",
    plain: "Your shop, studio or clinic online. Services, contact form and easy to find on Google.",
    tech: ["CMS", "SEO", "Forms"],
    topic: "a business website",
  },
  {
    n: "06",
    title: "AI tool",
    plain: "A chatbot, writing helper or document reader built into your product or business.",
    tech: ["OpenAI API", "Streaming", "Prompt design"],
    topic: "an AI-powered tool",
  },
  {
    n: "07",
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
