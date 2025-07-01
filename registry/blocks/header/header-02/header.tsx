"use client"

// import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ThemeToggle } from "@/components/theme-toggle"

import { navItems } from "../nav-config"
import MobileNavTrigger from "./mobile-nav-trigger"

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-40 w-full border-b shadow-sm backdrop-blur-lg transition-colors max-sm:fixed">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 max-sm:space-x-3">
        <div className="flex flex-shrink-0 items-center max-sm:space-x-3">
          {/* mobile menu trigger */}
          <MobileNavTrigger navItems={navItems} />
          {/* logo */}
          <a href="" className="flex items-center space-x-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <span className="text-primary-foreground text-lg font-bold">
                H
              </span>
            </div>
            <span className="text-xl font-bold">Header-02</span>
          </a>
          {/* desktop nav */}
          <NavigationMenu className="flex flex-1 justify-center">
            <NavigationMenuList>
              <ul className="flex flex-row items-center gap-2 px-6 max-sm:hidden">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <a href={item.path}>{item.title}</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </ul>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* right side actions */}
        <div className="flex flex-shrink-0 flex-row items-center justify-end gap-1.5">
          <ThemeToggle className="max-sm:hidden" />
          <Button className="h-8">
            <a href="/auth/login">Login</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
