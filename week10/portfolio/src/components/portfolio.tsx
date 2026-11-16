"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  siGithub,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { certifications } from "@/data/certifications";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories, skills, type SkillCategory } from "@/data/skills";

type IconName =
  | "about"
  | "skills"
  | "projects"
  | "resume"
  | "contact"
  | "certificate"
  | "book"
  | "code"
  | "sun"
  | "moon"
  | "arrow"
  | "external";

const primaryNavigation = [
  { id: "about", label: "About", icon: "about" },
  { id: "skills", label: "Skills", icon: "skills" },
  { id: "projects", label: "Projects", icon: "projects" },
  { id: "resume", label: "Resume", icon: "resume" },
  { id: "contact", label: "Contact", icon: "contact" },
] as const;

const navigation = [
  ...primaryNavigation.slice(0, 3),
  ...(certifications.length > 0
    ? [{ id: "certifications", label: "Certificates", icon: "certificate" as const }]
    : []),
  ...primaryNavigation.slice(3),
] satisfies ReadonlyArray<{ id: string; label: string; icon: IconName }>;

const brandIcons: Record<string, SimpleIcon> = {
  "html-css": siHtml5,
  javascript: siJavascript,
  typescript: siTypescript,
  nextjs: siNextdotjs,
  tailwind: siTailwindcss,
  github: siGithub,
};

type Theme = "night" | "daybreak";

const iconPaths: Record<IconName, string[]> = {
  about: ["M20 21a8 8 0 0 0-16 0", "M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"],
  skills: ["M12 3v18", "M3 12h18", "m5.6 5.6 12.8 12.8", "m18.4 5.6L5.6 18.4"],
  projects: ["M3 7h18v13H3z", "m3 7 2-4h14l2 4"],
  resume: ["M7 3h7l4 4v14H7z", "M14 3v5h5", "M10 13h5", "M10 17h5"],
  contact: ["M3 5h18v14H3z", "m3 6 9 7 9-7"],
  certificate: ["m12 3 8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z", "m9 12 2 2 4-4"],
  book: ["M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z", "M4 5.5v14", "M8 7h8"],
  code: ["m8 8-4 4 4 4", "m16 8 4 4-4 4", "m14 5-4 14"],
  sun: ["M12 3v2", "M12 19v2", "m4.2 4.2 1.4 1.4", "m18.4 18.4 1.4 1.4", "M3 12h2", "M19 12h2", "m4.2 19.8 1.4-1.4", "m18.4 5.6 1.4-1.4", "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"],
  moon: ["M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5a8.5 8.5 0 1 0 12 12Z"],
  arrow: ["M7 17 17 7", "M8 7h9v9"],
  external: ["M14 4h6v6", "m20 4-9 9", "M18 13v6H5V6h6"],
};

const projectIcons: Record<(typeof projects)[number]["visual"], IconName> = {
  atlas: "projects",
  books: "book",
  api: "code",
  stars: "about",
};

