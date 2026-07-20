import ownerImg from './images/manoj automobile image.png';
import workerImg from './images/manoj-automobile-chotu.png';

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "100px 5% 60px", position: "relative", overflow: "hidden"
    }}>
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(26,79,160,0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 85% 20%, rgba(244,124,32,0.12) 0%, transparent 60%), #1a1a1a"
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(244,124,32,0.12)", border: "1px solid rgba(244,124,32,0.35)",
          color: "#f47c20", padding: "6px 14px", borderRadius: 30,
          fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.85rem",
          letterSpacing: 2, textTransform: "uppercase", marginBottom: 24
        }}>
          <span style={{ fontSize: 8, animation: "pulse 2s infinite" }}>●</span>
          Trusted Since 1994 · Dabri, Delhi
        </div>

        <h1 style={{
          fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900,
          fontSize: "clamp(2.4rem, 6vw, 4.2rem)", lineHeight: 1.05,
          letterSpacing: "-0.5px", marginBottom: 20, color: "#fff"
        }}>
          Expert Car Care<br />
          You Can Trust <span style={{ color: "#f47c20" }}>Blindly</span> –<br />
          <span style={{ borderBottom: "4px solid #2563c8", paddingBottom: 2 }}>30+ Years</span> of Excellence.
        </h1>

        <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: 560, marginBottom: 36 }}>
          Specializing in <strong style={{ color: "#fff" }}>Petrol, Diesel &amp; CNG</strong> vehicles.<br />
          Reasonable pricing, genuine parts, and expert diagnosis by <strong style={{ color: "#fff" }}>Manoj Ji</strong>.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 50 }}>
          <a href="https://wa.me/919999999999?text=Hello%20Manoj%20Ji,%20I%20need%20car%20service." target="_blank" rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#f47c20", color: "#fff", padding: "14px 28px", borderRadius: 8,
              fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1.1rem",
              letterSpacing: 1, textDecoration: "none",
              boxShadow: "0 4px 20px rgba(244,124,32,0.35)", transition: "all 0.2s"
            }}>
            💬 Message Manoj Ji
          </a>
          <a href="tel:+919999999999"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "transparent", color: "#fff", padding: "13px 28px", borderRadius: 8,
              border: "1.5px solid rgba(255,255,255,0.3)",
              fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1.1rem",
              letterSpacing: 1, textDecoration: "none", transition: "all 0.2s"
            }}>
            📞 Call Now
          </a>
        </div>

        <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
          {[
            { n: "30+", l: "Years Experience" },
            { n: "5000+", l: "Cars Serviced" },
            { n: "4.9★", l: "Google Rating" }
          ].map(s => (
            <div key={s.l} style={{ borderLeft: "3px solid #f47c20", paddingLeft: 14 }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "2rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: "0.8rem", color: "#888", textTransform: "uppercase", letterSpacing: 1, marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Owner / Workshop Images */}
      <div style={{
        position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)",
        zIndex: 1, display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-end"
      }} className="hero-img-wrap">

        {/* Owner Photo Section */}
        {/* Owner Photo Section */}
<div
  className="group relative w-[260px] h-[320px] overflow-hidden rounded-2xl border border-orange-500/30 bg-[#222] cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:border-orange-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35),0_0_30px_rgba(244,124,32,0.25)]"
>
  {/* Shine Effect */}
  <div className="pointer-events-none absolute inset-0 z-10 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[250%]" />

  <img
    src={ownerImg}
    alt="Manoj Ji - Owner"
    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
  />

  <div
    style={{
      position: "absolute",
      top: 12,
      left: 12,
      background: "#f47c20",
      color: "#fff",
      padding: "3px 10px",
      borderRadius: 4,
      fontFamily: "'Rajdhani',sans-serif",
      fontSize: "0.75rem",
      fontWeight: 700,
      letterSpacing: 1,
      zIndex: 20,
    }}
  >
    MANOJ JI · OWNER
  </div>
</div>

        
      </div>

      <style>{`
        @media (max-width: 900px) { .hero-img-wrap { display: none !important; } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </section>
  );
}