import {
  catalogCategories,
  catalogProducts,
  catalogStores,
  categoryCounts,
  recommendedCategory,
  recommendedCount,
} from '../../data/catalog/catalogAdapter'
import { useLanguage } from '../../i18n/useLanguage'
import type { TranslationKey } from '../../i18n/translations'
import { sortModes } from '../../utils/sortProducts'
import type { SortMode } from '../../utils/sortProducts'
import type { Store } from '../../types/product'
import './CategoryFilter.css'

const sortLabelKeys: Record<SortMode, TranslationKey> = {
  bestOffer: 'sortBestOffer',
  priceAsc: 'sortLowestPrice',
  priceDesc: 'sortHighestPrice',
  bestDiscount: 'sortBestDiscount',
}

const sortIcons: Record<SortMode, string> = {
  bestOffer: '🏆',
  priceAsc: '📉',
  priceDesc: '📈',
  bestDiscount: '🏷️',
}

interface CategoryFilterProps {
  selectedCategoryId: string | null
  onSelectCategory: (categoryId: string | null) => void
  selectedStore: Store | null
  onSelectStore: (store: Store | null) => void
  selectedSort: SortMode
  onSelectSort: (sort: SortMode) => void
}

export function CategoryFilter({
  selectedCategoryId,
  onSelectCategory,
  selectedStore,
  onSelectStore,
  selectedSort,
  onSelectSort,
}: CategoryFilterProps) {
  const { t, tr } = useLanguage()
  const totalCount = catalogProducts.length

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
            <span className="chip-count">{totalCount}</span>
          </button>
          <button
            className={`category-chip recommended ${
              selectedCategoryId === recommendedCategory.id ? 'active' : ''
            }`}
            onClick={() =>
              onSelectCategory(
                selectedCategoryId === recommendedCategory.id
                  ? null
                  : recommendedCategory.id,
              )
            }
            aria-pressed={selectedCategoryId === recommendedCategory.id}
            disabled={recommendedCount === 0}
          >
            <span aria-hidden="true">{recommendedCategory.icon}</span>{' '}
            {tr(recommendedCategory.name)}
            <span className="chip-count">{recommendedCount}</span>
          </button>
          {catalogCategories.map((category) => {
            const count = categoryCounts.get(category.id) ?? 0
            const active = selectedCategoryId === category.id
            return (
              <button
                key={category.id}
                className={`category-chip ${active ? 'active' : ''}`}
                onClick={() => onSelectCategory(active ? null : category.id)}
                aria-pressed={active}
                disabled={count === 0}
              >
                <span aria-hidden="true">{category.icon}</span> {tr(category.name)}
                <span className="chip-count">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="filter-toolbar">
          <div className="filter-group">
            <h3 className="filter-title">{t('storesTitle')}</h3>
            <div className="category-chips" role="group" aria-label={t('storesTitle')}>
              <button
                className={`category-chip ${selectedStore === null ? 'active' : ''}`}
                onClick={() => onSelectStore(null)}
                aria-pressed={selectedStore === null}
              >
                {t('allStores')}
                <span className="chip-count">{totalCount}</span>
              </button>
              {catalogStores.map(({ store, count }) => {
                const active = selectedStore === store
                return (
                  <button
                    key={store}
                    className={`category-chip ${active ? 'active' : ''}`}
                    onClick={() => onSelectStore(active ? null : store)}
                    aria-pressed={active}
                  >
                    {store}
                    <span className="chip-count">{count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">{t('sortTitle')}</h3>
            <div className="category-chips" role="group" aria-label={t('sortTitle')}>
              {sortModes.map((mode) => {
                const active = selectedSort === mode
                return (
                  <button
                    key={mode}
                    className={`category-chip ${active ? 'active' : ''}`}
                    onClick={() => onSelectSort(mode)}
                    aria-pressed={active}
                  >
                    <span aria-hidden="true">{sortIcons[mode]}</span>{' '}
                    {t(sortLabelKeys[mode])}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
