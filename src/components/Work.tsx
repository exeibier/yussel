"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Lightbox from "../components/Lightbox"
import Navigation from '../components/Navigation';
import React from "react"

interface Photo {
  id: string
  src: string
  alt: string
}

  const highlightImages = Array.from({ length: 31 }, (_, i) => {
    const id = (i + 1).toString();
    return {
      id,
      src: `/work/highlight/highlight${id.padStart(3, '0')}.jpg`,
      alt: `highlight Photography ${id}`
    };
  });
    

const categoryData: Record<
  string,
  {
    name: string
    description: string
    photos: Photo[]
  }
> = {
  highlight: {
    name: "highlight",
    description:
      "Capturing the essence and personality of individuals through intimate and expressive portrait photography.",
    photos: highlightImages,
  },
}

export default function CategoryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  const category = categoryData.highlight
  useEffect(() => {
    const handleLightboxNavigate = (e: CustomEvent) => {
      setCurrentImageIndex(e.detail)
    }

    window.addEventListener("lightbox-navigate", handleLightboxNavigate as EventListener)
    return () => window.removeEventListener("lightbox-navigate", handleLightboxNavigate as EventListener)
  }, [])

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/" className="text-yellow-600 hover:text-yellow-700 font-semibold">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    )
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % category.photos.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + category.photos.length) % category.photos.length)
  }

  const handleImageLoad = (photoId: string) => {
    setLoadedImages((prev) => new Set(prev).add(photoId))
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="mt-9 bg-gray-50">
        {/* Photo Grid - Masonry Style */}
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {category.photos.map((photo, index) => (
              <div
                key={photo.id}
                className="break-inside-avoid group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => openLightbox(index)}
              >
                <div className="relative">
                  {!loadedImages.has(photo.id) && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`w-full h-auto transition-all duration-500 group-hover:scale-105 ${
                      loadedImages.has(photo.id) ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(photo.id)}
                    style={{ width: '100%', height: 'auto' }}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Lightbox */}
        <Lightbox
          photos={category.photos}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={previousImage}
        />
      </div>
    </div>

  )
}
