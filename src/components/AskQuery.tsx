import { useState } from "react";

const chips = [
  { label: "🔊 Grinding brake noise?", q: "My car is making a grinding noise when braking. What could it be?" },
  { label: "🔧 Service interval?", q: "How often should I service my Maruti Swift?" },
  { label: "❄️ AC not cooling?", q: "My AC is blowing hot air. What is the likely issue?" },
  { label: "🌡️ Engine overheating?", q: "My car engine is overheating. What should I do?" },
  { label: "📋 Basic vs Full service?", q: "What is the difference between basic and full car service?" },
  { label: "⛽ CNG mileage drop?", q: "My CNG car is giving less mileage. Why?" },
];

export default function AskQuery() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);

  const askQuery = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setShown(false);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a friendly and expert car mechanic assistant for Manoj Automobile, a trusted workshop in Dabri/Dwarka, Delhi with 30+ years of experience. You specialize in Indian-market cars: Maruti Suzuki, Hyundai, Toyota, Tata, Mahindra, Honda, Kia, Renault etc. (NOT luxury cars like Audi, BMW, Mercedes).

When answering:
- Be warm, helpful, and use simple language
- Give a clear diagnosis or explanation of the likely issue
- Mention if it's urgent or can wait
- Give a rough cost estimate in Indian Rupees if asked
- Always end with a gentle suggestion to visit or WhatsApp Manoj Ji for an exact diagnosis
- Keep answers concise (3-5 lines max)
- Never recommend they go elsewhere`,
          messages: [{ role: "user", content: query }]
        })
      });
      const data = await res.json();
      const text = data.content?.find((b: { type: string; text: string }) => b.type === "text")?.text || "Sorry, could not get a response. Please WhatsApp Manoj Ji directly.";
      setAnswer(text);
    } catch {
      setAnswer("Network issue. Please WhatsApp Manoj Ji directly for help!");
    }
    setLoading(false);
    setShown(true);
  };

  return (
    <section id="askquery" style={{ background: "#1e1e1e", padding: "80px 5%" }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#f47c20", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 2, background: "#f47c20", display: "inline-block" }} />
          AI-Powered Help
        </div>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: "#fff" }}>
          Ask <span style={{ color: "#f47c20" }}>Any Query</span> About Your Car
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 600 }}>
          Have a question about your car's problem, service costs, or what needs fixing? Ask below — powered by AI, trained for Indian cars.
        </p>
      </div>

      <div style={{ maxWidth: 760 }}>
        {/* Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
          {chips.map(c => (
            <button key={c.label} onClick={() => setQuery(c.q)}
              style={{ background: "#222", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", padding: "8px 14px", borderRadius: 20, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#f47c20"; (e.currentTarget as HTMLButtonElement).style.color = "#f47c20"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Input Row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <textarea value={query} onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); askQuery(); } }}
            placeholder="Type your car problem or question here... e.g. 'My WagonR clutch feels slipping, is it serious?'"
            style={{ flex: 1, minWidth: 0, background: "#222", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff", padding: "14px 16px", fontFamily: "'Barlow',sans-serif", fontSize: "0.95rem", resize: "none", height: 80, outline: "none", transition: "border-color 0.2s" }}
            onFocus={e => (e.currentTarget.style.borderColor = "#f47c20")}
            onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
          <button onClick={askQuery} disabled={loading}
            style={{ background: "#f47c20", color: "#fff", border: "none", borderRadius: 10, padding: "0 24px", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1.1rem", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, whiteSpace: "nowrap", alignSelf: "stretch", transition: "background 0.2s" }}
            onMouseEnter={e => !loading && ((e.currentTarget as HTMLButtonElement).style.background = "#d96a10")}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "#f47c20"}>
            Ask Now →
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "30px" }}>
            <div style={{ display: "inline-block", width: 28, height: 28, border: "3px solid rgba(244,124,32,0.2)", borderTopColor: "#f47c20", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <div style={{ fontFamily: "'Rajdhani',sans-serif", color: "#888", marginTop: 10, letterSpacing: 1 }}>Analyzing your question...</div>
          </div>
        )}

        {/* Answer */}
        {shown && !loading && (
          <div style={{ background: "#1a1a1a", border: "1px solid rgba(244,124,32,0.25)", borderRadius: 12, padding: "22px 24px", animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ fontSize: "1.1rem" }}>🤖</span>
              <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, color: "#f47c20", letterSpacing: 1, fontSize: "0.9rem" }}>MANOJ AUTOMOBILE AI ASSISTANT</span>
            </div>
            <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{answer}</div>
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#25d366", color: "#fff", padding: "8px 16px", borderRadius: 7, textDecoration: "none", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>
                💬 Discuss with Manoj Ji
              </a>
              <button onClick={() => { setShown(false); setQuery(""); }}
                style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", padding: "8px 16px", borderRadius: 7, cursor: "pointer", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.9rem" }}>
                ✕ Clear
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  );
}
