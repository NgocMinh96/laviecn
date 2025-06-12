import type { ReactNode } from "react"
import { HomeLayout } from "fumadocs-ui/layouts/home"

import { fonts } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { baseOptions, linkItems } from "@/app/layout.config"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[...linkItems]}
      className="dark:bg-[radial-gradient(ellipse_at_bottom,_#1E1E1E_0%,_#000_100%)]"
    >
      {children}
      <Footer />
    </HomeLayout>
  )
}

function Footer() {
  return (
    <footer className="text-fd-secondary-foreground mt-auto py-5">
      <div className="container flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <p className={cn(fonts.Anta, "mb-1 text-lg font-semibold")}>
            Laviecn
          </p>
          <p className="text-muted-foreground text-xs">
            Built with ❤️ by{" "}
            <a
              href="https://fuma-dev.vercel.app"
              rel="noreferrer noopener"
              target="_blank"
              className="font-medium"
            >
              Minh Nguyen
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
