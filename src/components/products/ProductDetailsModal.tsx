import { useEffect, useRef } from 'react'
import { catalogCategories } from '../../data/catalog/catalogAdapter'
import { useModalDialog } from '../../hooks/useModalDialog'
import { useLanguage } from '../../i18n/useLanguage'
import { displayPrice, formatNumber } from '../../utils/format'
import type { Product } from '../../types/product'
import './ProductDetailsModal.css'

interface ProductDetailsModalProps {
  product: Product
  canNavigate: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

export function ProductDetailsModal({
  product,
  canNavigate,
  onClose,
  onPrevious,
  onNext,
}: ProductDetailsModalProps) {
  const { language, t, tr } = useLanguage()
  const category = catalogCategories.find((c) => c.id === product.categoryId)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const bodyRef = useRef<HTMLDivElement | null>(null)

  useModalDialog(dialogRef, closeButtonRef, onClose)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 })
  }, [product.id])

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (!canNavigate) return
      if (event.key === 'ArrowLeft') onPrevious()
      if (event.key === 'ArrowRight') onNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [canNavigate, onNext, onPrevious])

  return (
    <div
      ref={dialogRef}
      className="details-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${t('productDetails')}: ${tr(product.title)}`}
      onClick={onClose}
    >
      <div className="details-panel" onClick={(event) => event.stopPropagation()}>
        <button
          ref={closeButtonRef}
          className="details-close"
          onClick={onClose}
          aria-label={t('closeDetails')}
          title={t('closeDetails')}
        >
          <span aria-hidden="true">✕</span>
        </button>

        {canNavigate && (
          <>
            <button
              className="details-nav prev"
              onClick={onPrevious}
              aria-label={t('prevProduct')}
              title={t('prevProduct')}
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              className="details-nav next"
              onClick={onNext}
              aria-label={t('nextProduct')}
              title={t('nextProduct')}
            >
              <span aria-hidden="true">›</span>
            </button>
          </>
        )}

        <div className="details-media">
          {product.image ? (
            <img src={product.image} alt="" referrerPolicy="no-referrer" />
          ) : (
            <span className="details-media-icon" aria-hidden="true">
              {category?.icon}
            </span>
          )}
        </div>

        <div className="details-body" ref={bodyRef}>
          <div className="details-meta">
            <span className="details-store">{product.store}</span>
            {category && (
              <span className="details-category">
                <span aria-hidden="true">{category.icon}</span>{' '}
                {tr(category.name)}
              </span>
            )}
          </div>

          <h2 className="details-title">{tr(product.title)}</h2>
          {product.variant && (
            <p className="details-variant">{tr(product.variant)}</p>
          )}
          {product.description && (
            <p className="details-description">{tr(product.description)}</p>
          )}

          <div className="details-prices">
            <span className="details-price">
              {displayPrice(product.price, language)}
            </span>
            {product.oldPrice && (
              <s className="details-old-price">
                {displayPrice(product.oldPrice, language)}
              </s>
            )}
            {product.discountPercent && (
              <span className="details-deal">-{product.discountPercent}%</span>
            )}
          </div>

          <dl className="details-info">
            {category && (
              <div className="details-info-row">
                <dt>{t('categoryLabel')}</dt>
                <dd>{tr(category.name)}</dd>
              </div>
            )}
            <div className="details-info-row">
              <dt>{t('storeLabel')}</dt>
              <dd>{product.store}</dd>
            </div>
            {product.rating !== undefined && (
              <div className="details-info-row">
                <dt>{t('ratingLabel')}</dt>
                <dd>
                  <span aria-hidden="true">★</span> {product.rating.toFixed(1)}
                  {product.ratingCount !== undefined &&
                    ` (${formatNumber(product.ratingCount, language)})`}
                </dd>
              </div>
            )}
            {product.salesCount !== undefined && (
              <div className="details-info-row">
                <dt>{t('salesLabel')}</dt>
                <dd>{formatNumber(product.salesCount, language)}</dd>
              </div>
            )}
            <div className="details-info-row">
              <dt>{t('productIdLabel')}</dt>
              <dd className="details-id">{product.id}</dd>
            </div>
          </dl>

          <a
            className="details-cta"
            href={product.affiliateUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
          >
            {t('openDeal')} →
          </a>
        </div>
      </div>
    </div>
  )
}
