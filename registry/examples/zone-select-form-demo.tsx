import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { districts } from "@/data/districts"
import { provinces } from "@/data/provinces"
import { wards } from "@/data/wards"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import ZoneSelect from "../components/zone-select"

const formSchema = z.object({
  province_id: z.string().min(1, "Please select a province"),
  district_id: z.string().min(1, "Please select a district"),
  ward_id: z.string().min(1, "Please select a ward"),
})

type FormValues = z.infer<typeof formSchema>

export function ZoneSelectDemo() {
  const [selectedProvince, setSelectedProvince] = useState<string>("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      province_id: "",
      district_id: "",
      ward_id: "",
    },
  })

  const filteredDistricts = districts.filter(
    (district) => district.province_id === selectedProvince
  )

  const filteredWards = wards.filter((ward) => ward.district_id === selectedDistrict)

  function onSubmit(data: FormValues) {
    console.log("Form submitted:", data)
    // Handle form submission here
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="province_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>
              <FormControl>
                <ZoneSelect
                  zone={provinces}
                  placeholder="Select province"
                  value={field.value}
                  onSelect={(value) => {
                    field.onChange(value)
                    setSelectedProvince(value)
                    setSelectedDistrict("")
                    form.setValue("district_id", "")
                    form.setValue("ward_id", "")
                  }}
                  className="w-[200px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="district_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <ZoneSelect
                  zone={filteredDistricts}
                  placeholder="Select district"
                  value={field.value}
                  disabled={!selectedProvince}
                  onSelect={(value) => {
                    field.onChange(value)
                    setSelectedDistrict(value)
                    form.setValue("ward_id", "")
                  }}
                  className="w-[200px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ward_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ward</FormLabel>
              <FormControl>
                <ZoneSelect
                  zone={filteredWards}
                  placeholder="Select ward"
                  value={field.value}
                  disabled={!selectedDistrict}
                  onSelect={(value) => {
                    field.onChange(value)
                  }}
                  className="w-[200px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-[200px]">
          Submit
        </Button>
      </form>
    </Form>
  )
}
