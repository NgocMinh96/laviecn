import { ThemeToggle } from "../components/theme-toggle"

export default function ThemeToggleDemo() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-5">
        <span className="font-medium">Style 1</span>
        <ThemeToggle className="rounded-full border" />
      </div>
      <div className="flex items-center gap-5">
        <span className="font-medium">Style 2</span>
        <ThemeToggle style="2" className="p-1" />
      </div>
    </div>
  )
}
