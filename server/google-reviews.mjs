// This module runs only on a server. Never prefix the API key with VITE_.
export async function getReviews(env = process.env, fetcher = fetch) {
  const key = env.GOOGLE_PLACES_API_KEY;
  const placeId = env.GOOGLE_PLACE_ID;
  if (!key || !placeId)
    return { status: 503, body: { error: "Reviews are not configured." } };
  try {
    const response = await fetcher(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask":
            "rating,userRatingCount,reviews,googleMapsUri,attributions",
        },
        signal: AbortSignal.timeout(6500),
      },
    );
    if (!response.ok) throw new Error("Upstream unavailable");
    const place = await response.json();
    if (!place.googleMapsUri) throw new Error("Invalid place");
    const reviews = (place.reviews || []).map((r) => ({
      name: r.authorAttribution?.displayName || "Google Maps reviewer",
      author: r.authorAttribution?.uri || "",
      photo: r.authorAttribution?.photoUri || "",
      rating: typeof r.rating === "number" ? r.rating : 0,
      text: r.originalText?.text || r.text?.text || "",
      time: r.relativePublishTimeDescription || "",
      url: r.googleMapsUri || place.googleMapsUri,
    }));
    return {
      status: 200,
      body: {
        rating: place.rating,
        count: place.userRatingCount,
        url: place.googleMapsUri,
        reviews,
        attributions: (place.attributions || []).map((a) => ({
          name: a.provider,
          url: a.providerUri,
        })),
      },
    };
  } catch {
    // Do not expose Google responses, keys or configuration to the browser.
    return {
      status: 502,
      body: { error: "Google reviews are temporarily unavailable." },
    };
  }
}

// ---- Google Business Profile: every review on the owner's verified listing ----
// Needs the owner's OAuth refresh token (scripts/google-business-setup.mjs) and
// approved Business Profile API access. Server only; nothing here reaches the browser.
const STARS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
const MAX_PAGES = 20; // 50 per page; far beyond a neighbourhood workshop's review count

// Google appends machine translations to comments; always show the reviewer's own words.
export function originalComment(text = "") {
  const original = text.split(/\n*\(Original\)\n/);
  if (original.length > 1) return original.at(-1).trim();
  return text.split(/\n*\(Translated by Google\)/)[0].trim();
}

const monthYear = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-IN", { month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
};

export function businessConfigured(env = process.env) {
  return Boolean(
    env.GBP_CLIENT_ID && env.GBP_CLIENT_SECRET && env.GBP_REFRESH_TOKEN &&
      /^accounts\/\d+\/locations\/\d+$/.test(env.GBP_LOCATION || ""),
  );
}

export async function getBusinessReviews(env = process.env, fetcher = fetch) {
  if (!businessConfigured(env))
    return { status: 503, body: { error: "Reviews are not configured." } };
  try {
    const tokenResponse = await fetcher("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: env.GBP_CLIENT_ID,
        client_secret: env.GBP_CLIENT_SECRET,
        refresh_token: env.GBP_REFRESH_TOKEN,
        grant_type: "refresh_token",
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!tokenResponse.ok) throw new Error("Token refresh failed");
    const { access_token } = await tokenResponse.json();
    if (!access_token) throw new Error("No access token");
    const seen = new Set();
    const reviews = [];
    let rating, count, pageToken = "";
    for (let page = 0; page < MAX_PAGES; page++) {
      const q = new URLSearchParams({ pageSize: "50", orderBy: "updateTime desc" });
      if (pageToken) q.set("pageToken", pageToken);
      const response = await fetcher(
        `https://mybusiness.googleapis.com/v4/${env.GBP_LOCATION}/reviews?${q}`,
        { headers: { Authorization: `Bearer ${access_token}` }, signal: AbortSignal.timeout(6500) },
      );
      if (!response.ok) throw new Error("Upstream unavailable");
      const data = await response.json();
      if (page === 0) {
        rating = data.averageRating;
        count = data.totalReviewCount;
      }
      for (const r of data.reviews || []) {
        // Google documents that later pages can repeat or skip reviews; never show one twice.
        if (!r.reviewId || seen.has(r.reviewId)) continue;
        seen.add(r.reviewId);
        reviews.push({
          name: r.reviewer?.isAnonymous ? "A Google user" : r.reviewer?.displayName || "A Google user",
          author: "",
          photo: r.reviewer?.isAnonymous ? "" : r.reviewer?.profilePhotoUrl || "",
          rating: STARS[r.starRating] || 0,
          text: originalComment(r.comment),
          time: monthYear(r.createTime),
          url: "",
          reply: r.reviewReply?.comment ? originalComment(r.reviewReply.comment) : "",
        });
      }
      pageToken = data.nextPageToken || "";
      if (!pageToken) break;
    }
    return {
      status: 200,
      body: {
        source: "business",
        rating: typeof rating === "number" ? Math.round(rating * 10) / 10 : undefined,
        count: typeof count === "number" ? count : reviews.length,
        url: env.GOOGLE_MAPS_URL || "",
        reviews,
      },
    };
  } catch {
    return { status: 502, body: { error: "Google reviews are temporarily unavailable." } };
  }
}

// Prefer the complete Business Profile list; fall back to the 5-review Places API.
export async function getAllReviews(env = process.env, fetcher = fetch) {
  if (businessConfigured(env)) {
    const result = await getBusinessReviews(env, fetcher);
    if (result.status === 200 || !env.GOOGLE_PLACES_API_KEY) return result;
  }
  const result = await getReviews(env, fetcher);
  if (result.status === 200) result.body.source = "places";
  return result;
}
