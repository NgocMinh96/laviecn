"use client"

// import { useRouter } from "next/navigation"
import { HorizontalScrollMenu } from "../components/horizontal-scroll-menu"

const menuItems = [
  { id: "all", name: "All" },
  { id: "music", name: "Music" },
  { id: "playlists", name: "Playlists" },
  { id: "news", name: "News" },
  { id: "live", name: "Live" },
  { id: "rap", name: "Rap" },
  { id: "football", name: "Football" },
  { id: "nature", name: "Nature" },
  { id: "recent", name: "Recent" },
  { id: "watched", name: "Watched" },
  { id: "suggestions", name: "Suggestions" },
]

export default function HorizontalScrollMenuDemo() {
  // const routet = useRouter()

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <HorizontalScrollMenu
        menu={menuItems}
        selected="music"
        onFilterChange={(itemId) => console.log("Selected:", itemId)}
        // onFilterChange={(itemId) => router.push(`/categories/${itemId}`)}
      />
      <HorizontalScrollMenu
        menu={menuItems}
        selected="music"
        onFilterChange={(itemId) => console.log("Selected:", itemId)}
        showScrollButton
      />
    </div>
  )
}
