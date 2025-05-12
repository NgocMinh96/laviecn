"use client"

import { ChevronUp } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

type ScrollToTopProps = {
  size?: number
}

const baseColor = "115, 115, 115"
const bgColor = `rgb(${baseColor}, 0.1)`
const trackColor = `rgb(${baseColor}, 0.2)`
const progressColor = `rgb(${baseColor}, 1)`

export default function ScrollToTop({ size = 44 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [offset, setOffset] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight

      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setOffset(1 - progress)
      setIsVisible(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("load", handleScroll)
    requestAnimationFrame(handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("load", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const stroke = 4
  const cx = Math.round(size / 2)
  const cy = Math.round(size / 2)
  const r = Math.round(size * 0.5 - stroke / 2)
  const iconSize = Math.round(size * 0.4)
  const iconTranslate = Math.round(size * 0.3)

  return (
    <svg
      id="progress-indicator"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 z-50 cursor-pointer transition-opacity duration-300 ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      aria-label="Scroll to top"
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        pathLength="1"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{
          fill: bgColor,
          stroke: trackColor,
          strokeWidth: 2,
        }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        pathLength="1"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{
          fill: "none",
          stroke: progressColor,
          strokeWidth: 2,
        }}
        strokeDasharray="1"
        strokeDashoffset={offset}
      />
      <g transform={`translate(${iconTranslate}, ${iconTranslate})`}>
        <ChevronUp size={iconSize} color={progressColor} strokeWidth={3} />
      </g>
    </svg>
  )
}
