import { useState } from 'react'
import type { Hotspot, HotspotTab } from '../types/content'
import './HotspotDiagram.css'

interface HotspotDiagramProps {
  tab: HotspotTab
  onSelectHotspot: (hotspot: Hotspot) => void
}

export function HotspotDiagram({ tab, onSelectHotspot }: HotspotDiagramProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="hotspot-diagram">
      <div className="hotspot-diagram__stage">
        <img className="hotspot-diagram__image" src={tab.diagramImage} alt={tab.diagramAlt} />
        {tab.hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            type="button"
            className="hotspot-diagram__dot"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            onMouseEnter={() => setHoveredId(hotspot.id)}
            onMouseLeave={() => setHoveredId((id) => (id === hotspot.id ? null : id))}
            onFocus={() => setHoveredId(hotspot.id)}
            onBlur={() => setHoveredId((id) => (id === hotspot.id ? null : id))}
            onClick={() => onSelectHotspot(hotspot)}
            aria-label={hotspot.label}
          >
            {hoveredId === hotspot.id && (
              <span className="hotspot-diagram__tooltip">{hotspot.label}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
