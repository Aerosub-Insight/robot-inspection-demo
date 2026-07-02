export interface Hotspot {
  id: string
  label: string
  x: number // percentage 0-100
  y: number // percentage 0-100
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
  diagramImage: string
  diagramAlt: string
  hotspots: Hotspot[]
}

export interface VideoVariant {
  id: string
  label: string
  videoUrl: string
}

export interface SimpleTab {
  id: string
  label: string
  type: 'simple'
  variants: VideoVariant[]
}

export type Tab = HotspotTab | SimpleTab

export interface ContentManifest {
  tabs: Tab[]
}
