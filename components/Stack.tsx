import { stackGroups } from "@/lib/data";
import Reveal from "./Reveal";

export default function Stack() {
  return (
    <section className="section" id="stack">
      <Reveal className="section-head">
        <h2>The Stack</h2>
        <span className="section-index">02 — Capabilities</span>
      </Reveal>

      <div className="stack-grid">
        {stackGroups.map((group, i) => (
          <Reveal as="article" className="stack-card" key={group.title} delay={i * 80}>
            <span className="stack-index" aria-hidden="true">
              {group.index}
            </span>
            <h3>{group.title}</h3>
            <p className="stack-blurb">{group.blurb}</p>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
