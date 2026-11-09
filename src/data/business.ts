// Confirm these existing business details with the owner before launch.
export const business = {
  name: "Manoj Automobile",
  phone: "+919213172194",
  displayPhone: "+91 92131 72194",
  whatsapp: "919213172194",
  // Both of Manoj Ji's numbers, primary first. `phone` above stays the one-tap default.
  phones: [
    { tel: "+919213172194", display: "+91 92131 72194" },
    { tel: "+918178896377", display: "+91 81788 96377" },
  ],
  // Exactly as on the Google Maps listing, split into display lines.
  addressLines: ["Near Police, Dabri Mod", "Dabri - Palam Rd, B-73, Sitapuri Part 1, Sitapuri", "New Delhi, Delhi 110059"],
  fullAddress: "Near Police, Dabri Mod, Dabri - Palam Rd, B-73, Sitapuri Part 1, Sitapuri, New Delhi, Delhi 110059",
  hours: ["Open every day: 9:30 AM – 10:00 PM"],
  // Same hours every day, in minutes after midnight, Delhi time. Drives the
  // "Open now" badge and booking slots; keep in sync with `hours` above.
  opensAt: 9 * 60 + 30,
  closesAt: 22 * 60,
  // Add the exact public listing URL and Place ID after confirming the workshop pin.
  // Verified listing (Google Maps CID) supplied by the owner's family, Nov 2026.
  mapsUrl:
    import.meta.env.VITE_GOOGLE_MAPS_URL ||
    "https://maps.google.com/?cid=3854993009221938151",
  // Key-free embed that resolves to the verified listing (checked Nov 2026). Loaded only
  // when the visitor taps "Show map". An iframe src from Share > Embed a map also works.
  mapsEmbedUrl:
    import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL ||
    "https://www.google.com/maps?q=Manoj+Automobile,+B-73,+Sitapuri+Part+1,+Dabri+-+Palam+Rd,+New+Delhi,+Delhi+110059&hl=en&z=17&output=embed",
  placeId: import.meta.env.VITE_GOOGLE_PLACE_ID || "",
  liveReviews: import.meta.env.VITE_LIVE_REVIEWS === "true",
};

export function whatsappUrl(
  message = "Hello Manoj Ji, I would like to book a car service.",
) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mapsUrl =
  business.mapsUrl ||
  (business.placeId
    ? `https://www.google.com/maps/search/?api=1&query=Manoj+Automobile&query_place_id=${encodeURIComponent(business.placeId)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.name} Dabri Delhi`)}`);
// Opens turn-by-turn directions from wherever the visitor is.
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${business.name}, ${business.fullAddress}`)}`;
export const hasExactLocation = Boolean(business.mapsUrl || business.placeId);
