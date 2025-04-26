import { JsonTable } from "../components/json-table"

const data = [
  {
    uuid: "d8f5b223-e332-4f88-a768-41b2b7815f5a",
    name: "John Doe",
    age: 30,
  },
]

const columns = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "age", headerName: "Age", width: 90 },
]

export function JsonTableDemo() {
  return <JsonTable columns={columns} data={data} />
}
