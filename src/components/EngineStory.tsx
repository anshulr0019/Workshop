import { useEffect, useRef, useState } from "react";
import { models, scrollTravel, steps } from "../engine-story/config";
import type { StoryScene } from "../engine-story/scene";
import { business } from "../data/business";
import Icon from "./Icon";
import { useLang } from "../i18n";

// Scroll-driven 3D story with real models (src/engine-story). One progress value (0–1)
// from normal page scrolling drives the scene and the copy. Nothing listens to
// wheel/touch gestures; copy and actions stay in HTML.
//   loading: copy works, stage shows a quiet loading line
//   live:    WebGL canvas showing
//   failed:  no WebGL / load error: the copy-only story remains
// Reduced motion: no pinning; one still frame of the model and all the copy.
type State = "loading" | "live" | "failed";
const reducedQuery = "(prefers-reduced-motion: reduce)";
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (a: number, b: number, p: number) => {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const FADE = 0.04;
const n = steps.length;
const edge = (i: number) => i / n;

export default function EngineStory() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const stepEls = useRef<(HTMLDivElement | null)[]>([]);
  const [state, setState] = useState<State>("loading");
  const [still, setStill] = useState(() => typeof matchMedia !== "undefined" && matchMedia(reducedQuery).matches);

  useEffect(() => {
    const mq = matchMedia(reducedQuery);
    const onChange = () => setStill(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const section = root.current!, sticky = pin.current!, view = stage.current!;
    let scene: StoryScene | null = null;
    let raf = 0, active = false, loading = false, disposed = false;

    // DOM writes only (opacity/transform); no React state per scroll frame.
    const update = () => {
      raf = 0;
      const travel = section.offsetHeight - sticky.offsetHeight;
      const p = still ? 0.62 : travel > 0 ? clamp01((sticky.getBoundingClientRect().top - section.getBoundingClientRect().top) / travel) : 0;
      for (let i = 0; i < n; i++) {
        const el = stepEls.current[i];
        if (!el || still) continue;
        const textIn = i === 0 ? 1 : ease(edge(i), edge(i) + FADE, p);
        const textOut = i === n - 1 ? 0 : ease(edge(i + 1) - FADE, edge(i + 1), p);
        const o = textIn * (1 - textOut);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${((1 - textIn) * 16 - textOut * 16).toFixed(2)}px, 0)`;
        el.style.visibility = o < 0.01 ? "hidden" : "visible";
      }
      if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(4)})`;
      scene?.setProgress(p);
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    // Desktop: full-bleed canvas with the model shifted right of the copy column.
    const resize = () => {
      const wide = view.clientWidth > 760 && !still;
      scene?.resize(view.clientWidth, view.clientHeight, wide ? 0.18 : 0, wide ? 0.62 : 1);
    };
    const load = async () => {
      if (loading || disposed) return;
      loading = true;
      try {
        const { createStoryScene } = await import("../engine-story/scene");
        if (disposed || !canvas.current) return;
        const created = await createStoryScene(canvas.current, () => {
          scene?.dispose();
          scene = null;
          if (!disposed) setState("failed");
        });
        if (disposed) return created.dispose();
        scene = created;
        resize();
        scene.setProgress(-1);
        update();
        setState("live");
      } catch (error) {
        console.warn("3D view unavailable.", error);
        if (!disposed) setState("failed");
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) {
          void load();
          request();
        }
      },
      { rootMargin: "60% 0px" },
    );
    io.observe(section);
    const onScroll = () => active && !still && request();
    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => {
      resize();
      request();
    });
    ro.observe(view);
    request();
    return () => {
      disposed = true;
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      scene?.dispose();
      scene = null;
    };
  }, [still]);

  const credits = [models.engine.credit, models.car.credit].filter(Boolean) as { text: string; href: string }[];
  return (
    <section
      ref={root}
      id="engine-story"
      className="story"
      data-mode={still ? "static" : "scroll"}
      data-state={state}
      aria-labelledby="story-title"
      style={{ "--travel-m": scrollTravel.mobile, "--travel-d": scrollTravel.desktop } as React.CSSProperties}
    >
      <h2 id="story-title" className="visually-hidden">
        {t("Understand the engine. Care for the whole car.")}
      </h2>
      <div ref={pin} className="story-sticky">
        <div ref={stage} className="story-stage" aria-hidden="true">
          <canvas ref={canvas} className="story-canvas" />
          <span className="story-loading">{t("Loading 3D model…")}</span>
        </div>
        <div className="container story-copy">
          <div className="story-steps">
            {steps.map((s, i) => (
              <div className="story-step" key={s.title} ref={(el) => void (stepEls.current[i] = el)}>
                <p className="eyebrow">{t(s.eyebrow)}</p>
                <h3>{t(s.title)}</h3>
                <p className="story-body">{t(s.body)}</p>
              </div>
            ))}
          </div>
          <div className="story-actions">
            <a className="button primary" href="#book">
              <Icon name="clock" size={18} />
              {t("Book a visit")}
            </a>
            <a className="button secondary" href={`tel:${business.phone}`}>
              <Icon name="phone" size={18} />
              {t("Call Manoj Ji")}
            </a>
          </div>
        </div>
        <p className="story-credit">
          {credits.map((c) => (
            <a key={c.href} href={c.href} target="_blank" rel="noreferrer">
              {c.text}
            </a>
          ))}
        </p>
        <span className="story-progress" aria-hidden="true">
          <span ref={bar} />
        </span>
      </div>
    </section>
  );
}
