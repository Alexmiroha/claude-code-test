import { useRef } from 'react'
import { useModalDialog } from '../hooks/useModalDialog'
import { useLanguage } from '../i18n/useLanguage'
import type { GuideBlock, GuidePost } from '../data/guides'
import './GuideModal.css'

/** Renders **bold** spans; the only inline markup the guide content uses. */
function InlineText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
      )}
    </>
  )
}

function Block({ block }: { block: GuideBlock }) {
  if (block.type === 'heading') {
    return (
      <h3>
        <InlineText text={block.text} />
      </h3>
    )
  }
  if (block.type === 'list') {
    return (
      <ul>
        {block.items.map((item, index) => (
          <li key={index}>
            <InlineText text={item} />
          </li>
        ))}
      </ul>
    )
  }
  return (
    <p>
      <InlineText text={block.text} />
    </p>
  )
}

interface GuideModalProps {
  guide: GuidePost
  onClose: () => void
}

export function GuideModal({ guide, onClose }: GuideModalProps) {
  const { language, t, tr } = useLanguage()
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useModalDialog(dialogRef, closeButtonRef, onClose)

  return (
    <div
      ref={dialogRef}
      className="guide-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={tr(guide.title)}
      onClick={onClose}
    >
      <article
        className="guide-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="guide-close"
          onClick={onClose}
          aria-label={t('closeArticle')}
          title={t('closeArticle')}
        >
          <span aria-hidden="true">✕</span>
        </button>

        <header className="guide-article-head">
          <span className="guide-icon" aria-hidden="true">
            {guide.icon}
          </span>
          <h2>{tr(guide.title)}</h2>
        </header>

        <div className="guide-article-body">
          {guide.content[language].map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>
      </article>
    </div>
  )
}
