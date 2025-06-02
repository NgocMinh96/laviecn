"use client"

import { Cover } from "@/components/ui/cover"
import { typography } from "@/lib/typography"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import React from "react"
import { MorphingText } from "./ui/morphing-text"

export function ComponentIntroduce() {
  return (
    <div>
      <div className="relative max-w-7xl mx-auto text-center">
        <Cover>
          <span className="text-2xl md:text-3xl lg:text-4xl">₊˚✧ </span>
          <span className={`${typography.EmilysCandy} text-5xl md:text-6xl lg:text-7xl`}>
            Laviecn
          </span>
          <span className="text-2xl md:text-3xl lg:text-4xl"> ✧˚₊</span>
        </Cover>
      </div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        className={cn("relative mt-10 text-center text-3xl md:text-5xl")}
        layout
      >
        <span className="inline-block font-bold ">
          Make your websites look 10x
          <MorphingText
            texts={["better", "modern", "beautiful", "awesome"]}
            className="mt-5 text-5xl md:text-6xl lg:text-7xl"
          />
        </span>
      </motion.div>
    </div>
  )
}
