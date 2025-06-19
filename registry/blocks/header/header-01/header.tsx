"use client"

import React from "react"
// import Link from "next/link"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
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
      <NavigationMenu viewport={false} className="block max-w-full flex-none">
        <NavigationMenuList>
          <div className="container mx-auto flex h-14 items-center justify-between max-sm:space-x-3 max-sm:px-4">
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
                <span className="text-xl font-bold">Header-01</span>
              </a>
              {/* desktop nav */}
              <div className="flex flex-1 justify-center">
                <ul className="flex flex-row items-center gap-2 px-6 max-sm:hidden">
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink asChild>
                        <a href={item.path}>{item.title}</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </ul>
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-shrink-0 flex-row items-center justify-end gap-1.5">
              <ThemeToggle className="max-sm:hidden" />
              <Button className="h-8">
                <a href={"/auth/login"}>Login</a>
              </Button>
            </div>
          </div>
        </NavigationMenuList>
        <C_NavigationMenuViewport />
      </NavigationMenu>
    </header>
  )
}

function C_NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className={cn("flex w-full justify-center")}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "data-[state=closed]:animate-nav-menu-out data-[state=open]:animate-nav-menu-in relative h-(--radix-navigation-menu-viewport-height) w-full origin-[top_center] overflow-hidden transition-[width,height] duration-300",
          className
        )}
        {...props}
      />
    </div>
  )
}
