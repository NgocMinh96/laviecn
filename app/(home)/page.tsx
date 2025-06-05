import Link from "next/link"

import { cn } from "@/lib/utils"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { getIconForLanguageExtension } from "@/components/icons"

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <div className="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
        <h1 className="relative z-20 bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text py-2 text-center font-sans text-4xl font-bold tracking-tight text-transparent lg:text-5xl dark:from-neutral-600 dark:to-white">
          Open components for the Shadcn ecosystem
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
        <div className="flex items-center justify-center gap-4 sm:justify-start [&_span]:size-7 md:[&_span]:size-8">
          <span>{getIconForLanguageExtension("typescript")}</span>
          <span>{getIconForLanguageExtension("reactjs")}</span>
          <span>{getIconForLanguageExtension("nextjs")}</span>
          <span>{getIconForLanguageExtension("tailwindcss")}</span>
          <span>{getIconForLanguageExtension("shadcn")}</span>
        </div>
      </div>
      <BackgroundBeams />
    </main>
  )
}
