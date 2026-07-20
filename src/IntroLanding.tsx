import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { manifest } from "./content/manifest";
import { youtubeEmbedUrl } from "./content/youtube";
import type { Hotspot } from "./types/content";
import crawlerImage from "./assets/diagrams/crawler.png";
import riserImage from "./assets/diagrams/riser.png";
import weldImage from "./assets/diagrams/weld.png";
import corrosionImage from "./assets/diagrams/corrosion.png";
import "./IntroLanding.css";

// Hosted on Cloudinary rather than bundled — Netlify's static asset CDN
// truncates large (40MB+) video files served straight from the build output.
const introVideo =
  "https://res.cloudinary.com/si6hekwh/video/upload/v1783513362/landing_online-video-cutter.com_hjssvm.mp4";

// A hull hotspot's marker image, shown crawling on the surface in place of
// the plain pulsing dot.
const hotspotMarkerImages: Partial<Record<string, string>> = {
  "hull-plating": crawlerImage,
  riser: riserImage,
  "cypher-weld-scan": weldImage,
  "mantis-corrosion": corrosionImage,
};

// Plays inline in a hotspot's popup when "View simulation" is clicked, in
// place of the YouTube embed. Hotspots without an entry here keep the
// "View simulation" button linking out to /explorer instead.
const hotspotSimulationVideos: Partial<Record<string, string>> = {
  "hull-plating":
    "https://res.cloudinary.com/si6hekwh/video/upload/v1783509981/kling_20260708_VIDEO_Cinematic__4917_0_hfujad.mp4",
  riser:
    "https://res.cloudinary.com/si6hekwh/video/upload/v1783512852/kling_20260708_VIDEO_Using_the__5149_0_o9pmxz.mp4",
  "cypher-weld-scan":
    "https://res.cloudinary.com/si6hekwh/video/upload/v1784560423/weld-simulation_ou81h5.mp4",
  "mantis-corrosion":
    "https://res.cloudinary.com/si6hekwh/video/upload/v1784557122/weld-simulation_m2kl1f.mp4",
};

const hullTab = manifest.tabs.find(
  (tab) => tab.id === "hull" && tab.type === "hotspot",
);
const hullHotspots: Hotspot[] =
  hullTab && hullTab.type === "hotspot" ? hullTab.hotspots : [];

// How long the zoom-toward-hotspot transition runs before the popup opens —
// keep in sync with the transition-duration on .intro__stage-inner in CSS.
const ZOOM_TRAVEL_MS = 600;

// Skip past the opening seconds of the intro clip.
const INTRO_START_SECONDS = 3;

// Above this width the video can fill the viewport with object-fit: cover
// (no letterbox bars), so the overlay text is hidden and hotspots are placed
// against a "cover" box instead of a "contain" box.
const LARGE_SCREEN_QUERY = "(min-width: 1400px)";

interface VideoBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

