import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import "./ProjectDetailPage.css";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  // Coming from partway down the projects grid shouldn't land mid-page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="project-detail project-detail--missing">
        <h1>Project not found</h1>
        <Link to="/projects" className="project-detail__back">
          ← All projects
        </Link>
      </div>
    );
  }

  const paragraphs = project.details?.length ? project.details : [project.description];

  return (
    <article className="project-detail">
      <Link to="/projects" className="project-detail__back">
        ← All projects
      </Link>

      <header className="project-detail__header">
        <h1>{project.title}</h1>
        <div className="project-detail__tech">
          {project.tech.map((t) => (
            <span key={t} className="project-detail__tag">
              {t}
            </span>
          ))}
        </div>
        {(project.repo || project.demo) && (
          <div className="project-detail__actions">
            {project.repo && (
              <a className="project-detail__button" href={project.repo} target="_blank" rel="noreferrer">
                <svg className="project-detail__icon" aria-hidden="true">
                  <use href="/icons.svg#github-icon" />
                </svg>
                View on GitHub
              </a>
            )}
            {project.demo && (
              <a
                className="project-detail__button project-detail__button--primary"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
              >
                Live demo ↗
              </a>
            )}
          </div>
        )}
      </header>

      <section className="project-detail__body">
        {paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </section>

      {project.images && project.images.length > 0 && (
        <section className="project-detail__gallery">
          {project.images.map((image) => (
            <figure key={image.src} className="project-detail__figure">
              <img src={image.src} alt={image.alt} loading="lazy" />
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          ))}
        </section>
      )}
    </article>
  );
}
