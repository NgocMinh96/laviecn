"use client"

import { ButtonRefresh } from "@/components/component-button-refresh"

import CountUp from "../components/count-up"
import useForceRerender from "../hooks/use-force-rerender"

export default function CountUpDemo() {
  const [keyDefault, forceRerenderDefault] = useForceRerender() as [
    number,
    () => void,
  ]

  return (
    <>
      <CountUp
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
