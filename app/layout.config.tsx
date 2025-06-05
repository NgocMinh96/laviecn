import Image from "next/image"
import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared"

import { typography } from "@/lib/typography"

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
        <div>
          <span className="text-[12px]">₊˚✧ </span>
          <span className={`${typography.EmilysCandy} text-[24px]`}>
            Laviecn
          </span>
          <span className="text-[12px]"> ✧˚₊</span>
        </div>
      </>
    ),
    transparentMode: "top",
  },
}

export const linkItems: LinkItemType[] = [
  {
    text: "Components",
    url: "/docs",
    active: "nested-url",
  },
]
