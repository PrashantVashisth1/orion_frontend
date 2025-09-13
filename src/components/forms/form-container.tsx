"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface FormContainerProps {
  children: ReactNode
  onSubmit: (e: React.FormEvent) => void
}

export function FormContainer({ children, onSubmit }: FormContainerProps) {
  return (
    <>
      <Card className="bg-blue-300 shadow-lg border-0 rounded-3xl overflow-hidden">
        <CardContent className="p-8 bg-gradient-to-br from-blue-200 to-blue-400">
          <form onSubmit={onSubmit} className="space-y-6">
            {children}
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8">
        <Button
          onClick={onSubmit}
          className="bg-blue-900 hover:bg-blue-800 text-white px-12 py-3 rounded-full text-lg font-semibold"
        >
          POST
        </Button>
      </div>
    </>
  )
}
