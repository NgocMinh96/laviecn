"use client"

import { cn } from "@/lib/utils"
import { CodeIcon, EyeIcon } from "lucide-react"
import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

export function ComponentPreviewTabs({
  className,
  hideCode = false,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  hideCode?: boolean
  component: React.ReactNode
  source: React.ReactNode
}) {
  const [tab, setTab] = React.useState("preview")

  return (
    <div className={cn("group relative my-4 flex flex-col gap-2", className)} {...props}>
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex items-center justify-between">
          {!hideCode && (
            <TabsList className="border">
              <TabsTrigger value="preview">
                <EyeIcon size={16} />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code">
                <CodeIcon size={16} />
                Code
              </TabsTrigger>
            </TabsList>
          )}
        </div>
      </Tabs>
      <div data-tab={tab} className="relative">
        <div
          data-slot="preview"
          data-active={tab === "preview"}
          className="invisible data-[active=true]:visible border-1 rounded-lg"
        >
          <div className={cn("flex min-h-[450px] items-center justify-center p-6 md:p-10")}>
            <div className="-translate-y-px absolute top-3 md:top-5 right-0 left-0 border border-border/50 dark:border-border border-dashed" />
            <div className="absolute right-0 bottom-3 md:bottom-5 left-0 translate-y-px border border-border/50 dark:border-border border-dashed" />
            <div className="-translate-x-px absolute top-0 bottom-0 left-3 md:left-5 border border-border/50 dark:border-border border-dashed" />
            <div className="absolute top-0 right-3 md:right-5 bottom-0 translate-x-px border border-border/50 dark:border-border border-dashed" />
            {component}
          </div>
        </div>
        <div
          data-slot="code"
          data-active={tab === "code"}
          className="absolute inset-0 hidden overflow-hidden data-[active=true]:block **:[figure]:!m-0 **:[pre]:h-[406px]"
        >
          {source}
        </div>
      </div>
    </div>
  )
}
