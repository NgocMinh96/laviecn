import { type Registry } from "shadcn/registry"

export const blocks: Registry["items"] = [
  {
    name: "radix-colors",
    description: "radix-colors",
    type: "registry:block",
    files: [
      {
        path: "css/radix-colors.css",
        target: "app/radix-colors.css",
        type: "registry:style",
      },
    ],
  },
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
  {
    name: "header-01",
    description: "header-01",
    type: "registry:block",
    dependencies: ["radix-ui"],
    registryDependencies: [
      "button",
      "navigation-menu",
      "utils",
      "https://laviecn.vercel.app/r/theme-toggle.json",
    ],
    files: [
      {
        path: "blocks/header/header-01/layout.tsx",
        target: "app/(home)/layout.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/header/header-01/header.tsx",
        target: "layouts/home/header/header-01/header.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/header/header-01/mobile-nav-trigger.tsx",
        target: "layouts/home/header/header-01/mobile-nav-trigger.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/header/nav-config.tsx",
        target: "layouts/home/header/nav-config.tsx",
        type: "registry:component",
      },
    ],
    categories: ["header"],
  },
  {
    name: "header-02",
    description: "header-02",
    type: "registry:block",
    registryDependencies: [
      "button",
      "navigation-menu",
      "sheet",
      "sidebar",
      "utils",
      "https://laviecn.vercel.app/r/theme-toggle.json",
    ],
    files: [
      {
        path: "blocks/header/header-02/layout.tsx",
        target: "app/(home)/layout.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/header/header-02/header.tsx",
        target: "layouts/home/header/header-02/header.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/header/header-02/mobile-nav-trigger.tsx",
        target: "layouts/home/header/header-02/mobile-nav-trigger.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/header/nav-config.tsx",
        target: "layouts/home/header/nav-config.tsx",
        type: "registry:component",
      },
    ],
    categories: ["header"],
  },
]
