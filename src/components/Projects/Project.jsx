import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  Lock,
  CheckCircle2,
  ArrowRight,
  Globe,
} from "lucide-react";

// ─── Project Data ───────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "h12-school",
    number: "01",
    title: "H-12 Academy",
    subtitle: "Bilingual K-12 Institutional Platform & Commercial Starter",
    description:
      "An editorial-grade, bilingual educational platform engineered as a customizable commercial starter for K-12 institutions. Built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, and GSAP 3, featuring division portals, faculty directory, and an enrollment-driven admissions engine.",
    badge: "Commercial Starter",
    url: "https://h12academy.netlify.app/",
    embedUrl: "https://h12academy.netlify.app/",
    screenshotUrl: null,
    previewImg: "/h12.png",
    accent: "#c89b3c",
    accentTo: "#0b1b2b",
    tagBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    glowColor: "rgba(200,155,60,0.18)",
    tech: ["Next.js 16", "TypeScript 5.9", "Tailwind v4", "GSAP 3", "i18n (EN/HI)"],
    highlights: [
      "26 static pre-rendered routes with sub-second page loads (Lighthouse 95+)",
      "Zero-hydration native bilingual localization (English & Hindi) with Devanagari tuning",
      "Interactive multi-step admissions funnel with CRM layer (HubSpot / Salesforce ready)",
    ],
  },
  {
    id: "velvet",
    number: "02",
    title: "Velvet",
    subtitle: "Visual Curation & Collaborative Moodboard Platform",
    description:
      "A SaaS platform where teams curate, organise and share inspiration — scraping any URL for rich media previews and building real-time collaborative boards together.",
    badge: "SaaS Platform",
    url: "https://the-velvet.netlify.app/explore",
    embedUrl: null,
    screenshotUrl:
      "https://api.microlink.io/?url=https%3A%2F%2Fthe-velvet.netlify.app%2Fexplore&screenshot=true&meta=false&embed=screenshot.url",
    previewImg: "/velvet.png",
    accent: "#a855f7",
    accentTo: "#ec4899",
    tagBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    glowColor: "rgba(168,85,247,0.15)",
    tech: ["Next.js 14", "TypeScript", "Supabase", "Tailwind", "REST APIs"],
    highlights: [
      "Universal link scraping with metadata & OpenGraph extraction",
      "Real-time collaborative moodboards with role-based access",
      "Adaptive masonry boards with likes, tags & provenance tracking",
    ],
  },
  {
    id: "api-forge",
    number: "03",
    title: "API Forge",
    subtitle: "AI-Powered API Design & Testing Platform",
    description:
      "Describe an API endpoint in plain English and API Forge builds the full configuration, runs live tests, validates JSON schemas, and benchmarks real-time latency — no Postman required.",
    badge: "AI / GenAI",
    url: "https://api-forge.netlify.app/",
    embedUrl: "https://api-forge.netlify.app/",
    screenshotUrl: null,
    previewImg: "/apiforge.png",
    accent: "#3b82f6",
    accentTo: "#06b6d4",
    tagBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    glowColor: "rgba(59,130,246,0.15)",
    tech: ["Next.js", "OpenAI SDK", "TypeScript", "Tailwind", "Prompt Eng."],
    highlights: [
      "Natural language → fully-configured REST endpoint in seconds",
      "Streaming LLM tokens with real-time latency benchmark metrics",
      "Automated JSON schema validation, scoring & CORS sandboxing",
    ],
  },
  {
    id: "encrypted-cash",
    number: "04",
    title: "Encrypted Cash",
    subtitle: "Decentralized Crypto Transaction & ICO Platform",
    description:
      "A production Web3 platform with MetaMask wallet login, live staking pools, real-time crypto prices, and a fully audited ICO smart contract — deployed and live for real users.",
    badge: "Production Web3",
    url: "https://encryptedcash.io/",
    embedUrl: "https://encryptedcash.io/",
    screenshotUrl: null,
    previewImg: "/encryptedcash.png",
    accent: "#f59e0b",
    accentTo: "#10b981",
    tagBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    glowColor: "rgba(245,158,11,0.12)",
    tech: ["React.js", "Next.js", "Web3.js", "MetaMask SDK", "Tailwind"],
    highlights: [
      "Non-custodial MetaMask wallet authentication with EIP-1193",
      "Real-time staking pools, APY tracking & live crypto price feeds",
      "Smart contract verified ICO with audited ERC-20 architecture",
    ],
  },
  {
    id: "dossier",
    number: "05",
    title: "Dossier",
    subtitle: "AI Resume-to-Portfolio Generation Engine",
    description:
      "Upload a resume and Dossier's AI engine extracts every project, skill and achievement — then instantly generates a polished, live portfolio site you can share with one click.",
    badge: "GenAI Product",
    url: "https://dossier-cv.netlify.app/",
    embedUrl: "https://dossier-cv.netlify.app/",
    screenshotUrl: null,
    previewImg: "/dossier.png",
    accent: "#10b981",
    accentTo: "#06b6d4",
    tagBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    glowColor: "rgba(16,185,129,0.12)",
    tech: ["Next.js", "OpenAI APIs", "Framer Motion", "Tailwind", "Vercel"],
    highlights: [
      "Intelligent resume parsing with structured skill & project graphs",
      "Dynamic multi-template responsive themes with live preview engine",
      "1-click publishing to a shareable portfolio URL with SEO built-in",
    ],
  },
];

