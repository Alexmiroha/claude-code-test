import type { Language } from '../types/product'

const locales: Record<Language, string> = {
  pl: 'pl-PL',
  en: 'en-GB',
  uk: 'uk-UA',
}

/** All mock prices are in PLN; only the locale formatting changes. */
export function formatPrice(
  value: number,
  language: Language,
  decimals = 0,
): string {
  return new Intl.NumberFormat(locales[language], {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}
