"use client"

import { usePathname, useRouter } from "next/navigation"

import { HorizontalScrollMenu } from "@/registry/components/horizontal-scroll-menu"

const menuItems = [
  { id: "login", name: "Login" },
  { id: "header", name: "Header" },
  { id: "dashboard", name: "Dashboard" },
]

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const selectedId = pathname.split("/").pop() || "login"

  return (
    <>
      <div className="mt-12">
        <HorizontalScrollMenu
          menu={menuItems}
          selected={selectedId}
          onFilterChange={(itemId) => router.push(`/blocks/${itemId}`)}
        />
      </div>

      <div className="container-wrapper section-soft flex-1 md:py-12">
        <div className="container">{children}</div>
      </div>
    </>
  )
}
