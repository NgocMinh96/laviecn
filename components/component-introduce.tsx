"use client"

import { Cover } from "@/components/ui/cover"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { Emilys_Candy } from "next/font/google"
import React from "react"
import { ContainerTextFlip } from "./ui/container-text-flip"

const righteous = Emilys_Candy({ subsets: ["latin"], weight: "400" })

export function ComponentIntroduce() {
  const words = ["better", "modern", "beautiful", "awesome"]

  return (
    <div>
      <div className="relative max-w-7xl mx-auto text-center">
        <Cover>
          <span className="text-2xl md:text-3xl lg:text-4xl">₊˚✧ </span>
          <span className={`${righteous.className} text-5xl md:text-6xl lg:text-7xl`}>Laviecn</span>
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
          Make your websites look 10x <ContainerTextFlip words={words} />
        </span>
      </motion.div>
    </div>
  )
}
