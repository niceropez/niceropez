import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ProjectItem, TranslationDict } from '../types'

interface ProyectosPageProps {
  t: TranslationDict
  projectsShowcaseData: ProjectItem[]
}

function ProyectosPage({ t, projectsShowcaseData }: ProyectosPageProps) {
  return (
    <div className="bento">
      <Link to="/sobre-mi" className="card card-stat card-stat-accent card-back-toggle">
        <p className="mono-label">{t.projectsBoard}</p>
        <p className="stat-number stat-number-small">{t.projectsBackTitle}</p>
        <p className="stat-desc">{t.projectsBackHint}</p>
      </Link>

      {projectsShowcaseData.map((project) => (
        <Link
          key={project.slug}
          to={`/proyectos/${project.slug}`}
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
              <span key={item} className="pill">{item}</span>
            ))}
          </div>
        </Link>
      ))}

      <article className="card card-stat card-stat-blue">
        <p className="mono-label">{t.projects}</p>
        <p className="stat-number">{projectsShowcaseData.length}</p>
        <p className="stat-desc">{t.projectsBoardDesc}</p>
      </article>
    </div>
  )
}

export default ProyectosPage
