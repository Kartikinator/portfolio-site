"use client"

import { useEffect, useRef, useState } from "react"

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  skill: string
  isHovered: boolean
  hoverTransition: number // 0 to 1 for animation
}

interface InteractiveBackgroundProps {
  className?: string
}

export function InteractiveBackground({ className }: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Skills list
  const skills = [
    // Programming Languages
    "Python",
    "JavaScript",
    "TypeScript",
    "C++",
    "Java",
    "C#",
    // AI/ML
    "TensorFlow",
    "PyTorch",
    "Machine Learning",
    "Computer Vision",
    "LLMs",
    "NLP",
    "Data Science",
    // Cloud & DevOps
    "AWS",
    "Docker",
    "CI/CD",
    "Jenkins",
    "Git",
    "Cloud Computing",
    "DevOps",
    // Full Stack
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "MySQL",
    "REST APIs",
    "System Design",
  ]

  // Initialize stars
  const initStars = (width: number, height: number) => {
    const stars: Star[] = []
    const numStars = Math.min(skills.length, Math.floor((width * height) / 10000)) // Adjust density based on area

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5, // Slow horizontal movement
        vy: (Math.random() - 0.5) * 0.5, // Slow vertical movement
        size: Math.random() * 2 + 1.5, // Size between 1.5-3.5
        opacity: Math.random() * 0.5 + 0.3, // Opacity between 0.3-0.8
        skill: skills[i % skills.length], // Assign a skill from the list
        isHovered: false,
        hoverTransition: 0,
      })
    }

    starsRef.current = stars
  }

  // Update canvas size
  const updateCanvasSize = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const { width, height } = rect

    // Set actual canvas size for crisp rendering
    canvas.width = width * window.devicePixelRatio
    canvas.height = height * window.devicePixelRatio

    // Scale context to match device pixel ratio
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    setDimensions({ width, height })
    initStars(width, height)
  }

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const { width, height } = dimensions
    const mouse = mouseRef.current

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Update and draw stars
    starsRef.current.forEach((star) => {
      // Check if star is hovered
      const dx = mouse.x - star.x
      const dy = mouse.y - star.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const hoverDistance = 50 // Distance to trigger hover

      // Update hover state
      const wasHovered = star.isHovered
      star.isHovered = distance < hoverDistance

      // Update hover transition (for smooth animation)
      if (star.isHovered && star.hoverTransition < 1) {
        star.hoverTransition = Math.min(1, star.hoverTransition + 0.1)
      } else if (!star.isHovered && star.hoverTransition > 0) {
        star.hoverTransition = Math.max(0, star.hoverTransition - 0.05)
      }

      // Only move stars that aren't being hovered
      if (star.hoverTransition < 0.5) {
        // Update position
        star.x += star.vx
        star.y += star.vy

        // Wrap around edges
        if (star.x < 0) star.x = width
        if (star.x > width) star.x = 0
        if (star.y < 0) star.y = height
        if (star.y > height) star.y = 0
      }

      // Draw star or text based on hover state
      if (star.hoverTransition > 0) {
        // Draw text for skill
        const fontSize = 12 + star.hoverTransition * 4
        ctx.font = `${fontSize}px Inter, system-ui, sans-serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Text with glow effect
        const textOpacity = star.opacity + star.hoverTransition * 0.5

        // Draw glow
        ctx.fillStyle = `rgba(148, 163, 184, ${textOpacity * 0.3})`
        ctx.fillText(star.skill, star.x + 1, star.y + 1)

        // Draw text
        ctx.fillStyle = `rgba(148, 163, 184, ${textOpacity})`
        ctx.fillText(star.skill, star.x, star.y)
      }

      // Always draw the star, but fade it out when hovering
      if (star.hoverTransition < 1) {
        const starOpacity = star.opacity * (1 - star.hoverTransition)
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(148, 163, 184, ${starOpacity})`
        ctx.fill()
      }
    })

    // Draw connections to mouse
    const connectionDistance = 150

    starsRef.current.forEach((star) => {
      const dx = mouse.x - star.x
      const dy = mouse.y - star.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < connectionDistance && star.hoverTransition < 0.5) {
        const opacity = (1 - distance / connectionDistance) * 0.5

        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    })

    // Draw connections between nearby stars
    starsRef.current.forEach((star, i) => {
      if (star.hoverTransition > 0.5) return // Skip heavily hovered stars

      starsRef.current.slice(i + 1).forEach((otherStar) => {
        if (otherStar.hoverTransition > 0.5) return // Skip heavily hovered stars

        const dx = star.x - otherStar.x
        const dy = star.y - otherStar.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const opacity = (1 - distance / 100) * 0.1

          ctx.beginPath()
          ctx.moveTo(star.x, star.y)
          ctx.lineTo(otherStar.x, otherStar.y)
          ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })
    })

    animationRef.current = requestAnimationFrame(animate)
  }

  // Handle mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 } // Move mouse off-screen
  }

  useEffect(() => {
    updateCanvasSize()

    // Start animation
    animate()

    // Add event listeners
    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove)
      canvas.addEventListener("mouseleave", handleMouseLeave)
    }

    // Handle window resize
    const handleResize = () => {
      setTimeout(updateCanvasSize, 100) // Debounce resize
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove)
        canvas.removeEventListener("mouseleave", handleMouseLeave)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [dimensions.width, dimensions.height])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
