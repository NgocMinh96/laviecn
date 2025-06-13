import Image from "next/image"
import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared"

import { fonts } from "@/lib/fonts"
import { cn } from "@/lib/utils"

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image
          src="/assets/logo.JPG"
          alt="Logo"
          width={24}
          height={24}
          className="rounded-full"
        />
        <span className={cn(fonts.Anta, "text-xl")}>Laviecn</span>
      </>
    ),
    transparentMode: "top",
  },
  githubUrl: "https://github.com/NgocMinh96/laviecn",
}

export const linkItems: LinkItemType[] = [
  {
    text: "Components",
    url: "/docs",
    active: "nested-url",
  },
  {
    text: "Blocks",
    url: "/blocks",
    active: "url",
  },
]
