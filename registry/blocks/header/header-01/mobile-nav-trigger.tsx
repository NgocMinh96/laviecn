// import Link from "next/link"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ThemeToggle } from "@/components/theme-toggle"

import { NavItemsProps } from "../nav-config"

export default function MobileNavTrigger({ navItems }: NavItemsProps) {
  return (
    <ul className="flex flex-row items-center">
      <NavigationMenuItem className="hidden max-sm:block">
        <NavigationMenuTrigger
          className={cn(
            buttonVariants({
              variant: "ghost",
              className:
                "-me-1.5 size-8 bg-transparent focus:bg-transparent focus-visible:bg-transparent data-[state=open]:bg-transparent data-[state=open]:focus:bg-transparent [&_svg]:ml-0.5! [&_svg]:hidden [&_svg]:size-6",
            })
          )}
        >
          <TriggerIcon />
        </NavigationMenuTrigger>
        <C_NavigationMenuContent>
          <div className="mb-4 flex max-h-[40svh] flex-col overflow-y-auto">
            {navItems.map((item) => (
              <NavigationMenuLink
                key={item.title}
                className="inline-flex flex-row items-center gap-3 py-1.5 text-base [&_svg]:size-5!"
                asChild
              >
                <a href={item.path}>
                  {item.icon}
                  {item.title}
                </a>
              </NavigationMenuLink>
            ))}
          </div>
          <div className="ml-auto flex flex-row items-center gap-1">
            <ThemeToggle style="2" />
          </div>
        </C_NavigationMenuContent>
      </NavigationMenuItem>
    </ul>
  )
}

function C_NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "absolute inset-x-0 top-0 flex max-h-[50svh] flex-col overflow-auto p-4 sm:flex-row sm:items-center sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function TriggerIcon() {
  return (
    <div className="relative flex h-8 w-4 items-center justify-center">
      <div className="relative size-4">
        <span
          className={cn(
            "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
            "top-1 group-data-[state=open]:top-[0.4rem] group-data-[state=open]:-rotate-45"
          )}
        />
        <span
          className={cn(
            "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
            "top-2.5 group-data-[state=open]:top-[0.4rem] group-data-[state=open]:rotate-45"
          )}
        />
      </div>
    </div>
  )
}
