import type { SimpleTab, VideoVariant } from '../types/content'
import './SimpleVideoView.css'

interface SimpleVideoViewProps {
  tab: SimpleTab
  onPlay: (variant: VideoVariant) => void
}

export function SimpleVideoView({ tab, onPlay }: SimpleVideoViewProps) {
  return (
    <div className="variant-grid">
      {tab.variants.map((variant) => (
        <div key={variant.id} className="variant-card">
          <div className="variant-card__thumb">
            <span className="variant-card__tag">{variant.tag ?? variant.label}</span>
            <button
              type="button"
              className="variant-card__play-overlay"
              onClick={() => onPlay(variant)}
              aria-label={`Play ${variant.label}`}
            >
              <span className="variant-card__play-button">
                <span className="variant-card__play-icon" aria-hidden="true" />
              </span>
            </button>
          </div>
          <div className="variant-card__body">
            <div className="variant-card__label">{variant.label}</div>
            {variant.description && <p className="variant-card__description">{variant.description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
