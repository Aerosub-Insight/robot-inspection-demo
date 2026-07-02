import { useState } from 'react'
import { TabBar } from './components/TabBar'
import { HotspotDiagram } from './components/HotspotDiagram'
import { SimpleVideoView } from './components/SimpleVideoView'
import { VideoModal } from './components/VideoModal'
import { HotspotDetailModal } from './components/HotspotDetailModal'
import { ThemeToggle } from './components/ThemeToggle'
import { useTheme } from './hooks/useTheme'
import { manifest } from './content/manifest'
import type { Hotspot } from './types/content'
import './App.css'

function App() {
  const [activeTabId, setActiveTabId] = useState(manifest.tabs[0]?.id ?? '')
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null)
  const { theme, toggleTheme } = useTheme()

  const activeTab = manifest.tabs.find((tab) => tab.id === activeTabId)

  const handleSelectHotspot = (hotspot: Hotspot) => setActiveHotspot(hotspot)
  const handlePlayHotspot = () => {
    if (!activeHotspot) return
    setActiveVideo({ url: activeHotspot.videoUrl, title: activeHotspot.label })
    setActiveHotspot(null)
  }
  const handlePlay = (url: string, title: string) => setActiveVideo({ url, title })
  const handleCloseDetail = () => setActiveHotspot(null)
  const handleClose = () => setActiveVideo(null)

  return (
    <div className="app">
      <header className="app__header">
        <span className="app__brand">Aerosub Solutions</span>
        <span className="app__subtitle">Robot Inspection Demo</span>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      {activeTab?.type === 'hotspot' && (activeTab.eyebrow || activeTab.title || activeTab.description) && (
        <div className="tab-header">
          {activeTab.eyebrow && <span className="tab-header__eyebrow">{activeTab.eyebrow}</span>}
          {activeTab.title && <h2 className="tab-header__title">{activeTab.title}</h2>}
          {activeTab.description && <p className="tab-header__description">{activeTab.description}</p>}
        </div>
      )}

      <TabBar tabs={manifest.tabs} activeTabId={activeTabId} onSelect={setActiveTabId} />

      <main className="app__content">
        {activeTab?.type === 'hotspot' && (
          <HotspotDiagram tab={activeTab} onSelectHotspot={handleSelectHotspot} />
        )}
        {activeTab?.type === 'simple' && <SimpleVideoView tab={activeTab} onPlay={handlePlay} />}
      </main>

      {activeHotspot && (
        <HotspotDetailModal
          title={activeHotspot.label}
          description={activeHotspot.description}
          onPlay={handlePlayHotspot}
          onClose={handleCloseDetail}
        />
      )}

      {activeVideo && (
        <VideoModal videoUrl={activeVideo.url} title={activeVideo.title} onClose={handleClose} />
      )}
    </div>
  )
}

export default App
