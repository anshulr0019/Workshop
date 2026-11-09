export interface ServicePrice {
  name: string;
  price: string;
  note: string;
}

export interface CarData {
  name: string;
  brand: string;
  fuelTypes: string[];
  data: [string, string, string][];
}

export const prices: Record<string, CarData> = {
  alto:     { name: "Maruti Alto / S-Presso", brand: "Maruti Suzuki", fuelTypes: ["Petrol","CNG"], data: [["Full Service (Basic)", "₹1,499","Oil + Filter + Inspection"],["Full Service (Premium)", "₹2,299","Synthetic oil + all filters"],["Brake Pad Replacement", "₹799","Per axle, parts included"],["Oil Change (5W-30)", "₹699","Engine flush + oil"],["Clutch Overhaul", "₹4,500","Plate + Bearing + Labour"]] },
  swift:    { name: "Maruti Swift / Dzire", brand: "Maruti Suzuki", fuelTypes: ["Petrol","Diesel"], data: [["Full Service (Basic)", "₹1,799","Oil + Filter + Inspection"],["Full Service (Premium)", "₹2,799","Synthetic oil + all filters"],["Brake Pad Replacement", "₹999","Per axle, parts included"],["Oil Change (5W-30)", "₹849","Engine flush + oil"],["Clutch Overhaul", "₹5,500","Plate + Bearing + Labour"]] },
  wagonr:   { name: "WagonR / Celerio", brand: "Maruti Suzuki", fuelTypes: ["Petrol","CNG"], data: [["Full Service (Basic)", "₹1,699","Oil + Filter + Inspection"],["Full Service (Premium)", "₹2,499","Synthetic oil + all filters"],["Brake Pad Replacement", "₹899","Per axle, parts included"],["Oil Change (5W-40)", "₹799","Engine flush + oil"],["Clutch Overhaul", "₹5,000","Plate + Bearing + Labour"]] },
  baleno:   { name: "Baleno / Ciaz", brand: "Maruti Suzuki", fuelTypes: ["Petrol"], data: [["Full Service (Basic)", "₹2,199","Oil + Filter + Inspection"],["Full Service (Premium)", "₹3,299","Synthetic oil + all filters"],["Brake Pad Replacement", "₹1,199","Per axle, parts included"],["Oil Change (0W-20)", "₹999","Fully synthetic oil"],["Clutch Overhaul", "₹6,500","Plate + Bearing + Labour"]] },
  i20:      { name: "Hyundai i20", brand: "Hyundai", fuelTypes: ["Petrol","Diesel"], data: [["Full Service (Basic)", "₹2,299","Oil + Filter + Inspection"],["Full Service (Premium)", "₹3,499","Synthetic oil + all filters"],["Brake Pad Replacement", "₹1,299","Per axle, parts included"],["Oil Change (5W-40)", "₹999","Engine flush + oil"],["Clutch Overhaul", "₹6,800","Plate + Bearing + Labour"]] },
  creta:    { name: "Hyundai Creta / Venue", brand: "Hyundai", fuelTypes: ["Petrol","Diesel"], data: [["Full Service (Basic)", "₹2,799","Oil + Filter + Inspection"],["Full Service (Premium)", "₹4,299","Synthetic oil + all filters"],["Brake Pad Replacement", "₹1,599","Per axle, parts included"],["Oil Change (5W-40)", "₹1,199","Fully synthetic oil"],["Clutch Overhaul", "₹8,500","Plate + Bearing + Labour"]] },
  ertiga:   { name: "Ertiga / Brezza", brand: "Maruti Suzuki", fuelTypes: ["Petrol","CNG"], data: [["Full Service (Basic)", "₹2,499","Oil + Filter + Inspection"],["Full Service (Premium)", "₹3,799","Synthetic oil + all filters"],["Brake Pad Replacement", "₹1,399","Per axle, parts included"],["Oil Change (5W-30)", "₹1,099","Engine flush + oil"],["Clutch Overhaul", "₹7,500","Plate + Bearing + Labour"]] },
  innova:   { name: "Toyota Innova / Fortuner", brand: "Toyota", fuelTypes: ["Diesel","Petrol"], data: [["Full Service (Basic)", "₹3,499","Diesel oil + Filter + Check"],["Full Service (Premium)", "₹5,499","Fully synthetic + all filters"],["Brake Pad Replacement", "₹1,899","Per axle, parts included"],["Oil Change (15W-40 Diesel)", "₹1,499","Engine flush + oil"],["Clutch Overhaul", "₹12,000","Plate + Bearing + Labour"]] },
  tata:     { name: "Tata Nexon / Altroz", brand: "Tata", fuelTypes: ["Petrol","Diesel"], data: [["Full Service (Basic)", "₹2,299","Oil + Filter + Inspection"],["Full Service (Premium)", "₹3,499","Synthetic oil + all filters"],["Brake Pad Replacement", "₹1,299","Per axle, parts included"],["Oil Change (5W-40)", "₹999","Engine flush + oil"],["Clutch Overhaul", "₹7,000","Plate + Bearing + Labour"]] },
  mahindra: { name: "Mahindra Scorpio / XUV", brand: "Mahindra", fuelTypes: ["Diesel"], data: [["Full Service (Basic)", "₹3,299","Diesel oil + Filter + Check"],["Full Service (Premium)", "₹5,099","Fully synthetic + all filters"],["Brake Pad Replacement", "₹1,799","Per axle, parts included"],["Oil Change (15W-40 Diesel)", "₹1,399","Engine flush + oil"],["Clutch Overhaul", "₹11,000","Plate + Bearing + Labour"]] },
  santro:   { name: "Hyundai Santro", brand: "Hyundai", fuelTypes: ["Petrol","CNG"], data: [["Full Service (Basic)", "₹1,599","Oil + Filter + Inspection"],["Full Service (Premium)", "₹2,399","Synthetic oil + all filters"],["Brake Pad Replacement", "₹849","Per axle, parts included"],["Oil Change (5W-30)", "₹749","Engine flush + oil"],["Clutch Overhaul", "₹4,800","Plate + Bearing + Labour"]] },
  eeco:     { name: "Maruti Eeco", brand: "Maruti Suzuki", fuelTypes: ["Petrol","CNG"], data: [["Full Service (Basic)", "₹1,699","Oil + Filter + Inspection"],["Full Service (Premium)", "₹2,499","Synthetic oil + all filters"],["Brake Pad Replacement", "₹849","Per axle, parts included"],["Oil Change (5W-30)", "₹699","Engine flush + oil"],["Clutch Overhaul", "₹5,200","Plate + Bearing + Labour"]] },
  xuv300:   { name: "Mahindra XUV300", brand: "Mahindra", fuelTypes: ["Petrol","Diesel"], data: [["Full Service (Basic)", "₹2,799","Diesel oil + Filter + Check"],["Full Service (Premium)", "₹4,299","Fully synthetic + all filters"],["Brake Pad Replacement", "₹1,499","Per axle, parts included"],["Oil Change (5W-40)", "₹1,199","Engine flush + oil"],["Clutch Overhaul", "₹9,000","Plate + Bearing + Labour"]] },
  nexonev:  { name: "Tata Nexon EV", brand: "Tata", fuelTypes: ["Electric"], data: [["Full Service (Basic)", "₹1,999","EV check + Brake + Filters"],["Battery Health Check", "₹799","BMS diagnostic + report"],["Brake Pad Replacement", "₹1,399","Regen-compatible pads"],["AC Service", "₹1,299","Cooling & cabin filter"],["Suspension Check", "₹599","Full underbody inspection"]] },
  amaze:    { name: "Honda Amaze", brand: "Honda", fuelTypes: ["Petrol","Diesel"], data: [["Full Service (Basic)", "₹2,099","Oil + Filter + Inspection"],["Full Service (Premium)", "₹3,199","Synthetic oil + all filters"],["Brake Pad Replacement", "₹1,199","Per axle, parts included"],["Oil Change (0W-20)", "₹949","Honda recommended grade"],["Clutch Overhaul", "₹6,500","Plate + Bearing + Labour"]] },
  city:     { name: "Honda City", brand: "Honda", fuelTypes: ["Petrol","Diesel"], data: [["Full Service (Basic)", "₹2,399","Oil + Filter + Inspection"],["Full Service (Premium)", "₹3,699","Synthetic oil + all filters"],["Brake Pad Replacement", "₹1,399","Per axle, parts included"],["Oil Change (0W-20)", "₹1,099","Honda recommended grade"],["Clutch Overhaul", "₹7,500","Plate + Bearing + Labour"]] },
  kwid:     { name: "Renault Kwid", brand: "Renault", fuelTypes: ["Petrol"], data: [["Full Service (Basic)", "₹1,499","Oil + Filter + Inspection"],["Full Service (Premium)", "₹2,199","Synthetic oil + all filters"],["Brake Pad Replacement", "₹749","Per axle, parts included"],["Oil Change (5W-30)", "₹649","Engine flush + oil"],["Clutch Overhaul", "₹4,200","Plate + Bearing + Labour"]] },
  duster:   { name: "Renault Duster", brand: "Renault", fuelTypes: ["Petrol","Diesel"], data: [["Full Service (Basic)", "₹2,699","Diesel oil + Filter + Check"],["Full Service (Premium)", "₹3,999","Fully synthetic + all filters"],["Brake Pad Replacement", "₹1,499","Per axle, parts included"],["Oil Change (15W-40)", "₹1,099","Engine flush + oil"],["Clutch Overhaul", "₹8,500","Plate + Bearing + Labour"]] },
  sonet:    { name: "Kia Sonet", brand: "Kia", fuelTypes: ["Petrol","Diesel"], data: [["Full Service (Basic)", "₹2,499","Oil + Filter + Inspection"],["Full Service (Premium)", "₹3,799","Synthetic oil + all filters"],["Brake Pad Replacement", "₹1,399","Per axle, parts included"],["Oil Change (5W-40)", "₹1,099","Engine flush + oil"],["Clutch Overhaul", "₹7,800","Plate + Bearing + Labour"]] },
  seltos:   { name: "Kia Seltos", brand: "Kia", fuelTypes: ["Petrol","Diesel"], data: [["Full Service (Basic)", "₹2,799","Oil + Filter + Inspection"],["Full Service (Premium)", "₹4,299","Synthetic oil + all filters"],["Brake Pad Replacement", "₹1,599","Per axle, parts included"],["Oil Change (5W-40)", "₹1,199","Fully synthetic oil"],["Clutch Overhaul", "₹8,800","Plate + Bearing + Labour"]] },
  punch:    { name: "Tata Punch", brand: "Tata", fuelTypes: ["Petrol"], data: [["Full Service (Basic)", "₹1,999","Oil + Filter + Inspection"],["Full Service (Premium)", "₹2,999","Synthetic oil + all filters"],["Brake Pad Replacement", "₹1,099","Per axle, parts included"],["Oil Change (5W-40)", "₹899","Engine flush + oil"],["Clutch Overhaul", "₹6,200","Plate + Bearing + Labour"]] },
  bolero:   { name: "Mahindra Bolero", brand: "Mahindra", fuelTypes: ["Diesel"], data: [["Full Service (Basic)", "₹2,999","Diesel oil + Filter + Check"],["Full Service (Premium)", "₹4,499","Fully synthetic + all filters"],["Brake Pad Replacement", "₹1,599","Per axle, parts included"],["Oil Change (15W-40 Diesel)", "₹1,299","Engine flush + oil"],["Clutch Overhaul", "₹10,000","Plate + Bearing + Labour"]] },
};

