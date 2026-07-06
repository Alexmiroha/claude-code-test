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
  description: Translated
  store: Store
  categoryId: string
  /** Placeholder for a real image URL; SVG gradient is rendered when empty. */
  image: string
  price: number
  oldPrice?: number
  discountPercent?: number
  affiliateUrl: string
  featured?: boolean
  rating: number
  ratingCount?: number
  /** Variant label shown on the hero deal card (e.g. color). */
  variant?: Translated
}
