"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type ThemeToggleProps = {
  style?: "1" | "2"
} & React.HTMLAttributes<HTMLButtonElement>

export function ThemeToggle({ style = "1", ...props }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const styles = {
    "1": <Style_1 onClick={toggleTheme} {...props} />,
    "2": <Style_2 onClick={toggleTheme} {...props} />,
  }

  return styles[style as "1" | "2"] || styles["1"]
}

// ==== Style 1 ====
function Style_1(props: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button variant="ghost" size="icon" {...props}>
      <Sun className="scale-100 fill-current dark:scale-0" />
      <Moon className="absolute scale-0 fill-current dark:scale-100" />
    </Button>
  )
}

// ==== Style 2 ====

const full = [["light", Sun] as const, ["dark", Moon] as const]

const itemVariants = cva("size-7 rounded-full p-1.5 text-muted-foreground", {
  variants: {
    active: {
      true: "bg-accent text-accent-foreground",
      false: "text-muted-foreground",
    },
  },
})

function Style_2(props: React.HTMLAttributes<HTMLButtonElement>) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useLayoutEffect(() => {
    setMounted(true)
  }, [])

  const value = mounted ? resolvedTheme : null

  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center rounded-full border",
        props.className
      )}
    >
      {full.map(([key, Icon]) => {
        return (
          <Icon
            key={key}
            fill="currentColor"
            className={cn(itemVariants({ active: value === key }))}
          />
        )
      })}
    </button>
  )
}
