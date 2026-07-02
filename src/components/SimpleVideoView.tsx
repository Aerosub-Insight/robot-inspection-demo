import { useState } from 'react'
import type { SimpleTab } from '../types/content'
import './SimpleVideoView.css'

interface SimpleVideoViewProps {
  tab: SimpleTab
  onPlay: (videoUrl: string, label: string) => void
}

export function SimpleVideoView({ tab, onPlay }: SimpleVideoViewProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(tab.variants[0]?.id)
  const selectedVariant = tab.variants.find((variant) => variant.id === selectedVariantId) ?? tab.variants[0]

  return (
    <div className="simple-video-view">
      <div className="simple-video-view__card">
        <h2 className="simple-video-view__heading">{tab.label}</h2>

        {tab.variants.length > 1 && (
          <div className="simple-video-view__variants">
            {tab.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                className={`simple-video-view__variant${
                  variant.id === selectedVariant?.id ? ' simple-video-view__variant--active' : ''
                }`}
                onClick={() => setSelectedVariantId(variant.id)}
              >
                {variant.label}
              </button>
            ))}
          </div>
        )}

        {selectedVariant && (
          <button
            type="button"
            className="simple-video-view__play"
            onClick={() => onPlay(selectedVariant.videoUrl, `${tab.label} — ${selectedVariant.label}`)}
          >
            <span className="simple-video-view__play-icon" aria-hidden="true">
              ▶
            </span>
            Play footage
          </button>
        )}
      </div>
    </div>
  )
}
