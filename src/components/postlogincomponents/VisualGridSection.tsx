"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface GridItem {
  id: number
  image: string
  title: string
  caption: string
  height: string
}

const VisualGridSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  const visualGridItems: GridItem[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "AI-Powered Analytics",
      caption: "Transform your data into actionable insights",
      height: "h-80",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1497436072909-f5e4be1707c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      title: "Sustainable Tech",
      caption: "Green solutions for tomorrow",
      height: "h-60",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Fintech Revolution",
      caption: "Banking reimagined for the digital age",
      height: "h-96",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80",
      title: "Health Innovation",
      caption: "Personalized healthcare solutions",
      height: "h-72",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      title: "EdTech Platform",
      caption: "Learning without boundaries",
      height: "h-56",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Smart Cities",
      caption: "Urban planning meets technology",
      height: "h-84",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = Number.parseInt(entry.target.getAttribute("data-item-id") || "0")
            setVisibleItems((prev) => [...prev, itemId])
          }
        })
      },
      { threshold: 0.1 },
    )

    const items = document.querySelectorAll("[data-item-id]")
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Innovation Showcase</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the latest trends and breakthrough technologies shaping our future
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {visualGridItems.map((item, index) => (
            <div
              key={item.id}
              data-item-id={item.id}
              className={`break-inside-avoid ${item.height} group cursor-pointer transition-all duration-700 ease-out transform ${
                visibleItems.includes(item.id)
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-3 hover:scale-[1.02]">
                <div className="relative h-2/3 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
                <div className="p-6 h-1/3 flex flex-col justify-center relative">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.caption}</p>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VisualGridSection
