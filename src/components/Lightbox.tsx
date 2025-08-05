"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-colors"
        aria-label="Close lightbox"
      >
        <X size={32} />
      </button>

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
      <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center p-4">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <Image
          src={currentPhoto.src || "/placeholder.svg"}
          alt={currentPhoto.alt}
          fill
          className={`object-contain transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          priority
          sizes="90vw"
        />
      </div>

      {/* Image Info */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white">
        <p className="text-lg font-medium mb-1">{currentPhoto.alt}</p>
        {photos.length > 1 && (
          <p className="text-sm text-gray-300">
            {currentIndex + 1} of {photos.length}
          </p>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {photos.length > 1 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2 max-w-[90vw] overflow-x-auto pb-2">
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
      )}
    </div>
  )
}
