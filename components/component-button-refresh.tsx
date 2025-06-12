import { RefreshCw } from "lucide-react"

import { Button } from "./ui/button"

export function ButtonRefresh({ ...props }) {
  return (
    <Button
      size="icon"
      variant="outline"
      className="absolute top-5 right-5 hover:cursor-pointer"
      {...props}
    >
      <RefreshCw className="size-4" />
    </Button>
  )
}
