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
  featuredTitle: {
    pl: 'Najlepsze okazje dnia',
    en: 'Best deals today',
    uk: 'Найкращі пропозиції дня',
  },
  featuredSubtitle: {
    pl: 'Ręcznie wybrane promocje o największych rabatach.',
    en: 'Hand-picked promotions with the biggest discounts.',
    uk: 'Відібрані вручну акції з найбільшими знижками.',
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
    pl: 'Zmień frazę wyszukiwania lub wybierz inną kategorię.',
    en: 'Try a different search phrase or pick another category.',
    uk: 'Змініть пошуковий запит або виберіть іншу категорію.',
  },
  emptyFavorites: {
    pl: 'Nie masz jeszcze ulubionych. Kliknij ♥ na karcie produktu, aby zapisać okazję.',
    en: 'No favorites yet. Tap ♥ on a product card to save a deal.',
    uk: 'Поки немає улюблених. Натисніть ♥ на картці товару, щоб зберегти знижку.',
  },
  resultsCount: {
    pl: 'znalezionych okazji',
    en: 'deals found',
    uk: 'знайдених пропозицій',
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
    pl: 'Poradniki łowcy promocji',
    en: 'Deal hunter guides',
    uk: 'Поради мисливця за знижками',
  },
  guidesSubtitle: {
    pl: 'Krótkie przewodniki, dzięki którym zapłacisz mniej.',
    en: 'Short guides that help you pay less.',
    uk: 'Короткі гайди, які допоможуть платити менше.',
  },
  guide1Title: {
    pl: 'Jak sprawdzić, czy promocja jest prawdziwa',
    en: 'How to check if a discount is real',
    uk: 'Як перевірити, чи знижка справжня',
  },
  guide1Text: {
    pl: 'Historia cen, porównywarki i trzy sygnały ostrzegawcze sztucznych przecen.',
    en: 'Price history, comparison tools and three red flags of fake markdowns.',
    uk: 'Історія цін, порівняння та три ознаки фальшивих знижок.',
  },
  guide2Title: {
    pl: 'Najlepsze dni na zakupy w elektronice',
    en: 'Best days to buy electronics',
    uk: 'Найкращі дні для купівлі електроніки',
  },
  guide2Text: {
    pl: 'Kiedy sklepy naprawdę obniżają ceny — kalendarz wyprzedaży na cały rok.',
    en: 'When stores actually cut prices — a sale calendar for the whole year.',
    uk: 'Коли магазини справді знижують ціни — календар розпродажів на рік.',
  },
  guide3Title: {
    pl: 'Kupony i cashback: podwójne oszczędzanie',
    en: 'Coupons and cashback: double savings',
    uk: 'Купони та кешбек: подвійна економія',
  },
  guide3Text: {
    pl: 'Jak łączyć kody rabatowe z cashbackiem, żeby zejść z ceny jeszcze niżej.',
    en: 'How to stack promo codes with cashback to push the price even lower.',
    uk: 'Як поєднувати промокоди з кешбеком, щоб платити ще менше.',
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
