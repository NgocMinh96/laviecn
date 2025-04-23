import { useState } from "react";
import ZoneSelect from "../components/zone-select";

import {provinces} from "@/data/provinces"
import {districts} from "@/data/districts"
import {wards} from "@/data/wards"

export function ZoneSelectDemo() {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  const filteredDistricts = districts.filter(
    (district) => district.province_id === selectedProvince
  );

  const filteredWards = wards.filter(
    (ward) => ward.district_id === selectedDistrict
  );

  return (<div className="flex flex-col gap-4">
    <ZoneSelect 
      zone={provinces} 
      label="Province" 
      placeholder="Select province" 
      value={selectedProvince}
      onSelect={(value) => {
        setSelectedProvince(value);
        setSelectedDistrict(""); // Reset district when province changes
        setSelectedWard(""); // Reset ward when province changes
      }}
      className="w-[200px]"
    />
    <ZoneSelect 
      zone={filteredDistricts} 
      label="District" 
      placeholder="Select district" 
      value={selectedDistrict}
      disabled={!selectedProvince}
      onSelect={(value) => {
        setSelectedDistrict(value);
        setSelectedWard(""); // Reset ward when district changes
      }}
      className="w-[200px]"
    />
    <ZoneSelect 
      zone={filteredWards} 
      label="Ward" 
      placeholder="Select ward" 
      value={selectedWard}
      disabled={!selectedDistrict}
      onSelect={setSelectedWard}
      className="w-[200px]"
    />
  </div>)
}
