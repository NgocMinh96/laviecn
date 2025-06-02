"use client"

import { SparklesCore } from "@/components/ui/sparkles"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import React from "react"

export const Cover = ({ children }: { children?: React.ReactNode; className?: string }) => {
  return (
    <div className="relative hover:bg-neutral-800 group/cover inline-block dark:bg-neutral-800 bg-neutral-100 px-1 py-1 mt-2 transition duration-200 rounded-lg">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: {
              duration: 0.2,
            },
          }}
          className="h-full w-full overflow-hidden absolute inset-0"
        >
          <motion.div
            animate={{
              translateX: ["-50%", "0%"],
            }}
            transition={{
              translateX: {
                duration: 10,
                ease: "linear",
                repeat: Infinity,
              },
            }}
            className="w-[200%] h-full flex"
          >
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={500}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={500}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      {children}
    </div>
  )
}

export const CircleIcon = ({ className }: { className?: string; delay?: number }) => {
  return (
    <div
      className={cn(
        `pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white`,
        className
      )}
    ></div>
  )
}
