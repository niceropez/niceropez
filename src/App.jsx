import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, GithubIcon, Linkedin, MapPin, Moon, Sun, Globe } from 'lucide-react'
import './App.css'
import { translations } from './translations'

function App() {
  const preferredTheme = useMemo(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }

    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      return stored
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  }, [])

  const preferredLanguage = useMemo(() => {
    if (typeof window === 'undefined') {
      return 'es'
    }

    const stored = window.localStorage.getItem('language')
    if (stored === 'en' || stored === 'es') {
      return stored
    }

    return 'es'
  }, [])

  const [theme, setTheme] = useState(preferredTheme)
  const [language, setLanguage] = useState(preferredLanguage)
  const [isProjectsFlipped, setIsProjectsFlipped] = useState(false)
  const t = translations[language]
  const projectsData = [
    {
      title: t.projectTitle1,
      desc: t.projectDesc1,
      stack: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      title: t.projectTitle2,
      desc: t.projectDesc2,
      stack: ['Next.js', 'TypeScript', 'Stripe'],
    },
    {
      title: t.projectTitle3,
      desc: t.projectDesc3,
      stack: ['React', 'Express', 'Redis'],
    },
  ]
  const projectsShowcaseData = [
    {
      label: t.projectLabel1,
      title: t.projectTitle1,
      desc: t.projectDesc1,
      role: t.projectRole1,
      outcome: t.projectOutcome1,
      stack: ['React', 'Node.js', 'PostgreSQL', 'Slack', 'Google Drive'],
      wide: true,
    },
    {
      label: t.projectLabel2,
      title: t.projectTitle2,
      desc: t.projectDesc2,
      stack: ['Next.js', 'TypeScript', 'Stripe'],
      wide: false,
    },
    {
      label: t.projectLabel3,
      title: t.projectTitle3,
      desc: t.projectDesc3,
      stack: ['React', 'Express', 'Redis'],
      wide: false,
    },
  ]

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    window.localStorage.setItem('language', language)
  }, [language])

  return (
    <>
      <header className="topbar">
        <span className="topbar-logo"></span>
        <div className="topbar-right">
          <a
            href="https://github.com/niceropez"
            className="topbar-link"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon size={16} strokeWidth={2} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/nicolas-hernandez-67bb3317a/"
            className="topbar-link"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={16} strokeWidth={2} aria-hidden="true" />
          </a>
          <button
            className="language-btn"
            type="button"
            aria-label={t.changeLanguage}
            title={t.changeLanguage}
            onClick={() => setLanguage((current) => (current === 'es' ? 'en' : 'es'))}
          >
            <Globe size={16} strokeWidth={2} aria-hidden="true" />
            <span className="language-code">{language.toUpperCase()}</span>
          </button>
          <button
            className="theme-btn"
            type="button"
            aria-label={t.changeTheme}
            title={t.changeTheme}
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? (
              <Sun size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Moon size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      <main className="bento-wrap">
        <div className={`bento-scene ${isProjectsFlipped ? 'flipped' : ''}`}>
          <div className="bento-flip-inner">
            <section className="bento-face bento-face-front" aria-hidden={isProjectsFlipped}>
              <div className="bento">
                <article className="card card-hero col-2 row-2">
                  <div>
                    <h1 className="hero-name">
                      Nicolás
                      <br />
                      Hernández
                    </h1>
                    <p className="hero-tagline">
                      {t.tagline}
                    </p>
                  </div>
                  <a href="mailto:nicolas@email.com" className="hero-cta">
                    {t.cta} <ArrowRight className="hero-cta-icon" size={14} strokeWidth={2.2} aria-hidden="true" />
                  </a>
                </article>

                <article className="card card-stat card-stat-accent">
                  <p className="mono-label">{t.experience}</p>
                  <p className="stat-number">{t.experienceValue}</p>
                  <p className="stat-desc">{t.experienceDesc}</p>
                </article>

                <article className="card card-status">
                  <div className="status-dot-wrap">
                    <span className="status-dot" />
                  </div>
                  <div>
                    <p className="status-label">{t.available}</p>
                    <p className="status-sub">
                      {t.availableDesc}
                    </p>
                  </div>
                </article>

                <article
                  className="card card-stat card-stat-blue card-projects-trigger pulse-attract"
                  onClick={() => setIsProjectsFlipped(true)}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setIsProjectsFlipped(true)
                    }
                  }}
                >
                  <p className="mono-label">{t.projects}</p>
                  <p className="stat-number">{t.projectsValue}</p>
                  <p className="stat-desc">{t.projectsDesc}</p>
                  <p className="flip-hint flip-hint-attract" aria-hidden="true">
                    {t.openProjectsBoard}
                    <span className="flip-hint-arrow"><ArrowRight size={12} strokeWidth={2.4} aria-hidden="true" /></span>
                  </p>
                </article>

                <article className="card card-stat">
                  <p className="mono-label">{t.currentRole}</p>
                  <p className="stat-number stat-number-small">{t.currentRoleValue}</p>
                  <p className="stat-desc">{t.currentRoleDesc}</p>
                </article>

                <article className="card col-2">
                  <p className="mono-label">{t.stackMain}</p>
                  {(() => {
                    const skillsData = [
                      ['React / Next.js', language === 'es' ? "Victor's Vision, 5 proyectos" : "Victor's Vision, 5 projects"],
                      ['Node.js / Express', language === 'es' ? 'APIs REST, microservicios' : 'REST APIs, microservices'],
                      ['PostgreSQL', language === 'es' ? 'Modelos relacionales complejos' : 'Complex relational models'],
                      ['TypeScript', language === 'es' ? 'Proyectos en produccion' : 'Production projects'],
                      ['Docker / Linux', language === 'es' ? 'Despliegue y DevOps basico' : 'Deployment & basic DevOps'],
                    ]
                    return skillsData.map(([name, context]) => (
                      <div key={name} className="skill-row">
                        <span className="skill-name">{name}</span>
                        <span className="skill-ctx">{context}</span>
                      </div>
                    ))
                  })()}
                </article>

                <article className="card card-code">
                  <div className="code-dots">
                    <span className="code-dot red" />
                    <span className="code-dot yellow" />
                    <span className="code-dot green" />
                  </div>
                  <div className="code-body">
                    <div>
                      <span className="c-kw">const</span> <span className="c-fn">dev</span>{' '}
                      <span className="c-wt">= {'{'}</span>
                    </div>
                    <div>
                      <span className="indent" />
                      <span className="c-wt">name:</span> <span className="c-str">'Nicolas'</span>
                      <span className="c-wt">,</span>
                    </div>
                    <div>
                      <span className="indent" />
                      <span className="c-wt">loc:</span> <span className="c-str">'Lima, PE'</span>
                      <span className="c-wt">,</span>
                    </div>
                    <div>
                      <span className="indent" />
                      <span className="c-wt">yrs:</span> <span className="c-num">6</span>
                      <span className="c-wt">,</span>
                    </div>
                    <div>
                      <span className="indent" />
                      <span className="c-wt">open:</span> <span className="c-kw">true</span>
                    </div>
                    <div>
                      <span className="c-wt">{'}'}</span>
                    </div>
                    <div className="code-comment">{t.codeComment}</div>
                  </div>
                </article>

                <article className="card card-location">
                  <div>
                    <p className="mono-label">{t.location}</p>
                    <h2 className="location-name">{t.locationName}</h2>
                    <p className="location-sub">{t.locationDesc}</p>
                  </div>
                  <div className="map-placeholder" aria-hidden="true">
                    <div className="map-grid">
                      {Array.from({ length: 24 }).map((_, idx) => (
                        <span key={idx} className="map-cell" />
                      ))}
                    </div>
                    <span className="map-pin" aria-hidden="true">
                      <MapPin className="map-pin-icon" size={12} strokeWidth={2.2} />
                    </span>
                  </div>
                </article>

                <article className="card col-3">
                  <p className="mono-label">{t.about}</p>
                  <p className="about-text">
                    {t.aboutText}
                  </p>
                  <div className="about-links">
                    <a href="https://github.com/" className="about-link" target="_blank" rel="noreferrer">
                      <GithubIcon size={16} strokeWidth={2} aria-hidden="true" />
                    </a>
                    <a href="https://linkedin.com/" className="about-link" target="_blank" rel="noreferrer">
                      <Linkedin size={16} strokeWidth={2} aria-hidden="true" />
                    </a>
                    <a href="mailto:niceropez@gmail.com" className="about-link">
                      niceropez@gmail.com
                    </a>
                  </div>
                </article>

                <article className="card card-contact">
                  <div>
                    <p className="mono-label">{t.contact}</p>
                    <h2 className="contact-title">{t.contactTitle}</h2>
                    <p className="contact-sub">
                      {t.contactDesc}
                    </p>
                  </div>
                  <a href="mailto:niceropez@gmail.com" className="contact-email">
                    niceropez@gmail.com
                  </a>
                </article>
              </div>
            </section>

            <section className="bento-face bento-face-back" aria-hidden={!isProjectsFlipped}>
              <div className="bento">
                <article
                  className="card card-stat card-stat-accent card-back-toggle"
                  onClick={() => setIsProjectsFlipped(false)}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setIsProjectsFlipped(false)
                    }
                  }}
                >
                  <p className="mono-label">{t.projectsBoard}</p>
                  <p className="stat-number stat-number-small">{t.projectsBackTitle}</p>
                  <p className="stat-desc">{t.projectsBackHint}</p>
                </article>

                {projectsShowcaseData.map((project) => (
                  <article
                    key={project.title}
                    className={`card card-project ${project.wide ? 'col-2 row-2' : ''}`.trim()}
                  >
                    <ArrowUpRight className="project-arrow" size={16} strokeWidth={2.1} aria-hidden="true" />
                    <div>
                      <p className="mono-label">{project.label}</p>
                      <h2 className="project-title">{project.title}</h2>
                      <p className="project-desc">{project.desc}</p>
                      {project.role && <p className="project-role">{project.role}</p>}
                      {project.outcome && <p className="project-outcome">{project.outcome}</p>}
                    </div>
                    <div className="project-stack">
                      {project.stack.map((item) => (
                        <span key={item} className="pill">
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}

                <article className="card card-stat card-stat-blue">
                  <p className="mono-label">{t.projects}</p>
                  <p className="stat-number">{projectsData.length}</p>
                  <p className="stat-desc">{t.projectsBoardDesc}</p>
                </article>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="footer">
        <span className="footer-copy">
          2026 Nicolas Hernandez . Lima, Peru</span>
      </footer>
    </>
  )
}

export default App
