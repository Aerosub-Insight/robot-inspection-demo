# PRD: Eddyfi Crawler Inspection Showcase

## 1. Overview

A standalone React web application built to present Eddyfi crawler robot inspection capabilities to a prospective Aerosub client. Instead of sharing a raw video link, the client interacts with a visual, self-guided showcase: they select a surface/use-case via tabs, then click hotspots on an illustrative diagram to play the relevant crawler footage for that specific area.

**Primary goal:** Communicate "Eddyfi's crawler robots can inspect any surface on your asset" in a way that feels tailored, professional, and interactive — stronger than a shared folder or Stream link.

**Audience:** A single client stakeholder (or small group) viewing this in a sales/pitch context, likely screen-shared or sent as a link.

---

## 2. Core User Flow

1. Client opens the site and sees a top-level **tab bar** (surface/use-case categories — exact tabs TBD, see Section 4).
2. Selecting a tab loads a **diagram view** for that surface — e.g. a hull illustration — with **highlighted hotspot dots** placed at different inspection zones.
3. Clicking a dot opens a **video player** (modal or inline panel) that plays the crawler footage relevant to that specific zone/surface type.
4. If a tab represents a surface with no meaningful spatial variation (e.g. generic "flat surface" use case), skip the hotspot diagram — show a simple video player, optionally with a lightweight variant selector if multiple clips exist.
5. Client can close the video and click another dot/tab to keep exploring — no forced linear flow.

---

## 3. Scope

### In scope (v1)
- Standalone React app (no backend)
- Tabbed navigation, top of page
- At least one tab (Hull) using the interactive hotspot-on-diagram pattern
- Hotspot dots positioned on a static diagram/illustration image
- Click-to-play video interaction (modal player)
- Config-driven content: tabs, hotspots, and video sources defined in a single manifest file — not hardcoded into components
- Responsive layout usable on a laptop screen during a client call (desktop-first; mobile not a priority for v1)
- Graceful fallback UI for tabs without a diagram (simple video-only view)

### Out of scope (v1)
- Backend/API, authentication, or user accounts
- CMS or admin UI for managing content (manifest is hand-edited)
- Analytics/tracking of client interactions
- Video upload pipeline within the app (videos are pre-processed and hosted externally)
- Mobile-optimized experience (nice-to-have, not required)
- Final decision on video hosting provider (S3+CloudFront vs. Cloudinary vs. static bundling) — app should abstract this so the decision can be made/changed later without code changes

---

## 4. Open Decisions (to resolve during/before build)

| Decision | Status | Notes |
|---|---|---|
| Full list of tabs/use-cases | **Not decided** | Hull is confirmed as at least one tab. Others depend on which folders of footage exist and are worth showcasing. |
| Hull diagram source | **Not decided** | Need a real or generated hull illustration/schematic to place hotspots on. Side profile at minimum; top-down optional. |
| Video hosting provider | **Leaning S3, not final** | See hosting comparison already discussed. App architecture must not hardcode this — swap via manifest/env config. |
| Video compression pipeline | **Not decided** | Source footage may be large (e.g. 250MB+ per clip); needs compression pass before hosting regardless of provider. |
| Non-hotspot tab pattern | **Assumed** | For surfaces without spatial variation, use a plain video view instead of a diagram. Confirm this applies correctly per use-case once tabs are known. |

---

## 5. Functional Requirements

### 5.1 Tab Navigation
- Horizontal tab bar at the top of the page
- Active tab visually distinct
- Tab switch does not reload the page (client-side routing/state only)
- Tab list driven by config, not hardcoded — adding a new tab should not require touching component logic

### 5.2 Hotspot Diagram View (e.g. Hull tab)
- Displays a base image (the diagram/illustration)
- Renders positioned dots/markers over the image at defined coordinates
- Dots are visually distinct (color, pulse/glow, or icon) to signal interactivity
- Hovering a dot shows a label/tooltip (e.g. "Ballast Tank Interior")
- Clicking a dot opens the associated video
- Dot positions must scale correctly if the image is responsive/resized (percentage-based positioning, not fixed pixels)

### 5.3 Video Playback
- Clicking a hotspot (or a non-hotspot tab's play control) opens a video player
- Player supports standard controls: play/pause, seek, volume, fullscreen
- Modal/overlay pattern preferred so the diagram remains visually present in context
- Closing the player returns to the diagram without losing tab state
- Player should handle video load failures gracefully (e.g. broken URL) with a visible error state rather than a silent blank screen

### 5.4 Content Manifest
- Single structured config (e.g. JSON/TS file) defining:
  - List of tabs (id, label, type: `hotspot` or `simple`)
  - Per hotspot-tab: diagram image reference, list of hotspots (id, label, x/y position, video URL)
  - Per simple-tab: video URL(s), optional variant labels
- Video URLs are absolute/external references — the manifest doesn't care whether they point to S3, Cloudinary, or a bundled local path
- This manifest is the single place to add/edit/remove tabs, hotspots, and videos without touching component code

---

## 6. Non-Functional Requirements

- **No backend dependency** — deployable as a static site (Vercel, Netlify, S3 static hosting, Railway static)
- **Fast initial load** — diagram images optimized (compressed, appropriately sized); videos not preloaded until requested
- **Video hosting agnostic** — swapping providers should mean editing manifest URLs only
- **Simple deployment** — client-facing demo, so deploy process should be a single command/push, no complex CI needed for v1
- **Maintainable by one person** — Aerosub team should be able to add a new tab/hotspot/video without needing to understand the full codebase

---

## 7. Suggested Tech Stack

- **React** (Vite for build tooling — fast dev server, simple static output)
- **TypeScript** — recommended given the manifest-driven config benefits from typed schemas (tabs/hotspots/videos)
- Plain CSS / CSS modules or Tailwind — no strong requirement either way
- No state management library needed — local component state (active tab, open video) is sufficient
- No routing library required for v1 (single page, tab state only) unless deep-linking to a specific tab is desired later

---

## 8. Content/Asset Checklist (before build can be finished)

- [ ] Finalize list of tabs/use-cases
- [ ] Source or create diagram image(s) for hotspot-based tabs (Hull at minimum)
- [ ] Map each available Eddyfi video to its correct surface/zone
- [ ] Compress/re-encode videos for web delivery (target reasonable file sizes per clip)
- [ ] Decide final video hosting provider and upload assets
- [ ] Confirm client-facing branding needs (Aerosub logo, colors, any Eddyfi co-branding requirements)

---

## 9. Success Criteria

- Client can independently explore at least one hotspot-based tab (Hull) and watch a relevant video without guidance
- Adding a new tab or hotspot requires only a manifest edit, not a code change
- Site loads and plays video smoothly on a standard client call setup (laptop, decent connection)
- Aerosub team can deploy and hand off a link to the client without needing to explain how it works
