import { useLanguage } from '../../i18n/useLanguage'
import './Footer.css'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">
            Promo<em>Hunter</em>
          </span>
          <p>{t('footerAbout')}</p>
          <p className="footer-disclosure">{t('footerDisclosure')}</p>
        </div>

        <nav className="footer-nav" aria-label={t('footerSections')}>
          <h3>{t('footerSections')}</h3>
          <a href="#deals">{t('navDeals')}</a>
          <a href="#categories">{t('navCategories')}</a>
          <a href="#guides">{t('navGuides')}</a>
        </nav>
      </div>

      <div className="container footer-bottom">
        <span>
          © {year} PromoHunter. {t('footerRights')}
        </span>
      </div>
    </footer>
  )
}
