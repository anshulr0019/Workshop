import test from "node:test";
import assert from "node:assert/strict";
import { getReviews } from "../server/google-reviews.mjs";
import handler from "../api/reviews.mjs";
const env = {
  GOOGLE_PLACES_API_KEY: "test-only-key",
  GOOGLE_PLACE_ID: "test-place",
};
test("unconfigured reviews fail without making a paid API request", async () => {
  const result = await getReviews({}, () => {
    throw new Error("Must not be called");
  });
  assert.equal(result.status, 503);
});
test("real ratings and author attribution are preserved, including low ratings", async () => {
  const result = await getReviews(env, async (url, options) => {
    assert.ok(url.includes("/test-place?"));
    assert.equal(options.headers["X-Goog-Api-Key"], env.GOOGLE_PLACES_API_KEY);
    assert.ok(options.headers["X-Goog-FieldMask"].includes("attributions"));
    return {
      ok: true,
      json: async () => ({
        rating: 3.7,
        userRatingCount: 12,
        googleMapsUri: "https://maps.google.com/test",
        reviews: [
          {
            rating: 2,
            authorAttribution: {
              displayName: "Test author",
              uri: "https://maps.google.com/author",
              photoUri: "https://example.com/photo",
            },
            originalText: { text: "Original feedback" },
            text: { text: "Translated feedback" },
            relativePublishTimeDescription: "a week ago",
            googleMapsUri: "https://maps.google.com/review",
          },
        ],
        attributions: [
          { provider: "Provider", providerUri: "https://example.com" },
        ],
      }),
    };
  });
  assert.equal(result.status, 200);
  assert.equal(result.body.rating, 3.7);
  assert.equal(result.body.count, 12);
  assert.equal(result.body.reviews[0].rating, 2);
  assert.equal(result.body.reviews[0].text, "Original feedback");
  assert.equal(result.body.reviews[0].url, "https://maps.google.com/review");
  assert.equal(result.body.attributions[0].name, "Provider");
  assert.ok(!JSON.stringify(result.body).includes(env.GOOGLE_PLACES_API_KEY));
});
test("empty review lists and textless ratings are supported", async () => {
  const result = await getReviews(env, async () => ({
    ok: true,
    json: async () => ({ googleMapsUri: "https://maps.google.com/test" }),
  }));
  assert.deepEqual(result.body.reviews, []);
});
test("upstream failures and timeouts do not leak private configuration", async () => {
  for (const fetcher of [
    async () => ({ ok: false }),
    async () => {
      throw new Error(env.GOOGLE_PLACES_API_KEY);
    },
  ]) {
    const result = await getReviews(env, fetcher);
    assert.equal(result.status, 502);
    assert.ok(!JSON.stringify(result).includes(env.GOOGLE_PLACES_API_KEY));
  }
});
test("endpoint rejects mutations and disallows caching", async () => {
  const headers = {};
  const res = {
    setHeader(k, v) {
      headers[k] = v;
    },
    status(s) {
      this.code = s;
      return this;
    },
    json(b) {
      this.body = b;
      return this;
    },
  };
  await handler({ method: "POST" }, res);
  assert.equal(res.code, 405);
  assert.equal(headers.Allow, "GET");
  assert.equal(headers["Cache-Control"], "private, no-store");
});

