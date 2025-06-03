import Link from "next/link"

import { source } from "@/lib/source"

export function ComponentsList() {
  const components = source.pageTree

  const list = components.children.filter((component) => component.type === "page")

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
      {list.map((component) => (
        <Link
          key={component.$id}
          href={component.url}
          className="not-prose text-lg font-medium underline-offset-4 hover:underline md:text-base"
        >
          {component.name}
        </Link>
      ))}
    </div>
  )
}
