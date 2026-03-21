import { useEffect, useMemo, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import './App.css'

const projects = [
  {
    label: 'Proyecto destacado . ONG',
    title: "Victor's Vision",
    desc: 'Plataforma web de perfiles de voluntarios para una nonprofit con operaciones en USA y Peru. Liderazgo completo del equipo de 5 personas en arquitectura, sprints y delivery.',
    role: 'Rol -> Full Stack Dev + Project Manager',
    outcome: 'Sprint 0 en curso . Equipo de 5 voluntarios',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Slack', 'Google Drive'],
    wide: true,
  },
  {
    label: 'Proyecto . E-commerce',
    title: 'Tu proyecto aqui',
    desc: 'Describe el problema real que resolviste, no solo las tecnologias que usaste.',
    stack: ['Next.js', 'TypeScript', 'Stripe'],
  },
  {
    label: 'Proyecto . SaaS',
    title: 'Otro proyecto',
    desc: 'El contexto del negocio importa tanto como el stack tecnico.',
    stack: ['React', 'Express', 'Redis'],
  },
]

const skills = [
  ['React / Next.js', "Victor's Vision, 5 proyectos"],
  ['Node.js / Express', 'APIs REST, microservicios'],
  ['PostgreSQL', 'Modelos relacionales complejos'],
  ['TypeScript', 'Proyectos en produccion'],
  ['Docker / Linux', 'Despliegue y DevOps basico'],
]

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

  const [theme, setTheme] = useState(preferredTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <>
      <header className="topbar">
        <span className="topbar-logo">ng.dev</span>
        <div className="topbar-right">
          <a
            href="https://github.com/niceropez"
            className="topbar-link"
            target="_blank"
            rel="noreferrer"
          >
            GitHub -&gt;
          </a>
          <a
            href="https://www.linkedin.com/in/nicolas-hernandez-67bb3317a/"
            className="topbar-link"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn -&gt;
          </a>
          <button
            className="theme-btn"
            type="button"
            aria-label="Cambiar tema"
            title="Cambiar tema"
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
                Full Stack Developer construyendo
                <br />
                productos web con criterio propio.
              </p>
            </div>
            <a href="mailto:nicolas@email.com" className="hero-cta">
              Trabajemos juntos -&gt;
            </a>
          </article>

          <article className="card card-stat card-stat-accent">
            <p className="mono-label">Experiencia</p>
            <p className="stat-number">6+</p>
            <p className="stat-desc">anos en proyectos web end-to-end</p>
          </article>

          <article className="card card-status">
            <div className="status-dot-wrap">
              <span className="status-dot" />
            </div>
            <div>
              <p className="status-label">Disponible</p>
              <p className="status-sub">
                Para proyectos freelance . Respondo en 24h
              </p>
            </div>
          </article>

          <article className="card card-stat card-stat-blue">
            <p className="mono-label">Proyectos</p>
            <p className="stat-number">12+</p>
            <p className="stat-desc">entregados en produccion</p>
          </article>

          <article className="card card-stat">
            <p className="mono-label">Rol actual</p>
            <p className="stat-number stat-number-small">PM & Dev</p>
            <p className="stat-desc">liderando equipo volunteer en ONG</p>
          </article>

          {projects.map((project) => (
            <article
              key={project.title}
              className={`card card-project ${project.wide ? 'col-2' : ''}`.trim()}
            >
              <span className="project-arrow">-&gt;</span>
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

          <article className="card col-2">
            <p className="mono-label">Stack principal</p>
            {skills.map(([name, context]) => (
              <div key={name} className="skill-row">
                <span className="skill-name">{name}</span>
                <span className="skill-ctx">{context}</span>
              </div>
            ))}
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
              <div className="code-comment">// listo para el proximo reto</div>
            </div>
          </article>

          <article className="card card-location">
            <div>
              <p className="mono-label">Ubicacion</p>
              <h2 className="location-name">Lima, Peru</h2>
              <p className="location-sub">UTC-5 . Disponible remote worldwide</p>
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
            <p className="mono-label">Sobre mi</p>
            <p className="about-text">
              Desarrollo productos web end-to-end, desde la arquitectura del backend
              hasta los detalles de interaccion en el frontend. Me importa tanto la
              calidad del codigo como la experiencia de quien lo usa. Actualmente me
              estoy estrenando como Project Manager liderando Victor's Vision, una
              plataforma de voluntariado para una ONG con presencia en Peru y USA.
            </p>
            <div className="about-links">
              <a href="https://github.com/" className="about-link" target="_blank" rel="noreferrer">
                GitHub -&gt;
              </a>
              <a href="https://linkedin.com/" className="about-link" target="_blank" rel="noreferrer">
                LinkedIn -&gt;
              </a>
              <a href="mailto:nicolas@email.com" className="about-link">
                nicolas@email.com
              </a>
            </div>
          </article>

          <article className="card card-contact">
            <div>
              <p className="mono-label">Contacto</p>
              <h2 className="contact-title">Tienes un proyecto?</h2>
              <p className="contact-sub">
                Cuentame que necesitas y
                <br />
                coordinamos una llamada.
              </p>
            </div>
            <a href="mailto:nicolas@email.com" className="contact-email">
              nicolas@email.com
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
