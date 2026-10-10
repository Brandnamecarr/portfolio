import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import "./ProjectsPage.css";

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <p className="projects-page__eyebrow">Selected Work</p>
      <h1>Projects</h1>
      <div className="projects-page__grid">
        {projects.map((project) => {
          const cover = project.images?.[0];
          return (
            <Link key={project.slug} className="project-card" to={`/projects/${project.slug}`}>
              <div className="project-card__cover">
                {cover ? (
                  <img src={cover.src} alt={cover.alt} loading="lazy" />
                ) : (
                  <span className="project-card__placeholder" aria-hidden="true">
                    {project.title.charAt(0)}
                  </span>
                )}
              </div>
              <div className="project-card__body">
                <h2 className="project-card__title">{project.title}</h2>
                <p className="project-card__description">{project.description}</p>
              </div>
              <div className="project-card__tech">
                {project.tech.map((t) => (
                  <span key={t} className="project-card__tag">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
