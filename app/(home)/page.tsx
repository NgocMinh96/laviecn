"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { DockIcons } from "@/components/ui/dock-icons"
import FluidCursor from "@/components/ui/fluid-cursor"
import GithubButton from "@/components/ui/github-button"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { getIconForLanguageExtension } from "@/components/icons"

export default function HomePage() {
  const isMobile = useIsMobile()

  const iconNames = [
    "typescript",
    "reactjs",
    "nextjs",
    "tailwindcss",
    "shadcn",
  ] as const

  const icons = iconNames.map((name) => getIconForLanguageExtension(name))

  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <div className="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
        <h1 className="relative z-20 bg-gradient-to-b from-neutral-900 to-neutral-600 bg-clip-text py-2 text-center font-sans text-3xl font-bold tracking-tight text-transparent md:text-5xl lg:text-5xl dark:from-white dark:to-neutral-500">
          Open components for Shadcn ecosystem
        </h1>
        <p className="text-muted-foreground max-w-3xl text-balance">
          A set of open-source, accessible components built with TypeScript,
          React, and TailwindCSS. Powered by ShadCN and fully compatible with
          Next.js.
        </p>
        <div className="flex w-full items-center justify-center gap-4 py-3 **:data-[slot=button]:shadow-none">
          <HoverBorderGradient
            containerClassName="transition-all duration-200"
            as="button"
            className={cn(
              "bg-shine-animation bg-[length:200%_100%] tracking-wide",
              "bg-[linear-gradient(110deg,#0a0a0a,45%,#27272A,55%,#0a0a0a)] text-neutral-100"
            )}
          >
            <Link
              className="flex content-center items-center justify-center gap-1 transition-all duration-200"
              href="/docs"
            >
              Get Started
              <ArrowRight className="size-5 transition-all group-hover:translate-x-0.5 group-hover:scale-105" />
            </Link>
          </HoverBorderGradient>
          <GithubButton />
        </div>

        <DockIcons icons={icons} movementSpeed={3} />
      </div>
      {!isMobile && <BackgroundBeams />}
      <FluidCursor />
    </main>
  )
}
