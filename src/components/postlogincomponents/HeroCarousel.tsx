"use client"

import type React from "react"
import { useState, useEffect } from "react"

const HeroCarousel: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0)

  const overlayImages = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % overlayImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [overlayImages.length])

  return (
    <div className="absolute inset-0 z-10">
      {overlayImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
            index === currentImage ? "opacity-30 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={`Hero overlay ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Enhanced Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {overlayImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`relative overflow-hidden rounded-full transition-all duration-500 ease-out ${
              index === currentImage ? "w-8 h-3 bg-white shadow-lg" : "w-3 h-3 bg-white/50 hover:bg-white/75"
            }`}
          >
            {index === currentImage && (
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel
