import { useEffect, useState } from 'react'
import type { Language, TranslationDict } from '../types'
import profilePhoto from '../assets/me.jpeg'

interface InicioPageProps {
  t: TranslationDict
  language: Language
  projectsTriggerVariant: string
}

function InicioPage({ t }: InicioPageProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const delay = i * 50
            setTimeout(() => {
              entry.target.classList.add('visible')
            }, delay)
          }
        })
      },
      { threshold: 0.12 },
    )

    const fadeElements = document.querySelectorAll('.fade')
    fadeElements.forEach((el) => observer.observe(el))

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const heroItems = [
    { num: '6+', label: t.homeStatYears },
    { num: '7+', label: t.homeStatProducts },
    { num: 'End-to-end', label: t.homeStatEndToEnd },
  ]

  const services = [
    {
      featured: true,
      label: t.homeServiceLabel,
      name: t.homeService1Name,
      desc: t.homeService1Desc,
      includes: [
        t.homeService1Include1,
        t.homeService1Include2,
        t.homeService1Include3,
        t.homeService1Include4,
      ],
      ideal: t.homeService1Ideal,
    },
    {
      featured: false,
      label: t.homeServiceLabel,
      name: t.homeService2Name,
      desc: t.homeService2Desc,
      includes: [
        t.homeService2Include1,
        t.homeService2Include2,
        t.homeService2Include3,
        t.homeService2Include4,
      ],
      ideal: t.homeService2Ideal,
    },
  ]

  const processSteps = [
    {
      num: '01',
      title: t.homeProcessStep1Title,
      desc: t.homeProcessStep1Desc,
      tag: t.homeProcessStep1Tag,
    },
    {
      num: '02',
      title: t.homeProcessStep2Title,
      desc: t.homeProcessStep2Desc,
      tag: t.homeProcessStep2Tag,
    },
    {
      num: '03',
      title: t.homeProcessStep3Title,
      desc: t.homeProcessStep3Desc,
      tag: t.homeProcessStep3Tag,
    },
    {
      num: '04',
      title: t.homeProcessStep4Title,
      desc: t.homeProcessStep4Desc,
      tag: t.homeProcessStep4Tag,
    },
    {
      num: '05',
      title: t.homeProcessStep5Title,
      desc: t.homeProcessStep5Desc,
      tag: t.homeProcessStep5Tag,
    },
  ]

  const faqs = [
    {
      q: t.homeFaq1Q,
      a: t.homeFaq1A,
    },
    {
      q: t.homeFaq2Q,
      a: t.homeFaq2A,
    },
    {
      q: t.homeFaq3Q,
      a: t.homeFaq3A,
    },
    {
      q: t.homeFaq4Q,
      a: t.homeFaq4A,
    },
    {
      q: t.homeFaq5Q,
      a: t.homeFaq5A,
    },
    {
      q: t.homeFaq6Q,
      a: t.homeFaq6A,
    },
  ]

  return (
    <div className="inicio-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow fade">
          <span className="hero-dot" />
          {t.homeAvailable}
        </div>

        <h1 className="hero-title fade">
          <>
            {t.homeTitleLine1}<br /><em>{t.homeTitleEmphasis}</em>
          </>
        </h1>

        <p className="hero-sub fade">{t.homeSub}</p>

        <div className="hero-actions fade">
          <a href="mailto:niceropez@gmail.com" className="btn-primary">
            {t.homeStartProject}
          </a>
          <a href="/proyectos" className="btn-secondary">
            {t.homeSeeWork}
          </a>
        </div>

        <div className="hero-stats fade">
          {heroItems.map((item, i) => (
            <div key={i}>
              <div className="hero-stat-num">{item.num}</div>
              <div className="hero-stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <div className="section-block">
          <div className="mono-label fade">
            {t.homeAboutLabel}
          </div>
          <div className="about-grid">
            <div className="about-intro fade">
              <div className="about-heading">
                <figure className="about-photo-wrap" aria-hidden="true">
                  <img src={profilePhoto} alt="Nicolas Hernandez" className="about-photo" loading="lazy" />
                </figure>

                <h2 className="about-title">
                  {t.homeAboutTitle}
                </h2>
              </div>

              <div className="about-body">
                <p>{t.homeAboutBody}</p>
              </div>
            </div>
            <div className="about-values fade">
              <div className="about-value">
                <div className="value-num">01</div>
                <div>
                  <div className="value-title">
                    {t.homeValue1Title}
                  </div>
                  <div className="value-desc">
                    {t.homeValue1Desc}
                  </div>
                </div>
              </div>
              <div className="about-value">
                <div className="value-num">02</div>
                <div>
                  <div className="value-title">
                    {t.homeValue2Title}
                  </div>
                  <div className="value-desc">
                    {t.homeValue2Desc}
                  </div>
                </div>
              </div>
              <div className="about-value">
                <div className="value-num">03</div>
                <div>
                  <div className="value-title">
                    {t.homeValue3Title}
                  </div>
                  <div className="value-desc">
                    {t.homeValue3Desc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="section-block">
          <div className="mono-label fade">
            {t.homeServicesLabel}
          </div>
          <div className="services-header fade">
            <h2 className="services-title">
              {t.homeServicesTitle}
            </h2>
            <p className="services-sub">
              {t.homeServicesSub}
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, i) => (
              <div
                key={i}
                className={`service-card fade ${service.featured ? 'featured' : ''}`}
              >
                <div>
                  <div className="service-label">{service.label}</div>
                  <h3 className="service-name">{service.name}</h3>
                  <p className="service-desc">{service.desc}</p>
                </div>
                <div>
                  <ul className="service-includes">
                    {service.includes.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                  <div className="service-ideal">{service.ideal}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="section-block">
          <div className="mono-label fade">
            {t.homeProcessLabel}
          </div>
          <div className="process-header fade">
            <h2 className="process-title">
              {t.homeProcessTitle}
            </h2>
            <p className="process-sub">
              {t.homeProcessSub}
            </p>
          </div>

          <div className="process-steps">
            {processSteps.map((step, i) => (
              <div key={i} className="process-step fade">
                <div className="step-num">{step.num}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                  <span className="step-tag">{step.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="section-block">
          <div className="mono-label fade">
            {t.homeFaqLabel}
          </div>
          <div className="faq-header fade">
            <h2 className="faq-title">
              {t.homeFaqTitle}
            </h2>
          </div>

          <div className="faq-list fade">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item ${expandedFaq === i ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-q"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section">
        <div className="cta-block fade">
          <div className="cta-label">
            {t.homeCtaLabel}
          </div>
          <h2 className="cta-title">
            {t.homeCtaTitle}
          </h2>
          <p className="cta-sub">{t.homeCtaSub}</p>
          <div className="cta-actions">
            <a href="mailto:niceropez@gmail.com" className="cta-btn-primary">
              {t.homeCtaPrimary}
            </a>
            <a href="/proyectos" className="cta-btn-secondary">
              {t.homeCtaSecondary}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InicioPage
