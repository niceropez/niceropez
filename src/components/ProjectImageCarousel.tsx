import { useEffect, useMemo, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { LoadingComponent } from './LoadingComponent'
import type { Language } from '../types'

interface ProjectImageCarouselProps {
  projectSlug: string
  projectTitle: string
  language: Language
}

const imageModules = import.meta.glob('../assets/projects/**/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const slugFolderMap: Record<string, string> = {
  'te-cuida-el-agustino': 'te-cuida-agustino',
  ailegal: 'ai-legal',
}

function byNumericFilename(a: string, b: string): number {
  const aName = a.split('/').pop() ?? ''
  const bName = b.split('/').pop() ?? ''
  const aNumber = Number.parseInt(aName.split('.')[0], 10)
  const bNumber = Number.parseInt(bName.split('.')[0], 10)

  if (Number.isNaN(aNumber) || Number.isNaN(bNumber)) {
    return aName.localeCompare(bName)
  }

  return aNumber - bNumber
}

function resolveProjectFolder(projectSlug: string): string {
  return slugFolderMap[projectSlug] ?? projectSlug
}

function ProjectImageCarousel({ projectSlug, projectTitle, language }: ProjectImageCarouselProps) {
  const [slideMetrics, setSlideMetrics] = useState({ width: 46, gap: 2.6 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalImageLoaded, setIsModalImageLoaded] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isPointerDown, setIsPointerDown] = useState(false)
  const [isPageVisible, setIsPageVisible] = useState(true)
  const dragStartXRef = useRef<number | null>(null)
  const dragDeltaXRef = useRef(0)
  const lastSwipeAtRef = useRef(0)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [viewportWidth, setViewportWidth] = useState(0)

  useEffect(() => {
    setCurrentIndex(0)
    setLoadedImages({})
    setIsModalImageLoaded(false)
    setIsModalOpen(false)
    setIsPaused(false)
    setIsPointerDown(false)
  }, [projectSlug])

  useEffect(() => {
    const updateSlideMetrics = () => {
      const viewport = window.innerWidth

      if (viewport < 640) {
        setSlideMetrics({ width: 84, gap: 3.2 })
        return
      }

      if (viewport < 1024) {
        setSlideMetrics({ width: 66, gap: 2.8 })
        return
      }

      setSlideMetrics({ width: 46, gap: 2.6 })
    }

    updateSlideMetrics()
    window.addEventListener('resize', updateSlideMetrics)
    return () => window.removeEventListener('resize', updateSlideMetrics)
  }, [])

  useEffect(() => {
    const updateViewportWidth = () => {
      if (!viewportRef.current) {
        return
      }

      setViewportWidth(viewportRef.current.clientWidth)
    }

    updateViewportWidth()

    if (!viewportRef.current) {
      return
    }

    const observer = new ResizeObserver(updateViewportWidth)
    observer.observe(viewportRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const imageUrls = useMemo(() => {
    const folder = resolveProjectFolder(projectSlug)
    const prefix = `/assets/projects/${folder}/`

    return Object.entries(imageModules)
      .filter(([modulePath]) => modulePath.includes(prefix))
      .sort(([a], [b]) => byNumericFilename(a, b))
      .map(([, moduleValue]) => moduleValue)
  }, [projectSlug])

  if (!imageUrls.length) {
    return <LoadingComponent seed={`no-images-${projectSlug}`} />
  }

  const currentImage = imageUrls[currentIndex]
  const isImageLoaded = loadedImages[currentImage] === true
  const slideWidthPx = (viewportWidth * slideMetrics.width) / 100
  const slideGapPx = (viewportWidth * slideMetrics.gap) / 100
  const trackOffset = viewportWidth / 2 - slideWidthPx / 2 - currentIndex * (slideWidthPx + slideGapPx)
  const labels = {
    previous: language === 'es' ? 'Imagen anterior' : 'Previous image',
    next: language === 'es' ? 'Siguiente imagen' : 'Next image',
    slide: language === 'es' ? 'Imagen' : 'Image',
    openFullscreen: language === 'es' ? 'Abrir imagen completa' : 'Open full image',
    enlarge: language === 'es' ? 'Ampliar' : 'Enlarge',
    close: language === 'es' ? 'Cerrar' : 'Close',
  }

  const goToImage = (newIndex: number) => {
    setCurrentIndex(newIndex)
    setIsModalImageLoaded(false)
  }

  const goPrevious = () => {
    const previousIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length
    goToImage(previousIndex)
  }

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % imageUrls.length
    goToImage(nextIndex)
  }

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
    setIsModalImageLoaded(false)
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragStartXRef.current = event.clientX
    dragDeltaXRef.current = 0
    setIsPointerDown(true)
    setIsPaused(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) {
      return
    }

    dragDeltaXRef.current = event.clientX - dragStartXRef.current
  }

  const handlePointerEnd = () => {
    const threshold = 50

    if (dragStartXRef.current !== null && Math.abs(dragDeltaXRef.current) > threshold) {
      lastSwipeAtRef.current = Date.now()
      if (dragDeltaXRef.current > 0) {
        goPrevious()
      } else {
        goNext()
      }
    }

    dragStartXRef.current = null
    dragDeltaXRef.current = 0
    setIsPointerDown(false)
  }

  useEffect(() => {
    const handleVisibility = () => {
      setIsPageVisible(!document.hidden)
    }

    handleVisibility()
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  useEffect(() => {
    const canAutoplay =
      imageUrls.length > 1 &&
      !isModalOpen &&
      !isPaused &&
      !isPointerDown &&
      isPageVisible &&
      !prefersReducedMotion

    if (!canAutoplay) {
      return
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length)
    }, 3800)

    return () => {
      window.clearInterval(timer)
    }
  }, [imageUrls.length, isModalOpen, isPaused, isPointerDown, isPageVisible, prefersReducedMotion])

  const modal = isModalOpen
    ? createPortal(
      <div
        className="detail-carousel-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${projectTitle} ${labels.slide} ${currentIndex + 1}`}
        onClick={() => setIsModalOpen(false)}
      >
        <div className="detail-carousel-modal-content" onClick={(event) => event.stopPropagation()}>
          {!isModalImageLoaded && <LoadingComponent seed={`modal-${projectSlug}-${currentIndex}`} inline />}

          <button
            type="button"
            className="detail-carousel-modal-close"
            aria-label={labels.close}
            onClick={() => setIsModalOpen(false)}
          >
            <X size={16} strokeWidth={2.2} aria-hidden="true" />
          </button>

          <img
            key={`modal-${currentImage}`}
            src={currentImage}
            alt={`${projectTitle} - ${labels.slide} ${currentIndex + 1}`}
            className={`detail-carousel-modal-image ${isModalImageLoaded ? 'is-visible' : ''}`}
            onLoad={() => setIsModalImageLoaded(true)}
            onError={() => setIsModalImageLoaded(true)}
          />

          {imageUrls.length > 1 && (
            <>
              <button
                type="button"
                className="detail-carousel-btn detail-carousel-btn-prev detail-carousel-btn-modal"
                aria-label={labels.previous}
                onClick={goPrevious}
              >
                <ChevronLeft size={18} strokeWidth={2.2} aria-hidden="true" />
              </button>

              <button
                type="button"
                className="detail-carousel-btn detail-carousel-btn-next detail-carousel-btn-modal"
                aria-label={labels.next}
                onClick={goNext}
              >
                <ChevronRight size={18} strokeWidth={2.2} aria-hidden="true" />
              </button>

              <div className="detail-carousel-modal-counter" aria-hidden="true">
                {currentIndex + 1} / {imageUrls.length}
              </div>
            </>
          )}
        </div>
      </div>,
      document.body,
    )
    : null

  useEffect(() => {
    if (!isModalOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false)
      }

      if (event.key === 'ArrowLeft') {
        goPrevious()
      }

      if (event.key === 'ArrowRight') {
        goNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen, currentIndex])

  return (
    <>
      <section
        className="detail-hero detail-fade detail-hero-carousel"
        aria-label={`${projectTitle} gallery`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (!isPointerDown) {
            setIsPaused(false)
          }
        }}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setIsPaused(false)
          }
        }}
      >
        {!isImageLoaded && <LoadingComponent seed={`${projectSlug}-${currentIndex}`} inline />}

        <div
          ref={viewportRef}
          className="detail-carousel-viewport"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          <div
            className="detail-carousel-track"
            style={{
              transform: `translate3d(${trackOffset}px, 0, 0)`,
            }}
          >
            {imageUrls.map((imageUrl, imageIndex) => (
              <button
                key={imageUrl}
                type="button"
                className={`detail-carousel-slide ${imageIndex === currentIndex ? 'is-active' : ''}`}
                style={{ width: `${slideMetrics.width}%`, marginRight: `${slideMetrics.gap}%` }}
                aria-label={`${labels.openFullscreen} ${imageIndex + 1}`}
                onClick={() => {
                  if (Date.now() - lastSwipeAtRef.current < 280) {
                    return
                  }

                  if (imageIndex === currentIndex) {
                    openModal(imageIndex)
                    return
                  }

                  goToImage(imageIndex)
                }}
              >
                <img
                  src={imageUrl}
                  alt={`${projectTitle} - ${labels.slide} ${imageIndex + 1}`}
                  className="detail-carousel-image"
                  onLoad={() => {
                    setLoadedImages((prev) => ({ ...prev, [imageUrl]: true }))
                  }}
                  onError={() => {
                    setLoadedImages((prev) => ({ ...prev, [imageUrl]: true }))
                  }}
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>

        {imageUrls.length > 1 && (
          <>
            <button
              type="button"
              className="detail-carousel-btn detail-carousel-btn-prev"
              aria-label={labels.previous}
              onClick={goPrevious}
            >
              <ChevronLeft size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="detail-carousel-btn detail-carousel-btn-next"
              aria-label={labels.next}
              onClick={goNext}
            >
              <ChevronRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </>
        )}

        <button
          type="button"
          className="detail-carousel-expand-btn"
          aria-label={labels.openFullscreen}
          onClick={() => openModal(currentIndex)}
        >
          <Maximize2 size={14} strokeWidth={2.2} aria-hidden="true" />
          <span>{labels.enlarge}</span>
        </button>

        {modal}
      </section>

      {imageUrls.length > 1 && (
        <div className="detail-carousel-dots" aria-hidden="true">
          {imageUrls.map((_, imageIndex) => (
            <button
              key={`${projectSlug}-dot-${imageIndex}`}
              type="button"
              className={`detail-carousel-dot ${imageIndex === currentIndex ? 'is-active' : ''}`}
              onClick={() => goToImage(imageIndex)}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default ProjectImageCarousel
