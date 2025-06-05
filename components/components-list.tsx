import Link from "next/link"

import { source } from "@/lib/source"
import { cn } from "@/lib/utils"

export function ComponentsList() {
  const components = source.pageTree
  const list = components.children.filter(
    (component) => component.type === "page"
  )

  const groups = [
    {
      title: "Components",
      items: list.filter(
        (item) => item.$id && item.$id.startsWith("components/")
      ),
    },
    {
      title: "Utils",
      items: list.filter((item) => item.$id && item.$id.startsWith("utils/")),
    },
  ]

  return (
    <div className="space-y-8">
      {groups.map(
        (group) =>
          group.items.length > 0 && (
            <div key={group.title}>
              <div className="mb-4 text-xl font-medium">{group.title}</div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
                {group.items.map((component) => (
                  <Link key={component.$id} href={component.url}>
                    <span
                      className={cn(
                        "not-prose text-muted-foreground hover:text-foreground text-lg font-medium md:text-base",
                        "relative inline-block hover:after:origin-left hover:after:scale-x-100",
                        "after:bg-primary after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:scale-x-0",
                        "after:origin-right after:transition-transform after:duration-300 after:ease-in-out"
                      )}
                    >
                      {component.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  )
}
