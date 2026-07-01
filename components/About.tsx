import { aboutParagraphs, experience } from "@/lib/data";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section className="section" id="about">
      <Reveal className="section-head">
        <h2>About</h2>
        <span className="section-index">03 — Profile</span>
      </Reveal>

      <div className="about">
        <Reveal className="about-text">
          {aboutParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <Reveal className="experience" delay={120}>
          <div className="exp-label">Experience & Education</div>
          {experience.map((item) => (
            <div className="exp-item" key={`${item.role}-${item.org}`}>
              <div>
                <div className="exp-role">{item.role}</div>
                <div className="exp-org">{item.org}</div>
              </div>
              <div className="exp-period">{item.period}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
