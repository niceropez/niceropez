import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { LoadingComponent } from '../components/LoadingComponent'
import type { Language, ProjectItem } from '../types'

interface ProjectDetailPageProps {
  projectsShowcaseData: ProjectItem[]
  language: Language
}

function ProjectDetailPage({ projectsShowcaseData, language }: ProjectDetailPageProps) {
  const { slug } = useParams<{ slug: string }>()

  if (!slug) {
    return <Navigate to="/proyectos" replace />
  }

  const index = projectsShowcaseData.findIndex((project) => project.slug === slug)

  if (index === -1) {
    return <Navigate to="/proyectos" replace />
  }

  const project = projectsShowcaseData[index]
  const previousProject = projectsShowcaseData[(index - 1 + projectsShowcaseData.length) % projectsShowcaseData.length]
  const nextProject = projectsShowcaseData[(index + 1) % projectsShowcaseData.length]

  const isEs = language === 'es'

  const copy = {
    back: isEs ? 'Volver a proyectos' : 'Back to projects',
    problem: isEs ? 'El problema' : 'The problem',
    challenge: isEs ? 'Reto' : 'Challenge',
    solution: isEs ? 'Solucion' : 'Solution',
    keyDecisions: isEs ? 'Decisiones clave' : 'Key decisions',
    stack: 'Stack',
    learnings: isEs ? 'Lo que aprendi' : 'What I learned',
    previous: isEs ? 'Anterior' : 'Previous',
    next: isEs ? 'Siguiente' : 'Next',
    screenshot: isEs ? 'Screenshot / Demo' : 'Screenshot / Demo',
    role: isEs ? 'Rol' : 'Role',
    projectType: isEs ? 'Web Platform' : 'Web Platform',
    status: isEs ? 'En produccion' : 'In production',
    problemParagraph1:
      project.problem?.[0] ||
      project.desc,
    problemParagraph2:
      project.problem?.[1] ||
      (isEs
        ? 'El objetivo fue transformar procesos manuales en una experiencia clara, rapida y medible para los usuarios finales.'
        : 'The goal was to turn manual processes into a clear, fast, and measurable experience for end users.'),
    challengeText:
      project.challenge ||
      (isEs
        ? 'Equilibrar flexibilidad del producto con una interfaz simple para diferentes tipos de usuario.'
        : 'Balance product flexibility with a simple interface for different user types.'),
    solutionText:
      project.solution ||
      (isEs
        ? 'Arquitectura modular + flujos guiados para reducir friccion y permitir escalabilidad del producto.'
        : 'Modular architecture plus guided flows to reduce friction while keeping the product scalable.'),
    decisions:
      project.decisions ||
      [
        {
          title: isEs ? 'Arquitectura orientada a dominio' : 'Domain-oriented architecture',
          description: isEs
            ? 'Se separaron responsabilidades para facilitar mantenimiento y evolucion del producto.'
            : 'Responsibilities were split to improve maintainability and product evolution.',
        },
        {
          title: isEs ? 'Iteraciones con usuarios reales' : 'Iterations with real users',
          description: isEs
            ? 'Las decisiones de interfaz se validaron con feedback temprano para evitar sobre-ingenieria.'
            : 'Interface decisions were validated early with user feedback to avoid over-engineering.',
        },
      ],
    outcomes:
      project.outcomes ||
      [
        { value: isEs ? '3x' : '3x', label: isEs ? 'Mejor velocidad operativa' : 'Faster operational speed' },
        { value: isEs ? '100%' : '100%', label: isEs ? 'Flujo central digitalizado' : 'Core flow digitized' },
        { value: isEs ? 'Live' : 'Live', label: isEs ? 'Proyecto activo' : 'Project active' },
      ],
    learnings:
      project.learnings ||
      [
        isEs
          ? 'Producto y UX son inseparables: una buena arquitectura no compensa una mala experiencia de uso.'
          : 'Product and UX are inseparable: a strong architecture does not compensate for poor usability.',
        isEs
          ? 'Las entrevistas cortas con usuarios reales aceleran mas que semanas de suposiciones internas.'
          : 'Short interviews with real users move faster than weeks of internal assumptions.',
        isEs
          ? 'Iterar en pequenos incrementos ayuda a mantener foco en valor de negocio y no solo en features.'
          : 'Small iterative releases keep focus on business value instead of feature count.',
      ],
  }

  return (
    <div className="project-detail-wrap">
      <Link to="/proyectos" className="detail-back detail-fade">
        <ArrowLeft size={14} strokeWidth={2.4} aria-hidden="true" />
        {copy.back}
      </Link>

      <section className="detail-header detail-fade">
        <p className="mono-label">{project.label}</p>
        <h1 className="detail-title">{project.title}</h1>
        <p className="detail-tagline">{project.desc}</p>
      </section>

      <div className="detail-meta detail-fade">
        <span className="detail-meta-pill detail-meta-pill-accent">{project.role || `${copy.role} -> Full Stack`}</span>
        <span className="detail-meta-pill">2024</span>
        <span className="detail-meta-pill">{copy.projectType}</span>
        <span className="detail-meta-pill">{copy.status}</span>
      </div>

      <LoadingComponent seed={project.slug} />

      <section className="detail-two-col detail-fade">
        <div className="detail-col-label">{copy.problem}</div>
        <div className="detail-col-body">
          <p>{copy.problemParagraph1}</p>
          <p>{copy.problemParagraph2}</p>
        </div>
      </section>

      <section className="detail-challenge-grid detail-fade">
        <article className="detail-challenge-card">
          <p className="detail-card-label detail-card-label-challenge">{copy.challenge}</p>
          <p className="detail-card-text">{copy.challengeText}</p>
        </article>
        <article className="detail-challenge-card">
          <p className="detail-card-label detail-card-label-solution">{copy.solution}</p>
          <p className="detail-card-text">{copy.solutionText}</p>
        </article>
      </section>

      <div className="detail-divider" />

      <section className="detail-two-col detail-fade">
        <div className="detail-col-label">{copy.keyDecisions}</div>
        <div className="detail-decisions">
          {copy.decisions.map((decision, decisionIndex) => (
            <article key={`${decision.title}-${decisionIndex}`} className="detail-decision">
              <span className="detail-decision-num">{String(decisionIndex + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="detail-decision-title">{decision.title}</h2>
                <p className="detail-decision-desc">{decision.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="detail-divider" />

      <section className="detail-outcomes detail-fade">
        {copy.outcomes.map((item) => (
          <article key={`${item.value}-${item.label}`} className="detail-outcome-card">
            <p className="detail-outcome-value">{item.value}</p>
            <p className="detail-outcome-label">{item.label}</p>
          </article>
        ))}
      </section>

      <div className="detail-divider" />

      <section className="detail-two-col detail-fade">
        <div className="detail-col-label">{copy.stack}</div>
        <div className="detail-stack-row">
          {project.stack.length ? (
            project.stack.map((item) => (
              <span key={item} className="detail-stack-pill">{item}</span>
            ))
          ) : (
            <span className="detail-stack-pill">TBD</span>
          )}
        </div>
      </section>

      <div className="detail-divider" />

      <section className="detail-two-col detail-fade">
        <div className="detail-col-label">{copy.learnings}</div>
        <div className="detail-learnings">
          {copy.learnings.map((learning, learningIndex) => (
            <article key={`${project.slug}-learning-${learningIndex}`} className="detail-learning">
              <span className="detail-learning-dot" aria-hidden="true" />
              <p className="detail-learning-text">{learning}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="detail-divider" />

      <nav className="detail-nav detail-fade" aria-label="Project navigation">
        <Link to={`/proyectos/${previousProject.slug}`} className="detail-nav-item">
          <span className="detail-nav-dir">
            <ArrowLeft size={12} strokeWidth={2.3} aria-hidden="true" /> {copy.previous}
          </span>
          <span className="detail-nav-title">{previousProject.title}</span>
        </Link>
        <Link to={`/proyectos/${nextProject.slug}`} className="detail-nav-item detail-nav-item-right">
          <span className="detail-nav-dir">
            {copy.next} <ArrowRight size={12} strokeWidth={2.3} aria-hidden="true" />
          </span>
          <span className="detail-nav-title">{nextProject.title}</span>
        </Link>
      </nav>

      <Link to="/proyectos" className="detail-back-grid detail-fade">
        {isEs ? 'Volver al board' : 'Back to board'}
        <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
      </Link>
    </div>
  )
}

export default ProjectDetailPage
