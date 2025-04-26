import { districts } from "@/data/districts"
import { provinces } from "@/data/provinces"
import { wards } from "@/data/wards"
import ZoneSelect from "../components/zone-select"
import { useFilterZone } from "../hooks/useFilterZone"

export function ZoneSelectDemo() {
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
  } = useFilterZone({
    provinces,
    districts,
    wards,
  })

  return (
    <div className="flex flex-col gap-4">
      <ZoneSelect
        zone={filteredProvinces}
        label="Tỉnh/Thành phố"
        placeholder="Chọn tỉnh thành"
        value={selectedProvince}
        onSelect={handleSelectProvince}
        className="w-[210px]"
      />
      <ZoneSelect
        zone={filteredDistricts}
        label="Quận/Huyện"
        placeholder="Chọn quận huyện"
        value={selectedDistrict}
        disabled={!selectedProvince}
        onSelect={handleSelectDistrict}
        className="w-[210px]"
      />
      <ZoneSelect
        zone={filteredWards}
        label="Phường/Xã"
        placeholder="Chọn phường xã"
        value={selectedWard}
        disabled={!selectedDistrict}
        onSelect={handleSelectWard}
        className="w-[210px]"
      />
    </div>
  )
}
