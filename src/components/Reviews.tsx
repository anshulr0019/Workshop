import { useEffect, useRef, useState } from "react";
import { business, mapsUrl } from "../data/business";
import Icon from "./Icon";
import { useLang } from "../i18n";
import { googleRating, savedReviews } from "../data/reviews";
// Hand-copied Google reviews, used whenever live reviews are off or unavailable.
const saved: ReviewData | null =
  savedReviews.length || googleRating
    ? {
        rating: googleRating?.rating,
        count: googleRating?.count,
        url: mapsUrl,
        reviews: savedReviews.map((r) => ({ ...r, author: "", photo: "", time: r.time || "", url: "" })),
      }
    : null;
const writeReviewUrl = business.placeId
  ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(business.placeId)}`
  : mapsUrl;
interface Review {
  name: string;
  author: string;
  photo: string;
  rating: number;
  text: string;
  time: string;
  url: string;
  reply?: string;
}
const PAGE = 6;
const LONG = 400;
interface ReviewData {
  source?: "business" | "places";
  rating?: number;
  count?: number;
  url: string;
  reviews: Review[];
  attributions?: { name: string; url: string }[];
}
const safeUrl = (url: string) => {
  try {
    return new URL(url).protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
};
export default function Reviews() {
  const { t } = useLang();
  const section = useRef<HTMLElement>(null);
  const [data, setData] = useState<ReviewData | null>(null);
  const [state, setState] = useState<
    "idle" | "loading" | "ready" | "unavailable"
  >("idle");
  useEffect(() => {
    if (!business.liveReviews) return;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    let disposed = false;
    const load = async () => {
      setState("loading");
      timer = setTimeout(() => controller.abort(), 9000);
      try {
        const response = await fetch("/api/reviews", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Reviews unavailable");
        const result = await response.json();
        if (!Array.isArray(result.reviews) || typeof result.url !== "string")
          throw new Error("Invalid reviews");
        if (!disposed) {
          setData(result);
          setState("ready");
        }
      } catch {
        if (!disposed) setState("unavailable");
      } finally {
        clearTimeout(timer);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          void load();
        }
      },
      { rootMargin: "200px" },
    );
    if (section.current) observer.observe(section.current);
    return () => {
      disposed = true;
      observer.disconnect();
      controller.abort();
      clearTimeout(timer);
    };
  }, []);
  const shown = data || saved;
  const [visible, setVisible] = useState(PAGE);
  const [open, setOpen] = useState<Set<number>>(new Set());
  return (
    <section ref={section} id="reviews" className="section review-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("04 / WORD ON THE ROAD")}</p>
            <h2>
              {t("Real experiences.")}
              <br />
              <span>{t("In their own words.")}</span>
            </h2>
          </div>
          <div className="review-actions">
            <a
              href={safeUrl(shown?.url || "") || mapsUrl}
              className="button secondary"
              target="_blank"
              rel="noreferrer"
            >
              {t("All reviews on Google")}
              <Icon name="arrow" />
            </a>
            <a href={writeReviewUrl} className="button primary" target="_blank" rel="noreferrer">
              {t("Write a review")}
              <Icon name="arrow" />
            </a>
          </div>
        </div>
        <div className="reviews-content" aria-busy={state === "loading"}>
          {shown ? (
            <>
              <div className="review-summary">
                <span className="google-attribution" translate="no">
                  Google Maps
                </span>
                {typeof shown.rating === "number" && (
                  <strong>
                    <span className="stars" aria-hidden="true">★</span>{" "}
                    {shown.rating.toFixed(1)}{" "}
                    <span aria-label={t("out of five stars")}>/ 5</span>
                  </strong>
                )}
                {typeof shown.count === "number" && (
                  <span>{t("{n} reviews", { n: shown.count.toLocaleString("en-IN") })}</span>
                )}
              </div>
              <p className="form-note">
                {t(data?.source === "business"
                  ? "Every review from our Google listing, newest first, exactly as customers wrote them. Nothing is filtered out."
                  : data
                    ? "Up to 5 reviews, ordered by relevance by Google Maps. No rating filter applied."
                    : "Reviews from our Google Maps listing, shown exactly as customers wrote them.")}
              </p>
              <div className="review-grid">
                {shown.reviews.slice(0, visible).map((r, i) => (
                  <article className="review-card" key={`${r.name}-${i}`}>
                    <div className="review-author">
                      {safeUrl(r.photo) && (
                        <img
                          src={safeUrl(r.photo)}
                          alt=""
                          width="40"
                          height="40"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div>
                        <a
                          href={safeUrl(r.author)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {r.name}
                        </a>
                        <p>{r.time}</p>
                      </div>
                    </div>
                    <p
                      className="stars"
                      aria-label={t("{n} out of 5 stars", { n: r.rating })}
                    >
                      {"★".repeat(Math.max(0, Math.min(5, Math.round(r.rating))))}
                      <span className="stars-empty">
                        {"★".repeat(5 - Math.max(0, Math.min(5, Math.round(r.rating))))}
                      </span>
                    </p>
                    <p className={r.text.length > LONG && !open.has(i) ? "review-text clamped" : "review-text"}>
                      {r.text || t("This customer left a rating without a written review.")}
                    </p>
                    {r.text.length > LONG && (
                      <button
                        type="button"
                        className="read-more"
                        aria-expanded={open.has(i)}
                        onClick={() =>
                          setOpen((o) => {
                            const n = new Set(o);
                            if (!n.delete(i)) n.add(i);
                            return n;
                          })
                        }
                      >
                        {t(open.has(i) ? "Show less" : "Read more")}
                      </button>
                    )}
                    {r.reply && (
                      <div className="review-reply">
                        <strong>{t("Reply from {name}", { name: t(business.name) })}</strong>
                        <p>{r.reply}</p>
                      </div>
                    )}
                    {data?.source === "places" && (
                      <a
                        className="text-link"
                        href={safeUrl(r.url) || safeUrl(data.url)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t("View on Google Maps")}
                        <Icon name="arrow" size={15} />
                      </a>
                    )}
                  </article>
                ))}
              </div>
              {shown.reviews.length > visible && (
                <button
                  type="button"
                  className="button secondary show-more-reviews"
                  onClick={() => setVisible((v) => v + PAGE)}
                >
                  {t("Show more reviews ({n} more)", { n: shown.reviews.length - visible })}
                </button>
              )}
              {data?.attributions?.map((a) => (
                <a
                  key={a.name}
                  href={safeUrl(a.url)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {a.name}
                </a>
              ))}
            </>
          ) : (
            <div className="review-invite">
              <span className="review-symbol">
                <Icon name="chat" size={32} />
              </span>
              <div>
                <h3>{t("Your experience matters.")}</h3>
                <p aria-live="polite">
                  {t(state === "loading"
                    ? "Loading reviews from Google Maps…"
                    : state === "unavailable"
                      ? "Reviews are temporarily unavailable here. You can still read customer feedback on Google Maps."
                      : "Read customer feedback on Google Maps. Visited us recently? Share your experience on our business listing.")}
                </p>
              </div>
              <Icon name="arrow" size={28} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
