// One-time helper: sign in with the Google account that owns the Business Profile
// and print the GBP_REFRESH_TOKEN and GBP_LOCATION values for Vercel.
//   GBP_CLIENT_ID=... GBP_CLIENT_SECRET=... node scripts/google-business-setup.mjs
// Uses a "Desktop app" OAuth client, so Google accepts the loopback redirect below.
import { createServer } from "node:http";
import { randomBytes } from "node:crypto";

const { GBP_CLIENT_ID: id, GBP_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) {
  console.error("Set GBP_CLIENT_ID and GBP_CLIENT_SECRET first (see README).");
  process.exit(1);
}
const PORT = 8765;
const redirect = `http://127.0.0.1:${PORT}/callback`;
const state = randomBytes(16).toString("hex");
const consent = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
  client_id: id,
  redirect_uri: redirect,
  response_type: "code",
  scope: "https://www.googleapis.com/auth/business.manage",
  access_type: "offline",
  prompt: "consent",
  state,
})}`;

const json = async (url, init) => {
  const r = await fetch(url, init);
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`${r.status} from ${new URL(url).host}: ${body.error?.message || body.error_description || JSON.stringify(body)}`);
  return body;
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, redirect);
  if (url.pathname !== "/callback") return res.writeHead(404).end();
  if (url.searchParams.get("state") !== state || !url.searchParams.get("code")) {
    res.writeHead(400).end("Sign-in was cancelled or did not match. Run the script again.");
    return;
  }
  res.writeHead(200, { "Content-Type": "text/plain" }).end("Signed in. You can close this tab and return to the terminal.");
  server.close();
  try {
    const token = await json("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ code: url.searchParams.get("code"), client_id: id, client_secret: secret, redirect_uri: redirect, grant_type: "authorization_code" }),
    });
    if (!token.refresh_token) throw new Error("Google did not return a refresh token. Remove the app's access at myaccount.google.com/permissions and run again.");
    const auth = { headers: { Authorization: `Bearer ${token.access_token}` } };
    const { accounts = [] } = await json("https://mybusinessaccountmanagement.googleapis.com/v1/accounts", auth);
    const found = [];
    for (const account of accounts) {
      const { locations = [] } = await json(`https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations?readMask=name,title,storefrontAddress&pageSize=100`, auth);
      for (const l of locations) found.push({ value: `${account.name}/${l.name}`, title: l.title, area: l.storefrontAddress?.addressLines?.join(", ") || "" });
    }
    console.log("\nAdd these to Vercel → Project → Settings → Environment Variables (Production):\n");
    console.log(`GBP_REFRESH_TOKEN=${token.refresh_token}`);
    if (!found.length) console.log("\nNo Business Profile locations found for this Google account. Sign in with the account that manages the listing.");
    else if (found.length === 1) console.log(`GBP_LOCATION=${found[0].value}    # ${found[0].title}`);
    else {
      console.log("\nGBP_LOCATION — pick the workshop:");
      for (const f of found) console.log(`  GBP_LOCATION=${f.value}    # ${f.title} ${f.area}`);
    }
    console.log("\nKeep the refresh token secret: it can manage the Business Profile.");
  } catch (error) {
    console.error(`\nSetup failed: ${error.message}`);
    if (/429|quota|has not been used|disabled/i.test(error.message))
      console.error("Business Profile API access is probably not approved/enabled yet for this Google Cloud project.");
    process.exitCode = 1;
  }
});
server.listen(PORT, "127.0.0.1", () => {
  console.log("Open this link and sign in with the Google account that manages Manoj Automobile on Google Maps:\n");
  console.log(consent);
});
