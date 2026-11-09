import { useState } from "react";
import { whatsappUrl } from "../data/business";
import { useLang } from "../i18n";
import Icon from "./Icon";
const issues = ["AC not cooling", "Unusual brake noise", "Car won’t start", "Service due"];
export default function AskQuery() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  return (
    <section id="askquery" className="section help-section">
      <div className="container split-layout">
        <div>
          <p className="eyebrow">{t("A REAL PERSON. REAL EXPERIENCE.")}</p>
          <h2>
            {t("Something doesn’t")}
            <br />
            <span>{t("sound right?")}</span>
          </h2>
          <p className="section-intro">{t("You don’t need to know the technical name. Describe the problem to Manoj Ji, or send a photo or video in WhatsApp.")}</p>
        </div>
        <div className="help-form">
          <label htmlFor="car-issue">{t("What’s happening with your car?")}</label>
          <div className="issue-chips">
            {issues.map((issue) => (
              <button key={issue} onClick={() => setQuery(t(issue))} aria-pressed={query === t(issue)}>
                {t(issue)}
              </button>
            ))}
          </div>
          <textarea
            id="car-issue"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={1200}
            rows={4}
            placeholder={t("For example: My Swift makes a noise when I brake. It started yesterday…")}
          />
          {query.trim() ? (
            <a className="button primary full-width" href={whatsappUrl(`${t("Hello Manoj Ji, I need some help with my car.")}\n${query.trim()}`)} target="_blank" rel="noreferrer">
              <Icon name="chat" />
              {t("Ask Manoj Ji on WhatsApp")}
              <Icon name="arrow" />
            </a>
          ) : (
            <button className="button primary full-width" disabled>
              {t("Describe your issue to continue")}
            </button>
          )}
          <p className="form-note">{t("You review and send the message in WhatsApp. For urgent help, please call.")}</p>
        </div>
      </div>
    </section>
  );
}
