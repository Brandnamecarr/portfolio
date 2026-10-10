import { useState } from "react";
import "./ContactPage.css";

// TODO: drop your resume at public/resume.pdf and your headshot at public/headshot.jpg
const EMAIL = "brandnamecarr@hotmail.com";
const GITHUB_URL = "https://github.com/brandnamecarr";
const LINKEDIN_URL = "https://linkedin.com/in/brandnamecarr";
const RESUME_URL = "/resume.pdf";
const HEADSHOT_URL = "/headshot.jpg";

const links = [
  { label: "Email", href: `mailto:${EMAIL}`, icon: "social-icon", external: false, dark: false },
  { label: "GitHub", href: GITHUB_URL, icon: "github-icon", external: true, dark: true },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: "documentation-icon", external: true, dark: false },
];

export default function ContactPage() {
  // Falls back to the initials placeholder until public/headshot.jpg exists.
  const [headshotMissing, setHeadshotMissing] = useState(false);

  return (
    <div className="contact-page">
      <div className="contact-page__headshot">
        {headshotMissing ? (
          <span className="contact-page__headshot-placeholder" aria-hidden="true">
            BC
          </span>
        ) : (
          <img src={HEADSHOT_URL} alt="Brandon Carr" onError={() => setHeadshotMissing(true)} />
        )}
      </div>
      <p className="contact-page__eyebrow">Get in touch</p>
      <h1>Contact</h1>
      <p className="contact-page__tagline">
        The best way to reach me is email — I'm also on GitHub and LinkedIn.
      </p>

      <div className="contact-page__links">
        {links.map((link) => (
          <a
            key={link.label}
            className="contact-page__link"
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
          >
            <svg
              className={`contact-page__icon${link.dark ? " contact-page__icon--dark" : ""}`}
              aria-hidden="true"
            >
              <use href={`/icons.svg#${link.icon}`} />
            </svg>
            {link.label}
          </a>
        ))}
      </div>

      <section className="contact-page__resume">
        <div className="contact-page__resume-header">
          <h2>Resume</h2>
          <div className="contact-page__resume-actions">
            <a className="contact-page__link" href={RESUME_URL} target="_blank" rel="noreferrer">
              Open
            </a>
            <a className="contact-page__link" href={RESUME_URL} download="Brandon-Carr-Resume.pdf">
              Download
            </a>
          </div>
        </div>
        <object className="contact-page__resume-frame" data={RESUME_URL} type="application/pdf">
          <p>
            Your browser can't preview PDFs inline —{" "}
            <a href={RESUME_URL} target="_blank" rel="noreferrer">
              open the resume
            </a>{" "}
            instead.
          </p>
        </object>
      </section>
    </div>
  );
}
