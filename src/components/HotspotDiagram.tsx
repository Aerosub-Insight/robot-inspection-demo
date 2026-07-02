import { useState } from 'react'
import type { Hotspot, HotspotTab } from '../types/content'
import './HotspotDiagram.css'

interface HotspotDiagramProps {
  tab: HotspotTab
  onPlay: (hotspot: Hotspot) => void
}

export function HotspotDiagram({ tab, onPlay }: HotspotDiagramProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const toggle = (id: string) => setSelectedId((current) => (current === id ? null : id))

  return (
    <div className="hotspot-explorer">
      <div className="hotspot-explorer__stage">
        {tab.diagramImage ? (
          <img className="hotspot-explorer__image" src={tab.diagramImage} alt={tab.diagramAlt} />
        ) : (
          <div className="hotspot-explorer__placeholder">
            <div className="hotspot-explorer__placeholder-label">{tab.label} diagram</div>
            <div className="hotspot-explorer__placeholder-hint">drop client photo · zones stay wired</div>
          </div>
        )}
        {tab.hotspots.map((hotspot, index) => {
          const active = selectedId === hotspot.id || hoveredId === hotspot.id
          return (
            <button
              key={hotspot.id}
              type="button"
              className={`hotspot-explorer__pin${active ? ' hotspot-explorer__pin--active' : ''}`}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              onClick={() => toggle(hotspot.id)}
              onMouseEnter={() => setHoveredId(hotspot.id)}
              onMouseLeave={() => setHoveredId((id) => (id === hotspot.id ? null : id))}
              onFocus={() => setHoveredId(hotspot.id)}
              onBlur={() => setHoveredId((id) => (id === hotspot.id ? null : id))}
              aria-label={hotspot.label}
            >
              <span className="hotspot-explorer__pin-ring" />
              <span className="hotspot-explorer__pin-dot">{index + 1}</span>
              <span className="hotspot-explorer__pin-label">{hotspot.label}</span>
            </button>
          )
        })}
      </div>

      <div className="hotspot-explorer__zones">
        <div className="hotspot-explorer__zones-heading">Inspection zones</div>
        {tab.hotspots.map((hotspot, index) => {
          const open = selectedId === hotspot.id
          const highlighted = open || hoveredId === hotspot.id
          return (
            <div
              key={hotspot.id}
              className={`hotspot-explorer__row${highlighted ? ' hotspot-explorer__row--highlighted' : ''}`}
            >
              <button
                type="button"
                className="hotspot-explorer__row-header"
                onClick={() => toggle(hotspot.id)}
                onMouseEnter={() => setHoveredId(hotspot.id)}
                onMouseLeave={() => setHoveredId((id) => (id === hotspot.id ? null : id))}
              >
                <span className="hotspot-explorer__row-badge">{index + 1}</span>
                <span className="hotspot-explorer__row-text">
                  <span className="hotspot-explorer__row-name">{hotspot.label}</span>
                  {hotspot.surface && (
                    <span className="hotspot-explorer__row-surface">{hotspot.surface}</span>
                  )}
                </span>
                <span className="hotspot-explorer__row-chevron">{open ? '–' : '+'}</span>
              </button>
              {open && (
                <div className="hotspot-explorer__row-body">
                  {hotspot.description && (
                    <p className="hotspot-explorer__row-description">{hotspot.description}</p>
                  )}
                  <button
                    type="button"
                    className="hotspot-explorer__row-play"
                    onClick={() => onPlay(hotspot)}
                  >
                    <span className="hotspot-explorer__row-play-icon" aria-hidden="true" />
                    Play inspection footage
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
