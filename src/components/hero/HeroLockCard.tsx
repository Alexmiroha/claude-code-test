import { products } from '../../data/products'
import { useLanguage } from '../../i18n/useLanguage'
import { formatPrice } from '../../utils/format'
import type { Product, Store } from '../../types/product'

/**
 * Ordered list of deals the target can lock onto; the first entry is the
 * active one. Structured so this can become a carousel of best deals
 * sliding through the bracket frame later.
 */
const heroDeals: Product[] = [products.find((p) => p.id === 'p21')!]

const storeBadge: Record<Store, { mark: string; className: string }> = {
  AliExpress: { mark: 'A', className: 'ico-aliexpress' },
  'x-kom': { mark: 'X', className: 'ico-xkom' },
  'Media Expert': { mark: '▶', className: 'ico-mediaexpert' },
  Amazon: { mark: 'a', className: 'ico-amazon' },
  Allegro: { mark: 'a', className: 'ico-allegro' },
  Temu: { mark: 'T', className: 'ico-temu' },
}

/** Highest discount currently available per store, from the mock catalog. */
const bestDiscountFor = (store: Store): number =>
  Math.max(
    ...products
      .filter((p) => p.store === store)
      .map((p) => p.discountPercent ?? 0),
  )

const storeHighlights: { store: Store; className: string; discount: number }[] =
  (['x-kom', 'Allegro', 'AliExpress', 'Amazon'] as Store[]).map(
    (store, index) => ({
      store,
      className: `fp-${index + 1}`,
      discount: bestDiscountFor(store),
    }),
  )

/** HUD backdrop: layered arcs, node lines and circuit marks — decoration only. */
function HudBackdrop() {
  return (
    <svg
      className="hud-backdrop"
      viewBox="0 0 700 700"
      aria-hidden="true"
      fill="none"
      stroke="var(--accent)"
    >
      {/* concentric circles */}
      <circle cx="350" cy="350" r="140" strokeOpacity="0.1" />
      <circle cx="350" cy="350" r="185" strokeOpacity="0.13" strokeDasharray="5 9" />
      <circle cx="350" cy="350" r="230" strokeOpacity="0.17" />
      <g className="hud-slow-spin">
        <circle cx="350" cy="350" r="272" strokeOpacity="0.11" strokeDasharray="3 12" />
      </g>
      <circle cx="350" cy="350" r="316" strokeOpacity="0.07" />
      {/* bright arc segments (single dash per circle, rotated) */}
      <circle
        cx="350"
        cy="350"
        r="230"
        strokeOpacity="0.55"
        strokeWidth="2.5"
        strokeDasharray="46 1400"
        transform="rotate(24 350 350)"
      />
      <circle
        cx="350"
        cy="350"
        r="185"
        strokeOpacity="0.5"
        strokeWidth="2.5"
        strokeDasharray="34 1130"
        transform="rotate(158 350 350)"
      />
      <circle
        cx="350"
        cy="350"
        r="272"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeDasharray="56 1655"
        transform="rotate(285 350 350)"
      />
      {/* horizontal support line with square nodes */}
      <path d="M0 350h700" strokeOpacity="0.14" />
      <path d="M0 350h118M582 350h118" strokeOpacity="0.4" />
      <rect x="104" y="346" width="8" height="8" strokeOpacity="0.6" />
      <rect x="588" y="346" width="8" height="8" strokeOpacity="0.6" />
      {/* vertical dashes above/below */}
      <path d="M350 8v76M350 616v76" strokeOpacity="0.25" strokeDasharray="8 10" />
      {/* far corner angle marks */}
      <path d="M78 106V78h28M622 106V78h-28M78 594v28h28M622 594v28h-28" strokeOpacity="0.3" />
      {/* circuit-like broken squares */}
      <path d="M46 150v-76h76M152 46h58" strokeOpacity="0.32" />
      <path d="M654 550v76h-76M548 654h-58" strokeOpacity="0.32" />
      {/* scatter: plus signs, dots, tiny squares */}
      <path d="M520 148h16M528 140v16M164 542h16M172 534v16" strokeOpacity="0.4" />
      <circle cx="548" cy="470" r="2.5" fill="var(--accent)" stroke="none" fillOpacity="0.55" />
      <circle cx="140" cy="248" r="2.5" fill="var(--accent)" stroke="none" fillOpacity="0.55" />
      <circle cx="452" cy="96" r="2" fill="var(--accent)" stroke="none" fillOpacity="0.45" />
      <rect x="606" y="266" width="5" height="5" strokeOpacity="0.5" />
      <rect x="88" y="440" width="5" height="5" strokeOpacity="0.5" />
    </svg>
  )
}

