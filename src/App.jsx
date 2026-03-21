import './App.css'

const mockProjects = [
  {
    title: 'Nebula Market',
    type: 'E-commerce UX Concept',
    summary:
      'Exploracion de una tienda digital con foco en storytelling de producto, checkout rapido y navegacion por colecciones.',
    status: 'Mockup v1',
  },
  {
    title: 'Pulse Studio',
    type: 'Landing para Marca Personal',
    summary:
      'Concepto visual para presentar servicios creativos, casos destacados y conversion por formulario.',
    status: 'Mockup v2',
  },
  {
    title: 'Atlas Board',
    type: 'Dashboard de Producto',
    summary:
      'Tablero de gestion de objetivos con widgets modulares, foco en claridad de KPIs y flujo semanal.',
    status: 'Mockup v1',
  },
]

const mockServices = [
  'Diseno UI para Web y Mobile',
  'Prototipos de alta fidelidad',
  'Sistemas visuales y componentes',
]

function App() {
  return (
    <div className="page-shell">
      <div className="backdrop" aria-hidden="true" />

      <header className="topbar">
        <p className="brand">Nico Mock Studio</p>
        <nav>
          <a href="#proyectos">Proyectos</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="kicker">Portafolio en construccion</p>
          <h1>Diseno visual potente con contenido 100% mockup</h1>
          <p className="lead">
            Este sitio esta armado para iterar rapido: textos de ejemplo,
            bloques visuales placeholder y estructura lista para reemplazar con
            material real cuando lo tengas.
          </p>
          <div className="hero-actions">
            <button type="button">Ver concepto</button>
            <button type="button" className="ghost">
              Descargar brief mockup
            </button>
          </div>
        </section>

        <section id="proyectos" className="projects">
          <div className="section-head">
            <h2>Proyectos mockup</h2>
            <p>Tarjetas conceptuales sin imagenes finales.</p>
          </div>

          <div className="project-grid">
            {mockProjects.map((project, index) => (
              <article
                key={project.title}
                className="project-card"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="mock-thumbnail" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p className="pill">{project.status}</p>
                <h3>{project.title}</h3>
                <p className="type">{project.type}</p>
                <p>{project.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="servicios" className="services">
          <div className="section-head">
            <h2>Servicios de ejemplo</h2>
            <p>Bloques editables para definir tu oferta real.</p>
          </div>

          <ul>
            {mockServices.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </section>

        <section id="contacto" className="contact">
          <h2>Contacto mock</h2>
          <p>
            Disponible para nuevos proyectos desde abril. Este texto es temporal
            y se reemplaza cuando definas mensaje final.
          </p>
          <a href="mailto:hello@mockmail.dev">hello@mockmail.dev</a>
        </section>
      </main>

      <footer>
        <small>Base React + Vite preparada para seguir iterando.</small>
      </footer>
    </div>
  )
}

export default App
