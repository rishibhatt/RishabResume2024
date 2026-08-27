import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  Lock,
  CheckCircle2,
  ArrowRight,
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "velvet",
    number: "01",
    title: "Velvet",
    subtitle: "Visual Curation & Collaborative Moodboard Platform",
    badge: "SaaS Platform",
    url: "https://the-velvet.netlify.app/explore",
    embedUrl: null, // blocks iframes — use screenshot
    screenshotUrl:
      "https://api.microlink.io/?url=https%3A%2F%2Fthe-velvet.netlify.app%2Fexplore&screenshot=true&meta=false&embed=screenshot.url",
    accentFrom: "#a855f7",
    accentTo: "#ec4899",
    tagBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    tech: ["Next.js 14", "TypeScript", "Supabase", "Tailwind", "REST APIs"],
    highlights: [
      "Universal link scraping with metadata & OpenGraph extraction",
      "Real-time collaborative moodboards with role-based access",
      "Adaptive masonry editorial boards with likes, tags & provenance",
    ],
  },
  {
    id: "api-forge",
    number: "02",
    title: "API Forge",
    subtitle: "AI-Powered API Design & Testing Platform",
    badge: "AI / GenAI",
    url: "https://api-forge.netlify.app/",
    embedUrl: "https://api-forge.netlify.app/",
    screenshotUrl: null,
    accentFrom: "#3b82f6",
    accentTo: "#06b6d4",
    tagBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    tech: ["Next.js", "OpenAI SDK", "TypeScript", "Tailwind", "Prompt Eng."],
    highlights: [
      "Natural language to fully-configured REST endpoint generation",
      "Streaming LLM tokens with real-time latency benchmark metrics",
      "Automated JSON schema validation, scoring & CORS sandboxing",
    ],
  },
  {
    id: "encrypted-cash",
    number: "03",
    title: "Encrypted Cash",
    subtitle: "Decentralized Crypto Transaction & ICO Platform",
    badge: "Production Web3",
    url: "https://encryptedcash.io/",
    embedUrl: "https://encryptedcash.io/",
    screenshotUrl: null,
    accentFrom: "#f59e0b",
    accentTo: "#10b981",
    tagBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    tech: ["React.js", "Next.js", "Web3.js", "MetaMask SDK", "Tailwind"],
    highlights: [
      "Non-custodial MetaMask wallet authentication with EIP-1193",
      "Real-time staking pools, APY tracking & live crypto price feeds",
      "Smart contract verified ICO sale with audited ERC-20 architecture",
    ],
  },
  {
    id: "dossier",
    number: "04",
    title: "Dossier",
    subtitle: "AI Resume-to-Portfolio Generation Engine",
    badge: "GenAI Product",
    url: "https://dossier-cv.netlify.app/",
    embedUrl: "https://dossier-cv.netlify.app/",
    screenshotUrl: null,
    accentFrom: "#10b981",
    accentTo: "#06b6d4",
    tagBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    tech: ["Next.js", "OpenAI APIs", "Framer Motion", "Tailwind", "Vercel"],
    highlights: [
      "Intelligent resume parsing with structured skill & experience graphs",
      "Dynamic multi-template responsive themes with live preview engine",
      "1-click publishing to a live shareable portfolio URL with SEO baked in",
    ],
  },
];

const DEVICE_MODES = [
  { id: "desktop", label: "Desktop", Icon: Monitor },
  { id: "tablet", label: "Tablet", Icon: Tablet },
  { id: "mobile", label: "Mobile", Icon: Smartphone },
];

// ─── DeviceFrame ───────────────────────────────────────────────────────────────
const Spinner = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-10">
    <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
    <span className="text-slate-400 text-xs">Loading preview…</span>
  </div>
);

