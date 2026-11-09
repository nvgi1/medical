import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

/* ------------------------------------------------------------------
   NAGI / MOTION LAYER
   Scroll reveals, pointer-driven 3D tilt, route wipes, boot sequence
   and a small CSS-3D "chapter orb". Everything degrades gracefully
   when the visitor prefers reduced motion.
-------------------------------------------------------------------*/

const revealSelector = [
  ".page-heading",
  ".section-row",
  ".filter-row",
  ".archive-bar",
  ".project-card",
  ".certificate-card",
  ".chapter-grid > a",
  ".discipline-strip > a",
  ".profile-grid > *",
  ".profile-info > h2",
  ".data-list > div",
  ".mini-journey",
  ".project-detail-grid > *",
  ".detail-field",
  ".timeline-entry",
  ".journey-aside",
  ".skill-tabs button",
  ".skill-panel",
  ".lab-status",
  ".equipment-chooser",
  ".lab-layout > *",
  ".equipment-tabs",
  ".equipment-info",
  ".education-blueprint",
  ".education-content > *",
  ".cv-paper",
  ".resume-aside > *",
  ".contact-method",
  ".contact-statement",
  ".contact-location",
  ".section-pagination",
  ".empty-state",
  ".not-found",
].join(",");

/** Reveals blocks as they enter the viewport, including content that mounts later. */
export function useScrollReveal(dep: unknown) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "140px 0px 140px 0px" },
    );

    let index = 0;
    const prepare = (root: ParentNode) => {
      const found: HTMLElement[] = [];
      if (root instanceof HTMLElement && root.matches(revealSelector))
        found.push(root);
      root
        .querySelectorAll<HTMLElement>(revealSelector)
        .forEach((el) => found.push(el));
      for (const el of found) {
        if (el.dataset.reveal === "1") continue;
        el.dataset.reveal = "1";
        el.classList.add("reveal");
        el.style.setProperty(
          "--reveal-delay",
          `${Math.min(index++ % 6, 5) * 55}ms`,
        );
        const box = el.getBoundingClientRect();
        if (box.top < window.innerHeight * 0.94 && box.bottom > 0) {
          requestAnimationFrame(() => el.classList.add("is-in"));
        } else {
          io.observe(el);
        }
      }
      index = 0;
    };

    prepare(document);
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations)
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) prepare(node as HTMLElement);
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [dep]);
}

/** Adds a pointer-following 3D tilt + glare to the main archive cards. */
export function useInteractiveTilt(dep: unknown) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".project-card, .lab-scene, .project-detail-visual",
      ),
    );
    const teardown: Array<() => void> = [];

    for (const el of targets) {
      el.classList.add("tilt-3d");
      let frame = 0;
      const move = (event: PointerEvent) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const box = el.getBoundingClientRect();
          const nx = (event.clientX - box.left) / box.width - 0.5;
          const ny = (event.clientY - box.top) / box.height - 0.5;
          el.style.setProperty("--ry", `${nx * 8}deg`);
          el.style.setProperty("--rx", `${-ny * 8}deg`);
          el.style.setProperty("--gx", `${(nx + 0.5) * 100}%`);
          el.style.setProperty("--gy", `${(ny + 0.5) * 100}%`);
          el.style.setProperty("--glare", "1");
        });
      };
      const leave = () => {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--glare", "0");
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      teardown.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        cancelAnimationFrame(frame);
      });
    }

    return () => teardown.forEach((fn) => fn());
  }, [dep]);
}

/** Magnetic pull for the primary call-to-action buttons. */
export function useMagneticButtons(dep: unknown) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const buttons = Array.from(
      document.querySelectorAll<HTMLElement>(".button.primary"),
    );
    const teardown: Array<() => void> = [];
    for (const el of buttons) {
      el.classList.add("magnetic");
      const move = (event: PointerEvent) => {
        const box = el.getBoundingClientRect();
        const x = (event.clientX - box.left - box.width / 2) / box.width;
        const y = (event.clientY - box.top - box.height / 2) / box.height;
        el.style.setProperty("--mx", `${x * 12}px`);
        el.style.setProperty("--my", `${y * 10}px`);
      };
      const leave = () => {
        el.style.setProperty("--mx", "0px");
        el.style.setProperty("--my", "0px");
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      teardown.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    }
    return () => teardown.forEach((fn) => fn());
  }, [dep]);
}

/** Thin accent bar that tracks reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="scroll-progress"
      aria-hidden="true"
      style={{ scaleX }}
    />
  );
}

/** Fast scanning wipe shown whenever the route changes. */
export function RouteWipe({ trigger }: { trigger: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduce) return;
    setActive(true);
    const timer = window.setTimeout(() => setActive(false), 380);
    return () => window.clearTimeout(timer);
  }, [trigger, reduce]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="route-wipe"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.span
            className="route-wipe-line"
            initial={{ y: "-4vh", opacity: 0 }}
            animate={{ y: "104vh", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.62, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Short instrument-style boot sequence, once per browser session. */
export function BootScreen({ label }: { label: string }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) return;
    if (window.sessionStorage.getItem("nagi-boot") === "done") return;
    setVisible(true);
    const started = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const progress = Math.min(1, (now - started) / 1100);
      setCount(Math.round(progress * 100));
      if (progress < 1) frame = requestAnimationFrame(step);
      else {
        window.sessionStorage.setItem("nagi-boot", "done");
        window.setTimeout(() => setVisible(false), 220);
      }
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="boot-screen"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="boot-inner">
            <span className="boot-brand" dir="ltr">
              NAGI<span>.</span>
            </span>
            <span className="boot-caption" dir="ltr">
              BIOMEDICAL ENGINEERING
            </span>
            <div className="boot-bar">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
            </div>
            <div className="boot-meta">
              <span>{label}</span>
              <span dir="ltr">{String(count).padStart(3, "0")}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Small CSS-3D instrument orb used beside section headings. */
export function ChapterOrb({ index }: { index?: number }) {
  return (
    <div className="chapter-orb" aria-hidden="true">
      <span className="orb-ring orb-ring-a" />
      <span className="orb-ring orb-ring-b" />
      <span className="orb-ring orb-ring-c" />
      <span className="orb-core" />
      {index ? <em dir="ltr">CH. {String(index).padStart(2, "0")}</em> : null}
    </div>
  );
}

/** Soft light that follows the pointer, adding depth to the dark canvas. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches)
      return;
    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.35;
    const apply = () => {
      frame = 0;
      if (ref.current)
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
