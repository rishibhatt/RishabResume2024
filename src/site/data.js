export const WA_NUMBER = "918360558587";
export const wa = (msg) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export const SITE = "https://rishieee.netlify.app";
export const mail = (subject, body = "") =>
  `mailto:bhattrishu07@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
    line: "A finished, bilingual school website with an admissions enquiry engine.",
    tags: ["Next.js 16","Bilingual EN/HI","GSAP"],
    n: "01",
    name: "H-12 Academy",
    domain: "h12academy.netlify.app",
    url: "https://h12academy.netlify.app",
    repo: "https://github.com/rishibhatt/h-12-school",
    d: "/shots/h12-d.webp",
    m: "/shots/h12-m.webp",
    hue: "oklch(76% 0.16 80)",
    type: "product",
    kind: "Website for schools",
    badge: "Ready to launch",
    category: "starters",
    tagline: "A school website that turns parents into admission enquiries.",
    plain:
      "Parents compare schools online before they ever call. H-12 gives yours a site that answers their questions, shows the campus properly and walks them through an admissions enquiry step by step. It switches between English and Hindi in one tap and loads fast on a phone.",
    wins: [
      "A page for each division, Kindergarten to Grade 12",
      "English and Hindi, switched in one tap",
      "Every enquiry gets a reference code your office can track",
      "Faculty, roadmap, gallery and noticeboard pages included",
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
      headline: "Get your school online before the next admissions season",
      subhead: "Fixed price. Fixed timeline. You own the code. Choose a package, add what you need, and see the total before you message me.",
      care: { name: "Care plan", usdMonth: 49, inrMonth: 3999, usdYear: 490, inrYear: 39990, note: "Hosting checks, security updates and small content changes, so the site stays current after launch." },
      payment: "50% to start, 50% when you approve the live site.",
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
    line: "Paste an OpenAPI spec. It tests the API, scores it and writes the types.",
    tags: ["Next.js","OpenAI","TypeScript"],
    n: "02",
    name: "API Forge",
    domain: "apiforge.info",
    url: "https://apiforge.info",
    repo: "https://github.com/rishibhatt/api-forge",
    d: "/shots/apiforge-d.webp",
    m: "/shots/apiforge-m.webp",
    hue: "oklch(78% 0.13 225)",
    type: "personal",
    kind: "Personal project",
    badge: "Built by me, not for sale",
    category: "ai",
    tagline: "Paste an API spec. Get it tested and graded.",
    plain:
      "If you build or use APIs, API Forge checks one in seconds. It reads the spec, sends test requests, scores the design from 0 to 100 and writes the TypeScript types for you.",
    wins: [
      "Works from a spec link or a pasted file",
      "Sends test requests without CORS errors",
      "Generates TypeScript types and tests",
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
    line: "Upload a resume PDF. Get a portfolio site and a link to share.",
    tags: ["Next.js","AI parsing","Templates"],
    n: "03",
    name: "Dossier",
    domain: "dossier-cv.com",
    url: "https://dossier-cv.com",
    repo: "https://github.com/rishibhatt/dossier",
    d: "/shots/dossier-d.webp",
    m: "/shots/dossier-m.webp",
    hue: "oklch(84% 0.14 172)",
    type: "personal",
    kind: "Personal project",
    badge: "Built by me, not for sale",
    category: "ai",
    tagline: "Your resume, set as a website.",
    plain:
      "Upload the PDF you already have. Dossier lays it out as a portfolio site, lets you try different looks, and gives you a link to share.",
    wins: [
      "Upload a PDF, no design skills needed",
      "Try looks until one feels like you",
      "Publish a link you can send to anyone",
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
    line: "Shared moodboards. Paste a link, everyone sees it live.",
    tags: ["Next.js","Supabase","Realtime"],
    n: "04",
    name: "Velvet",
    domain: "the-velvet.netlify.app",
    url: "https://the-velvet.netlify.app",
    repo: "https://github.com/rishibhatt/velvet",
    d: "/shots/velvet-d.webp",
    m: "/shots/velvet-m.webp",
    hue: "oklch(76% 0.13 300)",
    type: "personal",
    kind: "Personal project",
    badge: "Built by me, not for sale",
    category: "saas",
    tagline: "Moodboards your whole team builds together.",
    plain:
      "Save inspiration from any link onto a shared board. Everyone sees new additions as they happen, and you decide who can view or edit.",
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
    title: "Websites and landing pages",
    plain: "A site that explains what you do, looks right on every phone and gets the enquiry. For schools, studios, clinics, shops and launches.",
    tech: ["Next.js", "React", "SEO", "GSAP"],
    topic: "a website or landing page",
  },
  {
    title: "Online stores",
    plain: "Sell your products on your own site, with a cart, payments and an order view you can actually use.",
    tech: ["Next.js", "Payment gateway", "Admin dashboard"],
    topic: "an online store",
  },
  {
    title: "AI features and tools",
    plain: "A chatbot, a writing helper or a document reader inside your product, wired to real data and built to hold up in daily use.",
    tech: ["OpenAI API", "Streaming", "TypeScript"],
    topic: "an AI-powered tool",
  },
  {
    title: "Web apps, dashboards and Web3",
    plain: "The screens your team or customers log in to. Live numbers, admin panels, wallet login and staking views.",
    tech: ["React", "Supabase", "Web3.js", "Dashboards"],
    topic: "a web app, dashboard or Web3 product",
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

export const PRODUCT_STEPS = [
  { t: "Pick a package", d: "Choose the one closest to your school. Add anything extra, and see the total before you message me." },
  { t: "Send your content", d: "Logo, text and photos. A simple checklist tells you exactly what to send." },
  { t: "Review the live site", d: "You get a private link within 10 business days of sending content. Ask for changes, then we launch." },
];

export const PRODUCT_FAQ = [
  { q: "Who owns the website?", a: "You do. The full source code is transferred to your own GitHub account when we launch." },
  { q: "How long does it take?", a: "7 to 21 business days depending on the package, counted from the day I receive your content." },
  { q: "Can I see it before I buy?", a: "Yes. The H-12 demo is live. Open it on your phone and on a computer, then decide." },
  { q: "Is hosting included?", a: "Domain setup, SSL and launch on Netlify or Vercel are included in every package." },
  { q: "My school is not a school. Can you build one for my business?", a: "Yes. Message me what you run and I will tell you the simplest way to build it. New ready-to-launch sites are added here as I finish them." },
];

/** The sellable offer. Everything here is shown on the page, so keep it true. */
export const OFFER = {
  name: "H-12 School Website",
  bonuses: [
    { t: "Admissions enquiry engine", d: "Step-by-step form, a reference code for every enquiry, ready to connect to your CRM." },
    { t: "English and Hindi", d: "One tap to switch. A second language pair can be added." },
    { t: "26 pages built and tested", d: "Divisions, faculty, roadmap, gallery, events and noticeboard." },
    { t: "Staff handover guide", d: "So your office team knows how to run it (Campus package and above)." },
    { t: "You own the code", d: "Transferred to your GitHub account when we launch." },
  ],
  guarantee: "A private live link within 10 business days of receiving your content, or $200 comes off the price.",
  free: "Send me your school's current website link. I'll reply with the three changes most likely to bring in more admission enquiries.",
};
