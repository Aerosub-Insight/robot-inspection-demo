import type { ContentManifest } from "../types/content";
import hullSurface from "../assets/diagrams/hull.png";
import pipelineSurface from "../assets/diagrams/pipeline.svg";
import tankSurface from "../assets/diagrams/tank.svg";
import nuclearSurface from "../assets/diagrams/nuclear.svg";
import { youtubeEmbedUrl } from "./youtube";

// TODO: replace each share link below with the real YouTube (unlisted) link for that clip.
// Paste the normal share URL (youtu.be/VIDEO_ID or youtube.com/watch?v=VIDEO_ID) —
// youtubeEmbedUrl() converts it automatically. Google Drive links don't work reliably
// for direct video playback (Drive serves an HTML interstitial for larger files).
const PENDING = youtubeEmbedUrl("https://youtu.be/PLACEHOLDER");

export const manifest: ContentManifest = {
  tabs: [
    {
      id: "hull",
      label: "Hull",
      type: "hotspot",
      title: "Hull coverage — FPSO side profile",
      description:
        "Each marked zone links to crawler-robot inspection footage. Select a hull surface to review coverage for that area.",
      diagramImage: hullSurface,
      diagramAlt: "Fast4Ward FPSO hull, side profile",
      hotspots: [
        {
          id: "hull-plating",
          label: "Hull Plating",
          x: 45,
          y: 58,
          // TODO: confirm crawler model/spec used in this clip and refine copy.
          description:
            "Magnetic-wheeled crawler unit performs automated UT thickness mapping across the hull's external plating, holding contact through wave action without diver intervention.",
          videoUrl: youtubeEmbedUrl("https://youtu.be/xrn8zV57HSA"),
        },
        {
          id: "riser",
          label: "Riser",
          x: 88,
          y: 55,
          // TODO: confirm crawler model/spec used in this clip and refine copy.
          description:
            "Riser-mounted crawler navigates the vertical steel catenary, capturing corrosion and wall-loss data along the full riser run in a single deployment.",
          videoUrl: youtubeEmbedUrl("https://youtu.be/4tp7ytmrahw"),
        },
      ],
    },
    {
      id: "pipeline",
      label: "Pipeline",
      type: "hotspot",
      title: "Pipeline coverage — riser & bend sections",
      description:
        "Each marked zone links to crawler-robot inspection footage. Select a pipe section to review coverage for that area.",
      diagramImage: pipelineSurface,
      diagramAlt: "Pipeline and riser sections",
      hotspots: [
        {
          id: "straight-run",
          label: "Straight Run — 2km Dual Y380",
          x: 24,
          y: 46,
          videoUrl: PENDING,
        },
        {
          id: "bend",
          label: "Pipe Bend — Y200 Enter Bend",
          x: 54,
          y: 35,
          videoUrl: PENDING,
        },
        {
          id: "vertical",
          label: "Vertical Section — Y200 MultiBend Vertical",
          x: 58,
          y: 20,
          videoUrl: PENDING,
        },
        {
          id: "multi-bend",
          label: "Multi-Bend Run — Y200 Multi-bend Pipe",
          x: 82,
          y: 68,
          videoUrl: PENDING,
        },
        {
          id: "site-deployment",
          label: "Site Deployment — Y200",
          x: 40,
          y: 46,
          videoUrl: PENDING,
        },
        {
          id: "actuator-system",
          label: "Rotate & Linear Actuator System — M345 / Y200",
          x: 68,
          y: 46,
          videoUrl: PENDING,
        },
      ],
    },
    {
      id: "tanks",
      label: "Tanks",
      type: "hotspot",
      title: "Tank coverage — interior surfaces",
      description:
        "Each marked zone links to crawler-robot inspection footage. Select a tank surface to review coverage for that area.",
      diagramImage: tankSurface,
      diagramAlt: "Storage tank interior",
      hotspots: [
        {
          id: "multi-ndt-setup",
          label: "Cleaning & Multi-NDT Setup",
          x: 30,
          y: 55,
          videoUrl: PENDING,
        },
        {
          id: "large-tank-cleaning",
          label: "Large Tank Cleaning & Multi-NDT",
          x: 60,
          y: 55,
          videoUrl: PENDING,
        },
        {
          id: "m345-y200",
          label: "M345 & Y200 Deployment",
          x: 45,
          y: 30,
          videoUrl: PENDING,
        },
        {
          id: "ut-acquisition",
          label: "M345 Internal UT Acquisition Board",
          x: 75,
          y: 30,
          videoUrl: PENDING,
        },
      ],
    },
    {
      id: "nuclear",
      label: "Nuclear",
      type: "hotspot",
      title: "Nuclear coverage — containment vessel",
      description:
        "Each marked zone links to crawler-robot inspection footage. Select a vessel surface to review coverage for that area.",
      diagramImage: nuclearSurface,
      diagramAlt: "Nuclear containment vessel",
      hotspots: [
        {
          id: "heel-characterisation",
          label: "Heel Characterisation System",
          x: 50,
          y: 76,
          videoUrl: PENDING,
        },
        {
          id: "custom-build",
          label: "Custom-Built Nuclear Environment Crawler",
          x: 50,
          y: 40,
          videoUrl: PENDING,
        },
      ],
    },
    {
      id: "m145",
      label: "M145 Platform",
      type: "simple",
      variants: [
        { id: "ahd-12ft", label: "AHD — 12ft", videoUrl: PENDING },
        { id: "ahd-4ft", label: "AHD — 4ft", videoUrl: PENDING },
        { id: "ahd-1ft", label: "AHD — 1ft", videoUrl: PENDING },
        { id: "ahd-1inch", label: "AHD — 1inch", videoUrl: PENDING },
        { id: "sd-12ft", label: "SD — 12ft", videoUrl: PENDING },
        { id: "sd-4ft", label: "SD — 4ft", videoUrl: PENDING },
        { id: "sd-1ft", label: "SD — 1ft", videoUrl: PENDING },
        { id: "sd-1inch", label: "SD — 1inch", videoUrl: PENDING },
      ],
    },
  ],
};
