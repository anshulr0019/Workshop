import { useMemo, useState } from "react";
import { business, whatsappUrl } from "../data/business";
import Icon from "./Icon";
import FadeIn from "./FadeIn";
import { useLang } from "../i18n";

const services = [
  "Periodic service",
  "Clutch or brakes",
  "Engine or warning light",
  "AC not cooling",
  "Battery or electrical",
  "Suspension",
  "CNG servicing",
  "Denting / other repair",
  "Not sure — need a check-up",
];
const cars = [
  "Maruti Alto", "Maruti Swift", "Maruti Dzire", "Maruti WagonR", "Maruti Baleno",
  "Maruti Ertiga", "Maruti Brezza", "Maruti Eeco", "Hyundai i10", "Hyundai i20",
  "Hyundai Creta", "Hyundai Venue", "Tata Nexon", "Tata Altroz", "Tata Tiago",
  "Mahindra Scorpio", "Mahindra XUV300", "Toyota Innova", "Honda City", "Honda Amaze",
  "Kia Seltos", "Kia Sonet",
];
// Arrival windows within the workshop hours in business.ts (9:30 AM – 10 PM daily);
// the last window ends early enough to look at the car before closing.
// `ends` is the window's end in minutes after midnight, used to hide past slots today.
const allSlots = [
  { label: "9:30 – 11:30 AM", ends: 690 },
  { label: "11:30 AM – 1:30 PM", ends: 810 },
  { label: "1:30 – 4 PM", ends: 960 },
  { label: "4 – 6:30 PM", ends: 1110 },
  { label: "6:30 – 9 PM", ends: 1260 },
];
const BOOK_AHEAD_DAYS = 30;

const pad = (n: number) => String(n).padStart(2, "0");
const toInput = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromInput = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const cleanPhone = (s: string) =>
  s.replace(/[\s-]/g, "").replace(/^(\+?91|0)(?=\d{10}$)/, "");

