import { useEffect, useMemo, useState } from 'react'
import { GithubIcon, Linkedin, Moon, Sun, Globe } from 'lucide-react'
import './App.css'

const translations = {
  es: {
    // Header
    changeTheme: 'Cambiar tema',
    changeLanguage: 'Cambiar idioma',
    
    // Hero
    tagline: 'Full Stack Developer construyendo productos web con criterio propio.',
    cta: 'Trabajemos juntos',
    
    // Stats
    experience: 'Experiencia',
    experienceValue: '6+',
    experienceDesc: 'años en proyectos web end-to-end',
    available: 'Disponible',
    availableDesc: 'Para proyectos freelance . Respondo en 24h',
    projects: 'Proyectos',
    projectsValue: '12+',
    projectsDesc: 'entregados en produccion',
    currentRole: 'Rol actual',
    currentRoleValue: 'PM & Dev',
    currentRoleDesc: 'liderando equipo volunteer en ONG',
    
    // Projects
    projectLabel1: 'Proyecto destacado . ONG',
    projectTitle1: "Victor's Vision",
    projectDesc1: 'Plataforma web de perfiles de voluntarios para una nonprofit con operaciones en USA y Peru. Liderazgo completo del equipo de 5 personas en arquitectura, sprints y delivery.',
    projectRole1: 'Rol -> Full Stack Dev + Project Manager',
    projectOutcome1: 'Sprint 0 en curso . Equipo de 5 voluntarios',
    projectLabel2: 'Proyecto . E-commerce',
    projectTitle2: 'Tu proyecto aqui',
    projectDesc2: 'Describe el problema real que resolviste, no solo las tecnologias que usaste.',
    projectLabel3: 'Proyecto . SaaS',
    projectTitle3: 'Otro proyecto',
    projectDesc3: 'El contexto del negocio importa tanto como el stack tecnico.',
    
    // Skills
    stackMain: 'Stack principal',
    
    // Code
    codeComment: '// listo para el proximo reto',
    
    // Location
    location: 'Ubicacion',
    locationName: 'Lima, Peru',
    locationDesc: 'UTC-5 . Disponible remote worldwide',
    
    // About
    about: 'Sobre mi',
    aboutText: 'Desarrollo productos web end-to-end, desde la arquitectura del backend hasta los detalles de interaccion en el frontend. Me importa tanto la calidad del codigo como la experiencia de quien lo usa. Actualmente me estoy estrenando como Project Manager liderando Victor\'s Vision, una plataforma de voluntariado para una ONG con presencia en Peru y USA.',
    
    // Contact
    contact: 'Contacto',
    contactTitle: 'Tienes un proyecto?',
    contactDesc: 'Cuentame que necesitas y coordinamos una llamada.',
  },
  en: {
    // Header
    changeTheme: 'Toggle theme',
    changeLanguage: 'Change language',
    
    // Hero
    tagline: 'Full Stack Developer building web products with purpose.',
    cta: 'Let\'s work together',
    
    // Stats
    experience: 'Experience',
    experienceValue: '6+',
    experienceDesc: 'years building end-to-end web projects',
    available: 'Available',
    availableDesc: 'Open to freelance projects . I respond within 24h',
    projects: 'Projects',
    projectsValue: '12+',
    projectsDesc: 'delivered in production',
    currentRole: 'Current role',
    currentRoleValue: 'PM & Dev',
    currentRoleDesc: 'leading volunteer team at NGO',
    
    // Projects
    projectLabel1: 'Featured project . NGO',
    projectTitle1: "Victor's Vision",
    projectDesc1: 'Web platform for volunteer profiles at a nonprofit operating in the USA and Peru. Full team leadership of 5 people in architecture, sprints, and delivery.',
    projectRole1: 'Role -> Full Stack Dev + Project Manager',
    projectOutcome1: 'Sprint 0 in progress . Team of 5 volunteers',
    projectLabel2: 'Project . E-commerce',
    projectTitle2: 'Your project here',
    projectDesc2: 'Describe the real problem you solved, not just the technologies you used.',
    projectLabel3: 'Project . SaaS',
    projectTitle3: 'Another project',
    projectDesc3: 'Business context matters as much as the technical stack.',
    
    // Skills
    stackMain: 'Main stack',
    
    // Code
    codeComment: '// ready for the next challenge',
    
    // Location
    location: 'Location',
    locationName: 'Lima, Peru',
    locationDesc: 'UTC-5 . Available remote worldwide',
    
    // About
    about: 'About me',
    aboutText: 'I develop end-to-end web products, from backend architecture to frontend interaction details. I care about code quality as much as user experience. I\'m currently stepping into the Project Manager role leading Victor\'s Vision, a volunteering platform for an NGO with presence in Peru and the USA.',
    
    // Contact
    contact: 'Get in touch',
    contactTitle: 'Have a project in mind?',
    contactDesc: 'Tell me what you need and we\'ll schedule a call.',
  },
}

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
  const t = translations[language]

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
              {t.cta} <span aria-hidden="true">-&gt;</span>
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

          <article className="card card-stat card-stat-blue">
            <p className="mono-label">{t.projects}</p>
            <p className="stat-number">{t.projectsValue}</p>
            <p className="stat-desc">{t.projectsDesc}</p>
          </article>

          <article className="card card-stat">
            <p className="mono-label">{t.currentRole}</p>
            <p className="stat-number stat-number-small">{t.currentRoleValue}</p>
            <p className="stat-desc">{t.currentRoleDesc}</p>
          </article>

          {(() => {
            const projectsData = [
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
              },
              {
                label: t.projectLabel3,
                title: t.projectTitle3,
                desc: t.projectDesc3,
                stack: ['React', 'Express', 'Redis'],
              },
            ]
            return projectsData.map((project) => (
              <article
                key={project.title}
                className={`card card-project ${project.wide ? 'col-2' : ''}`.trim()}
              >
                <span className="project-arrow" aria-hidden="true">-&gt;</span>
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
            ))
          })()}

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
              <span className="map-pin">PIN</span>
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
      </main>

      <footer className="footer">
        <span className="footer-copy">2026 Nicolas Garcia . Lima, Peru</span>
        <span className="footer-copy">Hecho con React, CSS y criterio propio.</span>
      </footer>
    </>
  )
}

export default App
