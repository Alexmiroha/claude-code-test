import type { Product } from '../types/product'

export type SortMode = 'bestOffer' | 'priceAsc' | 'priceDesc' | 'bestDiscount'

/** Display order for the sort chips. */
export const sortModes: SortMode[] = [
  'bestOffer',
  'priceAsc',
  'priceDesc',
  'bestDiscount',
]

/**
 * Real discounts dominate (~0–210), then sales volume, then rating;
 * log10 keeps thousand-sale items from drowning out everything else.
 */
function bestOfferScore(p: Product): number {
  return (
    (p.discountPercent ?? 0) * 3 +
    Math.log10(1 + (p.salesCount ?? 0)) * 10 +
    (p.rating ?? 0) * 4
  )
}

const comparators: Record<SortMode, (a: Product, b: Product) => number> = {
  bestOffer: (a, b) =>
    bestOfferScore(b) - bestOfferScore(a) || a.price - b.price,
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
  bestDiscount: (a, b) =>
    (b.discountPercent ?? 0) - (a.discountPercent ?? 0) ||
    (b.salesCount ?? 0) - (a.salesCount ?? 0) ||
    a.price - b.price,
}

/**
 * Returns a new sorted array; the input is never mutated. Sort is stable, so
 * ties keep curated catalog order. A stale persisted mode (e.g. after a
 * rename) falls back to bestOffer instead of JS's lexicographic default.
 */
export function sortProducts(products: Product[], mode: SortMode): Product[] {
  const compare = comparators[mode] ?? comparators.bestOffer
  return [...products].sort(compare)
}
