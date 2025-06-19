// import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

import { NavItemsProps } from "../nav-config"

export default function MobileNavTrigger({ navItems }: NavItemsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        data-sidebar="sidebar"
        data-slot="sidebar"
        data-mobile="true"
        className="bg-sidebar text-sidebar-foreground fixed top-2 bottom-2 left-2 flex h-auto! w-(--sidebar-width) rounded-xl p-4 outline-none"
        style={
          {
            "--sidebar-width": "16rem",
          } as React.CSSProperties
        }
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Sidebar</SheetTitle>
        </SheetHeader>

        <SidebarHeader className="flex flex-row px-0">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <span className="text-primary-foreground text-lg font-bold">A</span>
          </div>
          <span className="text-xl font-bold">Acme</span>
        </SidebarHeader>

        <SidebarContent>
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="hover:text-primary flex items-center space-x-3 py-2 text-sm font-medium transition-colors"
            >
              <span className="flex h-5 w-5 items-center justify-center">
                {item.icon}
              </span>
              <span>{item.title}</span>
            </a>
          ))}
        </SidebarContent>

        <SidebarFooter className="ml-auto flex-row p-0">
          <ThemeToggle style="2" />
        </SidebarFooter>
      </SheetContent>
    </Sheet>
  )
}
