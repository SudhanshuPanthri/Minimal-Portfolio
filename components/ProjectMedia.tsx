"use client";

import { useState } from "react";
import type { Project } from "@/lib/data";

const isImg = (s: string) => s.startsWith("/");

export default function ProjectMedia({ project }: { project: Project }) {
  const [active, setActive] = useState(0);

  return (
    <div className="project-media">
      <div className="media-stage media-stage-lg">
        {project.media.map((m, i) =>
          isImg(m) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={m}
              alt={`${project.title} — screen ${i + 1}`}
              className={`art media-img ${i === active ? "active" : ""}`}
              draggable={false}
            />
          ) : (
            <div
              key={i}
              className={`art ${m} ${i === active ? "active" : ""}`}
            />
          )
        )}
      </div>

      {project.media.length > 1 && (
        <div className="media-thumbs">
          {project.media.map((m, i) => (
            <button
              key={i}
              className={`media-thumb ${i === active ? "active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={`View ${project.title} preview ${i + 1}`}
            >
              {isImg(m) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m}
                  alt=""
                  className="art media-img"
                  draggable={false}
                />
              ) : (
                <div className={`art ${m}`} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
