import type { Tab } from '../types/content'
import './TabBar.css'

interface TabBarProps {
  tabs: Tab[]
  activeTabId: string
  onSelect: (tabId: string) => void
}

export function TabBar({ tabs, activeTabId, onSelect }: TabBarProps) {
  return (
    <nav className="tab-bar" aria-label="Surface categories">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`tab-bar__tab${tab.id === activeTabId ? ' tab-bar__tab--active' : ''}`}
          onClick={() => onSelect(tab.id)}
          aria-current={tab.id === activeTabId ? 'true' : undefined}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
