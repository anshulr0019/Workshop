import { useLang } from "../i18n";
const faqs = [
  ["Do I need an appointment?", "Call or WhatsApp before coming in so Manoj Ji can confirm availability and allow time for your car. Your visit is confirmed directly by the workshop."],
  ["How much will my repair cost?", "The cost depends on your model, the parts needed and the work involved. Share your car details for an initial estimate. Ask the workshop to confirm the final price, including labour and any applicable taxes, after inspection."],
  ["How long will the work take?", "Timing depends on the diagnosis, parts availability and the workshop schedule. Discuss your preferred time with Manoj Ji, who can confirm the expected turnaround for your car."],
  ["Can you arrange pick-up and drop?", "Ask about availability in Dabri, Dwarka and nearby areas when you book. Confirm the location, timing and any additional charge with the workshop."],
  ["Which cars do you work on?", "We work on popular petrol, diesel and CNG cars, including Maruti Suzuki, Hyundai, Tata, Mahindra, Toyota, Honda and Kia. Share your exact model and the issue so we can confirm the service."],
  ["Can I speak to someone in Hindi?", "Bilkul! Call or WhatsApp Manoj Ji in Hindi or English — whichever is easier for you."],
];
export default function FAQ() {
  const { t } = useLang();
  return (
    <section id="faq" className="section light-section">
      <div className="container faq-layout">
        <div>
          <p className="eyebrow">{t("BEFORE YOU VISIT")}</p>
          <h2>
            {t("A few good")}
            <br />
            <span>{t("questions.")}</span>
          </h2>
          <p className="section-intro">{t("A little clarity goes a long way.")}</p>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {t(q)}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{t(a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
