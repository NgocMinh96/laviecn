"use client"

import * as React from "react"
import { CodeIcon, EyeIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { GlowingEffect } from "./ui/glowing-effect"
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
    <div
      className={cn("group relative my-4 flex flex-col gap-2", className)}
      {...props}
    >
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex items-center justify-between">
          {!hideCode && (
            <TabsList className="border">
              <TabsTrigger
                value="preview"
                className="dark:data-[state=active]:bg-fd-card dark:data-[state=active]:text-fd-primary border-0"
              >
                <EyeIcon size={16} />
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="dark:data-[state=active]:bg-fd-card dark:data-[state=active]:text-fd-primary border-0"
              >
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
          className="invisible rounded-xl border p-1.25 data-[active=true]:visible"
        >
          <GlowingEffect
            blur={4}
            borderWidth={1}
            spread={80}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="flex min-h-[450px] items-center justify-center rounded-lg p-6 shadow-[0px_0px_10px_2px_#e5e5e5] md:p-10 dark:shadow-[0px_0px_10px_2px_#2D2D2D]">
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
