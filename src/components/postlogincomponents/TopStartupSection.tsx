"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Star, TrendingUp, Users, ArrowRight } from "lucide-react"

interface Startup {
  id: number
  logo: string
  name: string
  description: string
  tag: string
  tagColor: string
  metrics: {
    funding: string
    employees: string
    growth: string
  }
}

const TopStartupsSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  const topStartups: Startup[] = [
    {
      id: 1,
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
      name: "TechFlow AI",
      description:
        "Revolutionary AI platform transforming business operations with intelligent automation and predictive analytics.",
      tag: "Unicorn",
      tagColor: "bg-purple-100 text-purple-700 border-purple-200",
      metrics: { funding: "$2.1B", employees: "500+", growth: "300%" },
    },
    {
      id: 2,
      logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
      name: "GreenEnergy Pro",
      description:
        "Sustainable energy solutions powering the future of clean technology with innovative solar and wind systems.",
      tag: "Rising Star",
      tagColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
      metrics: { funding: "$150M", employees: "200+", growth: "250%" },
    },
    {
      id: 3,
      logo: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
      name: "HealthSync",
      description:
        "Digital health platform connecting patients with personalized care solutions through AI-driven diagnostics.",
      tag: "Unicorn",
      tagColor: "bg-purple-100 text-purple-700 border-purple-200",
      metrics: { funding: "$1.8B", employees: "400+", growth: "180%" },
    },
    {
      id: 4,
      logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
      name: "FinanceFlow",
      description:
        "Next-generation fintech platform revolutionizing digital payments and banking with blockchain technology.",
      tag: "Rising Star",
      tagColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
      metrics: { funding: "$300M", employees: "150+", growth: "400%" },
    },
    {
      id: 5,
      logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
      name: "EduVerse",
      description:
        "Immersive learning platform combining VR technology with educational content for next-gen education.",
      tag: "Innovation Leader",
      tagColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
      metrics: { funding: "$120M", employees: "100+", growth: "220%" },
    },
    {
      id: 6,
      logo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
      name: "SmartLogistics",
      description:
        "AI-driven supply chain optimization for global commerce efficiency with real-time tracking and analytics.",
      tag: "Rising Star",
      tagColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
      metrics: { funding: "$200M", employees: "180+", growth: "350%" },
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = Number.parseInt(entry.target.getAttribute("data-card-id") || "0")
            setVisibleCards((prev) => [...prev, cardId])
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = document.querySelectorAll("[data-card-id]")
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-100/50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100/50 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
              Top Startups
            </span>{" "}
            of the Year
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 mx-auto rounded-full mb-6 animate-pulse"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet the game-changing companies that are redefining industries and creating the future
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topStartups.map((startup, index) => (
            <div
              key={startup.id}
              data-card-id={startup.id}
              className={`group cursor-pointer transition-all duration-700 ease-out transform ${
                visibleCards.includes(startup.id)
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-12 scale-95"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-4 hover:scale-[1.02] overflow-hidden">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-sm"></div>

                <div className="relative bg-white rounded-3xl p-8 m-0.5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={startup.logo || "/placeholder.svg"}
                          alt={`${startup.name} logo`}
                          className="w-16 h-16 rounded-2xl shadow-md object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                            <Star className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                          {startup.name}
                        </h3>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${startup.tagColor} transition-all duration-300 group-hover:scale-105`}
                        >
                          {startup.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    {startup.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-xl group-hover:bg-indigo-50 transition-colors duration-300">
                      <div className="text-sm font-semibold text-indigo-600">{startup.metrics.funding}</div>
                      <div className="text-xs text-gray-500">Funding</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl group-hover:bg-purple-50 transition-colors duration-300">
                      <div className="text-sm font-semibold text-purple-600">{startup.metrics.employees}</div>
                      <div className="text-xs text-gray-500">Team</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl group-hover:bg-emerald-50 transition-colors duration-300">
                      <div className="text-sm font-semibold text-emerald-600">{startup.metrics.growth}</div>
                      <div className="text-xs text-gray-500">Growth</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>Growing</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>Hiring</span>
                      </div>
                    </div>
                    <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium group-hover:translate-x-1 transition-all duration-300">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopStartupsSection
