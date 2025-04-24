"use client"

import { Index } from "@/__registry__"
// import { Skeleton } from "@/components/ui/skeleton";lib/utillib/utils
import { cn } from "@/lib/utils"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import * as React from "react"

interface ComponentTabsProps extends React.ComponentPropsWithoutRef<"div"> {
  name: string
  children: React.ReactNode
  align?: "start" | "center" | "end"
  preventPreviewFocus?: boolean
  scalePreview?: boolean
  fullPreview?: boolean
}

export function ComponentTabs({
  name,
  children,
  align = "center",
  preventPreviewFocus,
  scalePreview,
  fullPreview,
  className,
}: ComponentTabsProps) {
  const Codes = React.Children.toArray(children) as React.ReactElement[]
  const Code = Codes[0]

  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component

    if (!Component) {
      return (
        <p className="text-muted-foreground text-sm">
          Component{" "}
          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name])

  return (
    <Tabs items={["Preview", "Code"]} className="rounded-md">
      <Tab
        value="Preview"
        className={cn(
          "not-prose",
          preventPreviewFocus && "focus-visible:outline-hidden focus-visible:ring-0"
        )}
        tabIndex={preventPreviewFocus ? -1 : 0}
      >
        <div
          className={cn(
            "flex h-[400px] w-full justify-center p-10",
            {
              "items-start": align === "start",
              "items-center": align === "center",
              "items-end": align === "end",
              "h-full p-0": fullPreview,
              "sm:p-10": scalePreview,
            },
            className
          )}
        >
          {/* <React.Suspense fallback={<Skeleton className="size-full" />}> */}
          {Preview}
          {/* </React.Suspense> */}
        </div>
      </Tab>
      <Tab value="Code" className="component-block py-0">
        {Code}
      </Tab>
    </Tabs>
  )
}
