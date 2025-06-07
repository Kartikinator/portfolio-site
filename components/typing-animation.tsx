"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  text: string
  typingSpeed?: number
  className?: string
}

export function TypingAnimation({ text, typingSpeed = 100, className }: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, typingSpeed])

  return <span className={className}>{displayText}</span>
}

interface RotatingTitleProps {
  prefixes: string[]
  baseSuffix: string
  typingSpeed?: number
  backspaceSpeed?: number
  delayBetweenWords?: number
  className?: string
}

export function RotatingTitle({
  prefixes,
  baseSuffix,
  typingSpeed = 100,
  backspaceSpeed = 50,
  delayBetweenWords = 2000,
  className,
}: RotatingTitleProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentPrefixIndex, setCurrentPrefixIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // If we're waiting between words
    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false)
        setIsDeleting(true)
      }, delayBetweenWords)
      return () => clearTimeout(timeout)
    }

    const currentPrefix = prefixes[currentPrefixIndex]

    // If we're deleting
    if (isDeleting) {
      if (displayText === "") {
        // Move to the next prefix
        setCurrentPrefixIndex((prev) => (prev + 1) % prefixes.length)
        setIsDeleting(false)
      } else {
        // Continue deleting
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1))
        }, backspaceSpeed)
      }
    }
    // If we're typing
    else {
      if (displayText === currentPrefix) {
        // Finished typing the current word
        setIsWaiting(true)
      } else {
        // Continue typing
        timeout = setTimeout(() => {
          setDisplayText(currentPrefix.slice(0, displayText.length + 1))
        }, typingSpeed)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, currentPrefixIndex, isDeleting, isWaiting, prefixes, typingSpeed, backspaceSpeed, delayBetweenWords])

  return (
    <span className={className}>
      {displayText} {baseSuffix}
    </span>
  )
}
