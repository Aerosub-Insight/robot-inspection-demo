import { useEffect } from 'react'
import './HotspotDetailModal.css'

interface HotspotDetailModalProps {
  title: string
  description?: string
  onPlay: () => void
  onClose: () => void
}

export function HotspotDetailModal({ title, description, onPlay, onClose }: HotspotDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="hotspot-detail__backdrop" onClick={onClose} role="presentation">
      <div
        className="hotspot-detail__panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="hotspot-detail__header">
          <h2 className="hotspot-detail__title">{title}</h2>
          <button
            type="button"
            className="hotspot-detail__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="hotspot-detail__body">
          {description && <p className="hotspot-detail__description">{description}</p>}
          <button type="button" className="hotspot-detail__play" onClick={onPlay}>
            <span className="hotspot-detail__play-icon" aria-hidden="true">
              ▶
            </span>
            Play inspection footage
          </button>
        </div>
      </div>
    </div>
  )
}
