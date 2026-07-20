export default function Contact() {
  return (
    <section id="contact" style={{ background: "#1a1a1a", padding: "80px 5%" }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#f47c20", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 2, background: "#f47c20", display: "inline-block" }} />
          Get In Touch
        </div>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, color: "#fff" }}>
          Visit Us or <span style={{ color: "#f47c20" }}>Call Anytime</span>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="contact-grid">
        {/* Info Cards */}
        <div style={{ display: "grid", gap: 16 }}>
          {[
            { icon: "📍", title: "Address", content: "Near Dabri More, Dwarka–Dabri Road\nNew Delhi – 110045" },
            { icon: "📞", title: "Phone / WhatsApp", phone: true },
            { icon: "🕐", title: "Working Hours", content: "Monday – Saturday: 9:00 AM – 7:30 PM\nSunday: 10:00 AM – 3:00 PM" },
            { icon: "🚗", title: "Pick-up & Drop", content: "Available within Dwarka, Uttam Nagar,\nDabri & nearby areas." },
          ].map((c, i) => (
            <div key={i} style={{ background: "#222", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20, display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(244,124,32,0.12)", border: "1px solid rgba(244,124,32,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                {c.icon}
              </div>
              <div>
                <h4 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: 1, color: "#888", marginBottom: 4 }}>{c.title}</h4>
                {c.phone ? (
                  <p style={{ fontSize: "0.95rem", color: "#fff", lineHeight: 1.5 }}>
                    <a href="tel:+919999999999" style={{ color: "#f47c20", textDecoration: "none" }}>+91 99999 99999</a><br />
                    <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" style={{ color: "#f47c20", textDecoration: "none" }}>WhatsApp Manoj Ji</a>
                  </p>
                ) : (
                  <p style={{ fontSize: "0.95rem", color: "#fff", lineHeight: 1.5, whiteSpace: "pre-line" }}>{c.content}</p>
                )}
              </div>
            </div>
          ))}

          <a href="https://wa.me/919999999999?text=Hello%20Manoj%20Ji,%20I%20need%20car%20service." target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#f47c20", color: "#fff", padding: "14px 28px", borderRadius: 8, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: 1, textDecoration: "none", boxShadow: "0 4px 20px rgba(244,124,32,0.35)" }}>
            💬 Book via WhatsApp
          </a>
        </div>

        {/* Map */}
        <div style={{ borderRadius: 16, overflow: "hidden", height: 400, border: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14014.738!2d77.007!3d28.614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b87e5f9e07b%3A0x0!2sDabri%20More%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
            style={{ width: "100%", flex: 1, border: "none", filter: "grayscale(20%) invert(5%)" }}
            allowFullScreen loading="lazy" title="Manoj Automobile Location" />
          <a href="https://maps.google.com/?q=Dabri+More+Delhi" target="_blank" rel="noreferrer"
            style={{ display: "block", textAlign: "center", background: "#1a4fa0", color: "#fff", padding: 12, fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
            📍 Get Directions to Manoj Automobile
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
