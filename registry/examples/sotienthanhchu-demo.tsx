"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"

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
        <div className="mt-2 w-2xs text-sm">{SoTienThanhChu(value)}</div>
      </div>
    </div>
  )
}
