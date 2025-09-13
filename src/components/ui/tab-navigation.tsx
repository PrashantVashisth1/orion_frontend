"use client"

import { Button } from "@/components/ui/button"

interface TabNavigationProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {tabs.map((tab) => (
        <Button
          key={tab}
          onClick={() => onTabChange(tab)}
          variant={activeTab === tab ? "default" : "outline"}
          className={`px-6 py-2 rounded-full ${
            activeTab === tab
              ? "bg-white text-gray-900 shadow-md border-2 border-gray-300"
              : "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {tab}
        </Button>
      ))}
    </div>
  )
}
