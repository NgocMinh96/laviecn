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

type Row = Record<string, string | boolean> & { uuid: string }

type JsonTableProps = {
  columns: Column[]
  data: Row[]
  onSubmit?: (data: Row[]) => void
}

export function JsonTable({ columns, data: initialData, onSubmit }: JsonTableProps) {
  const [data, setData] = useState(() =>
    initialData.map((item) => ({ ...item, uuid: item.uuid || crypto.randomUUID() }))
  )
  const [isEditingTable, setIsEditingTable] = useState(false)
  const [originalData, setOriginalData] = useState<Row[]>([])
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const [focusedCell, setFocusedCell] = useState<{ uuid: string; key: string } | null>(null)

  const handleToggleEdit = () => {
    if (isEditingTable) {
      onSubmit?.(data)
      setOriginalData([])
    } else {
      setOriginalData(data.map((row) => ({ ...row })))
    }
    setIsEditingTable((prev) => !prev)
  }

  const handleCancel = () => {
    setData(originalData.map((row) => ({ ...row })))
    setIsEditingTable(false)
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
    const emptyRow = columns.reduce((acc, column) => ({ ...acc, [column.field]: "" }), {
      uuid,
    } as Row)
    setData((prev) => [...prev, emptyRow])
  }

  const actionsColumnWidth = 60

  useEffect(() => {
    if (focusedCell) {
      const { uuid, key } = focusedCell
      const inputKey = `${uuid}-${key}`
      inputRefs.current[inputKey]?.focus()
    }
  }, [focusedCell])

  return (
    <div className="rounded-md border overflow-hidden">
      <Table className="">
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={index}
                style={column.width ? { width: column.width } : undefined}
                className={cn("sticky top-0 z-10 bg-background")}
              >
                <span className="pl-2">{column.headerName}</span>
              </TableHead>
            ))}
            <TableHead
              style={{ width: actionsColumnWidth, minWidth: actionsColumnWidth }}
              className="sticky top-0 z-10 bg-background text-center"
            ></TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      <ScrollArea className="h-[243.5px]">
        <Table className="">
          <TableBody>
            {data.map((item, rowIndex) => {
              const uuid = item.uuid
              return (
                <TableRow key={uuid} className={cn("h-12 hover:bg-transparent")}>
                  {columns.map((column, columnIndex) => {
                    const key = column.field
                    const inputKey = `${uuid}-${key}`
                    const isFocused = focusedCell?.uuid === uuid && focusedCell?.key === key

                    return (
                      <TableCell
                        key={columnIndex}
                        style={column.width ? { width: column.width } : undefined}
                        className={cn("p-1 align-middle", {
                          "border-b": rowIndex === data.length - 1,
                          "shadow-[inset_0_0_0_0.5px_#3b82f6]": isFocused,
                          "bg-muted hover:bg-muted": isEditingTable,
                        })}
                      >
                        {isEditingTable ? (
                          <Input
                            ref={(el) => {
                              inputRefs.current[inputKey] = el
                            }}
                            value={String(item[key as keyof typeof item] || "")}
                            onChange={(e) =>
                              handleInputChange(uuid, key as keyof Row, e.target.value)
                            }
                            onFocus={() => setFocusedCell({ uuid, key })}
                            onBlur={() => setFocusedCell(null)}
                            className="h-12 bg-muted! shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
                            style={column.width ? { width: column.width } : undefined}
                          />
                        ) : (
                          <div
                            className="px-4 h-12 flex items-center"
                            style={column.width ? { width: column.width } : undefined}
                          >
                            {item[key as keyof typeof item] || ""}
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
                      {isEditingTable && (
                        <Button
                          variant="link"
                          size="icon"
                          onClick={() => handleDeleteRow(uuid)}
                          className="text-red-500 hover:text-red-700 hover:bg-transparent"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className="p-2 flex gap-2 justify-between border-t">
        <div className="flex gap-2">
          <Button size="sm" onClick={handleToggleEdit}>
            {isEditingTable ? "Save" : "Edit"}
          </Button>
          {isEditingTable && (
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
        {isEditingTable && (
          <Button className="size-8" variant="outline" onClick={handleAddRow}>
            <Plus className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
