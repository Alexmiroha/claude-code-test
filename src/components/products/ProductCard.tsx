import { catalogCategories } from '../../data/catalog/catalogAdapter'
import { useLanguage } from '../../i18n/useLanguage'
import { formatPrice } from '../../utils/format'
import type { Language, Product } from '../../types/product'
import './ProductCard.css'

/** Imported prices carry grosze; curated demo prices are whole złoty. */
const displayPrice = (value: number, language: Language) =>
  formatPrice(value, language, Number.isInteger(value) ? 0 : 2)

interface ProductCardProps {
  product: Product
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  const { language, t, tr } = useLanguage()
  const category = catalogCategories.find((c) => c.id === product.categoryId)

  return (
    <article className="product-card">
      <div className="product-media" data-category={product.categoryId}>
        {product.image ? (
          <img
            src={product.image}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="product-media-icon" aria-hidden="true">
            {category?.icon}
          </span>
        )}
        {product.discountPercent && (
          <span className="product-discount">-{product.discountPercent}%</span>
        )}
        {product.featured && (
          <span className="product-featured">{t('featuredBadge')}</span>
        )}
        <button
          className={`product-fav ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(product.id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? t('removeFavorite') : t('addFavorite')}
          title={isFavorite ? t('removeFavorite') : t('addFavorite')}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className="product-body">
        <div className="product-meta">
          <span className="product-store">{product.store}</span>
          {category && (
            <span className="product-category">{tr(category.name)}</span>
          )}
        </div>

        <h3 className="product-title">{tr(product.title)}</h3>
        {product.description && (
          <p className="product-description">{tr(product.description)}</p>
        )}

        {product.rating !== undefined && (
          <div className="product-rating" aria-label={`${product.rating}/5`}>
            <span aria-hidden="true">★</span> {product.rating.toFixed(1)}
          </div>
        )}

        <div className="product-footer">
          <div className="product-prices">
            <span className="product-price">
              {displayPrice(product.price, language)}
            </span>
            {product.oldPrice && (
              <s className="product-old-price">
                {displayPrice(product.oldPrice, language)}
              </s>
            )}
          </div>
          <a
            className="product-cta"
            href={product.affiliateUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
          >
            {t('goToStore')} →
          </a>
        </div>
      </div>
    </article>
  )
}
