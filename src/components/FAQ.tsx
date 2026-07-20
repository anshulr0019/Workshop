import { useState } from "react";

const faqs = [
  { q: "Do you use genuine spare parts?", a: "Yes, we only use OEM (Original Equipment Manufacturer) or high-quality certified parts. We never compromise on part quality — your car's safety depends on it. Receipts for parts are always provided." },
  { q: "How long does a standard service take?", a: "Usually 3–5 hours depending on the car model and type of service. Major repairs like engine overhaul or clutch replacement may take 1–2 days. We'll give you a clear timeline before starting work." },
  { q: "Do you provide pick-up and drop-off service?", a: "Yes! We offer pick-up and drop service within Dwarka and nearby areas. WhatsApp Manoj Ji to arrange a convenient time. A nominal charge may apply based on distance." },
  { q: "Are your rates fixed? Any hidden charges?", a: "Absolutely no hidden costs. We provide competitive, transparent rates. Before any work begins, we show you a detailed estimate. You approve it — then we start. Simple as that." },
  { q: "Which car brands do you service?", a: "We specialize in all popular Indian-market brands: Maruti Suzuki (Alto, Swift, WagonR, Baleno, Ertiga, Brezza), Hyundai (i20, Creta, Venue), Toyota (Innova, Fortuner), Tata (Nexon, Altroz, Punch), Mahindra (Scorpio, XUV), Honda, Kia, Renault, and more." },
  { q: "Do you handle CNG vehicles?", a: "Yes! We have expertise in Petrol, Diesel, and CNG vehicles. CNG kit maintenance, leak testing, valve servicing, and performance tuning — all handled by our experienced technicians." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: "80px 5%", background: "#1a1a1a" }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#f47c20", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 2, background: "#f47c20", display: "inline-block" }} />
          FAQ
        </div>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: "#fff" }}>
          Frequently Asked <span style={{ color: "#f47c20" }}>Questions</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 600 }}>
          Everything you need to know before visiting us.
        </p>
      </div>

      <div style={{ maxWidth: 760, display: "grid", gap: 12 }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ background: "#222", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", background: "none", border: "none", color: open === i ? "#f47c20" : "#fff", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left", cursor: "pointer", fontFamily: "'Rajdhani',sans-serif", fontSize: "1.05rem", fontWeight: 600, transition: "background 0.2s" }}
              onMouseEnter={e => { if (open !== i) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)"; }}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "none"}>
              {faq.q}
              <span style={{ fontSize: "0.8rem", color: open === i ? "#f47c20" : "#888", transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", flexShrink: 0, marginLeft: 12 }}>▼</span>
            </button>
            <div style={{
              maxHeight: open === i ? 200 : 0,
              overflow: "hidden",
              padding: open === i ? "0 24px 20px" : "0 24px",
              transition: "max-height 0.35s ease, padding 0.35s",
              fontSize: "0.92rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7
            }}>
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
