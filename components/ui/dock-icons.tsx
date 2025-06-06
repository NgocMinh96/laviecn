"use client"

import { memo, useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface DockIconProps {
  icons: React.ReactNode[]
  className?: string
  infiniteHover?: boolean
  movementSpeed?: number
}

const IconItem = memo(
  ({ icon, scale }: { icon: React.ReactNode; scale: number }) => (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "bottom", // Key change: Scales upwards from the bottom
      }}
      className="block size-7 flex-shrink-0 md:size-8" // Added block and flex-shrink-0 for better behavior
    >
      {icon}
    </span>
  )
)
IconItem.displayName = "IconItem"

export function DockIcons({
  icons,
  className,
  infiniteHover = false,
  movementSpeed = 10,
}: DockIconProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 10000, y: 10000 })
  const [scales, setScales] = useState<number[]>(
    new Array(icons.length).fill(1)
  )

  const [direction, setDirection] = useState(1) // 1 for right, -1 for left

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 10000, y: 10000 })
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const children = Array.from(
      containerRef.current.children
    ) as HTMLSpanElement[]

    const computeScale = (el: HTMLSpanElement | null) => {
      if (!el) return 1
      const rect = el.getBoundingClientRect()
      const centerX = (rect.left + rect.right) / 2
      // For a more Mac-like effect, consider the bottom of the icon for scaling
      const centerY = rect.bottom // Instead of center, use bottom for vertical calculations

      const dx = Math.abs(mouse.x - centerX)
      // For vertical distance, we want to scale based on proximity to the dock's base line.
      // If the mouse.y is also at the bottom of the container, then dy will be small.
      // Let's keep mouse.y as is for now since it's already aligned to the center of the dock.
      const dy = Math.abs(mouse.y - centerY) // This might need more fine-tuning if you want the scale to be y-sensitive.
      // For a simple Mac-like dock, mouse.y is often fixed to the dock's center/bottom.

      const dist = Math.sqrt(dx * dx + dy * dy)

      // Mac-like scaling often has a larger max scale and a more pronounced effect on neighbors.
      // Let's slightly increase the max scale and make the falloff smoother.
      // Math.min(Math.max(1.0, 1.6 - (dist - 20) / 100), 1.6) // Example for more pronounced effect
      return Math.min(Math.max(1.0, 1.2 - (dist - 20) / 150), 1.2)
    }

    const newScales = children.map(computeScale)
    setScales(newScales)
  }, [mouse]) // Re-run when mouse state changes

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (!infiniteHover) {
      container.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      })
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (!infiniteHover) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [infiniteHover, handleMouseMove, handleMouseLeave])

  useEffect(() => {
    if (!infiniteHover) {
      setMouse({ x: 10000, y: 10000 })
      return
    }

    const container = containerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const startX = containerRect.left
    const endX = containerRect.right

    const interval = setInterval(() => {
      setMouse((prevMouse) => {
        let currentX = prevMouse.x
        if (currentX === 10000) {
          currentX = startX
        }

        // Use a more dynamic step for smoother movement, or keep it fixed
        let step = 5
        if (movementSpeed !== undefined) {
          // Use movementSpeed prop
          step = (endX - startX) / (movementSpeed * 10) // Adjust calculation for movementSpeed
        }

        let newX = currentX + step * direction

        if (newX > endX) {
          newX = endX
          setDirection(-1)
        } else if (newX < startX) {
          newX = startX
          setDirection(1)
        }

        // The y-coordinate should be at the bottom of the container for "bottom" origin scaling
        return { x: newX, y: containerRect.bottom } // Key change: Mouse Y is at container bottom
      })
    }, 30) // Fixed interval for smoothness, movementSpeed now controls step

    return () => clearInterval(interval)
  }, [infiniteHover, direction, movementSpeed]) // Re-run when infiniteHover, direction, or movementSpeed changes

  return (
    <div
      ref={containerRef}
      className={cn(
        "z-10 flex items-end justify-center gap-x-3", // Key change: items-end for bottom alignment
        "[&_span]:transition-transform [&_span]:duration-100 [&_span]:ease-in-out",
        "overflow-visible px-10", // Changed from hidden to visible, as icons should "grow out"
        className
      )}
      // Added a min-height to ensure space for scaled icons
      style={{ minHeight: `${1 * 32 * 1.25}px` }} // Example: roughly 2x (base size * max scale) for height
    >
      {icons.map((icon, idx) => (
        <IconItem key={idx} icon={icon} scale={scales[idx]} />
      ))}
    </div>
  )
}
