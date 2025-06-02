"use client"

import { Cover } from "@/components/ui/cover"
import { typography } from "@/lib/typography"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { MorphingText } from "./ui/morphing-text"

export function ComponentIntroduce() {
  return (
    <div>
      <div className="relative max-w-7xl mx-auto text-center">
        <Cover>
          <motion.div
            className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text text-transparent"
            initial={{ backgroundPosition: "200% 0" }}
            animate={{ backgroundPosition: "-200% 0" }}
            transition={{
              repeat: Infinity,
              duration: 4,
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
