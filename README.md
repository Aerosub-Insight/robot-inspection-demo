# Aerosub Solutions — Robot Inspection Demo

A standalone React app that showcases crawler robot inspection footage to a prospective Aerosub client. Instead of sharing a raw folder of videos, the client lands on an autoplaying hull inspection clip, taps a marked zone to preview a sample, then can jump into a full explorer where they pick a surface/asset type from a tab bar and click marked zones on a photo to watch sample crawler footage for that kind of surface.

The footage is sample/demo material of the crawlers in motion — it's presented as illustrative capability, not a live inspection of the client's own asset.

## How it works

The app has two routes (see [`src/main.tsx`](src/main.tsx)):

- **`/` — Intro landing** ([`src/IntroLanding.tsx`](src/IntroLanding.tsx)): an autoplaying, muted hull inspection video freezes on a frame a few seconds in, then reveals clickable hotspots over the frozen video. Clicking one opens a popup with a description and an embedded YouTube preview, plus a CTA to jump to `/explorer`. Hotspot positions on this view can be tuned independently of the explorer via optional `introX`/`introY` fields on each hotspot (falls back to `x`/`y` if unset) — see [`src/types/content.ts`](src/types/content.ts).
- **`/explorer` — Full explorer** ([`src/App.tsx`](src/App.tsx)): **Tabs** (top bar) represent surface types — Hull, Pipeline, Tanks. (Nuclear and M145 Platform exist in the content manifest but are currently commented out — see [Project status](#project-status).) Each hotspot tab shows a photo with numbered, clickable zones. Clicking a zone (or its matching row in the sidebar list) expands a detail card — description + a **Play inspection footage** button — inline in the sidebar, next to the photo. Clicking Play opens a modal video player.
- Videos embed via **YouTube** (including Shorts links); the player also supports direct file URLs (`<video src>`) for any future S3/Cloudinary/local hosting — see [Video hosting](#video-hosting) below.
- Fixed dark-chrome design (sticky header, dark hero/closer, light content area) — no light/dark theme toggle.

## Adding or editing content

Everything — tabs, zone positions, video links, copy — lives in one file: [`src/content/manifest.ts`](src/content/manifest.ts). No component code needs to change to add a tab, move a zone, or swap a video.

**To add a video link:** paste a normal YouTube share URL (`youtu.be/VIDEO_ID`, `youtube.com/watch?v=VIDEO_ID`, or `youtube.com/shorts/VIDEO_ID`) into `youtubeEmbedUrl(...)` for the relevant hotspot/variant.

**To reposition a zone:** adjust `x` / `y` (percentages, 0–100, relative to the diagram image) on that hotspot's entry.

**To add a zone description:** add a `description` string to the hotspot — it appears when the zone row is expanded, above the Play button.

**To swap a diagram image:** drop the file into [`src/assets/diagrams/`](src/assets/diagrams/) and update the corresponding `import` at the top of `manifest.ts`.

**To bring back a commented-out tab:** uncomment the tab object (and the `PENDING` constant near the top of the file, if it's still commented too) in `manifest.ts`, then fill in real video links.

**To reposition a hotspot on the intro landing (`/`) independently of the explorer:** set `introX` / `introY` (percentages, 0–100) on that hotspot's entry; otherwise it falls back to the explorer's `x` / `y`.

**To swap the intro landing's video clip:** replace [`src/assets/video.mp4`](src/assets/video.mp4) and, if the freeze frame should land elsewhere, adjust `FREEZE_AT_SECONDS` in `IntroLanding.tsx`.

## Video hosting

Google Drive share links **do not work** for direct playback — Drive serves an HTML "can't scan for viruses" interstitial instead of the video file for anything but small clips. YouTube (including unlisted/Shorts) is the current approach: free, no size limits, reliable streaming, embeds via iframe.

`VideoModal` auto-detects YouTube URLs and renders an iframe embed; any other URL falls back to a native `<video>` tag with error handling (blank/broken links show a visible error state instead of failing silently). This means the hosting provider can change later (e.g. to S3 or Cloudinary) by only editing manifest URLs.

## Project status

| Tab | Diagram image | Hotspot videos |
|---|---|---|
| Hull | ✅ FPSO photo | ✅ 2 of 2 wired |
| Pipeline | ✅ real photo | ✅ 3 of 4 wired (Vertical Section commented out, no footage yet) |
| Tanks | ✅ real photo | ✅ 3 of 3 wired |
| Nuclear | — (tab commented out) | — |
| M145 Platform | — (tab commented out) | — |

Remaining before client-ready:
- Source footage for the commented-out Pipeline "Vertical Section" hotspot and re-enable it.
- Decide whether to bring back the Nuclear and M145 Platform tabs, and source diagram images + video links for them.
- Confirm final Aerosub branding requirements.

## Development

```bash
npm install
npm run dev       # start dev server
npm run build     # type-check + production build
npm run lint       # oxlint
npm run preview    # preview the production build locally
```

No backend — deploys as a static site (Netlify config already included).