const DeviceFrame = ({ project, deviceMode, iframeKey }) => {
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  const onLoad = useCallback(() => setLoading(false), []);
  const onError = useCallback(() => setLoading(false), []);

  if (deviceMode === "desktop") {
    return (
      <div className="relative w-full h-full">
        {loading && <Spinner />}
        {project.embedUrl ? (
          <iframe
            key={iframeKey}
            src={project.embedUrl}
            title={`${project.title} Live Preview`}
            className="w-full h-full border-0"
            onLoad={onLoad}
            onError={onError}
            allow="fullscreen"
          />
        ) : !imgError ? (
          <img
            src={project.screenshotUrl}
            alt={`${project.title} live screenshot`}
            className="w-full h-full object-cover object-top"
            onLoad={onLoad}
            onError={() => { setLoading(false); setImgError(true); }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 gap-4">
            <Globe className="w-12 h-12 text-purple-400 opacity-60" />
            <div className="text-center">
              <p className="text-white font-semibold mb-1">Live preview blocked by host</p>
              <p className="text-slate-400 text-sm mb-3">Open directly to explore the full experience</p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors"
              >
                Open {project.title} <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (deviceMode === "tablet") {
    return (
      <div className="relative mx-auto flex items-center justify-center h-full py-4">
        <div
          className="relative rounded-[28px] border-[10px] border-slate-700 bg-slate-800 shadow-2xl overflow-hidden"
          style={{ width: "min(560px, 100%)", aspectRatio: "4/3" }}
        >
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-600 z-20" />
          {loading && <Spinner />}
          {project.embedUrl ? (
            <div className="w-full h-full overflow-hidden relative">
              <iframe
                key={iframeKey + "-t"}
                src={project.embedUrl}
                title={`${project.title} Tablet`}
                className="border-0 absolute top-0 left-0"
                style={{ width: "1024px", height: "768px", transform: "scale(0.52)", transformOrigin: "top left" }}
                onLoad={onLoad}
                onError={onError}
              />
            </div>
          ) : (
            <img
              src={project.screenshotUrl}
              alt={`${project.title} tablet`}
              className="w-full h-full object-cover object-top"
              onLoad={onLoad}
              onError={onError}
            />
          )}
        </div>
      </div>
    );
  }

  // mobile
  return (
    <div className="relative mx-auto flex items-center justify-center h-full py-4">
      <div
        className="relative rounded-[40px] border-[12px] border-slate-700 bg-slate-800 shadow-2xl overflow-hidden"
        style={{ width: "min(240px, 85%)", aspectRatio: "9/19" }}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full bg-slate-900 z-20" />
        {loading && <Spinner />}
        {project.embedUrl ? (
          <div className="w-full h-full overflow-hidden relative">
            <iframe
              key={iframeKey + "-m"}
              src={project.embedUrl}
              title={`${project.title} Mobile`}
              className="border-0 absolute top-0 left-0"
              style={{ width: "390px", height: "844px", transform: "scale(0.53)", transformOrigin: "top left" }}
              onLoad={onLoad}
              onError={onError}
            />
          </div>
        ) : (
          <img
            src={project.screenshotUrl}
            alt={`${project.title} mobile`}
            className="w-full h-full object-cover object-top"
            onLoad={onLoad}
            onError={onError}
          />
        )}
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Project = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [deviceMode, setDeviceMode] = useState("desktop");
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const project = PROJECTS[activeIdx];

  const goNext = useCallback(() => setActiveIdx((i) => (i + 1) % PROJECTS.length), []);
  const goPrev = useCallback(() => setActiveIdx((i) => (i - 1 + PROJECTS.length) % PROJECTS.length), []);
  const reload = useCallback(() => setIframeKey((k) => k + 1), []);

  const selectProject = useCallback((i) => {
    setActiveIdx(i);
    setDeviceMode("desktop");
  }, []);

  return (
    <section
      id="projects"
      className="scroll-mt-16 min-h-screen pt-24 pb-16 sm:pt-28 sm:pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/20 text-white relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8">

        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-semibold mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Live Interactive Demos — Real Production Apps
          </div>
          <h2 className="text-3xl sm:text-5xl xl:text-6xl font-bold font-space-grotesk tracking-tight">
            Featured <span className="gradient-text">Production Projects</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Real deployed apps. Switch between Desktop, Tablet & Mobile previews — or open any app live.
          </p>
        </motion.div>

        {/* ── Project Selector Tabs ── */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-4 mb-6 sm:mb-8 touch-pan-x justify-start sm:justify-center">
          {PROJECTS.map((p, i) => {
            const active = i === activeIdx;
            return (
              <button
                key={p.id}
                onClick={() => selectProject(i)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-2xl font-semibold text-xs sm:text-sm border transition-all duration-300 touch-manipulation ${
                  active
                    ? "bg-slate-900 text-white shadow-xl scale-105"
                    : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
                style={active ? { borderColor: p.accentFrom } : {}}
              >
                <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${active ? "bg-white/10 text-white" : "bg-slate-800 text-slate-500"}`}>
                  {p.number}
                </span>
                <span className="font-space-grotesk">{p.title}</span>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden sm:block" />}
              </button>
            );
          })}
        </div>

        {/* ── Main: Info Panel + Preview Stage ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 mb-8 sm:mb-10"
          >
            {/* Left: Info Panel */}
            <div className="xl:col-span-4 flex flex-col bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-800 p-5 sm:p-7 relative overflow-hidden shadow-xl">
              {/* Accent strip */}
              <div
                className="absolute inset-x-0 top-0 h-1 rounded-t-3xl"
                style={{ background: `linear-gradient(to right, ${project.accentFrom}, ${project.accentTo})` }}
              />

              {/* Number + badges */}
              <div className="flex items-center justify-between mb-4 pt-1">
                <span className="font-mono text-4xl sm:text-5xl font-bold text-white/5 select-none leading-none">
                  {project.number}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${project.tagBg}`}>
                    {project.badge}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-space-grotesk leading-tight mb-1">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-4 leading-relaxed">{project.subtitle}</p>

              {/* Highlights */}
              <div className="space-y-2 mb-5">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-400" />
                    <span className="leading-snug">{h}</span>
                  </div>
                ))}
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/60 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-auto flex flex-col sm:flex-row xl:flex-col gap-2.5 pt-4 border-t border-slate-800">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 text-sm font-semibold shadow-lg touch-manipulation group"
                >
                  Open Live App
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href={`https://wa.me/918360558587?text=${encodeURIComponent(`Hi Rishab, I loved your ${project.title} project and want to discuss building something similar.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white text-sm font-semibold transition-all duration-200 touch-manipulation"
                >
                  Discuss This Project 💬
                </a>
              </div>

              {/* Prev/Next (mobile only) */}
              <div className="flex items-center justify-between mt-4 xl:hidden">
                <button onClick={goPrev} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors touch-manipulation py-2">
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-slate-600 text-xs">{activeIdx + 1} / {PROJECTS.length}</span>
                <button onClick={goNext} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors touch-manipulation py-2">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Browser Preview Stage */}
            <div className="xl:col-span-8 flex flex-col bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
              {/* Browser chrome */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-300 font-mono mx-3 flex-1 min-w-0">
                  <Lock className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{project.url.replace("https://", "")}</span>
                </div>

                <div className="flex items-center gap-1">
                  {DEVICE_MODES.map(({ id, Icon, label }) => (
                    <button
                      key={id}
                      onClick={() => setDeviceMode(id)}
                      title={label}
                      className={`p-1.5 rounded-lg transition-all touch-manipulation ${
                        deviceMode === id ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </button>
                  ))}
                  <button onClick={reload} title="Reload" className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all ml-0.5 touch-manipulation">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setIsFullscreen(true)} title="Fullscreen" className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all touch-manipulation hidden sm:block">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-slate-800 transition-all touch-manipulation" title="Open in new tab">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Preview area */}
              <div
                className="relative flex-1 bg-slate-950"
                style={{ minHeight: deviceMode === "desktop" ? "420px" : "500px" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${project.id}-${deviceMode}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-0"
                  >
                    <DeviceFrame project={project} deviceMode={deviceMode} iframeKey={iframeKey} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Accent bottom strip */}
              <div
                className="h-0.5 w-full flex-shrink-0"
                style={{ background: `linear-gradient(to right, ${project.accentFrom}60, ${project.accentTo}60)` }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Desktop prev/next + dots ── */}
        <div className="hidden xl:flex items-center justify-between mb-10">
          <button onClick={goPrev} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group touch-manipulation">
            <span className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-slate-700 group-hover:bg-slate-800 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </span>
            Previous Project
          </button>

          <div className="flex items-center gap-2">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => selectProject(i)}
                className={`rounded-full transition-all duration-300 touch-manipulation ${
                  i === activeIdx ? "w-8 h-2.5" : "w-2.5 h-2.5 bg-slate-700 hover:bg-slate-600"
                }`}
                style={i === activeIdx ? { background: `linear-gradient(to right, ${p.accentFrom}, ${p.accentTo})` } : {}}
              />
            ))}
          </div>

          <button onClick={goNext} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group touch-manipulation">
            Next Project
            <span className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-slate-700 group-hover:bg-slate-800 transition-all">
              <ChevronRight className="w-5 h-5" />
            </span>
          </button>
        </div>

        {/* ── 4-Card Quick Overview ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-14">
          {PROJECTS.map((p, i) => {
            const active = i === activeIdx;
            return (
              <motion.button
                key={p.id}
                onClick={() => selectProject(i)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`text-left p-4 rounded-2xl border transition-all duration-300 touch-manipulation ${
                  active ? "bg-slate-900" : "border-slate-800 bg-slate-900/40 hover:bg-slate-900/70"
                }`}
                style={active ? { borderColor: p.accentFrom } : {}}
              >
                <span className="font-mono text-xs text-slate-500 block mb-1">{p.number}</span>
                <h4 className="font-bold text-white text-sm sm:text-base font-space-grotesk mb-0.5">{p.title}</h4>
                <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-2 leading-snug mb-2">{p.subtitle}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${p.tagBg}`}>
                  {p.badge}
                </span>
              </motion.button>
            );
          })}
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
              Ready to Build Your Next Production Platform?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-7">
              Available immediately for contract & full-time senior frontend roles across Next.js, AI, and Web3.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:bhattrishu07@gmail.com?subject=Client%20Project%20Inquiry"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-semibold touch-manipulation"
              >
                Email for Project Discussion
                <ArrowRight className="w-4 h-4" />
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

      {/* ── Fullscreen Modal ── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-3 bg-slate-950 border-b border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="font-bold text-white font-space-grotesk ml-2 text-sm">
                  {project.title} — Live Preview
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                <Lock className="w-3 h-3 text-emerald-400" />
                {project.url.replace("https://", "")}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                >
                  Open Live <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden">
              {project.embedUrl ? (
                <iframe
                  src={project.embedUrl}
                  title={`${project.title} Fullscreen`}
                  className="w-full h-full border-0"
                />
              ) : (
                <img
                  src={project.screenshotUrl}
                  alt={`${project.title} fullscreen`}
                  className="w-full h-full object-cover object-top"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Project;
