import { useState } from "react";
import { business, directionsUrl, hasExactLocation, mapsUrl, whatsappUrl } from "../data/business";
import { useLang } from "../i18n";
import Icon from "./Icon";
import OpenStatus from "./OpenStatus";
export default function Contact() {
  const { t } = useLang();
  const [showMap, setShowMap] = useState(false);
  const embedUrl = /^https:\/\/www\.google\.com\/maps(\/embed)?\?/.test(business.mapsEmbedUrl) ? business.mapsEmbedUrl : "";
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("GOOD CARE IS CLOSE TO HOME")}</p>
            <h2>
              {t("See you at")}
              <br />
              <span>{t("the workshop.")}</span>
            </h2>
          </div>
          <a href="#book" className="button primary">
            {t("Book your visit")}
            <Icon name="arrow" />
          </a>
        </div>
        <div className="contact-layout">
          <div className="contact-details">
            <div>
              <Icon name="pin" />
              <div>
                <h3>{t("Find us in Dabri")}</h3>
                <address className="contact-address">
                  {business.addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
                <div className="contact-links">
                  <a href={directionsUrl} target="_blank" rel="noreferrer" className="text-link">
                    {t("Get directions")}
                    <Icon name="arrow" size={17} />
                  </a>
                  <a href={mapsUrl} target="_blank" rel="noreferrer" className="text-link">
                    {t(hasExactLocation ? "Open in Google Maps" : "Find us on Google Maps")}
                    <Icon name="arrow" size={17} />
                  </a>
                </div>
              </div>
            </div>
            <div>
              <Icon name="clock" />
              <div>
                <h3>{t("Workshop hours")}</h3>
                <OpenStatus className="on-dark" />
                {business.hours.map((h) => (
                  <p key={h}>{t(h)}</p>
                ))}
                <small>{t("Please call ahead on public holidays.")}</small>
              </div>
            </div>
            <div>
              <Icon name="phone" />
              <div>
                <h3>{t("Speak to Manoj Ji")}</h3>
                {business.phones.map((p) => (
                  <a className="phone-number" href={`tel:${p.tel}`} key={p.tel}>
                    {p.display}
                  </a>
                ))}
                <p>{t("Hindi or English. Happy to help.")}</p>
              </div>
            </div>
          </div>
          <div className="map-card">
            {showMap && embedUrl ? (
              <iframe title={t("Manoj Automobile workshop on Google Maps")} src={embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            ) : (
              <div className="map-placeholder">
                <div className="map-grid" aria-hidden="true" />
                <span className="map-pin">
                  <Icon name="pin" size={32} />
                </span>
                <h3>{t("Manoj Automobile")}</h3>
                <p>{t("Dabri · New Delhi")}</p>
                {embedUrl ? (
                  <button className="button secondary" onClick={() => setShowMap(true)}>
                    {t("Load Google Map")}
                    <Icon name="arrow" size={18} />
                  </button>
                ) : (
                  <a className="button secondary" href={whatsappUrl(t("Hello Manoj Ji, please share the workshop location pin so I can plan my visit."))} target="_blank" rel="noreferrer">
                    {t("Ask for the location")}
                    <Icon name="arrow" size={18} />
                  </a>
                )}
                <small>{t(embedUrl ? "Loads Google Maps when you choose." : "Get the workshop pin directly from Manoj Ji.")}</small>
              </div>
            )}
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="map-footer">
              {t(hasExactLocation ? "Open workshop location" : "Search for the workshop on Google Maps")}
              <Icon name="arrow" size={19} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
