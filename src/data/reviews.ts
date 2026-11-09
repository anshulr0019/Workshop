// Real reviews copied from the workshop's Google Maps listing.
// Shown when live Google reviews (VITE_LIVE_REVIEWS) are not switched on.
// Copy them exactly as written on Google — never edit, invent or leave out
// low ratings to make the page look better. Example entry:
// { name: "Rahul S.", rating: 5, text: "Very honest work…", time: "2 months ago" },
export interface SavedReview {
  name: string;
  rating: number;
  text: string;
  time?: string;
  reply?: string;
}

// Snapshot taken 8 Nov 2026 (signed-out Google Maps shows only these 5,
// in Google's "most relevant" order). Live sync replaces this once set up.
// Overall rating and number of reviews exactly as shown on Google Maps.
export const googleRating: { rating: number; count: number } | null = { rating: 4.9, count: 109 };

export const savedReviews: SavedReview[] = [
  { name: "Ishan Shrivastava", rating: 5, time: "Sep 2026", text: "I visited Manoj Automobile for the routine service of my vehicle, and I must say, Manoj Uncle is genuinely one of the nicest and most trustworthy people I’ve come across in this line of work.\n\nIt was a particularly sunny and hot day, and he went out of his way to order cold drinks for everyone there. It may seem like a small gesture, but the fact that someone thinks about the comfort of their customers like that says a lot about the person.\n\nComing to the actual service, everything was done on time and professionally. There were no unnecessary part replacements or attempts to add extra costs. The pricing was also very reasonable and transparent.\n\nIt’s honestly refreshing to find a mechanic who prioritises genuine advice, good service, and customer trust over simply making money.\n\nHighly recommended! Will definitely be coming back for future services. 👍" },
  { name: "Saima Sharif", rating: 5, time: "Aug 2026", text: "I recently got my Renault Triber repaired at Manoj Automobile and had a great experience. Manoj ji identified the actual problem within minutes, without resorting to unnecessary trial-and-error or replacing parts that didn't need changing. He is an extremely polite and honest person who only recommends repairs that are genuinely necessary. Unlike many workshops, he is not interested in upselling or making unnecessary money from customers. His charges were incredibly reasonable, almost 1/20th of what the authorised service centre had quoted for the same work. If you're looking for an honest, knowledgeable, and trustworthy person, I would highly recommend Manoj Automobile." },
  { name: "pankaj pgi", rating: 5, time: "2025", text: "Manoj automobile\n\nI come from Noida to get my car serviced. Manoj uncle ji  is a genuine person and I have been getting my three vehicles serviced by them for the last 4 years and I am very happy with uncle's nature, uncle's car servicing and uncle's behavior  And the cost is very low. They work at reasonable prices. There's no cheating involved with Uncle's work and\nyou get your service done at a company dealership, your expenses are very high. And even if you get it done outside (at local garages), you still have to pay more because they often change parts that don't need to be changed, which forces you to pay extra. But with 'Manoj service  'automobile it's not like that. Only the part that actually needs changing will be replaced; otherwise, it won't be. This is why your car's service and maintenance costs are lower.\" This is my personal experience which I am sharing with you." },
  { name: "Manish kumar", rating: 5, time: "Apr 2026", text: "I recently visited Manoj Automobile for car repair, and I had a very good experience. The staff is professional, friendly, and knowledgeable. They carefully checked my vehicle and explained the issue clearly before starting the work, which I really appreciated.\nThe service was quick and efficient, and the pricing was fair compared to other workshops. They used good quality parts and ensured everything was properly fixed before handing over the car.\nOverall, I am very satisfied with their service. I would definitely recommend them to anyone looking for reliable and honest automobile repair services." },
  { name: "Gopal singh", rating: 5, time: "Feb 2026", text: "I had a good experience with Manoj Automobile. The staff was polite, knowledgeable, and helpful throughout the process. The service was done on time, and they explained the work clearly before starting. Pricing was reasonable, and overall the experience was smooth. I would recommend Manoj Automobile for reliable vehicle service." },
];
