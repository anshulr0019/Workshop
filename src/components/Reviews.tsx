import { reviews } from "../data/carData";

export default function Reviews() {
  const doubled = [...reviews, ...reviews];

  return (
    <section id="reviews" style={{ background: "#1e1e1e", padding: "80px 0 60px" }}>
      <div style={{ padding: "0 5%", marginBottom: 36 }}>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#f47c20", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 2, background: "#f47c20", display: "inline-block" }} />
          Customer Reviews
        </div>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20, color: "#fff" }}>
          What Our <span style={{ color: "#f47c20" }}>Customers Say</span>
        </h2>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: "#222", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 20px" }}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "2.5rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>4.9</div>
          <div>
            <div style={{ color: "#fbbf24", fontSize: "0.9rem", letterSpacing: 2 }}>★★★★★</div>
            <div style={{ fontSize: "0.75rem", color: "#888" }}>Google Reviews · 200+ Ratings</div>
          </div>
        </div>
      </div>

      {/* Scrolling Track */}
      <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg, transparent, white 8%, white 92%, transparent)", maskImage: "linear-gradient(90deg, transparent, white 8%, white 92%, transparent)" }}>
        <div style={{ display: "flex", gap: 20, animation: "scrollReviews 30s linear infinite", width: "max-content" }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"}>
          {doubled.map((r, i) => (
            <div key={i} style={{
              background: "#222", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14,
              padding: 24, width: 300, flexShrink: 0
            }}>
              <div style={{ color: "#fbbf24", fontSize: "1rem", letterSpacing: 2, marginBottom: 12 }}>★★★★★</div>
              <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: 16, fontStyle: "italic" }}>"{r.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #1a4fa0, #f47c20)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "1rem", color: "#fff" }}>{r.init}</div>
                <div>
                  <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>{r.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#888" }}>{r.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollReviews {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
