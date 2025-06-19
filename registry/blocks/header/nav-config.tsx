import { ReactNode } from "react"
import { FileText, House, Info, LayoutGrid, Phone } from "lucide-react"

type Item = {
  title: string
  path: string
  icon?: ReactNode
}

export interface NavItemsProps {
  navItems: Item[]
}

export const navItems: Item[] = [
  {
    title: "Home",
    path: "/",
    icon: <House />,
  },
  {
    title: "Product",
    path: "/products",
    icon: <LayoutGrid />,
  },
  {
    title: "About",
    path: "/about",
    icon: <Info />,
  },
  {
    title: "Contact",
    path: "/contact",
    icon: <Phone />,
  },
  {
    title: "Blog",
    path: "/blog",
    icon: <FileText />,
  },
]
