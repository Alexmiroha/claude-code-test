import {
  catalogProducts,
  catalogCategories,
} from '../data/catalog/catalogAdapter'
import { useLanguage } from '../i18n/useLanguage'
import './StatsBar.css'

const maxDiscount = Math.max(
  ...catalogProducts.map((p) => p.discountPercent ?? 0),
)
const storeCount = new Set(catalogProducts.map((p) => p.store)).size

export function StatsBar() {
  const { t } = useLanguage()

  const stats = [
    { value: `${catalogProducts.length}+`, label: t('statsProducts') },
    { value: String(catalogCategories.length), label: t('statsCategories') },
    { value: `-${maxDiscount}%`, label: t('statsMaxDiscount') },
    { value: String(storeCount), label: t('statsStores') },
  ]

  return (
    <section className="stats">
      <div className="container stats-inner">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
