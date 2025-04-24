"use client"

import { useId, useState, useEffect } from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface ZoneItem {
  id: string
  name: string
  name_slug: string
  full_name: string
  province_id?: string
  district_id?: string
}

interface ZoneSelectProps {
  zone: ZoneItem[]
  label?: string
  placeholder?: string
  value?: string
  onSelect?: (value: string) => void
  disabled?: boolean
  className?: string
}

export default function ZoneSelect({
  zone,
  label,
  placeholder = "Select zone",
  value: externalValue,
  onSelect,
  disabled,
  className,
}: ZoneSelectProps) {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [internalValue, setInternalValue] = useState<string>(externalValue || "")

  // Sync internal value with external value
  useEffect(() => {
    setInternalValue(externalValue || "")
  }, [externalValue])

  return (
    <div className={cn("*:not-first:mt-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-none outline-offset-0 focus-visible:outline-[3px]"
            disabled={disabled}
          >
            <span className={cn("truncate", !internalValue && "text-muted-foreground")}>
              {internalValue
                ? zone?.find((item: ZoneItem) => item.id === internalValue)?.full_name
                : placeholder}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>No zone found.</CommandEmpty>
              <CommandGroup>
                {zone?.map((item: ZoneItem) => (
                  <CommandItem
                    key={item.id}
                    value={item.name_slug}
                    onSelect={(currentValue) => {
                      const selectedItem = zone.find((item) => item.name_slug === currentValue)
                      const newValue = selectedItem ? selectedItem.id : ""
                      setInternalValue(newValue)
                      onSelect?.(newValue)
                      setOpen(false)
                    }}
                  >
                    {item.full_name}
                    {internalValue === item.id && <CheckIcon size={16} className="ml-auto" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
