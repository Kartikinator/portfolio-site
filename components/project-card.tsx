"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  repoUrl: string
}

export function ProjectCard({ title, description, image, tags, demoUrl, repoUrl }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          <Button asChild size="sm" variant="outline" className="gap-1">
            <Link href={demoUrl} target="_blank" rel="noreferrer">
              <ArrowUpRight className="h-4 w-4" />
              Demo
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="gap-1">
            <Link href={repoUrl} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              Code
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