function Icon({
  name,
  className = "ui-icon",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}

function SkillMark({ skillId, mark }: { skillId: string; mark: string }) {
  const icon = brandIcons[skillId];

  if (!icon) return <span className="skill-mark-text">{mark}</span>;

  return (
    <svg
      className="skill-mark-icon"
      viewBox="0 0 24 24"
      role="img"
      aria-label={`${icon.title} logo`}
    >
      <path d={icon.path} />
    </svg>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <article className="project-card" id={`project-${project.id}`}>
      <div className="project-copy">
        <div className="project-meta">
          <span className={`project-status project-status--${project.status}`}>
            {project.status === "in-progress"
              ? "In progress"
              : project.status === "coursework"
                ? "Coursework"
                : "Live"}
          </span>
        </div>
        <h3>
          <Icon name={projectIcons[project.visual]} className="project-icon" />
          {project.name}
        </h3>
        <p>{project.description}</p>
        <ul className="technology-list" aria-label="Technologies used">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="project-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Visit project <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.sourceUrl && (
            <a href={project.sourceUrl} target="_blank" rel="noreferrer">
              Source <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Portfolio() {
  const [theme, setTheme] = useState<Theme>("daybreak");
  const [activeSection, setActiveSection] = useState("top");
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">(
    "All",
  );
  const [openCertification, setOpenCertification] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -58% 0px", threshold: [0, 0.2, 0.5] },
    );

    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const visibleSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);
  const availableCategories = skillCategories.filter((category) =>
    skills.some((skill) => skill.category === category),
  );
  const closeCertification = useCallback(
    () => setOpenCertification(null),
    [],
  );

  return (
    <div className="site-shell" data-theme={theme} id="top">
      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="Muhammadsodik home">
          Muhammadsodik
        </a>
        <div className="masthead-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={() =>
              setTheme((current) =>
                current === "night" ? "daybreak" : "night",
              )
            }
            aria-label={
              theme === "night"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            <Icon name={theme === "night" ? "sun" : "moon"} />
            {theme === "night" ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <nav className="star-dock" aria-label="Main navigation">
        {navigation.map((item) => (
          <a
            key={item.id}
            className={`dock-link${activeSection === item.id ? " is-active" : ""}`}
            href={`#${item.id}`}
            aria-current={activeSection === item.id ? "location" : undefined}
          >
            <Icon name={item.icon} className="dock-symbol" />
            <span className="dock-label">{item.label}</span>
          </a>
        ))}
      </nav>

      <main>
        <section className="hero-section section-frame" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">{profile.name}</h1>
            <p className="hero-role">{profile.role}</p>
            <p className="hero-bio">{profile.intro}</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#projects">
                View projects <Icon name="arrow" />
              </a>
              <a className="button button--quiet" href="#contact">
                Contact <Icon name="arrow" />
              </a>
            </div>
          </div>

          <div className="portrait-stage">
            <div className="portrait-window">
              <Image
                src="/images/portfolio-photo.png"
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 720px) 72vw, 360px"
                className="portrait-image"
              />
            </div>
          </div>
        </section>

        <section className="section-frame about-section" id="about">
          <SectionHeading
            icon="about"
            title="About"
          />
          <div className="about-card">
            <p>{profile.bio[0]}</p>
          </div>
        </section>

        <section className="section-frame skills-section" id="skills">
          <SectionHeading icon="skills" title="Skills" />
          <div className="category-filters" aria-label="Filter skills">
            {(["All", ...availableCategories] as const).map((category) => (
              <button
                type="button"
                key={category}
                className={`filter-chip${activeCategory === category ? " is-active" : ""}`}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="skill-list">
            {visibleSkills.map((skill) => (
              <article className="skill-item" key={skill.id}>
                <span className="skill-icon">
                  <SkillMark skillId={skill.icon ?? ""} mark={skill.mark} />
                </span>
                <h3>{skill.name}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section-frame projects-section" id="projects">
          <SectionHeading icon="projects" title="Projects" />
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {certifications.length > 0 && (
          <section className="section-frame certifications-section" id="certifications">
            <SectionHeading icon="certificate" title="Certificates" />
            <div className="certification-grid">
              {certifications.map((certification, index) => (
                <article className="cert-card" key={`${certification.issuer}-${certification.title}`}>
                  <span className="cert-shield" aria-hidden="true">
                    ◈
                  </span>
                  <span className="cert-issuer">{certification.issuer}</span>
                  <h3>{certification.title}</h3>
                  <span className="cert-date">{certification.date}</span>
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => setOpenCertification(index)}
                  >
                    What’s covered <span aria-hidden="true">↗</span>
                  </button>
                  {certification.verifyUrl && (
                    <a
                      className="text-link"
                      href={certification.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Verify <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {openCertification !== null && certifications[openCertification] && (
          <CertificationDialog
            certification={certifications[openCertification]}
            onClose={closeCertification}
          />
        )}

        <section className="section-frame resume-section" id="resume">
          <div className="resume-card">
            <div className="resume-copy">
              <SectionHeading icon="resume" title="Resume" />
              <p>View or save my resume as a PDF.</p>
            </div>
            <a className="button button--primary" href="/resume">
              View resume <Icon name="external" />
            </a>
          </div>
        </section>

        <section className="section-frame contact-section" id="contact">
          <SectionHeading icon="contact" title="Contact" />
          <div className="contact-card">
            <div>
              <h3>{profile.github}</h3>
            </div>
            <a
              className="button button--primary"
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noreferrer"
            >
              Open GitHub <Icon name="external" />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#top" className="footer-mark">Muhammadsodik</a>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}

function SectionHeading({
  icon,
  title,
  subtitle,
}: {
  icon: IconName;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="section-heading">
      <Icon name={icon} className="section-heading-icon" />
      <div className="section-heading-copy">
        <h2>{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

function CertificationDialog({
  certification,
  onClose,
}: {
  certification: (typeof certifications)[number];
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
    };
  }, [onClose]);

  return (
    <dialog
      className="cert-dialog"
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="dialog-topline">
        <span className="cert-issuer">{certification.issuer}</span>
        <button
          type="button"
          className="dialog-close"
          onClick={onClose}
          aria-label="Close certificate details"
        >
          ×
        </button>
      </div>
      <h2>{certification.title}</h2>
      <p className="cert-date">{certification.date}</p>
      <h3>What’s covered</h3>
      <ul>
        {certification.coveredTopics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
      {certification.verifyUrl && (
        <a
          className="button button--primary"
          href={certification.verifyUrl}
          target="_blank"
          rel="noreferrer"
        >
          Verify certificate <span aria-hidden="true">↗</span>
        </a>
      )}
    </dialog>
  );
}
