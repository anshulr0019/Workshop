const services = [
  { icon: "🔧", title: "Full Car Service", desc: "Oil change, filters, spark plugs, fluid top-ups & 50-point inspection." },
  { icon: "🛞", title: "Brake Service", desc: "Brake pads, disc/drum replacement, brake fluid flush & ABS check." },
  { icon: "⚙️", title: "Engine Repair", desc: "Overheating, misfiring, timing belt, head gasket & valve work." },
  { icon: "🔄", title: "Clutch Overhaul", desc: "Clutch plate, pressure plate & bearing replacement. Our speciality." },
  { icon: "❄️", title: "AC Repair", desc: "Gas refilling, compressor, condenser, cooling coil & duct repair." },
  { icon: "⚡", title: "Electrical Work", desc: "Battery, alternator, starter motor, wiring & sensor diagnostics." },
  { icon: "🛢️", title: "CNG Servicing", desc: "CNG kit maintenance, leak check, valve service & tune-up." },
  { icon: "🔩", title: "Suspension", desc: "Shock absorbers, ball joints, tie rods, alignment & wheel balancing." },
  { icon: "🖥️", title: "Diagnostics", desc: "Computer-aided scanning, error code reading & expert analysis." },
];

export default function Services() {
  return (
    <section id="services" style={{ padding: "80px 5%", background: "#1a1a1a" }}>
      <div style={{ marginBottom: 50 }}>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#f47c20", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 2, background: "#f47c20", display: "inline-block" }} />
          What We Do
        </div>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: "#fff" }}>
          Complete Car Care<br /><span style={{ color: "#f47c20" }}>Under One Roof</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 600 }}>
          From routine oil changes to complex engine overhauls — we handle it all with precision and genuine parts.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {services.map(s => (
          <div key={s.title}
            style={{ background: "#222", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "24px 20px", transition: "all 0.25s", cursor: "default" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(244,124,32,0.4)";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 30px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}>
            <span style={{ fontSize: "2rem", marginBottom: 12, display: "block" }}>{s.icon}</span>
            <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: 6, color: "#fff" }}>{s.title}</h3>
            <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.5 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
