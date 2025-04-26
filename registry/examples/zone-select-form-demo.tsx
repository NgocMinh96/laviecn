"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { districts } from "@/data/districts"
import { provinces } from "@/data/provinces"
import { wards } from "@/data/wards"
import ZoneSelect from "../components/zone-select"
import { useFilterZone } from "../hooks/useFilterZone"

const zoneFormSchema = z.object({
  province: z.string().nonempty("Vui lòng chọn tỉnh/thành phố"),
  district: z.string().nonempty("Vui lòng chọn quận/huyện"),
  ward: z.string().nonempty("Vui lòng chọn phường/xã"),
})

type ZoneFormValues = z.infer<typeof zoneFormSchema>

export function ZoneSelectDemo() {
  const form = useForm<ZoneFormValues>({
    resolver: zodResolver(zoneFormSchema),
    defaultValues: {
      province: "",
      district: "",
      ward: "",
    },
  })

  const {
    filteredProvinces,
    filteredDistricts,
    filteredWards,
    selectedProvince,
    selectedDistrict,
    handleSelectProvince,
    handleSelectDistrict,
    handleSelectWard,
  } = useFilterZone({
    provinces,
    districts,
    wards,
  })

  async function onSubmit(data: ZoneFormValues) {
    try {
      const result = await new Promise((resolve) => {
        setTimeout(() => resolve(data), 1000) // Simulate async operation
      })
      console.log("Form data:", result)
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[210px]">
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tỉnh/Thành phố</FormLabel>
              <FormControl>
                <ZoneSelect
                  zone={filteredProvinces}
                  placeholder="Chọn tỉnh thành"
                  value={field.value}
                  onSelect={(value) => {
                    field.onChange(value)
                    handleSelectProvince(value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quận/Huyện</FormLabel>
              <FormControl>
                <ZoneSelect
                  zone={filteredDistricts}
                  placeholder="Chọn quận huyện"
                  value={field.value}
                  disabled={!selectedProvince}
                  onSelect={(value) => {
                    field.onChange(value)
                    handleSelectDistrict(value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ward"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phường/Xã</FormLabel>
              <FormControl>
                <ZoneSelect
                  zone={filteredWards}
                  placeholder="Chọn phường xã"
                  value={field.value}
                  disabled={!selectedDistrict}
                  onSelect={(value) => {
                    field.onChange(value)
                    handleSelectWard(value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
