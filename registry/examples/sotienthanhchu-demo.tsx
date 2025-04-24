import { useState } from "react"
import { Input } from "@/components/ui/input"
import { SoTienThanhChu } from "../utils/sotienthanhchu"

export function SoTienThanhChuDemo() {
  const [value, setValue] = useState<number | string>("")

  return (
    <div className="flex w-full flex-col gap-2">
      <Input
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập số tiền"
        className="w-[200px]"
      />
      <span className="text-sm">Số tiền bằng chữ: {SoTienThanhChu(value)}</span>
    </div>
  )
}
