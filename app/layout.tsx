import "./global.css"

import type { ReactNode } from "react"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { RootProvider } from "fumadocs-ui/provider"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "laviecn",
  keywords: [
    "laviecn",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Components",
    "shadcn",
  ],
  creator: "MinhPC",
  icons: {
    icon: "assets/logo.JPG",
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider theme={{ defaultTheme: "dark" }}>{children}</RootProvider>
      </body>
    </html>
  )
}
