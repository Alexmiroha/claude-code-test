import rawCatalogJson from './rawProducts.generated.json'
import rawMetadataJson from './productMetadata.json'
import rawCategoriesJson from './rawCategories.json'
import { products as curatedProducts } from '../products'
import type { Category, Product, Store, Translated } from '../../types/product'

/*
 * Adapter for the imported old-project catalog.
 * rawProducts.generated.json is the raw affiliate export;
 * productMetadata.json is the curation/override layer (wins per field);
 * rawCategories.json is the category source.
 */

interface RawLang {
  en: string
  pl: string
  /** Old data uses `ua`; the app uses `uk`. */
  ua: string
}

interface RawPrice {
  currency: string
  origin: number
  discount: number
  discountLabel: string
}

interface RawStats {
  sales180Day: number
  positiveFeedback: number
  directCommissionRate: number
  estimatedDirectCommission: number
}

interface RawProduct {
  id: string
  productId: string
  platform: string
  affiliateUrl: string
  imageUrl: string
  localImage: string
  videoUrl: string
  videoCode: string
  title: RawLang
  description: RawLang
  categoryId: string
  isRecommended: boolean
  price: RawPrice
  stats: RawStats
  searchText: string
  sortOrder: number
}

interface RawProductMeta {
  productId: string
  categoryId: string
  isVisible?: boolean
  isRecommended?: boolean
  videoCode: string
  localImage: string
  title: RawLang
  description: RawLang
  sortOrder: number
}

interface RawCategory {
  id: string
  slug: string
  virtual?: boolean
  title: RawLang
}

const rawProducts = (rawCatalogJson as unknown as { products: RawProduct[] })
  .products
const rawMetadata = rawMetadataJson as unknown as RawProductMeta[]
const rawCategories = rawCategoriesJson as unknown as RawCategory[]

const metadataById = new Map(rawMetadata.map((m) => [m.productId, m]))

const platformToStore: Record<string, Store> = {
  aliexpress: 'AliExpress',
  amazon: 'Amazon',
  allegro: 'Allegro',
  temu: 'Temu',
}

const categoryIcons: Record<string, string> = {
  recommended: '⭐',
  beauty_health: '💄',
  sports_entertainment: '🏋️',
  pet_supplies: '🐾',
  furniture: '🛋️',
  toys_games: '🧸',
  luggage_bags: '🧳',
  home_improvement_lighting: '💡',
  automotive_motorcycle: '🚗',
  accessories: '⌚',
  electronics: '📱',
  shoes: '👟',
  hair_extensions_wigs: '💇',
  phones_telecommunications: '📞',
  babies_kids: '🍼',
  home_garden: '🏠',
  womens_clothing: '👗',
  mens_clothing: '👔',
}

/** Merge metadata over raw per language, then rename ua → uk with EN fallback. */
function toTranslated(raw: RawLang, meta?: RawLang): Translated {
  const en = meta?.en || raw.en
  return {
    en,
    pl: meta?.pl || raw.pl || en,
    uk: meta?.ua || raw.ua || en,
  }
}

function hasText(field: Translated): boolean {
  return Boolean(field.en || field.pl || field.uk)
}

/** Discount is real only when the label parses > 0 and origin beats the price. */
function parseDiscountPercent(price: RawPrice): number | undefined {
  const percent = Number.parseInt(price.discountLabel, 10)
  if (!Number.isFinite(percent) || percent <= 0) return undefined
  if (!(price.origin > price.discount)) return undefined
  return percent
}

function normalizeProduct(raw: RawProduct): Product | null {
  const meta = metadataById.get(raw.productId)
  if (meta?.isVisible === false) return null

  const store = platformToStore[raw.platform]
  if (!store) {
    if (import.meta.env.DEV) {
      console.warn(`catalogAdapter: unknown platform "${raw.platform}", skipping ${raw.id}`)
    }
    return null
  }

  const description = toTranslated(raw.description, meta?.description)
  const discountPercent = parseDiscountPercent(raw.price)
  const positiveFeedback = raw.stats?.positiveFeedback ?? 0

  return {
    id: raw.id || raw.productId,
    title: toTranslated(raw.title, meta?.title),
    description: hasText(description) ? description : undefined,
    store,
    categoryId: meta?.categoryId || raw.categoryId,
    image: meta?.localImage || raw.localImage || raw.imageUrl,
    price: raw.price.discount,
    oldPrice: discountPercent !== undefined ? raw.price.origin : undefined,
    discountPercent,
    affiliateUrl: raw.affiliateUrl,
    /* isRecommended feeds "My Recommendations"; featured ("Best deals today")
       is a separate concept that imported data does not carry. */
    isRecommended: (meta?.isRecommended ?? raw.isRecommended) || undefined,
    rating:
      positiveFeedback > 0 ? Math.round(positiveFeedback / 2) / 10 : undefined,
    salesCount: raw.stats?.sales180Day || undefined,
  }
}

