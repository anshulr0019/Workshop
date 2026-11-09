import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { business } from "../data/business";
import { useLang } from "../i18n";
const links = [
  ["Services", "services"],
  ["Book a visit", "book"],
  ["Our story", "about"],
  ["Reviews", "reviews"],
  ["Visit us", "contact"],
];

// Switches the whole site between English and Hindi; the choice is remembered.
function LanguageToggle() {
  const { lang, setLang, t } = useLang();
  const next = lang === "hi" ? "en" : "hi";
  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={() => setLang(next)}
      aria-label={t(next === "hi" ? "View this site in Hindi" : "View this site in English")}
      lang={next === "hi" ? "hi" : "en"}
    >
      {next === "hi" ? "हिंदी" : "English"}
    </button>
  );
}

export default function Navbar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!nav.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  return (
    <header className="site-header">
      <nav ref={nav} className="container navigation" aria-label={t("Main navigation")}>
        <a className="logo" href="#hero" aria-label={t("Manoj Automobile home")} onClick={() => setOpen(false)}>
          <span className="logo-mark">
            <Icon name="wrench" size={24} />
          </span>
          <span>
            MANOJ<span className="logo-sub">AUTOMOBILE</span>
          </span>
        </a>
        <div className="desktop-nav">
          {links.map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {t(label)}
            </a>
          ))}
        </div>
        <LanguageToggle />
        <a className="header-call" aria-label={t("Call Manoj Ji")} href={`tel:${business.phone}`}>
          <Icon name="phone" size={17} />
          <span>{t("Let’s talk")}</span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={t(open ? "Close menu" : "Open menu")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
        <div id="mobile-menu" className="mobile-menu" hidden={!open}>
          {links.map(([label, id]) => (
            <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>
              {t(label)}
              <Icon name="arrow" />
            </a>
          ))}
          <a href="#faq" onClick={() => setOpen(false)}>
            {t("Common questions")}
            <Icon name="arrow" />
          </a>
        </div>
      </nav>
    </header>
  );
}
