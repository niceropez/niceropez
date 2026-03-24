import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import type { ProjectItem, TranslationDict } from '../types'

interface ProyectosPageProps {
  t: TranslationDict
  projectsShowcaseData: ProjectItem[]
}

const projectImageModules = import.meta.glob('../assets/projects/**/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const slugFolderMap: Record<string, string> = {
  'te-cuida-el-agustino': 'te-cuida-agustino',
  ailegal: 'ai-legal',
}

function byNumericFilename(a: string, b: string): number {
  const aName = a.split('/').pop() ?? ''
  const bName = b.split('/').pop() ?? ''
  const aNumber = Number.parseInt(aName.split('.')[0], 10)
  const bNumber = Number.parseInt(bName.split('.')[0], 10)

  if (Number.isNaN(aNumber) || Number.isNaN(bNumber)) {
    return aName.localeCompare(bName)
  }

  return aNumber - bNumber
}

function getProjectImageUrls(projectSlug: string): string[] {
  const folder = slugFolderMap[projectSlug] ?? projectSlug
  const prefix = `/assets/projects/${folder}/`

  return Object.entries(projectImageModules)
    .filter(([modulePath]) => modulePath.includes(prefix))
    .sort(([a], [b]) => byNumericFilename(a, b))
    .map(([, moduleValue]) => moduleValue)
}

interface WideProjectCarouselProps {
  slug: string
  title: string
}

function WideProjectCarousel({ slug, title }: WideProjectCarouselProps) {
  const imageUrls = useMemo(() => getProjectImageUrls(slug), [slug])
  const [activeIndex, setActiveIndex] = useState(0)
  const [manualStep, setManualStep] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
  }, [slug])

  useEffect(() => {
    if (imageUrls.length <= 1) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % imageUrls.length)
    }, 3400)

    return () => window.clearInterval(timer)
  }, [imageUrls.length, manualStep])

  const goToPrevious = () => {
    if (imageUrls.length <= 1) {
      return
    }

    setActiveIndex((current) => (current - 1 + imageUrls.length) % imageUrls.length)
    setManualStep((current) => current + 1)
  }

  const goToNext = () => {
    if (imageUrls.length <= 1) {
      return
    }

    setActiveIndex((current) => (current + 1) % imageUrls.length)
    setManualStep((current) => current + 1)
  }

  if (!imageUrls.length) {
    return null
  }

  return (
    <div className="project-wide-carousel" aria-hidden="true">
      {imageUrls.map((imageUrl, imageIndex) => (
        <img
          key={`${slug}-${imageIndex}`}
          src={imageUrl}
          alt={`${title} screenshot ${imageIndex + 1}`}
          className={`project-wide-image ${imageIndex === activeIndex ? 'is-active' : ''}`}
          loading="lazy"
          draggable={false}
        />
      ))}

      {imageUrls.length > 1 && (
        <div className="project-wide-controls">
          <button
            type="button"
            className="project-wide-control-btn"
            aria-label="Previous image"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              goToPrevious()
            }}
          >
            <ArrowLeft size={14} strokeWidth={2.3} aria-hidden="true" />
          </button>

          <span className="project-wide-counter">
            {activeIndex + 1} / {imageUrls.length}
          </span>

          <button
            type="button"
            className="project-wide-control-btn"
            aria-label="Next image"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              goToNext()
            }}
          >
            <ArrowRight size={14} strokeWidth={2.3} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}

function ProyectosPage({ t, projectsShowcaseData }: ProyectosPageProps) {
  const location = useLocation()
  const [backRoute, setBackRoute] = useState('/sobre-mi')

  useEffect(() => {
    const originRoute =
      typeof location.state === 'object' &&
      location.state !== null &&
      'from' in location.state &&
      typeof location.state.from === 'string'
        ? location.state.from
        : null

    if (originRoute === '/' || originRoute === '/sobre-mi') {
      window.sessionStorage.setItem('projects-origin-route', originRoute)
      setBackRoute(originRoute)
      return
    }

    const storedOrigin = window.sessionStorage.getItem('projects-origin-route')
    if (storedOrigin === '/' || storedOrigin === '/sobre-mi') {
      setBackRoute(storedOrigin)
      return
    }

    setBackRoute('/sobre-mi')
  }, [location.state])

  return (
    <div className="bento">
      <Link to={backRoute} className="card card-stat card-stat-accent card-back-toggle">
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

          {project.wide && <WideProjectCarousel slug={project.slug} title={project.title} />}

          <div className="project-stack">
            {project.stack.map((item) => (
              <span key={item} className="pill">{item}</span>
            ))}
          </div>
        </Link>
      ))}

      {/* <article className="card card-stat card-stat-blue">
        <p className="mono-label">{t.projects}</p>
        <p className="stat-number">{projectsShowcaseData.length}</p>
        <p className="stat-desc">{t.projectsBoardDesc}</p>
      </article> */}
    </div>
  )
}

export default ProyectosPage
