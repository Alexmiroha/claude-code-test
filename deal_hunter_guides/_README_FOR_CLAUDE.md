# Deal hunter guides — content package

This package contains three deal-hunter guide posts in three languages:

- Polish: `pl-*`
- English: `en-*`
- Ukrainian: `uk-*`

## File structure

There are two formats:

1. **9 separate Markdown files** — one post per language.
2. **3 combined Markdown files** — all posts in one file per language:
   - `pl-deal-hunter-guides-all.md`
   - `en-deal-hunter-guides-all.md`
   - `uk-deal-hunter-guides-all.md`

There is also a JSON file for easier website integration:

- `deal-hunter-guides-content.json`

## Suggested implementation task for Claude

Use these files to replace the placeholder cards in the “Deal hunter guides” section with real posts.

Recommended behavior:

- Keep 3 cards visible on the main page.
- Each card should use:
  - `card_title`
  - `card_description`
  - `slug`
- On click, open a full post page or modal.
- Use the currently selected language of the site:
  - `pl`
  - `en`
  - `uk`
- Preserve the current dark visual style.
- Make the post pages readable, with clean headings, spacing, and mobile-friendly layout.
