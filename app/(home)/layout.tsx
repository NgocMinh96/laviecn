import type { ReactNode } from "react"
import { HomeLayout } from "fumadocs-ui/layouts/home"

import { typography } from "@/lib/typography"
import { baseOptions, linkItems } from "@/app/layout.config"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions} links={[...linkItems]}>
      {children}
      <Footer />
    </HomeLayout>
  )
}

function Footer() {
  return (
    <footer className="mt-auto py-5 text-fd-secondary-foreground">
      <div className="container flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <p className="mb-1 text-sm font-semibold">
            <span className="text-[8px]">₊˚✧ </span>
            <span className={`${typography.EmilysCandy} text-[16px]`}>Laviecn</span>
            <span className="text-[8px]"> ✧˚₊</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ by{" "}
            <a
              href="https://fuma-dev.vercel.app"
              rel="noreferrer noopener"
              target="_blank"
              className="font-medium"
            >
              minhpc
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
