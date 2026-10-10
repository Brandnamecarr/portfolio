import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import "./HomePage.css";

// TODO: replace with your real summary and focus areas
const summary = [
  "I build reliable, well-crafted software — from backend systems to polished frontends.",
  "Currently exploring applied AI tooling: agents, LLM-backed workflows, and the infrastructure that makes them dependable.",
];

const focusAreas = [
  { title: "Backend Systems", description: "APIs, data pipelines, and services built to be observable and easy to operate." },
  { title: "Frontend", description: "Fast, accessible interfaces with React and TypeScript." },
  { title: "Applied AI", description: "Integrating LLMs into real products with sensible guardrails." },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-page__intro">
        <img className="home-page__hero" src={hero} alt="" aria-hidden="true" />
        <p className="home-page__eyebrow">Software Engineer</p>
        <h1>Brandon Carr</h1>
        {summary.map((paragraph) => (
          <p key={paragraph} className="home-page__summary">
            {paragraph}
          </p>
        ))}
        <div className="home-page__actions">
          <Link to="/projects" className="home-page__button home-page__button--primary">
            View projects
          </Link>
          <Link to="/contact" className="home-page__button">
            Contact &amp; resume
          </Link>
        </div>
      </section>

      <section className="home-page__focus">
        {focusAreas.map((area) => (
          <div key={area.title} className="home-page__card">
            <h2 className="home-page__card-title">{area.title}</h2>
            <p className="home-page__card-description">{area.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
