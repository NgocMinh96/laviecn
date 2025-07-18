"use client"

import React, { useEffect, useRef, useState } from "react"
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

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
const commonCellClass = "p-0 align-middle px-0.5"

const ActionsCell = ({
  uuid,
  onDelete,
  listeners,
  attributes,
}: {
  uuid: string
  onDelete?: (uuid: string) => void
  listeners?: React.HTMLAttributes<HTMLElement>
  attributes?: React.HTMLAttributes<HTMLElement>
}) => (
  <TableCell className="flex h-12 w-[80px] items-center justify-center gap-1 bg-transparent text-center hover:bg-transparent">
    <Button
      variant="link"
      size="icon"
      onClick={() => onDelete?.(uuid)}
      className="text-red-500 hover:bg-transparent hover:text-red-700"
    >
      <Trash2 className="size-4" />
    </Button>
    <Button variant="link" size="icon" {...listeners} {...attributes}>
      <GripVertical className="size-4" />
    </Button>
  </TableCell>
)

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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
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

export function JsonTable({
  columns,
  data: initialData,
  onSubmit,
}: JsonTableProps) {
  const [data, setData] = useState<Row[]>(() =>
    initialData.map((item) => ({
      ...item,
      uuid: item.uuid || crypto.randomUUID(),
    }))
  )
  const [isEditing, setIsEditing] = useState(false)
  const [originalData, setOriginalData] = useState<Row[]>([])
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const [focusedCell, setFocusedCell] = useState<{
    uuid: string
    key: string
  } | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  )

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
    setData((prev) =>
      prev.map((row) => (row.uuid === uuid ? { ...row, [key]: value } : row))
    )
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
    const isFocused =
      focusedCell?.uuid === row.uuid && focusedCell?.key === field
    return (
      <TableCell
        key={field}
        style={width ? { width } : undefined}
        className={cn(commonCellClass, {
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
          className="dark:bg-muted! rounded-none border-0 px-2 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          style={width ? { width } : undefined}
        />
      </TableCell>
    )
  }

  return (
    <div className="not-prose overflow-hidden rounded-md border">
      <ScrollArea>
        <Table>
          <TableHeader className="bg-muted/80">
            <TableRow>
              {columns.map(({ headerName }, i) => (
                <TableHead key={i}>{headerName}</TableHead>
              ))}
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        <div
          style={
            {
              "--item-height": "48.7px",
              height: `calc(var(--item-height) * ${5})`,
            } as React.CSSProperties
          }
        >
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
                            {columns.map(({ field, width }) =>
                              renderInputCell(row, field, width)
                            )}
                            <ActionsCell
                              uuid={row.uuid}
                              onDelete={handleDeleteRow}
                              listeners={listeners}
                              attributes={attributes}
                            />
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
                        className={commonCellClass}
                      >
                        <div
                          className="flex h-12 items-center px-2"
                          style={width ? { width } : undefined}
                        >
                          {row[field] || ""}
                        </div>
                      </TableCell>
                    ))}
                    <ActionsCell uuid={row.uuid} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex justify-between gap-2 border-t p-2">
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
