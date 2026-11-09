import { useState } from "react";
import { prices } from "../data/carData";
import { business, whatsappUrl } from "../data/business";
import Icon from "./Icon";
import FadeIn from "./FadeIn";
export default function PriceEstimator() {
  const [model, setModel] = useState("");
  const [service, setService] = useState("Periodic service");
  const car = prices[model];
  const message = `Hello Manoj Ji, could you share a quote?\nCar: ${car?.name || "Other model (I will share details)"}\nService: ${service}\nI will share the model year, fuel type and any symptoms in this chat.`;
  return (
    <section id="estimator" className="section quote-section">
      <div className="container split-layout">
        <FadeIn>
          <p className="eyebrow">02 / LET’S TALK NUMBERS</p>
          <h2>
            A clear quote.
            <br />
            <span>No guesswork.</span>
          </h2>
          <p className="section-intro">
            Every car is a little different. Tell us what you drive and what you
            need — we’ll help you plan the next step.
          </p>
          <div className="quote-points">
            <p>
              <Icon name="check" /> Discuss the work with Manoj Ji
            </p>
            <p>
              <Icon name="check" /> Confirm parts, labour and final cost
            </p>
            <p>
              <Icon name="check" /> Agree on a convenient workshop visit
            </p>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="quote-card">
            <div className="card-heading">
              <span className="icon-tile">
                <Icon name="car" size={26} />
              </span>
              <div>
                <h3>What do you drive?</h3>
                <p>Start with your car. We’ll take it from here.</p>
              </div>
            </div>
            <label htmlFor="car-model">Car model</label>
            <select
              id="car-model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="">Select your car</option>
              {Object.entries(prices)
                .filter(([, c]) => !c.fuelTypes.includes("Electric"))
                .map(([key, c]) => (
                  <option key={key} value={key}>
                    {c.name}
                  </option>
                ))}
              <option value="other">Other / my car isn’t listed</option>
            </select>
            <label htmlFor="service-type">What can we help with?</label>
            <select
              id="service-type"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              {[
                "Periodic service",
                "Clutch or brakes",
                "Engine or warning light",
                "AC not cooling",
                "Battery or electrical",
                "Suspension",
                "CNG servicing",
                "Not sure — help me diagnose",
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            {business.pricesApproved && car && (
              <div className="price-list" aria-live="polite">
                <h4>Indicative prices for {car.name}</h4>
                {car.data.map(([name, price]) => (
                  <p key={name}>
                    <span>{name}</span>
                    <strong>{price}</strong>
                  </p>
                ))}
                <small>
                  Final price, parts, labour and applicable taxes confirmed with
                  the workshop after inspection.
                </small>
              </div>
            )}
            {model ? (
              <a
                className="button primary full-width"
                href={whatsappUrl(message)}
                target="_blank"
                rel="noreferrer"
              >
                Get my quote on WhatsApp
                <Icon name="arrow" />
              </a>
            ) : (
              <button className="button primary full-width" disabled>
                Select a car to continue
                <Icon name="arrow" />
              </button>
            )}
            <p className="form-note">
              Opens a message for you to review and send. A visit is confirmed
              directly by the workshop.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
