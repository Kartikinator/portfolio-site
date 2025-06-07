"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

interface SkillBarProps {
  name: string
  percentage: number
}

export function SkillBar({ name, percentage }: SkillBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 300)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{percentage}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}
