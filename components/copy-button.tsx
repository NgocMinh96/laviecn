"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { Event, trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

export function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value)
  if (event) {
    trackEvent(event)
  }
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  event,
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string
  src?: string
  event?: Event["name"]
}) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (!hasCopied) return
    const timeout = setTimeout(() => {
      setHasCopied(false)
    }, 1500)
    return () => clearTimeout(timeout)
  }, [hasCopied])

  return (
    <Button
      data-slot="copy-button"
      size="icon"
      variant={variant}
      className={cn("absolute top-1 right-1 z-10 text-muted-foreground", className)}
      onClick={() => {
        copyToClipboardWithMeta(
          value,
          event
            ? {
                name: event,
                properties: {
                  code: value,
                },
              }
            : undefined
        )
        setHasCopied(true)
      }}
      {...props}
    >
      <Copy className={cn("absolute transition-transform", hasCopied && "scale-0")} />
      <Check className={cn("transition-transform", !hasCopied && "scale-0")} />
    </Button>
  )
}
