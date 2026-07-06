import type { Language } from '../types/product'

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
]

const dictionary = {
  // Header
  navDeals: {
    pl: 'Okazje',
    en: 'Deals',
    uk: 'Знижки',
  },
  navCategories: {
    pl: 'Kategorie',
    en: 'Categories',
    uk: 'Категорії',
  },
  navGuides: {
    pl: 'Poradniki',
    en: 'Guides',
    uk: 'Поради',
  },
  searchPlaceholder: {
    pl: 'Szukaj produktów, np. słuchawki…',
    en: 'Search products, e.g. headphones…',
    uk: 'Шукати товари, напр. навушники…',
  },
  favorites: {
    pl: 'Ulubione',
    en: 'Favorites',
    uk: 'Улюблені',
  },
  themeToDark: {
    pl: 'Przełącz na tryb ciemny',
    en: 'Switch to dark mode',
    uk: 'Увімкнути темний режим',
  },
  themeToLight: {
    pl: 'Przełącz na tryb jasny',
    en: 'Switch to light mode',
    uk: 'Увімкнути світлий режим',
  },

  // Hero
  heroTagline: {
    pl: 'Namierzaj. Blokuj. Oszczędzaj.',
    en: 'Track. Lock. Save.',
    uk: 'Знаходь. Фіксуй. Заощаджуй.',
  },
  heroTitle: {
    pl: 'Poluj na najlepsze promocje',
    en: 'Hunt better deals',
    uk: 'Полюй на найкращі знижки',
  },
  heroSubtitle: {
    pl: 'PromoHunter śledzi ceny w setkach sklepów i namierza najkorzystniejsze oferty specjalnie dla Ciebie.',
    en: 'PromoHunter tracks prices across hundreds of stores and locks in the best offers just for you.',
    uk: 'PromoHunter відстежує ціни в сотнях магазинів і фіксує найвигідніші пропозиції саме для тебе.',
  },
  heroCta: {
    pl: 'Zobacz dzisiejsze okazje',
    en: 'See today’s deals',
    uk: 'Дивитися сьогоднішні знижки',
  },
  heroSecondaryCta: {
    pl: 'Przeglądaj kategorie',
    en: 'Browse categories',
    uk: 'Переглянути категорії',
  },
  trustLine: {
    pl: 'Aktualne promocje • Sprawdzone sklepy • Codzienna aktualizacja',
    en: 'Fresh deals • Verified stores • Updated daily',
    uk: 'Актуальні знижки • Перевірені магазини • Щоденне оновлення',
  },
  bestPrice: {
    pl: 'Najlepsza cena',
    en: 'Best price',
    uk: 'Найкраща ціна',
  },
  valueFindTitle: {
    pl: 'Znajdujemy',
    en: 'We find',
    uk: 'Ми знаходимо',
  },
  valueFindText: {
    pl: 'śledzimy ceny 24/7',
    en: 'tracking prices 24/7',
    uk: 'відстежуємо ціни 24/7',
  },
  valueLockTitle: {
    pl: 'Blokujemy',
    en: 'We lock',
    uk: 'Ми фіксуємо',
  },
  valueLockText: {
    pl: 'najlepsze promocje',
    en: 'the best discounts',
    uk: 'найкращі знижки',
  },
  valueSaveTitle: {
    pl: 'Oszczędzasz',
    en: 'You save',
    uk: 'Ти заощаджуєш',
  },
  valueSaveText: {
    pl: 'więcej każdego dnia',
    en: 'more every day',
    uk: 'більше щодня',
  },

  // Stats
  statsProducts: {
    pl: 'wyselekcjonowanych produktów',
    en: 'hand-picked products',
    uk: 'відібраних товарів',
  },
  statsCategories: {
    pl: 'kategorii',
    en: 'categories',
    uk: 'категорій',
  },
  statsMaxDiscount: {
    pl: 'maksymalny rabat',
    en: 'top discount',
    uk: 'максимальна знижка',
  },
  statsStores: {
    pl: 'sprawdzonych sklepów',
    en: 'trusted stores',
    uk: 'перевірених магазинів',
  },

  // Sections
  hotPicksTitle: {
    pl: 'Gorące okazje z katalogu',
    en: 'Hot picks from the catalog',
    uk: 'Гарячі пропозиції з каталогу',
  },
  categoriesTitle: {
    pl: 'Przeglądaj według kategorii',
    en: 'Browse by category',
    uk: 'Перегляд за категоріями',
  },
  allCategories: {
    pl: 'Wszystkie',
    en: 'All',
    uk: 'Усі',
  },
  storesTitle: {
    pl: 'Sklepy',
    en: 'Stores',
    uk: 'Магазини',
  },
  allStores: {
    pl: 'Wszystkie',
    en: 'All',
    uk: 'Усі',
  },
  clearFilters: {
    pl: 'Wyczyść filtry',
    en: 'Clear filters',
    uk: 'Очистити фільтри',
  },
  sortTitle: {
    pl: 'Sortuj według',
    en: 'Sort by',
    uk: 'Сортувати за',
  },
  sortBestOffer: {
    pl: 'Najlepsza okazja',
    en: 'Best offer',
    uk: 'Найкраща пропозиція',
  },
  sortLowestPrice: {
    pl: 'Najniższa cena',
    en: 'Lowest price',
    uk: 'Найнижча ціна',
  },
  sortHighestPrice: {
    pl: 'Najwyższa cena',
    en: 'Highest price',
    uk: 'Найвища ціна',
  },
  sortBestDiscount: {
    pl: 'Największy rabat',
    en: 'Best discount',
    uk: 'Найбільша знижка',
  },
  allDealsTitle: {
    pl: 'Wszystkie okazje',
    en: 'All deals',
    uk: 'Усі пропозиції',
  },
  showFavoritesOnly: {
    pl: 'Tylko ulubione',
    en: 'Favorites only',
    uk: 'Лише улюблені',
  },
  emptyTitle: {
    pl: 'Brak wyników',
    en: 'No results',
    uk: 'Нічого не знайдено',
  },
  emptySubtitle: {
    pl: 'Zmień frazę wyszukiwania lub dobierz inne filtry kategorii i sklepu.',
    en: 'Try a different search phrase or adjust the category and store filters.',
    uk: 'Змініть пошуковий запит або підберіть інші фільтри категорії та магазину.',
  },
  emptyFavorites: {
    pl: 'Nie masz jeszcze ulubionych. Kliknij ♥ na karcie produktu, aby zapisać okazję.',
    en: 'No favorites yet. Tap ♥ on a product card to save a deal.',
    uk: 'Поки немає улюблених. Натисніть ♥ на картці товару, щоб зберегти знижку.',
  },
  /** Placeholders {visible} and {total} are replaced at render time. */
  showingProducts: {
    pl: 'Pokazujesz {visible} z {total} produktów',
    en: 'Showing {visible} of {total} products',
    uk: 'Показано {visible} з {total} товарів',
  },
  loadMore: {
    pl: 'Pokaż więcej',
    en: 'Load more',
    uk: 'Показати ще',
  },

  // Product details modal
  productDetails: {
    pl: 'Szczegóły produktu',
    en: 'Product details',
    uk: 'Деталі товару',
  },
  categoryLabel: {
    pl: 'Kategoria',
    en: 'Category',
    uk: 'Категорія',
  },
  storeLabel: {
    pl: 'Sklep',
    en: 'Store',
    uk: 'Магазин',
  },
  ratingLabel: {
    pl: 'Ocena',
    en: 'Rating',
    uk: 'Рейтинг',
  },
  salesLabel: {
    pl: 'Sprzedaż',
    en: 'Sales',
    uk: 'Продажі',
  },
  productIdLabel: {
    pl: 'ID produktu',
    en: 'Product ID',
    uk: 'ID товару',
  },
  openDeal: {
    pl: 'Otwórz ofertę',
    en: 'Open deal',
    uk: 'Відкрити пропозицію',
  },
  closeDetails: {
    pl: 'Zamknij szczegóły produktu',
    en: 'Close product details',
    uk: 'Закрити деталі товару',
  },
  prevProduct: {
    pl: 'Poprzedni produkt',
    en: 'Previous product',
    uk: 'Попередній товар',
  },
  nextProduct: {
    pl: 'Następny produkt',
    en: 'Next product',
    uk: 'Наступний товар',
  },

  // Product card
  addFavorite: {
    pl: 'Dodaj do ulubionych',
    en: 'Add to favorites',
    uk: 'Додати до улюблених',
  },
  removeFavorite: {
    pl: 'Usuń z ulubionych',
    en: 'Remove from favorites',
    uk: 'Прибрати з улюблених',
  },
  goToStore: {
    pl: 'Przejdź do sklepu',
    en: 'Go to store',
    uk: 'Перейти до магазину',
  },
  featuredBadge: {
    pl: 'HIT',
    en: 'HOT',
    uk: 'ХІТ',
  },

  // Guides
  guidesTitle: {
    pl: 'Poradniki łowcy okazji',
    en: 'Deal hunter guides',
    uk: 'Гайди мисливця за знижками',
  },
  guidesSubtitle: {
    pl: 'Krótkie poradniki, które pomagają płacić mniej.',
    en: 'Short guides that help you pay less.',
    uk: 'Короткі поради, які допомагають платити менше.',
  },
  closeArticle: {
    pl: 'Zamknij artykuł',
    en: 'Close article',
    uk: 'Закрити статтю',
  },
  readMore: {
    pl: 'Czytaj więcej',
    en: 'Read more',
    uk: 'Читати далі',
  },

  // Footer
  footerAbout: {
    pl: 'PromoHunter to katalog promocji i okazji z popularnych sklepów internetowych. Namierzamy rabaty, żebyś Ty nie musiał.',
    en: 'PromoHunter is a catalog of promotions and deals from popular online stores. We track the discounts so you don’t have to.',
    uk: 'PromoHunter — це каталог акцій та знижок із популярних інтернет-магазинів. Ми відстежуємо знижки, щоб вам не довелося.',
  },
  footerDisclosure: {
    pl: 'Linki w serwisie mogą być linkami afiliacyjnymi. Kupując przez nie, wspierasz rozwój PromoHunter bez dodatkowych kosztów.',
    en: 'Links on this site may be affiliate links. Buying through them supports PromoHunter at no extra cost to you.',
    uk: 'Посилання на сайті можуть бути партнерськими. Купуючи через них, ви підтримуєте PromoHunter без додаткових витрат.',
  },
  footerSections: {
    pl: 'Nawigacja',
    en: 'Navigation',
    uk: 'Навігація',
  },
  footerRights: {
    pl: 'Wszelkie prawa zastrzeżone.',
    en: 'All rights reserved.',
    uk: 'Усі права захищено.',
  },
} as const

export type TranslationKey = keyof typeof dictionary

export function translate(key: TranslationKey, language: Language): string {
  return dictionary[key][language]
}
