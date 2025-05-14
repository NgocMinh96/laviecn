import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Check, Pencil, Trash2, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Column = {
  field: string
  headerName: string
  width?: number
}

type JsonTableProps = {
  columns: Column[]
  data: any[]
}

export function JsonTable({ columns, data: initialData }: JsonTableProps) {
  const [data, setData] = useState(() =>
    initialData.map((item) => ({
      ...item,
      uuid: item.uuid || crypto.randomUUID(),
    }))
  )

  const [rowModesModel, setRowModesModel] = useState<Record<string, "view" | "edit">>({})
  const [focusedCell, setFocusedCell] = useState<{ uuid: string; key: string } | null>(null)
  const [originalData, setOriginalData] = useState<Record<string, Record<string, string>>>({})
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const handleStartEditing = (uuid: string, key?: string) => {
    setRowModesModel((prev) => ({ ...prev, [uuid]: "edit" }))
    const row = data.find((row) => row.uuid === uuid)
    if (row && !originalData[uuid]) {
      setOriginalData((prev) => ({ ...prev, [uuid]: { ...row } }))
    }
    if (key) {
      setFocusedCell({ uuid, key })
    }
  }

  const handleCancelEditing = (uuid: string) => {
    const isNewRow = data.find((row) => row.uuid === uuid)?.__isNew

    if (isNewRow) {
      setData((prev) => prev.filter((row) => row.uuid !== uuid))
    } else {
      setData((prev) => prev.map((row) => (row.uuid === uuid ? originalData[uuid] || row : row)))
      setRowModesModel((prev) => ({ ...prev, [uuid]: "view" }))
    }

    setOriginalData((prev) => {
      const newData = { ...prev }
      delete newData[uuid]
      return newData
    })

    setFocusedCell(null)
  }

  const handleSaveEditing = (uuid: string, updatedValues: Record<string, string>) => {
    const cleaned = { ...updatedValues }
    delete cleaned.__isNew

    // Cập nhật lại dữ liệu sau khi lưu và xoá `__isNew` nếu có
    setData((prev) =>
      prev.map((row) => (row.uuid === uuid ? { ...row, ...cleaned, __isNew: undefined } : row))
    )

    setRowModesModel((prev) => ({ ...prev, [uuid]: "view" }))

    setOriginalData((prev) => {
      const newData = { ...prev }
      delete newData[uuid]
      return newData
    })

    setFocusedCell(null)
  }

  const handleDeleteRow = (uuid: string) => {
    setData((prev) => prev.filter((row) => row.uuid !== uuid))
    setOriginalData((prev) => {
      const newData = { ...prev }
      delete newData[uuid]
      return newData
    })
  }

  const handleAddRow = () => {
    const uuid = crypto.randomUUID()
    const emptyRow = columns.reduce((acc, column) => ({ ...acc, [column.field]: "" }), {
      uuid,
      __isNew: true,
    } as Record<string, string>)

    setData((prev) => [...prev, emptyRow])
    setRowModesModel((prev) => ({ ...prev, [uuid]: "edit" }))
  }

  const handleInputChange = (uuid: string, key: string, value: string) => {
    setData((prev) => prev.map((row) => (row.uuid === uuid ? { ...row, [key]: value } : row)))
  }

  const handleFocus = (uuid: string, key: string) => setFocusedCell({ uuid, key })
  const handleBlur = () => setFocusedCell(null)

  useEffect(() => {
    if (focusedCell) {
      const { uuid, key } = focusedCell
      const inputKey = `${uuid}-${key}`
      inputRefs.current[inputKey]?.focus()
    }
  }, [focusedCell])

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={index}
                style={{ width: column.width }}
                className={cn(
                  "sticky top-0 z-10 bg-background",
                  column.width ? `w-[${column.width}px]` : ""
                )}
              >
                {column.headerName}
              </TableHead>
            ))}
            <TableHead className="sticky top-0 z-10 bg-background">Actions</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      <ScrollArea className="h-[245.5px]">
        <Table>
          <TableBody>
            {data.map((item) => {
              const uuid = item.uuid
              const isEditing = rowModesModel[uuid] === "edit"

              return (
                <TableRow
                  key={uuid}
                  className={cn({ "bg-muted": isEditing })}
                  onDoubleClick={(e) => {
                    const key = (e.target as HTMLElement).getAttribute("data-key")
                    handleStartEditing(uuid, key || columns[0].field)
                  }}
                >
                  {columns.map((column, columnIndex) => {
                    const key = column.field
                    const isFocused = focusedCell?.uuid === uuid && focusedCell?.key === key
                    const inputKey = `${uuid}-${key}`

                    return (
                      <TableCell
                        key={columnIndex}
                        style={{ width: column.width }}
                        className={cn("p-0", {
                          "border-1 border-blue-500": isFocused,
                          [`w-[${column.width}px]`]: column.width,
                        })}
                      >
                        {isEditing ? (
                          <Input
                            ref={(el) => {
                              inputRefs.current[inputKey] = el
                            }}
                            value={item[key] || ""}
                            onChange={(e) => handleInputChange(uuid, key, e.target.value)}
                            onFocus={() => handleFocus(uuid, key)}
                            onBlur={handleBlur}
                            data-key={key}
                            className="h-full bg-transparent! shadow-none w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
                          />
                        ) : (
                          <div className="px-4 py-2" data-key={key}>
                            {item[key]}
                          </div>
                        )}
                      </TableCell>
                    )
                  })}
                  <TableCell className="p-0">
                    <div className="flex items-center gap-2 px-4 py-2">
                      {isEditing ? (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSaveEditing(uuid, item)}
                            className="text-green-500 hover:text-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancelEditing(uuid)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStartEditing(uuid)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRow(uuid)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className="p-2">
        <Button size="sm" onClick={handleAddRow}>
          Add New Row
        </Button>
      </div>
    </div>
  )
}
