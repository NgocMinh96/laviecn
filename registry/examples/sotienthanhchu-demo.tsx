"use client"

import { Input } from "@/components/ui/input"
import { useState } from "react"
import { SoTienThanhChu } from "../utils/sotienthanhchu"

export function SoTienThanhChuDemo() {
  const [value, setValue] = useState<number | string>("")

  return (
    <div>
      <div className="w-full">
        <Input
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Nhập số tiền"
          className="w-2xs"
        />
        <div className="text-sm w-2xs mt-2">{SoTienThanhChu(value)}</div>
      </div>
    </div>
  )
}
