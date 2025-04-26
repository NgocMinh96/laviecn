import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  const [data, setData] = useState(initialData)
  const [rowModesModel, setRowModesModel] = useState<Record<number, "view" | "edit">>({})
  const [focusedCell, setFocusedCell] = useState<{ rowIndex: number; key: string } | null>(null)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  console.log(data)

  const handleStartEditing = (rowIndex: number, key?: string) => {
    setRowModesModel((prev) => ({ ...prev, [rowIndex]: "edit" }))
    if (key) {
      setFocusedCell({ rowIndex, key })
    }
  }

  const handleCancelEditing = (rowIndex: number) => {
    setRowModesModel((prev) => ({ ...prev, [rowIndex]: "view" }))
    setFocusedCell(null)
  }

  const handleSaveEditing = (rowIndex: number, updatedValues: Record<string, string>) => {
    setData((prevData) =>
      prevData.map((row, index) => (index === rowIndex ? { ...row, ...updatedValues } : row))
    )
    handleCancelEditing(rowIndex)
  }

  const handleDeleteRow = (rowIndex: number) => {
    setData((prevData) => prevData.filter((_, index) => index !== rowIndex))
  }

  const handleAddRow = () => {
    const emptyRow = columns.reduce((acc, column) => ({ ...acc, [column.field]: "" }), {
      uuid: crypto.randomUUID(),
    } as Record<string, string>)
    setData((prevData) => [...prevData, emptyRow])
    setRowModesModel((prev) => ({ ...prev, [data.length]: "edit" }))
  }

  const handleInputChange = (rowIndex: number, key: string, value: string) => {
    setData((prevData) =>
      prevData.map((row, index) => (index === rowIndex ? { ...row, [key]: value } : row))
    )
  }

  const handleFocus = (rowIndex: number, key: string) => setFocusedCell({ rowIndex, key })
  const handleBlur = () => setFocusedCell(null)

  useEffect(() => {
    if (focusedCell) {
      const { rowIndex, key } = focusedCell
      const inputKey = `${rowIndex}-${key}`
      inputRefs.current[inputKey]?.focus()
    }
  }, [focusedCell])

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={index}
                style={{ width: column.width }}
                className={cn(column.width ? `w-[${column.width}px]` : "")}
              >
                {column.headerName}
              </TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={cn({ "bg-muted": rowModesModel[rowIndex] === "edit" })}
              onDoubleClick={(e) => {
                const key = (e.target as HTMLElement).getAttribute("data-key")
                handleStartEditing(rowIndex, key || columns[0].field)
              }}
            >
              {columns.map((column, columnIndex) => {
                const key = column.field
                const isFocused = focusedCell?.rowIndex === rowIndex && focusedCell?.key === key
                const inputKey = `${rowIndex}-${key}`
                return (
                  <TableCell
                    key={columnIndex}
                    style={{ width: column.width }}
                    className={cn("p-0", {
                      "border-1 border-blue-500": isFocused,
                      [`w-[${column.width}px]`]: column.width,
                    })}
                  >
                    {rowModesModel[rowIndex] === "edit" ? (
                      <Input
                        ref={(el) => {
                          inputRefs.current[inputKey] = el
                        }}
                        value={item[key] || ""}
                        onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
                        onFocus={() => handleFocus(rowIndex, key)}
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
                  {rowModesModel[rowIndex] === "edit" ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSaveEditing(rowIndex, data[rowIndex])}
                        className="text-green-500 hover:text-green-700"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancelEditing(rowIndex)}
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
                        onClick={() => handleStartEditing(rowIndex)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRow(rowIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4">
        <Button onClick={handleAddRow}>Add New Row</Button>
      </div>
    </div>
  )
}
