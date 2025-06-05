"use client"

import { useMemo, useState } from "react"

export interface Province {
  id: string
  name: string
  name_slug: string
  full_name: string
}

export interface District {
  id: string
  name: string
  name_slug: string
  full_name: string
  province_id: string
}

export interface Ward {
  id: string
  name: string
  name_slug: string
  full_name: string
  district_id: string
}

interface UseFilterZoneProps {
  provinces: Province[]
  districts: District[]
  wards: Ward[]
}

export function useFilterZone({
  provinces,
  districts,
  wards,
}: UseFilterZoneProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [selectedWard, setSelectedWard] = useState<string>("")

  const filteredDistricts = useMemo(() => {
    return districts.filter(
      (district) => district.province_id === selectedProvince
    )
  }, [districts, selectedProvince])

  const filteredWards = useMemo(() => {
    return wards.filter((ward) => ward.district_id === selectedDistrict)
  }, [wards, selectedDistrict])

  const handleSelectProvince = (provinceId: string) => {
    setSelectedProvince(provinceId)
    setSelectedDistrict("")
    setSelectedWard("")
  }

  const handleSelectDistrict = (districtId: string) => {
    setSelectedDistrict(districtId)
    setSelectedWard("")
  }

  const handleSelectWard = (wardId: string) => {
    setSelectedWard(wardId)
  }

  return {
    filteredProvinces: provinces,
    filteredDistricts,
    filteredWards,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    handleSelectProvince,
    handleSelectDistrict,
    handleSelectWard,
  }
}
