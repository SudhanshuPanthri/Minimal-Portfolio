import Link from "next/link";
import { projects } from "@/lib/data";
import Reveal from "./Reveal";

const isImg = (s: string) => s.startsWith("/");

export default function Works() {
  return (
    <section className="section" id="work">
      <Reveal className="section-head">
        <h2>Selected Work</h2>
        <span className="section-index">01 — Projects</span>
      </Reveal>

      <div className="work-list">
        {projects.map((project) => (
          <Reveal as="article" className="work-card" key={project.id}>
            <Link href={`/work/${project.id}`} className="work-card-link">
              <div className="work-card-body">
                <div className="work-header">
                  <h3>{project.title}</h3>
                  <span className="work-year">{project.year}</span>
                </div>
                <p className="work-role">{project.role}</p>
                <p className="work-card-desc">{project.description}</p>
                <div className="tag-row">
                  {project.tags.slice(0, 5).map((tag) => (
                    <span className="tag-pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="work-card-cta">View project →</span>
              </div>

              <div className={`work-card-media ${project.orientation === "portrait" ? "portrait" : ""}`}>
                {isImg(project.art) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.art}
                    alt={`${project.title} preview`}
                    className="art media-img"
                    draggable={false}
                  />
                ) : (
                  <div className={`art ${project.art}`} />
                )}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
