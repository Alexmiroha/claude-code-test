import { useLanguage } from '../../i18n/useLanguage'
import { languages } from '../../i18n/translations'
import type { Theme } from '../../hooks/useTheme'
import './Header.css'

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  favoritesCount: number
  showFavoritesOnly: boolean
  onToggleFavoritesOnly: () => void
  theme: Theme
  onToggleTheme: () => void
}

function LogoMark() {
  return (
    <svg
      className="logo-mark"
      viewBox="0 0 32 32"
      width="30"
      height="30"
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="16"
        r="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="14 5"
      />
      <circle cx="16" cy="16" r="4" fill="currentColor" />
      <path
        d="M16 0v6M16 26v6M0 16h6M26 16h6"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  )
}

export function Header({
  searchQuery,
  onSearchChange,
  favoritesCount,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  theme,
  onToggleTheme,
}: HeaderProps) {
  const { language, setLanguage, t } = useLanguage()

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#top" className="logo">
          <LogoMark />
          <span>
            Promo<em>Hunter</em>
          </span>
        </a>

        <nav className="nav" aria-label="Main">
          <a href="#deals">{t('navDeals')}</a>
          <a href="#categories">{t('navCategories')}</a>
          <a href="#guides">{t('navGuides')}</a>
        </nav>

        <div className="header-search">
          <svg
            viewBox="0 0 20 20"
            width="16"
            height="16"
            aria-hidden="true"
            className="search-icon"
          >
            <circle
              cx="9"
              cy="9"
              r="6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="m14 14 4.5 4.5" stroke="currentColor" strokeWidth="2" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchPlaceholder')}
          />
        </div>

        <div className="header-actions">
          <div className="lang-switcher" role="group" aria-label="Language">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={language === lang.code ? 'active' : ''}
                onClick={() => setLanguage(lang.code)}
                aria-pressed={language === lang.code}
                title={lang.label}
              >
                {lang.code.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className="icon-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? t('themeToLight') : t('themeToDark')}
            aria-label={theme === 'dark' ? t('themeToLight') : t('themeToDark')}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            className={`icon-btn favorites-btn ${showFavoritesOnly ? 'active' : ''}`}
            onClick={onToggleFavoritesOnly}
            title={t('favorites')}
            aria-pressed={showFavoritesOnly}
          >
            ♥
            {favoritesCount > 0 && (
              <span className="favorites-count">{favoritesCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
