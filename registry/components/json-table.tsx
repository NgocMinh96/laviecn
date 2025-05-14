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

type Row = Record<string, string | boolean> & { uuid: string; __isNew?: boolean }

type JsonTableProps = {
  columns: Column[]
  data: Row[]
}

export function JsonTable({ columns, data: initialData }: JsonTableProps) {
  const [data, setData] = useState(() =>
    initialData.map((item) => ({
      ...item,
      uuid: item.uuid || crypto.randomUUID(),
    }))
  )

  console.log("JsonTableData:", data)

  const [rowModesModel, setRowModesModel] = useState<Record<string, "view" | "edit">>({})
  const [focusedCell, setFocusedCell] = useState<{ uuid: string; key: string } | null>(null)
  const [originalData, setOriginalData] = useState<Record<string, Row>>({})
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const storeOriginalRow = (uuid: string, row: Row) => {
    if (!originalData[uuid]) {
      setOriginalData((prev) => ({ ...prev, [uuid]: { ...row } }))
    }
  }

  const removeOriginalRow = (uuid: string) => {
    setOriginalData((prev) => {
      const newData = { ...prev }
      delete newData[uuid]
      return newData
    })
  }

  const handleStartEditing = (uuid: string, key?: string) => {
    setRowModesModel((prev) => ({ ...prev, [uuid]: "edit" }))
    const row = data.find((row) => row.uuid === uuid)
    if (row) storeOriginalRow(uuid, row)
    if (key) setFocusedCell({ uuid, key })
  }

  const handleCancelEditing = (uuid: string) => {
    const isNewRow = data.find((row) => row.uuid === uuid)?.__isNew

    if (isNewRow) {
      setData((prev) => prev.filter((row) => row.uuid !== uuid))
    } else {
      setData((prev) => prev.map((row) => (row.uuid === uuid ? originalData[uuid] || row : row)))
      setRowModesModel((prev) => ({ ...prev, [uuid]: "view" }))
    }

    removeOriginalRow(uuid)
    setFocusedCell(null)
  }

  const handleSaveEditing = (uuid: string, updatedValues: Row) => {
    setData((prev) =>
      prev.map((row) => {
        if (row.uuid !== uuid) return row
        const updated = { ...row, ...updatedValues }
        delete updated.__isNew
        return updated
      })
    )

    setRowModesModel((prev) => ({ ...prev, [uuid]: "view" }))
    removeOriginalRow(uuid)
    setFocusedCell(null)
  }

  const handleDeleteRow = (uuid: string) => {
    setData((prev) => prev.filter((row) => row.uuid !== uuid))
    removeOriginalRow(uuid)
  }

  const handleAddRow = () => {
    const uuid = crypto.randomUUID()
    const emptyRow = columns.reduce((acc, column) => ({ ...acc, [column.field]: "" }), {
      uuid,
      __isNew: true,
    } as Row)

    setData((prev) => [...prev, emptyRow])
    setRowModesModel((prev) => ({ ...prev, [uuid]: "edit" }))
  }

  const handleInputChange = (uuid: string, key: keyof Row, value: string) => {
    setData((prev) => prev.map((row) => (row.uuid === uuid ? { ...row, [key]: value } : row)))
  }

  const handleFocus = (uuid: string, key: keyof Row) => setFocusedCell({ uuid, key })
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
                className={cn("sticky top-0 z-10 bg-background")}
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
                        })}
                      >
                        {isEditing ? (
                          <Input
                            ref={(el) => {
                              inputRefs.current[inputKey] = el
                            }}
                            value={String(item[key as keyof typeof item] || "")}
                            onChange={(e) =>
                              handleInputChange(uuid, key as keyof Row, e.target.value)
                            }
                            onFocus={() => handleFocus(uuid, key as keyof Row)}
                            onBlur={handleBlur}
                            data-key={key}
                            className="h-full bg-transparent shadow-none w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
                          />
                        ) : (
                          <div className="px-4 py-2" data-key={key}>
                            {item[key as keyof typeof item] || ""}
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
