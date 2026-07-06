export type Language = 'pl' | 'en' | 'uk'

export type Translated = Record<Language, string>

export type Store =
  | 'AliExpress'
  | 'x-kom'
  | 'Media Expert'
  | 'Amazon'
  | 'Allegro'
  | 'Temu'

export interface Category {
  id: string
  name: Translated
  icon: string
}

export interface Product {
  id: string
  title: Translated
  /** Optional: imported catalog entries often have no description yet. */
  description?: Translated
  store: Store
  categoryId: string
  /** Image URL (remote or local); SVG gradient is rendered when empty. */
  image: string
  price: number
  oldPrice?: number
  discountPercent?: number
  affiliateUrl: string
  /** Shown in the "Best deals today" section. */
  featured?: boolean
  /** Owner's pick — shown in the virtual "My Recommendations" category. */
  isRecommended?: boolean
  /** 1–5 scale; for imported products converted from positive-feedback %. */
  rating?: number
  ratingCount?: number
  /** 180-day sales count — popularity signal from the imported catalog. */
  salesCount?: number
  /** Variant label shown on the hero deal card (e.g. color). */
  variant?: Translated
}
