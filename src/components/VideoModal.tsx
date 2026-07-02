import { useEffect, useState } from 'react'
import { isYoutubeUrl, youtubeEmbedUrl } from '../content/youtube'
import './VideoModal.css'

interface VideoModalProps {
  videoUrl: string
  title: string
  onClose: () => void
}

export function VideoModal({ videoUrl, title, onClose }: VideoModalProps) {
  const [hasError, setHasError] = useState(false)
  const isYoutube = isYoutubeUrl(videoUrl)

  useEffect(() => {
    setHasError(false)
  }, [videoUrl])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="video-modal__backdrop" onClick={onClose} role="presentation">
      <div
        className="video-modal__panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="video-modal__header">
          <h2 className="video-modal__title">{title}</h2>
          <button
            type="button"
            className="video-modal__close"
            onClick={onClose}
            aria-label="Close video"
          >
            ×
          </button>
        </div>

        <div className="video-modal__body">
          {hasError ? (
            <div className="video-modal__error">
              <p>This video couldn't be loaded.</p>
              <p className="video-modal__error-detail">Check the video URL in the content manifest.</p>
            </div>
          ) : isYoutube ? (
            <iframe
              key={videoUrl}
              className="video-modal__video"
              src={youtubeEmbedUrl(videoUrl)}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              onError={() => setHasError(true)}
            />
          ) : (
            <video
              key={videoUrl}
              className="video-modal__video"
              src={videoUrl}
              controls
              autoPlay
              onError={() => setHasError(true)}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  )
}
