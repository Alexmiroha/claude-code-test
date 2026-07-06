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
import { useLocalStorage } from './hooks/useLocalStorage'
import {
  catalogProducts,
  catalogCategories,
  recommendedCategory,
} from './data/catalog/catalogAdapter'
import { sortProducts } from './utils/sortProducts'
import type { SortMode } from './utils/sortProducts'
import type { Store } from './types/product'

const INITIAL_PRODUCT_LIMIT = 24
const PRODUCT_LOAD_STEP = 24

function AppContent() {
  const { language } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  )
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [selectedSort, setSelectedSort] = useLocalStorage<SortMode>(
    'promohunter.sort',
    'bestOffer',
  )
  const [visibleCount, setVisibleCount] = useState(INITIAL_PRODUCT_LIMIT)

  /* Any filter or sort change restarts pagination from the first page. */
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setVisibleCount(INITIAL_PRODUCT_LIMIT)
  }

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId)
    setVisibleCount(INITIAL_PRODUCT_LIMIT)
  }

  const handleSelectStore = (store: Store | null) => {
    setSelectedStore(store)
    setVisibleCount(INITIAL_PRODUCT_LIMIT)
  }

  const handleSelectSort = (sort: SortMode) => {
    setSelectedSort(sort)
    setVisibleCount(INITIAL_PRODUCT_LIMIT)
  }

  const toggleFavoritesOnly = () => {
    setShowFavoritesOnly((v) => !v)
    setVisibleCount(INITIAL_PRODUCT_LIMIT)
  }

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategoryId !== null ||
    selectedStore !== null ||
    showFavoritesOnly

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategoryId(null)
    setSelectedStore(null)
    setShowFavoritesOnly(false)
    setVisibleCount(INITIAL_PRODUCT_LIMIT)
  }

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const categoryNames = new Map(
      catalogCategories.map((c) => [c.id, c.name[language]]),
    )
    return catalogProducts.filter((product) => {
      if (showFavoritesOnly && !favoriteIds.includes(product.id)) return false
      if (selectedCategoryId === recommendedCategory.id) {
        if (!product.isRecommended) return false
      } else if (selectedCategoryId && product.categoryId !== selectedCategoryId) {
        return false
      }
      if (selectedStore && product.store !== selectedStore) return false
      if (query) {
        const haystack = [
          product.title[language],
          product.description?.[language] ?? '',
          product.store,
          categoryNames.get(product.categoryId) ?? '',
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(query)) return false
      }
      return true
    })
  }, [
    searchQuery,
    selectedCategoryId,
    selectedStore,
    showFavoritesOnly,
    favoriteIds,
    language,
  ])

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, selectedSort),
    [filteredProducts, selectedSort],
  )

  const visibleProducts = sortedProducts.slice(0, visibleCount)
  const hasMoreProducts = visibleCount < sortedProducts.length

  return (
    <>
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        favoritesCount={favoriteIds.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={toggleFavoritesOnly}
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
          onSelectCategory={handleSelectCategory}
          selectedStore={selectedStore}
          onSelectStore={handleSelectStore}
          selectedSort={selectedSort}
          onSelectSort={handleSelectSort}
        />
        <AllDeals
          products={visibleProducts}
          totalCount={sortedProducts.length}
          hasMoreProducts={hasMoreProducts}
          onLoadMore={() => setVisibleCount((count) => count + PRODUCT_LOAD_STEP)}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavoritesOnly={toggleFavoritesOnly}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
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