// ─── Floating Cursor Preview (Desktop only) ─────────────────────────────────────
const CursorPreview = ({ project, visible }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 22 });
  const springY = useSpring(y, { stiffness: 180, damping: 22 });

  useEffect(() => {
    if (!visible) return;
    const move = (e) => {
      x.set(e.clientX + 28);
      y.set(e.clientY - 150);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [visible, x, y]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed z-[200] pointer-events-none select-none"
          style={{ left: springX, top: springY }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="w-72 rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl"
            style={{
              boxShadow: `0 24px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06), 0 0 40px ${project.glowColor}`,
            }}
          >
            {/* Mini browser bar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 border-b border-slate-800">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <div className="flex items-center gap-1 ml-1.5 px-2 py-0.5 bg-slate-800 rounded flex-1 min-w-0">
                <Lock className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-400 text-[10px] font-mono truncate">
                  {project.url.replace("https://", "")}
                </span>
              </div>
            </div>
            {/* Screenshot preview */}
            <div className="relative bg-slate-950" style={{ aspectRatio: "16/10" }}>
              <img
                src={project.previewImg}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute bottom-0 inset-x-0 h-0.5"
                style={{ background: `linear-gradient(to right, ${project.accent}, ${project.accentTo})` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Project Row ───────────────────────────────────────────────────────────────
const ProjectRow = ({ project, index, onHoverStart, onHoverEnd }) => {
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => { setHovered(true); onHoverStart(project); };
  const handleLeave = () => { setHovered(false); onHoverEnd(); };

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Hover glow bg */}
      <div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse 80% 100% at 20% 50%, ${project.glowColor}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div
        className="relative rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden"
        style={{
          borderColor: hovered ? `${project.accent}60` : "rgb(30,41,59)",
          borderLeftColor: hovered ? project.accent : undefined,
          borderLeftWidth: hovered ? "3px" : undefined,
        }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Top shimmer */}
        <div
          className="absolute inset-x-0 top-0 h-px transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, ${project.accent}, ${project.accentTo}, transparent)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* ── MOBILE LAYOUT: stacked with image on top ── */}
        <div className="xl:hidden">
          {/* Project screenshot image */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <img
              src={project.previewImg}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            {/* Live badge overlay */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[11px] text-emerald-400 bg-slate-900/80 backdrop-blur-sm border border-emerald-500/30 px-2.5 py-1 rounded-full font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </div>
            {/* Number on image */}
            <div className="absolute top-3 left-3">
              <span
                className="font-mono text-xs font-bold px-2 py-1 rounded-lg border"
                style={{
                  color: project.accent,
                  borderColor: `${project.accent}40`,
                  background: "rgba(15,23,42,0.8)",
                }}
              >
                {project.number}
              </span>
            </div>
          </div>

          {/* Mobile content */}
          <div className="p-5">
            {/* Badge */}
            <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${project.tagBg} inline-block mb-3`}>
              {project.badge}
            </span>
            <h3 className="text-xl font-bold text-white font-space-grotesk leading-tight mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-slate-300 font-medium mb-2">{project.subtitle}</p>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

            {/* Highlights */}
            <div className="space-y-2 mb-4">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-400" style={{ color: project.accent }} />
                  <span className="leading-snug">{h}</span>
                </div>
              ))}
            </div>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/60 text-xs font-medium">
                  {t}
                </span>
              ))}
            </div>

            {/* Mobile CTAs */}
            <div className="flex gap-2.5">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-sm font-bold text-white touch-manipulation"
                style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accentTo})` }}
              >
                Open Live <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://wa.me/918360558587?text=${encodeURIComponent(`Hi Rishab, I loved your ${project.title} project and want to discuss something similar.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm font-semibold touch-manipulation"
              >
                Discuss 💬
              </a>
            </div>
          </div>
        </div>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden xl:block p-8">
          {/* Top meta row */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="font-mono text-xs font-bold px-2 py-1 rounded-lg border transition-colors duration-300"
                style={{
                  color: hovered ? project.accent : "#64748b",
                  borderColor: hovered ? `${project.accent}40` : "#1e293b",
                  background: hovered ? `${project.accent}12` : "transparent",
                }}
              >
                {project.number}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${project.tagBg}`}>
                {project.badge}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={`https://wa.me/918360558587?text=${encodeURIComponent(`Hi Rishab, I loved your ${project.title} project and want to discuss something similar.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 text-xs font-semibold transition-all duration-200"
              >
                Discuss 💬
              </a>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all duration-200 group/btn"
                style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accentTo})` }}
              >
                Open Live
                <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Title + subtitle */}
          <div className="mb-3">
            <h3
              className="text-3xl xl:text-4xl font-bold font-space-grotesk leading-tight mb-1 transition-colors duration-300"
              style={{ color: hovered ? "#ffffff" : "#e2e8f0" }}
            >
              {project.title}
            </h3>
            <p className="text-base text-slate-300 font-medium leading-snug">{project.subtitle}</p>
          </div>

          <p className="text-slate-400 text-[15px] leading-relaxed mb-5 max-w-2xl">{project.description}</p>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle2
                  className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 transition-colors duration-300"
                  style={{ color: hovered ? project.accent : "#34d399" }}
                />
                <span className="leading-snug">{h}</span>
              </div>
            ))}
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60 text-xs font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────────
const Project = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const handleHoverStart = useCallback((project) => setHoveredProject(project), []);
  const handleHoverEnd = useCallback(() => setHoveredProject(null), []);

  return (
    <section
      id="projects"
      className="scroll-mt-16 min-h-screen pt-24 pb-16 sm:pt-28 sm:pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/20 text-white relative overflow-hidden"
    >
      {/* Cursor preview — desktop only */}
      <div className="hidden xl:block">
        <CursorPreview project={hoveredProject} visible={!!hoveredProject} />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 xl:px-8">

        {/* ── Section Header ── */}
        <motion.div
          className="mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-semibold mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            {PROJECTS.length} Live Production Apps
          </div>
          <h2 className="text-3xl sm:text-5xl xl:text-6xl font-bold font-space-grotesk tracking-tight text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-lg">
            Real apps, real users, real impact — each one live in production.
          </p>
        </motion.div>

        {/* ── Project Rows ── */}
        <div className="space-y-4 sm:space-y-5 mb-14">
          {PROJECTS.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            />
          ))}
        </div>

        {/* ── CTA Footer ── */}
        <motion.div
          className="relative text-center rounded-3xl border border-blue-500/20 p-8 sm:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/15 to-slate-900/30 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-xl sm:text-3xl font-bold text-white mb-3 font-space-grotesk">
              Ready to Build Something Like This?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-7">
              Available for contract & full-time senior frontend roles — Next.js, AI integrations, and Web3.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:bhattrishu07@gmail.com?subject=Client%20Project%20Inquiry"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-semibold touch-manipulation"
              >
                Discuss a Project <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918360558587?text=Hi%20Rishab,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-emerald-600/20 touch-manipulation"
              >
                Chat on WhatsApp 💬
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Project;
