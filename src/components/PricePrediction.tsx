import { useState } from "react";
import { prices, generateRecommendations, type Recommendation } from "../data/carData";

const urgencyConfig = {
  critical: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "🔴 CRITICAL", border: "rgba(239,68,68,0.3)" },
  high:     { color: "#f97316", bg: "rgba(249,115,22,0.1)", label: "🟠 HIGH",     border: "rgba(249,115,22,0.3)" },
  medium:   { color: "#eab308", bg: "rgba(234,179,8,0.1)",  label: "🟡 MEDIUM",   border: "rgba(234,179,8,0.3)" },
  low:      { color: "#22c55e", bg: "rgba(34,197,94,0.1)",  label: "🟢 LOW",      border: "rgba(34,197,94,0.3)" },
};

export default function PricePrediction() {
  const [carKey, setCarKey] = useState("");
  const [mileage, setMileage] = useState("");
  const [lastService, setLastService] = useState("");
  const [fuelType, setFuelType] = useState("Petrol");
  const [result, setResult] = useState<{ recommendations: Recommendation[]; totalMin: number; totalMax: number; healthScore: number } | null>(null);
  const [error, setError] = useState("");

  const carList = Object.entries(prices).map(([key, val]) => ({ key, name: val.name, brand: val.brand, fuelTypes: val.fuelTypes }));

  const handleAnalyze = () => {
    setError("");
    if (!carKey) { setError("Please select your car model."); return; }
    if (!mileage || isNaN(Number(mileage)) || Number(mileage) < 0) { setError("Enter a valid mileage (km)."); return; }
    if (!lastService) { setError("Please enter the date of your last service."); return; }
    const lastDate = new Date(lastService);
    if (lastDate > new Date()) { setError("Last service date cannot be in the future."); return; }
    const res = generateRecommendations(carKey, Number(mileage), lastDate, fuelType);
    setResult(res);
  };

  const healthColor = result
    ? result.healthScore >= 80 ? "#22c55e"
      : result.healthScore >= 55 ? "#eab308"
      : "#ef4444"
    : "#888";

  const healthLabel = result
    ? result.healthScore >= 80 ? "Good Shape 👍"
      : result.healthScore >= 55 ? "Needs Attention ⚠️"
      : "Service Overdue 🚨"
    : "";

  return (
    <section id="predict" style={{ background: "#161616", padding: "80px 5%" }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#f47c20", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 2, background: "#f47c20", display: "inline-block" }} />
          AI-Powered Engine
        </div>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: "#fff" }}>
          Smart <span style={{ color: "#f47c20" }}>Bill Predictor</span> Engine
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 620, marginBottom: 0 }}>
          Enter your car details and our algorithm analyses your mileage milestones + service history to generate a personalised service recommendation and estimated cost — <strong style={{ color: "#f47c20" }}>before you even visit us.</strong>
        </p>
      </div>

      {/* Input Form */}
      <div style={{ background: "#222", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px", maxWidth: 860, marginBottom: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 20, marginBottom: 24 }}>
          {/* Car Select */}
          <div>
            <label style={{ display: "block", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Select Car Model</label>
            <select value={carKey} onChange={e => { setCarKey(e.target.value); const car = prices[e.target.value]; if (car) setFuelType(car.fuelTypes[0]); }}
              style={{ width: "100%", background: "#2c2c2c", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", padding: "11px 14px", fontFamily: "'Barlow',sans-serif", fontSize: "0.92rem", outline: "none", cursor: "pointer" }}>
              <option value="">-- Choose Car --</option>
              {carList.map(c => <option key={c.key} value={c.key}>{c.name}</option>)}
            </select>
          </div>

          {/* Fuel Type */}
          <div>
            <label style={{ display: "block", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Fuel Type</label>
            <select value={fuelType} onChange={e => setFuelType(e.target.value)}
              style={{ width: "100%", background: "#2c2c2c", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", padding: "11px 14px", fontFamily: "'Barlow',sans-serif", fontSize: "0.92rem", outline: "none", cursor: "pointer" }}>
              {carKey && prices[carKey]
                ? prices[carKey].fuelTypes.map(f => <option key={f} value={f}>{f}</option>)
                : ["Petrol", "Diesel", "CNG", "Electric"].map(f => <option key={f} value={f}>{f}</option>)
              }
            </select>
          </div>

          {/* Mileage */}
          <div>
            <label style={{ display: "block", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Current Mileage (KM)</label>
            <input type="number" value={mileage} onChange={e => setMileage(e.target.value)} placeholder="e.g. 42000"
              style={{ width: "100%", background: "#2c2c2c", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", padding: "11px 14px", fontFamily: "'Barlow',sans-serif", fontSize: "0.92rem", outline: "none" }} />
          </div>

          {/* Last Service Date */}
          <div>
            <label style={{ display: "block", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Last Service Date</label>
            <input type="date" value={lastService} onChange={e => setLastService(e.target.value)} max={new Date().toISOString().split("T")[0]}
              style={{ width: "100%", background: "#2c2c2c", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", padding: "11px 14px", fontFamily: "'Barlow',sans-serif", fontSize: "0.92rem", outline: "none", colorScheme: "dark" }} />
          </div>
        </div>

        {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "10px 16px", color: "#ef4444", marginBottom: 16, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>⚠️ {error}</div>}

        <button onClick={handleAnalyze}
          style={{ background: "#f47c20", color: "#fff", border: "none", borderRadius: 8, padding: "13px 32px", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: 1, cursor: "pointer", transition: "background 0.2s", boxShadow: "0 4px 20px rgba(244,124,32,0.3)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#d96a10")}
          onMouseLeave={e => (e.currentTarget.style.background = "#f47c20")}>
          🔍 Analyse My Car →
        </button>
      </div>

      {/* Result */}
      {result && (
        <div style={{ maxWidth: 860, animation: "fadeIn 0.4s ease" }}>
          {/* Health Score */}
          <div style={{ background: "#222", border: `1px solid ${healthColor}40`, borderRadius: 16, padding: "28px 32px", marginBottom: 24, display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "4rem", fontWeight: 900, color: healthColor, lineHeight: 1 }}>{result.healthScore}</div>
              <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#888", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>Health Score</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1.5rem", fontWeight: 800, color: healthColor, marginBottom: 8 }}>{healthLabel}</div>
              {/* Progress bar */}
              <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
                <div style={{ height: "100%", width: `${result.healthScore}%`, background: `linear-gradient(90deg, ${healthColor}, ${healthColor}88)`, borderRadius: 10, transition: "width 1s ease" }} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
                We found <strong style={{ color: "#fff" }}>{result.recommendations.length} service recommendation{result.recommendations.length !== 1 ? "s" : ""}</strong> for your vehicle.
              </div>
            </div>
            <div style={{ background: "#1a1a1a", border: "1px solid rgba(244,124,32,0.25)", borderRadius: 12, padding: "16px 24px", textAlign: "center", minWidth: 160 }}>
              <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#888", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Estimated Total</div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1.6rem", fontWeight: 900, color: "#f47c20", lineHeight: 1 }}>₹{result.totalMin.toLocaleString()}</div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.4)", lineHeight: 1, marginTop: 4 }}>– ₹{result.totalMax.toLocaleString()}</div>
              <div style={{ fontSize: "0.72rem", color: "#555", marginTop: 6 }}>approx. incl. labour</div>
            </div>
          </div>

          {/* Recommendation Cards */}
          <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
            {result.recommendations.map((rec, i) => {
              const cfg = urgencyConfig[rec.urgency];
              return (
                <div key={i} style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 12, padding: "18px 22px", display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "#fff" }}>{rec.service}</span>
                      <span style={{ background: cfg.color + "22", border: `1px solid ${cfg.color}44`, color: cfg.color, padding: "2px 8px", borderRadius: 4, fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: 1 }}>{cfg.label}</span>
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{rec.reason}</div>
                    <div style={{ fontSize: "0.75rem", color: "#888", marginTop: 4 }}>Category: {rec.category}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1.3rem", fontWeight: 800, color: "#f47c20" }}>{rec.estimatedCost}</div>
                    <div style={{ fontSize: "0.72rem", color: "#666" }}>est. cost</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div style={{ background: "rgba(26,79,160,0.1)", border: "1px solid rgba(26,79,160,0.25)", borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, color: "#fff", fontSize: "1.05rem" }}>📋 Get Your Exact Quote from Manoj Ji</div>
              <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginTop: 3 }}>This is an AI estimate. Final pricing confirmed after physical inspection — always free.</div>
            </div>
            <a href={`https://wa.me/919999999999?text=Hello%20Manoj%20Ji,%20I%20ran%20the%20Bill%20Predictor%20for%20my%20car.%20Mileage:%20${mileage}km.%20Can%20I%20get%20a%20quote?`} target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25d366", color: "#fff", padding: "11px 22px", borderRadius: 8, textDecoration: "none", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: 1 }}>
              💬 WhatsApp Quote
            </a>
          </div>

          <div style={{ marginTop: 14, fontSize: "0.78rem", color: "#555", textAlign: "center" }}>
            * Prices are indicative estimates based on service milestones. Actual costs may vary by car condition and part availability.
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        select option { background: #2c2c2c; }
      `}</style>
    </section>
  );
}