import { getBusinessReviews, getAllReviews, originalComment } from "../server/google-reviews.mjs";
const gbp = {
  GBP_CLIENT_ID: "cid", GBP_CLIENT_SECRET: "test-only-secret",
  GBP_REFRESH_TOKEN: "test-only-refresh", GBP_LOCATION: "accounts/1/locations/2",
  GOOGLE_MAPS_URL: "https://maps.google.com/?cid=1",
};
const ok = (body) => ({ ok: true, json: async () => body });
function businessFetcher(pages, calls = []) {
  return async (url, init = {}) => {
    calls.push({ url: String(url), init });
    if (String(url).startsWith("https://oauth2.googleapis.com/token")) {
      assert.equal(new URLSearchParams(init.body).get("refresh_token"), gbp.GBP_REFRESH_TOKEN);
      return ok({ access_token: "access-1" });
    }
    assert.equal(init.headers.Authorization, "Bearer access-1");
    const token = new URL(url).searchParams.get("pageToken") || "0";
    return ok(pages[Number(token)]);
  };
}
test("business reviews: every page is read, duplicates dropped, originals kept", async () => {
  const calls = [];
  const result = await getBusinessReviews(gbp, businessFetcher([
    { averageRating: 4.86, totalReviewCount: 3, nextPageToken: "1", reviews: [
      { reviewId: "a", reviewer: { displayName: "Asha", profilePhotoUrl: "https://lh3.googleusercontent.com/a" }, starRating: "FIVE", comment: "Bahut accha kaam\n\n(Translated by Google)\nVery good work", createTime: "2026-09-10T10:00:00Z", reviewReply: { comment: "Thank you!" } },
      { reviewId: "b", reviewer: { isAnonymous: true, displayName: "x" }, starRating: "TWO", createTime: "2026-01-02T10:00:00Z" },
    ] },
    { reviews: [
      { reviewId: "b", reviewer: { displayName: "dup" }, starRating: "TWO" },
      { reviewId: "c", reviewer: { displayName: "Ravi" }, starRating: "FOUR", comment: "(Translated by Google) Good\n\n(Original)\nबढ़िया" },
    ] },
  ], calls));
  assert.equal(result.status, 200);
  assert.equal(result.body.source, "business");
  assert.equal(result.body.rating, 4.9);
  assert.equal(result.body.count, 3);
  assert.deepEqual(result.body.reviews.map((r) => r.rating), [5, 2, 4]); // low ratings kept
  assert.equal(result.body.reviews[0].text, "Bahut accha kaam");
  assert.equal(result.body.reviews[0].reply, "Thank you!");
  assert.match(result.body.reviews[0].time, /Sep\w* 2026/);
  assert.equal(result.body.reviews[1].name, "A Google user");
  assert.equal(result.body.reviews[1].photo, "");
  assert.equal(result.body.reviews[2].text, "बढ़िया");
  assert.ok(calls.some((c) => c.url.includes("/v4/accounts/1/locations/2/reviews?") && c.url.includes("pageSize=50")));
  const text = JSON.stringify(result.body);
  for (const secret of [gbp.GBP_CLIENT_SECRET, gbp.GBP_REFRESH_TOKEN, "access-1"]) assert.ok(!text.includes(secret));
});
test("business reviews: failures do not leak secrets and fall back to Places", async () => {
  const failing = async (url) => {
    if (String(url).includes("oauth2")) return { ok: false, json: async () => ({ error: gbp.GBP_REFRESH_TOKEN }) };
    return ok({ googleMapsUri: "https://maps.google.com/test", reviews: [] });
  };
  const alone = await getBusinessReviews(gbp, failing);
  assert.equal(alone.status, 502);
  assert.ok(!JSON.stringify(alone).includes(gbp.GBP_REFRESH_TOKEN));
  const fallback = await getAllReviews({ ...gbp, ...env }, failing);
  assert.equal(fallback.status, 200);
  assert.equal(fallback.body.source, "places");
});
test("business reviews are edge-cached for an hour; Places reviews never are", async () => {
  const run = async (e, fetcher) => {
    const headers = {};
    const res = { setHeader(k, v) { headers[k] = v; }, status(s) { this.code = s; return this; }, json(b) { this.body = b; return this; } };
    await handler({ method: "GET" }, res, e, fetcher);
    return { headers, res };
  };
  const biz = await run(gbp, businessFetcher([{ reviews: [] }]));
  assert.equal(biz.res.code, 200);
  assert.match(biz.headers["Cache-Control"], /s-maxage=3600/);
  const places = await run(env, async () => ok({ googleMapsUri: "https://maps.google.com/test" }));
  assert.equal(places.headers["Cache-Control"], "private, no-store");
});
test("translation markers are stripped either way round", () => {
  assert.equal(originalComment("Hello\n\n(Translated by Google)\nNamaste"), "Hello");
  assert.equal(originalComment("(Translated by Google) Hi\n\n(Original)\nनमस्ते"), "नमस्ते");
  assert.equal(originalComment("Plain"), "Plain");
});
