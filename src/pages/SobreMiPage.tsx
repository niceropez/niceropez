import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Language, TranslationDict } from '../types'

interface SobreMiPageProps {
  t: TranslationDict
  language: Language
  projectsTriggerVariant: string
}

function SobreMiPage({ t, language, projectsTriggerVariant }: SobreMiPageProps) {
  const skillsData = [
    ['React / Next.js', language === 'es' ? 'Aplicaciones web en produccion' : 'Production web applications'],
    ['.NET', language === 'es' ? 'APIs y arquitectura backend' : 'Backend APIs and architecture'],
    ['Flutter', language === 'es' ? 'Apps moviles multiplataforma' : 'Cross-platform mobile apps'],
    ['Node.js / Express', language === 'es' ? 'APIs REST, microservicios' : 'REST APIs, microservices'],
    ['PostgreSQL', language === 'es' ? 'Modelos relacionales complejos' : 'Complex relational models'],
    ['TypeScript', language === 'es' ? 'Proyectos en produccion' : 'Production projects'],
    ['Docker / Linux', language === 'es' ? 'Despliegue y DevOps basico' : 'Deployment & basic DevOps'],
  ]

  return (
    <div className="bento">
      <article className="card card-hero col-2 row-2">
        <div>
          <h1 className="hero-name">
            Nicolás
            <br />
            Hernández
          </h1>
          <p className="hero-tagline">{t.tagline}</p>
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
          <p className="status-sub">{t.availableDesc}</p>
        </div>
      </article>

      <Link
        to="/proyectos"
        state={{ from: '/sobre-mi' }}
        className={`card card-stat card-stat-blue card-projects-trigger card-projects-trigger--${projectsTriggerVariant} pulse-attract`}
      >
        <p className="mono-label">{t.projects}</p>
        <p className="stat-number">{t.projectsValue}</p>
        <p className="stat-desc">{t.projectsDesc}</p>
        <p className="flip-hint flip-hint-attract" aria-hidden="true">
          {t.openProjectsBoard}
          <span className="flip-hint-arrow"><ArrowUpRight size={12} strokeWidth={2.4} aria-hidden="true" /></span>
        </p>
        <img className="projects-card-image" src="/projects-card-visual.svg" alt="" aria-hidden="true" />
      </Link>

      <article className="card card-stat">
        <p className="mono-label">{t.currentRole}</p>
        <p className="stat-number stat-number-small">{t.currentRoleValue}</p>
        <p className="stat-desc">{t.currentRoleDesc}</p>
      </article>

      <article className="card col-2">
        <p className="mono-label">{t.stackMain}</p>
        {skillsData.map(([name, context]) => (
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
        <p className="about-text">{t.aboutText}</p>
      </article>

      <article className="card card-contact">
        <div>
          <p className="mono-label">{t.contact}</p>
          <h2 className="contact-title">{t.contactTitle}</h2>
          <p className="contact-sub">{t.contactDesc}</p>
        </div>
        <a href="mailto:niceropez@gmail.com" className="contact-email">niceropez@gmail.com</a>
      </article>
    </div>
  )
}

export default SobreMiPage
