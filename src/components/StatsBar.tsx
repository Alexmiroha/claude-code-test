import { products } from '../data/products'
import { categories } from '../data/categories'
import { useLanguage } from '../i18n/useLanguage'
import './StatsBar.css'

const maxDiscount = Math.max(...products.map((p) => p.discountPercent ?? 0))
const storeCount = new Set(products.map((p) => p.store)).size

export function StatsBar() {
  const { t } = useLanguage()

  const stats = [
    { value: `${products.length}+`, label: t('statsProducts') },
    { value: String(categories.length), label: t('statsCategories') },
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
