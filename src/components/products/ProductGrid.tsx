import { products } from '../../data/products'
import { useLanguage } from '../../i18n/useLanguage'
import { ProductCard } from './ProductCard'
import type { Product } from '../../types/product'
import './ProductGrid.css'

interface FavoriteProps {
  isFavorite: (id: string) => boolean
  onToggleFavorite: (id: string) => void
}

const featuredProducts = products.filter((p) => p.featured)

export function FeaturedDeals({ isFavorite, onToggleFavorite }: FavoriteProps) {
  const { t } = useLanguage()

  return (
    <section className="section" id="deals">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">{t('featuredTitle')}</h2>
          <p className="section-subtitle">{t('featuredSubtitle')}</p>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={isFavorite(product.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface AllDealsProps extends FavoriteProps {
  filteredProducts: Product[]
  showFavoritesOnly: boolean
  onToggleFavoritesOnly: () => void
}

export function AllDeals({
  filteredProducts,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  isFavorite,
  onToggleFavorite,
}: AllDealsProps) {
  const { t } = useLanguage()

  return (
    <section className="section" id="all-deals">
      <div className="container">
        <div className="section-head grid-head">
          <div>
            <h2 className="section-title">{t('allDealsTitle')}</h2>
            <p className="section-subtitle">
              {filteredProducts.length} {t('resultsCount')}
            </p>
          </div>
          <button
            className={`favorites-filter ${showFavoritesOnly ? 'active' : ''}`}
            onClick={onToggleFavoritesOnly}
            aria-pressed={showFavoritesOnly}
          >
            ♥ {t('showFavoritesOnly')}
          </button>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite(product.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="grid-empty">
            <span className="grid-empty-icon" aria-hidden="true">
              🎯
            </span>
            <h3>{t('emptyTitle')}</h3>
            <p>{showFavoritesOnly ? t('emptyFavorites') : t('emptySubtitle')}</p>
          </div>
        )}
      </div>
    </section>
  )
}
