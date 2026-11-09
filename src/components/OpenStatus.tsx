import { useEffect, useState } from "react";
import { business } from "../data/business";
import { useLang, type Lang } from "../i18n";

// "Open now · Closes 10 PM" / "Closed now · Opens 9:30 AM", in Delhi time, whatever
// the visitor's own time zone. Re-checked every minute.
const delhiMinutes = (d: Date) => {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(d);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return get("hour") * 60 + get("minute");
};

export function formatTime(minutes: number, lang: Lang) {
  const h = Math.floor(minutes / 60) % 24, m = minutes % 60;
  const h12 = h % 12 || 12;
  const clock = m ? `${h12}:${String(m).padStart(2, "0")}` : `${h12}`;
  if (lang === "hi") {
    const part = h < 12 ? "सुबह" : h < 16 ? "दोपहर" : h < 19 ? "शाम" : "रात";
    return `${part} ${clock} बजे`;
  }
  return `${clock} ${h < 12 ? "AM" : "PM"}`;
}

export function openState(now: Date) {
  const mins = delhiMinutes(now);
  const open = mins >= business.opensAt && mins < business.closesAt;
  return { open, closingSoon: open && business.closesAt - mins <= 30, beforeOpening: mins < business.opensAt };
}

export default function OpenStatus({ className = "" }: { className?: string }) {
  const { lang, t } = useLang();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  const s = openState(now);
  const close = formatTime(business.closesAt, lang), open = formatTime(business.opensAt, lang);
  const detail = s.open
    ? t(s.closingSoon ? "Closes soon · {time}" : "Closes {time}", { time: close })
    : t(s.beforeOpening ? "Opens {time}" : "Opens tomorrow {time}", { time: open });
  return (
    <p className={`open-status ${className}`} data-open={s.open}>
      <span className="open-dot" aria-hidden="true" />
      <strong>{t(s.open ? "Open now" : "Closed now")}</strong>
      <span aria-hidden="true">·</span>
      <span>{detail}</span>
    </p>
  );
}
