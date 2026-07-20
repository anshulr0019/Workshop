export default function Footer() {
  return (
    <>
      <footer style={{ background: "#111", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 5%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 30, paddingBottom: 30, borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, background: "#f47c20", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🔧</div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "1.3rem", letterSpacing: 1, lineHeight: 1.1, color: "#fff" }}>
              MANOJ AUTOMOBILE
              <span style={{ color: "#f47c20", display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: 3 }}>DWARKA · DABRI · DELHI</span>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: 1, color: "#888", marginBottom: 10 }}>Business Hours</h4>
            {[["Mon – Sat", "9:00 AM – 7:30 PM"], ["Sunday", "10:00 AM – 3:00 PM"]].map(([d, t]) => (
              <div key={d} style={{ display: "flex", justifyContent: "space-between", gap: 30, fontSize: "0.88rem", marginBottom: 4 }}>
                <span style={{ color: "#888" }}>{d}</span>
                <span style={{ color: "#4ade80" }}>{t}</span>
              </div>
            ))}
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: 1, color: "#888", marginBottom: 10 }}>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[["#services","Services"],["#estimator","Price Estimator"],["#predict","Bill Predictor ✨"],["#reviews","Reviews"],["#contact","Contact"]].map(([href, label]) => (
                <a key={href} href={href}
                  style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.88rem", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f47c20")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: "0.8rem", color: "#555" }}>
          <span>© 2025 Manoj Automobile, Dabri, New Delhi. All rights reserved.</span>
          <span>Best Car Mechanic Dwarka · Car Service Dabri · Affordable Car Repair Delhi</span>
        </div>
      </footer>

      {/* Floating Buttons */}
      <a href="https://wa.me/919999999999?text=Hello%20Manoj%20Ji,%20I%20need%20car%20service." target="_blank" rel="noreferrer"
        title="WhatsApp Manoj Ji"
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 500, background: "#25d366", color: "#fff", width: 58, height: 58, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.45)", textDecoration: "none", fontSize: "1.6rem", animation: "floatBounce 3s ease-in-out infinite" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>
      <a href="tel:+919999999999" title="Call Manoj Ji"
        style={{ position: "fixed", bottom: 94, right: 24, zIndex: 500, background: "#1a4fa0", color: "#fff", width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(26,79,160,0.4)", textDecoration: "none", fontSize: "1.2rem", transition: "transform 0.2s, background 0.2s" }}
        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.1)"}
        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"}>
        📞
      </a>

      <style>{`
        @keyframes floatBounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
