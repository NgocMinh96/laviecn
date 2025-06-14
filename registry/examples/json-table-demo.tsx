"use client"

import { JsonTable } from "../components/json-table"

const data = [
  {
    uuid: "d8f5b223-e332-4f88-a768-41b2b7815f5a",
    name: "John Doe",
    age: "30",
    phone: "123-456-7890",
  },
  {
    uuid: "d8f5b223-e332-4f88-a768-41b2b7815f5b",
    name: "John Doe 1",
    age: "32",
    phone: "123-456-7891",
  },
]

const columns = [
  { field: "name", headerName: "Name", width: 120 },
  { field: "age", headerName: "Age", width: 80 },
  { field: "phone", headerName: "Phone", width: 140 },
]

export function JsonTableDemo() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (data: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.info("DATA", data)
    } catch (error) {
      console.error(error)
    }
  }

  return <JsonTable columns={columns} data={data} onSubmit={handleSubmit} />
}
