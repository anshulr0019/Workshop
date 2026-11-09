import { getAllReviews } from "../server/google-reviews.mjs";
// Vercel Node function. Other hosts can adapt this same server-only helper.
export default async function handler(req, res, env = process.env, fetcher = fetch) {
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }
  const { status, body } = await getAllReviews(env, fetcher);
  // The owner's own Business Profile reviews may be shared from Vercel's edge for an
  // hour, so visitors don't each trigger Google calls. Places content stays uncached
  // as Google's Places terms require.
  if (status === 200 && body.source === "business")
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400");
  return res.status(status).json(body);
}
