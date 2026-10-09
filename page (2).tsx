"use client";
import { useEffect, useState, type FormEvent } from "react";
type Stats = {
  total: number;
  topics: {
    topic: string;
    count: number;
  }[];
};
export default function QuestionJar() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsError, setStatsError] = useState(false);
  async function loadStats() {
    try {
      const response = await fetch("/api/questions");
      if (!response.ok)
        throw new Error();
      setStats(await response.json());
      setStatsError(false);
    }
    catch {
      setStatsError(true);
    }
  }
  useEffect(() => { void loadStats(); }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    setSuccess(false);
    setMessage("");

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result = await response.json() as { error?: string; id: string };
      if (!response.ok) {
        throw new Error(result.error || "Could not save your question. Please try again.");
      }
      setSuccess(true);
      setMessage(`Your question is in the jar! Reference: ${result.id.slice(0, 8)}. Thanks for being curious.`);
      form.reset();
      void loadStats();
    }
    catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not connect. Your entries are still here; please try again.");
    }
    finally {
      setBusy(false);
    }
  }
  return <section className="section page">
    <p className="eyebrow">NO QUESTION TOO STRANGE</p>
    <h1>The Question Jar.</h1>
    <p className="intro">What’s something you’ve always wondered about?<br />Leave it here. Big, small, or slightly ridiculous.</p>
    <div className="form-grid">
      <form onSubmit={submit} className="question-form">
        <h2>Add your curiosity</h2>
        <label htmlFor="name">Your name or nickname</label>
        <input id="name" name="name" required minLength={2} maxLength={60} autoComplete="nickname" placeholder="What should we call you?" />
        <label htmlFor="topic">Pick a topic</label>
        <select id="topic" name="topic" required>
          <option value="">Choose a topic</option>
          <option>Physics</option>
          <option>Psychology</option>
          <option>Space</option>
          <option>Everyday life</option>
          <option>Something else</option>
        </select>
        <label htmlFor="question">Your question</label>
        <textarea id="question" name="question" required minLength={10} maxLength={800} rows={5} placeholder="Why does time feel faster as we get older?" />
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this empty</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="consent">
          <input type="checkbox" name="consent" required value="yes" />
          <span>I agree to save my nickname, topic, and question for this student project.</span>
        </label>
        <p className="small">Submissions go to the project owner, not to Vsauce. Please don’t include contact details or other private information. No reply is promised.</p>
        <button className="button" disabled={busy} type="submit">{busy ? "Saving your question…" : "Drop it in the jar"}</button>
        <div className={success ? "feedback success" : "feedback"} role="status" aria-live="polite">{message}</div>
      </form>
      <aside className="jar-aside">
        <div className="stats">
          <span className="eyebrow">OUR LITTLE CURIOSITY COUNTER</span>
          <strong>{stats ? stats.total : "—"}</strong>
          <p>questions saved in the jar</p>{statsError ? <p role="status">The counter is unavailable right now. <button className="text-button" onClick={() => void loadStats()}>Try again</button>
          </p> : !stats ? <p className="small">Loading the jar…</p> : stats.total === 0 ? <p className="small">It’s quiet here. You can add the first one.</p> : <ul className="topic-counts">{stats.topics.map(t => <li key={t.topic}>
            <span>{t.topic}</span>
            <b>{t.count}</b>
          </li>)}</ul>}<p className="small">Live counts from saved submissions. Names and questions are not shown publicly.</p>
        </div>
        <div className="aside-note">
          <h2>Stuck for a question?</h2>
          <p>Think of something you do every day, then ask why it works that way.</p>
          <p>Why do songs get stuck in our heads? Why is the sky dark at night?</p>
        </div>
      </aside>
    </div>
  </section>;
}
