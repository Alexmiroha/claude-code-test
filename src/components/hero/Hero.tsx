import { useLanguage } from '../../i18n/useLanguage'
import { HeroLockCard } from './HeroLockCard'
import './Hero.css'

const stores = [
  { name: 'AliExpress', mark: 'A', className: 'ico-aliexpress' },
  { name: 'x-kom', mark: 'X', className: 'ico-xkom' },
  { name: 'Media Expert', mark: '▶', className: 'ico-mediaexpert' },
  { name: 'Amazon', mark: 'a', className: 'ico-amazon' },
  { name: 'Allegro', mark: 'a', className: 'ico-allegro' },
]

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3 5 5.8v5c0 4.4 3 8.1 7 9.2 4-1.1 7-4.8 7-9.2v-5L12 3Z" />
      <path d="m9.2 11.8 2 2 3.6-3.9" />
    </svg>
  )
}

function CrosshairIcon() {
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="14" cy="14" r="8" />
      <path d="M14 1.5v5M14 21.5v5M1.5 14h5M21.5 14h5" />
      <circle cx="14" cy="14" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="6" y="12.5" width="16" height="11.5" rx="2.5" />
      <path d="M9.5 12.5V9a4.5 4.5 0 0 1 9 0v3.5" />
      <circle cx="14" cy="18" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PiggyIcon() {
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6.5 13.5c0-4 3.4-6.5 7.8-6.5 4.3 0 7.7 2.5 7.7 6.3 0 1.7-.7 3.1-1.8 4.2l.5 3h-2.7l-.7-1.5a11 11 0 0 1-6 0l-.7 1.5H7.9l.5-3.1a5.6 5.6 0 0 1-1.9-3.9Z" />
      <path d="M6.5 12.7c-1.2 0-2.1-.5-2.5-1.5" />
      <path d="M11.5 7.3c1.6-.6 3.6-.6 5.2 0" />
      <circle cx="18.2" cy="12.3" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  )
}

const valueBlocks = [
  { icon: <CrosshairIcon />, title: 'valueFindTitle', text: 'valueFindText' },
  { icon: <LockIcon />, title: 'valueLockTitle', text: 'valueLockText' },
  { icon: <PiggyIcon />, title: 'valueSaveTitle', text: 'valueSaveText' },
] as const

interface HeroProps {
  isFavorite: (id: string) => boolean
  onToggleFavorite: (id: string) => void
}

export function Hero({ isFavorite, onToggleFavorite }: HeroProps) {
  const { t } = useLanguage()

  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-main">
          <div className="hero-copy">
            <span className="hero-tagline">{t('heroTagline')}</span>
            <h1>{t('heroTitle')}</h1>
            <p className="hero-subtitle">{t('heroSubtitle')}</p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#deals">
                {t('heroCta')}
              </a>
              <a className="btn btn-ghost" href="#categories">
                {t('heroSecondaryCta')}
              </a>
            </div>

            <ul className="hero-stores" aria-label="Stores">
              {stores.map((store) => (
                <li key={store.name}>
                  <span className={`store-ico ${store.className}`} aria-hidden="true">
                    {store.mark}
                  </span>
                  {store.name}
                </li>
              ))}
            </ul>

            <p className="hero-trust">
              <ShieldIcon />
              {t('trustLine')}
            </p>
          </div>

          <div className="hero-visual">
            <HeroLockCard
              isFavorite={isFavorite}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        </div>

        <div className="hero-values">
          {valueBlocks.map((block) => (
            <div className="hero-value" key={block.title}>
              <span className="hero-value-icon">{block.icon}</span>
              <div>
                <strong>{t(block.title)}</strong>
                <span>{t(block.text)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
