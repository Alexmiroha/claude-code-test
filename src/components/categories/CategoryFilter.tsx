import { categories } from '../../data/categories'
import { useLanguage } from '../../i18n/useLanguage'
import './CategoryFilter.css'

interface CategoryFilterProps {
  selectedCategoryId: string | null
  onSelectCategory: (categoryId: string | null) => void
}

export function CategoryFilter({
  selectedCategoryId,
  onSelectCategory,
}: CategoryFilterProps) {
  const { t, tr } = useLanguage()

  return (
    <section className="section" id="categories">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">{t('categoriesTitle')}</h2>
        </div>
        <div className="category-chips" role="group" aria-label={t('categoriesTitle')}>
          <button
            className={`category-chip ${selectedCategoryId === null ? 'active' : ''}`}
            onClick={() => onSelectCategory(null)}
            aria-pressed={selectedCategoryId === null}
          >
            {t('allCategories')}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-chip ${selectedCategoryId === category.id ? 'active' : ''}`}
              onClick={() =>
                onSelectCategory(
                  selectedCategoryId === category.id ? null : category.id,
                )
              }
              aria-pressed={selectedCategoryId === category.id}
            >
              <span aria-hidden="true">{category.icon}</span> {tr(category.name)}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
