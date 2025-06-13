import { type Registry } from "shadcn/registry"

export const libs: Registry["items"] = [
  {
    name: "sotienthanhchu",
    type: "registry:lib",
    files: [
      {
        path: "utils/sotienthanhchu.ts",
        type: "registry:lib",
        target: "utils/sotienthanhchu.ts",
      },
    ],
  },
]
