import { useEffect, useRef } from 'react'
import type { PointerEvent } from 'react'
import { hotPickProducts } from '../data/catalog/catalogAdapter'
import { catalogCategories } from '../data/catalog/catalogAdapter'
import { useLanguage } from '../i18n/useLanguage'
import { displayPrice, formatNumber } from '../utils/format'
import type { Product } from '../types/product'
import './HotPicksTicker.css'

/** Base drift in px/s; pointer steering scales up to ±MAX_SPEED. */
const DRIFT_SPEED = 20
const MAX_SPEED = 220
/** Central band of the viewport where the strip rests for reading/clicking. */
const DEAD_ZONE = 0.18

interface TickerCardProps {
  product: Product
  clone: boolean
  onOpenDetails: (id: string) => void
}

function TickerCard({ product, clone, onOpenDetails }: TickerCardProps) {
  const { language, t, tr } = useLanguage()
  const category = catalogCategories.find((c) => c.id === product.categoryId)

  return (
    <button
      className="ticker-card"
      onClick={() => onOpenDetails(product.id)}
      tabIndex={clone ? -1 : 0}
      aria-hidden={clone || undefined}
      aria-label={`${t('productDetails')}: ${tr(product.title)}`}
    >
      <span className="ticker-thumb" aria-hidden="true">
        {product.image ? (
          <img src={product.image} alt="" loading="lazy" referrerPolicy="no-referrer" />
        ) : (
          <span className="ticker-thumb-icon">{category?.icon}</span>
        )}
      </span>
      <span className="ticker-info">
        <span className="ticker-title">{tr(product.title)}</span>
        {(product.salesCount !== undefined ||
          product.rating !== undefined) && (
          <span className="ticker-meta">
            {product.salesCount !== undefined && (
              <span className="ticker-sales" title={t('salesLabel')}>
                <span aria-hidden="true">🛍</span>{' '}
                {formatNumber(product.salesCount, language)}
              </span>
            )}
            {product.rating !== undefined && (
              <span className="ticker-rating" title={t('ratingLabel')}>
                <span aria-hidden="true">★</span> {product.rating.toFixed(1)}
              </span>
            )}
          </span>
        )}
      </span>
      <span className="ticker-price-block">
        {product.discountPercent && (
          <span className="ticker-discount">-{product.discountPercent}%</span>
        )}
        <span className="ticker-price">
          {displayPrice(product.price, language)}
        </span>
      </span>
    </button>
  )
}

interface HotPicksTickerProps {
  onOpenDetails: (id: string) => void
}

export function HotPicksTicker({ onOpenDetails }: HotPicksTickerProps) {
  const { t } = useLanguage()
  const trackRef = useRef<HTMLDivElement | null>(null)
  /** -1..1 steering from pointer position; null = untouched (base drift). */
  const steeringRef = useRef<number | null>(null)
  const resumeTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frameId = 0
    let last = performance.now()
    let carry = 0

    const step = (now: number) => {
      /* Clamp so returning from a background tab doesn't jump the strip. */
      const elapsed = Math.min(now - last, 48)
      last = now

      const loopWidth = track.scrollWidth / 2
      if (loopWidth > track.clientWidth) {
        const steering = steeringRef.current
        const velocity = steering === null ? DRIFT_SPEED : steering * MAX_SPEED
        /* Carry sub-pixel remainders so slow speeds don't stall on integer scrollLeft. */
        const delta = (velocity * elapsed) / 1000 + carry
        const applied = Math.trunc(delta)
        carry = delta - applied

        if (applied !== 0) {
          track.scrollLeft += applied
          if (track.scrollLeft >= loopWidth) track.scrollLeft -= loopWidth
          else if (track.scrollLeft < 0) track.scrollLeft += loopWidth
        }
      }

      frameId = window.requestAnimationFrame(step)
    }

    frameId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frameId)
  }, [])

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const ratio = (event.clientX / window.innerWidth) * 2 - 1
    steeringRef.current = Math.abs(ratio) < DEAD_ZONE ? 0 : ratio
  }

  /* Touch: pause the drift during the gesture so it doesn't fight the swipe,
     then resume shortly after the finger lifts. */
  const handleTouchStart = () => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = null
    }
    steeringRef.current = 0
  }

  const handleTouchEnd = () => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current)
    }
    resumeTimerRef.current = window.setTimeout(() => {
      steeringRef.current = null
      resumeTimerRef.current = null
    }, 1500)
  }

  const items = [...hotPickProducts, ...hotPickProducts]

  return (
    <section className="ticker-section" id="deals">
      <div className="container">
        <p className="ticker-label">
          <span aria-hidden="true">%</span> {t('hotPicksTitle')}
        </p>
      </div>
      <div
        ref={trackRef}
        className="ticker-track"
        role="region"
        aria-label={t('hotPicksTitle')}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          steeringRef.current = null
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onFocus={() => {
          steeringRef.current = 0
        }}
        onBlur={() => {
          steeringRef.current = null
        }}
      >
        {items.map((product, index) => (
          <TickerCard
            key={`${product.id}-${index < hotPickProducts.length ? 'a' : 'b'}`}
            product={product}
            clone={index >= hotPickProducts.length}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>
    </section>
  )
}
