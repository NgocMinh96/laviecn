import { type Registry } from "shadcn/registry"

export const hooks: Registry["items"] = [
  {
    name: "useFilterZone",
    type: "registry:hook",
    files: [
      {
        path: "hooks/useFilterZone.ts",
        type: "registry:hook",
      },
    ],
  },
]
