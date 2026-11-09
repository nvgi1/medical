import {
  useState,
  useEffect,
  useRef,
  lazy,
  Suspense,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  BrowserRouter,
  MemoryRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  Globe,
  Activity,
  ScanLine,
  Cpu,
  Download,
  ChevronDown,
  Mail,
  MapPin,
  ExternalLink,
  Linkedin,
  MessageCircle,
  FileText,
  Expand,
  Plus,
  Minus,
  ImagePlus,
  Check,
  Layers,
  GraduationCap,
} from "lucide-react";
import {
  profile,
  routes,
  l,
  projectCategories,
  projects,
  projectFields,
  projectDetails,
  certificates,
  experience,
  skills,
  skillLevels,
  resumeSections,
  resumeContent,
  type Lang,
  type Local,
} from "./data/content";
import { equipment } from "./data/equipment";
import { cvPdfs } from "./data/cv-pdfs";
import {
  BootScreen,
  ChapterOrb,
  CursorGlow,
  RouteWipe,
  ScrollProgress,
  useInteractiveTilt,
  useMagneticButtons,
  useScrollReveal,
} from "./components/motion";
const Scene = lazy(() => import("./components/Scene"));
const tr = (v: Local, lang: Lang) => v[lang];
const placeholder = l("محتوى قابل للتحرير", "Editable placeholder");
const rise = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 26, filter: "blur(7px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
  },
});
function IconArrow() {
  return <ArrowUpRight size={17} className="arrow" />;
}
function Model({
  lang,
  kind,
  compact = false,
}: {
  lang: Lang;
  kind?: string;
  compact?: boolean;
}) {
  return (
    <Suspense fallback={<div className="scene scene-loading">NAGI / LAB</div>}>
      <Scene lang={lang} kind={kind} compact={compact} />
    </Suspense>
  );
}
function Badge({ lang }: { lang: Lang }) {
  return (
    <span className="placeholder-badge">
      <span />
      {tr(placeholder, lang)}
    </span>
  );
}
function SeoHead({ lang, pathname }: { lang: Lang; pathname: string }) {
  const t = (v: Local) => tr(v, lang);
  useEffect(() => {
    const configuredSite = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");
    const siteUrl = configuredSite || window.location.origin;
    const cleanPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
    const canonical = `${siteUrl}${cleanPath}`;
    const route = routes.find((item) => item.path === cleanPath);
    const isProject = cleanPath.startsWith("/projects/");
    const title = cleanPath === "/"
      ? "Nagi Alnoor | Medical Equipment Engineer"
      : isProject
      ? `${profile.name.en} | ${tr(projects.find((p) => `/projects/${p.id}` === cleanPath)?.title || l("مشروع هندسي", "Engineering project"), lang)}`
      : route
        ? `${profile.name.en} | ${t(route.label)}`
        : `${profile.name.en} | ${t(l("الهندسة الطبية", "Medical Equipment Engineering"))}`;
    const description = route
      ? t(route.desc)
      : t(
          l(
            "ناجي النور خليفة، مهندس معدات طبية متخصص في الأجهزة الطبية وتقنيات الرعاية الصحية والهندسة الطبية وصيانة المعدات.",
            "Nagi Alnoor – Medical Equipment Engineer specializing in medical devices, healthcare technology, biomedical instrumentation, medical equipment maintenance, and healthcare engineering.",
          ),
        );
    document.title = title;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    const setMeta = (key: string, content: string, attr = "name") => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta("description", description);
    setMeta("author", "Nagi Alnoor");
    setMeta("keywords", "Nagi Alnoor, Medical Equipment Engineer, Medical Equipment Engineering, Biomedical Equipment, Medical Devices Engineering, Biomedical Instrumentation, Healthcare Technology, Medical Equipment Maintenance, Clinical Engineering");
    setMeta("robots", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", isProject ? "article" : "website", "property");
    setMeta("og:url", canonical, "property");
    setMeta("og:site_name", "Nagi Alnoor", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;
    const person = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name.en,
      alternateName: profile.name.ar,
      jobTitle: "Medical Equipment Engineer",
      description,
      url: `${siteUrl}/profile`,
      image: `${siteUrl}${profile.portrait}`,
      sameAs: [profile.linkedin],
      knowsAbout: [
        "Medical Equipment Engineering",
        "Biomedical Equipment",
        "Medical Devices Engineering",
        "Healthcare Technology",
        "Medical Equipment Maintenance",
      ],
    };
    const website = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Nagi Alnoor",
      alternateName: "Nagi Alnoor | Medical Equipment Engineer",
      url: siteUrl,
      inLanguage: ["ar", "en"],
    };
    const graph: Record<string, unknown>[] = [person, website];
    if (cleanPath === "/profile") {
      graph.push({
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: title,
        url: canonical,
        mainEntity: { "@id": `${siteUrl}/#person` },
      });
    }
    if (cleanPath !== "/") {
      graph.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Nagi Alnoor", item: siteUrl },
          { "@type": "ListItem", position: 2, name: title, item: canonical },
        ],
      });
    }
    let jsonLd = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld="true"]');
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.type = "application/ld+json";
      jsonLd.dataset.seoJsonld = "true";
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  }, [lang, pathname]);
  return null;
}
function Signal({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`signal ${className}`}
      viewBox="0 0 400 60"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path className="signal-base" d="M0 35H400" />
      <path d="M0 35h38l8-4 8 4h23l8-13 7 26 10-43 10 51 10-21h25l9-8 10 8h35l8-4 8 4h23l8-13 7 26 10-43 10 51 10-21h25l9-8 10 8h65" />
    </svg>
  );
}
function Illustration({ kind = "signal" }: { kind?: string }) {
  return (
    <div className={`illustration ${kind}`}>
      <span className="ill-label">NAGI / ENGINEERING STUDY</span>
      {kind === "signal" ? (
        <>
          <Signal />
          <div className="chart-ruler">
            0.0 <span>0.5</span> 1.0 <span>1.5</span> 2.0
          </div>
        </>
      ) : kind === "scanner" ? (
        <svg viewBox="0 0 400 230" aria-hidden="true">
          <defs>
            <linearGradient id="scannerG">
              <stop stopColor="#27434c" />
              <stop offset=".5" stopColor="#a1c0c5" />
              <stop offset="1" stopColor="#20333e" />
            </linearGradient>
          </defs>
          <ellipse cx="210" cy="192" rx="108" ry="12" fill="#153037" />
          <path d="M126 165V91a74 74 0 0 1 148 0v74Z" fill="url(#scannerG)" />
          <ellipse
            cx="200"
            cy="92"
            rx="43"
            ry="46"
            fill="#07151e"
            stroke="#6de0d2"
            strokeWidth="2"
          />
          <path d="m181 112 36-1 45 77h-49Z" fill="#78949f" />
          <path d="M214 187h48v6h-48Z" fill="#263d49" />
          <path d="M240 64h12v25h-12Z" fill="#0c2632" />
        </svg>
      ) : (
        <svg viewBox="0 0 400 230" aria-hidden="true">
          <g fill="none" stroke="#30545d" strokeWidth="1">
            {[50, 70, 90, 110, 130, 150].map((n, i) => (
              <path
                key={n}
                d={`M0 ${n}H${100 + i * 8}l25 25h${100 - i * 8}l30-30h145`}
              />
            ))}
          </g>
          <rect
            x="157"
            y="63"
            width="90"
            height="90"
            rx="3"
            fill="#101f29"
            stroke="#6de0d2"
          />
          <rect x="169" y="75" width="66" height="66" fill="#1b3740" />
          <path d="m186 107 8 8 19-20" fill="none" stroke="#6de0d2" />
          <text x="201" y="178" textAnchor="middle" fill="#5c8b92" fontSize="9">
            MEDICAL ELECTRONICS
          </text>
        </svg>
      )}
      <span className="ill-cross">+</span>
    </div>
  );
}
function Modal({
  children,
  onClose,
  label,
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null),
    closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const prev = document.activeElement as HTMLElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab") {
        const els = ref.current?.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),[tabindex="0"]',
        );
        if (!els?.length) return;
        const first = els[0],
          last = els[els.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", key);
      prev?.focus();
    };
  }, []);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close icon-button"
          onClick={onClose}
          aria-label={/[\u0600-\u06FF]/.test(label) ? "إغلاق" : "Close"}
        >
          <X size={22} />
        </button>
        {children}
      </div>
    </div>
  );
}
function Shell() {
  const [lang, setLang] = useState<Lang>("ar"),
    [menu, setMenu] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();
  const t = (v: Local) => tr(v, lang);
  useScrollReveal(location.pathname + lang);
  useInteractiveTilt(location.pathname);
  useMagneticButtons(location.pathname);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  useEffect(() => {
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);
  return (
    <div className="app">
      <SeoHead lang={lang} pathname={location.pathname} />
      <ScrollProgress />
      <BootScreen
        label={t(l("تهيئة النظام البصري", "CALIBRATING VISUAL SYSTEM"))}
      />
      <RouteWipe trigger={location.pathname} />
      <div className="ambient-glow" aria-hidden="true" />
      <CursorGlow />
      <a className="skip-link" href="#main">
        {t(l("انتقل إلى المحتوى", "Skip to content"))}
      </a>
      <header className="header" dir="ltr">
        <Link to="/" className="brand" aria-label="NAGI home">
          <span>
            NAGI<span className="brand-dot">.</span>
          </span>
          <span className="brand-sub">
            BIOMEDICAL
            <br />
            ENGINEERING
          </span>
        </Link>
        <nav
          className="desktop-nav"
          dir={lang === "ar" ? "rtl" : "ltr"}
          aria-label={t(l("التنقل الرئيسي", "Primary navigation"))}
        >
          <NavLink to="/" end>
            {t(l("الرئيسية", "Overview"))}
          </NavLink>
          {[routes[0], routes[1], routes[5], routes[6]].map((r) => (
            <NavLink key={r.path} to={r.path}>
              {t(r.label)}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="lang-button"
            aria-label={
              lang === "ar" ? "Switch to English" : "التبديل إلى العربية"
            }
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          >
            <Globe size={14} />
            <span>{lang === "ar" ? "EN" : "عربي"}</span>
          </button>
          <span className="header-divider" />
          <button
            className="menu-button"
            aria-label={t(l("فتح قائمة الأقسام", "Open all sections"))}
            aria-expanded={menu}
            onClick={() => setMenu(true)}
          >
            <Menu size={21} />
            <span>{t(l("القائمة", "Explore"))}</span>
          </button>
        </div>
      </header>
      {menu && (
        <Modal
          label={t(l("جميع الأقسام", "All sections"))}
          onClose={() => setMenu(false)}
        >
          <div className="menu-heading">
            <span className="eyebrow">NAGI / EXPLORE THE WORLD</span>
            <h2>{t(l("اختر وجهتك", "Choose your destination"))}</h2>
          </div>
          <nav className="menu-grid">
            <Link to="/" onClick={() => setMenu(false)}>
              <small>00</small>
              {t(l("الرئيسية", "Overview"))}
              <IconArrow />
            </Link>
            {routes.map((r, i) => (
              <Link key={r.path} to={r.path} onClick={() => setMenu(false)}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {t(r.label)}
                <IconArrow />
              </Link>
            ))}
          </nav>
        </Modal>
      )}
      <main id="main">
        <motion.div
          key={location.pathname}
          className="route-view"
          initial={
            reduce
              ? { opacity: 0 }
              : { opacity: 0, y: 22, scale: 0.996, filter: "blur(9px)" }
          }
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: reduce ? 0.15 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
            <Routes location={location}>
              <Route path="/" element={<Home lang={lang} />} />
              {routes.map((r) => (
                <Route
                  key={r.path}
                  path={r.path}
                  element={<Section lang={lang} path={r.path} />}
                />
              ))}
              <Route
                path="/projects/:id"
                element={<ProjectDetail lang={lang} />}
              />
              <Route
                path="*"
                element={
                  <div className="not-found">
                    <span className="eyebrow">404 / OUTSIDE THE LAB</span>
                    <h1>
                      {t(l("لنعد إلى المختبر", "Let’s return to the lab"))}
                    </h1>
                    <Link className="button primary" to="/">
                      {t(l("العودة للرئيسية", "Back to overview"))}
                      <IconArrow />
                    </Link>
                  </div>
                }
              />
            </Routes>
        </motion.div>
      </main>
      <footer className="footer" dir="ltr">
        <Link to="/" className="footer-brand">
          NAGI.
        </Link>
        <span>ENGINEERING WITH PURPOSE.</span>
        <div>
          <span>© {new Date().getFullYear()} NAGI</span>
          <span className="footer-line" />
          <Link to="/contact">
            {t(l("لنبدأ حواراً", "Start a conversation"))}
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
function Home({ lang }: { lang: Lang }) {
  const t = (v: Local) => tr(v, lang);
  const heroRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const pointerX = useSpring(0, { stiffness: 65, damping: 18, mass: 0.4 });
  const pointerY = useSpring(0, { stiffness: 65, damping: 18, mass: 0.4 });
  const rotateY = useTransform(pointerX, [-1, 1], [8, -8]);
  const rotateX = useTransform(pointerY, [-1, 1], [-5, 5]);
  const copyX = useTransform(pointerX, [-1, 1], [12, -12]);
  const copyY = useTransform(pointerY, [-1, 1], [-8, 8]);
  const glowLeft = useTransform(pointerX, [-1, 1], ["38%", "62%"]);
  const glowTop = useTransform(pointerY, [-1, 1], ["34%", "66%"]);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
  const onPointer = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduce) return;
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - box.left) / box.width - 0.5) * 2);
    pointerY.set(((event.clientY - box.top) / box.height - 0.5) * 2);
  };
  return (
    <>
      <section
        className="hero"
        ref={heroRef}
        onPointerMove={onPointer}
        onPointerLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
      >
        <div className="hero-topline" dir="ltr">
          <span>
            <i className="status-dot" />
            THE HUMAN SIDE OF ENGINEERING
          </span>
          <span>
            NAGI / BIOMEDICAL WORLD <span className="muted">—</span> 001
          </span>
        </div>
        <div className="hero-layout">
          <motion.div
            className="hero-copy"
            style={{ x: copyX, y: copyY, opacity: copyFade }}
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
            }}
          >
            <motion.div className="eyebrow hero-eyebrow" variants={rise()}>
              <span className="mini-line" />
              {t(
                l(
                  "ناجي · عالم الهندسة الطبية",
                  "NAGI · BIOMEDICAL ENGINEERING",
                ),
              )}
            </motion.div>
            <motion.h1 variants={rise(0.04)}>
              {t(l("نهندس التقنية.", "Engineering technology."))}
              <br />
              <span>{t(l("لنرتقي بالحياة.", "Advancing healthcare."))}</span>
            </motion.h1>
            <motion.div className="hero-title" variants={rise(0.08)}>
              {t(profile.title)}
              <span>/</span>
              {t(profile.specialization)}
            </motion.div>
            <motion.p className="hero-description" variants={rise(0.12)}>
              {t(
                l(
                  "عند تقاطع الهندسة والتقنية الطبية وصحة الإنسان، يبدأ عالمٌ من الاحتمالات. أهلاً بك في عالمي.",
                  "At the intersection of engineering, medical technology, and human health, a world of possibilities begins. Welcome to my world.",
                ),
              )}
            </motion.p>
            <motion.div className="hero-buttons" variants={rise(0.16)}>
              <Link to="/profile" className="button primary">
                <Activity size={17} />
                {t(l("الملف الشخصي", "View profile"))}
                <IconArrow />
              </Link>
              <Link to="/medical-equipment" className="button ghost">
                <ScanLine size={17} />
                {t(l("ادخل المختبر الافتراضي", "Enter the virtual lab"))}
                <IconArrow />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="hero-visual"
            dir="ltr"
            style={{
              rotateX: reduce ? 0 : rotateX,
              rotateY: reduce ? 0 : rotateY,
              y: visualY,
              transformPerspective: 1300,
            }}
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="hero-glow"
              aria-hidden="true"
              style={{ left: glowLeft, top: glowTop }}
            />
            <span className="visual-index">
              FIG. 01 <span>HUMAN × ENGINEERING</span>
            </span>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <Model lang={lang} />
            <div className="scan-beam" />
            <div className="model-label label-top">
              <span className="label-dot" />
              <span>
                BIOMEDICAL SYSTEMS<small>ANATOMICAL STUDY / 3D</small>
              </span>
            </div>
            <div className="model-label label-heart">
              <span className="heart-dot" />
              <span>
                CARDIAC ACTIVITY<small>ILLUSTRATIVE SIGNAL</small>
              </span>
              <Signal className="cardiac-signal" />
            </div>
            <div className="visual-bottom">
              <span>SCHEMATIC / NOT FOR CLINICAL USE</span>
              <span className="axis">
                X <i /> Y <i /> Z
              </span>
            </div>
          </motion.div>
        </div>
        <div className="hero-bottom">
          <span className="scroll-cue">
            <span className="scroll-mouse" />
            {t(l("استكشف ما وراء التقنية", "EXPLORE BEYOND THE TECHNOLOGY"))}
          </span>
          <span className="hero-note">
            {t(
              l(
                "هندسة بعقل علمي. وغاية إنسانية.",
                "A scientific mindset. A human purpose.",
              ),
            )}
          </span>
          <span className="page-count" dir="ltr">
            01 <span>/ 10</span>
          </span>
        </div>
      </section>
      <section className="discipline-strip">
        {[
          {
            icon: ScanLine,
            title: l("التقنيات الطبية", "Medical technology"),
            text: l("استكشف هندسة الرعاية", "Explore the engineering of care"),
            path: "/medical-equipment",
          },
          {
            icon: Cpu,
            title: l("الابتكار الهندسي", "Engineering innovation"),
            text: l("من الفكرة إلى الحل", "From an idea to a solution"),
            path: "/projects",
          },
        ].map((c, i) => (
          <Link to={c.path} key={c.path}>
            <span className="strip-icon">
              <c.icon size={24} strokeWidth={1.25} />
            </span>
            <div>
              <small dir="ltr">
                0{i + 1} / { ["TECHNOLOGY", "INNOVATION"][i] }
              </small>
              <h3>{t(c.title)}</h3>
              <p>{t(c.text)}</p>
            </div>
            <IconArrow />
          </Link>
        ))}
      </section>
      <section className="world-section">
        <div className="section-row">
          <div>
            <span className="eyebrow">
              {t(l("عوالم متصلة", "CONNECTED WORLDS"))}
            </span>
            <h2>{t(l("أكثر من ملف شخصي.", "More than a portfolio."))}</h2>
          </div>
          <span className="section-caption">
            {t(l("كل فصل، منظور جديد.", "Every chapter, a new perspective."))}
          </span>
        </div>
        <div className="chapter-grid">
          {[
            routes[0],
            routes[2],
            routes[3],
            routes[4],
            routes[5],
            routes[6],
          ].map((r, i) => (
            <Link to={r.path} key={r.path}>
              <span className="chapter-index" dir="ltr">
                / {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{t(r.label)}</h3>
              <IconArrow />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
function Section({ lang, path }: { lang: Lang; path: string }) {
  const t = (v: Local) => tr(v, lang);
  const r = routes.find((r) => r.path === path)!;
  return (
    <div className="section-page">
      <div className="breadcrumb">
        <Link to="/">{t(l("الرئيسية", "Overview"))}</Link>
        <span>/</span>
        <span>{t(r.label)}</span>
        <span className="breadcrumb-index" dir="ltr">
          NAGI / {String(routes.indexOf(r) + 1).padStart(2, "0")}
        </span>
      </div>
      {path !== "/projects" && (
        <header className="page-heading">
          <ChapterOrb index={routes.indexOf(r) + 1} />
          <div className="eyebrow">
            <span className="mini-line" />
            {
              [
                "PROFILE",
                "PROJECT ARCHIVE",
                "CERTIFICATE ARCHIVE",
                "VIRTUAL EQUIPMENT LAB",
                "ACADEMIC FOUNDATION",
                "CURRICULUM VITAE",
                "OPEN A CONVERSATION",
              ][routes.indexOf(r)]
            }
          </div>
          <h1>{t(r.title)}</h1>
          <p>{t(r.desc)}</p>
        </header>
      )}
      {path === "/profile" ? (
        <Profile lang={lang} />
      ) : path === "/projects" ? (
        <Projects lang={lang} />
      ) : path === "/certifications" ? (
        <Certificates lang={lang} />
      ) : path === "/medical-equipment" ? (
        <Equipment lang={lang} />
      ) : path === "/education" ? (
        <Education lang={lang} />
      ) : path === "/resume" ? (
        <Resume lang={lang} />
      ) : (
        <Contact lang={lang} />
      )}
      <div className="section-pagination">
        <Link to="/">
          <ArrowLeft size={15} />
          {t(l("العودة للرئيسية", "Back to overview"))}
        </Link>
        <Link to={routes[(routes.indexOf(r) + 1) % routes.length].path}>
          {t(l("الفصل التالي", "Next chapter"))}
          <span>
            {t(routes[(routes.indexOf(r) + 1) % routes.length].label)}
          </span>
          <IconArrow />
        </Link>
      </div>
    </div>
  );
}
function Profile({ lang }: { lang: Lang }) {
  const t = (v: Local) => tr(v, lang);
  return (
    <>
      <div className="profile-grid">
        <div className="profile-portrait">
          {profile.portrait ? (
            <img src={profile.portrait} alt={t(profile.name)} />
          ) : (
            <>
              <div className="portrait-lines" />
              <span className="portrait-monogram">
                N<span>.</span>
              </span>
              <div className="portrait-caption">
                <ImagePlus size={19} />
                <span>
                  {t(l("مساحتك في الصورة", "Your place in the picture"))}
                  <small>
                    {t(
                      l(
                        "[أضف الصورة الشخصية]",
                        "[Add professional photograph]",
                      ),
                    )}
                  </small>
                </span>
              </div>
            </>
          )}
          <span className="portrait-index" dir="ltr">
            PORTRAIT / 01
          </span>
        </div>
        <div className="profile-info">
          <Badge lang={lang} />
          <h2>{t(profile.name)}</h2>
          <span className="accent">{t(profile.title)}</span>
          <p>{t(profile.introduction)}</p>
          <dl className="data-list">
            {[
              [l("التخصص", "Specialization"), profile.specialization],
              [l("المؤهل", "Qualification"), profile.qualification],
              [l("الجامعة", "University"), profile.university],
              [l("التخرج", "Graduation"), profile.graduation],
              [l("الموقع", "Location"), profile.location],
            ].map(([a, b]) => (
              <div key={a.en}>
                <dt>{t(a)}</dt>
                <dd>{t(b)}</dd>
              </div>
            ))}
          </dl>
          <h3>{t(l("الهدف المهني", "Career objective"))}</h3>
          <p>{t(profile.objective)}</p>
          <h3>{t(l("الاهتمامات المهنية", "Professional interests"))}</h3>
          <p>{t(profile.interests)}</p>
          <Link className="text-link" to="/resume">
            {t(l("اطّلع على السيرة الذاتية", "View professional resume"))}
            <IconArrow />
          </Link>
        </div>
      </div>
      <div className="mini-journey">
        <span className="eyebrow">
          {t(l("المعرفة تتطور إلى أثر", "KNOWLEDGE BECOMES IMPACT"))}
        </span>
        <div>
          {[
            l("التعلّم", "Learn"),
            l("التجربة", "Explore"),
            l("التطوير", "Develop"),
            l("الأثر", "Contribute"),
          ].map((x, i) => (
            <span key={x.en}>
              <small>0{i + 1}</small>
              {t(x)}
              <i />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
function Projects({ lang }: { lang: Lang }) {
  const t = (v: Local) => tr(v, lang);
  const entries = projects.filter((p) => p.id === "graduation-study");
  return (
    <>
      {entries.length ? (
        <div className="project-grid">
          {entries.map((p, i) => (
            <Link className="project-card" key={p.id} to={`/projects/${p.id}`}>
              <div className="project-image">
                <Illustration kind={p.visual} />
                <span className="project-expand">
                  <ArrowUpRight size={21} />
                </span>
              </div>
              <div className="project-meta">
                <span>{t(projectCategories[p.category])}</span>
                <span>0{i + 1}</span>
              </div>
              <h2>{t(p.title)}</h2>
              <p>{t(p.summary)}</p>
              {p.id !== "graduation-study" && <Badge lang={lang} />}
            </Link>
          ))}
        </div>
      ) : (
        <Empty
          lang={lang}
          text={l(
            "لا توجد مشاريع في هذا التصنيف بعد.",
            "No projects in this category yet.",
          )}
        />
      )}
    </>
  );
}
function ProjectDetail({ lang }: { lang: Lang }) {
  const { id } = useParams();
  const p = projects.find((p) => p.id === id);
  const t = (v: Local) => tr(v, lang);
  if (!p)
    return (
      <div className="not-found">
        <h1>{t(l("المشروع غير موجود", "Project not found"))}</h1>
        <Link to="/projects" className="button primary">
          {t(l("العودة للمشاريع", "Back to projects"))}
          <IconArrow />
        </Link>
      </div>
    );
  const detail = projectDetails[p.id];
  return (
    <div className="section-page">
      <div className="breadcrumb">
        <Link to="/projects">{t(l("المشاريع", "Projects"))}</Link>
        <span>/</span>
        <span>{t(p.title)}</span>
      </div>
      <header className="page-heading">
        <Badge lang={lang} />
        <h1>{t(p.title)}</h1>
        <p>{t(p.summary)}</p>
      </header>
      <div className="project-detail-visual">
        <Illustration kind={p.visual} />
      </div>
      <div className="project-detail-grid">
        <aside>
          <span className="eyebrow">
            {p.id === "graduation-study"
              ? "GRADUATION PROJECT"
              : "PROJECT / TEMPLATE"}
          </span>
          <h3>{t(projectCategories[p.category])}</h3>
          <p>
            {t(
              p.id === "graduation-study"
                ? l(
                    "مشروع تخرج موثق بالعرض التقديمي المرفق. المحاكاة مخصصة للأغراض الأكاديمية والبحثية وليست للاستخدام السريري.",
                    "A documented graduation project with the attached presentation. The simulation is for academic and research purposes, not clinical use.",
                  )
                : l(
                    "هذا قالب غير مكتمل، وليس ادعاءً بإنجاز مشروع. جميع الحقول قابلة للتحرير في ملف البيانات.",
                    "This is an unfinished template, not a claim of completed work. All fields are editable in the data file.",
                  ),
            )}
          </p>
        </aside>
        <div>
          {projectFields.map((field, i) => (
            <section className="detail-field" key={field.en}>
              <small>0{i + 1}</small>
              <div>
                <h2>{t(field)}</h2>
                <p>
                  {t(
                    detail?.fields[i] ||
                      l("[أضف محتوى موثقاً]", "[Add verified content]"),
                  )}
                </p>
              </div>
            </section>
          ))}
          <div className="attachments">
            <h3>{t(l("ملفات المشروع", "Project media & documents"))}</h3>
            {detail?.media.length
              ? detail.media.map((m, i) => (
                  <figure className="project-media" key={i}>
                    {m.type === "image" || m.type === "diagram" ? (
                      <img src={m.url} loading="lazy" alt={t(m.caption)} />
                    ) : m.type === "video" ? (
                      <video controls preload="metadata" src={m.url} />
                    ) : (
                      <a
                        className="button ghost"
                        href={m.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FileText size={16} />
                        {t(m.caption)}
                        <IconArrow />
                      </a>
                    )}
                    <figcaption>{t(m.caption)}</figcaption>
                  </figure>
                ))
              : [
                  l(
                    "الصور والمخططات التقنية",
                    "Photographs & technical diagrams",
                  ),
                  l("الفيديو", "Video"),
                  l("المستندات الداعمة", "Supporting documents"),
                ].map((x) => (
                  <p key={x.en}>
                    <FileText size={15} />
                    {t(x)}
                    <span>{t(l("لم تُضَف ملفات", "No files added"))}</span>
                  </p>
                ))}
          </div>
        </div>
      </div>
      <Link to="/projects" className="button ghost">
        <ArrowLeft size={16} />
        {t(l("جميع المشاريع", "All projects"))}
      </Link>
    </div>
  );
}
function Empty({ lang, text }: { lang: Lang; text: Local }) {
  return (
    <div className="empty-state">
      <Layers size={28} strokeWidth={1} />
      <h3>{tr(text, lang)}</h3>
      <p>
        {tr(
          l(
            "سيظهر المحتوى هنا عند إضافته إلى ملف البيانات.",
            "Content will appear here when added to the data file.",
          ),
          lang,
        )}
      </p>
    </div>
  );
}
function CertificatePaper({ lang }: { lang: Lang }) {
  const t = (v: Local) => tr(v, lang);
  return (
    <div className="certificate-paper">
      <div className="certificate-sample-watermark">SAMPLE</div>
      <span>NAGI / LEARNING ARCHIVE</span>
      <GraduationCap size={32} strokeWidth={1} />
      <h3>{t(l("معاينة شهادة", "Certificate preview"))}</h3>
      <div className="certificate-rule" />
      <p>
        {t(
          l(
            "نموذج توضيحي، وليس مؤهلاً حقيقياً",
            "Illustrative template, not a real qualification",
          ),
        )}
      </p>
      <strong>{t(certificates[0].title)}</strong>
      <p>{t(certificates[0].issuer)}</p>
      <div className="cert-foot">
        <span>{t(certificates[0].date)}</span>
        <span>NOT VERIFIED</span>
      </div>
    </div>
  );
}
function Certificates({ lang }: { lang: Lang }) {
  const t = (v: Local) => tr(v, lang);
  const [open, setOpen] = useState<string | null>(null),
    [zoom, setZoom] = useState(1);
  const data = certificates;
  const activeCertificate = certificates.find((c) => c.id === open);
  return (
    <>
      {data.length ? (
        <div className="certificate-grid">
          {data.map((c) => (
            <article className="certificate-card" key={c.id}>
              <button
                className="certificate-thumbnail"
                onClick={() => {
                  setZoom(1);
                  setOpen(c.id);
                }}
                aria-label={t(
                  l("فتح معاينة الشهادة", "Open certificate preview"),
                )}
              >
                {c.image ? (
                  <img src={c.image} alt={t(c.title)} loading="lazy" />
                ) : c.file ? (
                  <div className="certificate-file-tile">
                    <FileText size={40} />
                    <span>{t(c.title)}</span>
                  </div>
                ) : (
                  <CertificatePaper lang={lang} />
                )}
                <span className="preview-label">
                  <Expand size={16} />
                  {t(l("معاينة النموذج", "Preview template"))}
                </span>
              </button>
              <div>
                {!c.file && !c.image && <Badge lang={lang} />}
                <h2>{t(c.title)}</h2>
                <div className="cert-meta">
                  {t(c.issuer)}
                  <span>{t(c.date)}</span>
                </div>
                <p>{t(c.description)}</p>
                {c.file ? (
                  <a href={c.file} download className="button ghost">
                    <Download size={15} />
                    {t(l("تنزيل الشهادة", "Download certificate"))}
                  </a>
                ) : (
                  <span className="unavailable">
                    <FileText size={14} />
                    {t(
                      l(
                        "التنزيل غير متاح حتى إضافة ملف حقيقي",
                        "Download available when a real file is added",
                      ),
                    )}
                  </span>
                )}
                {c.verification && (
                  <a href={c.verification} target="_blank" rel="noreferrer">
                    {t(l("التحقق", "Verify"))}
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <Empty
          lang={lang}
          text={l(
            "لا توجد شهادات في هذا التصنيف بعد.",
            "No certificates in this category yet.",
          )}
        />
      )}
      {activeCertificate && (
        <Modal
          label={t(l("معاينة الشهادة", "Certificate preview"))}
          onClose={() => setOpen(null)}
        >
          <div className="preview-toolbar">
            <span>
              {activeCertificate.file || activeCertificate.image
                ? t(activeCertificate.title)
                : t(
                    l(
                      "نموذج شهادة · غير موثق",
                      "Certificate template · unverified",
                    ),
                  )}
            </span>
            <div>
              <button
                className="icon-button"
                aria-label={t(l("تصغير المعاينة", "Zoom preview out"))}
                onClick={() => setZoom(Math.max(0.6, zoom - 0.2))}
              >
                <Minus size={18} />
              </button>
              <span>{Math.round(zoom * 100)}%</span>
              <button
                className="icon-button"
                aria-label={t(l("تكبير المعاينة", "Zoom preview in"))}
                onClick={() => setZoom(Math.min(2, zoom + 0.2))}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          <div className="certificate-preview-viewport">
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "center center",
              }}
            >
              {activeCertificate.image ? (
                <img
                  src={activeCertificate.image}
                  alt={t(activeCertificate.title)}
                />
              ) : activeCertificate.file ? (
                <div className="pdf-certificate">
                  <object
                    data={activeCertificate.file}
                    type="application/pdf"
                    aria-label={t(activeCertificate.title)}
                  >
                    <a
                      href={activeCertificate.file}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t(l("افتح ملف الشهادة", "Open certificate file"))}
                    </a>
                  </object>
                  <a
                    className="text-link"
                    href={activeCertificate.file}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t(l("فتح الملف في نافذة جديدة", "Open file in a new tab"))}
                    <ExternalLink size={14} />
                  </a>
                </div>
              ) : (
                <CertificatePaper lang={lang} />
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
function Journey({ lang }: { lang: Lang }) {
  const t = (v: Local) => tr(v, lang);
  return (
    <div className="journey-layout">
      <aside className="journey-aside">
        <span className="giant-number">↗</span>
        <h2>
          {t(
            l(
              "كل تجربة، منظور أوسع.",
              "Every experience, a wider perspective.",
            ),
          )}
        </h2>
        <p>
          {t(
            l(
              "أضف التواريخ والمسؤوليات والنتائج الحقيقية. لا تُعرض أي خبرة على أنها مكتملة حتى توثيقها.",
              "Add real dates, responsibilities, and outcomes. No entry is presented as completed experience until verified.",
            ),
          )}
        </p>
        <Badge lang={lang} />
      </aside>
      <div className="timeline">
        {experience.map((entry, i) => (
          <motion.article
            initial={{ opacity: 0.4, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            key={entry.type.en}
            className="timeline-entry"
          >
            <span className="timeline-dot" />
            <div className="timeline-top">
              <span>{t(entry.type)}</span>
              <small>{t(entry.duration)}</small>
            </div>
            <h2>{t(entry.organization)}</h2>
            <h3>{t(entry.role)}</h3>
            <p>{t(entry.responsibilities)}</p>
            {entry.assets.length ? (
              <div className="experience-assets">
                {entry.assets.map((url, j) => (
                  <a key={url} href={url} target="_blank" rel="noreferrer">
                    <FileText size={14} />
                    {t(l(`ملف داعم ${j + 1}`, `Supporting file ${j + 1}`))}
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            ) : (
              <span className="unavailable">
                <FileText size={13} />
                {t(
                  l(
                    "الصور والوثائق: لم تُضَف بعد",
                    "Photographs & documents: not added yet",
                  ),
                )}
              </span>
            )}
            <span className="entry-index">0{i + 1}</span>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
function Skills({ lang }: { lang: Lang }) {
  const t = (v: Local) => tr(v, lang);
  const [selected, setSelected] = useState(0);
  const active = skills[selected];
  return (
    <div className="skills-layout">
      <div
        className="skill-tabs"
        role="tablist"
        aria-label={t(l("مجالات المهارات", "Skill categories"))}
      >
        {skills.map((s, i) => (
          <button
            key={s.code}
            role="tab"
            id={`skill-tab-${i}`}
            aria-controls="skill-panel"
            aria-selected={selected === i}
            onClick={() => setSelected(i)}
            className={selected === i ? "active" : ""}
          >
            <span>{s.code}</span>
            {t(s.title)}
            <IconArrow />
          </button>
        ))}
      </div>
      <div
        className="skill-panel"
        role="tabpanel"
        id="skill-panel"
        aria-labelledby={`skill-tab-${selected}`}
      >
        <div className="skill-visual">
          <div className="skill-core" aria-hidden="true">
            <div className="core-shell">
              <span className="core-mer" />
              <span className="core-mer core-mer-b" />
              <span className="core-mer core-mer-c" />
              <span className="core-lat" />
              <span className="core-lat core-lat-b" />
              <span className="core-lat core-lat-c" />
            </div>
            <b>{active.code}</b>
          </div>
          <span>DISCIPLINE MAP / {active.code}</span>
        </div>
        <h2>{t(active.title)}</h2>
        <div className="skill-items">
          {active.items.map((item, i) => (
            <div key={item.en}>
              <span>/{String(i + 1).padStart(2, "0")}</span>
              <h3>{t(item)}</h3>
              <span className="skill-status">
                {t(skillLevels[item.en] || l("غير مُقيّم", "Not assessed"))}
              </span>
            </div>
          ))}
        </div>
        <p className="note">
          {t(
            l(
              "هذه قائمة مجالات مقترحة. أضف المهارات التي تمتلكها فعلاً ومستوياتها في ملف البيانات. لا تُعرض نسب إتقان افتراضية.",
              "This is a proposed discipline list. Add only the skills you actually possess and their levels in the data file. No default proficiency percentages are displayed.",
            ),
          )}
        </p>
      </div>
    </div>
  );
}
function Equipment({ lang }: { lang: Lang }) {
  const t = (v: Local) => tr(v, lang);
  const [selected, setSelected] = useState(0),
    [tab, setTab] = useState(0);
  const d = equipment[selected];
  const tabs = [
    l("كيف يعمل", "How it works"),
    l("المكوّنات", "Components"),
    l("الهندسة والسلامة", "Engineering & safety"),
  ];
  return (
    <>
      <div className="lab-status" dir="ltr">
        <span>
          <i className="status-dot" />
          VIRTUAL LAB / INTERACTIVE 3D
        </span>
        <span>10 DEVICES · EDUCATIONAL EXPLORER</span>
      </div>
      <div
        className="equipment-chooser"
        role="group"
        aria-label={t(l("اختر جهازاً طبياً", "Select medical equipment"))}
      >
        {equipment.map((e, i) => (
          <button
            className={selected === i ? "selected" : ""}
            aria-pressed={selected === i}
            key={e.id}
            onClick={() => {
              setSelected(i);
              setTab(0);
            }}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {t(e.name)}
          </button>
        ))}
      </div>
      <div className="lab-layout">
        <div className="lab-scene">
          <span className="lab-scene-title" dir="ltr">
            DEVICE / {d.id.toUpperCase()}
            <span>3D SCHEMATIC</span>
          </span>
          <Model lang={lang} kind={d.id} compact />
          <div className="lab-model-note">
            {t(
              l(
                "مجسم هندسي توضيحي، لا يمثل طرازاً تجارياً محدداً",
                "Schematic representation, not a specific commercial model",
              ),
            )}
          </div>
        </div>
        <div className="equipment-info">
          <span className="eyebrow">{t(d.tag)}</span>
          <h2>{t(d.name)}</h2>
          <p>
            {t(d.purpose)}{" "}
            <a
              className="inline-citation"
              href={d.source}
              target="_blank"
              rel="noreferrer"
            >
              [{d.sourceName}]
            </a>
          </p>
          <div className="equipment-tabs" role="tablist">
            {tabs.map((x, i) => (
              <button
                role="tab"
                id={`equipment-tab-${i}`}
                aria-controls="equipment-panel"
                aria-selected={tab === i}
                key={x.en}
                onClick={() => setTab(i)}
              >
                {t(x)}
              </button>
            ))}
          </div>
          <div
            className="equipment-tab-content"
            role="tabpanel"
            id="equipment-panel"
            aria-labelledby={`equipment-tab-${tab}`}
          >
            {tab === 0 ? (
              <>
                <span className="panel-label">01 / PRINCIPLE</span>
                <h3>
                  {t(
                    l(
                      "من الفكرة إلى الصورة والإشارة",
                      "From principle to image and signal",
                    ),
                  )}
                </h3>
                <p>
                  {t(d.principle)}{" "}
                  <a
                    className="inline-citation"
                    href={d.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    [{d.sourceName}]
                  </a>
                </p>
                <Signal />
              </>
            ) : tab === 1 ? (
              <>
                <span className="panel-label">02 / COMPONENTS</span>
                <h3>{t(l("داخل النظام", "Inside the system"))}</h3>
                <p>
                  {t(d.components)}{" "}
                  <a
                    className="inline-citation"
                    href={d.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    [{d.sourceName}]
                  </a>
                </p>
                <div className="component-flow">
                  <span>INPUT</span>
                  <ArrowRight size={14} />
                  <span>SYSTEM</span>
                  <ArrowRight size={14} />
                  <span>OUTPUT</span>
                </div>
              </>
            ) : (
              <>
                <span className="panel-label">03 / ENGINEERING</span>
                <h3>{t(l("المفاهيم الهندسية", "Engineering concepts"))}</h3>
                <p>
                  {t(d.concepts)}{" "}
                  <a
                    className="inline-citation"
                    href={d.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    [{d.sourceName}]
                  </a>
                </p>
                <h3>
                  {t(l("اعتبارات الصيانة", "Maintenance considerations"))}
                </h3>
                <p>
                  {t(
                    l(
                      "تُحدَّد إجراءات الفحص والمعايرة والصيانة حسب طراز الجهاز وتعليمات الشركة المصنعة، ويجب أن ينفذها مختصون مؤهلون. هذا العرض ليس دليلاً للصيانة أو التشغيل.",
                      "Inspection, calibration, and maintenance must follow the specific model’s manufacturer instructions and be performed by qualified personnel. This presentation is not a service or operating manual.",
                    ),
                  )}
                </p>
                <p className="note">
                  {t(
                    l(
                      "المواصفات: لا تُعرض قيم رقمية دون طراز محدد ودليل موثوق.",
                      "Specifications: numerical values are not displayed without a specific model and reliable manual.",
                    ),
                  )}
                </p>
              </>
            )}
          </div>
          <a
            className="text-link"
            href={d.source}
            target="_blank"
            rel="noreferrer"
          >
            {t(l("اقرأ المرجع التعليمي", "Read the educational reference"))}
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
      <p className="lab-disclaimer">
        {t(
          l(
            "للتعلّم والاستكشاف فقط. المجسمات والإشارات ليست محاكاة فيزيائية أو بيانات مرضى أو تعليمات سريرية.",
            "For learning and exploration only. Models and signals are not physical simulations, patient data, or clinical instructions.",
          ),
        )}
      </p>
    </>
  );
}
function Education({ lang }: { lang: Lang }) {
  const t = (v: Local) => tr(v, lang);
  return (
    <div className="education-layout">
      <div className="education-blueprint">
        <div className="blueprint-label" dir="ltr">
          FOUNDATION / KNOWLEDGE SYSTEM
        </div>
        <svg viewBox="0 0 400 300" aria-hidden="true">
          <g stroke="#5b9b9b" fill="none" strokeWidth="1">
            <path d="m200 60 140 70-140 70L60 130Z" />
            <path
              d="M110 155v72q90 55 180 0v-72M335 133v100M327 233h16M200 35v200M35 130h330"
              strokeDasharray="3 5"
            />
            <circle cx="200" cy="145" r="110" />
            <circle cx="200" cy="145" r="133" strokeOpacity=".2" />
          </g>
          <text x="200" y="284" fill="#6de0d2" textAnchor="middle" fontSize="9">
            LEARN / UNDERSTAND / BUILD
          </text>
        </svg>
        <span className="blueprint-corner">
          +<span>+</span>
        </span>
      </div>
      <div className="education-content">
        <Badge lang={lang} />
        <h2>{t(profile.university)}</h2>
        <p className="accent">{t(profile.qualification)}</p>
        <dl className="data-list">
          {[
            [
              l("التخصص", "Field of study"),
              l(
                "[الهندسة الطبية الحيوية / هندسة المعدات الطبية]",
                "[Biomedical / Medical Equipment Engineering]",
              ),
            ],
            [l("الفترة الأكاديمية", "Academic period"), profile.period],
            [l("تاريخ التخرج", "Graduation date"), profile.graduation],
          ].map(([a, b]) => (
            <div key={a.en}>
              <dt>{t(a)}</dt>
              <dd>{t(b)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
function Resume({ lang }: { lang: Lang }) {
  const t = (v: Local) => tr(v, lang);
  const download = (language: Lang) => {
    const bytes = Uint8Array.from(atob(cvPdfs[language]), (c) =>
      c.charCodeAt(0),
    );
    const url = URL.createObjectURL(
      new Blob([bytes], { type: "application/pdf" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `NAGI-CV-${language === "ar" ? "Arabic" : "English"}.pdf`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  };
  return (
    <div className="resume-layout">
      <aside className="resume-aside">
        <FileText size={36} strokeWidth={1} />
        <h2>
          {t(
            l("واضحة. مهنية. قابلة للقراءة.", "Clear. Professional. Readable."),
          )}
        </h2>
        <p>
          {t(
            l(
              "PDF بتخطيط أحادي العمود ونص قابل للتحديد، دون صور أو مؤشرات مهارات. النسخ الحالية قوالب بعلامات واضحة، وليست سيرة مكتملة للتقديم.",
              "Single-column PDFs with selectable text, no images or skill meters. The current downloads are clearly labeled templates, not completed application-ready resumes.",
            ),
          )}
        </p>
        <button onClick={() => download("ar")} className="button primary">
          <Download size={16} />
          {t(l("تنزيل النسخة العربية", "Download Arabic CV"))}
        </button>
        <button onClick={() => download("en")} className="button ghost">
          <Download size={16} />
          {t(l("تنزيل النسخة الإنجليزية", "Download English CV"))}
        </button>
        <span className="resume-note">
          {t(
            l(
              "صيغة A4 · نص حقيقي · قوالب قابلة للتخصيص",
              "A4 FORMAT · REAL TEXT · EDITABLE TEMPLATES",
            ),
          )}
        </span>
      </aside>
      <article className="cv-paper" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="cv-template">
          {t(
            l(
              "قالب سيرة ذاتية · أكمل البيانات قبل الاستخدام",
              "RESUME TEMPLATE · COMPLETE BEFORE USE",
            ),
          )}
        </div>
        <header>
          <h2>{t(profile.name)}</h2>
          <p>
            {t(profile.title)} / {t(profile.specialization)}
          </p>
          <small>
            {t(profile.location)} ·{" "}
            {t(
              l(
                "[البريد الإلكتروني] · [الهاتف]",
                "[Email address] · [Phone number]",
              ),
            )}
          </small>
        </header>
        {resumeSections.map((s, i) => (
          <section key={s.en}>
            <h3>{t(s)}</h3>
            <p>{t(resumeContent[i])}</p>
          </section>
        ))}
      </article>
    </div>
  );
}
function Contact({ lang }: { lang: Lang }) {
  const t = (v: Local) => tr(v, lang);
  const [message, setMessage] = useState("");
  const contacts = [
    {
      icon: Mail,
      name: l("البريد الإلكتروني", "Email"),
      value: profile.email,
      url: profile.email ? `mailto:${profile.email}` : "",
    },
    {
      icon: Linkedin,
      name: l("لينكدإن", "LinkedIn"),
      value: profile.linkedin,
      url: profile.linkedin,
    },
    {
      icon: MessageCircle,
      name: l("واتساب", "WhatsApp"),
      value: profile.whatsapp,
      url: profile.whatsapp
        ? `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`
        : "",
    },
  ];
  return (
    <div className="contact-layout">
      <div className="contact-statement">
        <span className="eyebrow">ENGINEERING × HUMAN CONNECTION</span>
        <h2>
          {t(
            l(
              "الفكرة الجيدة تبدأ بمحادثة.",
              "A good idea starts with a conversation.",
            ),
          )}
        </h2>
        <p>
          {t(
            l(
              "مساحة للتواصل المهني، وفرص العمل، والتعاون في الهندسة الطبية والتقنيات الصحية.",
              "A space for professional connections, employment opportunities, and collaborations in biomedical engineering and health technology.",
            ),
          )}
        </p>
        <div className="contact-location">
          <MapPin size={17} />
          {t(profile.location)}
        </div>
      </div>
      <div className="contact-methods">
        {contacts.map((c) => (
          <div className="contact-method" key={c.name.en}>
            <c.icon size={23} strokeWidth={1.3} />
            <div>
              <h3>{t(c.name)}</h3>
              <p>
                {c.value ||
                  t(
                    l(
                      "لم تُضَف بيانات التواصل بعد",
                      "Contact details not configured yet",
                    ),
                  )}
              </p>
            </div>
            {c.url ? (
              <a
                href={c.url}
                target={c.url.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={t(c.name)}
              >
                <IconArrow />
              </a>
            ) : (
              <button
                className="icon-button"
                aria-label={t(
                  l("تفاصيل إعداد التواصل", "Contact configuration details"),
                )}
                onClick={() =>
                  setMessage(
                    t(
                      l(
                        "أضف بيانات التواصل في src/data/content.ts لتفعيل الرابط. لم يتم إرسال أي رسالة.",
                        "Add your contact details in src/data/content.ts to enable this link. No message has been sent.",
                      ),
                    ),
                  )
                }
              >
                <Plus size={18} />
              </button>
            )}
          </div>
        ))}
        <div className="contact-message" role="status">
          {message ||
            t(
              l(
                "روابط حقيقية عند إضافة بياناتك. لا نماذج إرسال وهمية.",
                "Real links when your details are added. No simulated contact submissions.",
              ),
            )}
        </div>
      </div>
    </div>
  );
}
function IntroGate({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  useEffect(() => {
    const timer = window.setTimeout(() => setVideoReady(true), 450);
    return () => window.clearTimeout(timer);
  }, []);
  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onEnter, reduce ? 0 : 720);
  };
  return (
    <motion.section
      className={`intro-gate ${leaving ? "is-leaving" : ""}`}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.8 }}
      dir="rtl"
      aria-label="بوابة الدخول إلى موقع NAGI"
    >
      <video
        className="intro-video"
        autoPlay
        muted
        loop
        playsInline
        preload={videoReady ? "auto" : "none"}
        poster="/preview/home-3d.png"
        aria-hidden="true"
      >
        {videoReady && (
          <source src="/media/biomedical-intro.mp4" type="video/mp4" />
        )}
      </video>
      <div className="intro-shade" aria-hidden="true" />
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-noise" aria-hidden="true" />
      <div className="intro-orbit intro-orbit-one" aria-hidden="true" />
      <div className="intro-orbit intro-orbit-two" aria-hidden="true" />
      <header className="intro-header" dir="ltr">
        <span className="intro-brand">
          NAGI<span>.</span>
        </span>
        <span className="intro-brand-meta">
          BIOMEDICAL
          <br />
          ENGINEERING
        </span>
        <span className="intro-live">
          <i /> SYSTEM ONLINE
        </span>
      </header>
      <div className="intro-content">
        <div className="intro-kicker">
          <span className="mini-line" />
          NAGI / BIOMEDICAL WORLD
        </div>
        <button
          className="intro-enter"
          onClick={enter}
          disabled={leaving}
          aria-label="دخول الموقع"
          title="دخول الموقع"
        >
          <span className="intro-enter-icon">
            <ArrowRight size={16} />
          </span>
          <span>
            <strong>دخول الموقع</strong>
            <small>ENTER</small>
          </span>
        </button>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.25, duration: reduce ? 0 : 0.8 }}
        >
          هندسة التقنية
          <br />
          <span>لنرتقي بالحياة.</span>
        </motion.h1>
        <p>
          ادخل إلى تجربة تفاعلية في عالم الهندسة الطبية الحيوية، حيث تلتقي
          الأنظمة الذكية بصحة الإنسان.
        </p>
      </div>
      <div className="intro-footer" dir="ltr">
        <span>IMMERSIVE BIOMEDICAL ENGINEERING</span>
        <span>01 / 01</span>
      </div>
    </motion.section>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const Router =
    window.location.origin === "null" ||
    window.location.protocol === "about:" ||
    window.location.pathname.startsWith("/sites/proxy/") ||
    window.location.pathname.endsWith("/index.html")
      ? MemoryRouter
      : BrowserRouter;
  if (!entered) return <IntroGate onEnter={() => setEntered(true)} />;
  return (
    <Router>
      <Shell />
    </Router>
  );
}