export default function IntroLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const travelTimeout = useRef<number | null>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [zoomedHotspot, setZoomedHotspot] = useState<Hotspot | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [showSimulation, setShowSimulation] = useState(false);
  const [videoBox, setVideoBox] = useState<VideoBox | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(LARGE_SCREEN_QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(LARGE_SCREEN_QUERY);
    const handleChange = () => setIsLargeScreen(mql.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = video.duration;
      setVideoEnded(true);
    };
    const handleLoadedMetadata = () => {
      video.currentTime = INTRO_START_SECONDS;
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (travelTimeout.current) window.clearTimeout(travelTimeout.current);
    };
  }, []);

  // On large screens the video uses object-fit: cover (fills the container,
  // crops overflow). On small screens it uses contain (full frame, letterboxed).
  // Hotspots need to be placed against whichever box is actually rendered.
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const recalculate = () => {
      const { videoWidth, videoHeight } = video;
      if (!videoWidth || !videoHeight) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const containerRatio = containerWidth / containerHeight;
      const videoRatio = videoWidth / videoHeight;
      const fitWider = videoRatio > containerRatio;
      // cover: fill the shorter dimension and overflow the other.
      // contain: fill the longer dimension and letterbox the other.
      const shouldFillWidth = isLargeScreen ? !fitWider : fitWider;

      let width: number;
      let height: number;
      if (shouldFillWidth) {
        width = containerWidth;
        height = containerWidth / videoRatio;
      } else {
        height = containerHeight;
        width = containerHeight * videoRatio;
      }

      setVideoBox({
        left: (containerWidth - width) / 2,
        top: (containerHeight - height) / 2,
        width,
        height,
      });
    };

    recalculate();
    video.addEventListener("loadedmetadata", recalculate);
    video.addEventListener("loadeddata", recalculate);
    video.addEventListener("timeupdate", recalculate);
    window.addEventListener("resize", recalculate);
    return () => {
      video.removeEventListener("loadedmetadata", recalculate);
      video.removeEventListener("loadeddata", recalculate);
      video.removeEventListener("timeupdate", recalculate);
      window.removeEventListener("resize", recalculate);
    };
  }, [isLargeScreen]);

  const travelTo = (hotspot: Hotspot) => {
    if (travelTimeout.current) window.clearTimeout(travelTimeout.current);
    setZoomedHotspot(hotspot);
    setShowSimulation(false);
    travelTimeout.current = window.setTimeout(() => {
      setActiveHotspot(hotspot);
    }, ZOOM_TRAVEL_MS);
  };

  const closePopup = () => {
    setActiveHotspot(null);
    setZoomedHotspot(null);
    setShowSimulation(false);
  };

  const zoomOrigin = zoomedHotspot
    ? `${zoomedHotspot.introX ?? zoomedHotspot.x}% ${zoomedHotspot.introY ?? zoomedHotspot.y}%`
    : "50% 50%";

  const ctas = hullHotspots.map((hotspot) => (
    <button
      key={hotspot.id}
      type="button"
      className={`intro__cta${zoomedHotspot?.id === hotspot.id ? " intro__cta--active" : ""}`}
      onClick={() => travelTo(hotspot)}
    >
      {hotspot.ctaLabel ?? hotspot.label}
    </button>
  ));

  return (
    <div className="intro">
      {!isLargeScreen && (
        <div className="intro__eyebrow">
          <span className="intro__eyebrow-mark">&#9670;</span>
          <span>Aerosub Solutions</span>
        </div>
      )}

      <div className="intro__stage" ref={containerRef}>
        <div
          className={`intro__zoom${zoomedHotspot ? " is-zoomed" : ""}`}
          style={{ transformOrigin: zoomOrigin }}
        >
          <video
            ref={videoRef}
            className={`intro__video${isLargeScreen ? " intro__video--cover" : ""}`}
            src={introVideo}
            autoPlay
            muted
            playsInline
          >
            Your browser does not support the video tag.
          </video>

          {videoEnded &&
            videoBox &&
            hullHotspots.map((hotspot) => {
              const markerImage = hotspotMarkerImages[hotspot.id];
              return (
                <button
                  key={hotspot.id}
                  type="button"
                  className={`intro__hotspot${markerImage ? ` intro__hotspot--${hotspot.id}` : ""}`}
                  style={{
                    left: `${videoBox.left + (videoBox.width * (hotspot.introX ?? hotspot.x)) / 100}px`,
                    top: `${videoBox.top + (videoBox.height * (hotspot.introY ?? hotspot.y)) / 100}px`,
                  }}
                  onClick={() => travelTo(hotspot)}
                  aria-label={`View ${hotspot.label} details`}
                >
                  {markerImage ? (
                    <img
                      className="intro__hotspot-marker"
                      src={markerImage}
                      alt=""
                    />
                  ) : (
                    <>
                      <span className="intro__hotspot-ring" />
                      <span className="intro__hotspot-dot" />
                    </>
                  )}
                </button>
              );
            })}
        </div>

        {isLargeScreen && videoEnded && (
          <div className="intro__ctas intro__ctas--overlay">{ctas}</div>
        )}
      </div>

      {!isLargeScreen && videoEnded && (
        <div className="intro__ctas">{ctas}</div>
      )}

      {!isLargeScreen && (
        <div className="intro__caption">
          {videoEnded
            ? "Tap a marked zone to see the crawler in action"
            : "FPSO hull inspection · sample footage"}
        </div>
      )}

      {activeHotspot && (
        <div
          className="intro-popup__backdrop"
          onClick={closePopup}
          role="presentation"
        >
          <div
            className="intro-popup__panel"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={activeHotspot.label}
          >
            <div className="intro-popup__header">
              <h2 className="intro-popup__title">
                {activeHotspot.ctaLabel ?? activeHotspot.label}
              </h2>
              <button
                type="button"
                className="intro-popup__close"
                onClick={closePopup}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="intro-popup__body">
              {(() => {
                const text =
                  showSimulation && hotspotSimulationVideos[activeHotspot.id]
                    ? (activeHotspot.simulationDescription ??
                      activeHotspot.description)
                    : activeHotspot.description;
                return (
                  text && (
                    <p className="intro-popup__description">{text}</p>
                  )
                );
              })()}

              {(() => {
                const simulationVideo =
                  hotspotSimulationVideos[activeHotspot.id];

                if (showSimulation && simulationVideo) {
                  return (
                    <video
                      key={`${activeHotspot.id}-simulation`}
                      className="intro-popup__video"
                      src={simulationVideo}
                      autoPlay
                      controls
                      playsInline
                    >
                      Your browser does not support the video tag.
                    </video>
                  );
                }

                return (
                  <iframe
                    key={activeHotspot.id}
                    className="intro-popup__video"
                    src={youtubeEmbedUrl(activeHotspot.videoUrl)}
                    title={activeHotspot.label}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                );
              })()}

              {hotspotSimulationVideos[activeHotspot.id] ? (
                <button
                  type="button"
                  className="intro-popup__cta"
                  onClick={() => setShowSimulation((current) => !current)}
                >
                  {showSimulation ? (
                    <>
                      <span>←</span> Back to inspection footage
                    </>
                  ) : (
                    <>
                      View simulation <span>→</span>
                    </>
                  )}
                </button>
              ) : (
                <Link to="/explorer" className="intro-popup__cta">
                  View simulation <span>→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
