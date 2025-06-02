"use client"

import { Cover } from "@/components/ui/cover"
import { typography } from "@/lib/typography"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { MorphingText } from "./ui/morphing-text"

export function ComponentIntroduce() {
  return (
    <>
      <div className="relative mx-auto text-center">
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
      </div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        className={cn("relative mt-10 text-center text-4xl md:text-6xl")}
        layout
      >
        <span className={`${typography.EmilysCandy} inline-block font-bold`}>
          Make your websites look 10x
          <MorphingText
            texts={["better", "modern", "beautiful", "awesome"]}
            className="mt-6 text-6xl md:text-7xl lg:text-8xl"
          />
        </span>
      </motion.div>
    </>
  )
}
