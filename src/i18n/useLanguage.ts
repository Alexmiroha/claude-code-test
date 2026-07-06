import { createContext, useContext } from 'react'
import type { Language, Translated } from '../types/product'
import type { TranslationKey } from './translations'

export interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  /** Translate a UI string by key. */
  t: (key: TranslationKey) => string
  /** Pick the current language variant from a translated data field. */
  tr: (field: Translated) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext)
  if (!value) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return value
}
