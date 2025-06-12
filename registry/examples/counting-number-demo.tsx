"use client"

import { ButtonRefresh } from "@/components/component-button-refresh"

import CountingNumber from "../components/counting-number"
import useForceRerender from "../hooks/use-force-rerender"

export default function CountingNumberDemo() {
  const [keyDefault, forceRerenderDefault] = useForceRerender() as [
    number,
    () => void,
  ]

  return (
    <>
      <CountingNumber
        key={keyDefault}
        from={0}
        to={100}
        separator=""
        duration={1}
        className="text-6xl"
      />

      <ButtonRefresh onClick={forceRerenderDefault} />
    </>
  )
}
