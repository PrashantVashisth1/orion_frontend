"use client"

import { useState, useEffect, useRef } from "react"
import { TrendingUp, Users, Rocket, DollarSign } from "lucide-react"

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const stats = [
    {
      icon: Rocket,
      value: 2500,
      label: "Active Startups",
      suffix: "+",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      icon: Users,
      value: 50000,
      label: "Community Members",
      suffix: "+",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: DollarSign,
      value: 150,
      label: "Million Funded",
      suffix: "M+",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      icon: TrendingUp,
      value: 95,
      label: "Success Rate",
      suffix: "%",
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (isVisible) {
        const duration = 2000
        const steps = 60
        const increment = value / steps
        let current = 0

        const timer = setInterval(() => {
          current += increment
          if (current >= value) {
            setCount(value)
            clearInterval(timer)
          } else {
            setCount(Math.floor(current))
          }
        }, duration / steps)

        return () => clearInterval(timer)
      }
    }, [isVisible, value])

    return (
      <span className="text-4xl md:text-5xl font-bold">
        {count.toLocaleString()}
        {suffix}
      </span>
    )
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powering Innovation
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who trust us to accelerate their startup journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>

                <div className={`${stat.color} mb-2`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                <p className="text-gray-600 font-medium text-lg">{stat.label}</p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
