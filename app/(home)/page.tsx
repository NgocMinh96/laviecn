import Link from "next/link"

import { getIconForLanguageExtension } from "@/components/icons"

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <div className="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
        <h1 className="text-primary leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
          Build your Component Library
        </h1>
        <p className="text-muted-foreground max-w-3xl text-base text-balance sm:text-lg">
          A set of beautifully-designed, accessible components and a code distribution platform.
          Works with your favorite frameworks. Open Source. Open Code.
        </p>
        <div className="flex w-full items-center justify-center gap-2 py-2 **:data-[slot=button]:shadow-none">
          <Link
            data-slot="button"
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
            href="/docs"
          >
            Get Started
          </Link>
        </div>
        <div className="flex items-center gap-4 justify-center sm:justify-start">
          <span className="size-7">{getIconForLanguageExtension("typescript")}</span>
          <span className="size-7">{getIconForLanguageExtension("reactjs")}</span>
          <span className="size-7">{getIconForLanguageExtension("nextjs")}</span>
          <span className="size-7">{getIconForLanguageExtension("tailwindcss")}</span>
          <span className="size-7">{getIconForLanguageExtension("shadcn")}</span>
        </div>
      </div>
    </main>
  )
}
