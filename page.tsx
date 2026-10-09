"use client";
import { useState } from "react";
import Link from "next/link";
import { videos } from "../../lib/videos";
export default function Explore() {
  const [topic, setTopic] = useState("All");
  const visible = videos.filter(v => topic === "All" || v.topic === topic);
  return <section className="section page">
    <p className="eyebrow">FOLLOW YOUR CURIOSITY</p>
    <h1>The rabbit hole starts here.</h1>
    <p className="intro">A small starting list of Vsauce videos. Pick a topic and see where it takes you.</p>
    <div className="filters" aria-label="Filter videos by topic">{["All", "Physics", "Psychology"].map(t => <button key={t} type="button" aria-pressed={topic === t} onClick={() => setTopic(t)}>{t}</button>)}</div>
    <p className="small" aria-live="polite">{visible.length} {visible.length === 1 ? "video" : "videos"} in this selection</p>
    <div className="cards">{visible.map((v, i) => <article className="card" key={v.id}>
      <span className="card-number">0{i + 1}</span>
      <span className="tag">{v.topic}</span>
      <h2>{v.title}</h2>
      <p>{v.description}</p>
      <a className="button secondary" href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer">Watch on YouTube</a>
    </article>)}</div>
    <div className="callout">
      <h2>Your question could be the next rabbit hole.</h2>
      <p>Have something you can’t stop wondering about? Add it to the jar.</p>
      <Link href="/question-jar" className="button">Open the Question Jar</Link>
    </div>
    <p className="small">Video titles and links are from the official Vsauce YouTube channel. This is a manually curated fan selection, not a live feed.</p>
  </section>;
}
