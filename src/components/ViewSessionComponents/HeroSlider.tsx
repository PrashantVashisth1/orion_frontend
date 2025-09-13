"use client"

import type React from "react"
import { useState, useEffect } from "react"

export interface Session {
  id: number
  title: string
  host: string
  date: string
  time: string
  description: string
  avatar: string
}

export interface SlideData {
  id: number
  image: string
  alt: string
}

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides: SlideData[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      alt: "Tech entrepreneur presenting",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      alt: "Business meeting discussion",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      alt: "Startup team collaboration",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      alt: "Innovation workshop",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      alt: "AI and machine learning session",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      alt: "Digital transformation workshop",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl transform -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl transform translate-x-48 translate-y-48"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - TEXT */}
          <div className="text-center lg:text-left order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Explore What's New in Tech, Business, and Beyond


            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
               Trending Talks Across All Domains
            </p>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Get Started in Minutes
              </h3>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-xl text-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Register Now
                <svg
                  className="ml-3 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Slider */}
          <div className="relative order-2">
            <div className="relative w-full h-[600px] flex items-center justify-center">
              {/* Slider Container */}
              <div className="relative w-80 h-96">
                {slides.map((slide, index) => {
                  const position =
                    (index - currentSlide + slides.length) % slides.length

                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                        position === 0
                          ? "z-30 scale-110 translate-x-0 opacity-100"
                          : position === 1
                          ? "z-20 scale-95 translate-x-8 opacity-80"
                          : position === slides.length - 1
                          ? "z-20 scale-95 -translate-x-8 opacity-80"
                          : "z-10 scale-75 opacity-40"
                      }`}
                      style={{
                        transform: `
                          translateX(${
                            position === 0
                              ? 0
                              : position === 1
                              ? 40
                              : position === slides.length - 1
                              ? -40
                              : position < slides.length / 2
                              ? 80
                              : -80
                          }px) 
                          scale(${
                            position === 0
                              ? 1.1
                              : position === 1 || position === slides.length - 1
                              ? 0.95
                              : 0.75
                          })
                        `,
                        zIndex:
                          position === 0
                            ? 30
                            : position === 1 || position === slides.length - 1
                            ? 20
                            : 10,
                        opacity:
                          position === 0
                            ? 1
                            : position === 1 || position === slides.length - 1
                            ? 0.8
                            : 0.4,
                      }}
                    >
                      <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-600 bg-slate-800">
                        <img
                          src={slide.image || "/placeholder.svg"}
                          alt={slide.alt}
                          className="w-full h-full object-cover rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-3xl"></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? "w-8 h-3 bg-gradient-to-r from-purple-600 to-blue-600"
                      : "w-3 h-3 bg-slate-500 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSlider