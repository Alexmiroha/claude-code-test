import { useCallback, type ReactNode } from 'react'
import type { Language, Translated } from '../types/product'
import { translate, type TranslationKey } from './translations'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { LanguageContext } from './useLanguage'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useLocalStorage<Language>(
    'promohunter.language',
    'pl',
  )

  const t = useCallback(
    (key: TranslationKey) => translate(key, language),
    [language],
  )
  const tr = useCallback((field: Translated) => field[language], [language])

  return (
    <LanguageContext value={{ language, setLanguage, t, tr }}>
      {children}
    </LanguageContext>
  )
}
