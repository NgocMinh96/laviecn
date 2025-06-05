"use client"

import { HorizontalScrollMenu } from "../components/horizontal-scroll-menu"

const menuItems = [
  { id: "all", name: "Tất cả" },
  { id: "music", name: "Âm nhạc" },
  { id: "playlists", name: "Danh sách kết hợp" },
  { id: "news", name: "Tin tức" },
  { id: "live", name: "Trực tiếp" },
  { id: "rap", name: "Đọc rap" },
  { id: "football", name: "Bóng đá" },
  { id: "nature", name: "Thiên nhiên" },
  { id: "recent", name: "Mới tải lên gần đây" },
  { id: "watched", name: "Đã xem" },
  { id: "suggestions", name: "Đề xuất mới" },
]

export default function HorizontalScrollMenuDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-8">
      <HorizontalScrollMenu
        menu={menuItems}
        selected="music"
        onFilterChange={(filter) => console.log("Selected:", filter)}
      />
      <HorizontalScrollMenu
        menu={menuItems}
        selected="music"
        onFilterChange={(filter) => console.log("Selected:", filter)}
        showScrollButton
      />
    </div>
  )
}
