import { useLanguage } from '../../i18n/useLanguage'
import { ProductCard } from './ProductCard'
import type { Product } from '../../types/product'
import './ProductGrid.css'

interface FavoriteProps {
  isFavorite: (id: string) => boolean
  onToggleFavorite: (id: string) => void
  onOpenDetails: (id: string) => void
}

interface AllDealsProps extends FavoriteProps {
  products: Product[]
  totalCount: number
  hasMoreProducts: boolean
  onLoadMore: () => void
  showFavoritesOnly: boolean
  onToggleFavoritesOnly: () => void
  hasActiveFilters: boolean
  onClearFilters: () => void
}

export function AllDeals({
  products,
  totalCount,
  hasMoreProducts,
  onLoadMore,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  hasActiveFilters,
  onClearFilters,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
}: AllDealsProps) {
  const { t } = useLanguage()

  return (
    <section className="section" id="all-deals">
      <div className="container">
        <div className="section-head grid-head">
          <div>
            <h2 className="section-title">{t('allDealsTitle')}</h2>
            {totalCount > 0 && (
              <p className="section-subtitle">
                {t('showingProducts')
                  .replace('{visible}', String(products.length))
                  .replace('{total}', String(totalCount))}
              </p>
            )}
          </div>
          <button
            className={`favorites-filter ${showFavoritesOnly ? 'active' : ''}`}
            onClick={onToggleFavoritesOnly}
            aria-pressed={showFavoritesOnly}
          >
            ♥ {t('showFavoritesOnly')}
          </button>
        </div>

        {products.length > 0 ? (
          <>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={isFavorite(product.id)}
                  onToggleFavorite={onToggleFavorite}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </div>
            {hasMoreProducts && (
              <div className="load-more-wrap">
                <button className="load-more" onClick={onLoadMore}>
                  {t('loadMore')}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="grid-empty">
            <span className="grid-empty-icon" aria-hidden="true">
              🎯
            </span>
            <h3>{t('emptyTitle')}</h3>
            <p>{showFavoritesOnly ? t('emptyFavorites') : t('emptySubtitle')}</p>
            {hasActiveFilters && (
              <button className="clear-filters" onClick={onClearFilters}>
                {t('clearFilters')}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
