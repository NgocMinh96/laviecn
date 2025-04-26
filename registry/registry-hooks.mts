import { type Registry } from "shadcn/registry"

export const hooks: Registry["items"] = [
  {
    name: "use-filter-fone",
    type: "registry:hook",
    files: [
      {
        path: "hooks/use-filter-zone.ts",
        type: "registry:hook",
      },
    ],
  },
]
