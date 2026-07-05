import type { ContentManifest } from "../types/content";
import hullSurface from "../assets/diagrams/hull.png";
import tanksSurface from "../assets/diagrams/tanks.png";
import pipeSurface from "../assets/diagrams/pipe.png";
import { youtubeEmbedUrl } from "./youtube";

// The name of the prospective client this demo is being shown to.
// Shown in the hero and closer copy ("your asset" / "your's assets").
export const CLIENT_NAME: string = "your";

// TODO: replace each share link below with the real YouTube (unlisted) link for that clip.
// Paste the normal share URL (youtu.be/VIDEO_ID or youtube.com/watch?v=VIDEO_ID) —
// youtubeEmbedUrl() converts it automatically. Google Drive links don't work reliably
// for direct video playback (Drive serves an HTML interstitial for larger files).
// Currently unused while pending-video tabs/hotspots below are commented out —
// uncomment along with them when picking those back up.
// const PENDING = youtubeEmbedUrl("https://youtu.be/PLACEHOLDER");

export const manifest: ContentManifest = {
  tabs: [
    {
      id: "hull",
      label: "Hull",
      type: "hotspot",
      title: "Hull — FPSO side profile",
      note: "Side-shell plating and a riser — two zones a magnetic crawler can cover on this kind of hull.",
      diagramImage: hullSurface,
      diagramAlt: "Fast4Ward FPSO hull, side profile",
      hotspots: [
        {
          id: "hull-plating",
          label: "Side-shell plating",
          ctaLabel: "Hull Crawler Demo",
          x: 44.6,
          y: 57.3,
          introX: 44.6,
          introY: 57.3,
          surface: "Coated steel · vertical",
          description:
            "A magnetic Eddyfi VersaTrax™ M-Series crawler adheres to the coated hull plating, giving stable HD imaging on vertical steel from gunnels to keel — no divers, rope access, or scaffolding required.",
          videoUrl: youtubeEmbedUrl("https://youtu.be/xrn8zV57HSA"),
        },
        {
          id: "riser",
          label: "Riser & stern touchdown",
          ctaLabel: "Riser Clamp Survey",
          x: 89,
          y: 55,
          introX: 93,
          introY: 55,
          surface: "Curved steel · splash zone",
          description:
            "An Eddyfi VersaTrax™ Y-Series crawler uses an expandable, non-magnetic chassis to grip the riser through bends and past clamp placements — a splash-zone survey normally reserved for divers.",
          videoUrl: youtubeEmbedUrl("https://youtu.be/4tp7ytmrahw"),
        },
      ],
    },
    {
      id: "pipeline",
      label: "Pipeline",
      type: "hotspot",
      title: "Pipeline — process spool run",
      note: "Straight runs, bends, and the actuator system that drives the crawler through them.",
      diagramImage: pipeSurface,
      diagramAlt: "Pipeline and riser sections",
      hotspots: [
        {
          id: "straight-run",
          label: "Straight Run — 2km Dual Y380",
          ctaLabel: "Pipeline Straight-Run Demo",
          x: 24,
          y: 46,
          surface: "Insulated steel · horizontal",
          videoUrl: youtubeEmbedUrl("https://youtu.be/V6y81WJEhrc"),
        },
        {
          id: "bend",
          label: "Pipe Bend — Y200 Enter Bend",
          ctaLabel: "Pipe Bend Navigation",
          x: 54,
          y: 35,
          surface: "Curved steel",
          videoUrl: youtubeEmbedUrl(
            "https://youtube.com/shorts/iOdyqIvfv6o?feature=share",
          ),
        },
        // TODO: no video yet — re-enable once footage is ready.
        // {
        //   id: "vertical",
        //   label: "Vertical Section — Y200 MultiBend Vertical",
        //   x: 58,
        //   y: 20,
        //   surface: "Insulated steel · vertical",
        //   videoUrl: PENDING,
        // },
        {
          id: "actuator-system",
          label: "Rotate & Linear Actuator System — M345 / Y200",
          ctaLabel: "Actuator System Demo",
          x: 68,
          y: 46,
          surface: "Equipment demo",
          videoUrl: youtubeEmbedUrl("https://youtu.be/AeMfnS0YKuc"),
        },
      ],
    },
    {
      id: "tanks",
      label: "Tanks",
      type: "hotspot",
      title: "Tanks — storage shell & floor",
      note: "Cleaning, multi-NDT setup, and deployment on tank shell and floor surfaces.",
      diagramImage: tanksSurface,
      diagramAlt: "Row of rectangular steel storage tanks",
      hotspots: [
        {
          id: "large-tank-cleaning",
          label: "Large Tank Cleaning & Multi-NDT",
          ctaLabel: "Tank Cleaning & NDT Demo",
          x: 32,
          y: 55,
          surface: "Shell course",
          videoUrl: youtubeEmbedUrl("https://youtu.be/GDitcyMFuzo"),
        },
        {
          id: "m345-y200",
          label: "M345 & Y200 Deployment",
          ctaLabel: "Tank Deployment Demo",
          x: 57,
          y: 48,
          surface: "Ladder & pipe run",
          videoUrl: youtubeEmbedUrl("https://youtu.be/RTLO5lIL0Ls"),
        },
        {
          id: "ut-acquisition",
          label: "M345 Internal UT Acquisition Board",
          ctaLabel: "UT Acquisition Demo",
          x: 78,
          y: 75,
          surface: "Base manway & valves",
          videoUrl: youtubeEmbedUrl(
            "https://youtube.com/shorts/_6xCJohId2A?feature=share",
          ),
        },
      ],
    },
    // TODO: no real content yet — re-enable once a diagram/photo and video links are ready.
    // {
    //   id: "nuclear",
    //   label: "Nuclear",
    //   type: "hotspot",
    //   title: "Nuclear — containment liner",
    //   note: "Placeholder diagram — zones are wired and ready for a client photo of the actual structure.",
    //   diagramImage: null,
    //   diagramAlt: "Nuclear containment vessel",
    //   hotspots: [
    //     {
    //       id: "heel-characterisation",
    //       label: "Heel Characterisation System",
    //       x: 50,
    //       y: 76,
    //       surface: "Floor plate",
    //       videoUrl: PENDING,
    //     },
    //     {
    //       id: "custom-build",
    //       label: "Custom-Built Nuclear Environment Crawler",
    //       x: 50,
    //       y: 40,
    //       surface: "Stainless liner",
    //       videoUrl: PENDING,
    //     },
    //   ],
    // },
    // TODO: no video links yet — re-enable once footage is ready.
    // {
    //   id: "m145",
    //   label: "M145 Platform",
    //   type: "simple",
    //   note: "Same crawler, different camera heads and standoff distances — pick a clip to compare capture quality.",
    //   variants: [
    //     {
    //       id: "ahd-12ft",
    //       label: "AHD head — 12ft standoff",
    //       tag: "AHD · 12ft",
    //       description:
    //         "High-definition head at long standoff — widest coverage per pass.",
    //       videoUrl: PENDING,
    //     },
    //     {
    //       id: "ahd-4ft",
    //       label: "AHD head — 4ft standoff",
    //       tag: "AHD · 4ft",
    //       description: "High-definition head at medium standoff.",
    //       videoUrl: PENDING,
    //     },
    //     {
    //       id: "ahd-1ft",
    //       label: "AHD head — 1ft standoff",
    //       tag: "AHD · 1ft",
    //       description:
    //         "High-definition head at close standoff — fine weld and coating detail.",
    //       videoUrl: PENDING,
    //     },
    //     {
    //       id: "ahd-1inch",
    //       label: "AHD head — 1inch standoff",
    //       tag: "AHD · 1in",
    //       description:
    //         "High-definition head at minimum standoff for maximum detail.",
    //       videoUrl: PENDING,
    //     },
    //     {
    //       id: "sd-12ft",
    //       label: "SD head — 12ft standoff",
    //       tag: "SD · 12ft",
    //       description:
    //         "Standard-definition head at long standoff for a direct comparison.",
    //       videoUrl: PENDING,
    //     },
    //     {
    //       id: "sd-4ft",
    //       label: "SD head — 4ft standoff",
    //       tag: "SD · 4ft",
    //       description: "Standard-definition head at medium standoff.",
    //       videoUrl: PENDING,
    //     },
    //     {
    //       id: "sd-1ft",
    //       label: "SD head — 1ft standoff",
    //       tag: "SD · 1ft",
    //       description:
    //         "Standard-definition head at close standoff, showing the trade-off in detail.",
    //       videoUrl: PENDING,
    //     },
    //     {
    //       id: "sd-1inch",
    //       label: "SD head — 1inch standoff",
    //       tag: "SD · 1in",
    //       description: "Standard-definition head at minimum standoff.",
    //       videoUrl: PENDING,
    //     },
    //   ],
    // },
  ],
};
