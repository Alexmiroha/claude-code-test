import { useMemo, useState } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/hero/Hero'
import { StatsBar } from './components/StatsBar'
import { CategoryFilter } from './components/categories/CategoryFilter'
import { AllDeals, FeaturedDeals } from './components/products/ProductGrid'
import { GuidesTeaser } from './components/GuidesTeaser'
import { LanguageProvider } from './i18n/LanguageContext'
import { useLanguage } from './i18n/useLanguage'
import { useTheme } from './hooks/useTheme'
import { useFavorites } from './hooks/useFavorites'
import { products } from './data/products'

function AppContent() {
  const { language } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  )
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return products.filter((product) => {
      if (showFavoritesOnly && !favoriteIds.includes(product.id)) return false
      if (selectedCategoryId && product.categoryId !== selectedCategoryId)
        return false
      if (query) {
        const haystack =
          `${product.title[language]} ${product.description[language]} ${product.store}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }
      return true
    })
  }, [searchQuery, selectedCategoryId, showFavoritesOnly, favoriteIds, language])

  return (
    <>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoritesCount={favoriteIds.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly((v) => !v)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main>
        <Hero isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
        <StatsBar />
        <FeaturedDeals
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
        <CategoryFilter
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
        <AllDeals
          filteredProducts={filteredProducts}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavoritesOnly={() => setShowFavoritesOnly((v) => !v)}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
        <GuidesTeaser />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
