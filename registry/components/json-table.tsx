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
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Plus, Trash2 } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

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

const commonRowClass = "hover:bg-transparent last:border-b!"

function DraggableRow({
  id,
  children,
}: {
  id: string
  children: (props: {
    listeners?: React.HTMLAttributes<HTMLElement>
    attributes?: React.HTMLAttributes<HTMLElement>
  }) => React.ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  return (
    <TableRow
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1 : 0,
        position: "relative",
      }}
      className={commonRowClass}
      data-draggable-row
    >
      {children({ listeners, attributes })}
    </TableRow>
  )
}

export function JsonTable({ columns, data: initialData, onSubmit }: JsonTableProps) {
  const [data, setData] = useState<Row[]>(() =>
    initialData.map((item) => ({ ...item, uuid: item.uuid || crypto.randomUUID() }))
  )
  const [isEditing, setIsEditing] = useState(false)
  const [originalData, setOriginalData] = useState<Row[]>([])
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const [focusedCell, setFocusedCell] = useState<{ uuid: string; key: string } | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  )

  const actionsColumnWidth = 80

  const handleToggleEdit = () => {
    setIsEditing((prev) => {
      const next = !prev
      if (next) setOriginalData(data)
      else {
        onSubmit?.(data)
        setOriginalData([])
      }
      return next
    })
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

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id && over) {
      const oldIndex = data.findIndex((i) => i.uuid === active.id)
      const newIndex = data.findIndex((i) => i.uuid === over.id)
      setData(arrayMove(data, oldIndex, newIndex))
    }
  }

  useEffect(() => {
    if (focusedCell) {
      const { uuid, key } = focusedCell
      inputRefs.current[`${uuid}-${key}`]?.focus()
    }
  }, [focusedCell])

  const renderInputCell = (row: Row, field: string, width?: number) => {
    const inputKey = `${row.uuid}-${field}`
    const isFocused = focusedCell?.uuid === row.uuid && focusedCell?.key === field
    return (
      <TableCell
        key={field}
        style={width ? { width } : undefined}
        className={cn("p-0 align-middle px-0.5", {
          "shadow-[inset_0_0_0_0.5px_#3b82f6]": isFocused,
          "bg-muted hover:bg-muted": isEditing,
        })}
      >
        <Input
          ref={(el) => {
            inputRefs.current[inputKey] = el
          }}
          value={String(row[field] || "")}
          onChange={(e) => handleInputChange(row.uuid, field, e.target.value)}
          onFocus={() => setFocusedCell({ uuid: row.uuid, key: field })}
          onBlur={() => setFocusedCell(null)}
          className="dark:bg-muted! shadow-none rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
          style={width ? { width } : undefined}
        />
      </TableCell>
    )
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
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
        {isEditing ? (
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <Table>
              <SortableContext
                items={data.map((row) => row.uuid)}
                strategy={verticalListSortingStrategy}
              >
                <TableBody>
                  {data.map((row) => (
                    <DraggableRow key={row.uuid} id={row.uuid}>
                      {({ listeners, attributes }) => (
                        <>
                          {columns.map(({ field, width }) => renderInputCell(row, field, width))}
                          <TableCell
                            className="h-12 bg-transparent hover:bg-transparent text-center flex items-center justify-center gap-1"
                            style={{ width: actionsColumnWidth }}
                          >
                            <Button
                              variant="link"
                              size="icon"
                              onClick={() => handleDeleteRow(row.uuid)}
                              className="text-red-500 hover:text-red-700 hover:bg-transparent"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                            <Button variant="link" size="icon" {...listeners} {...attributes}>
                              <GripVertical className="size-4" />
                            </Button>
                          </TableCell>
                        </>
                      )}
                    </DraggableRow>
                  ))}
                </TableBody>
              </SortableContext>
            </Table>
          </DndContext>
        ) : (
          <Table>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.uuid} className={commonRowClass}>
                  {columns.map(({ field, width }) => (
                    <TableCell
                      key={field}
                      style={width ? { width } : undefined}
                      className="p-0 align-middle px-0.5"
                    >
                      <div
                        className="px-2 h-12 flex items-center"
                        style={width ? { width } : undefined}
                      >
                        {row[field] || ""}
                      </div>
                    </TableCell>
                  ))}
                  <TableCell
                    className="h-12  bg-transparent hover:bg-transparent text-center flex items-center justify-center gap-1"
                    style={{ width: actionsColumnWidth }}
                  >
                    <Button variant="link" size="icon" className="text-red-500">
                      <Trash2 className="size-4" />
                    </Button>
                    <Button variant="link" size="icon">
                      <GripVertical className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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
