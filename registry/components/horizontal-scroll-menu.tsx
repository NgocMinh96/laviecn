"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const SCROLL_AMOUNT = 200
const SCROLL_MULTIPLIER = 1.5

interface MenuItem {
  id: string
  name: string
}

interface HorizontalScrollMenuProps {
  menu: MenuItem[]
  selected?: string
  onFilterChange?: (filter: string) => void
}

interface ScrollState {
  canScrollLeft: boolean
  canScrollRight: boolean
}

const useHorizontalScroll = (scrollAmount = SCROLL_AMOUNT) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = useState<ScrollState>({
    canScrollLeft: false,
    canScrollRight: false,
  })

  const checkScroll = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setScrollState({
      canScrollLeft: scrollLeft > 0,
      canScrollRight: scrollLeft < scrollWidth - clientWidth - 1,
    })
  }, [])

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const container = scrollContainerRef.current
      if (!container) return

      const newScrollLeft =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    },
    [scrollAmount]
  )

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const container = scrollContainerRef.current
    if (!container) return

    const startX = e.pageX - container.offsetLeft
    const scrollLeft = container.scrollLeft

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * SCROLL_MULTIPLIER
      container.scrollLeft = scrollLeft - walk
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => checkScroll()
    const handleResize = () => checkScroll()

    container.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    checkScroll()

    return () => {
      container.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [checkScroll])

  return {
    scrollContainerRef,
    scrollState,
    scroll,
    handleMouseDown,
  }
}

export function HorizontalScrollMenu({
  menu,
  selected,
  onFilterChange,
}: HorizontalScrollMenuProps) {
  const [selectedFilter, setSelectedFilter] = useState(selected)
  const { scrollContainerRef, scrollState, scroll, handleMouseDown } = useHorizontalScroll()

  const handleFilterChange = useCallback(
    (filter: string) => {
      setSelectedFilter(filter)
      onFilterChange?.(filter)
    },
    [onFilterChange]
  )

  const buttonVariants = useMemo(
    () => ({
      selected: "default",
      unselected: "bg-secondary text-secondary-foreground hover:bg-secondary/50",
    }),
    []
  )

  return (
    <div className="relative w-full">
      <div className="container relative flex h-10 items-center justify-center px-3">
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "bg-background rounded-full absolute left-0 z-10 h-8 w-8",
            !scrollState.canScrollLeft && "hidden"
          )}
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="size-4" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto scrollbar-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="flex gap-2">
            {menu.map((item) => (
              <Button
                key={item.id}
                variant={selectedFilter === item.id ? "default" : "ghost"}
                className={cn(
                  "text-sm font-medium whitespace-nowrap h-8",
                  selectedFilter === item.id ? buttonVariants.selected : buttonVariants.unselected
                )}
                onClick={() => handleFilterChange(item.id)}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>

        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "bg-background rounded-full absolute right-0 z-10 h-8 w-8",
            !scrollState.canScrollRight && "hidden"
          )}
          onClick={() => scroll("right")}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
