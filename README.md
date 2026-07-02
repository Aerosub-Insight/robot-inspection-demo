# Aerosub Solutions — Robot Inspection Demo

A standalone React app that showcases Eddyfi crawler robot inspection footage to a prospective Aerosub client. Instead of sharing a raw folder of videos, the client picks a surface/asset type from a tab bar and clicks hotspots on a real inspection photo to watch the relevant crawler footage.

## How it works

- **Tabs** (top bar) represent asset types — Hull, Pipeline, Tanks, Nuclear, M145 Platform.
- **Hotspot tabs** show a photo/diagram with clickable dots at real inspection zones. Clicking a dot opens a detail card (crawler description + a **Play** button) before jumping to video.
- **Simple tabs** (no meaningful spatial zones, e.g. M145 Platform) show a variant picker and a single Play button instead of a diagram.
- Videos currently embed via **YouTube (unlisted)**; the player also supports direct file URLs (`<video src>`) for any future S3/Cloudinary/local hosting — see [Video hosting](#video-hosting) below.
- Light/dark theme, defaulting to light, toggle in the header, persisted in `localStorage`.

## Adding or editing content

Everything — tabs, hotspot positions, video links, copy — lives in one file: [`src/content/manifest.ts`](src/content/manifest.ts). No component code needs to change to add a tab, move a hotspot, or swap a video.

**To add a video link:** paste a normal YouTube share URL (`youtu.be/VIDEO_ID` or `youtube.com/watch?v=VIDEO_ID`) into `youtubeEmbedUrl(...)` for the relevant hotspot/variant.

**To reposition a hotspot:** adjust `x` / `y` (percentages, 0–100, relative to the diagram image) on that hotspot's entry.

**To add a hotspot description:** add a `description` string to the hotspot — it appears in the detail card before the Play button.

**To swap a diagram image:** drop the file into [`src/assets/diagrams/`](src/assets/diagrams/) and update the corresponding `import` at the top of `manifest.ts`.

## Video hosting

Google Drive share links **do not work** for direct playback — Drive serves an HTML "can't scan for viruses" interstitial instead of the video file for anything but small clips. YouTube (unlisted) is the current workaround: free, no size limits, reliable streaming, embeds via iframe.

`VideoModal` auto-detects YouTube URLs and renders an iframe embed; any other URL falls back to a native `<video>` tag with error handling (blank/broken links show a visible error state instead of failing silently). This means the hosting provider can change later (e.g. to S3 or Cloudinary per the original PRD) by only editing manifest URLs.

## Project status

| Tab | Diagram image | Hotspot videos |
|---|---|---|
| Hull | ✅ real FPSO photo | ✅ 2 of 2 wired (real YouTube links) |
| Pipeline | ⚠️ placeholder SVG | ❌ pending YouTube links |
| Tanks | ⚠️ placeholder SVG | ❌ pending YouTube links |
| Nuclear | ⚠️ placeholder SVG | ❌ pending YouTube links |
| M145 Platform | — (simple tab) | ❌ pending YouTube links |

Remaining before client-ready:
- Upload remaining Drive clips (Pipeline, Tanks, Nuclear, M145) to YouTube as unlisted and swap their `PENDING` placeholders in `manifest.ts`.
- Source or photograph real surface images for Pipeline, Tanks, and Nuclear tabs to replace the placeholder SVGs (same treatment as the Hull FPSO photo).
- Confirm final Aerosub/Eddyfi branding requirements.

## Development

```bash
npm install
npm run dev       # start dev server
npm run build     # type-check + production build
npm run lint       # oxlint
npm run preview    # preview the production build locally
```

No backend — deploys as a static site (Netlify config already included).
