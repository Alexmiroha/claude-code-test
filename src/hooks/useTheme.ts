import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export type Theme = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('promohunter.theme', 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
