"use client"

import React, { useState } from "react"
import { ArrowLeft, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import type { District, Province, Ward } from "../hooks/use-filter-zone"

interface ZoneFilterProps {
  provinces: Province[]
  districts: District[]
  wards: Ward[]
  filteredProvinces: Province[]
  filteredDistricts: District[]
  filteredWards: Ward[]
  selectedProvince?: string
  selectedDistrict?: string
  selectedWard?: string
  handleSelectProvince: (id: string) => void
  handleSelectDistrict: (id: string) => void
  handleSelectWard: (id: string) => void
  onChange?: (zone: {
    province?: Province
    district?: District
    ward?: Ward
  }) => void
}

export default function ZoneFilter({
  provinces,
  districts,
  wards,
  filteredProvinces,
  filteredDistricts,
  filteredWards,
  selectedProvince,
  selectedDistrict,
  selectedWard,
  handleSelectProvince,
  handleSelectDistrict,
  handleSelectWard,
  onChange,
}: ZoneFilterProps) {
  const [step, setStep] = useState(0)
  const [search, setSearch] = useState("")

  const stepMap = [
    {
      label: "Tỉnh/Thành phố",
      items: filteredProvinces,
      selectedId: selectedProvince,
      handler: handleSelectProvince,
    },
    {
      label: "Quận/Huyện",
      items: filteredDistricts,
      selectedId: selectedDistrict,
      handler: handleSelectDistrict,
    },
    {
      label: "Phường/Xã",
      items: filteredWards,
      selectedId: selectedWard,
      handler: handleSelectWard,
    },
  ]

  const { label, items, selectedId, handler } = stepMap[step]

  const getFilteredItems = () => {
    const keyword = search.trim().toLowerCase()
    if (!keyword) return items
    return items.filter((item) =>
      [item.name, item.full_name, item.name_slug].some((field) =>
        field?.toLowerCase().includes(keyword)
      )
    )
  }

  const filteredItems = getFilteredItems()

  const rows = 4
  const columns = Math.max(5, Math.ceil(filteredItems.length / rows))
  const height = 46 * rows

  const triggerOnChange = (id: string) => {
    onChange?.({
      province: provinces.find(
        (p) => p.id === (step === 0 ? id : selectedProvince)
      ),
      district: districts.find(
        (d) => d.id === (step === 1 ? id : selectedDistrict)
      ),
      ward: wards.find((w) => w.id === (step === 2 ? id : selectedWard)),
    })
  }

  const handleSelect = (id: string) => {
    handler(id)
    triggerOnChange(id)

    if (step < 2) {
      setStep(step + 1)
      setSearch("")
    }
  }

  const onBack = () => {
    let newStep = step

    if (step === 2) {
      handleSelectWard("")
      newStep = 1
    } else if (step === 1) {
      handleSelectDistrict("")
      newStep = 0
    }

    setStep(newStep)
    setSearch("")

    onChange?.({
      province: provinces.find((p) => p.id === selectedProvince),
      district:
        newStep >= 1
          ? districts.find((d) => d.id === selectedDistrict)
          : undefined,
      ward: undefined,
    })
  }

  return (
    <div className="w-full rounded-md border">
      <div className="flex h-10 items-center justify-between gap-2 px-2 pt-2">
        <Input
          placeholder={`Tìm kiếm ${label.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 w-full"
        />
        <Button
          disabled={step === 0}
          variant="outline"
          size="icon"
          className="size-8"
          onClick={onBack}
        >
          <ArrowLeft />
        </Button>
      </div>

      <ScrollArea className="p-2" style={{ height, overflowY: "hidden" }}>
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${columns}, max-content)`,
            gridAutoFlow: "row",
          }}
        >
          {filteredItems.map((item) => (
            <Button
              key={item.id}
              variant={selectedId === item.id ? "default" : "outline"}
              onClick={() => handleSelect(item.id)}
              className="justify-start gap-0.5 text-xs whitespace-nowrap has-[>svg]:px-1"
              style={{ width: 142 }}
            >
              <MapPin className="size-3" />
              {item.full_name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
