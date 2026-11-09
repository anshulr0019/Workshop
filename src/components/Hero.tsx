import Icon from "./Icon";
import OpenStatus from "./OpenStatus";
import { business, directionsUrl } from "../data/business";
import { googleRating } from "../data/reviews";
import { useLang } from "../i18n";
export default function Hero() {
  const { t } = useLang();
  return (
    <section id="hero" className="hero container">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="small-dot" /> {t("YOUR NEIGHBOURHOOD WORKSHOP · DABRI, DELHI")}
        </p>
        <h1>
          {t("Good hands.")}
          <br />
          {t("Honest work.")}
          <br />
          <span>{t("Happy journeys.")}</span>
        </h1>
        <p className="hero-description">
          {t("Your car deserves a mechanic who knows it.")}
          <br className="desktop-break" /> {t("Meet Manoj Ji — bringing over 30 years of hands-on experience to every repair.")}
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#book">
            <Icon name="clock" />
            {t("Book an appointment")}
            <Icon name="arrow" size={18} />
          </a>
          <a className="button secondary" href={`tel:${business.phone}`}>
            <Icon name="phone" />
            {t("Call Manoj Ji")}
          </a>
        </div>
        <p className="hero-note">
          {t("Petrol, diesel & CNG")} <span>·</span> {t("Hindi & English welcome")}
        </p>
        <div className="hero-assurances">
          <span>
            <Icon name="check" size={17} />
            {t("Personal attention")}
          </span>
          <span>
            <Icon name="check" size={17} />
            {t("Clear estimates")}
          </span>
          <span>
            <Icon name="check" size={17} />
            {t("Multi-brand care")}
          </span>
        </div>
      </div>
      <aside className="hero-card" aria-label={t("Workshop at a glance")}>
        <div className="hc-top">
          <span>{t("AT A GLANCE")}</span>
          <Icon name="wrench" size={20} />
        </div>
        {googleRating && (
          <a className="hc-rating" href="#reviews" aria-label={t("Rated {r} out of 5 on Google", { r: googleRating.rating.toFixed(1) })}>
            <strong>{googleRating.rating.toFixed(1)}</strong>
            <span>
              <span className="hc-stars" aria-hidden="true">★★★★★</span>
              <span>{t("{n} Google reviews", { n: googleRating.count })}</span>
            </span>
            <Icon name="arrow" size={20} />
          </a>
        )}
        <div className="hc-row">
          <Icon name="clock" size={20} />
          <div>
            <OpenStatus className="hc-open" />
            <p>{business.hours.map((h) => t(h)).join(" · ")}</p>
          </div>
        </div>
        <div className="hc-row">
          <Icon name="pin" size={20} />
          <div>
            <p className="hc-strong">{business.addressLines[0]}</p>
            <p>{business.addressLines.slice(1).join(", ")}</p>
            <a className="hc-link" href={directionsUrl} target="_blank" rel="noreferrer">
              {t("Get directions")}
              <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>
        <div className="hc-row">
          <Icon name="phone" size={20} />
          <div className="hc-phones">
            {business.phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`}>
                {p.display}
              </a>
            ))}
          </div>
        </div>
        <p className="hc-foot">{t("30+ years of experience")}</p>
      </aside>
      <div className="hero-bottom">
        <span>{t("CARE THAT GOES THE EXTRA MILE.")}</span>
        <a href="#services">
          {t("Explore our services")} <span>↓</span>
        </a>
      </div>
    </section>
  );
}
