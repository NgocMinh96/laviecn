import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ThemeToggle } from "@/components/theme-toggle"

import { NavItemsProps } from "../nav-config"

export default function MobileNavTrigger({ navItems }: NavItemsProps) {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-6" />
        </Button>
      </DrawerTrigger>

      <DrawerContent
        data-vaul-custom-container
        className="bg-sidebar !top-2 !bottom-2 !left-2 rounded-xl p-4 after:data-[vaul-drawer-direction=left]:w-0"
      >
        <DrawerHeader className="flex flex-row px-0">
          <DrawerTitle className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <span className="text-primary-foreground text-lg font-bold">
                A
              </span>
            </div>
            <span className="text-xl font-bold">Acme</span>
          </DrawerTitle>
        </DrawerHeader>

        <DrawerDescription className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="hover:text-primary flex items-center space-x-3 py-2 text-sm font-medium transition-colors"
            >
              <span className="flex h-5 w-5 items-center justify-center">
                {item.icon}
              </span>
              <span>{item.title}</span>
            </Link>
          ))}
        </DrawerDescription>

        <DrawerFooter className="ml-auto flex flex-row items-center gap-0 p-0">
          <ThemeToggle />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
