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
import { Plus, Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Column = {
  field: string
  headerName: string
  width?: number
}

type Row = { uuid: string } & Record<string, string | boolean>

type JsonTableProps = {
  columns: Column[]
  data: Row[]
  onSubmit?: (data: Row[]) => void
}

export function JsonTable({ columns, data: initialData, onSubmit }: JsonTableProps) {
  const [data, setData] = useState<Row[]>(() =>
    initialData.map((item) => ({ ...item, uuid: item.uuid || crypto.randomUUID() }))
  )
  const [isEditing, setIsEditing] = useState(false)
  const [originalData, setOriginalData] = useState<Row[]>([])
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const [focusedCell, setFocusedCell] = useState<{ uuid: string; key: string } | null>(null)

  const actionsColumnWidth = 60

  const handleToggleEdit = () => {
    if (isEditing) {
      onSubmit?.(data)
      setOriginalData([])
    } else {
      setOriginalData(data)
    }
    setIsEditing((prev) => !prev)
  }

  const handleCancel = () => {
    setData(originalData)
    setIsEditing(false)
    setOriginalData([])
  }

  const handleInputChange = (uuid: string, key: keyof Row, value: string) => {
    setData((prev) => prev.map((row) => (row.uuid === uuid ? { ...row, [key]: value } : row)))
  }

  const handleDeleteRow = (uuid: string) => {
    setData((prev) => prev.filter((row) => row.uuid !== uuid))
  }

  const handleAddRow = () => {
    const uuid = crypto.randomUUID()
    const emptyRow: Row = { uuid }
    columns.forEach(({ field }) => (emptyRow[field] = ""))
    setData((prev) => [...prev, emptyRow])
  }

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
            {columns.map(({ headerName }, i) => (
              <TableHead key={i} className="sticky top-0 z-10 ">
                {headerName}
              </TableHead>
            ))}
            <TableHead style={{ width: actionsColumnWidth }}></TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      <ScrollArea className="h-[243.5px]">
        <Table>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={row.uuid} className={cn("h-12 hover:bg-transparent")}>
                {columns.map(({ field, width }, colIndex) => {
                  const isLastRow = rowIndex === data.length - 1
                  const inputKey = `${row.uuid}-${field}`
                  const isFocused = focusedCell?.uuid === row.uuid && focusedCell?.key === field

                  return (
                    <TableCell
                      key={colIndex}
                      style={width ? { width } : undefined}
                      className={cn("p-0.5 align-middle", {
                        "border-b": isLastRow,
                        "shadow-[inset_0_0_0_0.5px_#3b82f6]": isFocused,
                        "bg-muted hover:bg-muted": isEditing,
                      })}
                    >
                      {isEditing ? (
                        <Input
                          ref={(el) => {
                            inputRefs.current[inputKey] = el
                          }}
                          value={String(row[field] || "")}
                          onChange={(e) => handleInputChange(row.uuid, field, e.target.value)}
                          onFocus={() => setFocusedCell({ uuid: row.uuid, key: field })}
                          onBlur={() => setFocusedCell(null)}
                          className="h-12 bg-muted! shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
                          style={width ? { width } : undefined}
                        />
                      ) : (
                        <div
                          className="px-2 h-12 flex items-center"
                          style={width ? { width } : undefined}
                        >
                          {row[field] || ""}
                        </div>
                      )}
                    </TableCell>
                  )
                })}

                <TableCell
                  className="border-b bg-transparent hover:bg-transparent"
                  style={{ width: actionsColumnWidth, minWidth: actionsColumnWidth }}
                >
                  <div className="flex justify-center gap-2">
                    {isEditing && (
                      <Button
                        variant="link"
                        size="icon"
                        onClick={() => handleDeleteRow(row.uuid)}
                        className="text-red-500 hover:text-red-700 hover:bg-transparent"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className="p-2 flex gap-2 justify-between border-t">
        <div className="flex gap-2">
          <Button size="sm" onClick={handleToggleEdit}>
            {isEditing ? "Save" : "Edit"}
          </Button>
          {isEditing && (
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
        {isEditing && (
          <Button className="size-8" variant="outline" onClick={handleAddRow}>
            <Plus className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