const sortOrderOf = (raw: RawProduct): number =>
  metadataById.get(raw.productId)?.sortOrder ?? raw.sortOrder ?? 0

const importedProducts: Product[] = [...rawProducts]
  .sort((a, b) => sortOrderOf(a) - sortOrderOf(b))
  .map(normalizeProduct)
  .filter((p): p is Product => p !== null)

/** The curated hero deal stays in the public catalog so favorites line up. */
const heroDeal = curatedProducts.find((p) => p.id === 'p21')!

/**
 * Temporary curation layer: owner's picks for "My Recommendations" until
 * productMetadata.json carries isRecommended flags — move these ids there
 * later. Unioned with metadata flags, never replacing them.
 */
const seedRecommendedIds = new Set<string>([
  'p21', // TWS Pro X2 (curated hero deal)
  '1005006860892234', // Ethernet cable stripper, -52%, 27k sales, pf 98
  '1005008146302901', // Heat-shrink tube kit, -33%, 25.5k sales, pf 95.9
  '1005009724921496', // Diagonal pliers, -21%, 89.7k sales, pf 97.4
  '1005010258032623', // Handheld steam cleaner, -19%, 18.5k sales, pf 98
  '1005010131772471', // Lubluelu carpet cleaner, -20%, 8.5k sales, pf 98
  '1005010170431313', // Laresar S7 Pro wet/dry vacuum, -16%, 15k sales, pf 98
])

/** Public catalog: imported products plus the curated hero deal. */
export const catalogProducts: Product[] = [...importedProducts, heroDeal].map(
  (p) =>
    p.isRecommended || seedRecommendedIds.has(p.id)
      ? { ...p, isRecommended: true }
      : p,
)

const productCountByCategory = new Map<string, number>()
for (const product of catalogProducts) {
  productCountByCategory.set(
    product.categoryId,
    (productCountByCategory.get(product.categoryId) ?? 0) + 1,
  )
}

/** Product count per category id, derived from the public catalog. */
export const categoryCounts: ReadonlyMap<string, number> =
  productCountByCategory

/** All non-virtual catalog categories; the category database is the source of truth, so empty categories stay listed. */
export const catalogCategories: Category[] = rawCategories
  .filter((c) => !c.virtual)
  .map((c) => ({
    id: c.id,
    name: toTranslated(c.title),
    icon: categoryIcons[c.id] ?? '🛍️',
  }))

const rawRecommended = rawCategories.find((c) => c.id === 'recommended')!

/** The virtual owner's-picks category; deliberately not in catalogCategories. */
export const recommendedCategory: Category = {
  id: rawRecommended.id,
  name: toTranslated(rawRecommended.title),
  icon: categoryIcons[rawRecommended.id] ?? '⭐',
}

export const recommendedCount = catalogProducts.filter(
  (p) => p.isRecommended,
).length

export interface StoreOption {
  store: Store
  count: number
}

/** Chip display order only — never adds stores that have no products. */
const storeDisplayOrder: Store[] = [
  'AliExpress',
  'x-kom',
  'Media Expert',
  'Amazon',
  'Allegro',
  'Temu',
]

const productCountByStore = new Map<Store, number>()
for (const product of catalogProducts) {
  productCountByStore.set(
    product.store,
    (productCountByStore.get(product.store) ?? 0) + 1,
  )
}

/** Stores present in the public catalog with product counts, in display order. */
export const catalogStores: StoreOption[] = storeDisplayOrder
  .filter((store) => (productCountByStore.get(store) ?? 0) > 0)
  .map((store) => ({ store, count: productCountByStore.get(store)! }))

/**
 * Featured deals: curation flags win; while none are set, fall back to the
 * top 6 by real discount, then by sales volume.
 */
const flagged = catalogProducts.filter((p) => p.featured)

export const featuredProducts: Product[] =
  flagged.length > 0
    ? flagged
    : [...catalogProducts]
        .filter((p) => p.discountPercent !== undefined)
        .sort(
          (a, b) =>
            b.discountPercent! - a.discountPercent! ||
            (b.salesCount ?? 0) - (a.salesCount ?? 0),
        )
        .slice(0, 6)
