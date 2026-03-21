import { useEffect, useMemo, useState } from 'react'
import { GithubIcon, Linkedin, Moon, Sun, Globe } from 'lucide-react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import { translations } from './translations'
import InicioPage from './pages/InicioPage'
import ProyectosPage from './pages/ProyectosPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import SobreMiPage from './pages/SobreMiPage'
import type { Language, ProjectItem, Theme } from './types'

function App() {
  const preferredTheme = useMemo<Theme>(() => {
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

  const preferredLanguage = useMemo<Language>(() => {
    if (typeof window === 'undefined') {
      return 'es'
    }

    const stored = window.localStorage.getItem('language')
    if (stored === 'en' || stored === 'es') {
      return stored
    }

    return 'es'
  }, [])

  const [theme, setTheme] = useState<Theme>(preferredTheme)
  const [language, setLanguage] = useState<Language>(preferredLanguage)
  const projectsTriggerVariant = 'teal'
  const t = translations[language] as Record<string, string>
  const projectsShowcaseData: ProjectItem[] = [
  {// Tr4iner
    slug: 'tr4iner',
    label: t.projectLabel1,
    title: t.projectTitle1,
    desc: t.projectDesc1,
    role: t.projectRole1,
    outcome: t.projectOutcome1,
    stack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'REST API'],
    wide: true,
  },
  { // Jugadorazo
    slug: 'jugadorazo',
    label: t.projectLabel2,
    title: t.projectTitle2,
    desc: t.projectDesc2,
    role: t.projectRole2,
    outcome: t.projectOutcome2,
    stack: ['React', 'Node.js', 'PostgreSQL', 'WebSockets'],
    wide: false,
  },
  { // Te cuida el Agustino
    slug: 'te-cuida-el-agustino',
    label: t.projectLabel3,
    title: t.projectTitle3,
    desc: t.projectDesc3,
    role: t.projectRole3,
    outcome: t.projectOutcome3,
    stack: ['React', 'Node.js', 'WebSockets', 'Maps API'], // TODO: confirmar stack
    wide: false,
  },
  { // AILegal
    slug: 'ailegal',
    label: t.projectLabel4,
    title: t.projectTitle4,
    desc: t.projectDesc4,
    role: t.projectRole4,
    outcome: t.projectOutcome4,
    stack: ['React', 'Python', 'FastAPI', 'NLP', 'PostgreSQL'],
    wide: false,
  },
  { // Maskotapp
    slug: 'maskotapp',
    label: t.projectLabel5,
    title: t.projectTitle5,
    desc: t.projectDesc5,
    role: t.projectRole5,
    outcome: t.projectOutcome5,
    stack: [], // TODO: confirmar stack
    wide: false,
  },
  { // Dejate abrazar
    slug: 'dejate-abrazar',
    label: t.projectLabel6,
    title: t.projectTitle6,
    desc: t.projectDesc6,
    role: t.projectRole6,
    outcome: t.projectOutcome6,
    stack: [], // TODO: confirmar stack
    wide: false,
  },
  { // NFT UPC
    slug: 'nft-upc',
    label: t.projectLabel7,
    title: t.projectTitle7,
    desc: t.projectDesc7,
    role: t.projectRole7,
    outcome: t.projectOutcome7,
    stack: [], // TODO: confirmar stack
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
        <span className="topbar-logo">NH</span>
        <nav className="topbar-nav" aria-label={t.navigation}>
          <NavLink to="/" end className={({ isActive }) => `topbar-nav-link ${isActive ? 'active' : ''}`}>
            {t.navHome}
          </NavLink>
          <NavLink to="/proyectos" className={({ isActive }) => `topbar-nav-link ${isActive ? 'active' : ''}`}>
            {t.navProjects}
          </NavLink>
          <NavLink to="/sobre-mi" className={({ isActive }) => `topbar-nav-link ${isActive ? 'active' : ''}`}>
            {t.navAbout}
          </NavLink>
        </nav>
        <div className="topbar-right">
          <a href="https://github.com/niceropez" className="topbar-link" target="_blank" rel="noreferrer">
            <GithubIcon size={16} strokeWidth={2} aria-hidden="true" />
          </a>
          <a href="https://www.linkedin.com/in/nicolas-hernandez-67bb3317a/" className="topbar-link" target="_blank" rel="noreferrer">
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
        <Routes>
          <Route path="/" element={<InicioPage t={t} language={language} projectsTriggerVariant={projectsTriggerVariant} />} />
          <Route path="/proyectos" element={<ProyectosPage t={t} projectsShowcaseData={projectsShowcaseData} />} />
          <Route
            path="/proyectos/:slug"
            element={<ProjectDetailPage projectsShowcaseData={projectsShowcaseData} language={language} />}
          />
          <Route path="/sobre-mi" element={<SobreMiPage t={t} language={language} projectsTriggerVariant={projectsTriggerVariant} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <span className="footer-copy">2026 Nicolas Hernandez . Lima, Peru</span>
      </footer>
    </>
  )
}

export default App
