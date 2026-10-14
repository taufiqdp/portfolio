import { readFile } from "node:fs/promises";
import path from "node:path";

// Serves the repo's DESIGN.md at /design.md, read once at build time so it always matches.
export const dynamic = "force-static";

export async function GET() {
  const body = await readFile(path.join(process.cwd(), "DESIGN.md"), "utf8");
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
