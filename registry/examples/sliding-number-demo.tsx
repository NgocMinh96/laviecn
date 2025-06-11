"use client"

import { ButtonRefresh } from "@/components/component-button-refresh"

import { SlidingNumber } from "../components/sliding-number"
import useForceRerender from "../hooks/use-force-rerender"

export default function SlidingNumberDemo() {
  const [keyDefault, forceRerenderDefault] = useForceRerender() as [
    number,
    () => void,
  ]

  return (
    <>
      <SlidingNumber
        key={keyDefault}
        number={6789}
        padStart
        className="text-5xl"
      />
      <ButtonRefresh onClick={forceRerenderDefault} />
    </>
  )
}
