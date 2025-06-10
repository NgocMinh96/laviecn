"use client"

import { useEffect } from "react"

import useFluidCursor from "@/hooks/use-fluid-cursor"

const FluidCursor = () => {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFluidCursor()
  }, [])

  return (
    <div className="fixed top-0 left-0 z-2">
      <canvas id="fluid" className="h-screen w-screen" />
    </div>
  )
}
export default FluidCursor
