"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface Photo {
  id: string
  src: string
  alt: string
}

interface LightboxProps {
  photos: Photo[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export default function Lightbox({ photos, currentIndex, isOpen, onClose, onNext, onPrevious }: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          onPrevious()
          break
        case "ArrowRight":
          onNext()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, onNext, onPrevious])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    setIsLoading(true)
  }, [currentIndex])

  if (!isOpen || !photos[currentIndex]) return null

  const currentPhoto = photos[currentIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/95  flex flex-col">
      {/* Top Bar with Close Button */}
      <div className="flex justify-end p-4 z-10">
        <button
          onClick={onClose}
          className="p-2 text-white hover:text-gray-300 transition-colors"
          aria-label="Close lightbox"
        >
          <X size={32} />
        </button>
      </div>

      {/* Main Image Area */}
      <div className="flex-1 relative flex items-center justify-center px-16 md:px-20">
        {/* Navigation Buttons */}
        {photos.length > 1 && (
          <>
            <button
              onClick={onPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors disabled:opacity-50"
              disabled={currentIndex === 0}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors disabled:opacity-50"
              disabled={currentIndex === photos.length - 1}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        {/* Image Container */}
        <div className="relative w-full h-full max-w-full max-h-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <Image
            src={currentPhoto.src || "/placeholder.svg"}
            alt={currentPhoto.alt}
            fill
            className={`object-contain transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
            onLoad={() => setIsLoading(false)}
            priority
            sizes="(max-width: 768px) calc(100vw - 8rem), calc(100vw - 10rem)"
          />
        </div>
      </div>

      {/* Bottom Section with Image Info and Thumbnails */}
      <div className="flex-shrink-0 pb-4">
        {/* Image Info */}
        <div className="text-center text-white mb-4">
          <p className="text-lg font-medium mb-1">{currentPhoto.alt}</p>
          {photos.length > 1 && (
            <p className="text-sm text-gray-300">
              {currentIndex + 1} of {photos.length}
            </p>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {photos.length > 1 && (
          <div className="flex justify-center px-4">
            <div className="flex space-x-2 max-w-full overflow-x-auto pb-2">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => {
                    const event = new CustomEvent("lightbox-navigate", { detail: index })
                    window.dispatchEvent(event)
                  }}
                  className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden transition-all duration-200 ${
                    index === currentIndex ? "ring-2 ring-white opacity-100" : "opacity-60 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Backdrop Click Handler */}
      <div className="absolute inset-0 -z-10" onClick={onClose} style={{ zIndex: -1 }} />
    </div>
  )
}
