import Link from "next/link"

import { cn } from "@/lib/utils"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { getIconForLanguageExtension } from "@/components/icons"

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <div className="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
        <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-6xl font-sans py-2 relative z-20 font-bold tracking-tight">
          Build your Component Library
        </h1>
        <p className="text-muted-foreground max-w-3xl text-base text-balance sm:text-lg">
          A set of beautifully-designed, accessible components and a code distribution platform.
          Works with your favorite frameworks. Open Source. Open Code.
        </p>
        <div className="flex w-full items-center justify-center gap-2 py-3 **:data-[slot=button]:shadow-none">
          <HoverBorderGradient
            containerClassName="rounded-xl p-[0.5px] transition-all duration-200"
            as="button"
            className={cn(
              "bg-shine rounded-xl shadow bg-[length:200%_100%] tracking-wide",
              "dark:bg-[linear-gradient(110deg,#09090B,45%,#3b3b32,55%,#09090B)] dark:text-zinc-200 dark:border-zinc-800",
              "bg-[linear-gradient(110deg,#FFF,45%,#E4E4E7,55%,#FFF)] text-zinc-800 border-zinc-300"
            )}
          >
            <Link className="text-base transition-all duration-200" href="/docs">
              Explore Components
            </Link>
          </HoverBorderGradient>
        </div>
        <div className="flex items-center gap-4 justify-center sm:justify-start">
          <span className="size-7">{getIconForLanguageExtension("typescript")}</span>
          <span className="size-7">{getIconForLanguageExtension("reactjs")}</span>
          <span className="size-7">{getIconForLanguageExtension("nextjs")}</span>
          <span className="size-7">{getIconForLanguageExtension("tailwindcss")}</span>
          <span className="size-7">{getIconForLanguageExtension("shadcn")}</span>
        </div>
      </div>
      <BackgroundBeams />
    </main>
  )
}
