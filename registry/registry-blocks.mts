import { type Registry } from "shadcn/registry"

export const blocks: Registry["items"] = [
  {
    name: "login-01",
    description: "login-01",
    type: "registry:block",
    registryDependencies: ["button", "card", "input", "label"],
    files: [
      {
        path: "blocks/login-01/page.tsx",
        target: "app/login/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/login-01/login-form.tsx",
        target: "sections/auth/login-form.tsx",
        type: "registry:component",
      },
    ],
    categories: ["login"],
  },
]
