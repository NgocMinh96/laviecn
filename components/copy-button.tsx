"use client"

import { Event, trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"
import { CheckIcon, Copy } from "lucide-react"
import * as React from "react"
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
    }, 2000)
    return () => clearTimeout(timeout)
  }, [hasCopied])

  return (
    <Button
      data-slot="copy-button"
      size="icon"
      variant={variant}
      className={cn(
        "absolute top-3 right-2 z-10 size-6 transition-opacity duration-100 hover:opacity-100 focus-visible:opacity-100",
        className
      )}
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
      <span className="sr-only">Copy</span>
      <Copy className={`absolute transition-transform ${hasCopied ? "scale-0" : "scale-100"}`} />
      <CheckIcon
        className={`absolute transition-transform ${hasCopied ? "scale-100" : "scale-0"}`}
      />
    </Button>
  )
}
