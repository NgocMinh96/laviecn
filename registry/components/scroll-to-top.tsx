"use client"

import { ChevronUp } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

type ScrollToTopProps = { size?: number }

const baseColor = "115, 115, 115"
const bgColor = `rgb(${baseColor}, 0.1)`
const trackColor = `rgb(${baseColor}, 0.2)`
const progressColor = `rgb(${baseColor}, 1)`

export default function ScrollToTop({ size = 44 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [offset, setOffset] = useState(0)

  const stroke = 4
  const center = size / 2
  const r = center - stroke / 2
  const circumference = 2 * Math.PI * r
  const iconSize = size * 0.4
  const iconTranslate = size * 0.3

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setOffset(progress >= 0.999 ? 0 : circumference * (1 - progress))
      setIsVisible(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("load", handleScroll)
    requestAnimationFrame(handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("load", handleScroll)
    }
  }, [circumference])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const svgStyle = "fixed bottom-4 right-4 z-50 cursor-pointer transition-opacity duration-300"
  const visibleStyle = isVisible
    ? "opacity-100 pointer-events-auto"
    : "opacity-0 pointer-events-none"

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      onClick={scrollToTop}
      className={`${svgStyle} ${visibleStyle}`}
      aria-label="Scroll to top"
    >
      <circle
        cx={center}
        cy={center}
        r={r}
        transform={`rotate(-90 ${center} ${center})`}
        style={{ fill: bgColor, stroke: trackColor, strokeWidth: 2 }}
      />
      <motion.circle
        cx={center}
        cy={center}
        r={r}
        transform={`rotate(-90 ${center} ${center})`}
        style={{ fill: "none", stroke: progressColor, strokeWidth: 2 }}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <g transform={`translate(${iconTranslate}, ${iconTranslate})`}>
        <ChevronUp size={iconSize} color={progressColor} strokeWidth={3} />
      </g>
    </svg>
  )
}
