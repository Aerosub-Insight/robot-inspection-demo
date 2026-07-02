export interface Hotspot {
  id: string
  label: string
  x: number // percentage 0-100
  y: number // percentage 0-100
  surface?: string
  description?: string
  videoUrl: string
}

export interface HotspotTab {
  id: string
  label: string
  type: 'hotspot'
  eyebrow?: string
  title?: string
  description?: string
  note?: string
  diagramImage: string | null
  diagramAlt: string
  hotspots: Hotspot[]
}

export interface VideoVariant {
  id: string
  label: string
  tag?: string
  description?: string
  videoUrl: string
}

export interface SimpleTab {
  id: string
  label: string
  type: 'simple'
  note?: string
  variants: VideoVariant[]
}

export type Tab = HotspotTab | SimpleTab

export interface ContentManifest {
  tabs: Tab[]
}
