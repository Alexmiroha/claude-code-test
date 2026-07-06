import type { Category } from '../types/product'

export const categories: Category[] = [
  {
    id: 'electronics',
    name: { pl: 'Elektronika', en: 'Electronics', uk: 'Електроніка' },
    icon: '📱',
  },
  {
    id: 'gaming',
    name: { pl: 'Gaming', en: 'Gaming', uk: 'Геймінг' },
    icon: '🎮',
  },
  {
    id: 'home',
    name: { pl: 'Dom i ogród', en: 'Home & Garden', uk: 'Дім і сад' },
    icon: '🏠',
  },
  {
    id: 'fashion',
    name: { pl: 'Moda', en: 'Fashion', uk: 'Мода' },
    icon: '👟',
  },
  {
    id: 'sport',
    name: { pl: 'Sport', en: 'Sports', uk: 'Спорт' },
    icon: '🏋️',
  },
  {
    id: 'accessories',
    name: { pl: 'Akcesoria', en: 'Accessories', uk: 'Аксесуари' },
    icon: '🎧',
  },
]
