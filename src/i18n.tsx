import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import hi from "./i18n/hi";

// English is written inline in the components and doubles as the lookup key;
// src/i18n/hi.ts maps each English string to Hindi. `{name}` placeholders are filled
// from the second argument. A missing Hindi string falls back to English (and warns
// in development), so a forgotten translation never breaks the page.
export type Lang = "en" | "hi";
type Vars = Record<string, string | number>;
const STORAGE_KEY = "manoj-lang";
const titles: Record<Lang, string> = {
  en: "Manoj Automobile | Car Service & Repair in Dabri, Delhi",
  hi: "मनोज ऑटोमोबाइल | डाबरी, दिल्ली में कार सर्विस और रिपेयर",
};
const fill = (s: string, v?: Vars) => (v ? s.replace(/\{(\w+)\}/g, (_, k: string) => String(v[k] ?? `{${k}}`)) : s);

function translate(lang: Lang, s: string, v?: Vars) {
  if (lang === "en" || !s) return fill(s, v);
  const out = (hi as Record<string, string>)[s];
  if (out === undefined && import.meta.env.DEV) console.warn("[i18n] missing Hindi:", s);
  return fill(out ?? s, v);
}

const Ctx = createContext({
  lang: "en" as Lang,
  setLang: (_lang: Lang) => {},
  t: (s: string, v?: Vars) => fill(s, v),
});

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "hi" || saved === "en") return saved;
  } catch {
    /* storage blocked: fall through */
  }
  return typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("hi") ? "hi" : "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  useEffect(() => {
    document.documentElement.lang = lang === "hi" ? "hi-IN" : "en-IN";
    document.title = titles[lang];
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* not critical */
    }
  }, [lang]);
  const value = useMemo(() => ({ lang, setLang, t: (s: string, v?: Vars) => translate(lang, s, v) }), [lang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
