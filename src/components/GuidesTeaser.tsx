import { useLanguage } from '../i18n/useLanguage'
import type { TranslationKey } from '../i18n/translations'
import './GuidesTeaser.css'

const guides: { icon: string; title: TranslationKey; text: TranslationKey }[] = [
  { icon: '🔍', title: 'guide1Title', text: 'guide1Text' },
  { icon: '📅', title: 'guide2Title', text: 'guide2Text' },
  { icon: '💸', title: 'guide3Title', text: 'guide3Text' },
]

export function GuidesTeaser() {
  const { t } = useLanguage()

  return (
    <section className="section" id="guides">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">{t('guidesTitle')}</h2>
          <p className="section-subtitle">{t('guidesSubtitle')}</p>
        </div>
        <div className="guides-grid">
          {guides.map((guide) => (
            <article className="guide-card" key={guide.title}>
              <span className="guide-icon" aria-hidden="true">
                {guide.icon}
              </span>
              <h3>{t(guide.title)}</h3>
              <p>{t(guide.text)}</p>
              <span className="guide-more">{t('readMore')} →</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
