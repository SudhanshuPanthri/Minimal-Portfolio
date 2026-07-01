"use client";

import { useState } from "react";
import { projects, type Project } from "@/lib/data";
import Reveal from "./Reveal";

function WorkItem({ project }: { project: Project }) {
  const [activeMedia, setActiveMedia] = useState(0);

  return (
    <Reveal as="article" className="work-item">
      <div className="work-header">
        <h3>{project.title}</h3>
        <span className="work-year">{project.year}</span>
      </div>

      <div className="work-body">
        <div className="work-left">
          <p className="work-role">{project.role}</p>
          <p>{project.description}</p>

          <div className="tag-row">
            {project.tags.map((tag) => (
              <span className="tag-pill" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className="work-buttons">
            {project.links.length > 0 ? (
              project.links.map((link) => (
                <a
                  key={link.label}
                  className="btn"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))
            ) : (
              <span className="btn btn-disabled">Private / proprietary</span>
            )}
          </div>
        </div>

        <div className="work-media">
          <div className="media-stage">
            {project.media.map((art, i) => (
              <div
                key={i}
                className={`art ${art} ${i === activeMedia ? "active" : ""}`}
              />
            ))}
          </div>
          <div className="media-thumbs">
            {project.media.map((art, i) => (
              <button
                key={i}
                className={`media-thumb ${i === activeMedia ? "active" : ""}`}
                onMouseEnter={() => setActiveMedia(i)}
                onFocus={() => setActiveMedia(i)}
                onClick={() => setActiveMedia(i)}
                aria-label={`View ${project.title} preview ${i + 1}`}
              >
                <div className={`art ${art}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Works() {
  return (
    <section className="section" id="work">
      <Reveal className="section-head">
        <h2>Selected Work</h2>
        <span className="section-index">01 — Projects</span>
      </Reveal>
      <div>
        {projects.map((project) => (
          <WorkItem key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
