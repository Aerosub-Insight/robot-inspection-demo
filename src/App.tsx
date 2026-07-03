import { useEffect, useState } from "react";
import { TabBar } from "./components/TabBar";
import { HotspotDiagram } from "./components/HotspotDiagram";
import { SimpleVideoView } from "./components/SimpleVideoView";
import { VideoModal } from "./components/VideoModal";
import { manifest, CLIENT_NAME } from "./content/manifest";
import type { Hotspot, VideoVariant } from "./types/content";
import heroImage from "./assets/diagrams/hull.png";
import "./App.css";

const possessiveClient = CLIENT_NAME === "your" ? "your" : `${CLIENT_NAME}’s`;
const upperClient =
  CLIENT_NAME === "your" ? "YOUR TEAM" : CLIENT_NAME.toUpperCase();

function App() {
  const [activeTabId, setActiveTabId] = useState(manifest.tabs[0]?.id ?? "");
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
    tabLabel: string;
  } | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeTab = manifest.tabs.find((tab) => tab.id === activeTabId);

  const selectTab = (tabId: string) => setActiveTabId(tabId);
  const handlePlayHotspot = (hotspot: Hotspot) =>
    setActiveVideo({
      url: hotspot.videoUrl,
      title: hotspot.label,
      tabLabel: activeTab?.label ?? "",
    });
  const handlePlayVariant = (variant: VideoVariant) =>
    setActiveVideo({
      url: variant.videoUrl,
      title: variant.label,
      tabLabel: activeTab?.label ?? "",
    });
  const handleClose = () => setActiveVideo(null);

  const zoneCountLabel =
    activeTab?.type === "hotspot"
      ? `${activeTab.hotspots.length} ${activeTab.hotspots.length === 1 ? "zone" : "zones"}`
      : activeTab?.type === "simple"
        ? `${activeTab.variants.length} clips`
        : "";

  return (
    <div className="app">
      <header className={`app-header${scrolled ? " app-header--glass" : ""}`}>
        <div className="app-header__brand">
          <span className="app-header__mark">
            <span className="app-header__mark-diamond" />
            <span className="app-header__mark-dot" />
          </span>
          <span className="app-header__name">
            Aerosub<span className="app-header__name-muted"> Solutions</span>
          </span>
        </div>
        <div className="app-header__eyebrow">
          <span className="app-header__eyebrow-mark">&#9670;</span>
          <span>Crawler Inspection Capabilities</span>
        </div>
      </header>

      <section className="hero">
        <div className="hero__inner">
          <div className="hero__copy">
            <div className="hero__kicker">
              Robot inspection · what it covers
            </div>
            <h1 className="hero__title">
              If it sits on your asset,
              <br />
              a crawler can likely reach it.
            </h1>
            <p className="hero__lede">
              Magnetic crawler robots reach the surfaces rope access, scaffold
              and divers can&apos;t. The clips below are sample footage
              showing the robots in motion across different surfaces.
            </p>
            <div className="hero__chips-label">Surfaces in this demo</div>
            <div className="hero__chips">
              {manifest.tabs.map((tab) => (
                <a
                  key={tab.id}
                  href="#explorer"
                  className="hero__chip"
                  onClick={() => selectTab(tab.id)}
                >
                  {tab.label}
                </a>
              ))}
            </div>
            <a href="#explorer" className="hero__scroll">
              Explore the coverage <span>↓</span>
            </a>
          </div>
          <div className="hero__media">
            <img
              className="hero__image"
              src={heroImage}
              alt="FPSO on open water"
            />
            <span className="hero__pin" style={{ left: "52%", top: "62%" }} />
            <span className="hero__pin" style={{ left: "83%", top: "56%" }} />
            <div className="hero__media-caption">
              FPSO · illustrative hull photo
            </div>
          </div>
        </div>
      </section>

      <section id="explorer" className="explorer">
        <div className="explorer__header">
          <div>
            <div className="explorer__kicker">Explore by surface</div>
            <h2 className="explorer__title">
              Pick a surface. Click a marked zone. Watch the crawler work it.
            </h2>
          </div>
        </div>

        <TabBar
          tabs={manifest.tabs}
          activeTabId={activeTabId}
          onSelect={selectTab}
        />

        {activeTab && (
          <div className="explorer__caption">
            <div className="explorer__caption-left">
              <h3 className="explorer__caption-title">
                {activeTab.type === "hotspot"
                  ? activeTab.title
                  : activeTab.label}
              </h3>
              <span className="explorer__caption-count">{zoneCountLabel}</span>
            </div>
            {(activeTab.type === "hotspot" || activeTab.type === "simple") &&
              activeTab.note && (
                <p className="explorer__caption-note">{activeTab.note}</p>
              )}
          </div>
        )}

        {activeTab?.type === "hotspot" && (
          <HotspotDiagram tab={activeTab} onPlay={handlePlayHotspot} />
        )}
        {activeTab?.type === "simple" && (
          <SimpleVideoView tab={activeTab} onPlay={handlePlayVariant} />
        )}
      </section>

      <section className="closer">
        <div className="closer__inner">
          <div className="closer__kicker">The point</div>
          <h2 className="closer__title">
            Most surfaces on {possessiveClient} asset
            <br />
            can be reached by a crawler like these.
          </h2>
          <p className="closer__lede">
            What you just clicked through is sample footage of the robots in
            motion, not a survey of your equipment — a next step would be
            scoping an inspection against your specific asset.
          </p>
        </div>
      </section>

      <footer className="app-footer">
        <span>AEROSUB SOLUTIONS · CRAWLER INSPECTION CAPABILITIES</span>
        <span>PREPARED FOR {upperClient}</span>
      </footer>

      {activeVideo && (
        <VideoModal
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default App;
