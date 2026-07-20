import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import PriceEstimator from "./components/PriceEstimator";
import PricePrediction from "./components/PricePrediction";
import About from "./components/About";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import AskQuery from "./components/AskQuery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";

const brands = [
  "🚗 Maruti Suzuki",
  "🚗 Hyundai",
  "🚗 Toyota",
  "🚗 Tata",
  "🚗 Mahindra",
  "🚗 Honda",
  "🚗 Kia",
  "🚗 Renault",
  "🚗 Nissan",
  "🚗 Skoda",
  "🚗 Volkswagen",
  "🚗 & More"
];

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  // ✅ When admin is open, completely replace the page
  if (adminOpen) {
    return <AdminDashboard onClose={() => setAdminOpen(false)} />;
  }

  // ✅ Normal website view
  return (
    <div style={{ background: "#1a1a1a", color: "#fff", fontFamily: "'Barlow', sans-serif", overflowX: "hidden" }}>
      
      <div style={{ height: 4, background: "linear-gradient(90deg, #1a4fa0, #f47c20, #1a4fa0)" }} />

      <Navbar onAdminClick={() => setAdminOpen(true)} />

      <Hero />

      {/* Brands Section */}
      <div style={{ background: "#161616", padding: "44px 5%" }}>
        <div style={{
          textAlign: "center",
          fontFamily: "'Rajdhani',sans-serif",
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "#666",
          letterSpacing: 3,
          textTransform: "uppercase",
          marginBottom: 20
        }}>
          Cars We Service
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 12
        }}>
          {brands.map(b => (
            <div key={b}
              style={{
                background: "#222",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 8,
                padding: "10px 22px",
                fontFamily: "'Rajdhani',sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.5)"
              }}>
              {b}
            </div>
          ))}
        </div>
      </div>

      <Services />
      <PriceEstimator />
      <PricePrediction />
      <About />
      <Reviews />
      <FAQ />
      <AskQuery />
      <Contact />
      <Footer />
    </div>
  );
}