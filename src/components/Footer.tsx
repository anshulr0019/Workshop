import { business, hasExactLocation, mapsUrl, whatsappUrl } from "../data/business";
import { useLang } from "../i18n";
import Icon from "./Icon";
export default function Footer() {
  const { t } = useLang();
  return (
    <>
      <footer>
        <div className="container footer-top">
          <a className="logo" href="#hero">
            <span className="logo-mark">
              <Icon name="wrench" size={24} />
            </span>
            <span>
              MANOJ<span className="logo-sub">AUTOMOBILE</span>
            </span>
          </a>
          <p>{t("Good hands. Honest work. Happy journeys.")}</p>
          <p className="footer-phones">
            {business.phones.map((p) => (
              <a href={`tel:${p.tel}`} key={p.tel}>
                <Icon name="phone" size={15} />
                {p.display}
              </a>
            ))}
          </p>
          <a href="#hero" className="text-link">
            {t("Back to top ↑")}
          </a>
        </div>
        <div className="container footer-bottom">
          <p>{t("© {year} Manoj Automobile · Dabri, New Delhi", { year: new Date().getFullYear() })}</p>
          <div>
            <a href="/privacy.html">{t("Privacy")}</a>
            <a href="/terms.html">{t("Terms")}</a>
            <span>{t("Made with care, for the road ahead.")}</span>
          </div>
        </div>
      </footer>
      <nav className="mobile-actions" aria-label={t("Quick contact")}>
        <a href={`tel:${business.phone}`}>
          <Icon name="phone" />
          <span>{t("Call now")}</span>
        </a>
        <a href={mapsUrl} target="_blank" rel="noreferrer">
          <Icon name="pin" />
          <span>{t(hasExactLocation ? "Find us" : "Maps")}</span>
        </a>
        <a className="mobile-whatsapp" href={whatsappUrl(t("Hello Manoj Ji, I would like to book a car service."))} target="_blank" rel="noreferrer">
          <Icon name="chat" />
          <span>WhatsApp</span>
          <Icon name="arrow" size={17} />
        </a>
      </nav>
    </>
  );
}
