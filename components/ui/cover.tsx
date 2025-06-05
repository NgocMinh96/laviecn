"use client"

import React from "react"
import { AnimatePresence, motion } from "motion/react"

import { SparklesCore } from "@/components/ui/sparkles"

export const Cover = ({
  children,
}: {
  children?: React.ReactNode
  className?: string
}) => {
  return (
    <div className="group/cover relative mt-2 inline-block rounded-lg bg-neutral-800 px-1 py-1 dark:bg-neutral-800">
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
          className="absolute inset-0 h-full w-full overflow-hidden"
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
            className="flex h-full w-[200%]"
          >
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={500}
              className="h-full w-full"
              particleColor="#FFFFFF"
            />
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={500}
              className="h-full w-full"
              particleColor="#FFFFFF"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      {children}
    </div>
  )
}
