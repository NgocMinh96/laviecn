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
        transformOrigin: "bottom",
      }}
      className="block size-7 flex-shrink-0 md:size-8"
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
      const centerY = rect.bottom
      const dx = Math.abs(mouse.x - centerX)
      const dy = Math.abs(mouse.y - centerY)
      const dist = Math.sqrt(dx * dx + dy * dy)
      return Math.min(Math.max(1.0, 1.2 - (dist - 20) / 150), 1.2)
    }

    const newScales = children.map(computeScale)
    setScales(newScales)
  }, [mouse])

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

        let step = 5
        if (movementSpeed !== undefined) {
          step = (endX - startX) / (movementSpeed * 10)
        }

        let newX = currentX + step * direction

        if (newX > endX) {
          newX = endX
          setDirection(-1)
        } else if (newX < startX) {
          newX = startX
          setDirection(1)
        }

        return { x: newX, y: containerRect.bottom }
      })
    }, 30)

    return () => clearInterval(interval)
  }, [infiniteHover, direction, movementSpeed])

  return (
    <div
      ref={containerRef}
      className={cn(
        "z-10 flex items-end justify-center gap-x-3",
        "[&_span]:transition-transform [&_span]:duration-100 [&_span]:ease-in-out",
        "overflow-visible px-10",
        className
      )}
      style={{ minHeight: `${1 * 32 * 1.25}px` }}
    >
      {icons.map((icon, idx) => (
        <IconItem key={idx} icon={icon} scale={scales[idx]} />
      ))}
    </div>
  )
}
