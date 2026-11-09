import { useState } from "react";
import { business, whatsappUrl } from "../data/business";
import { useLang } from "../i18n";
import Icon from "./Icon";
import OpenStatus from "./OpenStatus";

// "Car broke down nearby?" Call, or open WhatsApp with the visitor's live location
// (asked for only when they tap, used only inside the message, never stored).
export default function BreakdownHelp() {
  const { t } = useLang();
  const [locating, setLocating] = useState(false);
  const shareLocation = () => {
    const intro = t("Hello Manoj Ji, my car has broken down and I need help.");
    // Open the tab now, inside the tap, so popup blockers allow it; fill it in once
    // the location (or a refusal) comes back.
    const tab = window.open("", "_blank");
    if (tab) tab.opener = null; // the opened page must not be able to reach this tab
    const go = (text: string) => {
      const url = whatsappUrl(text);
      if (tab && !tab.closed) tab.location.href = url;
      else window.location.href = url;
      setLocating(false);
    };
    const withoutLocation = () => go(`${intro}\n${t("I will share my location in this chat.")}`);
    if (!("geolocation" in navigator)) return withoutLocation();
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => go(`${intro}\n${t("My location: {url}", { url: `https://maps.google.com/?q=${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}` })}`),
      withoutLocation,
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 },
    );
  };
  return (
    <section className="breakdown" aria-labelledby="breakdown-title">
      <div className="container breakdown-inner">
        <div className="breakdown-copy">
          <h2 id="breakdown-title">{t("Car broke down nearby?")}</h2>
          <p>{t("Call Manoj Ji and tell us where you are. We’ll tell you how we can help.")}</p>
          <OpenStatus className="on-dark" />
        </div>
        <div className="breakdown-actions">
          <a className="button primary" href={`tel:${business.phone}`}>
            <Icon name="phone" size={18} />
            {t("Call now")}
          </a>
          <button type="button" className="button secondary" onClick={shareLocation} disabled={locating} aria-describedby="breakdown-note">
            <Icon name="pin" size={18} />
            {locating ? t("Getting your location…") : t("Send my location on WhatsApp")}
          </button>
          <small id="breakdown-note">{t("Your location is only used to fill in the WhatsApp message. Nothing is stored.")}</small>
        </div>
      </div>
    </section>
  );
}
