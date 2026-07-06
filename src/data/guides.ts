import guidesJson from '../../deal_hunter_guides/deal-hunter-guides-content.json'
import type { Language, Translated } from '../types/product'

/*
 * Deal-hunter guide posts. deal_hunter_guides/deal-hunter-guides-content.json
 * is the content source of truth; its `content` fields use a small Markdown
 * subset (#/## headings, paragraphs, "- " lists, **bold**) that is parsed
 * into structured blocks here — no Markdown library needed.
 */

interface RawGuidePost {
  id: string
  slug: string
  title: string
  card_title: string
  card_description: string
  content: string
}

export type GuideBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }

export interface GuidePost {
  id: string
  icon: string
  title: Translated
  cardTitle: Translated
  cardDescription: Translated
  content: Record<Language, GuideBlock[]>
}

const rawPosts = guidesJson.posts as Record<Language, RawGuidePost[]>

const guideIcons: Record<string, string> = {
  '01': '🔍',
  '02': '⏳',
  '03': '📦',
}

const languages: Language[] = ['pl', 'en', 'uk']

function parseContent(markdown: string): GuideBlock[] {
  const blocks: GuideBlock[] = []
  let list: string[] | null = null

  for (const rawLine of markdown.split('\n')) {
    const line = rawLine.trim()

    if (line.startsWith('- ')) {
      if (!list) {
        list = []
        blocks.push({ type: 'list', items: list })
      }
      list.push(line.slice(2))
      continue
    }

    list = null
    if (!line) continue
    /* The leading "# title" repeats the post title, which the modal header renders. */
    if (line.startsWith('# ')) continue
    if (line.startsWith('## ')) {
      blocks.push({ type: 'heading', text: line.slice(3) })
      continue
    }
    blocks.push({ type: 'paragraph', text: line })
  }

  return blocks
}

export const guidePosts: GuidePost[] = rawPosts.en.map((enPost, index) => {
  const perLanguage = (pick: (post: RawGuidePost) => string): Translated =>
    Object.fromEntries(
      languages.map((lang) => [lang, pick(rawPosts[lang][index])]),
    ) as Translated

  return {
    id: enPost.id,
    icon: guideIcons[enPost.id] ?? '📘',
    title: perLanguage((post) => post.title),
    cardTitle: perLanguage((post) => post.card_title),
    cardDescription: perLanguage((post) => post.card_description),
    content: Object.fromEntries(
      languages.map((lang) => [lang, parseContent(rawPosts[lang][index].content)]),
    ) as Record<Language, GuideBlock[]>,
  }
})
