import { getDb } from "../../../db";
const topics = ["Physics", "Psychology", "Space", "Everyday life", "Something else"];
const headers = { "Cache-Control": "no-store" };
// GET returns counts only. Visitor names and questions stay private.
export async function GET() {
  try {
    const db = getDb();
    const total = await db.prepare("SELECT COUNT(*) AS total FROM questions").first<{
      total: number;
    }>();
    const grouped = await db.prepare("SELECT topic, COUNT(*) AS count FROM questions GROUP BY topic ORDER BY count DESC, topic ASC").all();
    return Response.json({ total: total?.total ?? 0, topics: grouped.results }, { headers });
  }
  catch (error) {
    console.error("Question count failed", error);
    return Response.json({ error: "The question counter is temporarily unavailable." }, { status: 503, headers });
  }
}
// POST validates untrusted data again on the server before writing to D1.
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json({ error: "Please submit using this website." }, { status: 403, headers });
  if (!request.headers.get("content-type")?.includes("application/json"))
    return Response.json({ error: "Send a JSON request." }, { status: 415, headers });
  const raw = await request.text();
  if (raw.length > 6000)
    return Response.json({ error: "Submission is too long." }, { status: 413, headers });
  let data: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error();
    data = parsed;
  }
  catch {
    return Response.json({ error: "Invalid request data." }, { status: 400, headers });
  }
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const topic = typeof data.topic === "string" ? data.topic : "";
  const question = typeof data.question === "string" ? data.question.trim() : "";
  if (data.website)
    return Response.json({ error: "Submission could not be accepted." }, { status: 400, headers });
  if (name.length < 2 || name.length > 60 || question.length < 10 || question.length > 800 || !topics.includes(topic) || data.consent !== "yes")
    return Response.json({ error: "Use a 2–60 character name, choose a topic, write a 10–800 character question, and accept the storage notice." }, { status: 400, headers });
  try {
    const id = crypto.randomUUID();
    await getDb().prepare("INSERT INTO questions (id, name, topic, question, created_at) VALUES (?, ?, ?, ?, ?)").bind(id, name, topic, question, new Date().toISOString()).run();
    return Response.json({ id, saved: true }, { status: 201, headers });
  }
  catch (error) {
    console.error("Question save failed", error);
    return Response.json({ error: "Your question was not saved. Please try again shortly." }, { status: 503, headers });
  }
}
