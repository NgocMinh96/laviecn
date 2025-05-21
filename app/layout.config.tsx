import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import { Emilys_Candy } from "next/font/google"
import Image from "next/image"

const righteous = Emilys_Candy({ subsets: ["latin"], weight: "400" })

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
        <Image src="/assets/logo.JPG" alt="Logo" width={24} height={24} className="rounded-full" />
        <div>
          ₊˚✧ <span className={`${righteous.className} text-[24px]`}>Laviecn</span> ✧˚₊
        </div>
      </>
    ),
  },
  links: [
    // {
    //   text: 'Documentation',
    //   url: '/docs',
    //   active: 'nested-url',
    // },
    {
      type: "icon",
      url: "",
      text: "",
      icon: "ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧",
      external: false,
    },
  ],
}
