"use client"

import { useRouter } from "next/navigation"

import { HorizontalScrollMenu } from "@/registry/components/horizontal-scroll-menu"

const menuItems = [
  { id: "featured", name: "Featured" },
  { id: "login", name: "Login" },
  { id: "dashboard", name: "Dashboard" },
]

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <>
      <HorizontalScrollMenu
        menu={menuItems}
        selected="featured"
        onFilterChange={(itemId) => router.push(`/blocks/${itemId}`)}
      />
      <div className="container-wrapper section-soft flex-1 md:py-12">
        <div className="container">{children}</div>
      </div>
    </>
  )
}
