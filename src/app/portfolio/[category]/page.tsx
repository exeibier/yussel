"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Lightbox from "../../../components/Lightbox"
import Contact from "../../../components/Contact"
import Navigation from '../../../components/Navigation';
import React from "react"
interface CategoryPageProps {
  params: Promise<{ category: string }>
}

interface Photo {
  id: string
  src: string
  alt: string
}

  const commercialImages = Array.from({ length: 89 }, (_, i) => {
    const id = (i + 1).toString();
    return {
      id,
      src: `/work/commercial/commercial${id.padStart(3, '0')}.jpg`,
      alt: `commercial Photography ${id}`
    };
  });
  const djImages = Array.from({ length: 49 }, (_, i) => {
    const id = (i + 1).toString();
    return {
      id,
      category: 'dj',
      src: `/work/dj/dj${String(id).padStart(3, '0')}.jpg`,
      alt: `dj Photography ${id}`
    };
  });
  const documentalImages = Array.from({ length: 75 }, (_, i) => {
    const id = (i + 1).toString();
    return {
      id,
      category: 'documenta',
      src: `/work/documental/documental${String(id).padStart(3, '0')}.jpg`,
      alt: `Documental Photography ${id}`
    };
  });
  const musicImages = Array.from({ length: 127 }, (_, i) => {
    const id = (i + 1).toString();
    return {
      id,
      category: 'music',
      src: `/work/music/music${String(id).padStart(3, '0')}.jpg`,
      alt: `music Photography ${id}`
    };
  });
  const portraitImages = Array.from({ length: 50 }, (_, i) => {
    const id = (i + 1).toString();
    return {
      id,
      category: 'portrait',
      src: `/work/portrait/portrait${String(id).padStart(3, '0')}.jpg` ,
      alt: `portrait Photography ${id}` 
    };
  });
  const skateImages = Array.from({ length: 10 }, (_, i) => {
    const id = (i + 1).toString();
    return {
      id,
      category: 'skate',
      src: `/work/skate/skate${String(id).padStart(3, '0')}.jpg`,
      alt:`skate Photography ${id}` 
    };
  });
  const tattooImages = Array.from({ length: 16 }, (_, i) => {
    const id = (i + 1).toString();
    return {
      id,
      category: 'tattoo',
      src: `/work/tattoo/tattoo${String(id).padStart(3, '0')}.jpg`,
      alt: `tattoo Photography ${id}`
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
  commercial: {
    name: "Commercial",
    description:
      "Capturing the essence and personality of individuals through intimate and expressive portrait photography.",
    photos: commercialImages,
  },
  documental: {
    name: "Documental",
    description:
      "Documenting love stories and celebrating life's most precious moments with timeless wedding photography.",
    photos: documentalImages,
  },
  music: {
    name: "Music",
    description: "Exploring the natural world through breathtaking landscapes and intimate nature photography.",
    photos: musicImages,
  },
  portrait: {
    name: "Portrait Photography",
    description:
      "Capturing authentic moments and urban life through candid street photography and documentary storytelling.",
    photos: portraitImages,
  },
  skate: {
    name: "Skate",
    description: "Editorial and commercial fashion photography showcasing style, creativity, and artistic vision.",
    photos: skateImages,
  },
  tattoo: {
    name: "Tattoo",
    description: "Professional event photography capturing corporate gatherings, celebrations, and special occasions.",
    photos: tattooImages,
  },
  dj: {
    name: "DJ",
    description: "Architectural photography highlighting design, structure, and the interplay of light and space.",
    photos: djImages,
  },
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  const { category: categoryParam } = React.use(params)
  const category = categoryData[categoryParam]
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
          <Link href="/" className="text-black hover:text-black-700 font-semibold">
            ← Back to home
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
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <Link
              href="/"
              className="inline-flex items-center text-black  font-semibold mb-6 transition-colors border-b-2 border-transparent hover:border-black transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">{category.name}</h1>
          </div>
        </div>

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
        {/* Contact Section */}
      </div>
      <Contact />
    </div>

  )
}
