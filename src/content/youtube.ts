// Converts a normal YouTube watch/share URL into an embeddable player URL.
// Paste share links as-is into the manifest (e.g. https://youtu.be/VIDEO_ID
// or https://www.youtube.com/watch?v=VIDEO_ID) — this handles the rest.
export function youtubeEmbedUrl(shareUrl: string): string {
  const videoId = extractYoutubeId(shareUrl)
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
}

export function isYoutubeUrl(url: string): boolean {
  return /(?:youtube\.com|youtu\.be)/.test(url)
}

function extractYoutubeId(url: string): string {
  const patterns = [/youtu\.be\/([^?&]+)/, /[?&]v=([^?&]+)/, /youtube\.com\/embed\/([^?&]+)/]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return url
}
