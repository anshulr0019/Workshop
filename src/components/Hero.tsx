import Icon from "./Icon";
import OpenStatus from "./OpenStatus";
import { business } from "../data/business";
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
        <OpenStatus className="on-dark hero-open" />
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
      <div className="hero-portrait">
        <div className="portrait-top">
          <span>{t("THE EXPERIENCE BEHIND EVERY REPAIR")}</span>
          <Icon name="wrench" size={22} />
        </div>
        <img src="/images/manoj.jpg" alt={t("Manoj Ji, owner of Manoj Automobile")} width="825" height="1100" fetchPriority="high" />
        <div className="experience-stamp">
          <strong>
            30<span>+</span>
          </strong>
          <span>
            {t("YEARS OF")}
            <br />
            {t("EXPERIENCE")}
          </span>
        </div>
        <div className="portrait-caption">
          <div>
            <h2>{t("Meet Manoj Ji.")}</h2>
            <p>{t("Your mechanic. Your neighbour.")}</p>
          </div>
          <a href="#about" aria-label={t("Read about Manoj Ji")}>
            <Icon name="arrow" size={24} />
          </a>
        </div>
      </div>
      <div className="hero-bottom">
        <span>{t("CARE THAT GOES THE EXTRA MILE.")}</span>
        <a href="#services">
          {t("Explore our services")} <span>↓</span>
        </a>
      </div>
    </section>
  );
}
