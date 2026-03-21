import { GithubIcon, Linkedin, Mail } from 'lucide-react'

function SobreMiPage({ t }) {
  return (
    <div className="bento">
      <article className="card col-3">
        <p className="mono-label">{t.about}</p>
        <p className="about-text">{t.aboutText}</p>
        <div className="about-links">
          <a href="https://github.com/niceropez" className="about-link" target="_blank" rel="noreferrer">
            <GithubIcon size={16} strokeWidth={2} aria-hidden="true" />
          </a>
          <a href="https://www.linkedin.com/in/nicolas-hernandez-67bb3317a/" className="about-link" target="_blank" rel="noreferrer">
            <Linkedin size={16} strokeWidth={2} aria-hidden="true" />
          </a>
          <a href="mailto:niceropez@gmail.com" className="about-link" aria-label="Send email">
            <Mail size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </article>

      <article className="card card-location">
        <div>
          <p className="mono-label">{t.location}</p>
          <h2 className="location-name">{t.locationName}</h2>
          <p className="location-sub">{t.locationDesc}</p>
        </div>
      </article>

      <article className="card card-contact col-2">
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