/** Stylized open-case earbuds illustration, used when the deal has no photo. */
function EarbudsArt() {
  return (
    <svg viewBox="0 0 280 210" width="252" aria-hidden="true">
      <defs>
        <linearGradient id="ph-case" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2d3342" />
          <stop offset="1" stopColor="#12151d" />
        </linearGradient>
        <linearGradient id="ph-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#232936" />
          <stop offset="1" stopColor="#171b25" />
        </linearGradient>
        <linearGradient id="ph-bud" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b4252" />
          <stop offset="1" stopColor="#1a1e28" />
        </linearGradient>
      </defs>
      <ellipse cx="148" cy="196" rx="104" ry="10" fill="#000" opacity="0.35" />
      {/* open lid behind the case */}
      <rect x="92" y="16" width="128" height="60" rx="18" fill="url(#ph-lid)" stroke="#39404f" strokeOpacity="0.5" />
      <rect x="102" y="25" width="108" height="42" rx="12" fill="#0c0e14" />
      {/* buds seated in the case, protruding above the rim */}
      <g>
        <ellipse cx="132" cy="53" rx="12" ry="19" fill="url(#ph-bud)" stroke="#4d5668" strokeOpacity="0.5" />
        <ellipse cx="128" cy="45" rx="4" ry="7" fill="#fff" opacity="0.1" />
      </g>
      <g transform="rotate(12 182 60)">
        <ellipse cx="182" cy="60" rx="12" ry="19" fill="url(#ph-bud)" stroke="#4d5668" strokeOpacity="0.5" />
        <ellipse cx="178" cy="52" rx="4" ry="7" fill="#fff" opacity="0.1" />
      </g>
      {/* case body */}
      <rect x="86" y="70" width="140" height="94" rx="24" fill="url(#ph-case)" stroke="#414a5c" strokeOpacity="0.6" />
      {/* rim shadow line */}
      <path d="M98 76h116" stroke="#0a0c11" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.8" />
      {/* charge LED */}
      <circle cx="156" cy="146" r="3.2" fill="#3ddc84" />
      {/* one bud lying in front */}
      <g transform="translate(56 168) rotate(-108)">
        <rect x="-6.5" y="12" width="13" height="40" rx="6.5" fill="url(#ph-bud)" />
        <rect x="-6.5" y="45" width="13" height="8" rx="4" fill="#5d6779" />
        <ellipse cx="0" cy="0" rx="16" ry="19" fill="url(#ph-bud)" stroke="#4d5668" strokeOpacity="0.55" />
        <ellipse cx="-5" cy="-7" rx="5" ry="8" fill="#fff" opacity="0.09" />
      </g>
    </svg>
  )
}

interface FavoriteProps {
  isFavorite: (id: string) => boolean
  onToggleFavorite: (id: string) => void
}

interface DealCardProps extends FavoriteProps {
  product: Product
}

function DealCard({ product, isFavorite, onToggleFavorite }: DealCardProps) {
  const { language, t, tr } = useLanguage()
  const favorite = isFavorite(product.id)
  const badge = storeBadge[product.store]

  return (
    <article className="lock-card">
      <span className="lock-chip">
        LOCKED ON
        <svg viewBox="0 0 14 12" width="13" height="11" aria-hidden="true">
          <rect x="0" y="8" width="2.4" height="4" fill="currentColor" />
          <rect x="3.8" y="5.5" width="2.4" height="6.5" fill="currentColor" />
          <rect x="7.6" y="3" width="2.4" height="9" fill="currentColor" />
          <rect x="11.4" y="0" width="2.4" height="12" fill="currentColor" />
        </svg>
      </span>

      {product.discountPercent && (
        <span className="lock-discount">-{product.discountPercent}%</span>
      )}

      <button
        className={`lock-fav ${favorite ? 'active' : ''}`}
        onClick={() => onToggleFavorite(product.id)}
        aria-pressed={favorite}
        aria-label={favorite ? t('removeFavorite') : t('addFavorite')}
      >
        {favorite ? '♥' : '♡'}
      </button>

      <div className="lock-media">
        {product.image ? <img src={product.image} alt="" /> : <EarbudsArt />}
      </div>

      <h3 className="lock-title">{tr(product.title)}</h3>
      {product.variant && <p className="lock-variant">{tr(product.variant)}</p>}

      <div className="lock-meta">
        <span className="lock-store">
          <span className={`store-ico ${badge.className}`} aria-hidden="true">
            {badge.mark}
          </span>
          {product.store}
        </span>
        <span className="lock-rating">
          <span aria-hidden="true">★</span> {product.rating.toFixed(1)}
          {product.ratingCount !== undefined && <em> ({product.ratingCount})</em>}
        </span>
      </div>

      <div className="lock-prices">
        {product.oldPrice && <s>{formatPrice(product.oldPrice, language, 2)}</s>}
        <strong>{formatPrice(product.price, language, 2)}</strong>
      </div>

      <div className="lock-best">
        <span className="lock-best-dot" aria-hidden="true" />
        {t('bestPrice')}
      </div>
    </article>
  )
}

export function HeroLockCard({ isFavorite, onToggleFavorite }: FavoriteProps) {
  const activeDeal = heroDeals[0]

  return (
    <div className="lock-stage">
      <HudBackdrop />

      {storeHighlights.map((highlight) => (
        <span key={highlight.store} className={`float-pill ${highlight.className}`}>
          <span className="fp-value">-{highlight.discount}%</span>
          <span className="fp-store">{highlight.store}</span>
        </span>
      ))}

      <div className="lock-frame">
        <span className="lock-bracket b-tl" />
        <span className="lock-bracket b-tr" />
        <span className="lock-bracket b-bl" />
        <span className="lock-bracket b-br" />

        <DealCard
          product={activeDeal}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    </div>
  )
}