// Milestone-based service recommendations
export interface Recommendation {
  service: string;
  reason: string;
  urgency: "critical" | "high" | "medium" | "low";
  estimatedCost: string;
  category: string;
}

export function generateRecommendations(
  _carKey: string,
  mileage: number,
  lastServiceDate: Date,
  fuelType: string
): { recommendations: Recommendation[]; totalMin: number; totalMax: number; healthScore: number } {
  const recs: Recommendation[] = [];
  const monthsSinceService = Math.floor(
    (Date.now() - lastServiceDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

  // Oil Change — every 5000 km or 4 months
  if (mileage % 5000 < 1000 || monthsSinceService >= 4) {
    recs.push({ service: "Engine Oil Change", reason: `${monthsSinceService >= 4 ? `${monthsSinceService} months since last service` : `You're due by mileage milestone`}`, urgency: monthsSinceService >= 6 ? "critical" : "high", estimatedCost: "₹699 – ₹1,199", category: "Engine" });
  }

  // Air Filter — every 15,000 km
  if (mileage >= 15000 && mileage % 15000 < 2000) {
    recs.push({ service: "Air Filter Replacement", reason: "Due at 15,000 km intervals. Dirty filter reduces mileage by up to 10%.", urgency: "medium", estimatedCost: "₹350 – ₹650", category: "Engine" });
  }

  // Spark Plugs — every 30,000 km (petrol only)
  if ((fuelType === "Petrol" || fuelType === "CNG") && mileage >= 30000 && mileage % 30000 < 3000) {
    recs.push({ service: "Spark Plug Replacement", reason: "Worn plugs cause rough idle, poor mileage & hard starts.", urgency: "high", estimatedCost: "₹400 – ₹1,200", category: "Engine" });
  }

  // Brake Pads — every 40,000 km
  if (mileage >= 40000 && mileage % 40000 < 3000) {
    recs.push({ service: "Brake Pad Inspection & Replacement", reason: "Safety-critical. Brake pads should be checked at 40,000 km.", urgency: "critical", estimatedCost: "₹799 – ₹1,899", category: "Brakes" });
  }

  // Coolant Flush — every 40,000 km
  if (mileage >= 40000 && mileage % 40000 < 3000) {
    recs.push({ service: "Coolant Flush & Refill", reason: "Old coolant loses anti-corrosion properties. Can cause overheating.", urgency: "high", estimatedCost: "₹500 – ₹900", category: "Cooling" });
  }

  // Clutch Check — every 50,000 km
  if (mileage >= 50000 && mileage % 50000 < 4000) {
    recs.push({ service: "Clutch System Inspection", reason: "At 50,000 km, clutch plate wear should be assessed to prevent failure.", urgency: "medium", estimatedCost: "₹199 (inspection)", category: "Drivetrain" });
  }

  // Timing Belt — every 60,000 km (petrol/diesel)
  if (fuelType !== "Electric" && mileage >= 60000 && mileage % 60000 < 5000) {
    recs.push({ service: "Timing Belt / Chain Check", reason: "Timing belt failure = engine seizure. Critical check at 60,000 km.", urgency: "critical", estimatedCost: "₹2,500 – ₹5,000", category: "Engine" });
  }

  // Gearbox Oil — every 40,000 km
  if (mileage >= 40000 && mileage % 40000 < 3000) {
    recs.push({ service: "Gearbox Oil Change", reason: "Protects transmission gears. Often overlooked but essential.", urgency: "medium", estimatedCost: "₹800 – ₹1,500", category: "Transmission" });
  }

  // CNG specific
  if (fuelType === "CNG" && mileage >= 30000) {
    recs.push({ service: "CNG Kit Checkup & Valve Service", reason: "CNG systems need periodic leak tests and valve cleaning for safety.", urgency: "high", estimatedCost: "₹500 – ₹1,000", category: "CNG System" });
  }

  // If nothing triggered, add a basic service
  if (recs.length === 0) {
    recs.push({ service: "Routine Check & Fluid Top-Up", reason: "Your car is in good health! A quick inspection will keep it that way.", urgency: "low", estimatedCost: "₹299 – ₹499", category: "General" });
  }

  // Time-based overrides
  if (monthsSinceService >= 12) {
    recs.push({ service: "Full Comprehensive Service", reason: `It's been ${monthsSinceService} months! A thorough service is strongly recommended.`, urgency: "critical", estimatedCost: "₹2,500 – ₹5,000", category: "General" });
  }

  // Deduplicate
  const seen = new Set<string>();
  const unique = recs.filter(r => { if (seen.has(r.service)) return false; seen.add(r.service); return true; });

  // Parse cost ranges
  const parseCost = (c: string) => {
    const nums = c.replace(/₹/g, "").split("–").map(s => parseInt(s.replace(/,/g, "").trim(), 10)).filter(Boolean);
    return nums;
  };
  let totalMin = 0, totalMax = 0;
  unique.forEach(r => {
    const [mn, mx] = parseCost(r.estimatedCost);
    totalMin += mn || 0;
    totalMax += mx || mn || 0;
  });

  // Health score: 100 - deductions
  let score = 100;
  if (monthsSinceService > 12) score -= 30;
  else if (monthsSinceService > 6) score -= 15;
  else if (monthsSinceService > 4) score -= 8;
  unique.forEach(r => {
    if (r.urgency === "critical") score -= 15;
    else if (r.urgency === "high") score -= 8;
    else if (r.urgency === "medium") score -= 4;
  });
  score = Math.max(10, Math.min(100, score));

  return { recommendations: unique, totalMin, totalMax, healthScore: score };
}

// Inventory items
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  minStock: number;
  costPerUnit: number;
  lastUpdated: string;
}

export const defaultInventory: InventoryItem[] = [
  { id: "1", name: "Engine Oil 5W-30 (1L)", category: "Oils & Fluids", stock: 48, unit: "litres", minStock: 20, costPerUnit: 280, lastUpdated: new Date().toISOString() },
  { id: "2", name: "Engine Oil 5W-40 (1L)", category: "Oils & Fluids", stock: 35, unit: "litres", minStock: 15, costPerUnit: 320, lastUpdated: new Date().toISOString() },
  { id: "3", name: "Engine Oil 15W-40 Diesel (1L)", category: "Oils & Fluids", stock: 20, unit: "litres", minStock: 10, costPerUnit: 260, lastUpdated: new Date().toISOString() },
  { id: "4", name: "Brake Pads (Maruti)", category: "Brakes", stock: 8, unit: "sets", minStock: 5, costPerUnit: 350, lastUpdated: new Date().toISOString() },
  { id: "5", name: "Brake Pads (Hyundai/Kia)", category: "Brakes", stock: 6, unit: "sets", minStock: 4, costPerUnit: 420, lastUpdated: new Date().toISOString() },
  { id: "6", name: "Air Filter (Universal)", category: "Filters", stock: 15, unit: "pcs", minStock: 8, costPerUnit: 180, lastUpdated: new Date().toISOString() },
  { id: "7", name: "Oil Filter (Universal)", category: "Filters", stock: 22, unit: "pcs", minStock: 10, costPerUnit: 120, lastUpdated: new Date().toISOString() },
  { id: "8", name: "Spark Plugs (NGK)", category: "Engine Parts", stock: 32, unit: "pcs", minStock: 16, costPerUnit: 180, lastUpdated: new Date().toISOString() },
  { id: "9", name: "Coolant (1L)", category: "Oils & Fluids", stock: 12, unit: "litres", minStock: 8, costPerUnit: 150, lastUpdated: new Date().toISOString() },
  { id: "10", name: "Brake Fluid (DOT 3)", category: "Oils & Fluids", stock: 5, unit: "bottles", minStock: 4, costPerUnit: 220, lastUpdated: new Date().toISOString() },
  { id: "11", name: "Clutch Plate (Maruti)", category: "Drivetrain", stock: 3, unit: "pcs", minStock: 2, costPerUnit: 1200, lastUpdated: new Date().toISOString() },
  { id: "12", name: "Wiper Blades (Pair)", category: "Body & Electrical", stock: 10, unit: "pairs", minStock: 5, costPerUnit: 350, lastUpdated: new Date().toISOString() },
];
