import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Shared dialog behavior: focus the initial control on open, restore focus
 * to the opener on close, lock body scroll, close on Escape, and keep
 * Tab/Shift+Tab cycling inside the dialog.
 */
export function useModalDialog(
  dialogRef: RefObject<HTMLElement | null>,
  initialFocusRef: RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    initialFocusRef.current?.focus()

    return () => {
      opener?.focus()
    }
  }, [initialFocusRef])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])',
          ),
        )
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const active = document.activeElement
        const activeInDialog =
          active instanceof HTMLElement && dialogRef.current.contains(active)

        if (event.shiftKey && (!activeInDialog || active === first)) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && (!activeInDialog || active === last)) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dialogRef, onClose])
}
