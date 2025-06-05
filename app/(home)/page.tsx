"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Dock, DockIcon } from "@/components/ui/dock"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { getIconForLanguageExtension } from "@/components/icons"

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <div className="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
        <h1 className="relative z-20 bg-gradient-to-b from-neutral-900 to-neutral-600 bg-clip-text py-2 text-center font-sans text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-5xl dark:from-white dark:to-neutral-600">
          Open components for Shadcn ecosystem
        </h1>
        <p className="text-muted-foreground max-w-3xl text-base text-balance sm:text-lg">
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
              // "bg-[linear-gradient(110deg,#fafafa,45%,#E4E4E7,55%,#fafafa)]"
            )}
          >
            <Link className="transition-all duration-200" href="/docs">
              Explore Components
            </Link>
          </HoverBorderGradient>
        </div>
        <div className="relative z-100">
          <Dock className="mt-[-15px] border-none py-0! backdrop-blur-none!">
            <DockIcon>{getIconForLanguageExtension("typescript")}</DockIcon>
            <DockIcon>{getIconForLanguageExtension("reactjs")}</DockIcon>
            <DockIcon>{getIconForLanguageExtension("nextjs")}</DockIcon>
            <DockIcon>{getIconForLanguageExtension("tailwindcss")}</DockIcon>
            <DockIcon>{getIconForLanguageExtension("shadcn")}</DockIcon>
          </Dock>
        </div>
      </div>
      <BackgroundBeams />
    </main>
  )
}
