import FadeIn from "./FadeIn";
import Icon from "./Icon";
import { useLang } from "../i18n";
export default function About() {
  const { t } = useLang();
  return (
    <section id="about" className="section light-section">
      <div className="container about-layout">
        <FadeIn className="about-visual">
          <div className="team-photo">
            <img src="/images/manoj.jpg" alt={t("Manoj Ji, owner of Manoj Automobile")} width="825" height="1100" loading="lazy" decoding="async" />
            <span className="photo-label">{t("MANOJ JI · OWNER")}</span>
          </div>
          <div className="experience-card">
            <span>{t("BUILT ON EXPERIENCE")}</span>
            <strong>{t("30+ years.")}</strong>
            <p>
              {t("One workshop.")}
              <br />
              {t("A personal approach to car care.")}
            </p>
            <Icon name="wrench" size={34} />
          </div>
        </FadeIn>
        <FadeIn>
          <p className="eyebrow">{t("03 / A FAMILIAR FACE")}</p>
          <h2>
            {t("Your car.")}
            <br />
            <span>{t("Our personal attention.")}</span>
          </h2>
          <p className="section-intro">
            {t("Manoj Automobile is a local, family-run workshop in Dabri, Delhi. At its heart is Manoj Ji, with over three decades of experience in car diagnosis and repair.")}
          </p>
          <p className="about-text">
            {t("We believe good car care starts with a conversation. Tell us what feels different, ask about the repair, and understand the work before your car goes on the lift.")}
          </p>
          <div className="signature">
            <span>{t("Manoj Ji")}</span>
            <p>{t("OWNER · MANOJ AUTOMOBILE")}</p>
          </div>
          <a href="#contact" className="text-link">
            {t("Come meet your mechanic")}
            <Icon name="arrow" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
