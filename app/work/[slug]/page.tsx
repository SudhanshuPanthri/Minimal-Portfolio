import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { profile, projects } from "@/lib/data";
import ProjectMedia from "@/components/ProjectMedia";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return { title: `Project — ${profile.name}` };
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.id === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const total = String(projects.length).padStart(2, "0");
  const num = String(index + 1).padStart(2, "0");

  return (
    <main className="project-page">
      <div className="project-topbar">
        <Link href="/#work" className="back-link">
          ← All work
        </Link>
        <Link href="/" className="project-brand">
          {profile.name}
        </Link>
      </div>

      <header className="project-hero">
        <span className="project-index">
          Project {num} / {total}
        </span>
        <h1>{project.title}</h1>
        <div className="project-meta">
          <span>{project.role}</span>
          <span>{project.year}</span>
        </div>
      </header>

      <ProjectMedia project={project} />

      <section className="project-detail">
        <div className="project-overview">
          <h2>Overview</h2>
          <p>{project.description}</p>
          <div className="work-buttons">
            {project.links.length > 0 ? (
              project.links.map((link, i) => (
                <a
                  key={link.label}
                  className={i === 0 ? "btn" : "btn btn-outline"}
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

        <aside className="project-side">
          <div className="project-side-block">
            <h3>Stack</h3>
            <div className="tag-row">
              {project.tags.map((tag) => (
                <span className="tag-pill" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="project-side-block">
            <h3>Role</h3>
            <p>{project.role}</p>
          </div>
          <div className="project-side-block">
            <h3>Year</h3>
            <p>{project.year}</p>
          </div>
        </aside>
      </section>

      <Link href={`/work/${next.id}`} className="project-next">
        <span>Next project</span>
        <span>{next.title} →</span>
      </Link>
    </main>
  );
}
