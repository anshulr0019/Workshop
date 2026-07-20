import { useState } from "react";
import { prices } from "../data/carData";

const carList = [
  { key: "alto", label: "Alto / S-Presso" }, { key: "swift", label: "Swift / Dzire" },
  { key: "wagonr", label: "WagonR / Celerio" }, { key: "baleno", label: "Baleno / Ciaz" },
  { key: "i20", label: "Hyundai i20" }, { key: "creta", label: "Creta / Venue" },
  { key: "ertiga", label: "Ertiga / Brezza" }, { key: "innova", label: "Innova / Fortuner" },
  { key: "tata", label: "Nexon / Altroz" }, { key: "mahindra", label: "Scorpio / XUV" },
];
const moreCars = [
  { key: "santro", label: "Hyundai Santro" }, { key: "eeco", label: "Maruti Eeco" },
  { key: "xuv300", label: "Mahindra XUV300" }, { key: "nexonev", label: "Tata Nexon EV" },
  { key: "amaze", label: "Honda Amaze" }, { key: "city", label: "Honda City" },
  { key: "kwid", label: "Renault Kwid" }, { key: "duster", label: "Renault Duster" },
  { key: "sonet", label: "Kia Sonet" }, { key: "seltos", label: "Kia Seltos" },
  { key: "punch", label: "Tata Punch" }, { key: "bolero", label: "Mahindra Bolero" },
];

export default function PriceEstimator() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const visibleCars = showMore ? [...carList, ...moreCars] : carList;
  const car = selected ? prices[selected] : null;

  return (
    <section id="estimator" style={{ background: "#1e1e1e", padding: "80px 5%" }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#f47c20", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 2, background: "#f47c20", display: "inline-block" }} />
          Transparent Pricing
        </div>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: "#fff" }}>
          Service Price <span style={{ color: "#f47c20" }}>Estimator</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 600 }}>
          Select your car below to see estimated service costs. No hidden charges. What we quote — is what you pay.
        </p>
      </div>

      {/* Car Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 12, marginBottom: 20 }}>
        {visibleCars.map(c => (
          <button key={c.key} onClick={() => setSelected(c.key)}
            style={{
              background: selected === c.key ? "rgba(244,124,32,0.15)" : "#222",
              border: `1.5px solid ${selected === c.key ? "#f47c20" : "rgba(255,255,255,0.08)"}`,
              borderRadius: 10, padding: "16px 10px", textAlign: "center", cursor: "pointer",
              color: selected === c.key ? "#f47c20" : "#fff",
              fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", fontWeight: 600,
              transition: "all 0.2s"
            }}>
            <span style={{ fontSize: "1.6rem", display: "block", marginBottom: 6 }}>🚗</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* Show More */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <button onClick={() => setShowMore(!showMore)}
          style={{ background: "transparent", border: "1.5px solid rgba(244,124,32,0.5)", color: "#f47c20", padding: "10px 28px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "1rem", cursor: "pointer", letterSpacing: 1 }}>
          {showMore ? "▲  Show Less" : `▼  Show More Cars (${moreCars.length} more)`}
        </button>
      </div>

      {/* Price Card */}
      {car && (
        <div style={{
          background: "#1a1a1a", border: "1px solid rgba(244,124,32,0.25)", borderRadius: 16,
          padding: 32, animation: "fadeInUp 0.3s ease", maxWidth: 760
        }}>
          <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>{car.name}</div>
            <div style={{ fontSize: "0.8rem", color: "#888", marginTop: 4 }}>Estimated prices · Final quote after inspection · Inclusive of labour</div>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {car.data.map(([name, price, note]) => (
              <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, padding: "14px 18px" }}>
                <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, fontSize: "1rem", color: "#fff" }}>{name}</span>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1.3rem", fontWeight: 800, color: "#f47c20" }}>{price}</div>
                  <div style={{ fontSize: "0.7rem", color: "#888" }}>{note}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(26,79,160,0.1)", border: "1px solid rgba(26,79,160,0.25)", borderRadius: 8, fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
            💡 Prices may vary based on car condition, part availability & model year. Call or WhatsApp Manoj Ji for a free estimate.
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  );
}
