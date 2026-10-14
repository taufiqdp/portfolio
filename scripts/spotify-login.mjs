// One-time Spotify login, so the site can read the song you're playing right now.
//
// 1. In your Spotify app's settings (developer.spotify.com/dashboard), add this Redirect URI:
//      http://127.0.0.1:8888/callback
// 2. Run `pnpm spotify:login`, open the link it prints and approve.
//    The refresh token is saved to .env as SPOTIFY_REFRESH_TOKEN (never printed).
// 3. Add SPOTIFY_REFRESH_TOKEN to Vercel's environment variables too.
import { randomBytes } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";

const REDIRECT_URI = "http://127.0.0.1:8888/callback";
const id = process.env.SPOTIFY_CLIENT_ID;
const secret = process.env.SPOTIFY_CLIENT_SECRET;
if (!id || !secret) {
  console.error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env.");
  process.exit(1);
}

const state = randomBytes(16).toString("hex");
const loginUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    response_type: "code",
    client_id: id,
    scope: "user-read-currently-playing", // read-only: the song you're playing now
    redirect_uri: REDIRECT_URI,
    state,
  });

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", REDIRECT_URI);
  if (url.pathname !== "/callback") return res.writeHead(404).end();

  const code = url.searchParams.get("code");
  if (url.searchParams.get("state") !== state || !code) {
    res.end(`Login didn't complete (${url.searchParams.get("error") ?? "state mismatch"}). Run the script again.`);
    return;
  }

  const token = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: REDIRECT_URI }),
  }).then((r) => r.json());

  if (!token.refresh_token) {
    const reason = token.error_description ?? token.error ?? "no refresh token returned";
    res.end(`Spotify refused the login: ${reason}`);
    console.error(`Spotify refused the login: ${reason}`);
    process.exitCode = 1;
    return server.close();
  }

  // Replace any earlier token, keep everything else in .env as it is.
  let env = readFileSync(".env", "utf8").replace(/^SPOTIFY_REFRESH_TOKEN=.*(\r?\n)?/m, "");
  if (env && !env.endsWith("\n")) env += "\n";
  writeFileSync(".env", `${env}SPOTIFY_REFRESH_TOKEN=${token.refresh_token}\n`);

  res.end("Done. Your Spotify login is saved; you can close this tab.");
  console.log("Saved SPOTIFY_REFRESH_TOKEN to .env. Add it to Vercel's environment variables too.");
  server.close();
});

server.listen(8888, "127.0.0.1", () => {
  console.log(`Open this link to log in to Spotify:\n${loginUrl}`);
});

// Give up after 10 minutes so the script doesn't hang forever.
setTimeout(() => {
  console.error("Timed out waiting for the Spotify login. Run the script again.");
  process.exit(1);
}, 10 * 60_000).unref();
