import ownerImg from './images/manoj automobile image.png';
import workerImg from './images/manoj-automobile-chotu.png';

export default function About() {
  return (
    <section id="about" style={{
      padding: "80px 5%", background: "#1a1a1a",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center"
    }} className="about-section">
      {/* Images */}
      <div>
        {/* Owner */}
        <div style={{ background: "#222", border: "1px solid rgba(244,124,32,0.3)", borderRadius: 16, height: 380, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, position: "relative", overflow: "hidden", marginBottom: 14 }}>
          <img src={ownerImg} alt="Manoj Ji - Owner" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          <div style={{ position: "absolute", top: 12, left: 12, background: "#f47c20", color: "#fff", padding: "3px 10px", borderRadius: 4, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: 1 }}>MANOJ JI · OWNER</div>
          <div style={{ position: "absolute", bottom: -10, right: -10, background: "#f47c20", color: "#fff", borderRadius: 12, padding: "14px 20px", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "1.3rem", textAlign: "center", lineHeight: 1.1, boxShadow: "0 8px 20px rgba(244,124,32,0.4)" }}>
            30+<br /><span style={{ display: "block", fontSize: "0.7rem", fontFamily: "'Barlow',sans-serif", fontWeight: 400, letterSpacing: 1, textTransform: "uppercase", opacity: 0.85 }}>Years of Mastery</span>
          </div>
        </div>

        {/* Workers Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[1, 2].map(n => (
            <div key={n} style={{ background: "#222", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, height: 160, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, position: "relative", overflow: "hidden" }}>
              {n === 1 ? (
                <img src={workerImg} alt="Manoj Automobile - Worker" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <>
                  <span style={{ fontSize: "2.2rem", opacity: 0.1 }}>👷</span>
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", color: "rgba(255,255,255,0.18)", fontSize: "0.72rem", letterSpacing: 2, textTransform: "uppercase", textAlign: "center", padding: "0 10px" }}>Worker Photo · Coming Soon</div>
                </>
              )}
              <div style={{ position: "absolute", top: 10, left: 10, background: "#1a4fa0", color: "#fff", padding: "2px 8px", borderRadius: 4, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 1 }}>MECHANIC {n}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 10, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.78rem", color: "#555", letterSpacing: 1 }}>📸 Send photos to update · White background works best</p>
      </div>

      {/* Text */}
      <div>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#f47c20", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 2, background: "#f47c20", display: "inline-block" }} />
          The Manoj Ji Advantage
        </div>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: "#fff" }}>
          Not Just a Mechanic —<br />A <span style={{ color: "#f47c20" }}>Master of His Craft</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: 8 }}>
          Mr. Manoj has spent over three decades mastering the art of car diagnosis and repair. Every vehicle that enters his workshop gets personal, attentive care — not a rushed job.
        </p>
        <ul style={{ listStyle: "none", display: "grid", gap: 14, marginTop: 28 }}>
          {[
            "\"We only recommend work your car actually needs.\"",
            "Exact diagnosis that saves you money — no guesswork.",
            "Personalized attention to every vehicle, every visit.",
            "Only OEM or certified genuine spare parts — always.",
            "Transparent billing — you see every charge before we proceed.",
            "Master-level clutch & brake specialist — our signature service.",
          ].map(point => (
            <li key={point} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#f47c20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, marginTop: 1 }}>✓</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-section { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
