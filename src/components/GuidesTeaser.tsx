import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { guidePosts } from '../data/guides'
import type { GuidePost } from '../data/guides'
import { GuideModal } from './GuideModal'
import { useLanguage } from '../i18n/useLanguage'
import './GuidesTeaser.css'

export function GuidesTeaser() {
  const { t, tr } = useLanguage()
  const [openGuide, setOpenGuide] = useState<GuidePost | null>(null)

  const openOnKeyDown =
    (guide: GuidePost) => (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setOpenGuide(guide)
      }
    }

  return (
    <section className="section" id="guides">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">{t('guidesTitle')}</h2>
          <p className="section-subtitle">{t('guidesSubtitle')}</p>
        </div>
        <div className="guides-grid">
          {guidePosts.map((guide) => (
            <article
              className="guide-card"
              key={guide.id}
              role="button"
              tabIndex={0}
              onClick={() => setOpenGuide(guide)}
              onKeyDown={openOnKeyDown(guide)}
              aria-label={tr(guide.cardTitle)}
            >
              <span className="guide-icon" aria-hidden="true">
                {guide.icon}
              </span>
              <h3>{tr(guide.cardTitle)}</h3>
              <p>{tr(guide.cardDescription)}</p>
              <span className="guide-more">{t('readMore')} →</span>
            </article>
          ))}
        </div>
      </div>

      {openGuide && (
        <GuideModal guide={openGuide} onClose={() => setOpenGuide(null)} />
      )}
    </section>
  )
}
