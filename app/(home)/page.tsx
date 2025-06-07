"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { DockIcons } from "@/components/ui/dock-icons"
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
        <h1 className="relative z-20 bg-gradient-to-b from-neutral-900 to-neutral-600 bg-clip-text py-2 text-center font-sans text-3xl font-bold tracking-tight text-transparent md:text-5xl lg:text-5xl dark:from-white dark:to-neutral-600">
          Open components for Shadcn ecosystem
        </h1>
        <p className="text-muted-foreground max-w-3xl text-balance">
          A set of open-source, accessible components built with TypeScript,
          React, and TailwindCSS. Powered by ShadCN and fully compatible with
          Next.js.
        </p>
        <div className="flex w-full items-center justify-center gap-2 py-3 **:data-[slot=button]:shadow-none">
          <HoverBorderGradient
            containerClassName="rounded-xl p-0.5 transition-all duration-200"
            as="button"
            className={cn(
              "bg-shine bg-[length:200%_100%] tracking-wide",
              "bg-[linear-gradient(110deg,#0a0a0a,45%,#27272A,55%,#0a0a0a)] text-neutral-100"
            )}
          >
            <Link
              className="dark:text-fd-primary/80 transition-all duration-200"
              href="/docs"
            >
              Explore Components
            </Link>
          </HoverBorderGradient>
        </div>

        <DockIcons icons={icons} movementSpeed={3} />
      </div>
      {!isMobile && <BackgroundBeams />}
    </main>
  )
}
