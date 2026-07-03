import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { manifest } from "./content/manifest";
import { youtubeEmbedUrl } from "./content/youtube";
import type { Hotspot } from "./types/content";
import "./IntroLanding.css";

// Hosted on Cloudinary rather than bundled — Netlify's static asset CDN
// truncates large (40MB+) video files served straight from the build output.
const introVideo =
  "https://res.cloudinary.com/si6hekwh/video/upload/v1783086046/Industrial_Alert_Video_In_a_cinematic_style_a_large_red_industrial_ship_O_BcVGXs_yxwp0n.mp4";

const hullTab = manifest.tabs.find(
  (tab) => tab.id === "hull" && tab.type === "hotspot",
);
const hullHotspots: Hotspot[] =
  hullTab && hullTab.type === "hotspot" ? hullTab.hotspots : [];

// Freeze the intro clip here — the riser is visible at this point in the footage.
const FREEZE_AT_SECONDS = 8;

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
  const [videoEnded, setVideoEnded] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
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

    const handleTimeUpdate = () => {
      if (video.currentTime >= FREEZE_AT_SECONDS) {
        video.pause();
        video.currentTime = FREEZE_AT_SECONDS;
        setVideoEnded(true);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
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

  const closePopup = () => setActiveHotspot(null);

  return (
    <div className="intro" ref={containerRef}>
      {!isLargeScreen && (
        <div className="intro__eyebrow">
          <span className="intro__eyebrow-mark">&#9670;</span>
          <span>Aerosub Solutions</span>
        </div>
      )}

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

      {!isLargeScreen && (
        <div className="intro__caption">
          {videoEnded
            ? "Tap a marked zone to see the crawler in action"
            : "FPSO hull inspection · sample footage"}
        </div>
      )}

      {videoEnded &&
        videoBox &&
        hullHotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            type="button"
            className="intro__hotspot"
            style={{
              left: `${videoBox.left + (videoBox.width * (hotspot.introX ?? hotspot.x)) / 100}px`,
              top: `${videoBox.top + (videoBox.height * (hotspot.introY ?? hotspot.y)) / 100}px`,
            }}
            onClick={() => setActiveHotspot(hotspot)}
            aria-label={`View ${hotspot.label} details`}
          >
            <span className="intro__hotspot-ring" />
            <span className="intro__hotspot-dot" />
          </button>
        ))}

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
              <h2 className="intro-popup__title">{activeHotspot.label}</h2>
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
              {activeHotspot.description && (
                <p className="intro-popup__description">
                  {activeHotspot.description}
                </p>
              )}

              <iframe
                key={activeHotspot.id}
                className="intro-popup__video"
                src={youtubeEmbedUrl(activeHotspot.videoUrl)}
                title={activeHotspot.label}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />

              <Link to="/explorer" className="intro-popup__cta">
                Explore all inspection zones <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
