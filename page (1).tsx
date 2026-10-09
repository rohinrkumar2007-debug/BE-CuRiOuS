import Link from "next/link";
export default function Home() {
  return <>
    <section className="hero">
      <div>
        <p className="eyebrow">A LITTLE FAN PROJECT ABOUT VSAUCE</p>
        <h1>Simple questions.<br />
          <span>Unexpected answers.</span>
        </h1>
        <p className="intro">Ever opened a video for one answer and left with ten more questions? That’s the part of Vsauce I like most.</p>
        <p>Michael Stevens makes science, our minds, and everyday things feel worth a second look. This is my small space to share that curiosity.</p>
        <div className="actions">
          <Link className="button" href="/explore">Find something interesting</Link>
          <Link className="textlink" href="/question-jar">Leave a question</Link>
        </div>
      </div>
      <aside className="question-note">
        <span className="eyebrow">TODAY’S RABBIT HOLE</span>
        <p>What if everyone<br />jumped at once?</p>
        <span>One very big question.<br />One very small planet-shaking effect.</span>
        <a href="https://www.youtube.com/watch?v=jHbyQ_AQP8c" target="_blank" rel="noreferrer">Watch Michael explore it</a>
      </aside>
    </section>
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">START HERE</p>
          <h2>One question is all it takes.</h2>
        </div>
        <Link className="textlink" href="/explore">Explore the videos</Link>
      </div>
      <article className="featured">
        <div className="video-title-panel">
          <span className="eyebrow">VSAUCE · A STARTING POINT</span>
          <p>One planet.<br />Everyone.<br />One jump.</p>
          <a href="https://www.youtube.com/watch?v=jHbyQ_AQP8c" target="_blank" rel="noreferrer">Watch on YouTube</a>
        </div>
        <div>
          <span className="tag">PHYSICS</span>
          <h3>What If Everyone JUMPED At Once?</h3>
          <p>A question that sounds silly at first, until you start thinking about the size of Earth and the physics of a jump.</p>
          <p className="small">A good starting point if you’re new to the channel.</p>
        </div>
      </article>
    </section>
    <section className="why section">
      <div>
        <p className="eyebrow">WHY VSAUCE?</p>
        <h2>It makes “I don’t know”<br />a good place to start.</h2>
      </div>
      <div>
        <p>I like that the videos don’t stop at the obvious answer. A normal question can turn into a discussion about physics, psychology, or how we see the world.</p>
        <p>That’s what this project is about: finding interesting questions, following the sources, and learning something along the way.</p>
        <Link className="textlink" href="/question-jar">What have you always wondered?</Link>
      </div>
    </section>
  </>;
}
