"use client"

import { motion } from "motion/react"

import { fonts } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Cover } from "@/components/ui/cover"

import { FlipWords } from "./ui/flip-words"

export function ComponentIntroduce() {
  return (
    <div className="component-introduce mx-auto text-center">
      <Cover>
        <motion.div
          className="bg-[linear-gradient(110deg,#f5f5f5,35%,#a3a3a3,50%,#f5f5f5,75%,#f5f5f5)] bg-[length:200%_100%] bg-clip-text px-2 text-transparent"
          initial={{ backgroundPosition: "200% 0" }}
          animate={{ backgroundPosition: "-200% 0" }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
          }}
        >
          <span className={cn(fonts.Anta, "text-5xl md:text-6xl lg:text-6xl")}>
            Laviecn
          </span>
        </motion.div>
      </Cover>
      <div className="flex items-center justify-center px-4">
        <div
          className={cn(
            fonts.Anta,
            "mx-auto py-6 text-3xl font-normal md:text-4xl"
          )}
        >
          Make your websites
          <FlipWords words={["better", "modern", "beautiful", "awesome"]} />
        </div>
      </div>
    </div>
  )
}
