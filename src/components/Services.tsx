import FadeIn from "./FadeIn";
import Icon, { type IconName } from "./Icon";
import { whatsappUrl } from "../data/business";
import { useLang } from "../i18n";
const services: { icon: IconName; title: string; desc: string; tag?: string }[] = [
  { icon: "car", title: "Periodic servicing", desc: "Oil, filters, fluids and the everyday checks that keep your car running well." },
  { icon: "brake", title: "Clutch & brakes", desc: "From a heavy clutch to worn brakes. Get the feel of your drive back.", tag: "OUR SPECIALITY" },
  { icon: "wrench", title: "Engine & diagnostics", desc: "Warning lights, unusual sounds or performance issues? Let’s find the cause." },
  { icon: "snow", title: "AC & cooling", desc: "Cooling checks, leak diagnosis and AC repairs for Delhi’s summer days." },
  { icon: "bolt", title: "Electrical & battery", desc: "Starting trouble, battery checks, wiring and electrical fault diagnosis." },
  { icon: "shield", title: "Suspension & CNG", desc: "Suspension repairs and CNG maintenance. Ask us about your specific issue." },
];
export default function Services() {
  const { lang, t } = useLang();
  return (
    <section id="services" className="section light-section">
      <div className="container">
        <FadeIn>
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t("01 / WHAT WE DO")}</p>
              <h2>
                {t("Everyday care.")}
                <br />
                <span>{t("Expert repairs.")}</span>
              </h2>
            </div>
            <p>{t("From the regular service to the sound you can’t quite explain. We’ll help you work out what your car needs.")}</p>
          </div>
        </FadeIn>
        <div className="service-grid">
          {services.map((s, i) => (
            <FadeIn key={s.title}>
              <a
                className="service-card"
                href={whatsappUrl(t("Hello Manoj Ji, I need help with {service} for my car.", { service: lang === "hi" ? t(s.title) : s.title.toLowerCase() }))}
                target="_blank"
                rel="noreferrer"
              >
                <div className="service-top">
                  <Icon name={s.icon} size={29} />
                  <span>{s.tag ? t(s.tag) : `0${i + 1}`}</span>
                </div>
                <h3>{t(s.title)}</h3>
                <p>{t(s.desc)}</p>
                <span className="service-link">
                  {t("Enquire about this service")}
                  <Icon name="arrow" size={18} />
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