export default function BookAppointment() {
  // Form state keeps the English values; everything shown or sent goes through t().
  const { lang, t } = useLang();
  const today = useMemo(() => new Date(), []);
  const minDate = toInput(today);
  const maxDate = toInput(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + BOOK_AHEAD_DAYS),
  );
  const [form, setForm] = useState({
    name: "", phone: "", car: "", fuel: "Petrol", service: services[0],
    date: "", slot: "", notes: "",
  });
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setSent(false);
      setForm((f) => ({ ...f, [key]: e.target.value, ...(key === "date" ? { slot: "" } : {}) }));
    };

  const day = form.date ? fromInput(form.date) : null;
  const now = new Date();
  const slots = allSlots
    .filter((s) => form.date !== toInput(now) || s.ends > now.getHours() * 60 + now.getMinutes())
    .map((s) => s.label);
  const phone = cleanPhone(form.phone);
  const errors = {
    name: form.name.trim().length < 2 ? "Please enter your name." : "",
    phone: /^[6-9]\d{9}$/.test(phone) ? "" : "Enter a 10-digit mobile number.",
    car: form.car.trim() ? "" : "Tell us which car you drive.",
    date: !form.date ? "Choose a day."
      : form.date < minDate || form.date > maxDate ? "Choose a day within the next {n} days." : "",
    slot: form.slot ? "" : "Choose a time.",
  };
  const valid = Object.values(errors).every((e) => !e);
  const show = (k: keyof typeof errors) => (tried && errors[k] ? t(errors[k], { n: BOOK_AHEAD_DAYS }) : "");
  const dayLabel = day?.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { weekday: "long", day: "numeric", month: "long" });

  const message = [
    t("Hello Manoj Ji, I would like to book a workshop visit."),
    "",
    `${t("Name")}: ${form.name.trim()}`,
    `${t("Phone")}: +91 ${phone}`,
    `${t("Car")}: ${form.car.trim()} (${t(form.fuel)})`,
    `${t("Work needed")}: ${t(form.service)}`,
    `${t("Preferred day")}: ${dayLabel}`,
    `${t("Preferred time")}: ${t(form.slot)}`,
    ...(form.notes.trim() ? [`${t("Notes")}: ${form.notes.trim()}`] : []),
    "",
    t("Please confirm if this time works."),
  ].join("\n");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!valid) {
      const first = (Object.keys(errors) as (keyof typeof errors)[]).find((k) => errors[k]);
      document.getElementById(`book-${first}`)?.focus();
      return;
    }
    window.open(whatsappUrl(message), "_blank", "noopener");
    setSent(true);
  };

  const field = (k: keyof typeof errors) => ({
    id: `book-${k}`,
    "aria-invalid": Boolean(show(k)) || undefined,
    "aria-describedby": show(k) ? `book-${k}-error` : undefined,
  });
  const error = (k: keyof typeof errors) =>
    show(k) ? <p className="field-error" id={`book-${k}-error`}>{show(k)}</p> : null;

  return (
    <section id="book" className="section quote-section">
      <div className="container split-layout">
        <FadeIn>
          <p className="eyebrow">{t("02 / BOOK A VISIT")}</p>
          <h2>
            {t("Pick a time.")}
            <br />
            <span>{t("We’ll be ready.")}</span>
          </h2>
          <p className="section-intro">
            {t("Tell us about your car and when suits you. Manoj Ji will confirm your slot on WhatsApp, so there’s no waiting around when you arrive.")}
          </p>
          <div className="quote-points">
            <p><Icon name="check" /> {t("Takes under a minute")}</p>
            <p><Icon name="check" /> {t("Manoj Ji confirms your time personally")}</p>
            <p><Icon name="check" /> {t("Cost discussed after we see the car")}</p>
          </div>
          <p className="book-hours">
            <Icon name="clock" size={18} />
            <span>{business.hours.map((h) => t(h)).join(" · ")}</span>
          </p>
        </FadeIn>
        <FadeIn>
          <form className="quote-card book-card" onSubmit={submit} noValidate>
            <div className="card-heading">
              <span className="icon-tile"><Icon name="clock" size={26} /></span>
              <div>
                <h3>{t("Book an appointment")}</h3>
                <p>{t("All fields except notes are needed.")}</p>
              </div>
            </div>
            <div className="field-row">
              <div>
                <label htmlFor="book-name">{t("Your name")}</label>
                <input {...field("name")} value={form.name} onChange={set("name")}
                  autoComplete="name" maxLength={60} placeholder={t("e.g. Rahul Sharma")} />
                {error("name")}
              </div>
              <div>
                <label htmlFor="book-phone">{t("Mobile number")}</label>
                <input {...field("phone")} value={form.phone} onChange={set("phone")}
                  type="tel" inputMode="tel" autoComplete="tel" maxLength={16} placeholder="98765 43210" />
                {error("phone")}
              </div>
            </div>
            <div className="field-row">
              <div>
                <label htmlFor="book-car">{t("Car model")}</label>
                <input {...field("car")} value={form.car} onChange={set("car")}
                  list="book-car-list" maxLength={60} placeholder={t("e.g. Swift 2018")} />
                <datalist id="book-car-list">
                  {cars.map((c) => <option key={c} value={c} />)}
                </datalist>
                {error("car")}
              </div>
              <div>
                <label htmlFor="book-fuel">{t("Fuel")}</label>
                <select id="book-fuel" value={form.fuel} onChange={set("fuel")}>
                  {["Petrol", "Diesel", "CNG", "Petrol + CNG"].map((f) => <option key={f} value={f}>{t(f)}</option>)}
                </select>
              </div>
            </div>
            <label htmlFor="book-service">{t("What does the car need?")}</label>
            <select id="book-service" value={form.service} onChange={set("service")}>
              {services.map((s) => <option key={s} value={s}>{t(s)}</option>)}
            </select>
            <label htmlFor="book-date">{t("Preferred day")}</label>
            <input {...field("date")} type="date" value={form.date} onChange={set("date")}
              min={minDate} max={maxDate} />
            {error("date")}
            <fieldset className="slot-picker" aria-describedby={show("slot") ? "book-slot-error" : undefined}>
              <legend>{dayLabel ? t("Preferred time on {day}", { day: dayLabel }) : t("Preferred time")}</legend>
              {day && !slots.length ? (
                <p className="slot-hint" id="book-slot">{t("No time left today. Please choose another day.")}</p>
              ) : day ? (
                <div className="issue-chips">
                  {slots.map((s, i) => (
                    <button type="button" key={s} id={i === 0 ? "book-slot" : undefined}
                      aria-pressed={form.slot === s}
                      onClick={() => { setSent(false); setForm((f) => ({ ...f, slot: s })); }}>
                      {t(s)}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="slot-hint" id="book-slot">{t("Choose a day first.")}</p>
              )}
              {day && error("slot")}
            </fieldset>
            <label htmlFor="book-notes">{t("Anything we should know?")} <span className="optional">{t("(optional)")}</span></label>
            <textarea id="book-notes" value={form.notes} onChange={set("notes")} rows={3}
              maxLength={600} placeholder={t("e.g. Brakes squeak when stopping. Need the car back by evening.")} />
            <button className="button primary full-width" type="submit">
              <Icon name="chat" />
              {t("Send booking request")}
              <Icon name="arrow" />
            </button>
            <p className="form-note" aria-live="polite">
              {t(sent
                ? "WhatsApp opened with your booking details — tap send there. Manoj Ji will reply to confirm your slot."
                : "Opens WhatsApp with your details filled in. Your slot is confirmed once Manoj Ji replies.")}
            </p>
            <p className="form-note">
              {t("Prefer to talk? Call")}{" "}
              {business.phones.map((p, i) => (
                <span key={p.tel}>
                  {i > 0 && t(" or ")}
                  <a className="text-link" href={`tel:${p.tel}`}>{p.display}</a>
                </span>
              ))}
            </p>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
