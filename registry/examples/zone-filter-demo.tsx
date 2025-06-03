"use client"

import { districts } from "@/data/districts"
import { provinces } from "@/data/provinces"
import { wards } from "@/data/wards"

import ZoneFilter from "../components/zone-filter"
import { useFilterZone } from "../hooks/use-filter-zone"

export function ZoneFilterDemo() {
  const {
    filteredProvinces,
    filteredDistricts,
    filteredWards,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    handleSelectProvince,
    handleSelectDistrict,
    handleSelectWard,
  } = useFilterZone({ provinces, districts, wards })

  return (
    <ZoneFilter
      filteredProvinces={filteredProvinces}
      filteredDistricts={filteredDistricts}
      filteredWards={filteredWards}
      selectedProvince={selectedProvince}
      selectedDistrict={selectedDistrict}
      selectedWard={selectedWard}
      handleSelectProvince={handleSelectProvince}
      handleSelectDistrict={handleSelectDistrict}
      handleSelectWard={handleSelectWard}
      onChange={(zone) => {
        console.log("Selected Zone:", zone)
      }}
      provinces={provinces}
      districts={districts}
      wards={wards}
    />
  )
}
