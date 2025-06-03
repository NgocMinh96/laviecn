import Link from "next/link"

import { source } from "@/lib/source"

export function ComponentsList() {
  const components = source.pageTree
  const list = components.children.filter((component) => component.type === "page")

  const groups = [
    {
      title: "Components",
      items: list.filter((item) => item.$id && item.$id.startsWith("components/")),
    },
    {
      title: "Utils",
      items: list.filter((item) => item.$id && item.$id.startsWith("utils/")),
    },
  ]

  return (
    <div className="mt-12 space-y-8">
      {groups.map(
        (group) =>
          group.items.length > 0 && (
            <div key={group.title}>
              <div className="mb-4 text-xl font-medium">{group.title}</div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
                {group.items.map((component) => (
                  <Link
                    key={component.$id}
                    href={component.url}
                    className="not-prose text-lg text-muted-foreground font-medium underline-offset-4 hover:underline md:text-base"
                  >
                    {component.name}
                  </Link>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  )
}
