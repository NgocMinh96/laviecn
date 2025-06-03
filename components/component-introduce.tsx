"use client"

import { motion } from "motion/react"

import { typography } from "@/lib/typography"
import { cn } from "@/lib/utils"
import { Cover } from "@/components/ui/cover"

import { MorphingText } from "./ui/morphing-text"

export function ComponentIntroduce() {
  return (
    <div className="mx-auto text-center">
      <Cover>
        <motion.div
          className="bg-[linear-gradient(110deg,#f5f5f5,35%,#a3a3a3,50%,#f5f5f5,75%,#f5f5f5)] bg-[length:200%_100%] bg-clip-text text-transparent"
          initial={{ backgroundPosition: "200% 0" }}
          animate={{ backgroundPosition: "-200% 0" }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
          }}
        >
          <span className="text-2xl md:text-3xl lg:text-4xl">₊˚✧ </span>
          <span className={`${typography.EmilysCandy} text-5xl md:text-6xl lg:text-7xl`}>
            Laviecn
          </span>
          <span className="text-2xl md:text-3xl lg:text-4xl"> ✧˚₊</span>
        </motion.div>
      </Cover>
      <div
        className={cn(
          typography.EmilysCandy,
          "pt-6 w-full flex flex-wrap justify-center text-center font-bold gap-x-3",
          "text-[clamp(2rem,4.5vw,3rem)] leading-[1.2]"
        )}
      >
        <span>Make your websites</span>
        <span className="inline-flex justify-center">
          <MorphingText texts={["better", "modern", "beautiful", "awesome"]} />
        </span>
      </div>
    </div>
  )
}
